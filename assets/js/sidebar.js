/**
 * Konda Tech - Mobile Sidebar Drawer & Overlay Navigation
 */

export function initSidebar() {
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburger || !drawer || !overlay) return;

  function openMenu() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (drawer.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on backdrop overlay click
  overlay.addEventListener('click', closeMenu);

  // Close when selecting any link item
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on ESC key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeMenu();
    }
  });
}
