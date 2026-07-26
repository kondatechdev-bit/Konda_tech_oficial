/**
 * Konda Tech - Main Application Entry Point
 * Modular ES6 Imports & Initialization
 */

import { initTheme } from './theme.js';
import { initNavbar } from './navbar.js';
import { initSidebar } from './sidebar.js';
import { initAnimations } from './animations.js';
import { initScroll } from './scroll.js';
import { initCounters } from './counter.js';
import { initSliders } from './slider.js';
import { initFAQ } from './faq.js';
import { initContactForms } from './contact.js';
import { initCategoryFilter, initSearch } from './utils.js';
import { initBlogReader } from './blog.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initSidebar();
  initAnimations();
  initScroll();
  initCounters();
  initSliders();
  initFAQ();
  initContactForms();
  initCategoryFilter();
  initSearch();
  initBlogReader();
});
