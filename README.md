# Creative Frontend Animation Portfolio

A high-performance creative portfolio built with Next.js 16, React 19, GSAP, Lenis, and Tailwind CSS, featuring momentum smooth scrolling, continuous infinite carousel navigation, custom page transitions, and kinetic typography.

<p align="left">
  <img src="https://img.shields.io/badge/Next.js-16.3.3-black?logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.8-149eca?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/GSAP-3.15.0-88ce02?logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Lenis-1.3.26-ffffff?logo=scroll&logoColor=black" alt="Lenis" />
</p>

---

## Features

- **Infinite Looping Project Carousel**: Continuous horizontal marquee carousel with interactive hover card expansion and scale transitions.
- **Synchronized Smooth Scrolling**: Integration of Lenis with GSAP's internal ticker for unified frame timing and stutter-free scroll triggers.
- **Dynamic Project Showcase Pages**: Slug-based dynamic routing (`/project/[slug]`) with ScrollTrigger section pinning, clip-path reveals, and gallery view layouts.
- **Custom View Transitions**: Multi-strip scale wipe transitions across client navigation via programmatic DOM overlays and GSAP timelines.
- **Split-Text Kinetic Typography**: Configurable character, word, and line-level text entrance animations driven by GSAP SplitText and ScrollTrigger.
- **Tailwind CSS v4 Styling**: Modern utility-first styles with integrated custom Google Fonts (`Inter` and `JetBrains Mono`).

---

## Tech Stack

| Category | Tool | Version |
| :--- | :--- | :--- |
| Framework | Next.js (App Router) | `16.3.3` |
| UI Library | React | `19.2.8` |
| DOM Renderer | React DOM | `19.2.8` |
| Animation Engine | GSAP | `^3.15.0` |
| React Animation Hooks | @gsap/react | `^2.1.2` |
| Smooth Scrolling | Lenis | `^1.3.26` |
| CSS Framework | Tailwind CSS | `^4` |
| PostCSS Plugin | @tailwindcss/postcss | `^4` |
| Linting | ESLint / eslint-config-next | `^9` / `16.3.3` |

---

## Architecture & Project Structure

The project follows Next.js App Router conventions with centralized animation hooks and reusable visual components.

```text
portfolio/
├── .vscode/                 # Editor configuration
├── public/                  # Static assets and SVG icons
├── src/
│   ├── app/                 # Next.js App Router (pages, layouts, route handlers)
│   │   ├── about/           # About page route
│   │   ├── project/[slug]/  # Dynamic project case study routes
│   │   ├── globals.css      # Tailwind imports, typography mappings, CSS variables
│   │   ├── layout.js        # Root layout with fonts, Navbar, and SmoothScroller
│   │   └── page.js          # Homepage with InfiniteCarousel
│   ├── components/          # Reusable UI & animation components
│   │   ├── CarouselCard.jsx # Interactive project card with hover zoom & text reveal
│   │   ├── InfiniteCarousel.jsx # Continuous track marquee animation
│   │   ├── Navbar.jsx       # Fixed header navigation with kinetic typography
│   │   ├── ProjectPage.jsx  # Detailed case study view with pinned section scroll
│   │   ├── SmoothScroller.jsx # Global Lenis provider wrapper
│   │   └── TextReveal.jsx   # Reusable SplitText reveal component (mount/scroll/manual)
│   ├── data/
│   │   └── projects.js      # Structured project dataset (metadata, media URLs, tags)
│   ├── hooks/
│   │   ├── useLenis.js      # Lenis smooth-scroll lifecycle & GSAP ticker hook
│   │   └── useViewTransition.js # Multi-strip animated page transition hook
│   └── libs/
│       └── gsap.js          # GSAP registration with ScrollTrigger and SplitText
├── eslint.config.mjs        # ESLint flat config with Next.js presets
├── jsconfig.json            # Path alias configuration (@/* -> ./src/*)
├── next.config.mjs          # Next.js configuration
├── package.json             # Manifest scripts and dependencies
└── postcss.config.mjs       # PostCSS Tailwind plugin configuration
```

---

## Getting Started

### Prerequisites

- Node.js (v18.17+ or LTS recommended for Next.js 16)
- Package manager: `npm`, `pnpm`, `yarn`, or `bun`

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### Running Locally

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

To run the built application:

```bash
npm run start
```

### Linting

To run code quality and syntax checks:

```bash
npm run lint
```

---

## Configuration

No custom environment variables are currently required for local execution. Path aliases are defined in `jsconfig.json` as `@/*` pointing to `./src/*`.

---

## Testing

No automated testing framework is currently configured in `package.json`. Code quality verification is handled via `npm run lint`.
