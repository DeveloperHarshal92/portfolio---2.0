# Harshal Varade — Creative Engineering Portfolio

A modern, high-performance creative developer portfolio built with **Next.js 16 (App Router)**, **React 19**, **GSAP**, **Three.js & React Three Fiber**, **Rapier Physics**, **Lenis**, and **Tailwind CSS v4**.

Features momentum-based smooth scrolling, real-time 3D physics simulations, kinetic typography, a 60FPS scroll-triggered 3D Coverflow project showcase, a pinned 3D skill spiral, dynamic case study stacking decks, and seamless multi-strip view transitions.

<p align="left">
  <img src="https://img.shields.io/badge/Next.js-16.3.3-black?logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.8-149eca?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Three.js-0.185.1-black?logo=threedotjs&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/GSAP-3.15.0-88ce02?logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Lenis-1.3.26-ffffff?logo=scroll&logoColor=black" alt="Lenis" />
  <img src="https://img.shields.io/badge/Rapier_Physics-2.2.0-ff6b6b?logo=webgl&logoColor=white" alt="Rapier Physics" />
</p>

---

## ✨ Key Highlights & Features

### 1. 3D WebGL & Physics Interactions
- **Interactive 3D Lanyard (`/about`)**: Dynamic physics-driven ID badge simulation built with `@react-three/fiber`, `@react-three/rapier`, and `meshline`. Features realistic ragdoll tension, gravity vectors (`[0, -35, 0]`), rotational friction, and mouse drag inertia.
- **3D Infinite Skills Spiral (`/about`)**: Pinned stage choreography displaying technical stack cards in an interactive, scroll-scrubbed 3D helical spiral powered by GSAP ScrollTrigger and matrix math calculations (`<InfiniteSpiral />` & `<SkillsSpiral />`).

### 2. 60FPS 3D Coverflow Project Reel (`/project`)
- **Scroll-Triggered 3D Matrix Engine (`<CoverflowCarousel />`)**: Pin-scrubbed 3D carousel with hardware-accelerated transforms (`translateX`, `translateZ`, `rotateY`), non-linear falloff calculations, monotonic z-indexing to eliminate clipping, and active project indicator reveals.
- **Micro-Interactions & Hover Previews**: Dynamic image zoom transitions, active project title updates with GSAP SplitText character reveals, and smooth debounced route navigation.

### 3. Case Study Stacking Decks (`/project/[slug]`)
- **Architectural Stacking Cards (`<ProjectPage />`)**: Dynamic project presentation where incoming gallery sections pin at `top top` and unrotate smoothly from `25deg` to `0deg` using `transformOrigin: "bottom left"`.
- **Centered Feature Spotlights**: Architectural achievements and engineering highlights positioned over darkened image backdrops in high-contrast glassmorphism cards.
- **Seamless Next Project CTA**: Bottom footer handoff trigger with view transition animations into the next project in the catalogue.

### 4. Kinetic Typography & Dual-Layer Hero
- **Interactive Flashlight Mask (`<GlassHero />`)**: Single requestAnimationFrame dual-image reveal with mouse/touch coordinate tracking, linear interpolation (`POS_LERP: 0.14`, `RADIUS_LERP: 0.12`), and blueprint underlay.
- **SplitText Entrance Choreography**: Granular character, word, and line animations powered by GSAP `SplitText` (`<TextReveal />`).
- **Unified Clock Scroller**: Lenis smooth scroll ticker synced directly with GSAP's internal animation loop (`useLenis`) to eliminate frame stutter and scroll-jacking conflicts (`lagSmoothing(0)`).

### 5. Smart Navigation & Screen Transitions
- **Direction-Aware Staircase Navigation (`<BubbleMenu />`)**: Floating navigation bar that auto-hides on downward scroll past 80px and instantly reappears on upward scroll, with an expandable staggered staircase drawer.
- **Multi-Strip View Transitions (`useViewTransition`)**: Custom multi-column scale-wipe animations between client routes, with intelligent hash link handling for same-page section jumps.

### 6. Contact & Dispatch Terminal (`/contact`)
- **Editorial Portrait Layout**: Grayscale portrait card with live status badges, time zone indicators, and social identity strips.
- **Interactive Scope Selector**: Project requirement selector pills (`Full-Stack Web App`, `Creative Motion UI`, `AI Systems / RAG`, `Freelance / Contract`) with direct message dispatch and copy triggers.

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
| **Utilities** | clsx / tailwind-merge | `^2.1.1` / `^3.6.0` | Conditional CSS Class Construction |

---

## 🚀 Featured Projects Portfolio

The portfolio features 10 comprehensive full-stack, AI, and cloud engineering projects:

| # | Project | Category | Core Stack | Key Highlights |
| :---: | :--- | :--- | :--- | :--- |
| **01** | **[Instagram Full-Stack](https://github.com/DeveloperHarshal92/Insta-Clone---Full-Stack.git)** | Social Network | React 19, Socket.io, Redis, FFmpeg, Sharp, Express 5, MongoDB | Real-time bidirectional messaging, FFmpeg video transcoding, 24h ephemeral stories. |
| **02** | **[Audiom Streaming](https://github.com/DeveloperHarshal92/Modify-Your_Moddy_Music_Player.git)** | AI / Audio | React 19, MediaPipe Vision, Web Audio API, Redis, Express 5 | Live webcam facial emotion recognition modulating playback queues in real time. |
| **03** | **[SwigInsta Marketplace](https://github.com/DeveloperHarshal92/03---Swiggysta.git)** | E-Commerce | React 19, ImageKit SDK, Dual-Role RBAC, Express 5, MongoDB | Isolated Consumer feeds & Restaurant Partner studios with ImageKit CDN uploads. |
| **04** | **[Perplexity AI Answer Engine](https://github.com/DeveloperHarshal92/04---Perplexity-Clone.git)** | AI / Search | LangChain, Pinecone Vector RAG, Gemini 2.5, Tavily Search, Socket.io | Agentic web retrieval with real-time vector citations and token typewriter streaming. |
| **05** | **[EMS 3.0 Enterprise](https://github.com/DeveloperHarshal92/EMS-2.0.git)** | Enterprise | React 19, Redux Toolkit, GSAP 3, LangChain Copilot, Socket.io | Role-based task delegation matrix with an embedded LangChain deadline copilot. |
| **06** | **[AI Battle Arena](https://github.com/DeveloperHarshal92/06---Ai-Battle-Arena.git)** | AI / Benchmarking | LangGraph Multi-Agent, Gemini, Mistral AI, Cohere, GSAP 3 | Simultaneous multi-LLM benchmark duels with automated LangGraph referee scoring. |
| **07** | **[Luxurisen Fashion](https://github.com/DeveloperHarshal92/07---Snitch.git)** | Luxury E-Commerce | React 19, Redis Caching, Razorpay, ImageKit SDK, Express 5 | Sub-millisecond Redis catalog caching, server-authoritative promo rules, Razorpay. |
| **08** | **[CodeSpace Cloud IDE](https://github.com/DeveloperHarshal92/The-CodeSpace.git)** | Cloud Native | Kubernetes, Monaco Editor, xterm.js, LangGraph, Mistral AI, AWS S3 | Ephemeral K8s pod sandboxes, live xterm.js terminal I/O, AI code generator over SSE. |
| **09** | **AI ATS Resume Builder** | AI Productivity | Next.js 16 App Router, React 19, Google Gemini SDK, TypeScript | Multi-step wizard, real-time ATS keyword radar, STAR bullet rewrite, dual-pane PDF. |
| **10** | **[Smart Trolly 2.0](https://github.com/DeveloperHarshal92/Smart-Trolly-2.0.git)** | Edge AI / Computer Vision | YOLOv8 ONNX, Three.js R3F, WebSockets, Razorpay, PDFKit | Real-time edge YOLOv8 checkout billing, 3D holographic trolley, thermal PDF invoicing. |

---

## 📂 Architecture & Directory Structure

```text
portfolio/
├── public/                     # Static assets, portfolio portraits & 3D skill icons
│   └── images/
│       ├── skills/             # High-res 3D tech stack icons (React, Next.js, Node, Docker, etc.)
│       └── harshal-contact.jpg # Editorial contact portrait
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/              # About page (Lanyard 3D physics & Skills Spiral)
│   │   ├── contact/            # Contact terminal with portrait & scope selector
│   │   ├── project/            # Projects page with 60FPS Coverflow Carousel
│   │   │   └── [slug]/         # Dynamic case study breakdown (stacked rotating deck)
│   │   ├── globals.css         # Design tokens, CSS variables & Tailwind v4 layers
│   │   ├── layout.js           # Root layout with fonts, Navbar & SmoothScroller
│   │   └── page.js             # Hero homepage
│   ├── components/             # Reusable UI & animation modules
│   │   ├── BubbleMenu.jsx      # Scroll-aware staircase navigation drawer
│   │   ├── CarouselCard.jsx    # Interactive project card with pop-out title
│   │   ├── CoverflowCarousel.jsx # 60FPS 3D Coverflow carousel with GSAP ScrollTrigger
│   │   ├── GlassHero.jsx       # Hero view with rAF coordinate flashlight reveal mask
│   │   ├── InfiniteCarousel.jsx# Continuous horizontal marquee track
│   │   ├── InfiniteSpiral.jsx  # 3D Math spiral calculation engine
│   │   ├── Lanyard.jsx         # 3D Rapier physics interactive badge simulation
│   │   ├── Navbar.jsx          # Top-level header wrapper
│   │   ├── ProjectPage.jsx     # Pinned stacking case study component
│   │   ├── SkillsSpiral.jsx    # Pinned scroll-scrubbed skills showcase
│   │   ├── SmoothScroller.jsx  # Lenis root wrapper
│   │   └── TextReveal.jsx      # GSAP SplitText animation wrapper (chars/words/lines)
│   ├── data/
│   │   ├── projects.js         # Comprehensive project dataset (10 projects, metadata, galleries)
│   │   └── skills.js           # Skill definitions, categories & capability highlights
│   ├── hooks/
│   │   ├── useLenis.js         # Lenis lifecycle synced with GSAP ticker
│   │   └── useViewTransition.js# Multi-strip route view transition engine
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
# Clone the repository
git clone https://github.com/DeveloperHarshal92/portfolio---2.0.git

# Navigate to project directory
cd portfolio

# Install dependencies
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

## ⚡ Performance & Engineering Standards

- **Unified Single-Clock rAF Engine**: Lenis smooth scroll ticker is explicitly bound to GSAP's internal ticker (`gsap.ticker.add((time) => lenis.raf(time * 1000))`), avoiding frame collisions and eliminating jitter.
- **Zero Lag Smoothing (`lagSmoothing(0)`)**: Prevents large catch-up animation jumps when returning to backgrounded tabs.
- **Hardware-Accelerated CSS Properties**: High-performance transformations strictly animate `transform`, `opacity`, and `clip-path` with `will-change: transform`.
- **Dynamic Viewport Units**: Uses `100dvh` to ensure zero layout shift across mobile mobile browser address bar expansions.

---

## 👤 Author

**Harshal Varade**
- **GitHub**: [@DeveloperHarshal92](https://github.com/DeveloperHarshal92)
- **LinkedIn**: [Harshal Varade](https://www.linkedin.com/in/harshal-varade-07945a3a3)
- **Email**: [developerever@gmail.com](mailto:developerever@gmail.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
