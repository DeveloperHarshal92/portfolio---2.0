# Harshal Varade — Creative Engineering Portfolio

A modern, high-performance creative developer portfolio built with **Next.js 16 (App Router)**, **React 19**, **GSAP**, **Three.js & React Three Fiber**, **Rapier Physics**, **Lenis**, and **Tailwind CSS v4**.

Features momentum-based smooth scrolling, real-time 3D physics simulations, kinetic typography, continuous infinite project showcases, a pinned 3D skill spiral, and seamless multi-strip view transitions.

<p align="left">
  <img src="https://img.shields.io/badge/Next.js-16.3.3-black?logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.8-149eca?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Three.js-0.185.1-black?logo=threedotjs&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/GSAP-3.15.0-88ce02?logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Lenis-1.3.26-ffffff?logo=scroll&logoColor=black" alt="Lenis" />
</p>

---

## ✨ Key Highlights & Features

### 1. 3D WebGL & Physics Interactions
- **Interactive 3D Lanyard (`/about`)**: Dynamic physics-driven ID badge simulation built with `@react-three/fiber`, `@react-three/rapier`, and `meshline`. Reacts realistically to drag, momentum, and gravity.
- **3D Infinite Skills Spiral (`/about`)**: Pinned stage choreography displaying technical stack cards in an interactive, scroll-scrubbed 3D helical spiral powered by GSAP ScrollTrigger.

### 2. Kinetic Typography & Motion Engineering
- **SplitText Kinetic Typography**: Fine-grained character, word, and line entrance animations utilizing GSAP `SplitText` (`<TextReveal />`).
- **Unified Clock Scroller**: Lenis smooth scroll ticker synced directly with GSAP's internal animation loop (`useLenis`) to eliminate frame stutter and scroll-jacking conflicts.

### 3. Navigation & Screen Transitions
- **Smart Autohide Navigation (`<BubbleMenu />`)**: Direction-aware navigation bar that glides out of view on scroll-down and reappears on scroll-up, featuring an expandable staggered staircase drawer.
- **Multi-Strip View Transitions**: Programmatic multi-column scale wipe animations between client routes using custom view transition hooks.

### 4. Interactive Project Showcase (`/project`)
- **Continuous Kinetic Marquee (`<InfiniteCarousel />`)**: Seamless infinite horizontal marquee reel with easing deceleration on hover.
- **Hover Pop-Out Cards (`<CarouselCard />`)**: Character/word reveals for project numbers and titles, subtle zoom layers, and direct case study routing.
- **Dynamic Case Studies (`/project/[slug]`)**: In-depth project breakdown with pinned stage views, gallery grids, and project metadata.

### 5. Contact & Dispatch Terminal (`/contact`)
- **Editorial Portrait Layout**: High-contrast monochrome portrait card with glass status badges, time zone indicators, and location tags.
- **Interactive Dispatch Form**: Project scope selector pills, direct email copy widget with instant feedback, and social channel profiles.

---

## 🛠️ Tech Stack

| Domain | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `16.3.3` | React Server Components & Turbopack |
| **UI Library** | React | `19.2.8` | Declarative UI Graph |
| **3D Engine** | Three.js | `^0.185.1` | WebGL Scene Rendering |
| **3D Ecosystem** | `@react-three/fiber` / `drei` | `^9.7.0` / `^10.7.8` | React Three Fiber Component Tree |
| **Physics** | `@react-three/rapier` | `^2.2.0` | Real-time Rigidbody & Joint Physics |
| **Motion** | GSAP & `@gsap/react` | `^3.15.0` / `^2.1.2` | Timelines, ScrollTrigger & SplitText |
| **Smooth Scroll** | Lenis | `^1.3.26` | Hardware-Accelerated Momentum Scrolling |
| **Styling** | Tailwind CSS | `^4` | Utility-First Modern Design System |
| **Icons** | Lucide React | `^1.37.0` | Minimalist Icon Set |

---

## 📂 Architecture & Directory Structure

```text
portfolio/
├── public/                     # Static assets, portfolio portraits & 3D skill icons
│   └── images/
│       ├── skills/             # High-res 3D tech stack icons
│       └── harshal-contact.jpg # Editorial contact portrait
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/              # About page (Lanyard 3D physics & Skills Spiral)
│   │   ├── contact/            # Contact terminal with portrait & scope selector
│   │   ├── project/            # Projects page with kinetic carousel reel
│   │   │   └── [slug]/         # Dynamic case study breakdown
│   │   ├── globals.css         # Design tokens, variables & base resets
│   │   ├── layout.js           # Root layout with fonts, Navbar & SmoothScroller
│   │   └── page.js             # Hero homepage
│   ├── components/             # Reusable UI & animation modules
│   │   ├── BubbleMenu.jsx      # Scroll-aware staircase navigation drawer
│   │   ├── CarouselCard.jsx    # Interactive project card with pop-out title
│   │   ├── CoverflowCarousel.jsx # 3D Coverflow carousel implementation
│   │   ├── GlassHero.jsx       # Hero view with responsive clip path reveals
│   │   ├── InfiniteCarousel.jsx# Continuous horizontal marquee track
│   │   ├── InfiniteSpiral.jsx  # 3D Math spiral calculation engine
│   │   ├── Lanyard.jsx         # 3D Rapier physics interactive badge
│   │   ├── Navbar.jsx          # Top-level header wrapper
│   │   ├── SkillsSpiral.jsx    # Pinned scroll-scrubbed skills showcase
│   │   ├── SmoothScroller.jsx  # Lenis root wrapper
│   │   └── TextReveal.jsx      # SplitText animation wrapper (chars/words/lines)
│   ├── data/
│   │   ├── projects.js         # Project dataset (metadata, slugs, media, tags)
│   │   └── skills.js           # Skill definitions, categories & highlights
│   ├── hooks/
│   │   ├── useLenis.js         # Lenis lifecycle synced with GSAP ticker
│   │   └── useViewTransition.js# Route view transition animations
│   └── libs/
│       ├── gsap.js             # GSAP registration (ScrollTrigger, SplitText)
│       └── utils.js            # Tailwind merge & className utilities
├── eslint.config.mjs           # ESLint configuration
├── jsconfig.json               # Path alias config (@/* -> ./src/*)
├── next.config.mjs             # Next.js build configuration
└── package.json                # Project manifest & scripts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.17+` or LTS recommended
- **Package Manager**: `npm`, `pnpm`, `yarn`, or `bun`

### Installation

```bash
git clone https://github.com/DeveloperHarshal92/portfolio---2.0.git
cd portfolio
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## 👤 Author

**Harshal Varade**
- **GitHub**: [@DeveloperHarshal92](https://github.com/DeveloperHarshal92)
- **LinkedIn**: [Harshal Varade](https://www.linkedin.com/in/harshal-varade-07945a3a3)
- **Email**: [developerever@gmail.com](mailto:developerever@gmail.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
