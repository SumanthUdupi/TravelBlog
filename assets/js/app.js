document.addEventListener('DOMContentLoaded', () => {
    // Progress Bar
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById("readingProgress");
        if(progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    });

    // Sticky TOC Highlight
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            if (entry.intersectionRatio > 0) {
                document.querySelector(`.sticky-toc a[href="#${id}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.sticky-toc a[href="#${id}"]`)?.classList.remove('active');
            }
        });
    });

    // Track all sections that have an ID
    document.querySelectorAll('h1[id], h2[id], h3[id]').forEach((section) => {
        observer.observe(section);
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dark Mode Toggle
    const toggleButton = document.getElementById('darkModeToggle');
    const darkModeCss = document.getElementById('darkModeCss');

    // Check local storage
    if (localStorage.getItem('theme') === 'dark') {
        darkModeCss.disabled = false;
        toggleButton.textContent = '☀️';
    }

    toggleButton.addEventListener('click', () => {
        if (darkModeCss.disabled) {
            darkModeCss.disabled = false;
            localStorage.setItem('theme', 'dark');
            toggleButton.textContent = '☀️';
        } else {
            darkModeCss.disabled = true;
            localStorage.setItem('theme', 'light');
            toggleButton.textContent = '🌙';
        }
    });
});
