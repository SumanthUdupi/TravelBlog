# Implementation Guidance

## Library Recommendations

### Core Dependencies (CDN-Hosted, Free)

#### Marked.js (Markdown Parser)
- **Version**: 12.0.2
- **CDN**: `https://cdn.jsdelivr.net/npm/marked@12.0.2/lib/marked.umd.js`
- **Usage**: Convert Markdown content to HTML during build process
- **Configuration**:
  ```javascript
  const marked = new Marked({
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false
  });
  ```

#### DOMPurify (HTML Sanitization)
- **Version**: 3.1.0
- **CDN**: `https://cdn.jsdelivr.net/npm/dompurify@3.1.0/dist/purify.min.js`
- **Usage**: Sanitize user-generated content and processed HTML
- **Configuration**:
  ```javascript
  const cleanHTML = DOMPurify.sanitize(dirtyHTML, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'blockquote'],
    ALLOWED_ATTR: ['href', 'target']
  });
  ```

#### Fuse.js (Fuzzy Search)
- **Version**: 7.0.0
- **CDN**: `https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js`
- **Usage**: Client-side search with fuzzy matching
- **Configuration**:
  ```javascript
  const fuse = new Fuse(posts, {
    keys: ['title', 'content', 'tags'],
    threshold: 0.3,
    includeScore: true
  });
  ```

#### LocalForage (IndexedDB Wrapper)
- **Version**: 1.10.0
- **CDN**: `https://cdn.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js`
- **Usage**: Simplified IndexedDB operations for bookmarks and progress
- **Configuration**:
  ```javascript
  localforage.config({
    name: 'TravelBlogDB',
    storeName: 'bookmarks'
  });
  ```

### Build-Time Tools (Free)

#### Eleventy (Static Site Generator)
- **Version**: 2.0.1
- **Installation**: `npm install @11ty/eleventy`
- **Usage**: Process Markdown files and generate static HTML
- **Configuration** (eleventy.config.js):
  ```javascript
  module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addFilter("markdown", (content) => marked.parse(content));
    return {
      dir: {
        input: "src",
        output: "dist"
      }
    };
  };
  ```

#### PostCSS (CSS Processing)
- **Version**: 8.4.32
- **Installation**: `npm install postcss postcss-cli autoprefixer cssnano`
- **Usage**: Process CSS with autoprefixing and minification
- **Configuration** (postcss.config.js):
  ```javascript
  module.exports = {
    plugins: [
      require('autoprefixer'),
      require('cssnano')({ preset: 'default' })
    ]
  };
  ```

## Code Patterns

### Component Pattern (Vanilla JS)
```javascript
class PostCard {
  constructor(data) {
    this.data = data;
    this.element = null;
  }

  render() {
    this.element = document.createElement('article');
    this.element.className = 'post-card';
    this.element.innerHTML = `
      <h3><a href="/blog/${this.data.id}">${this.data.title}</a></h3>
      <p class="excerpt">${this.data.excerpt}</p>
      <div class="meta">
        <time>${this.formatDate(this.data.date)}</time>
        <span class="tags">${this.data.tags.join(', ')}</span>
      </div>
    `;
    this.attachEventListeners();
    return this.element;
  }

  attachEventListeners() {
    const link = this.element.querySelector('a');
    link.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleClick();
    });
  }

  handleClick() {
    // Navigation logic
    window.location.href = `/blog/${this.data.id}`;
  }

  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
```

### State Management Pattern
```javascript
class AppState {
  constructor() {
    this.state = {
      theme: 'light',
      search: { query: '', results: [] },
      reading: { progress: 0 }
    };
    this.listeners = [];
  }

  getState() {
    return { ...this.state };
  }

  setState(updates) {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
    this.persistState();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }

  persistState() {
    try {
      localStorage.setItem('appState', JSON.stringify(this.state));
    } catch (e) {
      console.warn('Failed to persist state:', e);
    }
  }

  loadPersistedState() {
    try {
      const persisted = localStorage.getItem('appState');
      if (persisted) {
        this.state = { ...this.state, ...JSON.parse(persisted) };
      }
    } catch (e) {
      console.warn('Failed to load persisted state:', e);
    }
  }
}
```

### Event Handling Pattern
```javascript
class EventManager {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => {
        try {
          callback(data);
        } catch (e) {
          console.error(`Error in ${event} handler:`, e);
        }
      });
    }
  }
}

// Usage
const events = new EventManager();
events.on('themeChange', (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
});
events.emit('themeChange', 'dark');
```

## Naming Conventions

### Files and Directories
- **HTML Files**: kebab-case (e.g., `blog-post.html`, `contact-form.html`)
- **JavaScript Files**: camelCase (e.g., `readingControls.js`, `searchHandler.js`)
- **CSS Files**: kebab-case (e.g., `main-styles.css`, `reading-theme.css`)
- **Directories**: lowercase (e.g., `assets/`, `components/`, `data/`)

### JavaScript
- **Variables**: camelCase (e.g., `userPreferences`, `searchQuery`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_THEME`, `MAX_FONT_SIZE`)
- **Functions**: camelCase (e.g., `formatDate()`, `handleSearch()`)
- **Classes**: PascalCase (e.g., `PostCard`, `ReadingControls`)
- **Methods**: camelCase (e.g., `render()`, `attachEventListeners()`)

### CSS
- **Classes**: kebab-case (e.g., `.post-card`, `.reading-controls`)
- **IDs**: camelCase (e.g., `#mainContent`, `#searchInput`)
- **Custom Properties**: kebab-case with prefix (e.g., `--color-primary`, `--font-size-base`)
- **BEM Methodology**: `.block__element--modifier`

### Data Attributes
- **HTML**: kebab-case (e.g., `data-post-id`, `data-theme-toggle`)
- **JavaScript**: camelCase when accessing (e.g., `element.dataset.postId`)

## Testing Criteria

### Unit Testing (Manual)
- **Function Purity**: Test pure functions with multiple inputs
- **DOM Manipulation**: Verify element creation and attribute setting
- **State Updates**: Confirm state changes trigger correct side effects
- **Event Handling**: Test event listeners fire appropriate callbacks

### Integration Testing
- **Component Rendering**: Verify components render correctly with data
- **State Persistence**: Test LocalStorage/IndexedDB save/load cycles
- **Search Functionality**: Validate search results accuracy and performance
- **Responsive Behavior**: Test layout changes across breakpoints

### Cross-Browser Testing
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Feature Detection**: Test fallbacks for unsupported features

### Performance Testing
- **Load Times**: Target <2s for initial page load
- **Search Speed**: <100ms for search queries
- **Scroll Performance**: 60fps during scroll with effects enabled
- **Memory Usage**: <50MB for IndexedDB storage

### Accessibility Testing
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliance (4.5:1 ratio)
- **Motion Preferences**: Respects `prefers-reduced-motion`

### SEO Testing
- **Meta Tags**: Verify Open Graph and Twitter Card tags
- **Structured Data**: Test with Google's Rich Results Tool
- **Page Speed**: Score >90 on Lighthouse performance
- **Mobile Friendliness**: Pass Google's Mobile-Friendly Test

## Build Process

### Development Setup
```bash
# Install dependencies
npm install

# Start development server
npx eleventy --serve --port 8080

# Watch for changes
npx eleventy --watch
```

### Production Build
```bash
# Build static files
npx eleventy

# Optimize assets
npx postcss src/assets/css/*.css --dir dist/assets/css --ext .min.css

# Minify JavaScript (if needed)
# Deploy to GitHub Pages
git add dist/
git commit -m "Build for production"
git push origin main
```

### Deployment Checklist
- [ ] All Markdown files processed to HTML
- [ ] CSS minified and autoprefixed
- [ ] JavaScript bundled and minified (if applicable)
- [ ] Images optimized and responsive
- [ ] Search index generated
- [ ] Sitemap.xml created
- [ ] Robots.txt configured
- [ ] GitHub Pages settings configured
- [ ] Custom domain set (if applicable)

## Error Handling

### Client-Side Errors
```javascript
function safeExecute(fn, fallback = null) {
  try {
    return fn();
  } catch (error) {
    console.error('Execution failed:', error);
    reportError(error);
    return fallback;
  }
}

function reportError(error) {
  // Send to error tracking service (if available)
  // For now, just log to console
  console.error('Application Error:', {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  });
}
```

### Build-Time Errors
- Validate Markdown frontmatter
- Check for broken links
- Verify data integrity
- Fail build on critical errors

## Performance Optimization

### Critical Rendering Path
- Inline critical CSS
- Defer non-critical JavaScript
- Preload key resources
- Optimize font loading

### Runtime Performance
- Use `requestAnimationFrame` for animations
- Debounce scroll and resize events
- Virtualize large lists
- Lazy load images and content

### Bundle Analysis
- Keep JavaScript under 100KB gzipped
- Minimize CSS to under 50KB
- Optimize images to WebP format
- Use CDN for external libraries