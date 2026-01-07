# Component Details

## Page Layouts

### Home Page (index.html)

#### Layout Structure
```
┌─────────────────────────────────────────────────┐
│ Header (Fixed)                                  │
│ ├─ Site Title & Navigation                     │
│ └─ Theme Toggle & Search Bar                   │
├─────────────────────────────────────────────────┤
│ Hero Section                                    │
│ ├─ Featured Post Card                          │
│ └─ Tag Cloud Navigation                        │
├─────────────────────────────────────────────────┤
│ Recent Posts Grid (3-column responsive)         │
│ ├─ Post Card 1                                 │
│ ├─ Post Card 2                                 │
│ └─ Post Card N                                 │
├─────────────────────────────────────────────────┤
│ Footer                                          │
│ ├─ About Link & Contact                        │
│ └─ Copyright & Build Info                      │
└─────────────────────────────────────────────────┘
```

#### Component Hierarchy
- **App Container**: Root element with theme class
- **Header Component**: Navigation and global controls
- **Hero Component**: Featured content showcase
- **PostGrid Component**: Responsive card layout
- **Footer Component**: Site information and links

### Blog List Page (blog/index.html)

#### Layout Structure
```
┌─────────────────────────────────────────────────┐
│ Header (Fixed)                                  │
├─────────────────────────────────────────────────┤
│ Filters Sidebar (Collapsible)                   │
│ ├─ Search Input                                │
│ ├─ Tag Filter Checkboxes                       │
│ ├─ Date Range Picker                           │
│ └─ Sort Options                                │
├─────────────────────────────────────────────────┤
│ Main Content                                    │
│ ├─ Results Header (X results for "query")      │
│ └─ Post List (Infinite scroll)                 │
│    ├─ Post Card 1                              │
│    ├─ Post Card 2                              │
│    └─ Load More Button                         │
├─────────────────────────────────────────────────┤
│ Footer                                          │
└─────────────────────────────────────────────────┘
```

#### Component Hierarchy
- **FilterPanel Component**: Search and filter controls
- **PostList Component**: Virtualized list with lazy loading
- **PostCard Component**: Reusable post preview
- **LoadMore Component**: Pagination trigger

### Post View Page (blog/post-slug.html)

#### Layout Structure
```
┌─────────────────────────────────────────────────┐
│ Reading Header (Fixed on scroll)                │
│ ├─ Back Button & Post Title                    │
│ ├─ Progress Bar                                │
│ └─ Reading Controls (Font, Theme, Bookmark)    │
├─────────────────────────────────────────────────┤
│ Reading Area                                    │
│ ├─ Article Header (Title, Meta, Tags)          │
│ ├─ Content Body (Markdown-rendered)            │
│ └─ Article Footer (Share, Related Posts)       │
├─────────────────────────────────────────────────┤
│ Footer (Minimal)                                │
└─────────────────────────────────────────────────┘
```

#### Component Hierarchy
- **ReadingHeader Component**: Navigation and controls
- **ArticleContent Component**: Main content with immersive features
- **ReadingControls Component**: Typography and theme settings
- **ProgressIndicator Component**: Reading progress visualization

### Contact Page (contact.html)

#### Layout Structure
```
┌─────────────────────────────────────────────────┐
│ Header                                        │
├─────────────────────────────────────────────────┤
│ Contact Form Section                           │
│ ├─ Form Title & Description                    │
│ ├─ Contact Form                                │
│ │  ├─ Name Field                               │
│ │  ├─ Email Field                              │
│ │  ├─ Subject Field                            │
│ │  ├─ Message Field                            │
│ │  └─ Submit Button                            │
│ └─ Success/Error Messages                      │
├─────────────────────────────────────────────────┤
│ Footer                                          │
└─────────────────────────────────────────────────┘
```

#### Component Hierarchy
- **ContactForm Component**: Form with validation
- **FormField Component**: Reusable input wrapper
- **MessageDisplay Component**: Status feedback

## UI Hierarchy

### Global Components
- **ThemeProvider**: Manages dark/light mode state
- **Router**: Handles navigation (if using SPA approach)
- **SearchProvider**: Manages search state across pages

### Shared Components
- **Header**: Site navigation and global actions
- **PostCard**: Post preview with image, title, excerpt, meta
- **Tag**: Interactive tag element with click handling
- **Button**: Consistent button styling and behavior
- **Modal**: Overlay for settings and confirmations

### Page-Specific Components
- **HeroSection**: Home page featured content
- **FilterPanel**: Blog list filtering interface
- **ReadingControls**: Post view customization
- **ContactForm**: Contact page form handling

## State Management (Vanilla JavaScript)

### Global State Structure
```javascript
const appState = {
  theme: 'light', // 'light' | 'dark' | 'auto'
  userPreferences: {
    fontSize: 18,
    lineHeight: 1.6,
    lanternEnabled: true,
    ambientLighting: 'auto'
  },
  search: {
    query: '',
    filters: {
      tags: [],
      dateRange: null,
      sortBy: 'date-desc'
    },
    results: [],
    currentPage: 1
  },
  reading: {
    currentPost: null,
    progress: 0,
    bookmarks: []
  }
};
```

### State Management Pattern
- **Central Store**: Single object for all application state
- **State Updates**: Pure functions that return new state objects
- **Event-Driven**: State changes triggered by user events
- **Persistence**: LocalStorage for user preferences and bookmarks
- **Reactive Updates**: DOM updates triggered by state changes

### State Update Functions
```javascript
function updateTheme(newTheme) {
  appState.theme = newTheme;
  applyThemeToDOM();
  saveToLocalStorage('theme', newTheme);
}

function updateSearchQuery(query) {
  appState.search.query = query;
  appState.search.results = performSearch(query);
  renderSearchResults();
}

function updateReadingProgress(postId, progress) {
  appState.reading.progress = progress;
  updateProgressBar(progress);
  saveReadingProgress(postId, progress);
}
```

## Event Handlers

### Global Event Handlers
- **DOMContentLoaded**: Initialize app state from LocalStorage
- **beforeunload**: Save current state to LocalStorage
- **resize**: Update responsive layouts and recalculate positions
- **visibilitychange**: Pause/resume animations for performance

### Component Event Handlers

#### Header Component
- **Navigation Click**: Update active page, trigger page transition
- **Search Input**: Debounced search with real-time suggestions
- **Theme Toggle**: Switch theme, update state, apply CSS classes

#### PostCard Component
- **Click**: Navigate to post page, update reading state
- **Tag Click**: Add tag to search filters, navigate to filtered list
- **Bookmark Toggle**: Add/remove from bookmarks array

#### ReadingControls Component
- **Font Size Slider**: Update CSS custom properties, save preference
- **Theme Select**: Change reading theme, update ambient lighting
- **Bookmark Button**: Save current scroll position to bookmarks

#### FilterPanel Component
- **Tag Checkbox**: Add/remove from filters array, trigger search
- **Date Range**: Update date filters, validate range
- **Sort Select**: Change sort order, re-sort results

#### ContactForm Component
- **Input Focus/Blur**: Show/hide validation messages
- **Input Change**: Real-time validation, update field state
- **Form Submit**: Validate all fields, send to Formspree, show feedback

### Event Handler Patterns
- **Event Delegation**: Use parent elements for dynamic content
- **Debouncing**: For search inputs and resize events
- **Passive Listeners**: For scroll and touch events
- **Error Boundaries**: Try-catch blocks for async operations

### Performance Optimizations
- **Throttled Handlers**: Limit execution frequency for scroll events
- **Lazy Event Binding**: Attach handlers only when components are visible
- **Cleanup**: Remove event listeners on component destruction
- **Memory Management**: Clear timeouts and intervals in cleanup

## Responsive Design Breakpoints

### Mobile First Approach
- **Small (320px - 767px)**: Single column, stacked layout
- **Medium (768px - 1023px)**: Two-column grid, collapsible sidebar
- **Large (1024px+)**: Three-column grid, persistent sidebar

### Component Responsiveness
- **Header**: Collapses to hamburger menu on mobile
- **PostGrid**: 1 column mobile, 2 tablet, 3 desktop
- **FilterPanel**: Overlay modal on mobile, sidebar on desktop
- **ReadingControls**: Bottom sheet on mobile, sidebar on desktop

## Accessibility Considerations

### Keyboard Navigation
- **Tab Order**: Logical flow through interactive elements
- **Focus Management**: Visible focus indicators, skip links
- **Keyboard Shortcuts**: Reading controls (font size, theme toggle)

### Screen Reader Support
- **ARIA Labels**: Descriptive labels for form fields and buttons
- **Live Regions**: Announce search results and status changes
- **Semantic HTML**: Proper heading hierarchy and landmarks

### Motion and Animation
- **Reduced Motion**: Respects prefers-reduced-motion
- **Animation Toggle**: User option to disable non-essential animations
- **Performance**: 60fps animations with hardware acceleration