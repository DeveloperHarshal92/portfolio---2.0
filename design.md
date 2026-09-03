# Design System: Harshal Varade Portfolio

> **Philosophy**: *Engineering Systems with Kinetic Craft.*  
> A tactile, architectural portfolio experience where rigorous full-stack and cloud infrastructure meets high-fidelity creative motion. Built with Next.js App Router, GSAP ScrollTrigger, Lenis smooth scrolling, Three.js & Rapier physics simulations, and a daylight ice-blue color world.

---

## 1. Visual Theme & Atmosphere

- **Mood & Tone**: Architectural, disciplined, kinetic, luminous. The visual atmosphere evokes a clean industrial design laboratory with precision engineering benchmarks — cool daylight ambiance, razor-sharp typographic contrast, tactile glassmorphism, and hardware-accelerated physics.
- **Density**: `Balanced Gallery Airy` (Rating: 4/10). Generous viewport breathing room, uncluttered margins, and deliberate negative space that lets 3D interactive canvases take center stage.
- **Variance**: `Controlled Asymmetry & Pinned Stacks` (Rating: 7/10). Left-aligned editorial type counterbalanced with dynamic 3D physics widgets, offset split screens, and gapless staircase navigation strips.
- **Motion**: `Cinematic Choreography` (Rating: 8/10). Synchronized single-ticker GSAP animations, Lerp-driven custom cursor reveal masks, pinned 3D spiral galleries, scroll-triggered 3D coverflow reels, unrotating stacked case-study cards, and physics-driven ragdoll lanyard simulations.

---

## 2. Color Palette & Roles

| Token Name | Hex / Value | Functional Role & Application |
| :--- | :--- | :--- |
| **Icy Canvas Background** | `#edf5ff` | Primary global background; soft daylight tone reducing retinal glare. |
| **Pure Glass Surface** | `#ffffff` / `rgba(255,255,255,0.92)` | Cards, dispatch terminal, buttons, and floating panels. |
| **Deep Ink Black** | `#0a0d12` | Primary typography, high-priority CTA pills, dark portrait frames. |
| **Charcoal Slate** | `#1e293b` / `slate-800` | Subheadings, bold metadata labels, active menu pills. |
| **Muted Architecture Steel** | `#64748b` / `slate-500` | Secondary descriptions, captions, taglines, inactive counters. |
| **Structural Slate Border** | `#b7c8de` | 1px hairline structural borders, glass boundaries, divider rules. |
| **Amber Kinetic Accent** | `#f59e0b` / `amber-400` | Micro-highlights, feature indicator chips, next-project CTA buttons. |
| **Terminal Sky Blue** | `#0284c7` / `sky-600` | Interactive links, status indicators, LinkedIn identity strip. |
| **Transmission Emerald** | `#10b981` / `emerald-400` | Form dispatch success confirmations, active status states. |

### Color Rules & Constraints:
- **No Pure Black**: Never use `#000000` for text or primary fills; always use Deep Ink Black (`#0a0d12`) or Charcoal Slate (`#1e293b`).
- **Singular Accent Restraint**: Bright accents (Amber `#f59e0b`, Sky `#0284c7`) are reserved for focal metadata, badges, and active interactive states.
- **Unified Atmospheric Ground**: Every page and modal remains grounded in `#edf5ff` to guarantee seamless transitions without jarring contrast switches.

---

## 3. Typographic Architecture

The typography establishes deliberate contrast between humanistic editorial prose and technical terminal precision:

### Font Stacks
1. **Sans-Serif (System & Display)**: `--font-sans` (`Inter`, system fallback sans-serif)
   - Used for editorial headlines, lead intro paragraphs, and body copy.
2. **Monospace (Engineering & Metadata)**: `--font-mono` (`JetBrains Mono`, `monospace`)
   - Used for section tags, numbered indicators (`01`, `02`), tech stack tags, project numbers, button labels, and code tokens.

### Scale Hierarchy
- **Mega Headlines (Hero / Titles)**: `clamp(3.5rem, 6.5vw, 6.8rem)`, tracking `-0.05em` to `-0.085em`, line-height `0.92` to `1.05`.
- **Section Headers (H2)**: `text-4xl sm:text-5xl lg:text-6xl`, tracking `-0.03em`, weight `400` / `500`.
- **Sub-Headlines (H3)**: `text-2xl sm:text-3xl`, tracking `-0.02em`.
- **Editorial Lead Copy**: `text-lg sm:text-xl`, text-slate-600, leading relaxed (`1.6`).
- **Body & Paragraphs**: `text-sm sm:text-base`, max-width `65ch` for ergonomic readability.
- **Monospace Labels & Metadata**: `text-xs sm:text-sm`, font-mono, uppercase, tracking `0.15em` to `0.25em`.

---

## 4. Component Design System

### 4.1. GlassHero (Dynamic rAF Reveal Mask)
- **Concept**: Split-layer reveal driven by mouse/touch coordinates. A clean desktop base image transitions into a high-contrast blueprint architecture layer inside a smooth, lerped radial circle (`--reveal-radius`).
- **Kinetic Engine**: Single requestAnimationFrame loop with `POS_LERP: 0.14` and `RADIUS_LERP: 0.12`.
- **SplitText Entrance**: Staggered character reveal via GSAP `SplitText` (`stagger: 0.03s`, `ease: "power4.out"`).

### 4.2. 3D Interactive Lanyard (`/about`)
- **Concept**: Fully interactive, physical ID badge card suspended from a woven lanyard strap in a WebGL canvas.
- **Physics Engine**: Three.js + Rapier physics engine calculating real-time tension, gravity (`[0, -35, 0]`), rotational friction, and mouse drag inertia.
- **Styling**: Portrait card rendered with high-contrast grayscale photography, industrial metal carabiner clasp, and textured strap.

### 4.3. SkillsSpiral (Pinned 3D Helix Gallery)
- **Concept**: Pinned 3D rotating cylinder displaying real-world technologies (React, Next.js, Node, Docker, AWS, GSAP, etc.) paired with dynamic right-column capability breakdowns.
- **Scroll Pinning**: GSAP ScrollTrigger pins the section for `2600px` of scrubbed scroll distance (`scrub: 1`).
- **Interaction**: Auto-rotates; accelerates on scroll; pauses on card hover; live active card index updates the right-column metadata card with smooth opacity cascades.

### 4.4. 60FPS 3D Coverflow Carousel (`/project`)
- **Concept**: Scroll-triggered 3D perspective stage showcasing featured full-bleed project cards.
- **Matrix Calculations**:
  - Distance Ramp: `Math.pow(distance, falloff)` with `falloff: 0.56`.
  - Tilt Calculation: `Math.min(rotate * ramp, 82) * Math.sign(offset)` with `rotate: 46deg`.
  - Transform Matrix: `translateX(calc(-50% + ${offset * pitch}px)) translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`.
  - Monotonic Z-Indexing: `1000 - Math.round(distance * 50)` ensures the focal center card remains on top with zero Z-fighting or clipping.
- **Interactive Header**: Dynamic project number and title reveal with GSAP SplitText character animations updating in sync with scroll progress or card hover.
- **Hover Micro-Interaction**:
  - Card scales smoothly to `1.1x` (`power2.out`).
  - Active preview takes immediate precedence over scroll index.
  - Debounced navigation guard ensures smooth route transition.

### 4.5. Case Study Stacking Decks (`/project/[slug]`)
- **Pinned Stacking Cards**: As the user scrolls, each gallery section pins at `top top` (`pin: true, pinSpacing: false`).
- **3D Rotation Scrub**: The incoming section smoothly unrotates from `25deg` to `0deg` using `transformOrigin: "bottom left"`, layering over the pinned slide like an architectural deck.
- **Centered Feature Highlights**: Each gallery slide features its paired architectural achievement displayed in the exact center of the viewport over a darkened vignette (`bg-black/45`), inside a high-contrast badge (`max-w-3xl`, `text-white`).
- **Next Project CTA Footer**: Dedicated bottom stage offering a tactile amber handoff card (`bg-amber-400 hover:bg-amber-300`) with smooth view transitions.

### 4.6. Staircase BubbleMenu
- **Concept**: Right-anchored gapless staircase menu with progressive column widths (`35vw` to `55vw`).
- **Entrance**: Staggered horizontal spring slide-in from off-screen right (`power4.out`).
- **Items**: Numbered sequential entries (`01 HOME`, `02 ABOUT`, `03 WORK`, `04 CONTACT`).
- **Smart Scroll Sensitivity**: Auto-hides on downward scroll past `80px`; instantly reveals on upward scroll or at top of canvas.

### 4.7. Dispatch Terminal (`/contact`)
- **Dual Column Hub**:
  - Left: Grayscale portrait card with location badges, GitHub/LinkedIn links, and direct contact telemetry.
  - Right: High-performance contact form terminal with interactive project scope pill selection (`Full-Stack Web App`, `Creative Motion UI`, `AI Systems / RAG`, `Freelance / Contract`) and asynchronous transmission status.

---

## 5. Layout & Spatial Architecture

1. **Continuous Single-Page Flow**:
   - `01. Home Canvas` (`#home`) $\rightarrow$
   - `02. About & Services` (`#about`) $\rightarrow$
   - `03. Selected Work` (`#project`) $\rightarrow$
   - `04. Direct Contact` (`#contact`)
2. **Container Boundaries**: Standard content blocks bounded by `max-w-7xl mx-auto px-6 md:px-16`.
3. **Viewport Height Standard**: Full-screen sections use `100dvh` or `min-h-[100dvh]` with overflow isolation to prevent layout shifts across mobile browser address bars.
4. **Spacing Scale**:
   - Small elements gap: `gap-2` to `gap-4` (8px - 16px).
   - Component internal padding: `p-6` to `p-10` (24px - 40px).
   - Vertical section gaps: `py-16` to `py-24` (64px - 96px).

---

## 6. Motion Philosophy & Performance Standards

- **Unified Clock Source**: Lenis smooth scrolling rAF loop is explicitly driven by the GSAP ticker (`gsap.ticker.add((time) => lenis.raf(time * 1000))`) to eliminate frame collisions and jitter.
- **Zero Lag Smoothing**: `gsap.ticker.lagSmoothing(0)` ensures seamless scroll resumption when switching browser tabs.
- **Hardware-Accelerated Properties Only**: Animations exclusively target `transform`, `opacity`, and `clipPath` (`will-change: transform`). Layout-triggering properties (`top`, `left`, `margin`) are forbidden in scroll triggers.
- **View Transitions**: Route changes feature custom vertical strip wipes (`useViewTransition`) staggered from center outwards for cinematic page handoffs. Same-page hash targets intercept and scroll smoothly without wiping.

---

## 7. Responsive Strategy

| Viewport | Breakpoint | Structural Adaptations |
| :--- | :--- | :--- |
| **Mobile** | `< 768px` | Multi-column grids collapse to `grid-cols-1`. GlassHero mask radius scales down to `150px`. BubbleMenu spans `70vw` to `100vw`. Coverflow cards scale dynamically via `clamp(240px, 70vw, 320px)`. |
| **Tablet** | `768px - 1024px` | 2-column balanced layouts. Lanyard 3D canvas scales to `520px` height. Typography scales gracefully via `clamp()`. |
| **Desktop** | `> 1024px` | 12-column asymmetric grids (e.g. 7-col narrative + 5-col 3D canvas). Full `620px` Lanyard height, full `1400px` SkillsSpiral span, full 3D Coverflow stage. |

---

## 8. Anti-Patterns & Quality Guardrails

- ❌ **No Emojis**: Never use decorative emojis in UI copy, buttons, or section headers.
- ❌ **No Purple/Blue AI Neon Glows**: Never use oversaturated glowing drop-shadows or cyber gradients.
- ❌ **No Pure Black (`#000000`)**: Always use Deep Ink Black (`#0a0d12`) or dark slate to maintain tonal harmony.
- ❌ **No Generic 3-Equal Cards**: Avoid standard template grids; use 3D coverflow carousels, 3D helices, or stacked rotating decks.
- ❌ **No Scroll Chevrons / "Scroll Down" Clichés**: Interactive kinetic depth must naturally compel users to explore.
- ❌ **No Unsynced Scroll Engines**: Never run independent Lenis or window scroll listeners in conflict with GSAP ScrollTrigger.
