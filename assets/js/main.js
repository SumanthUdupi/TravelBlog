// Main Entry Point
import { initImmersiveMode } from './immersive.js';
import { initConstellation } from './constellation.js';
import { initSearch } from './search.js';
import { initTimeline } from './timeline.js';
import { initTypography } from './typography.js';
import { initReadingProgress } from './reading-progress.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Core Features
    initImmersiveMode();
    initConstellation();
    initSearch();
    initTimeline();
    initTypography();
    initReadingProgress();
    initScrollAnimations();

    console.log('TravelBlog initialized with Digital Parchment aesthetic.');

    // Readiness signal for automated testing
    window.__BLOG_READY__ = true;

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);

            if (!isExpanded) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'var(--color-parchment)';
                navLinks.style.padding = '1rem';
                navLinks.style.borderBottom = '1px solid var(--color-warm-tan)';
                navLinks.style.zIndex = '1000';
            } else {
                navLinks.style.display = 'none';
                navLinks.style.position = '';
                navLinks.style.top = '';
                navLinks.style.left = '';
                navLinks.style.width = '';
                navLinks.style.backgroundColor = '';
                navLinks.style.padding = '';
                navLinks.style.borderBottom = '';
                navLinks.style.zIndex = '';
            }
        });
    }
});

// Scroll Reveal Logic
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target elements to animate
    const targets = document.querySelectorAll('article, .blog-card, section, h2, .post-content > p');
    targets.forEach(target => {
        target.classList.add('reveal-on-scroll');
        target.classList.add('fade-in'); // Fallback or base
        observer.observe(target);
    });
}
