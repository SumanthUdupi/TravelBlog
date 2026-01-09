export function initImmersiveMode() {
    const toggle = document.getElementById('theme-toggle'); // Reuse ID but change icon/behavior
    const body = document.body;

    // Create cursor element
    let cursor = document.querySelector('.aura-cursor');
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.classList.add('aura-cursor');
        body.appendChild(cursor);
    }

    // Toggle Logic
    if (toggle) {
        toggle.addEventListener('click', () => {
            body.classList.toggle('aura-active');
            const isActive = body.classList.contains('aura-active');
            toggle.setAttribute('aria-pressed', isActive);

            // Store preference
            localStorage.setItem('travelblog_aura_mode', isActive);
        });
    }

    // Check preference
    if (localStorage.getItem('travelblog_aura_mode') === 'true') {
        body.classList.add('aura-active');
    }

    // Move Cursor
    document.addEventListener('mousemove', (e) => {
        if (body.classList.contains('aura-active')) {
            requestAnimationFrame(() => {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
            });
        }
    });
}
