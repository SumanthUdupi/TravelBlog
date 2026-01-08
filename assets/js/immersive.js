// Immersive Mode Logic (Lantern Mode)
import { userPrefs } from './storage.js';

export function initImmersiveMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check LocalStorage for preference
    const savedTheme = userPrefs.getTheme();
    if (savedTheme === 'lantern') {
        enableLanternMode();
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('lantern-mode')) {
                disableLanternMode();
            } else {
                enableLanternMode();
            }
        });
    }

    // Cursor Tracking
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (body.classList.contains('lantern-mode')) {
            requestAnimationFrame(() => {
                body.style.setProperty('--cursor-x', `${mouseX}px`);
                body.style.setProperty('--cursor-y', `${mouseY}px`);

                // Point 16: Dynamic Shadows
                // Calculate shadow direction relative to center of screen or element
                // Simple implementation: Text shadow moves opposite to cursor
                const xOffset = (window.innerWidth / 2 - mouseX) / 50;
                const yOffset = (window.innerHeight / 2 - mouseY) / 50;
                body.style.setProperty('--shadow-x', `${xOffset}px`);
                body.style.setProperty('--shadow-y', `${yOffset}px`);
            });

            // Point 11: Cursor Trail (Sparks)
            if (Math.random() > 0.8) { // Throttle spark creation
                createSpark(mouseX, mouseY);
            }
        }
    });

    // Point 11: Spark Logic
    function createSpark(x, y) {
        const spark = document.createElement('div');
        spark.classList.add('lantern-spark');
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        // Random drift
        const dx = (Math.random() - 0.5) * 20;
        const dy = (Math.random() - 0.5) * 20 + 20; // Falling sparks? Or floating up? Let's say falling ash.
        spark.style.setProperty('--dx', `${dx}px`);
        spark.style.setProperty('--dy', `${dy}px`);

        document.body.appendChild(spark);

        // Remove after animation
        setTimeout(() => {
            spark.remove();
        }, 1000); // Match animation duration
    }

    // Trailing Effect Animation Loop (Existing)
    const trails = [];
    const TRAIL_COUNT = 3;

    // Create trail elements if they don't exist
    if (!document.getElementById('lantern-trails')) {
        const container = document.createElement('div');
        container.id = 'lantern-trails';
        container.style.pointerEvents = 'none';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.zIndex = '9998'; // Just below the main vignette
        container.style.display = 'none'; // Hidden by default

        for (let i = 0; i < TRAIL_COUNT; i++) {
            const trail = document.createElement('div');
            trail.classList.add('lantern-trail');
            container.appendChild(trail);
            trails.push({
                el: trail,
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                delay: (i + 1) * 0.15 // Lag factor
            });
        }
        body.appendChild(container);
    } else {
        const els = document.querySelectorAll('.lantern-trail');
        els.forEach((el, i) => {
            trails.push({
                el: el,
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                delay: (i + 1) * 0.15
            });
        });
    }

    function animateTrails() {
        if (!body.classList.contains('lantern-mode')) return;

        trails.forEach(trail => {
            trail.x += (mouseX - trail.x) * trail.delay;
            trail.y += (mouseY - trail.y) * trail.delay;

            trail.el.style.left = `${trail.x}px`;
            trail.el.style.top = `${trail.y}px`;
        });

        requestAnimationFrame(animateTrails);
    }

    window.startLanternAnimation = animateTrails;
    if (savedTheme === 'lantern') {
        animateTrails();
    }
}

function enableLanternMode() {
    // Point 14: Toggle Animation (Flare up)
    // We can add a class that triggers a CSS animation
    document.body.classList.add('lantern-activating');

    setTimeout(() => {
        document.body.classList.remove('lantern-activating');
        document.body.classList.add('lantern-mode');
        userPrefs.setTheme('lantern');

        const trailsContainer = document.getElementById('lantern-trails');
        if (trailsContainer) {
            trailsContainer.style.display = 'block';
        }

        if (window.startLanternAnimation) {
            window.startLanternAnimation();
        }
    }, 500); // Delay for "flare" effect

    // Initialize cursor position
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    document.body.style.setProperty('--cursor-x', `${x}px`);
    document.body.style.setProperty('--cursor-y', `${y}px`);
}

function disableLanternMode() {
    document.body.classList.remove('lantern-mode');
    userPrefs.setTheme('light');

    const trailsContainer = document.getElementById('lantern-trails');
    if (trailsContainer) {
        trailsContainer.style.display = 'none';
    }
}
