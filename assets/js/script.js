// Module for Custom Cursor
const CustomCursor = (() => {
    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');

    const init = () => {
        // Only initialize on desktop (pointer fine)
        if (window.matchMedia("(pointer: fine)").matches) {
            window.addEventListener('mousemove', (e) => {
                const posX = e.clientX;
                const posY = e.clientY;

                // Move dot instantly
                dot.style.left = `${posX}px`;
                dot.style.top = `${posY}px`;

                // Move outline with delay (css transition handles smooth)
                outline.style.left = `${posX}px`;
                outline.style.top = `${posY}px`;

                // Animate outline using Web Animations API for smoother trail if needed
                // But CSS transition is usually sufficient for simple lag
            });

            // Hover effects
            const interactables = document.querySelectorAll('a, button, .card');
            interactables.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    document.body.classList.add('hovering');
                });
                el.addEventListener('mouseleave', () => {
                    document.body.classList.remove('hovering');
                });
            });
        } else {
            // Hide cursor elements on touch devices
            dot.style.display = 'none';
            outline.style.display = 'none';
        }
    };

    return { init };
})();

// Module for Scroll Progress
const ScrollProgress = (() => {
    const bar = document.getElementById('progress-bar');

    const init = () => {
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
        // Sticky/Hide Header on Scroll
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll <= 0) {
                header.classList.remove('hidden');
                return;
            }

            if (currentScroll > lastScroll && !header.classList.contains('hidden')) {
                // Scroll Down
                header.classList.add('hidden');
            } else if (currentScroll < lastScroll && header.classList.contains('hidden')) {
                // Scroll Up
                header.classList.remove('hidden');
            }
            lastScroll = currentScroll;
        });

        // Mobile Menu Toggle
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('open');
            document.body.style.overflow = isExpanded ? 'auto' : 'hidden'; // Lock scroll
        });

        // Close menu when clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            });
        });
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
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 100);
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);

        // Observe various animation classes
        const elements = document.querySelectorAll('.reveal, .fade-in, .scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .stagger-item');
        elements.forEach(el => observer.observe(el));
    };

    return { init };
})();

// Module for Parallax
const Parallax = (() => {
    const init = () => {
        const parallaxLayers = document.querySelectorAll('.parallax-layer');

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

// Module for Page Transitions
const PageTransition = (() => {
    const init = () => {
        // Add page transition class to body
        document.body.classList.add('page-transition');

        // Trigger page load animation
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.add('loaded');
            }, 100);
        });

        // Handle navigation clicks for smooth transitions
        document.querySelectorAll('a[href]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                // Only handle internal links
                if (href && !href.startsWith('http') && !href.startsWith('#')) {
                    e.preventDefault();
                    document.body.classList.remove('loaded');

                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }
            });
        });
    };

    return { init };
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    CustomCursor.init();
    ScrollProgress.init();
    Navigation.init();
    ScrollReveal.init();
    Parallax.init();
    PageTransition.init();
});
