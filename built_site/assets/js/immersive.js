
document.addEventListener('DOMContentLoaded', () => {
    // 1. Hero Parallax Effect
    const hero = document.querySelector('.immersive-hero');
    const heroBg = document.querySelector('.parallax-bg');

    if (hero && heroBg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                // Move background slower than foreground
                heroBg.style.transform = `translateY(${scrollY * 0.5}px)`;
            }
        });
    }

    // 2. Scrollytelling Animation (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of element is visible
    };

    const scrollyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you want it to happen only once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const scrollyElements = document.querySelectorAll('.scrolly-content, .hero-content');
    scrollyElements.forEach(el => scrollyObserver.observe(el));


    // 3. Chapter Navigation (Progress Tracker)
    // Create the navigation dynamically if it doesn't exist, or manage active state
    const chapters = document.querySelectorAll('.scrolly-section');
    const navContainer = document.getElementById('chapter-nav');

    if (navContainer && chapters.length > 0) {
        // Create dots
        chapters.forEach((chapter, index) => {
            const dot = document.createElement('div');
            dot.classList.add('chapter-dot');
            dot.dataset.target = chapter.id;
            dot.title = chapter.dataset.title || `Chapter ${index + 1}`;

            dot.addEventListener('click', () => {
                chapter.scrollIntoView({ behavior: 'smooth' });
            });

            navContainer.appendChild(dot);
        });

        // Update active dot on scroll
        const chapterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active class from all
                    document.querySelectorAll('.chapter-dot').forEach(d => d.classList.remove('active'));
                    // Add to current
                    const activeDot = document.querySelector(`.chapter-dot[data-target="${entry.target.id}"]`);
                    if (activeDot) activeDot.classList.add('active');

                    // Update background based on chapter data-bg
                    const newBg = entry.target.dataset.bg;
                    if (newBg) {
                         const fixedBg = document.getElementById('fixed-bg');
                         if (fixedBg) {
                             // Simple fade via CSS transition
                             fixedBg.style.backgroundImage = `url('${newBg}')`;
                         }
                    }
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% visible

        chapters.forEach(chapter => chapterObserver.observe(chapter));
    }
});
