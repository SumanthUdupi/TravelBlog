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
- No frameworks to minimize bundle size and maintain $0 budget
- Progressive enhancement for core functionality
- Client-side routing for single-page app feel (optional, using History API)

### Data Storage Strategy

#### LocalStorage
- User preferences (theme, typography settings, reading progress)
- Cached search results and filter states
- Reading session data (current position, bookmarks)

#### IndexedDB
- Full-text search index for blog posts
- Tag relationships and constellation mappings
- User-generated content (bookmarks, notes) if implemented

#### Static JSON Files
- Blog post metadata and content (pre-processed from Markdown)
- Tag definitions and hierarchical relationships
- Site configuration and navigation structure

### File/Folder Structure with Tree Diagram

```
c:/Users/su2/OneDrive - rgbsi.co.in/Desktop/NEWEHS/TravelBlog/
├── Blog/
│   ├── raw/                # Source Markdown files
│   │   ├── Jai Jagannath.md
│   │   └── odisha_sacred_odyssey.md
│   └── research/           # Additional research content
│       ├── Chausath Yogini.md
│       ├── Konark Sun Temple.md
│       └── ...
├── Design_Documents/       # This documentation
│   ├── Architecture_Overview.md
│   ├── Feature_Specifications.md
│   ├── Component_Details.md
│   ├── Data_Models.md
│   ├── Implementation_Guidance.md
│   └── Technical_Specifications.md
├── Requirements/           # Project requirements
├── plans/                  # Implementation plans
└── [Future Build Output]/
    ├── index.html
    ├── assets/
    └── data/
```

### Build Process

1. **Content Processing**: Convert Markdown files from Blog/raw and Blog/research to HTML using a static site generator (e.g., Eleventy or custom Node.js script)
2. **Asset Optimization**: Minify CSS/JS, compress images, generate responsive image variants
3. **Data Generation**: Create JSON files for post metadata, search indexes, and tag relationships
4. **Deployment**: Push built files to GitHub repository, enable Pages deployment

### Performance Considerations

- Lazy loading for images and non-critical JavaScript
- Service Worker for caching static assets (if needed for offline reading)
- Minimal JavaScript bundle size (<50KB gzipped)
- Optimized font loading with font-display: swap
- Critical CSS inlined for above-the-fold content

### Scalability

- Static generation allows handling thousands of posts without performance degradation
- Client-side search scales with IndexedDB indexing
- CDN delivery through GitHub's global infrastructure
- No database queries or server-side bottlenecks

This architecture ensures the site remains fast, accessible, and maintainable while adhering to the $0 budget constraint and static hosting requirements.