# Architecture Overview

## Static Site Structure for GitHub Pages

The TravelBlog personal website will be deployed as a static site on GitHub Pages, utilizing the default GitHub domain (username.github.io/repository-name). The site will consist of pre-built HTML, CSS, and JavaScript files generated from source code, with no server-side processing or dynamic content generation at runtime.

### Site Structure

```
travelblog/
├── index.html              # Home page with blog post list
├── blog/
│   ├── index.html          # Blog listing page
│   ├── post1.html          # Individual blog post pages
│   ├── post2.html
│   └── ...
├── about.html              # About page
├── contact.html            # Contact form page
├── assets/
│   ├── css/
│   │   ├── main.css        # Main stylesheet
│   │   ├── reading.css     # Immersive reading styles
│   │   └── lantern.css     # Lantern cursor styles
│   ├── js/
│   │   ├── app.js          # Main application logic
│   │   ├── reading.js      # Reading experience features
│   │   └── search.js       # Search and filter functionality
│   └── images/             # Static images and icons
├── data/
│   ├── posts.json          # Pre-processed blog post metadata
│   └── tags.json           # Tag definitions for content discovery
└── _config.yml             # GitHub Pages configuration
```

### Client-Side Technology Stack

#### HTML5
- Semantic HTML5 structure for accessibility and SEO
- Microdata schema for blog posts and articles
- Responsive design with mobile-first approach

#### CSS3
- Vanilla CSS3 with custom properties for theming
- CSS Grid and Flexbox for layout
- CSS animations for atmospheric effects (lantern cursor, vignette overlays)
- Dark/light mode toggle with user preference persistence

#### JavaScript (Vanilla)
- ES6+ features for modern browser compatibility
- No frameworks (no React, Vue, jQuery) to minimize bundle size and maintain $0 budget
- Progressive enhancement for core functionality
- Client-side routing for single-page app feel (optional, using History API)

### Data Storage Strategy

#### LocalStorage
- User preferences (theme, typography settings, reading progress)
- Cached search results and filter states
- Reading session data (current position, bookmarks)

#### Static JSON Files
- **posts.json**: Primary data source. Contains blog post metadata, tags, and search tokens.
- **tags.json**: Tag definitions, hierarchies (Domain > Topic > Subtopic), and relationships.
- **site_config.json**: Global site settings (title, author, nav links).

#### IndexedDB (Optional/Future)
- Only if post count exceeds 500+ or full-text search performance degrades significantly.
- Initially, `fetch('data/posts.json')` + client-side filter is sufficient.

### File/Folder Structure with Tree Diagram

```
c:/Users/su2/OneDrive - rgbsi.co.in/Desktop/NEWEHS/TravelBlog/
├── Blog/
│   ├── raw/                # Source Markdown files (Published Content)
│   │   ├── Jai Jagannath.md
│   │   └── odisha_sacred_odyssey.md
│   └── research/           # Research notes (NOT Published automatically)
│       ├── Chausath Yogini.md
│       └── ...
├── Documents/
│   ├── Design_Documents/   # This documentation
│   └── Requirements/       # Project requirements
├── templates/              # Jinja2 HTML Templates
│   ├── base.html
│   ├── article.html
│   └── components/
├── build_site.py           # Python Static Site Generator
└── [Build Output Root]/
    ├── index.html
    ├── assets/
    └── data/
```

### Build Process (Python Static Generator)

The project relies on a custom Python script (`build_site.py`) to generate the static site.

1.  **Environment**: Python 3.9+ with `markdown`, `jinja2`, `beautifulsoup4`.
2.  **Source Scanning**: Recursively scan `Blog/raw/*.md` for publishable content.
3.  **Processing**:
    *   **Frontmatter Parsing**: Extract metadata (title, date, tags, citation_ids).
    *   **Markdown Conversion**: Convert body text to HTML.
    *   **Citation Mapping**: Transform `[Superscript]^1` to HTML anchors linking to a reference list.
    *   **Slugification**: Convert filenames to snake_case for clean URLs.
4.  **Templating**: Inject content into `templates/base.html` and `templates/article.html`.
5.  **Output**: Write static HTML files to the root directory (or `docs/` depending on GitHub Pages config).
6.  **Index Generation**: Build `data/posts.json` containing search metadata (title, tags, excerpt, slug).

### Performance Considerations

- Lazy loading for images and non-critical JavaScript
- Service Worker for caching static assets (if needed for offline reading)
- Minimal JavaScript bundle size (<50KB gzipped)
- Optimized font loading with font-display: swap
- Critical CSS inlined for above-the-fold content

### Scalability

- Static generation allows handling thousands of posts without performance degradation
- Client-side search scales with JSON fetching (up to ~1MB JSON is acceptable)
- CDN delivery through GitHub's global infrastructure
- No database queries or server-side bottlenecks
