# Component Specifications: Imperial Tech

**Purpose:** Define the exact behavior, API, and internal logic for the custom artistic components to ensure they meet the visual requirements without ambiguity.

---

## 1. Typography Components

### 1.1 `KineticHero`
**Requirement:** 1.1 Kinetic Hero Typography
**Description:** A large display component where characters react to mouse proximity by "floating" away from the cursor.

**Props:**
| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `text` | `string` | **Required** | The headline text to display. |
| `weight` | `number` | `700` | Font weight (supports variable font range 100-900). |
| `sensitivity` | `number` | `0.5` | How strongly the characters react to the mouse (0-1). |
| `entranceDelay` | `number` | `0` | Delay in seconds before the staggered entrance animation begins. |

**Internal Logic:**
1.  **Mount:** Split `text` into an array of `<span>` elements, preserving spaces.
2.  **Animation Ref:** Store references to all spans in a `useRef([])`.
3.  **Event Loop:** Use a single `requestAnimationFrame` loop attached to `window.onmousemove`.
4.  **Math:** For each char: `dist = √((mouseX - charX)² + (mouseY - charY)²)`.
5.  **Transform:** `x = (mouseX - charX) * (1/dist * sensitivity)`.
6.  **Optimization:** If `dist > 200px`, force transform to `0,0` to save GPU.

**States:**
*   `idle`: Text is stationary.
*   `active`: Mouse is within interaction radius.
*   `entering`: Staggered CSS opacity/translateY animation playing.


### 1.2 `EditorialDropCap`
**Requirement:** 1.4 Paragraph Drop Caps
**Description:** A wrapper for the first paragraph of a blog post that styles the first letter with an illuminated background or SVG.

**Props:**
| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `string` | **Required** | The paragraph text. |
| `variant` | `'gold'` \| `'glass'` \| `'neon'` | `'gold'` | The visual style of the drop cap. |

**Styling Implementation:**
*   Use CSS `float: left`.
*   Font selection: `Cinzel Decorative` or `Playfair Display`.
*   Line height: Equal to 3 lines of body text (~4.8rem).
*   **Variant 'Gold':** `background: var(--gradient-accent); -webkit-background-clip: text;`.

---

## 2. Layout & Surface Components

### 2.1 `GlassPanel`
**Requirement:** 2.3 Glassmorphism 2.0
**Description:** A container component that applies the specialized frosted glass effect with chromatic aberration borders.

**Props:**
| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `intensity` | `'low'` \| `'medium'` \| `'high'` | `'medium'` | Controls blur amount and opacity. |
| `border` | `boolean` | `true` | Whether to show the 1px semi-transparent border. |
| `glow` | `boolean` | `false` | If true, adds a subtle inner shadow acting as ambient light. |

**CSS Composition:**
```css
.glass-panel {
  backdrop-filter: blur(var(--blur-amount));
  background: linear-gradient(
    135deg, 
    rgba(255,255,255, 0.1), 
    rgba(255,255,255, 0.05)
  );
  box-shadow: 
    -1px -1px 0 rgba(255,255,255, 0.2), /* Top-left highlight */
    1px 1px 0 rgba(0,0,0, 0.1);        /* Bottom-right depth */
}
```

### 2.2 `StickyRail`
**Requirement:** 4.3 Sticky Sidebar
**Description:** A navigation rail that tracks scroll position and highlights the current section.

**Props:**
| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `sections` | `Array<{id, label}>` | **Required** | The list of headers to track. |

**Behavior:**
*   Uses `IntersectionObserver` to detect which section ID is in the viewport.
*   Updates active state class.
*   **Visual:** A vertical line (1px width) with small dots (4px). Active dot expands to 8px and glows.

---

## 3. Interaction Components

### 3.1 `MagneticButton`
**Requirement:** 3.2 Magnetic Buttons
**Description:** A button that acts like a physical object attracted to the magnetic field of the mouse cursor.

**Props:**
| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `strength` | `number` | `0.3` | How far the button travels from its origin (0-1). |
| `children` | `node` | **Required** | Button content. |

**Logic:**
1.  Track mouse position relative to button center.
2.  If distance < `width * 1.5`, apply translation.
3.  Translation = `(mousePos - btnCenter) * strength`.
4.  **Release:** When mouse leaves, use a spring animation (GSAP elastic ease) to snap back to `0,0`.

### 3.2 `ParallaxImage`
**Requirement:** 3.1 Parallax Image Reveals
**Description:** An image container where the image moves at a different speed than the scroll.

**Props:**
| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `src` | `string` | **Required** | Image URL. |
| `speed` | `number` | `10` | Percentage of parallax movement (e.g. 10%). |
| `scale` | `number` | `1.2` | Initial scale to prevent whitespace during movement. |

**Implementation:**
*   `overflow: hidden` on container.
*   `transform: translateY(scrollProgress * speed)` on image.
*   Image must be larger than container (`scale` prop) to cover the movement range.

---

## 4. 3D Components (Three.js)

### 4.1 `HeroArtifact`
**Requirement:** 7.1 Hero 3D Object
**Description:** The centerpiece 3D object rendering in the hero section.

**Scene Graph:**
*   `<Canvas>` (R3F)
    *   `<PerspectiveCamera>`
    *   `<AmbientLight intensity={0.5}>`
    *   `<SpotLight position={[10, 10, 10]}>`
    *   `<Mesh>` (The Artifact)
        *   Geometry: `IcosahedronGeometry` (detail=0) or Custom GLTF.
        *   Material: `MeshPhysicalMaterial` (Gold parameter: `metalness={1}`, `roughness={0.2}`).
    *   `<Sparkles>` (floating particles around it).

**Interaction:**
*   Auto-rotation on Y-axis.
*   Mouse interactivity: slight rotation override based on mouse X position.
