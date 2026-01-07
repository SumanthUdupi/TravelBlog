// Contact Form Logic
export function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Reset errors
        document.querySelectorAll('.form-error').forEach(el => el.style.display = 'none');

        // Validation
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        if (name.value.length < 2) {
            document.getElementById('name-error').style.display = 'block';
            isValid = false;
        }

        if (!email.value.includes('@') || !email.value.includes('.')) {
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        }

        if (subject.value.length < 5) {
            document.getElementById('subject-error').style.display = 'block';
            isValid = false;
        }

        if (message.value.length < 10) {
            document.getElementById('message-error').style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            handleSubmit(form);
        }
    });
}

async function handleSubmit(form) {
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Simulate submission (or real one if Formspree ID was provided)
    // For this environment, we just simulate success.
    setTimeout(() => {
        form.style.display = 'none';
        document.getElementById('form-success').style.display = 'block';
    }, 1500);
}

// Auto init
if (document.getElementById('contact-form')) {
    initContactForm();
}
