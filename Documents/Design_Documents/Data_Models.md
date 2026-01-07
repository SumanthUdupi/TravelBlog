# Data Models

## Blog Post Data Structure

### Post Object Schema
```javascript
interface BlogPost {
  id: string;              // URL slug (e.g., "jai-jagannath")
  title: string;           // Post title
  excerpt: string;         // Auto-generated or manual summary (150 chars max)
  content: string;         // HTML content (processed from Markdown)
  author: string;          // Default: "Anonymous Pilgrim"
  date: string;            // ISO 8601 date string (YYYY-MM-DD)
  tags: string[];          // Array of tag slugs
  wordCount: number;       // Estimated reading time calculation
  featured: boolean;       // For home page featured post
  metadata: {
    source: string;        // "raw" or "research"
    filename: string;      // Original Markdown filename
    lastModified: string;  // ISO 8601 timestamp
  };
}
```

### Sample Post Data
```json
{
  "id": "jai-jagannath",
  "title": "A Pilgrim's Journey Through Odisha: December 2024",
  "excerpt": "The railway station clock glowed 4:05 AM when we arrived, our bags heavy with clothes but our hearts light with anticipation...",
  "content": "<h2>Day One: The Journey Begins - December 22nd</h2><p>The railway station clock glowed 4:05 AM when we arrived...</p>",
  "author": "Anonymous Pilgrim",
  "date": "2024-12-22",
  "tags": ["pilgrimage", "odisha", "travel", "temples"],
  "wordCount": 2450,
  "featured": true,
  "metadata": {
    "source": "raw",
    "filename": "Jai Jagannath.md",
    "lastModified": "2024-12-22T04:05:00Z"
  }
}
```

## Tag Data Structure

### Tag Object Schema
```javascript
interface Tag {
  slug: string;            // URL-friendly identifier
  name: string;            // Display name
  description: string;     // Optional description for tooltips
  color: string;           // Hex color for UI theming
  postCount: number;       // Number of posts with this tag
  related: string[];       // Array of related tag slugs
  category: string;        // Grouping: "location", "theme", "type"
}
```

### Sample Tag Data
```json
{
  "slug": "odisha-temples",
  "name": "Odisha Temples",
  "description": "Sacred sites and temple complexes in Odisha",
  "color": "#D4AF37",
  "postCount": 12,
  "related": ["pilgrimage", "hinduism", "architecture"],
  "category": "location"
}
```

## Search Index Structure

### Search Document Schema
```javascript
interface SearchDocument {
  id: string;              // Post ID
  title: string;           // Post title (tokenized)
  content: string;         // Full text content (tokenized)
  tags: string[];          // Tag slugs
  date: string;            // ISO date for sorting
  excerpt: string;         // Excerpt for snippets
  tokens: string[];        // Pre-tokenized words for fast search
}
```

### Sample Search Document
```json
{
  "id": "konark-sun-temple",
  "title": "The Black Pagoda: An Exhaustive Analytical Report on the Konark Sun Temple",
  "content": "The Konark Sun Temple, situated on the eastern shores of the Indian subcontinent in Odisha...",
  "tags": ["konark", "sun-temple", "odisha", "architecture"],
  "date": "2024-12-25",
  "excerpt": "The Konark Sun Temple represents the zenith of Kalingan temple architecture...",
  "tokens": ["konark", "sun", "temple", "black", "pagoda", "analytical", "report", "odisha", "architecture", "13th", "century"]
}
```

## LocalStorage Schemas

### User Preferences Schema
```javascript
interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  fontSize: number;         // 14-24px
  lineHeight: number;       // 1.2-2.0
  marginSize: number;       // 10-50px
  fontFamily: 'serif' | 'sans-serif';
  lanternEnabled: boolean;
  ambientLighting: 'auto' | 'day' | 'night' | 'dusk';
  reducedMotion: boolean;
  lastVisitedPost: string;  // Post ID
  lastScrollPosition: number; // Pixels from top
}
```

### Sample LocalStorage Data
```json
{
  "theme": "dark",
  "fontSize": 18,
  "lineHeight": 1.6,
  "marginSize": 20,
  "fontFamily": "serif",
  "lanternEnabled": true,
  "ambientLighting": "auto",
  "reducedMotion": false,
  "lastVisitedPost": "lingaraj-temple",
  "lastScrollPosition": 1250
}
```

## IndexedDB Schemas

### Database Structure
```javascript
// Database: TravelBlogDB
// Version: 1

const dbSchema = {
  name: 'TravelBlogDB',
  version: 1,
  stores: {
    posts: {
      keyPath: 'id',
      indexes: [
        { name: 'date', keyPath: 'date' },
        { name: 'tags', keyPath: 'tags', multiEntry: true },
        { name: 'featured', keyPath: 'featured' }
      ]
    },
    searchIndex: {
      keyPath: 'id',
      indexes: [
        { name: 'tokens', keyPath: 'tokens', multiEntry: true },
        { name: 'date', keyPath: 'date' }
      ]
    },
    bookmarks: {
      keyPath: 'id',
      autoIncrement: true,
      indexes: [
        { name: 'postId', keyPath: 'postId' },
        { name: 'created', keyPath: 'created' }
      ]
    },
    readingProgress: {
      keyPath: 'postId',
      indexes: [
        { name: 'lastRead', keyPath: 'lastRead' }
      ]
    }
  }
};
```

### Bookmarks Store Schema
```javascript
interface Bookmark {
  id?: number;             // Auto-incremented
  postId: string;          // Referenced post ID
  position: number;        // Scroll position in pixels
  note?: string;           // Optional user note
  created: string;         // ISO timestamp
  title: string;           // Post title for display
}
```

### Sample Bookmark Data
```json
{
  "id": 1,
  "postId": "konark-sun-temple",
  "position": 3400,
  "note": "Section on the wheels as sundials",
  "created": "2024-12-25T10:30:00Z",
  "title": "The Black Pagoda: An Exhaustive Analytical Report on the Konark Sun Temple"
}
```

### Reading Progress Store Schema
```javascript
interface ReadingProgress {
  postId: string;          // Primary key
  progress: number;        // 0-100 percentage
  lastRead: string;        // ISO timestamp
  totalWords: number;      // Post word count
  timeSpent: number;       // Minutes spent reading
  completed: boolean;      // Fully read flag
}
```

### Sample Reading Progress Data
```json
{
  "postId": "jai-jagannath",
  "progress": 67.5,
  "lastRead": "2024-12-25T14:20:00Z",
  "totalWords": 2450,
  "timeSpent": 45,
  "completed": false
}
```

## Static JSON Files

### Posts Metadata (data/posts.json)
```json
{
  "posts": [
    // Array of BlogPost objects
  ],
  "totalCount": 15,
  "lastUpdated": "2024-12-25T12:00:00Z"
}
```

### Tags Metadata (data/tags.json)
```json
{
  "tags": [
    // Array of Tag objects
  ],
  "categories": ["location", "theme", "type"],
  "lastUpdated": "2024-12-25T12:00:00Z"
}
```

### Search Index (data/search-index.json)
```json
{
  "documents": [
    // Array of SearchDocument objects
  ],
  "totalTokens": 15420,
  "lastIndexed": "2024-12-25T12:00:00Z"
}
```

## Data Flow Diagrams

### Build-Time Data Processing
```
Markdown Files → Parser → HTML Content + Metadata → JSON Files
     ↓
Static Site Generator
     ↓
HTML Pages + Asset Files
```

### Runtime Data Access
```
User Request → HTML Page → JavaScript → LocalStorage/IndexedDB
                                      ↓
                                 Static JSON Files
                                      ↓
                                 API Responses (if any)
```

### Search Data Flow
```
User Query → Tokenize → Search Index Lookup → Filter Results → Sort → Display
```

## Data Validation Rules

### Post Validation
- ID must be URL-safe (lowercase, hyphens only)
- Date must be valid ISO 8601
- Content must be valid HTML
- Tags must reference existing tag slugs
- Word count must match content length (±10%)

### Tag Validation
- Slug must be unique and URL-safe
- Color must be valid hex code
- Post count must match actual post references
- Related tags must exist

### Search Index Validation
- All post IDs must reference valid posts
- Tokens must be lowercase, alphanumeric only
- No duplicate documents allowed

## Performance Considerations

### Storage Limits
- LocalStorage: 5-10MB per origin
- IndexedDB: No practical limit, but keep under 50MB
- Static JSON: Compress with gzip for faster loading

### Indexing Strategy
- Primary indexes on frequently queried fields
- Compound indexes for complex queries
- Lazy loading for large datasets

### Caching Strategy
- Cache static JSON files with appropriate headers
- Version control for cache invalidation
- Progressive loading for search results