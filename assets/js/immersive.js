document.addEventListener('DOMContentLoaded', () => {
    // Parallax Effect for Hero
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                parallaxBg.style.transform = `translateY(${scrollY * 0.5}px)`;
            }
        });
    }

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you want it to happen only once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe Hero Content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) observer.observe(heroContent);

    // Observe Scrollytelling Sections
    document.querySelectorAll('.scrolly-content').forEach(el => observer.observe(el));

    // Observe Blog Cards for Staggered Fade In
    document.querySelectorAll('.card').forEach((el, index) => {
        el.classList.add('fade-in-scroll');
        el.style.transitionDelay = `${index * 0.1}s`; // Stagger effect
        observer.observe(el);
    });

    // Interactive Map Logic
    const mapMarkers = document.querySelectorAll('.location-marker');
    const mapTooltip = document.getElementById('mapTooltip');

    mapMarkers.forEach(marker => {
        marker.addEventListener('mouseenter', (e) => {
            const title = e.target.getAttribute('data-title');
            if (mapTooltip) {
                mapTooltip.textContent = title;
                mapTooltip.style.opacity = '1';
                mapTooltip.style.left = `${e.pageX + 10}px`;
                mapTooltip.style.top = `${e.pageY - 30}px`;
            }
        });

        marker.addEventListener('mouseleave', () => {
            if (mapTooltip) {
                mapTooltip.style.opacity = '0';
            }
        });

        marker.addEventListener('click', (e) => {
            const link = e.target.getAttribute('data-link');
            if (link) {
                window.location.href = link;
            }
        });
    });

    // Dark Mode Integration with LocalStorage (sync with existing)
    // Note: The existing app.js handles the toggle button event.
    // We just need to ensure our new styles respect the body attribute or the stylesheet toggle.
    // The existing site toggles `disabled` on the stylesheet.
    // `immersive.css` uses `body[data-theme='dark']` for overrides,
    // BUT the existing site uses a separate CSS file for dark mode.
    // To be consistent, we should probably stick to the existing pattern OR
    // update the dark mode toggle to add a class to body.

    // Check existing app.js: It toggles `disabled` on `dark-mode.css`.
    // And sets localStorage.

    // To support `immersive.css` dark mode styles, we should check the state
    // and add a class to body if dark mode is active, or rely on `dark-mode.css` if we put our overrides there.
    // Since we can't easily modify `dark-mode.css` in the build process without overwriting,
    // let's add a script here to sync body class.

    const darkModeCss = document.getElementById('darkModeCss');
    const toggleButton = document.getElementById('darkModeToggle');

    function updateThemeState() {
        if (!darkModeCss.disabled) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
        }
    }

    // Initial check
    updateThemeState();

    // Listen for clicks on the toggle button (which exists in the header)
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            // Slight delay to allow app.js to process first
            setTimeout(updateThemeState, 50);
        });
    }
});
