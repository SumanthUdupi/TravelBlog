export function initInteractions() {
    initHaptics();
    initRipples();
    initSnapScroll();
    initGlobalFadeIn();
}

// Point 40: Haptics
function initHaptics() {
    if (!navigator.vibrate) return;

    const links = document.querySelectorAll('a, button, .control-btn');
    links.forEach(link => {
        link.addEventListener('click', () => {
            try {
                navigator.vibrate(5);
            } catch (e) {
                // Ignore if not supported/allowed
            }
        });
    });
}

// Point 41: Touch Ripples (Ink Ripple)
function initRipples() {
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'ink-ripple';

        // Position
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;

        document.body.appendChild(ripple);

        // Remove after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Point 39: Snap Scroll (CSS is main driver, this creates container class if needed)
function initSnapScroll() {
    // Apply scroll snap to main sections if valid
    const main = document.querySelector('main');
    if (main) {
        // main.style.scrollSnapType = 'y mandatory'; // Can be jarring for long content, let's limit to specific pages or sections if requested.
        // Prompt says "Implement CSS Scroll Snap... for major sections".
        // We will add a class to body or main and handle in CSS.
        document.documentElement.style.scrollSnapType = 'y proximity'; // Less aggressive
    }
}

// Point 50: Global Fade In
function initGlobalFadeIn() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const targets = document.querySelectorAll('article, section, .post-card, h2, img');
    targets.forEach(target => {
        target.classList.add('fade-up-element');
        observer.observe(target);
    });
}
