// Module for Back to Top Button
const BackToTop = (() => {
    const createButton = () => {
        const btn = document.createElement('button');
        btn.id = 'back-to-top';
        btn.ariaLabel = 'Back to top';
        btn.innerHTML = '↑';
        btn.className = 'back-to-top';
        document.body.appendChild(btn);
        return btn;
    };

    const init = () => {
        const btn = createButton();

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    return { init };
})();

// Append to main init
document.addEventListener('DOMContentLoaded', () => {
    // ... existing inits
    BackToTop.init();
});
