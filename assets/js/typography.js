// Typography Controls Logic
import { userPrefs } from './storage.js';

export function initTypography() {
    const panel = document.getElementById('typography-panel');
    const toggleBtn = document.getElementById('typography-toggle');

    if (!panel || !toggleBtn) return;

    // Toggle Panel
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = panel.classList.contains('active');
        togglePanel(!isExpanded);
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (panel.classList.contains('active') &&
            !panel.contains(e.target) &&
            e.target !== toggleBtn) {
            togglePanel(false);
        }
    });

    function togglePanel(show) {
        if (show) {
            panel.classList.add('active');
            toggleBtn.setAttribute('aria-expanded', 'true');
        } else {
            panel.classList.remove('active');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
    }

    // Controls
    const fontSizeInput = document.getElementById('font-size');
    const lineHeightInput = document.getElementById('line-height');
    const marginInput = document.getElementById('margin-size');
    const fontSerifBtn = document.getElementById('font-serif');
    const fontSansBtn = document.getElementById('font-sans');
    const resetBtn = document.getElementById('reset-typography');

    // Load saved settings
    loadSettings();

    // Event Listeners
    if (fontSizeInput) {
        fontSizeInput.addEventListener('input', (e) => {
            updateSetting('fontSize', e.target.value + 'px');
        });
    }

    if (lineHeightInput) {
        lineHeightInput.addEventListener('input', (e) => {
            updateSetting('lineHeight', e.target.value);
        });
    }

    if (marginInput) {
        marginInput.addEventListener('input', (e) => {
            updateSetting('maxWidth', (800 - (e.target.value * 10)) + 'px'); // Inverse logic: more margin = narrower content
            // Alternatively, direct margin padding if we want that.
            // The spec says "Margins: Range 10px - 50px".
            // Let's implement it as modifying the container max-width or padding.
            // Using padding on .article-content is safer.
            document.documentElement.style.setProperty('--article-padding', e.target.value + 'px');
        });
    }

    if (fontSerifBtn) {
        fontSerifBtn.addEventListener('click', () => {
            updateSetting('fontFamily', "'Merriweather', serif");
            fontSerifBtn.classList.add('active');
            fontSansBtn.classList.remove('active');
        });
    }

    if (fontSansBtn) {
        fontSansBtn.addEventListener('click', () => {
            updateSetting('fontFamily', "'Inter', sans-serif");
            fontSansBtn.classList.add('active');
            fontSerifBtn.classList.remove('active');
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetSettings);
    }
}

function updateSetting(key, value) {
    const root = document.documentElement;

    switch(key) {
        case 'fontSize':
            root.style.setProperty('--font-size-body', value);
            break;
        case 'lineHeight':
            root.style.setProperty('--line-height-body', value);
            break;
        case 'fontFamily':
            root.style.setProperty('--font-body', value);
            break;
        case 'maxWidth':
            // Not strictly using this if we use padding, but let's see.
            break;
    }

    // Save to local storage
    userPrefs.setTypography(key, value);
}

function loadSettings() {
    const settings = userPrefs.getTypography();
    if (!settings) return;

    const root = document.documentElement;

    if (settings.fontSize) {
        root.style.setProperty('--font-size-body', settings.fontSize);
        const input = document.getElementById('font-size');
        if (input) input.value = parseInt(settings.fontSize);
    }

    if (settings.lineHeight) {
        root.style.setProperty('--line-height-body', settings.lineHeight);
        const input = document.getElementById('line-height');
        if (input) input.value = settings.lineHeight;
    }

    if (settings.fontFamily) {
        root.style.setProperty('--font-body', settings.fontFamily);
        const isSans = settings.fontFamily.includes('Inter');
        if (isSans) {
            document.getElementById('font-sans')?.classList.add('active');
            document.getElementById('font-serif')?.classList.remove('active');
        } else {
            document.getElementById('font-serif')?.classList.add('active');
            document.getElementById('font-sans')?.classList.remove('active');
        }
    }
}

function resetSettings() {
    userPrefs.clearTypography();
    document.documentElement.style.removeProperty('--font-size-body');
    document.documentElement.style.removeProperty('--line-height-body');
    document.documentElement.style.removeProperty('--font-body');
    document.documentElement.style.removeProperty('--article-padding');

    // Reset inputs
    document.getElementById('font-size').value = 18;
    document.getElementById('line-height').value = 1.6;
    document.getElementById('font-serif').classList.add('active');
    document.getElementById('font-sans').classList.remove('active');
}
