# Master Requirements Checklist

## 1. Accessibility (WCAG 2.1 AA)
- [x] **Skip Navigation**: Implement "Skip to main content" link at the top of the body.
- [x] **Landmarks**: Ensure proper usage of HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`) or ARIA roles (`role="banner"`, `navigation`, `main`, `contentinfo`).
- [x] **Heading Hierarchy**: Verify logical nesting of H1-H6 tags. No skipped levels.
- [x] **ARIA Labels**: Add `aria-label` or `aria-labelledby` to all navigation elements (`<nav>`), buttons, and icons without visible text.
- [x] **Focus Indicators**: Implement visible and high-contrast focus indicators for all interactive elements (links, buttons, inputs).
- [x] **Image Alt Text**: Ensure all `<img>` tags have descriptive `alt` attributes. Decorative images should have `alt=""`.
- [x] **Keyboard Navigation**: Ensure all interactive elements are reachable and operable via keyboard. No keyboard traps.
- [x] **Form Labels**: Ensure all form inputs have associated `<label>` elements or `aria-label`.
- [x] **Color Contrast**: Ensure text-to-background contrast ratio is at least 4.5:1 for normal text and 3:1 for large text.

## 2. Responsive Design & Layout
- [x] **Viewport Meta**: Ensure strictly `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- [x] **CSS Variables**: Implement the specified breakpoint variables and spacing units.
  - Mobile: 320px-480px
  - Tablet: 768px-1024px
  - Desktop: 1025px+
- [x] **Mobile Navigation**: Implement a functional hamburger menu for mobile devices.
  - Must be accessible (keyboard focusable, ARIA state `aria-expanded`).
- [x] **Typography**: Implement fluid typography using `clamp()` as specified in `05-responsive-design.md`.
- [x] **Touch Targets**: Ensure interactive elements are at least 44x44px on mobile.
- [x] **Layout Adaptation**: Verify grid/flex layout changes across breakpoints (1 col -> 2 col -> 3 col).

## 3. Performance & Optimization
- [x] **Lazy Loading**: Add `loading="lazy"` to off-screen images.
- [x] **Image Dimensions**: Specify `width` and `height` attributes to prevent Layout Shifts (CLS).
- [x] **Font Loading**: Use `font-display: swap` for web fonts.
- [x] **Resource Hints**: Preconnect to critical origins if applicable (e.g., Google Fonts).

## 4. Visual Identity & UI
- [x] **Color Palette**: Update CSS variables to reflect the "Extended Earth Tone Palette" (Saddle Brown, Warm Tan, etc.).
- [x] **Fonts**: Ensure "Merriweather", "Lora", and "Caveat" are correctly loaded and applied.
- [x] **Breadcrumbs**: Implement breadcrumb navigation for deeper content pages.
- [x] **Back to Top**: Add a "Back to Top" button for long pages.

## 5. Content & SEO
- [x] **Page Titles**: Ensure unique and descriptive `<title>` for every page.
- [x] **Meta Descriptions**: Ensure unique meta descriptions.
- [x] **Language Attribute**: Ensure `<html lang="en">` is present.
