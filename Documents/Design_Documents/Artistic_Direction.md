# Artistic Direction & Immersive Requirements

## Vision: The Odisha Sacred Odyssey
The visual and interactive identity of this project is grounded in the spiritual and architectural heritage of Odisha, India. It rejects modern "clean" minimalism in favor of a **"Digital Parchment"** aesthetic—tactile, warm, and deeply atmospheric.

---

## 1. Visual Language: "Rustic Earth"

### Mood Board (Textual)
- **Textures**: Old paper, rough sandstone (Khondalite), dried palm leaves (Pattachitra style), jute rope.
- **Lighting**: Candlelight, dusk, temple lamps (Diya), warm golden hours.
- **Imagery**: High-contrast black & white architectural details mixed with vibrant, warm-toned photography of rituals.

### Color Story
The palette is derived directly from the materials of the Konark and Jagannath temples.
- **Saddle Brown (#8B4513)**: The color of weathered wood and darker stone.
- **Terracotta (#E2725B)**: Represents the iron-rich laterite stone and clay roof tiles.
- **Warm Tan (#D2B48C)**: The base color for "paper" elements, easing eye strain.
- **Moss Green (#556B2F)**: Accents representing the overgrowth on ancient ruins.

---

## 2. Immersive Features

### A. Lantern Mode (The "Vignette")
*A digital representation of reading by candlelight.*

- **Concept**: In a dark room, your focus is limited to what the candle illuminates.
- **Implementation**:
  - The screen is predominantly dark (`#0F1215`).
  - A "warm light" circle follows the user's cursor.
  - Text inside the circle is high-contrast; text outside fades into obscurity.
- **Technical Requirement**:
  - CSS Radial Gradient on a fixed `pointer-events: none` overlay.
  - JS `mousemove` tracker to update `--cursor-x` and `--cursor-y` variables.

### B. The Constellation Drawer (Navigation)
*Navigating a web of knowledge, not a list of files.*

- **Concept**: Knowledge is interconnected. Navigation should feel like tracing a thread through a tapestry.
- **Interaction**:
  - Instead of a static list, the drawer shows a "Star Map" of topics.
  - **Animation**: When opening, lines "draw" themselves (SVG stroke-dashoffset animation) connecting the current post to its parent topics.
- **Sound (Optional)**: A subtle "paper rustle" sound effect on drawer open (muted by default).

---

## 3. Typography & Typesetting

### The "Scholarly" Standard
The typography must command respect and encourage deep reading.

- **Headings**: *Merriweather* or *Cinzel*. Bold, authoritative, reminiscent of stone inscriptions.
- **Body**: *Lora* or *Crimson Text*. High legibility, humanistic serifs that look good on "paper" backgrounds.
- **Drop Caps**: The first letter of every essay must be a large, ornamental Drop Cap, potentially using a display font like *Caveat* or a custom SVG initial.

---

## 4. Artistic Assets Requirements

To fulfill this vision, the following assets must be created or sourced:

1.  **Texture_Paper_Grain.png**: A seamless tileable noise texture for the background.
2.  **Icon_Set_Rustic.svg**:
    - *Home*: A Temple Spire (Shikara).
    - *Search*: A Magnifying Glass with a bone/wood handle.
    - *Theme Toggle*: A Diya (Oil Lamp).
    - *Menu*: Three horizontal "Brush Strokes" instead of generic lines.
3.  **Divider_Rope.svg**: A horizontal separator looking like a twisted jute rope.
4.  **Divider_Floral.svg**: A separator inspired by Odia stone carvings.

---

## 5. Mobile Experience: " The Palm Leaf Manuscript"

On mobile devices, the aesthetic shifts slightly to resemble a **"Tala Pattachitra"** (Palm Leaf Manuscript).

- **Navigation**: Bottom bar navigation resembling the edge of a bound manuscript.
- **Scrolling**: "Snap" scrolling that feels like flipping through stiff pages or leaf sections.
- **Haptics**: Subtle vibration feedback when crossing "Chapter" markers.

---

## 6. Implementation Checklist for AI

When generating code, the AI must ensure:
1.  **CSS Variables**: All colors and fonts use the variables defined in `Technical_Specifications.md`.
2.  **No "Bootstrap" Look**: Avoid default border-radius (use 2px or rough edges), default blue links (use Terracotta), and system fonts.
3.  **Performance**: The "Lantern" effect must use `transform` or `opacity` changes, avoiding heavy layout thrashing.
4.  **Graceful Degradation**: If Javascript fails, the site remains a beautiful, readable, static document in "Day Mode".
