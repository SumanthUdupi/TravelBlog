// Main Application Entry Point
import { setupNavigation, setupBreadcrumb, setupProgressBar, setupHeaderSticky, setupSkipLink } from './components/Navigation';
import { setupAuthUI, setupThemeToggle } from './components/Auth';
import { setupGallery, setupScrollReveal, setupImageLazyLoading } from './components/Gallery';
import { setupSearch, setupSearchFilters } from './components/Search';
import { setupImmersiveTimeline, setupNarrativeProgression, setupEmotionalHooks, setupContextualReveals, setupParallaxEffect, setupAmbientNarrative } from './components/ImmersiveStory';
import { updateUserProgress, getUserProgress } from './lib/services/userService';
import { getCurrentUser, onAuthStateChange } from './lib/supabase';

// Initialize all components
export function initializeApp() {
  // Navigation & UI
  setupSkipLink();
  setupNavigation();
  setupProgressBar();
  setupHeaderSticky();
  setupAuthUI();
  setupThemeToggle();

  // Gallery & Media
  setupGallery();
  setupImageLazyLoading();
  setupScrollReveal();

  // Search & Discovery
  setupSearch();
  setupSearchFilters();

  // Immersive Experience
  setupImmersiveTimeline();
  setupNarrativeProgression();
  setupEmotionalHooks();
  setupContextualReveals();
  setupParallaxEffect();
  setupAmbientNarrative();

  // User Experience
  setupUserTracking();
  setupAccessibilityFeatures();
  setupPerformanceMonitoring();
}

// Track user engagement and progress
function setupUserTracking() {
  let currentUser = null;
  let currentEntryId = null;

  onAuthStateChange((event, session) => {
    currentUser = session?.user;
  });

  const articleElement = document.querySelector('article[data-entry-id]');
  if (articleElement) {
    currentEntryId = articleElement.dataset.entryId;
  }

  let readingTimer = 0;
  let scrollDepth = 0;

  setInterval(() => {
    if (currentUser && currentEntryId) {
      readingTimer += 1;
    }
  }, 1000);

  window.addEventListener('scroll', async () => {
    if (!currentUser || !currentEntryId) return;

    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = Math.round((winScroll / height) * 100);

    if (scrollPercentage > scrollDepth) {
      scrollDepth = scrollPercentage;

      if (scrollPercentage % 25 === 0) {
        const { error } = await updateUserProgress(currentUser.id, currentEntryId, {
          scroll_percentage: scrollPercentage,
          time_spent_seconds: readingTimer,
          last_read_position: winScroll,
          completed: scrollPercentage >= 90
        });

        if (error) {
          console.error('Error tracking progress:', error);
        }
      }
    }
  });
}

// Enhanced accessibility features
function setupAccessibilityFeatures() {
  // Keyboard navigation for all interactive elements
  document.addEventListener('keydown', (e) => {
    if (e.key === '?' && e.ctrlKey) {
      showKeyboardShortcuts();
    }
  });

  // Focus visible for keyboard users
  document.addEventListener('keydown', () => {
    document.body.classList.add('keyboard-active');
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-active');
  });

  // Announce page changes for screen readers
  const observer = new MutationObserver(() => {
    const announcement = document.querySelector('[role="status"]');
    if (announcement && announcement.textContent) {
      console.log('Screen reader announcement:', announcement.textContent);
    }
  });

  observer.observe(document.body, {
    subtree: true,
    attributes: true,
    characterData: true
  });
}

// Performance monitoring
function setupPerformanceMonitoring() {
  if ('PerformanceObserver' in window) {
    // Monitor Core Web Vitals
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log(`${entry.name}: ${entry.value}`);
        }
      });

      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (e) {
      console.warn('PerformanceObserver not fully supported');
    }
  }

  // Log page load time
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page load time:', pageLoadTime + 'ms');
  });
}

function showKeyboardShortcuts() {
  const shortcuts = `
    Keyboard Shortcuts:
    ================
    ? - Show this help
    / - Open search
    H - Go to home
    J - Next section
    K - Previous section
    B - Toggle bookmarks
    T - Toggle theme
  `;
  alert(shortcuts);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Enable HMR in development
if (import.meta.hot) {
  import.meta.hot.accept();
}
