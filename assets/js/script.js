// Module for Scroll Progress
const ScrollProgress = (() => {
    const bar = document.getElementById('progress-bar');

    const init = () => {
        if (!bar) return;
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            bar.style.width = scrolled + "%";
        });
    };

    return { init };
})();

// Module for Navigation
const Navigation = (() => {
    const header = document.getElementById('site-header');
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    let lastScroll = 0;

    const init = () => {
        if (!header) return;

        // Sticky/Hide Header on Scroll
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll <= 0) {
                header.classList.remove('hidden');
                return;
            }

            if (currentScroll > lastScroll && !header.classList.contains('hidden')) {
                // Scroll Down - only hide if far down? Or keep sticky as requested by brief?
                // Brief says: "Add sticky jump-to-section quick nav bar".
                // Keeping it sticky is better. Let's not hide it.
                // header.classList.add('hidden');
            } else if (currentScroll < lastScroll && header.classList.contains('hidden')) {
                // Scroll Up
                header.classList.remove('hidden');
            }
            lastScroll = currentScroll;
        });

        if (toggle && nav) {
            // Mobile Menu Toggle
            toggle.addEventListener('click', () => {
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                toggle.setAttribute('aria-expanded', !isExpanded);
                nav.classList.toggle('open');
                document.body.style.overflow = !isExpanded ? 'hidden' : 'auto'; // Lock scroll when open
            });

            // Close menu when clicking a link
            nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('open');
                    toggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = 'auto';
                });
            });
        }
    };

    return { init };
})();

// Module for Scroll Reveals (Intersection Observer)
const ScrollReveal = (() => {
    const init = () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay for better visual flow
                    // Use a dataset index if available or simple calculation
                    setTimeout(() => {
                        entry.target.classList.add('visible'); // Matches CSS .reveal.visible
                        entry.target.classList.add('animate'); // Generic animate class
                    }, index * 50); // Faster stagger

                    // Specific animations
                    if (entry.target.classList.contains('timeline-marker')) {
                         entry.target.classList.add('visible');
                    }

                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);

        // Observe various animation classes
        const elements = document.querySelectorAll('.reveal, .fade-in, .scroll-fade-in, .timeline-item, .timeline-marker, .card');
        elements.forEach(el => observer.observe(el));

        // Fail-safe: Ensure content is visible if JS takes too long or observer fails
        setTimeout(() => {
            elements.forEach(el => {
                if (!el.classList.contains('visible')) {
                    el.classList.add('visible');
                }
            });
        }, 2000); // 2 seconds fallback
    };

    return { init };
})();

// Module for Parallax
const Parallax = (() => {
    const init = () => {
        const parallaxLayers = document.querySelectorAll('.parallax-layer');
        if (parallaxLayers.length === 0) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;

            parallaxLayers.forEach(layer => {
                // Simple parallax: move background slower than scroll
                // Speed factor can be adjusted
                const speed = 0.5;
                layer.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    };

    return { init };
})();

// Module for Progressive Disclosure (Read More)
const ProgressiveDisclosure = (() => {
    const init = () => {
        // Find all long content or specific sections designated for disclosure
        // The brief mentions: "Use expandable/collapsible sections for long content"
        // Let's implement a generic "Expandable" class logic if we had one.
        // For now, we rely on the `read-more` links taking to full pages.
        // But if there are in-page expanders:
        const expanders = document.querySelectorAll('.expand-trigger');
        expanders.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');
                const target = document.getElementById(targetId);
                if(target) {
                    target.classList.toggle('expanded');
                    btn.textContent = target.classList.contains('expanded') ? 'Read Less' : 'Read More';
                }
            });
        });
    };
    return { init };
})();


// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only if it's a valid ID
        const href = this.getAttribute('href');
        if (href === '#' || href.length < 2) return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    ScrollProgress.init();
    Navigation.init();
    ScrollReveal.init();
    Parallax.init();
    ProgressiveDisclosure.init();

    // Readiness signal for testing
    window.__BLOG_READY__ = true;
});
