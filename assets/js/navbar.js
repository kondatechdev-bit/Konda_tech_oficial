/**
 * Konda Tech - Navbar Interactions & Active Link Highlighter
 */

export function initNavbar() {
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // Toggle header blur background on scroll
  function handleScroll() {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Get current file name from URL, default to index.html for root path
  const rawPath = window.location.pathname.split('#')[0].split('?')[0];
  let currentFile = rawPath.split('/').pop();
  if (!currentFile || currentFile === '' || currentFile === '/') {
    currentFile = 'index.html';
  }

  // Highlight active link based on matching file name
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const linkFile = href.split('/').pop() || 'index.html';

    if (currentFile === linkFile) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

