# Technical Specifications

## Responsive Breakpoints

### Mobile-First Approach
All designs start from mobile (320px) and scale up to larger screens.

#### Breakpoint Definitions
```css
:root {
  --breakpoint-sm: 576px;   /* Small tablets */
  --breakpoint-md: 768px;   /* Tablets */
  --breakpoint-lg: 992px;   /* Small desktops */
  --breakpoint-xl: 1200px;  /* Large desktops */
  --breakpoint-xxl: 1400px; /* Extra large screens */
}
```

#### Layout Breakpoints
- **Mobile (320px - 767px)**:
  - Single column layout
  - Stacked navigation (hamburger menu)
  - Touch-optimized controls (44px minimum touch targets)
  - Full-width content with minimal margins

- **Tablet (768px - 991px)**:
  - Two-column grid for post listings
  - Collapsible sidebar for filters
  - Medium-sized typography and spacing
  - Touch-friendly but keyboard accessible

- **Desktop (992px - 1199px)**:
  - Three-column layout with persistent sidebar
  - Full navigation bar
  - Optimized for mouse and keyboard interaction
  - Larger typography for reading comfort

- **Large Desktop (1200px+)**:
  - Four-column potential for wide screens
  - Enhanced spacing and typography
  - High-resolution asset optimization

### Component-Specific Breakpoints

#### Post Grid
```css
.post-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .post-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (min-width: 992px) {
  .post-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
```

#### Reading Layout
```css
.reading-content {
  max-width: 100%;
  padding: 1rem;
}

@media (min-width: 768px) {
  .reading-content {
    max-width: 720px;
    padding: 2rem;
  }
}

@media (min-width: 992px) {
  .reading-content {
    max-width: 800px;
    padding: 3rem 4rem;
  }
}
```

## Browser Compatibility

### Supported Browsers
- **Chrome**: 90+ (released January 2021)
- **Firefox**: 88+ (released January 2021)
- **Safari**: 14+ (released September 2020)
- **Edge**: 90+ (Chromium-based, released 2021)
- **Mobile Safari**: iOS 14+
- **Chrome Mobile**: Android 90+

### Feature Detection and Fallbacks

#### CSS Feature Queries
```css
@supports (display: grid) {
  .post-grid {
    display: grid;
  }
}

@supports not (display: grid) {
  .post-grid {
    display: flex;
    flex-wrap: wrap;
  }
}
```

#### JavaScript Feature Detection
```javascript
// IndexedDB support
const supportsIndexedDB = 'indexedDB' in window;

// LocalStorage support
const supportsLocalStorage = (() => {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return true;
  } catch {
    return false;
  }
})();

// CSS Custom Properties support
const supportsCSSVars = CSS && CSS.supports && CSS.supports('--test', 'value');
```

### Progressive Enhancement Strategy

#### Core Functionality (No JavaScript)
- Basic HTML navigation
- Readable content without styles
- Form submission to fallback endpoint

#### Enhanced Experience (JavaScript Enabled)
- Client-side search and filtering
- Reading progress tracking
- Theme switching and preferences

#### Advanced Features (Modern Browsers)
- Lantern cursor effects
- IndexedDB for offline capabilities
- Advanced CSS animations

## Performance Optimizations

### Core Web Vitals Targets
- **Largest Contentful Paint (LCP)**: <2.5 seconds
- **First Input Delay (FID)**: <100 milliseconds
- **Cumulative Layout Shift (CLS)**: <0.1

### Loading Performance

#### Critical Resource Optimization
```html
<!-- Preload critical resources -->
<link rel="preload" href="/assets/css/critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/assets/js/app.js" as="script">

<!-- DNS prefetch for CDNs -->
<link rel="dns-prefetch" href="//cdn.jsdelivr.net">
```

#### Font Loading Optimization
```css
@font-face {
  font-family: 'Reading Serif';
  src: url('/assets/fonts/reading-serif.woff2') format('woff2');
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

#### JavaScript Loading Strategy
```html
<!-- Defer non-critical JavaScript -->
<script defer src="/assets/js/search.js"></script>
<script defer src="/assets/js/reading-effects.js"></script>

<!-- Critical JavaScript inlined -->
<script>
  // Inline critical functionality
  function toggleTheme() {
    document.documentElement.classList.toggle('dark-theme');
  }
</script>
```

### Runtime Performance

#### Animation Optimization
```javascript
function animateLanternCursor(x, y) {
  requestAnimationFrame(() => {
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
}

// Throttled scroll handler
function throttleScroll(callback, delay = 16) {
  let timeoutId;
  return function() {
    if (timeoutId) return;
    timeoutId = setTimeout(() => {
      callback.apply(this, arguments);
      timeoutId = null;
    }, delay);
  };
}
```

#### Memory Management
```javascript
class VirtualList {
  constructor(container, items, itemHeight) {
    this.container = container;
    this.items = items;
    this.itemHeight = itemHeight;
    this.visibleItems = 10; // Only render visible items
    this.scrollTop = 0;
  }

  render() {
    const startIndex = Math.floor(this.scrollTop / this.itemHeight);
    const endIndex = startIndex + this.visibleItems;

    // Clear previous items
    this.container.innerHTML = '';

    // Render only visible items
    for (let i = startIndex; i < endIndex && i < this.items.length; i++) {
      const item = this.createItemElement(this.items[i]);
      item.style.transform = `translateY(${i * this.itemHeight}px)`;
      this.container.appendChild(item);
    }
  }
}
```

## Asset Guidelines

### Image Optimization

#### Formats and Compression
- **Primary Format**: WebP for modern browsers, JPEG/PNG fallback
- **Compression**: 80-90% quality for JPEG, lossless for WebP
- **Maximum Dimensions**: 1920px wide for desktop, 800px for mobile
- **File Size Limits**: <500KB for hero images, <100KB for thumbnails

#### Responsive Images
```html
<picture>
  <source srcset="/assets/images/post-hero-800.webp 800w, /assets/images/post-hero-1200.webp 1200w"
          sizes="(max-width: 768px) 100vw, 50vw"
          type="image/webp">
  <img src="/assets/images/post-hero-800.jpg"
       srcset="/assets/images/post-hero-800.jpg 800w, /assets/images/post-hero-1200.jpg 1200w"
       sizes="(max-width: 768px) 100vw, 50vw"
       alt="Post hero image"
       loading="lazy">
</picture>
```

### CSS Architecture

#### File Organization
```
assets/css/
├── base/
│   ├── reset.css          # CSS reset/normalize
│   ├── typography.css     # Font definitions and text styles
│   └── variables.css      # CSS custom properties
├── components/
│   ├── header.css         # Header component styles
│   ├── post-card.css      # Post card component styles
│   ├── reading.css        # Reading experience styles
│   └── forms.css          # Form component styles
├── utilities/
│   ├── layout.css         # Grid and flex utilities
│   ├── spacing.css        # Margin/padding utilities
│   └── visibility.css     # Display/hidden utilities
└── themes/
    ├── light-theme.css    # Light theme variables
    └── dark-theme.css     # Dark theme variables
```

#### CSS Custom Properties
```css
:root {
  /* Colors */
  --color-primary: #2c3e50;
  --color-secondary: #3498db;
  --color-accent: #e74c3c;
  --color-text: #333333;
  --color-background: #ffffff;

  /* Typography */
  --font-family-base: 'Inter', system-ui, sans-serif;
  --font-family-heading: 'Crimson Text', serif;
  --font-size-base: 16px;
  --line-height-base: 1.6;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Layout */
  --container-max-width: 1200px;
  --reading-max-width: 800px;
}
```

### JavaScript Architecture

#### Module Organization
```
assets/js/
├── core/
│   ├── state.js           # Application state management
│   ├── events.js          # Event management system
│   └── utils.js           # Utility functions
├── components/
│   ├── PostCard.js        # Post card component
│   ├── SearchForm.js      # Search component
│   └── ReadingControls.js # Reading controls component
├── features/
│   ├── search.js          # Search functionality
│   ├── reading.js         # Reading experience features
│   └── themes.js          # Theme switching
└── data/
    ├── posts.js           # Post data management
    └── storage.js         # LocalStorage/IndexedDB wrappers
```

#### Bundle Strategy
- **Core Bundle**: <50KB gzipped (state, events, utils)
- **Component Bundle**: <30KB gzipped (UI components)
- **Feature Bundles**: <20KB each (search, reading, themes)
- **Vendor Libraries**: CDN-hosted, cached separately

### Accessibility Standards

#### WCAG 2.1 AA Compliance
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators**: Visible focus outlines on all interactive elements
- **Keyboard Navigation**: All functionality accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and semantic HTML

#### Motion and Animation
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Security Considerations

#### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' https://fonts.googleapis.com;
  connect-src 'self' https://formspree.io;
">
```

#### Input Sanitization
- All user inputs sanitized with DOMPurify
- HTML content validated before rendering
- External links validated and marked with security attributes

### Monitoring and Analytics

#### Performance Monitoring
```javascript
// Core Web Vitals tracking
import {onCLS, onFID, onFCP, onLCP, onTTFB} from 'web-vitals';

onCLS(console.log);
onFID(console.log);
onFCP(console.log);
onLCP(console.log);
onTTFB(console.log);
```

#### Error Tracking
```javascript
window.addEventListener('error', (event) => {
  // Send error to monitoring service
  console.error('JavaScript Error:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    stack: event.error?.stack
  });
});

window.addEventListener('unhandledrejection', (event) => {
  // Send promise rejection to monitoring service
  console.error('Unhandled Promise Rejection:', event.reason);
});
```

### Testing Environment

#### Local Development
- Use Eleventy's development server with live reload
- Enable source maps for debugging
- Test across multiple browsers using BrowserStack (free tier)

#### Production Deployment
- Automated build process with error checking
- Asset optimization and minification
- Deploy to GitHub Pages with custom domain
- Monitor for broken links and performance regressions