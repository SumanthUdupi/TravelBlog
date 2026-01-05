# Accessibility Requirements: WCAG Compliance and Inclusive Design

**Document Version:** 1.0  
**Creation Date:** January 5, 2026  
**Project:** Odisha Sacred Odyssey Travel Blog  
**Focus:** WCAG 2.1 AA Compliance and Inclusive Design

## Executive Summary

This document establishes comprehensive accessibility requirements for the Odisha Sacred Odyssey website, ensuring compliance with WCAG 2.1 Level AA standards and promoting inclusive design principles. The requirements address the needs of users with visual, auditory, motor, and cognitive disabilities while maintaining the sacred, spiritual aesthetic of the site.

## Compliance Standards

### Primary Standards
- **WCAG 2.1 Level AA** - Web Content Accessibility Guidelines
- **Section 508** - US Federal Accessibility Requirements
- **EN 301 549** - European Accessibility Standards
- **ADA Title III** - Americans with Disabilities Act

### Success Criteria Framework
- **Perceivable** - Information must be presentable to users in ways they can perceive
- **Operable** - Interface components must be operable by all users
- **Understandable** - Information and UI operation must be understandable
- **Robust** - Content must be robust enough for various assistive technologies

## Detailed Accessibility Requirements

### 1. Perceivable Content Requirements

#### 1.1 Text Alternatives (WCAG 1.1.1)
**Requirement:** All non-text content must have text alternatives

**Implementation:**
```html
<!-- Images with meaningful content -->
<img src="lingaraj-temple.jpg" 
     alt="Lingaraj Temple exterior showing intricate stone carvings and towering spire"
     title="Lingaraj Temple, Bhubaneswar, Odisha">

<!-- Decorative images -->
<img src="ornamental-border.png" 
     alt="" 
     aria-hidden="true">

<!-- Complex images (charts, diagrams) -->
<figure>
    <img src="temple-layout.png" 
         alt="Architectural layout of Lingaraj Temple complex showing main shrine, subsidiary shrines, and surrounding walls">
    <figcaption>
        Figure 1: Layout of Lingaraj Temple complex with main deula (sanctum), jagamohana (assembly hall), and surrounding compound walls.
    </figcaption>
</figure>

<!-- Icons with text labels -->
<button class="btn">
    <span class="icon" aria-hidden="true">📖</span>
    <span class="label">Read Full Article</span>
</button>
```

**Specific Requirements:**
- All images must have descriptive alt text
- Decorative images must have empty alt attributes or be hidden from screen readers
- Complex images require detailed descriptions in adjacent text
- Icons must have accessible names through text labels or aria-label

#### 1.2 Time-based Media (WCAG 1.2)
**Requirement:** Provide alternatives for time-based content

**Implementation:**
```html
<!-- Audio content with transcript -->
<figure>
    <audio controls>
        <source src="temple-bells.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
    <figcaption>
        Audio: Temple bells from Jagannath Temple, Puri
        <a href="temple-bells-transcript.txt" class="transcript-link">Read Transcript</a>
    </figcaption>
</figure>

<!-- Video content with captions and audio description -->
<video controls>
    <source src="konark-sunrise.mp4" type="video/mp4">
    <track kind="captions" src="konark-sunrise.vtt" srclang="en" label="English Captions">
    <track kind="descriptions" src="konark-sunrise-descriptions.vtt" srclang="en" label="Audio Description">
    Your browser does not support the video tag.
</video>
```

**Specific Requirements:**
- All audio content must have text transcripts
- All video content must have captions
- Pre-recorded audio content must have audio descriptions
- Live audio content must have captions when feasible

#### 1.3 Adaptable Content (WCAG 1.3)
**Requirement:** Create content that can be presented in different ways

**Implementation:**
```css
/* Ensure content structure is logical without CSS */
@media print {
    /* Ensure print-friendly layout */
    .sidebar { display: none; }
    .main-content { width: 100%; }
}

/* Support for high contrast mode */
@media (prefers-contrast: high) {
    :root {
        --text-primary: #000000;
        --text-secondary: #333333;
        --bg-primary: #ffffff;
        --accent-color: #000000;
    }
}

/* Support for reduced motion */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

**Specific Requirements:**
- Content must be readable without CSS
- Semantic HTML structure must be maintained
- Text must be resizable up to 200% without loss of functionality
- Layout must adapt to different screen sizes and orientations

#### 1.4 Distinguishable Content (WCAG 1.4)
**Requirement:** Make it easier for users to see and hear content

**Color Contrast Requirements:**
```css
/* Ensure minimum contrast ratios */
:root {
    /* Normal text (14pt/18pt bold) - 4.5:1 minimum */
    --text-primary: #2C1E14; /* Contrast ratio: 7.2:1 on #F8F4ED */
    --text-secondary: #5A4A42; /* Contrast ratio: 4.8:1 on #F8F4ED */
    
    /* Large text (18pt/14pt bold) - 3:1 minimum */
    --text-large: #3E3E3E; /* Contrast ratio: 5.3:1 on #F8F4ED */
    
    /* UI components and graphics - 3:1 minimum */
    --ui-element: #6B4F4F; /* Contrast ratio: 4.2:1 on #F8F4ED */
    
    /* Focus indicators - 3:1 minimum */
    --focus-color: #FFD700; /* Contrast ratio: 12.6:1 on #2C1E14 */
}

/* Active links must have sufficient contrast */
a {
    color: var(--color-primary);
    text-decoration: none;
    border-bottom: 1px solid transparent;
}

a:hover, a:focus {
    color: var(--color-accent);
    border-bottom-color: var(--color-accent);
}

/* Form elements must have sufficient contrast */
.form-input {
    border: 2px solid var(--color-secondary);
    color: var(--text-primary);
    background: #ffffff;
}

.form-input:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(107, 79, 79, 0.2);
}
```

**Text Spacing Requirements:**
```css
/* Ensure text spacing can be adjusted */
body {
    line-height: 1.8;
    letter-spacing: 0.05em;
    word-spacing: 0.16em;
}

/* Support for user-defined spacing */
@media (prefers-line-spacing: normal) {
    body {
        line-height: 1.5;
    }
}

/* Text resizing support */
html {
    font-size: 16px;
}

@media (max-width: 768px) {
    html {
        font-size: 14px;
    }
}
```

**Audio Control Requirements:**
```html
<!-- Audio content must have user controls -->
<audio controls>
    <source src="temple-chants.mp3" type="audio/mpeg">
    <p>Your browser does not support audio. <a href="temple-chants.mp3">Download audio file</a></p>
</audio>

<!-- Avoid auto-playing audio -->
<script>
// Disable auto-play unless user has explicitly enabled it
if (!localStorage.getItem('allow-autoplay')) {
    document.querySelectorAll('audio, video').forEach(media => {
        media.autoplay = false;
        media.muted = true;
    });
}
</script>
```

### 2. Operable Interface Requirements

#### 2.1 Keyboard Accessibility (WCAG 2.1)
**Requirement:** All functionality must be available from a keyboard

**Implementation:**
```html
<!-- All interactive elements must be keyboard accessible -->
<button class="btn" onclick="openModal()">Open Modal</button>
<a href="lingaraj-temple.html" class="card-link">View Temple Details</a>
<input type="text" class="form-input" placeholder="Search content...">

<!-- Skip links for navigation -->
<a href="#main-content" class="skip-link">Skip to main content</a>
<a href="#navigation" class="skip-link">Skip to navigation</a>

<!-- Modal accessibility -->
<div id="modal" class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-hidden="true">
    <div class="modal-content">
        <h2 id="modal-title">Temple Gallery</h2>
        <button class="close-btn" aria-label="Close modal" onclick="closeModal()">×</button>
        <!-- Modal content -->
    </div>
</div>
```

```javascript
// Keyboard navigation for custom components
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal[aria-hidden="false"]');
        if (modal) closeModal();
    }
    
    // Navigate carousel with arrow keys
    if (e.key === 'ArrowLeft') {
        navigateCarousel('prev');
    } else if (e.key === 'ArrowRight') {
        navigateCarousel('next');
    }
});

// Focus management for modals
function openModal() {
    const modal = document.getElementById('modal');
    modal.setAttribute('aria-hidden', 'false');
    
    // Trap focus within modal
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
    
    firstElement.focus();
}
```

**Specific Requirements:**
- All interactive elements must be focusable
- Focus order must be logical and intuitive
- Focus indicators must be visible
- Keyboard traps must be avoided
- Skip links must be provided

#### 2.2 Enough Time (WCAG 2.2)
**Requirement:** Provide users enough time to read and use content

**Implementation:**
```javascript
// Adjustable time limits
class TimeManager {
    constructor() {
        this.timeLimits = {
            sessionTimeout: 30 * 60 * 1000, // 30 minutes
            redirectTimeout: 10 * 1000,     // 10 seconds
            animationDuration: 1000         // 1 second
        };
        
        this.init();
    }
    
    init() {
        this.extendSession();
        this.warnBeforeTimeout();
        this.allowAnimationControl();
    }
    
    extendSession() {
        // Allow users to extend session time
        document.addEventListener('mousemove', () => {
            this.resetSessionTimer();
        });
        
        document.addEventListener('keypress', () => {
            this.resetSessionTimer();
        });
    }
    
    warnBeforeTimeout() {
        // Warn users before automatic timeout
        setTimeout(() => {
            this.showTimeoutWarning();
        }, this.timeLimits.sessionTimeout - 60000); // Warn 1 minute before timeout
    }
    
    allowAnimationControl() {
        // Respect user preference for reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.timeLimits.animationDuration = 0;
        }
    }
    
    showTimeoutWarning() {
        const warning = document.createElement('div');
        warning.className = 'timeout-warning';
        warning.innerHTML = `
            <p>Your session will expire in 1 minute. Continue browsing to extend your session.</p>
            <button onclick="extendSession()">Continue Session</button>
        `;
        document.body.appendChild(warning);
    }
}

// Initialize time management
const timeManager = new TimeManager();
```

**Specific Requirements:**
- Users must be warned before timeouts
- Users must be able to extend time limits
- Moving, blinking, or scrolling content must be controllable
- Auto-updating content must be controllable

#### 2.3 Seizures and Physical Reactions (WCAG 2.3)
**Requirement:** Do not design content in a way that is known to cause seizures

**Implementation:**
```css
/* Avoid flashing content */
.avoid-flashing {
    animation: slow-pulse 3s ease-in-out infinite;
}

@keyframes slow-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
    .avoid-flashing {
        animation: none;
    }
}

/* Ensure no content flashes more than 3 times per second */
.no-flash-content {
    animation-duration: 0.5s; /* Slower than 3 flashes per second */
}
```

```javascript
// Detect and prevent seizure-inducing content
class SeizurePrevention {
    constructor() {
        this.init();
    }
    
    init() {
        this.preventRapidFlashing();
        this.limitAnimationSpeed();
        this.respectMotionPreferences();
    }
    
    preventRapidFlashing() {
        // Monitor for rapid color changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes') {
                    // Check for rapid color changes
                    this.checkForFlashing(mutation.target);
                }
            });
        });
        
        observer.observe(document.body, {
            attributes: true,
            subtree: true,
            attributeFilter: ['style', 'class']
        });
    }
    
    limitAnimationSpeed() {
        // Ensure animations are not too fast
        const animations = document.querySelectorAll('[style*="animation"]');
        animations.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            const animationDuration = computedStyle.animationDuration;
            
            if (animationDuration && parseFloat(animationDuration) < 0.2) {
                // Animation too fast, adjust
                element.style.animationDuration = '0.5s';
            }
        });
    }
    
    respectMotionPreferences() {
        // Check for motion sensitivity
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
            this.disableProblematicAnimations();
        }
    }
    
    disableProblematicAnimations() {
        // Disable animations that could cause issues
        document.querySelectorAll('*').forEach(element => {
            element.style.animation = 'none';
            element.style.transition = 'none';
        });
    }
}
```

**Specific Requirements:**
- No content flashes more than 3 times per second
- No content causes seizures
- Respect user motion preferences
- Provide controls for moving content

#### 2.4 Navigable (WCAG 2.4)
**Requirement:** Provide ways to help users navigate, find content, and determine where they are

**Implementation:**
```html
<!-- Clear page titles -->
<title>Lingaraj Temple - Sacred Odyssey - Temples of Odisha</title>

<!-- Descriptive link text -->
<a href="lingaraj-temple.html">Read about Lingaraj Temple architecture and history</a>

<!-- Breadcrumb navigation -->
<nav aria-label="Breadcrumb">
    <ol>
        <li><a href="index.html">Home</a></li>
        <li><a href="blog.html">Journal</a></li>
        <li><a href="blog.html#temples">Temples</a></li>
        <li aria-current="page">Lingaraj Temple</li>
    </ol>
</nav>

<!-- Skip links -->
<a href="#main-content" class="skip-link">Skip to main content</a>
<a href="#navigation" class="skip-link">Skip to navigation</a>

<!-- Page structure with landmarks -->
<body>
    <header role="banner">
        <!-- Site header -->
    </header>
    
    <nav role="navigation" aria-label="Main navigation">
        <!-- Main navigation -->
    </nav>
    
    <main role="main" id="main-content">
        <!-- Main content -->
    </main>
    
    <aside role="complementary">
        <!-- Sidebar content -->
    </aside>
    
    <footer role="contentinfo">
        <!-- Footer content -->
    </footer>
</body>
```

```javascript
// Dynamic breadcrumb generation
class BreadcrumbManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.generateBreadcrumbs();
        this.updateCurrentPage();
    }
    
    generateBreadcrumbs() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(segment => segment.length > 0);
        
        const breadcrumbContainer = document.querySelector('.breadcrumb-container');
        if (!breadcrumbContainer) return;
        
        let breadcrumbHTML = '<ol>';
        breadcrumbHTML += '<li><a href="/">Home</a></li>';
        
        let currentPath = '';
        segments.forEach((segment, index) => {
            currentPath += '/' + segment;
            const label = this.getSegmentLabel(segment);
            
            if (index === segments.length - 1) {
                breadcrumbHTML += `<li aria-current="page">${label}</li>`;
            } else {
                breadcrumbHTML += `<li><a href="${currentPath}">${label}</a></li>`;
            }
        });
        
        breadcrumbHTML += '</ol>';
        breadcrumbContainer.innerHTML = breadcrumbHTML;
    }
    
    getSegmentLabel(segment) {
        // Map URL segments to readable labels
        const labelMap = {
            'blog': 'Journal',
            'temples': 'Temples',
            'shakti-peethas': 'Shakti Peethas',
            'museums': 'Museums',
            'lingaraj-temple': 'Lingaraj Temple',
            'konark-sun-temple': 'Konark Sun Temple'
        };
        
        return labelMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    
    updateCurrentPage() {
        // Update page title and meta description
        const pageTitle = document.querySelector('title');
        const currentPath = window.location.pathname;
        
        if (currentPath !== '/') {
            const pageName = this.getSegmentLabel(currentPath.split('/').pop());
            pageTitle.textContent = `${pageName} - Sacred Odyssey`;
        }
    }
}
```

**Specific Requirements:**
- Page titles must describe the page purpose
- Navigation must be consistent and predictable
- Breadcrumb navigation must be provided
- Skip links must be available
- Page structure must use proper landmarks

### 3. Understandable Content Requirements

#### 3.1 Readable (WCAG 3.1)
**Requirement:** Make text content readable and understandable

**Implementation:**
```html
<!-- Language declaration -->
<html lang="en" dir="ltr">

<!-- Page language changes -->
<p>Om Namah Shivaya (Sanskrit: ॐ नमः शिवाय)</p>

<!-- Abbreviations and acronyms -->
<abbr title="World Wide Web Consortium">W3C</abbr>
<acronym title="Accessible Rich Internet Applications">ARIA</acronym>

<!-- Complex words and jargon -->
<p>The <dfn>deula</dfn> is the main sanctuary tower in Kalinga temple architecture.</p>

<!-- Reading level indicators -->
<div class="reading-level" aria-label="Reading level">
    <span class="level-indicator" title="Advanced">🎓</span>
    <span class="level-text">Advanced</span>
</div>
```

```css
/* Reading level indicators */
.reading-level {
    display: inline-block;
    padding: 2px 8px;
    border: 1px solid var(--color-secondary);
    border-radius: 4px;
    font-size: 0.8rem;
    color: var(--color-text);
    background: var(--color-surface);
}

.level-indicator {
    margin-right: 4px;
}

/* Text-to-speech support */
.speech-friendly {
    line-height: 1.6;
    letter-spacing: 0.05em;
    max-width: 65ch;
}
```

**Specific Requirements:**
- Page language must be declared
- Language changes must be marked
- Uncommon words must be defined
- Reading level must be appropriate
- Text must be easy to understand

#### 3.2 Predictable (WCAG 3.2)
**Requirement:** Make Web pages appear and operate in predictable ways

**Implementation:**
```javascript
// Consistent navigation behavior
class NavigationManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.ensureConsistentNavigation();
        this.preventUnexpectedChanges();
        this.maintainContext();
    }
    
    ensureConsistentNavigation() {
        // Ensure navigation is consistent across pages
        const navItems = document.querySelectorAll('.nav-link');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Add loading state
                item.classList.add('loading');
                
                // Ensure consistent behavior
                setTimeout(() => {
                    item.classList.remove('loading');
                }, 300);
            });
        });
    }
    
    preventUnexpectedChanges() {
        // Prevent unexpected context changes
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                // Validate before submission
                if (!this.validateForm(form)) {
                    e.preventDefault();
                    this.showValidationError(form);
                }
            });
        });
        
        // Prevent unexpected redirects
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a');
            if (target && target.href.includes('external')) {
                // Warn about external links
                if (!confirm('You are leaving this site. Continue?')) {
                    e.preventDefault();
                }
            }
        });
    }
    
    maintainContext() {
        // Maintain user context during interactions
        const modalTriggers = document.querySelectorAll('[data-modal]');
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                // Store current scroll position
                sessionStorage.setItem('scrollPosition', window.pageYOffset);
            });
        });
        
        // Restore context when returning
        window.addEventListener('pageshow', () => {
            const scrollPosition = sessionStorage.getItem('scrollPosition');
            if (scrollPosition) {
                setTimeout(() => {
                    window.scrollTo(0, parseInt(scrollPosition));
                    sessionStorage.removeItem('scrollPosition');
                }, 100);
            }
        });
    }
    
    validateForm(form) {
        // Basic form validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        return isValid;
    }
    
    showValidationError(form) {
        const errorContainer = form.querySelector('.form-errors');
        if (errorContainer) {
            errorContainer.innerHTML = '<p>Please fill in all required fields.</p>';
            errorContainer.style.display = 'block';
        }
    }
}
```

**Specific Requirements:**
- Navigation must be consistent
- User interface components must behave predictably
- Context must be maintained during interactions
- Unexpected changes must be prevented
- User actions must have predictable results

#### 3.3 Input Assistance (WCAG 3.3)
**Requirement:** Help users avoid and correct mistakes

**Implementation:**
```html
<!-- Form with clear labels and instructions -->
<form>
    <div class="form-group">
        <label for="email">Email Address</label>
        <div class="input-instruction">We'll never share your email with anyone else.</div>
        <input type="email" id="email" name="email" required 
               aria-describedby="email-instruction email-error">
        <div id="email-error" class="error-message" role="alert" aria-live="polite"></div>
    </div>
    
    <div class="form-group">
        <label for="name">Full Name</label>
        <input type="text" id="name" name="name" required 
               pattern="[A-Za-z\s]+" 
               title="Please enter only letters and spaces">
        <div class="hint">Example: John Doe</div>
    </div>
    
    <button type="submit">Submit</button>
</form>
```

```javascript
// Enhanced form validation and error handling
class FormValidation {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupValidation();
        this.setupErrorHandling();
        this.setupAssistance();
    }
    
    setupValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                    this.showErrors(form);
                }
            });
            
            // Real-time validation
            form.querySelectorAll('input, textarea, select').forEach(field => {
                field.addEventListener('blur', () => {
                    this.validateField(field);
                });
                
                field.addEventListener('input', () => {
                    this.clearError(field);
                });
            });
        });
    }
    
    validateForm(form) {
        let isValid = true;
        const fields = form.querySelectorAll('input, textarea, select');
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required.';
        }
        
        // Email validation
        else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }
        
        // Pattern validation
        else if (field.hasAttribute('pattern') && value) {
            const pattern = new RegExp(field.getAttribute('pattern'));
            if (!pattern.test(value)) {
                isValid = false;
                errorMessage = field.getAttribute('title') || 'Invalid format.';
            }
        }
        
        // Custom validation
        if (field.dataset.validate) {
            const customResult = this.customValidation(field, value);
            if (!customResult.valid) {
                isValid = false;
                errorMessage = customResult.message;
            }
        }
        
        if (!isValid) {
            this.showError(field, errorMessage);
        } else {
            this.clearError(field);
        }
        
        return isValid;
    }
    
    customValidation(field, value) {
        // Custom validation logic
        switch(field.dataset.validate) {
            case 'name':
                return {
                    valid: /^[A-Za-z\s]{2,}$/.test(value),
                    message: 'Please enter a valid name with at least 2 characters.'
                };
            case 'phone':
                return {
                    valid: /^\d{10}$/.test(value.replace(/\D/g, '')),
                    message: 'Please enter a valid 10-digit phone number.'
                };
            default:
                return { valid: true, message: '' };
        }
    }
    
    showError(field, message) {
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', field.id + '-error');
    }
    
    clearError(field) {
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.style.display = 'none';
        }
        
        field.classList.remove('error');
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
    }
    
    showErrors(form) {
        const errorSummary = form.querySelector('.error-summary');
        if (errorSummary) {
            const errors = form.querySelectorAll('.error');
            if (errors.length > 0) {
                errorSummary.innerHTML = `
                    <h3>Form Errors</h3>
                    <p>Please correct the following errors:</p>
                    <ul>
                        ${Array.from(errors).map(field => 
                            `<li><a href="#${field.id}">${field.labels[0].textContent}</a></li>`
                        ).join('')}
                    </ul>
                `;
                errorSummary.style.display = 'block';
                errors[0].focus();
            }
        }
    }
    
    setupErrorHandling() {
        // Global error handling
        window.addEventListener('error', (e) => {
            this.showGlobalError('An unexpected error occurred. Please try again.');
        });
        
        // Network error handling
        window.addEventListener('offline', () => {
            this.showGlobalError('You are offline. Some features may not be available.');
        });
    }
    
    setupAssistance() {
        // Help text and tooltips
        document.querySelectorAll('[data-help]').forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.showHelp(element, element.dataset.help);
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideHelp();
            });
        });
        
        // Keyboard shortcuts help
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === '/') {
                this.showKeyboardShortcuts();
            }
        });
    }
    
    showHelp(element, message) {
        const helpBubble = document.createElement('div');
        helpBubble.className = 'help-bubble';
        helpBubble.textContent = message;
        
        const rect = element.getBoundingClientRect();
        helpBubble.style.top = (rect.bottom + 5) + 'px';
        helpBubble.style.left = rect.left + 'px';
        
        document.body.appendChild(helpBubble);
        element.helpBubble = helpBubble;
    }
    
    hideHelp() {
        if (document.querySelector('.help-bubble')) {
            document.querySelector('.help-bubble').remove();
        }
    }
    
    showGlobalError(message) {
        const errorBanner = document.createElement('div');
        errorBanner.className = 'global-error';
        errorBanner.innerHTML = `
            <span class="error-icon">⚠️</span>
            <span class="error-message">${message}</span>
            <button class="close-error" aria-label="Close error">✕</button>
        `;
        
        document.body.appendChild(errorBanner);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (errorBanner.parentNode) {
                errorBanner.remove();
            }
        }, 5000);
        
        // Allow manual close
        errorBanner.querySelector('.close-error').addEventListener('click', () => {
            errorBanner.remove();
        });
    }
    
    showKeyboardShortcuts() {
        const shortcutsModal = document.createElement('div');
        shortcutsModal.className = 'shortcuts-modal';
        shortcutsModal.innerHTML = `
            <div class="modal-content">
                <h3>Keyboard Shortcuts</h3>
                <ul>
                    <li><kbd>Ctrl</kbd> + <kbd>K</kbd>: Open search</li>
                    <li><kbd>Ctrl</kbd> + <kbd>/</kbd>: Show help</li>
                    <li><kbd>Ctrl</kbd> + <kbd>N</kbd>: Next page</li>
                    <li><kbd>Ctrl</kbd> + <kbd>P</kbd>: Previous page</li>
                    <li><kbd>Esc</kbd>: Close modal</li>
                </ul>
                <button onclick="this.closest('.shortcuts-modal').remove()">Close</button>
            </div>
        `;
        
        document.body.appendChild(shortcutsModal);
    }
}
```

**Specific Requirements:**
- Form instructions must be clear
- Error messages must be helpful and specific
- Users must be able to identify and correct errors
- Context-sensitive help must be available
- Input assistance must be provided

### 4. Robust Content Requirements

#### 4.1 Compatible (WCAG 4.1)
**Requirement:** Maximize compatibility with current and future user agents

**Implementation:**
```html
<!-- Valid HTML structure -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
    <meta name="description" content="Page description">
</head>
<body>
    <!-- Content -->
</body>
</html>

<!-- Proper ARIA implementation -->
<button aria-expanded="false" aria-controls="dropdown-menu">
    Menu
</button>
<ul id="dropdown-menu" role="menu" aria-hidden="true">
    <li role="menuitem"><a href="#">Option 1</a></li>
    <li role="menuitem"><a href="#">Option 2</a></li>
</ul>

<!-- Semantic HTML -->
<main>
    <article>
        <header>
            <h1>Article Title</h1>
            <time datetime="2026-01-05">January 5, 2026</time>
        </header>
        <section>
            <h2>Section Title</h2>
            <p>Content...</p>
        </section>
    </article>
</main>
```

```javascript
// ARIA live regions for dynamic content
class LiveRegionManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupLiveRegions();
        this.manageAnnouncements();
        this.handleDynamicContent();
    }
    
    setupLiveRegions() {
        // Create live regions for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        
        document.body.appendChild(liveRegion);
    }
    
    manageAnnouncements() {
        // Announce important changes
        this.announce('Page loaded successfully');
        
        // Announce navigation changes
        window.addEventListener('popstate', () => {
            const pageTitle = document.querySelector('title').textContent;
            this.announce(`Navigated to ${pageTitle}`);
        });
    }
    
    handleDynamicContent() {
        // Handle dynamic content updates
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // Announce new content
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            this.announceNewContent(node);
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    announce(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }
    
    announceNewContent(element) {
        // Announce new content based on element type
        if (element.tagName === 'H1' || element.tagName === 'H2') {
            this.announce(`Heading: ${element.textContent}`);
        } else if (element.classList.contains('alert')) {
            this.announce(`Alert: ${element.textContent}`);
        }
    }
}

// Focus management for dynamic content
class FocusManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.manageFocus();
        this.handleModalFocus();
        this.supportScreenReaders();
    }
    
    manageFocus() {
        // Manage focus for dynamic content
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-focus-target]');
            if (target) {
                const focusTarget = document.querySelector(target.dataset.focusTarget);
                if (focusTarget) {
                    focusTarget.focus();
                }
            }
        });
    }
    
    handleModalFocus() {
        // Handle focus for modals
        document.addEventListener('click', (e) => {
            const modalTrigger = e.target.closest('[data-modal-trigger]');
            if (modalTrigger) {
                this.openModal(modalTrigger.dataset.modalTrigger);
            }
        });
    }
    
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            modal.setAttribute('aria-hidden', 'false');
            
            // Focus first focusable element
            const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }
    }
    
    supportScreenReaders() {
        // Support screen reader announcements
        if (window.speechSynthesis) {
            // Speech synthesis support
            this.setupSpeechSynthesis();
        }
        
        // Support for screen reader detection
        this.detectScreenReader();
    }
    
    setupSpeechSynthesis() {
        // Setup speech synthesis for important announcements
        const speakButton = document.querySelector('[data-speak]');
        if (speakButton) {
            speakButton.addEventListener('click', () => {
                const text = speakButton.dataset.speak;
                this.speakText(text);
            });
        }
    }
    
    speakText(text) {
        if (window.speechSynthesis) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 1;
            utterance.pitch = 1;
            window.speechSynthesis.speak(utterance);
        }
    }
    
    detectScreenReader() {
        // Detect screen reader usage
        const screenReaderDetected = window.navigator.userAgent.includes('NVDA') ||
                                   window.navigator.userAgent.includes('JAWS') ||
                                   window.navigator.userAgent.includes('VoiceOver');
        
        if (screenReaderDetected) {
            document.body.classList.add('screen-reader-detected');
            this.optimizeForScreenReader();
        }
    }
    
    optimizeForScreenReader() {
        // Optimize content for screen readers
        document.querySelectorAll('img').forEach(img => {
            if (!img.alt && !img.hasAttribute('aria-hidden')) {
                img.alt = 'Image description not available';
            }
        });
        
        // Add aria-labels to interactive elements without text
        document.querySelectorAll('button[aria-label=""]').forEach(button => {
            button.setAttribute('aria-label', 'Button');
        });
    }
}
```

**Specific Requirements:**
- HTML must be valid and well-formed
- ARIA roles and properties must be used correctly
- Dynamic content must be announced to assistive technologies
- Focus management must be handled properly
- Content must be compatible with assistive technologies

## Implementation Checklist

### Phase 1: Foundation (Weeks 1-2)
- [ ] Semantic HTML structure
- [ ] Basic keyboard navigation
- [ ] Color contrast compliance
- [ ] Text alternatives for images
- [ ] Form accessibility

### Phase 2: Enhancement (Weeks 3-4)
- [ ] Advanced ARIA implementation
- [ ] Screen reader optimization
- [ ] Keyboard shortcut support
- [ ] Error handling and validation
- [ ] Focus management

### Phase 3: Polish (Weeks 5-6)
- [ ] Screen reader testing
- [ ] Keyboard navigation testing
- [ ] Assistive technology compatibility
- [ ] Performance optimization for accessibility
- [ ] User testing with disabilities

## Testing and Validation

### Automated Testing Tools
- **axe-core** - Automated accessibility testing
- **Lighthouse** - Performance and accessibility auditing
- **Pa11y** - Command-line accessibility testing
- **WAVE** - Web accessibility evaluation

### Manual Testing Requirements
- **Keyboard Navigation** - Test all functionality with keyboard only
- **Screen Reader Testing** - Test with NVDA, JAWS, and VoiceOver
- **Color Contrast Testing** - Verify contrast ratios manually
- **Text Resizing** - Test text scaling up to 200%
- **Motion Sensitivity** - Test reduced motion preferences

### User Testing
- **Users with Visual Impairments** - Screen reader and keyboard navigation
- **Users with Motor Impairments** - Keyboard and alternative input testing
- **Users with Cognitive Disabilities** - Content clarity and navigation testing
- **Users with Hearing Impairments** - Visual alternatives for audio content

## Success Metrics

### Compliance Metrics
- **WCAG 2.1 AA Compliance:** 100% compliance with all Level AA success criteria
- **Automated Testing Score:** 100% pass rate on automated accessibility tests
- **Manual Testing Score:** 100% pass rate on manual accessibility testing

### User Experience Metrics
- **Screen Reader Compatibility:** 100% compatibility with major screen readers
- **Keyboard Navigation:** 100% of functionality accessible via keyboard
- **Error Recovery:** 100% of errors must be recoverable by users
- **Content Understanding:** 95% of users can understand and use content

### Performance Metrics
- **Accessibility Performance:** No performance degradation due to accessibility features
- **Loading Time:** Page load time under 3 seconds with accessibility features
- **Compatibility:** 100% compatibility with major assistive technologies

## Conclusion

These accessibility requirements ensure that the Odisha Sacred Odyssey website is inclusive and usable by all users, regardless of their abilities or assistive technology needs. The comprehensive approach covers all aspects of WCAG 2.1 Level AA compliance while maintaining the sacred, spiritual aesthetic of the site.

The phased implementation allows for careful testing and validation while ensuring that accessibility is built into the foundation of the website rather than added as an afterthought.