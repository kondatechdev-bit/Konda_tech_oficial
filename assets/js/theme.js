/**
 * Konda Tech - Theme Switcher (Dark/Light Mode)
 * Uses LocalStorage for persistence & prefers-color-scheme fallback.
 */

export function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  const storedTheme = localStorage.getItem('konda_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  let currentTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('konda_theme', theme);
    currentTheme = theme;

    // Update icons inside toggle buttons
    themeToggleBtns.forEach(btn => {
      if (theme === 'dark') {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
        btn.setAttribute('aria-label', 'Alternar para Modo Claro');
      } else {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
        btn.setAttribute('aria-label', 'Alternar para Modo Escuro');
      }
    });
  }

  // Initial application
  applyTheme(currentTheme);

  // Attach click listeners
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  });
}
