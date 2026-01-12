# Technical Requirements & Architecture Specification

**Project:** Luxury Editorial Blog (Imperial Tech)
**Purpose:** Translate the approved "Artistic Vision" into concrete engineering requirements to ensure technical feasibility, performance, and maintainability.

---

## 1. System Architecture

### 1.1 Core Stack Definition
*   **Framework:** React 18+ (Functional Components, Hooks)
*   **Build Tool:** Vite (ESBuild)
*   **Routing:** React Router DOM v6
*   **State Management:** React Context API (Theme, User, Toast) + Local State
*   **Styling Strategy:**
    *   **Global Variables:** CSS Custom Properties (`:root`) for color/type/spacing.
    *   **Utility:** TailwindCSS (Optional, referenced in plan but strict CSS modules preferred for "Artistic" control). *Decision: Use Pure CSS Modules + Utility Classes for layout.*
    *   **Animation:** Framer Motion (DOM) + GSAP (Complex Sequencing).

### 1.2 Directory Structure (revised for Features)
```
src/
├── components/
│   ├── 3d/                 # Three.js/R3F Components (HeroArtifact, etc.)
│   ├── Effects/            # Visual-only headers (Grain, Cursor, Transitions)
│   ├── Layout/             # Structural (Grid, Sidebar, Sticky)
│   ├── Typography/         # Specialized Type (KineticText, EditorialHeader)
│   ├── UI/                 # Core atoms (Buttons, Cards, Inputs)
├── hooks/
│   ├── useScroll.js        # Normalized scroll velocity/position
│   ├── useMouse.js         # Parallax/Cursor tracking
│   ├── useWindowSize.js    # Responsive logic (Mobile vs Desktop layout)
├── styles/
│   ├── design-system.css   # The "Source of Truth" variables
│   ├── animations.css      # Keyframes and utility classes
│   ├── fonts.css           # Font-face declarations
```

---

## 2. Technical Dependency Map

To achieve the "Artistic Requirements", we require specific libraries. **NOTE: Node.js installation is a prerequisite.**

| Artistic Requirement | Technical Solution | Justification |
| :--- | :--- | :--- |
| **1.1 Kinetic Typography** | `gsap` + `SplitText` (or custom SVG) | Need precise per-character transform control that CSS can't do smoothly. |
| **3.3 Page Transitions** | `framer-motion` (`<AnimatePresence>`) | React keeps unmounting components too fast; we need to hold them for exit animations. |
| **7.1 Hero 3D Object** | `@react-three/fiber` (R3F) | Declarative Three.js is 10x faster to write in React than vanilla imperative Three.js. |
| **7.1 Hero 3D Object** | `@react-three/drei` | Pre-built helpers (OribitControls, Stage, Environment) to save weeks of math. |
| **4.1 Golden Grid** | CSS Grid | Native, zero-dependency. Complex layouts will use `grid-template-areas`. |
| **1.5 Variable Fonts** | `font-variation-settings` | Native CSS. No library needed, just correct font file formats (.woff2). |
| **5.3 Grain/Texture** | SVG Filters / CSS `mix-blend-mode` | Native. Performance optimization: Use `transform: translateZ(0)` to force GPU. |

---

## 3. Component Specifications

### 3.1 KineticHero Component
*   **Inputs:** `text` (string), `effect` ('wave' | 'scatter' | 'glitch')
*   **Logic:**
    1.  Split `text` into span characters.
    2.  Attach mousemove listener to container.
    3.  Calculate distance of mouse to each character center.
    4.  Apply `transform: translate(x, y)` based on inverse distance (closer = more movement).
*   **Performance:** MUST use `requestAnimationFrame` loop, avoid React State for mouse updates (Direct DOM manipulation).

### 3.2 GlassPanel Component
*   **Inputs:** `children`, `transparency` (0-1), `blur` (px)
*   **CSS Requirements:**
    *   Background: `rgba(255,255,255, {transparency})`
    *   Backdrop-filter: `blur({blur}px)`
    *   Border: `1px solid rgba(255,255,255, 0.3)`
    *   **Crucial:** Fallback for Firefox/Older browsers (`@supports provided`).

### 3.3 InfiniteMarquee Component
*   **Inputs:** `items` (Array), `speed` (number), `direction` ('left' | 'right')
*   **Technique:**
    *   Duplicate content 2x (to ensure seamless loop).
    *   Use CSS animation `translateX(-50%)` -> `translateX(0%)`.
    *   **Pause on Hover:** CSS `:hover { animation-play-state: paused; }`.

---

## 4. Performance Budget & Constraints

Luxury means "Fast". We cannot sacrifice FPS for pretty pixels.

### 4.1 Frame Rate Targets
*   **Scroll Animations:** 60fps (Locked).
    *   *Constraint:* No animating `top`, `left`, `margin`. ONLY `transform` and `opacity`.
*   **3D Hero:** 30fps minimum on low-end laptops.
    *   *Constraint:* Max polygon count 50k. Max 2 real-time lights. Use "baked" lighting textures where possible.

### 4.2 Asset Loading Strategy
*   **Fonts:** Preload critical fonts (`Playfair Display`, `Lora`). Use `font-display: swap` for body text, but `block` for Hero (no FOIT allowed for art).
*   **Textures:** Use WebP format for all images.
*   **JS Bundle:** Dynamic import for 3D components (`React.lazy`). Do not load Three.js bundle until the component is actually in the viewport (IntersectionObserver).

### 4.3 Reduced Motion Support
*   **Accessibility Requirement:**
    *   If `prefers-reduced-motion: reduce` is detected:
        *   Disable parallax.
        *   Disable Kinetic Typography movement.
        *   Replace Marquee with static grid.
        *   Disable smooth scrolling.

---

## 5. CSS Variable Schema (The "Lapis & Gold" API)

This defines the interface developers will use to access the design system.

```css
:root {
  /* COLORS */
  --c-primary: #0a1128;
  --c-gold: #d4af37;
  --c-gold-shine: #ffd700;
  
  /* SURFACES */
  --s-glass: rgba(255, 255, 255, 0.65);
  --s-glass-blur: 20px;
  
  /* SPACING (Golden Ratio Steps) */
  --sp-1: 1rem;
  --sp-2: 1.618rem;
  --sp-3: 2.618rem;
  --sp-4: 4.236rem;
  
  /* TYPOGRAPHY */
  --f-hero: 'Playfair Display', serif;
  --f-body: 'Lora', serif;
}
```

## 6. Development Workflow Requirements

1.  **Linter:** ESLint with React Hooks rule (Strict).
2.  **Formatter:** Prettier (ensure consistent style).
3.  **Environment:** **Node.js 18+ Required**.
4.  **Version Control:** Git features branches `feature/kinetic-type`, `feature/3d-hero`. 
