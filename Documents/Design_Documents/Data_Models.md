# Data Models

## Blog Post Data Structure

### Post Object Schema
```javascript
interface BlogPost {
  id: string;              // URL slug (e.g., "jai_jagannath")
  title: string;           // Post title
  excerpt: string;         // Auto-generated or manual summary (150 chars max)
  content: string;         // HTML content (processed from Markdown)
  author: string;          // Default: "Anonymous Pilgrim"
  date: string;            // ISO 8601 date string (YYYY-MM-DD)
  tags: string[];          // Array of tag slugs (e.g., "odisha_temples")
  wordCount: number;       // Estimated reading time calculation
  featured: boolean;       // For home page featured post
  citation_ids: string[];  // List of references used in the post
  metadata: {
    source: string;        // "raw" or "research"
    filename: string;      // Original Markdown filename (e.g., "Jai Jagannath.md")
    lastModified: string;  // ISO 8601 timestamp
  };
}
```

## Constellation Tagging Schema (3-Tier)

The tagging system follows a strict 3-tier hierarchy: **Domain > Topic > Subtopic**. This structure enables the "Constellation Drawer" navigation.

### Tag Taxonomy Schema (data/tags.json)
```json
{
  "domains": [
    {
      "id": "philosophy",
      "name": "Philosophy",
      "topics": [
        {
          "id": "political_theory",
          "name": "Political Theory",
          "subtopics": [
            { "id": "justice", "name": "Justice" },
            { "id": "governance", "name": "Governance" }
          ]
        }
      ]
    },
    {
      "id": "odisha_odyssey",
      "name": "Odisha Odyssey",
      "topics": [
        {
          "id": "temples",
          "name": "Temples",
          "subtopics": [
             { "id": "konark", "name": "Konark Sun Temple" },
             { "id": "puri", "name": "Jagannath Puri" }
          ]
        }
      ]
    }
  ]
}
```

### Citation Schema

Used for the academic/scholarly referencing system.

```javascript
interface Citation {
  id: string;              // e.g., "ref-1"
  post_slug: string;       // The post this citation belongs to
  text: string;            // Full citation text (e.g., "Mishra, P. (2020). Temple Architecture...")
  url: string;             // Optional external link
}
```

## Search Data Models

### Search Index (data/posts.json)
This JSON file is fetched by the client to perform search and filtering without a backend.

```json
[
  {
    "slug": "konark_sun_temple",
    "title": "The Black Pagoda: An Analytical Report",
    "excerpt": "The Konark Sun Temple represents the zenith...",
    "tags": ["odisha_odyssey", "temples", "konark"],
    "date": "2024-12-25",
    "reading_time": 15
  }
]
```

## LocalStorage Schema

Data persisted in the user's browser for preferences and state.

```javascript
interface UserState {
  // Appearance
  theme: 'light' | 'dark' | 'lantern'; // 'lantern' is the rustic vignette mode
  font_preference: 'serif' | 'sans';

  // Reading Progress
  read_posts: string[];    // List of slugs marked as read
  bookmarks: string[];     // List of slugs bookmarked

  // Constellation State
  last_visited_domain: string; // Used to re-open the drawer to the same spot
}
```
