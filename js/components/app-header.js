class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header">
        <h1 class="site-title">librarian-exam-tracker</h1>
        <nav class="site-nav">
          <a href="/pages/record.html">회차 입력</a>
          <span class="divider">|</span>
          <a href="/index.html">홈</a>
          <span class="divider">|</span>
          <a href="/pages/history.html">기록 보기</a>
        </nav>
      </header>
    `;

    const currentPath = window.location.pathname;
    this.querySelectorAll('.site-nav a').forEach((link) => {
      const linkPath = new URL(link.getAttribute('href'), window.location.origin).pathname;
      if (linkPath === currentPath || (currentPath === '/' && linkPath === '/index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }
}

customElements.define('app-header', AppHeader);