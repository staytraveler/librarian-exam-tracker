import { getRounds } from './storage.js';
import { deleteRound, roundTotal, subtopicBreakdown, totalSeries, subtopicSeries } from './rounds.js';
import { renderSubtopicBarChart, renderTotalTrendChart, renderSubtopicTrendChart, SUBTOPIC_COLORS } from './charts.js';
import { SUBTOPICS } from './config.js';
import { showConfirm } from './modal.js';

let selectedRoundId = null;
let activeSubtopics = [...SUBTOPICS];

let totalTrendChart = null;
let subtopicTrendChart = null;
let barChart = null;

document.querySelectorAll('.tabBtn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tabBtn').forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    const tab = btn.dataset.tab;
    document.getElementById('trendView').classList.toggle('hidden', tab !== 'trend');
    document.getElementById('detailView').classList.toggle('hidden', tab !== 'detail');
  });
});

function renderTotalTrend() {
  if (totalTrendChart) { totalTrendChart.destroy(); totalTrendChart = null; }
  const box = document.getElementById('totalTrendChart').closest('.chart-box');
  const series = totalSeries();
  box.querySelector('.chart-empty')?.remove();
  if (series.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'placeholder chart-empty';
    empty.textContent = '아직 기록된 회차가 없습니다. 회차를 입력하면 여기에 추이가 표시됩니다.';
    box.appendChild(empty);
    return;
  }
  totalTrendChart = renderTotalTrendChart(document.getElementById('totalTrendChart'), series);
}

function renderSubtopicFilter() {
  const wrap = document.getElementById('subtopicFilter');
  wrap.innerHTML = SUBTOPICS.map((s) => `
    <button type="button" class="chip filterChip selected" data-value="${s}" aria-pressed="true" style="--chip-color:${SUBTOPIC_COLORS[s]}">${s}</button>
  `).join('');

  wrap.querySelectorAll('.filterChip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const value = chip.dataset.value;
      if (activeSubtopics.includes(value)) {
        activeSubtopics = activeSubtopics.filter((s) => s !== value);
        chip.classList.remove('selected');
        chip.setAttribute('aria-pressed', 'false');
      } else {
        activeSubtopics.push(value);
        chip.classList.add('selected');
        chip.setAttribute('aria-pressed', 'true');
      }
      renderSubtopicTrend();
    });
  });
}

function renderSubtopicTrend() {
  if (subtopicTrendChart) { subtopicTrendChart.destroy(); subtopicTrendChart = null; }
  const box = document.getElementById('subtopicTrendChart').closest('.chart-box');
  box.querySelector('.chart-empty')?.remove();
  if (getRounds().length === 0) {
    const empty = document.createElement('p');
    empty.className = 'placeholder chart-empty';
    empty.textContent = '아직 기록된 회차가 없습니다.';
    box.appendChild(empty);
    return;
  }
  const series = subtopicSeries();
  subtopicTrendChart = renderSubtopicTrendChart(document.getElementById('subtopicTrendChart'), series, activeSubtopics);
}

function renderRoundSelect() {
  const select = document.getElementById('roundSelect');
  const rounds = getRounds();

  if (rounds.length === 0) {
    select.innerHTML = '<option value="">기록된 회차가 없습니다</option>';
    return;
  }

  if (!selectedRoundId) selectedRoundId = rounds[rounds.length - 1].id;

  select.innerHTML = '';
  [...rounds].reverse().forEach((r) => {
    const t = roundTotal(r);
    const option = document.createElement('option');
    option.value = r.id;
    option.selected = r.id === selectedRoundId;
    option.textContent = `${r.label} · ${r.date || '날짜 미입력'} · ${t.score}/${t.max}점`;
    select.appendChild(option);
  });
}

document.getElementById('roundSelect').addEventListener('change', (e) => {
  selectedRoundId = e.target.value;
  renderDetail();
});

document.getElementById('deleteRoundBtn').addEventListener('click', async () => {
  const round = getRounds().find((r) => r.id === selectedRoundId);
  if (!round) return;
  const ok = await showConfirm(`'${round.label}' 회차를 삭제할까요?`);
  if (ok) {
    deleteRound(round.id);
    selectedRoundId = null;
    renderRoundSelect();
    renderDetail();
    renderTotalTrend();
    renderSubtopicTrend();
  }
});

function renderDetail() {
  const area = document.getElementById('detailArea');
  const round = getRounds().find((r) => r.id === selectedRoundId);

  if (barChart) { barChart.destroy(); barChart = null; }

  if (!round) {
    area.innerHTML = '<p class="placeholder">회차를 선택하면 그래프가 표시됩니다.</p>';
    return;
  }

  area.innerHTML = `<div class="chart-box"><canvas id="barChart"></canvas></div>`;
  barChart = renderSubtopicBarChart(document.getElementById('barChart'), subtopicBreakdown(round));
}

renderTotalTrend();
renderSubtopicFilter();
renderSubtopicTrend();
renderRoundSelect();
renderDetail();

window.addEventListener('resize', () => {
  if (totalTrendChart) totalTrendChart.resize();
  if (subtopicTrendChart) subtopicTrendChart.resize();
  if (barChart) barChart.resize();
});