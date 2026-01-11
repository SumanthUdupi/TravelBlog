/* eslint-disable */
// Home page specific logic
import { initInteractions } from './interactions.js';

document.addEventListener('DOMContentLoaded', () => {
    // If we had specific home page data loading, it would go here.
    // For now, interactions are global or initialized here.

    // Simulate loading of featured posts or just applying glass classes
    const posts = document.querySelectorAll('.post-card');
    posts.forEach(post => {
        post.classList.add('glass-card');
    });

    // Animate hero text on load
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        // Already handled by CSS animation but we could add more complex JS animation here
        // e.g., splitting text
    }
});
