# User Experience & Interaction Flows: The Imperial Journey

**Purpose:** Connect the 50 Artistic Requirements to the actual user journey. This document validates *when* and *why* visual effects trigger, ensuring the "Wow" factor never compromises usability.

---

## 1. The "First Impression" Flow (Landing Page)
*Goal: Convert a visitor into an audience member within 3 seconds using atmosphere.*

### Sequence Diagram
1.  **User Enters URL** (`/`)
2.  **State: Loading**
    *   **Visual:** `Theater-Open` (Req 3.8) curtain animation plays.
    *   **System:** Assets preload in background.
3.  **State: Ready (0.8s mark)**
    *   **Visual:** Curtain splits. `HeroArtifact` (Req 7.1) fades in, spinning slowly.
    *   **Visual:** `KineticHero` (Req 1.1) text cascades in character-by-character.
    *   **Audio:** Subtle ambient swell (Req 8.3 - visualizer starts oscillating).
4.  **Action: User Moves Mouse**
    *   **Interaction:** `Liquid-Pointer` (Req 3.7) trails the cursor.
    *   **Interaction:** `KineticHero` characters float away gently from the cursor path.
5.  **Action: User Scrolls**
    *   **Visual:** `Scroll-Triggered Day/Night` (Req 2.4) begins interpolation based on scroll Y.

---

## 2. The "Deep Reading" Flow (Blog Post)
*Goal: Immersion and focus. The interface recedes; the content takes the stage.*

### Journey Map
| Stage | User Action | Artistic Response | Component Active |
| :--- | :--- | :--- | :--- |
| **Entry** | Clicks post card | `Portal-Jump` (Req 3.3) transition (no white flash). | `PageTransition` |
| **Orientation** | Lands on post | `EditorialDropCap` (Req 1.4) illuminates first letter. | `BlogPost` |
| **Navigation** | Scans content | `StickyRail` (Req 4.3) highlights current section dot. | `StickySidebar` |
| **Focus** | Hovers paragraph | `Weight-Shift-Focus` (Req 1.5) bolds current paragraph. | `TextBlock` |
| **Delight** | Hovers image | `ParallaxImage` (Req 3.1) moves layer slightly. | `ImageReveal` |
| **Completion** | Reaches end | `Joy-Spark` (Req 8.2) confetti on "Like" click. | `LikeButton` |

---

## 3. The "Discovery" Flow (Archive/Search)
*Goal: Make data exploration feel like a treasure hunt.*

### Grid Logic
*   **Layout:** Uses `Broken Asymmetry` (Req 4.2). Cards are NOT perfectly aligned.
*   **Interaction:**
    *   **Hover Card:**
        1.  Card tilts 3D (`Physical-Cards`, Req 7.3).
        2.  Background goes grayscale, focused card blooms color (`Focus-Beam`, Req 2.6).
        3.  Border glows Neon Gold (`Cyber-Glow`, Req 2.5).
*   **Speed:**
    *   If user scrolls fast > `Velocity-Distortion` (Req 3.4) skews the grid by 5deg.
    *   If user stops > Grid snaps back elastic.

---

## 4. Mobile Experience Adaptation
*Goal: Preserve the "Luxury" feel without the desktop performance cost.*

### Adaptive Strategies
*   **Kinetic Text:** Disabled on touch devices (no hover state). Replaced with a specialized `Gradient-Shimmer` animation on load.
*   **3D Artifact:** Replaced with a pre-rendered high-res WebP sequence (Sprite Sheet) controlled by scroll position.
*   **Layout:**
    *   **Desktop:** Asymmetrical Golden Grid.
    *   **Mobile:** Single column "Feed" stack with `Device-Morph` (Req 4.7).
*   **Navigation:**
    *   **Desktop:** Top Sticky Bar.
    *   **Mobile:** Bottom "Glass" Bar with blur (`Ice-Layer`, Req 5.2) for thumb reachability.

---

## 5. Accessibility Fallbacks (The "Graceful Degradation")

### Reduced Motion Mode
*   **Trigger:** System setting `prefers-reduced-motion: reduce`.
*   **Overrides:**
    *   All `gsap` tweens duration set to `0s` (instant) or replaced with simple opacity fades.
    *   `KineticHero` becomes static.
    *   `Velocity-Distortion` disabled.
    *   `Parallax` disabled.

### High Contrast Mode
*   **Trigger:** System setting `prefers-contrast: more`.
*   **Overrides:**
    *   `GlassPanel` transparency set to 1 (Solid).
    *   `Text-Gradient` removed (Solid Color).
    *   Thin font weights (`300`) bumped to `400` or `500`.

---

## 6. Error & Empty States
*Goal: Even failure should be beautiful.*

### The "Glitch" 404
*   **Scenario:** User visits broken link.
*   **Visuals:**
    *   Text uses `Cipher-Glitch` (Req 1.6). Characters randomizing.
    *   Background noise intensity increases to 20% (`Analog-Signal`, Req 5.1).
    *   "Go Back" button is the only stable, glowing element.
