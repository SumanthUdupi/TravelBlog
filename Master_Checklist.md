# Master Checklist: Odisha Sacred Odyssey Project

## 1. Functional Requirements (Features & Interactions)

### 1.1 Navigation & Structure
- [ ] **Sticky Navigation Bar**:
  - Links to Home, Itinerary, Journal, Gallery, About.
  - Active state indication.
  - Mobile: Hamburger menu with off-canvas or dropdown transition.
- [ ] **Reading Progress Indicator**: Visual bar at top or side indicating scroll progress.
- [ ] **Back to Top Button**: Appears after scrolling down, smooth scroll to top.
- [ ] **Table of Contents / Journey Map**: Quick links to specific days/locations.

### 1.2 Interactive Elements
- [ ] **Custom Cursor**:
  - `cursor-dot` (position follower) and `cursor-outline` (lagging follower).
  - Hover states for links/buttons (scale up/color change).
- [ ] **Scrollytelling Sections**:
  - Text reveals based on scroll position.
  - Background image transitions (Parallax) synchronized with text.
- [ ] **Timeline Component**:
  - Vertical or horizontal layout representing the 4-day itinerary.
  - Clickable/Hoverable nodes to expand details for each location.
- [ ] **Interactive Cards**:
  - Hover effects: Elevation (box-shadow), subtle scale, border highlight.
  - Click to expand or navigate to detailed section.
- [ ] **Image Gallery**:
  - Masonry or Grid layout.
  - Lightbox functionality: Click image to view full screen with caption and close button.

### 1.3 Content Features
- [ ] **Quote Components**: Stylized blockquotes (Cinzel font, decorative borders/icons).
- [ ] **Accordion/Toggle**: For "Practical Toolkit" or detailed historical notes to save space.
- [ ] **Search Functionality (Client-side)**: Simple filter or highlight for keywords (Nice-to-have).

---

## 2. Design Requirements (Visuals & Aesthetics)

### 2.1 Typography & Fonts
- [ ] **Font Integration**:
  - `Cinzel` (Headings, Uppercase, letter-spacing).
  - `Playfair Display` (Subheadings, Italic, Accent).
  - `Lato` (Body text).
- [ ] **Hierarchy**:
  - H1: Hero titles (clamp sizing).
  - H2/H3: Section headers.
  - Body: Readable line-height (1.6) and contrast.

### 2.2 Color Palette & Theming
- [ ] **CSS Variables**:
  - `--color-primary`: `#d45d00` (Saffron/Orange).
  - `--color-secondary`: `#3a3532` (Dark Grey/Brown).
  - `--color-accent`: `#cfaa6d` (Gold).
  - `--color-text`: `#e0d8cc` (Off-white/Beige).
  - `--color-bg`: `#0f0e0e` (Deep Black/Dark).
- [ ] **Dark Mode Default**: Immersive, dark-themed interface as per specifications.

### 2.3 Layout & Spacing
- [ ] **Grid System**: CSS Grid for main layout and galleries.
- [ ] **Spacing System**: CSS variables for consistent margins/padding (`--spacing-sm`, `--spacing-md`, `--spacing-lg`).
- [ ] **Hero Section**: Full-screen (100vh), title overlay, parallax background.
- [ ] **Card Layouts**: Responsive grid for blog posts/locations.

---

## 3. Content Requirements

### 3.1 Content Integration
- [ ] **Hero Content**: Title "Odisha Sacred Odyssey", Subtitle, Intro text.
- [ ] **Day 1 Content**: Bhubaneswar (Lingaraj, Tribal Museum, Udayagiri).
- [ ] **Day 2 Content**: Culinary Odyssey & Ram Mandir.
- [ ] **Day 3 Content**: Cuttack (Chandi, Netaji), Jajpur (Biraja), Chhatia Bata.
- [ ] **Day 4 Content**: Chausathi Yogini, Konark Sun Temple, Puri Jagannath.
- [ ] **Footer Content**: Copyright, Social Links, "Jai Jagannath" closing.

### 3.2 Media
- [ ] **Images**: Placeholders for now (using colored divs or unsplash URLs if permitted, otherwise strictly placeholders with alt text).
  - *Note: I will use CSS patterns or solid colors with text labels as placeholders if external images are not accessible.*
- [ ] **Icons**: SVG icons for navigation, social media, and UI elements (chevron, close, menu).

---

## 4. Technical Requirements

### 4.1 Performance
- [ ] **Lazy Loading**: `loading="lazy"` on images.
- [ ] **Optimized Animations**: Use `transform` and `opacity` for high-performance (60fps).
- [ ] **Debounce/Throttle**: For scroll and resize event listeners.
- [ ] **Code Structure**:
  - Modular JS (IIFE or ES Modules).
  - Organized CSS (Variables -> Reset -> Base -> Components -> Utilities).

### 4.2 Accessibility (WCAG 2.1 AA)
- [ ] **Semantic HTML**: Proper use of `header`, `nav`, `main`, `article`, `footer`, `aside`.
- [ ] **Keyboard Navigation**: Focus styles (`outline` or box-shadow), skip links.
- [ ] **ARIA Labels**: For non-text elements (hamburger menu, icons).
- [ ] **Contrast**: Ensure text/bg contrast ratio > 4.5:1.
- [ ] **Reduced Motion**: Respect `prefers-reduced-motion` media query.

### 4.3 Cross-Browser Compatibility
- [ ] **Vendor Prefixes**: Where necessary (though modern CSS usually suffices).
- [ ] **Testing**: Chrome, Firefox, Safari, Edge support.

---

## 5. UX Requirements

### 5.1 Transitions & Motion
- [ ] **Page Load Animation**: Fade in main content.
- [ ] **Scroll Reveals**: Elements fade/slide up as they enter viewport (Intersection Observer).
- [ ] **Parallax Backgrounds**: Subtle movement of background images on scroll.
- [ ] **Hover Interactions**: Immediate visual feedback.

### 5.2 Responsiveness
- [ ] **Mobile-First**: Styles built for mobile, expanded for tablet/desktop.
- [ ] **Touch Targets**: Min 44x44px for clickable elements on mobile.
- [ ] **Layout Adaptation**: Single column (mobile) -> Multi-column (desktop).

---

## 6. Priorities

- **✅ Must-Have**:
  - Semantic HTML Structure & Content Integration.
  - Responsive Layout (Mobile to Desktop).
  - Core Typography & Color System.
  - Basic Navigation.
  - Scroll Animations (Reveals).
  - Accessibility Basics (Alt text, Keyboard nav).

- **🔷 Should-Have**:
  - Parallax Effects.
  - Custom Cursor.
  - Timeline Component.
  - Lightbox Gallery.
  - Reading Progress Bar.

- **⭐ Nice-to-Have**:
  - Advanced Micro-interactions (magnetic buttons).
  - Complex Scrollytelling (pinning sections).
  - Filterable content.
