# Technical Specifications

## Responsive Breakpoints

### Mobile-First Approach
All designs start from mobile (320px) and scale up to larger screens.

#### Breakpoint Definitions
```css
:root {
  --breakpoint-sm: 576px;   /* Small tablets */
  --breakpoint-md: 768px;   /* Tablets */
  --breakpoint-lg: 992px;   /* Small desktops */
  --breakpoint-xl: 1200px;  /* Large desktops */
  --breakpoint-xxl: 1400px; /* Extra large screens */
}
```

## Rustic & Immersive Design System

### Color Palette (Rustic Earth)
Strict adherence to the following hex codes to ensure the "Odisha/Rustic" aesthetic.

```css
:root {
  /* Primary Earth Tones */
  --color-saddle-brown: #8B4513;  /* Main headers, robust elements */
  --color-warm-tan: #D2B48C;      /* Secondary accents, borders */
  --color-terracotta: #E2725B;    /* Interactive elements, highlights */
  --color-moss-green: #556B2F;    /* Success states, nature tags */

  /* Backgrounds */
  --color-aged-paper: #FDFBF7;    /* Main content background */
  --color-parchment: #F5F1E6;     /* Sidebar / Card background */
  --color-ink-black: #1A1A1A;     /* Primary text */

  /* Lantern Mode (Dark) */
  --color-night-sky: #0F1215;     /* Dark mode background */
  --color-candle-flame: #FFD700;  /* Lantern cursor core */
  --color-lantern-glow: rgba(226, 114, 91, 0.15); /* Warm terracotta glow */
}
```

### Typography Stack
Fonts chosen to reflect a scholarly yet rustic tone.

```css
:root {
  /* Headings: Scholarly & Historic */
  --font-heading: 'Merriweather', Georgia, serif;

  /* Body: Highly Legible Serif */
  --font-body: 'Lora', 'Crimson Text', serif;

  /* Accents: Handwritten/Marginalia */
  --font-accent: 'Caveat', cursive;

  /* UI/Controls: Clean Sans */
  --font-ui: 'Inter', system-ui, sans-serif;
}
```

### Texture & Atmospheric Effects

#### Paper Grain Overlay
Applied to `<body>` to give a tactile feel.
```css
.texture-overlay {
  background-image: url("data:image/svg+xml,..."); /* Noise SVG */
  opacity: 0.05;
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 9999;
}
```

#### Lantern Vignette (Immersive Mode)
A dynamic radial gradient tracking the mouse cursor.
```css
body.lantern-mode::after {
  content: '';
  position: fixed;
  inset: 0;
  background: radial-gradient(
    circle 250px at var(--cursor-x, 50%) var(--cursor-y, 50%),
    transparent 0%,
    rgba(15, 18, 21, 0.85) 100%
  );
  pointer-events: none;
  z-index: 100;
  transition: background 0.2s ease;
}
```

## CSS Architecture

### File Organization
```
assets/css/
├── base/
│   ├── reset.css          # Modern CSS Reset
│   ├── typography.css     # Font imports & scale
│   └── variables.css      # The Design Tokens above
├── components/
│   ├── constellation.css  # Styles for the Tag Drawer
│   ├── reading-mode.css   # Immersive layout overrides
│   └── navigation.css     # Rustic header/footer
└── utilities/
    ├── animations.css     # Keyframes (FadeIn, SlideRight)
    └── textures.css       # Paper/Rope background classes
```

## JavaScript Architecture

### Core Modules
All logic uses ES6 Modules (no bundler required for dev, but recommended for prod).

```
assets/js/
├── immersive.js       # Handles Lantern Mode & Cursor Tracking
├── constellation.js   # Manages the 3-Tier Tag Drawer logic
├── search.js          # Client-side JSON search
└── main.js            # Entry point & Router
```

### Performance Targets
- **LCP**: < 2.0s (Aggressive font preloading required)
- **CLS**: 0 (Reserve space for images using aspect-ratio)
- **Bundle Size**: < 50KB total JS (Minified)
