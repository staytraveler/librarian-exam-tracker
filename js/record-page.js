import { EXAM_STRUCTURE, SUBTOPICS } from './config.js';
import { addRound } from './rounds.js';
import { showAlert } from './modal.js';

function renderQuestionRows(containerId, subjectKey) {
  const wrap = document.getElementById(containerId);
  wrap.innerHTML = EXAM_STRUCTURE[subjectKey].map((q) => {
    const scoreOptions = Array.from({ length: q.max + 1 }, (_, i) => i);
    return `
      <div class="qrow" data-no="${q.no}" data-max="${q.max}">
        <div class="qrow-head">
          <span class="qno-badge">${q.no}번</span>
          <span class="qmax-label">${q.max}점 만점</span>
        </div>

        <div class="qfield">
          <span class="qlabel">세부 과목</span>
          <div class="chipGroup subtopicChipGroup">
            ${SUBTOPICS.map((s) => `<button type="button" class="chip" data-value="${s}" aria-pressed="false">${s}</button>`).join('')}
          </div>
        </div>

        <div class="qfield">
          <span class="qlabel">획득 점수</span>
          <div class="chipGroup scoreChipGroup">
            ${scoreOptions.map((s) => `<button type="button" class="chip scoreChip" data-value="${s}" aria-pressed="false">${s}</button>`).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');

  wrap.querySelectorAll('.chipGroup').forEach((group) => {
    const isScoreGroup = group.classList.contains('scoreChipGroup');
    const max = isScoreGroup ? Number(group.closest('.qrow').dataset.max) : null;

    group.querySelectorAll('.chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        group.querySelectorAll('.chip').forEach((c) => {
          c.classList.remove('selected', 'zero', 'partial');
          c.setAttribute('aria-pressed', 'false');
        });
        chip.classList.add('selected');
        chip.setAttribute('aria-pressed', 'true');

        if (isScoreGroup) {
          const value = Number(chip.dataset.value);
          if (value === 0) chip.classList.add('zero');
          else if (value < max) chip.classList.add('partial');
        }
      });
    });
  });
}

function collectAnswers(containerId) {
  const rows = document.querySelectorAll(`#${containerId} .qrow`);
  const answers = [];
  rows.forEach((row) => {
    const no = Number(row.dataset.no);
    const max = Number(row.dataset.max);
    const selectedScore = row.querySelector('.scoreChipGroup .chip.selected');
    const selectedSubtopic = row.querySelector('.subtopicChipGroup .chip.selected');
    const score = selectedScore ? Number(selectedScore.dataset.value) : null;
    const subtopic = selectedSubtopic ? selectedSubtopic.dataset.value : '';
    answers.push({ no, max, subtopic, score });
  });
  return answers;
}

function validateAnswers(answers) {
  for (const a of answers) {
    if (a.score === null) return `${a.no}번 문제의 점수를 선택하세요.`;
    if (!a.subtopic) return `${a.no}번 문제의 세부과목을 선택하세요.`;
  }
  return null;
}

renderQuestionRows('questionsA', 'A');
renderQuestionRows('questionsB', 'B');

document.getElementById('saveRoundBtn').addEventListener('click', async () => {
  const label = document.getElementById('roundLabel').value.trim() || '회차';
  const date = document.getElementById('roundDate').value || '';

  const answersA = collectAnswers('questionsA');
  const answersB = collectAnswers('questionsB');

  const error = validateAnswers(answersA) || validateAnswers(answersB);
  if (error) {
    await showAlert(error);
    return;
  }

  addRound(label, date, answersA, answersB);
  await showAlert('저장했습니다. 기록 보기 페이지에서 확인하세요.');
});