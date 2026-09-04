// 브라우저 기본 alert/confirm 대신 쓰는 커스텀 모달.
// 사용법: await showAlert('메시지'), const ok = await showConfirm('메시지')

function buildOverlay(message, buttonsHtml) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box">
      <p class="modal-message"></p>
      <div class="modal-actions">${buttonsHtml}</div>
    </div>
  `;
  overlay.querySelector('.modal-message').textContent = message;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('open'));
  return overlay;
}

function closeOverlay(overlay) {
  overlay.classList.remove('open');
  setTimeout(() => overlay.remove(), 150);
}

export function showAlert(message) {
  return new Promise((resolve) => {
    const overlay = buildOverlay(message, `<button type="button" class="primary modal-ok">확인</button>`);
    overlay.querySelector('.modal-ok').addEventListener('click', () => {
      closeOverlay(overlay);
      resolve();
    });
  });
}

export function showConfirm(message) {
  return new Promise((resolve) => {
    const overlay = buildOverlay(message, `
      <button type="button" class="secondary modal-cancel">취소</button>
      <button type="button" class="danger modal-confirm">확인</button>
    `);
    overlay.querySelector('.modal-cancel').addEventListener('click', () => {
      closeOverlay(overlay);
      resolve(false);
    });
    overlay.querySelector('.modal-confirm').addEventListener('click', () => {
      closeOverlay(overlay);
      resolve(true);
    });
  });
}