// Reading Progress Bar & Persistence
import { userPrefs } from './storage.js';

export function initReadingProgress() {
    const progressBar = document.getElementById('reading-progress');
    // Only run on article pages (or where progress bar exists)
    if (!progressBar) return;

    // Get current slug from URL
    const slug = window.location.pathname.split('/').pop().replace('.html', '') || 'index';

    // Resume Reading Feature
    const savedProgress = userPrefs.getReadingProgress(slug);
    if (savedProgress && savedProgress > 0) {
        // Small delay to allow layout to settle
        setTimeout(() => {
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPos = (savedProgress / 100) * scrollHeight;

            // Only scroll if it's significant (e.g., > 5%)
            if (savedProgress > 5) {
                // Optional: Show a toast/prompt "Resuming where you left off..."
                window.scrollTo({
                    top: scrollPos,
                    behavior: 'smooth'
                });
            }
        }, 500);
    }

    // Scroll Listener
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateProgress(progressBar, slug);
                ticking = false;
            });
            ticking = true;
        }
    });
}

function updateProgress(progressBar, slug) {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    if (scrollHeight <= 0) return;

    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercentage + '%';

    // Save progress periodically (debounce could be added, but simple set is cheap for localStorage)
    userPrefs.setReadingProgress(slug, scrollPercentage);
}

// Auto init is removed in favor of explicit init in main.js,
// but we keep the export. If main.js calls it, it runs.
// If main.js imports it, it might expect a named export.
