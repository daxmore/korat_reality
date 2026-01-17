# Korat Reality - Project Documentation

## 1. Project Overview

**Korat Reality** is a premium real estate investment website designed to build trust with high-net-worth individuals and NRIs. The site features high-end animations, a custom cursor, and a dark/gold luxury aesthetic.

- **Primary Goal:** Convert visitors into investors for land acquisition and development projects.
- **Key Features:** TrueKind-style intro loader, Shery.js magnet effects, GSAP scroll animations, and a fully responsive design.

---

## 2. Tech Stack

| Technology | Usage | Version |
| :--- | :--- | :--- |
| **HTML5** | Semantic structure | - |
| **CSS3** | Custom styling + Bootstrap 5 Grid | Bootstrap 5.3.2 |
| **JavaScript** | Logic & Interactions | ES6+ |
| **GSAP** | ScrollTrigger & Timelines | 3.12.5 |
| **Shery.js** | Mouse follower & Magnet effects | Latest (with Three.js r128) |
| **Three.js** | Required for Shery.js effects | r128 (Stable) |

---

## 3. Key Animations & Effects

### A. Intro Loader (TrueKind Style)

- **Sequence:**
  1. **Counter (00-100):** Ticks up over 2.5s with a circular progress ring.
  2. **Logo Reveal:** Central logo pops in with a bounce easing.
  3. **Migration:** Logo scales down and moves to the top-left header position.
  4. **Curtain:** Dark overlay slides up to reveal the hero section.

### B. Interactive Elements

- **Custom Cursor:** System cursor is hidden (`cursor: none`) and replaced by a Shery.js fluid follower.
- **Magnet Effect:** Buttons and nav links attract the cursor with a magnetic pull.
- **Text Reveal:** Hovering storage links triggers a "slide-up" text effect using `data-text` attributes.

### C. Scroll Animations

- **Reload-Safe Logic:** Uses `gsap.fromTo()` to ensuring consistency even if the page is refreshed mid-scroll.
- **Hero Stagger:** Title, description, and buttons enter with a slight delay relative to each other.
- **Section Reveals:**
  - **"Who We Are":** Directional title slide + paragraph cascade.
  - **Cards:** Specialized grid items and mission cards pop in with staggered timing.

---

## 4. File Structure

```
korat-reality/
├── assets/
│   ├── css/
│   │   ├── style.css       # Core styles & global utilities
│   │   ├── about.css       # About page specific overrides
│   ├── js/
│   │   ├── animations.js   # GSAP, Shery.js, and Intro logic
│   │   ├── script.js       # Utility scripts (scroll-to-top)
│   ├── images/             # Optimized assets (WebP/SVG)
│   ├── fonts/              # Custom fonts (Romie, Archivo)
├── index.html              # Homepage
├── about.html              # About Us Page
└── README.md               # This file
```

---

## 5. Development Guidelines

### CSS Rules

- **No Inline Styles:** All styling is extracted to `style.css` or page-specific files.
- **Utility Classes:** Use helpers like `.min-h-500`, `.fs-12` for minor adjustments.
- **Variables:** Use `--primary-gold` and `--primary-dark` for consistent theming.

### JavaScript Rules

- **Guard Clauses:** Always check `if (element)` before applying animations to avoid null errors.
- **GSAP Context:** Use `gsap.context()` or `gsap.matchMedia()` if adding complex responsive animations.
- **Deprecations:** Stick to **Three.js r128** to avoid console warnings with Shery.js.

### Deployment

- **GitHub Pages:** Deploy from the `main` branch.
- **Assets:** Ensure all images are compressed and paths are relative.

---

## 6. Known Issues / Notes

- **Local CORS:** SVG injections or complex Shery.js effects may need a local server (Live Server) to function correctly during dev.
- **Mobile:** The custom cursor is disabled on touch devices for better UX.
