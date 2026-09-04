class AppFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    this.innerHTML = `
      <footer class="site-footer">
        <p>&copy; ${year} librarian-exam-tracker</p>
      </footer>
    `;
  }
}

customElements.define('app-footer', AppFooter);