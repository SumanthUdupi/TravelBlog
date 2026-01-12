# Performance & Accessibility Requirements

## 1. Core Web Vitals Optimization (Green Score)
**Category:** Performance
**User Problem:** Slow sites lose users and rank lower on Google.
**Proposed Solution:** Strict performance budget. LCP < 2.5s, CLS < 0.1, FID < 100ms.
**UI/UX:** No UI change, just speed. (Visible via Chrome DevTools).
**User Flow:** Load page -> Instant.
**Success Metrics:** Lighthouse Score > 95/100.
**Priority:** Must-have

## 2. WCAG 2.1 AA Compliance (Screen Readers)
**Category:** Accessibility
**User Problem:** visually impaired users cannot access content.
**Proposed Solution:** Semantic HTML (ARIA roles), alt text enforcement, proper heading hierarchy, focus management.
**UI/UX:** Visible focus rings for keyboard users. Skip-to-content links.
**User Flow:** Tab key navigation works perfectly logically through the page.
**Success Metrics:** Accessibility audit pass rate.
**Priority:** Must-have

## 3. Server-Side Image Optimization
**Category:** Performance
**User Problem:** High-res images bloat page size.
**Proposed Solution:** On-upload image processing pipeline using a local server utility (e.g., Python Pillow script or Node Sharp) to generate WebP/AVIF variants at multiple sizes. No external CDNs/Cloudinary.
**UI/UX:** Blur-up placeholders.
**User Flow:** Upload 5MB PNG -> Server script processes -> Served as 50KB WebP.
**Success Metrics:** Page weight reduction.
**Priority:** Must-have

## 4. Hybrid Static/Server Rendering
**Category:** Performance
**User Problem:** SPAs have poor SEO; Pure Static is slow to rebuild.
**Proposed Solution:** Incremental Static Regeneration (ISR) or Hybrid rendering. Static shell + dynamic data.
**UI/UX:** Immediate first paint.
**User Flow:** Publish post -> Live in seconds, not after full site rebuild.
**Success Metrics:** Time to First Byte (TTFB).
**Priority:** Should-have

## 5. Keyboard Navigation & Voice Control Support
**Category:** Accessibility
**User Problem:** Motor-impaired users cannot use a mouse.
**Proposed Solution:** Full keyboard shortcuts (`j`/`k` to scroll posts, `/` to search) and compatibility with voice control software.
**UI/UX:** Help modal showing shortcuts (`?` key).
**User Flow:** Press `?` -> See list. Press `/` -> Focus search.
**Success Metrics:** Usage of hotkeys.
**Priority:** Nice-to-have
