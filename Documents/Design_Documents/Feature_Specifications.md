# Feature Specifications

## Blog Post Display

### Overview
Display existing blog content from Blog/raw and Blog/research folders as immersive reading experiences. Posts are pre-processed from Markdown to HTML during build time.

### Input Specifications
- **Source**: Markdown files with frontmatter metadata
- **Format**: Standard Markdown with optional YAML frontmatter
- **Content Types**: Travel narratives, temple research, historical analysis
- **Metadata Fields**:
  - title: string (required)
  - date: ISO 8601 date string (required)
  - tags: array of strings (optional)
  - excerpt: string (optional, auto-generated if missing)
  - author: string (default: "Anonymous Pilgrim")

### Output Specifications
- **Layout**: Centered content column (max-width 800px) on parchment background
- **Typography**: Serif font stack (Georgia, Times New Roman) with optimized line-height (1.6)
- **Responsive**: Mobile-first design with breakpoints at 768px and 1024px
- **SEO**: Structured data markup for articles, Open Graph tags

### User Flows
1. **Navigation to Post**: User clicks post title/link from home or blog list
2. **Loading**: Page loads with fade-in animation, content renders progressively
3. **Reading**: User scrolls through content with optional immersive features
4. **Exit**: Back navigation or home link returns to listing

### Edge Cases
- **Long Posts**: Implement reading progress indicator and bookmarking
- **Images**: Lazy load with responsive srcsets, alt text from Markdown
- **Code Blocks**: Syntax highlighting for any code snippets
- **Links**: External links open in new tabs with security attributes

## Search and Filter

### Overview
Client-side search across all blog posts with tag-based filtering. Uses pre-built search index for performance.

### Input Specifications
- **Search Query**: String input with minimum 2 characters
- **Filter Options**: Tag selection (multiple), date range, content type
- **Index Data**: Pre-processed JSON with post titles, excerpts, tags, and full-text tokens

### Output Specifications
- **Results List**: Paginated list (10 items per page) with title, excerpt, date, tags
- **Highlighting**: Search term highlighting in results
- **Sorting**: By relevance, date (newest/oldest), alphabetical
- **Empty State**: "No results found" with suggestions for related searches

### User Flows
1. **Query Input**: User types in search box with real-time suggestions
2. **Filter Application**: Select tags or adjust date range
3. **Results Display**: Instant results with loading indicator
4. **Refinement**: Modify query or filters for better results

### Edge Cases
- **No Matches**: Suggest alternative spellings or broader terms
- **Large Result Sets**: Implement virtual scrolling for >100 results
- **Special Characters**: Handle diacritics and non-English terms
- **Mobile**: Optimized keyboard and touch interactions

## Contact Form (Client-Side)

### Overview
Simple contact form using free Formspree service for email delivery. No server-side processing required.

### Input Specifications
- **Fields**:
  - name: string (required, min 2 chars)
  - email: valid email format (required)
  - subject: string (required, min 5 chars)
  - message: textarea (required, min 10 chars, max 1000 chars)
- **Validation**: Real-time client-side validation with error messages

### Output Specifications
- **Success**: Confirmation message with estimated response time
- **Error**: Specific error messages for validation failures or submission errors
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

### User Flows
1. **Form Access**: Navigate to contact page
2. **Input**: Fill form with real-time validation feedback
3. **Submission**: Click submit, show loading state
4. **Confirmation**: Display success message, offer return navigation

### Edge Cases
- **Network Failure**: Offline detection with retry option
- **Spam Prevention**: Honeypot field and rate limiting via Formspree
- **Large Messages**: Character counter and truncation warnings
- **International**: Support for non-English names and messages

## Immersive Reading Effects

### Overview
Atmospheric effects adapted from lantern cursor and ambient lighting features for distraction-free reading.

### Lantern Cursor Component

#### Input Specifications
- **Trigger**: Mouse movement over reading area
- **Settings**: User preferences for intensity, color, trail length
- **Performance**: 60fps target with automatic disable on low-end devices

#### Output Specifications
- **Visual**: Radial gradient (warm amber center fading to transparent at 200px)
- **Animation**: Smooth interpolation with 3 trailing circles for motion blur
- **Blend Mode**: Multiply for light themes, screen for dark modes
- **Responsive**: Disabled on touch devices, reduced on mobile

#### User Flows
1. **Activation**: Automatic on page load if enabled in preferences
2. **Interaction**: Cursor follows mouse with subtle scaling on links
3. **Customization**: Settings panel for opacity and size adjustments
4. **Disable**: Toggle via accessibility menu or reduced motion preference

#### Edge Cases
- **Performance Issues**: Automatic fallback to basic cursor
- **Accessibility**: Respects prefers-reduced-motion
- **Browser Support**: Graceful degradation for older browsers

### Ambient Lighting Effects

#### Input Specifications
- **Theme**: Light/dark mode preference
- **Time**: Automatic based on system time or manual override
- **Intensity**: User-adjustable from 0-100%

#### Output Specifications
- **Vignette**: Radial gradient overlay creating focus on content
- **Color Temperature**: Warm (2700K) for evening, cool (6500K) for day
- **Animation**: Smooth transitions between lighting states
- **Performance**: CSS-only effects with no JavaScript overhead

#### User Flows
1. **Auto-Detect**: System detects time of day for appropriate lighting
2. **Manual Override**: User selects lighting preset (dawn, day, dusk, night)
3. **Adjustment**: Fine-tune intensity and color temperature
4. **Persistence**: Settings saved to LocalStorage

#### Edge Cases
- **System Override**: Respects user's color scheme preference
- **Battery Saving**: Reduced effects on low battery
- **Print Styles**: Lighting effects disabled for printing

## Typography Controls

### Overview
Adjustable reading settings for optimal comprehension.

### Input Specifications
- **Font Size**: Range 14px - 24px (default 18px)
- **Line Height**: Range 1.2 - 2.0 (default 1.6)
- **Margins**: Range 10px - 50px (default 20px)
- **Font Family**: Serif/Sans-serif toggle

### Output Specifications
- **Real-time Preview**: Instant application of changes
- **Persistence**: Settings saved across sessions
- **Responsive**: Adjustments scale appropriately on different screen sizes
- **Accessibility**: Minimum font size respects WCAG guidelines

### User Flows
1. **Access Controls**: Click typography button in reading interface
2. **Adjustment**: Use sliders or buttons to modify settings
3. **Preview**: See changes applied immediately to sample text
4. **Save**: Settings persist for future visits

### Edge Cases
- **Small Screens**: Simplified controls with larger touch targets
- **High Contrast**: Adjustments work with system high contrast modes
- **Dyslexia**: Option for dyslexia-friendly fonts (if available)

## Content Discovery (Tag System)

### Overview
Simple tag-based navigation adapted from constellation system for static site.

### Input Specifications
- **Tag Data**: Pre-processed JSON with tag names, descriptions, and post counts
- **Hierarchy**: Flat structure with optional grouping (e.g., by theme: temples, history, travel)

### Output Specifications
- **Tag Cloud**: Visual representation with size based on post count
- **Tag Pages**: Dedicated pages showing all posts with specific tag
- **Related Tags**: Suggestions based on co-occurrence in posts
- **Filter Interface**: Multi-select checkboxes for combined filtering

### User Flows
1. **Browse Tags**: View tag cloud on home or blog pages
2. **Select Tag**: Click tag to view filtered post list
3. **Combine Filters**: Select multiple tags for intersection
4. **Explore Related**: Navigate to related tags from post pages

### Edge Cases
- **Orphaned Tags**: Tags with no posts hidden from display
- **Popular Tags**: Limit display to top 50 most used tags
- **Tag Synonyms**: Manual mapping for related terms
- **URL Structure**: SEO-friendly URLs like /tag/temple-research

## Reading Progress and Bookmarks

### Overview
Track reading progress and allow bookmarking for long-form content.

### Input Specifications
- **Progress Data**: Scroll position, timestamp, post ID
- **Bookmark Data**: User-defined markers with optional notes
- **Storage**: LocalStorage with IndexedDB fallback

### Output Specifications
- **Progress Bar**: Fixed header indicator showing completion percentage
- **Bookmark List**: Sidebar or modal with saved positions
- **Resume Reading**: Automatic scroll to last position on revisit
- **Export**: Option to export bookmarks as JSON

### User Flows
1. **Auto-Track**: Progress updates automatically as user scrolls
2. **Manual Bookmark**: Click bookmark button to save current position
3. **Resume**: Return to post shows "Continue Reading" prompt
4. **Manage**: View and delete bookmarks from settings

### Edge Cases
- **Multiple Devices**: Bookmarks sync via export/import (no cloud sync)
- **Long Posts**: Progress tracking works across page reloads
- **Privacy**: All data stored locally, no external transmission
- **Performance**: Minimal impact on scroll performance