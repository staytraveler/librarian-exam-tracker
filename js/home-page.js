import { getRounds, saveRounds } from './storage.js';
import { showAlert, showConfirm } from './modal.js';

const exportArea = document.getElementById('exportArea');
const importArea = document.getElementById('importArea');

function refreshExportArea() {
  exportArea.value = JSON.stringify(getRounds());
}

refreshExportArea();

document.getElementById('copyBtn').addEventListener('click', async () => {
  refreshExportArea();
  try {
    await navigator.clipboard.writeText(exportArea.value);
  } catch (err) {
    exportArea.select();
    document.execCommand('copy');
  }
  await showAlert('클립보드에 복사했습니다.');
});

document.getElementById('importBtn').addEventListener('click', async () => {
  const raw = importArea.value.trim();
  if (!raw) {
    await showAlert('붙여넣은 데이터가 없습니다.');
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    await showAlert('데이터 형식이 올바르지 않습니다. 복사한 내용 그대로 붙여넣었는지 확인하세요.');
    return;
  }

  if (!Array.isArray(parsed)) {
    await showAlert('데이터 형식이 올바르지 않습니다.');
    return;
  }

  const existing = getRounds();
  if (existing.length > 0) {
    const overwrite = await showConfirm(
      `현재 ${existing.length}개 회차가 저장되어 있습니다. 붙여넣은 데이터로 덮어쓸까요?\n(취소하면 아무 변경도 하지 않습니다)`
    );
    if (!overwrite) return;
  }

  saveRounds(parsed);
  refreshExportArea();
  importArea.value = '';
  await showAlert('데이터를 적용했습니다.');
});

document.getElementById('resetBtn').addEventListener('click', async () => {
  const confirmed = await showConfirm('저장된 모든 회차 기록을 삭제합니다. 계속할까요?');
  if (!confirmed) return;
  saveRounds([]);
  refreshExportArea();
  await showAlert('초기화했습니다.');
});