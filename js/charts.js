export function renderSubtopicBarChart(canvas, breakdown) {
  const labels = breakdown.map((b) => b.subtopic);
  const data = breakdown.map((b) => b.pct);
  return new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: '정답률(%)',
        data,
        backgroundColor: labels.map((s) => SUBTOPIC_COLORS[s]),
        borderRadius: 3,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false }, title: { display: true, text: '세부과목별 정답률', font: { size: 13 } } },
      scales: { y: { beginAtZero: true, max: 100, ticks: { callback: (v) => v + '%' } } },
    },
  });
}

// 세부과목 8개 색상 — 빨주노초파남보검 순서 (config.js의 SUBTOPICS 순서와 동일)
export const SUBTOPIC_COLORS = {
  '학교도서관': '#E4572E',
  '분류': '#F3A712',
  '목록': '#D4C21D',
  '독서교육': '#2F6F5E',
  '정보검색': '#2E6F9E',
  '디지털도서관': '#1B3B6F',
  '정보봉사': '#6A4C93',
  '교수매체': '#1F2430',
};

export function renderTotalTrendChart(canvas, totalSeriesData) {
  return new Chart(canvas, {
    type: 'line',
    data: {
      labels: totalSeriesData.map((t) => t.label),
      datasets: [{
        label: '총점',
        data: totalSeriesData.map((t) => t.score),
        borderColor: '#2F6F5E',
        backgroundColor: '#2F6F5E',
        tension: 0.2,
        pointRadius: 3,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, title: { display: true, text: '총점 추이 (80점 만점)', font: { size: 12 } } },
      scales: { y: { beginAtZero: true, max: 80, ticks: { stepSize: 20 } } },
    },
  });
}

export function renderSubtopicTrendChart(canvas, seriesBySubtopic, activeSubtopics) {
  const anySeries = Object.values(seriesBySubtopic)[0] || [];
  const labels = anySeries.map((p) => p.label);
  const datasets = activeSubtopics.map((subtopic) => ({
    label: subtopic,
    data: seriesBySubtopic[subtopic].map((p) => p.pct),
    borderColor: SUBTOPIC_COLORS[subtopic],
    backgroundColor: SUBTOPIC_COLORS[subtopic],
    tension: 0.2,
    pointRadius: 3,
  }));

  return new Chart(canvas, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } },
        title: { display: true, text: '세부과목별 정답률 추이', font: { size: 13 } },
      },
      scales: { y: { beginAtZero: true, max: 100, ticks: { callback: (v) => v + '%' } } },
    },
  });
}