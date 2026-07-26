/**
 * Konda Tech - Utility Functions (Toast Notifications, Search & Category Filter)
 */

// Toast Notifications System
export function showToast(message, type = 'info') {
  let toastContainer = document.querySelector('.toast-container');

  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.style.position = 'fixed';
    toastContainer.style.bottom = '2rem';
    toastContainer.style.right = '2rem';
    toastContainer.style.zIndex = 'var(--z-toast, 400)';
    toastContainer.style.display = 'flex';
    toastContainer.style.flexDirection = 'column';
    toastContainer.style.gap = '0.75rem';
    toastContainer.style.maxWidth = '380px';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  toast.style.padding = '0.85rem 1.25rem';
  toast.style.borderRadius = 'var(--radius-md, 0.625rem)';
  toast.style.background = 'var(--bg-secondary, #0f172a)';
  toast.style.color = 'var(--text-primary, #ffffff)';
  toast.style.border = '1px solid var(--border-color, #1e293b)';
  toast.style.boxShadow = 'var(--shadow-lg)';
  toast.style.fontSize = 'var(--font-sm, 0.875rem)';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '0.75rem';

  const iconSvg = type === 'success' 
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

  toast.innerHTML = `${iconSvg}<span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Product / Article Category Filter & Search Integration
export function initCategoryFilter() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const items = document.querySelectorAll('[data-category]');
  const searchInput = document.querySelector('[data-search-input]');

  function applyFilters() {
    const activeBtn = document.querySelector('[data-filter].btn-primary');
    const category = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

    items.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      const itemText = item.textContent.toLowerCase();

      const matchesCategory = category === 'all' || itemCategory === category;
      const matchesSearch = !searchTerm || itemText.includes(searchTerm);

      if (matchesCategory && matchesSearch) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('btn-primary'));
      filterBtns.forEach(b => b.classList.add('btn-outline'));
      btn.classList.remove('btn-outline');
      btn.classList.add('btn-primary');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
}

// Local Search Filter Standalone Component (for pages without data-category)
export function initSearch() {
  const searchInput = document.querySelector('[data-search-input]');
  const searchableCards = document.querySelectorAll('[data-search-target]:not([data-category])');

  if (!searchInput || !searchableCards.length) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();

    searchableCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (!term || text.includes(term)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

