// Main Entry Point
import { initImmersiveMode } from './immersive.js';
import { initConstellation } from './constellation.js';
import { initSearch } from './search.js';
import { initTimeline } from './timeline.js';
import { initTypography } from './typography.js';
import { initReadingProgress } from './reading-progress.js';
import { initInteractions } from './interactions.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Core Features
    initImmersiveMode();
    initConstellation();
    initSearch();
    initTimeline();
    initTypography();
    initReadingProgress();
    initInteractions();

    console.log('TravelBlog initialized with Digital Parchment aesthetic.');

    window.__BLOG_READY__ = true;

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links'); // On mobile this target might need adjustment if using bottom nav logic in CSS

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // For the bottom nav design, the menu toggle might just toggle the Constellation or "More" options if links are already visible?
            // Or if we hide links behind menu on mobile.
            // The request said "Move main navigation to a fixed bottom bar".
            // If the links are visible at the bottom, we might not need the hamburger for them,
            // but we might need it for extra controls.
            // Let's assume the nav-links are the bottom bar, and the menu button opens the side drawer or extra options.
            // For now, let's keep existing logic but ensure it works with the new layout.

            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);

            // If bottom nav is active (CSS media query), this might toggle a popup menu instead.
            if (window.innerWidth <= 768) {
                // Logic for mobile menu expansion if not fully using bottom bar for all links
                // or if bottom bar overflows.
                // Currently CSS shows .nav-links at bottom.
            } else {
                // Desktop dropdown logic
                if (navLinks) {
                    navLinks.classList.toggle('active');
                }
            }
        });
    }
});
