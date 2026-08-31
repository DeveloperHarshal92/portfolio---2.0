export const projects = [
  {
    id: 1,
    slug: "Instagram",
    number: "01",
    title: "Instagram Full-Stack Clone",
    subtitle: "Real-Time Social Network & Transcoding Engine",
    category: "Full Stack / Social Network",
    year: "2025",
    role: "Full-Stack Architecture & Real-Time Engineering",
    description:
      "A production-grade social networking application engineered with React 19, Express 5, and MongoDB. Features real-time bidirectional messaging via Socket.io, Sharp image compression, Fluent-FFmpeg video transcoding, 24-hour ephemeral stories with view tracking, and Redis caching.",
    longDescription:
      "Engineered from the ground up to handle high-frequency social interactions. The architecture features an asynchronous multimedia processing pipeline powered by Sharp and Fluent-FFmpeg that automatically transcodes uploaded videos and generates multi-resolution image sets for low-bandwidth mobile feeds. Built with end-to-end Socket.io bidirectional channels for instant direct messaging, live typing indicators, and presence detection, supported by an ephemeral 24-hour story lifecycle engine backed by MongoDB TTL indices and sub-millisecond Redis response caching.",
    coverImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["React 19", "Socket.io", "Redis", "FFmpeg", "Node.js", "Express 5", "MongoDB"],
    featured: true,
    assetsTemporary: true,
    githubLink: "https://github.com/DeveloperHarshal92/Insta-Clone---Full-Stack.git",
    liveLink: "",
    techStack: [
      "React 19",
      "React Router v7",
      "Sass (SCSS)",
      "Node.js",
      "Express 5",
      "MongoDB / Mongoose",
      "Redis (ioredis)",
      "Socket.io",
      "ImageKit",
      "Sharp",
      "Fluent-FFmpeg"
    ],
    features: [
      "Real-time direct messaging with presence indicators over Socket.io",
      "Image optimization (Sharp) and asynchronous video transcoding (FFmpeg)",
      "24-hour ephemeral stories with auto-expiration and unique viewer metrics",
      "Dynamic social feed with like reactions, nested comments, and user discovery",
      "Redis caching layer and tiered API rate limiting"
    ]
  },
  {
    id: 2,
    slug: "Audiom",
    number: "02",
    title: "Audiom — Mood-Adaptive Music Streaming",
    subtitle: "AI Facial Emotion Recognition Audio Player",
    category: "AI / Audio Streaming",
    year: "2025",
    role: "Computer Vision Integration & Audio Engine",
    description:
      "An AI-powered music discovery platform combining client-side Google MediaPipe Vision face emotion recognition with a high-performance audio engine. Features automatic MP3 ID3 metadata extraction, ImageKit CDN streaming, time-stamped playback history, and Redis caching.",
    longDescription:
      "Audiom bridges computer vision and generative music recommendation. By running Google MediaPipe Face Landmarker models entirely in the client browser with WebGL acceleration, the player captures continuous micro-expressions without compromising user privacy. The detected emotional state (Happy, Energetic, Calm, Melancholic) immediately modulates playback queues and acoustic filters. Audio tracks stream with real-time waveform visualization, backed by automatic server-side ID3 tag extraction and Redis catalog acceleration.",
    coverImage:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["React 19", "MediaPipe Vision", "Tailwind CSS v4", "Web Audio API", "Node.js", "Redis"],
    featured: true,
    assetsTemporary: true,
    githubLink: "https://github.com/DeveloperHarshal92/Modify-Your_Moddy_Music_Player.git",
    liveLink: "",
    techStack: [
      "React 19",
      "MediaPipe Vision",
      "Tailwind CSS v4",
      "Motion (Framer Motion)",
      "Lenis Smooth Scroll",
      "Node.js",
      "Express 5",
      "MongoDB / Mongoose",
      "Redis (ioredis)",
      "Node-ID3",
      "ImageKit"
    ],
    features: [
      "Live webcam facial expression classification (Happy, Energetic, Calm, Melancholic)",
      "Continuous audio playback engine with queue management and waveform analytics",
      "Automatic audio ID3 tag parsing for embedded metadata and artwork",
      "Redis-backed caching for sub-millisecond track catalog queries",
      "Interactive social commenting and celebration confetti triggers"
    ]
  },
  {
    id: 3,
    slug: "Swiggy",
    number: "03",
    title: "Swiggy / Zomato Food Discovery Platform",
    subtitle: "Dual-Role Culinary Marketplace & Partner Studio",
    category: "Full Stack / E-Commerce",
    year: "2025",
    role: "Full-Stack Development & Marketplace Design",
    description:
      "A full-stack culinary marketplace offering dedicated portals for consumers and restaurant partners. Enables vendors to manage culinary listings and upload dish media to ImageKit, while providing consumers with discovery feeds, dish bookmarking, and mobile-first navigation.",
    longDescription:
      "Built with strict architectural separation between consumer browsing and food partner restaurant studios. Restaurant partners access authenticated management panels to configure menu categories, pricing, item availability, and direct ImageKit media uploads. Consumers experience an editorial discovery feed featuring live search filters, bookmarking collections, rating mechanisms, and an ergonomic mobile dock designed with native design tokens and CSS custom properties.",
    coverImage:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["React 19", "Marketplace", "ImageKit SDK", "RBAC", "Node.js", "Express 5", "MongoDB"],
    featured: false,
    assetsTemporary: true,
    githubLink: "https://github.com/DeveloperHarshal92/03---Swiggysta.git",
    liveLink: "",
    techStack: [
      "React 19",
      "React Router v7",
      "Lucide React",
      "Vanilla CSS (Design Tokens)",
      "Node.js",
      "Express 5",
      "MongoDB / Mongoose",
      "ImageKit SDK",
      "Multer",
      "JWT"
    ],
    features: [
      "Dual-role authentication isolating Consumer and Food Partner workspaces",
      "Partner dashboard for dish creation, pricing, and ImageKit CDN photo uploads",
      "Social-style food discovery feed with likes and saved collections",
      "Mobile-optimized bottom docking navigation bar",
      "Secure JWT cookie authentication and rate limiting"
    ]
  },
  {
    id: 4,
    slug: "Perplexity",
    number: "04",
    title: "Perplexity AI Answer Engine",
    subtitle: "Conversational Research Engine with Vector RAG",
    category: "AI / Search Engine",
    year: "2025",
    role: "AI Systems Engineering & RAG Architecture",
    description:
      "An advanced conversational answer engine replicating Perplexity AI. Combines LangChain agent reasoning across Google Gemini and Mistral, real-time web retrieval via Tavily, Pinecone vector RAG, multimodal PDF/DOCX/image document ingestion, and low-latency token streaming over Socket.io.",
    longDescription:
      "A full-stack implementation of an agentic conversational search engine. User queries trigger LangChain multi-step reasoning that performs query expansion, searches the live internet via Tavily Search API, and simultaneously performs semantic retrieval over Pinecone vector embeddings. The resulting sources are dynamically cited and grounded into structured answers streamed to the client using low-latency WebSocket token feeds styled in a scholar's parchment aesthetic.",
    coverImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["LangChain", "Pinecone RAG", "Google Gemini", "Tavily Search", "React 19", "Socket.io"],
    featured: true,
    assetsTemporary: true,
    githubLink: "https://github.com/DeveloperHarshal92/04---Perplexity-Clone.git",
    liveLink: "",
    techStack: [
      "React 19",
      "Redux Toolkit",
      "Tailwind CSS v4",
      "Framer Motion",
      "Socket.io",
      "Node.js",
      "Express 5",
      "LangChain",
      "Pinecone Vector DB",
      "Tavily Search API",
      "Google Gemini 2.5 Flash",
      "Mistral AI",
      "MongoDB"
    ],
    features: [
      "Multi-model synthesis combining Mistral, Gemini, and OpenAI with LangChain",
      "Semantic vector search RAG via Pinecone and text chunking splitters",
      "Live web grounding with real-time citations powered by Tavily Search",
      "Multimodal document comprehension for PDF, DOCX, and image uploads",
      "Scholar's parchment UI theme with typewriter token streaming over WebSockets"
    ]
  },
  {
    id: 5,
    slug: "Employee Management System",
    number: "05",
    title: "EMS 3.0 — Enterprise Workspace & AI Copilot",
    subtitle: "Task Delegation & Intelligent Enterprise Operations",
    category: "Enterprise / Productivity",
    year: "2025",
    role: "Full-Stack Development & Workflow Orchestration",
    description:
      "A comprehensive enterprise task management system featuring isolated Admin and Employee portals, real-time Socket.io team messaging, high-performance GSAP/Framer Motion animations, and an embedded LangChain AI assistant providing task planning and deadline reminders.",
    longDescription:
      "EMS 3.0 unifies enterprise task management and AI automation in a single platform. Admins oversee team velocity, assign high-priority tasks, and monitor completion metrics, while employees manage interactive Kanban boards with real-time status transitions. An embedded LangChain AI copilot reviews upcoming deadlines, synthesizes task briefings, and alerts teams over Socket.io presence channels to keep distributed teams aligned.",
    coverImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["React 19", "Redux Toolkit", "GSAP 3", "LangChain Copilot", "Socket.io", "SCSS"],
    featured: false,
    assetsTemporary: true,
    githubLink: "https://github.com/DeveloperHarshal92/EMS-2.0.git",
    liveLink: "",
    techStack: [
      "React 19",
      "Redux Toolkit",
      "GSAP 3",
      "Framer Motion 12",
      "SCSS (Sass)",
      "Socket.io",
      "Node.js",
      "Express 5",
      "LangChain (Gemini/Mistral/OpenAI)",
      "MongoDB / Mongoose"
    ],
    features: [
      "Role-based Admin matrix (task delegation, metrics) and Employee Kanban",
      "Embedded AI co-worker powered by LangChain for deadline and workload management",
      "Live team messaging and presence tracking over Socket.io channels",
      "Interactive GSAP and Framer Motion micro-interactions",
      "Centralized state architecture via Redux Toolkit slices"
    ]
  },
  {
    id: 6,
    slug: "AI Battle Arena",
    number: "06",
    title: "AI Battle Arena — LLM Benchmark Arena",
    subtitle: "Head-to-Head Frontier LLM Duel Engine",
    category: "AI / Benchmarking",
    year: "2025",
    role: "Autonomous Agent Architecture & Frontend Engineering",
    description:
      "A high-octane developer arena that benchmarks competing frontier language models (Google Gemini, Mistral AI, Cohere Command) simultaneously. Uses LangGraph stateful multi-agent workflows to evaluate responses and deliver automated judge verdicts with reasoning metrics.",
    longDescription:
      "A benchmark platform inspired by competitive e-sports. Dispatches user coding and reasoning prompts simultaneously across Google Gemini, Mistral Large, and Cohere Command. As streaming responses complete, a stateful LangGraph multi-agent referee orchestrates rubric evaluation, comparing code complexity, safety, and conciseness to calculate weighted scores and reveal victor verdicts with dynamic GSAP meters.",
    coverImage:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["LangGraph", "Multi-Agent AI", "Gemini 2.5", "Mistral AI", "React 19", "GSAP 3"],
    featured: true,
    assetsTemporary: true,
    githubLink: "https://github.com/DeveloperHarshal92/06---Ai-Battle-Arena.git",
    liveLink: "",
    techStack: [
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "GSAP 3",
      "Framer Motion 12",
      "Node.js",
      "Express 5",
      "LangGraph",
      "LangChain Core",
      "Google Gemini",
      "Mistral AI",
      "Cohere"
    ],
    features: [
      "Simultaneous multi-model prompt dispatch across Gemini, Mistral, and Cohere",
      "Autonomous referee evaluation pipeline built with LangGraph agentic workflows",
      "Cyberpunk dark arena interface with animated GSAP verdict meters",
      "In-depth reasoning breakdowns and token scoring telemetry",
      "Markdown code syntax highlighting and side-by-side solution comparison"
    ]
  },
  {
    id: 7,
    slug: "Luxrisen",
    number: "07",
    title: "Luxurisen — Curated Luxury Fashion",
    subtitle: "High-Performance Editorial Luxury E-Commerce",
    category: "Full Stack / Luxury E-Commerce",
    year: "2025",
    role: "Full-Stack Development & Performance Engineering",
    description:
      "A luxury editorial fashion e-commerce storefront engineered with React 19, Express 5, and Redis. Features Cormorant Garamond typography, sub-millisecond Redis catalog caching, server-authoritative coupon calculations, seller multi-angle ImageKit uploads, and live Razorpay checkout.",
    longDescription:
      "Luxurisen translates high-fashion luxury aesthetics into sub-second web experiences. Built with Cormorant Garamond typography and smooth micro-interactions, the platform implements a tiered Redis caching architecture that delivers sub-millisecond catalog reads with automatic mutation purging. The platform features an immutable server-authoritative promo engine, role-based merchant dashboards with ImageKit SDK uploads, and Razorpay payment processing with automated invoice generation.",
    coverImage:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["React 19", "Redis Caching", "Razorpay", "Luxury E-Commerce", "Node.js", "Express 5"],
    featured: true,
    assetsTemporary: true,
    githubLink: "https://github.com/DeveloperHarshal92/07---Snitch.git",
    liveLink: "https://luxurisen.onrender.com/",
    techStack: [
      "React 19",
      "Vite 8",
      "Tailwind CSS 4",
      "Redux Toolkit",
      "GSAP 3",
      "Node.js",
      "Express 5",
      "MongoDB / Mongoose 9",
      "Redis (ioredis)",
      "Passport Google OAuth",
      "Razorpay",
      "ImageKit SDK"
    ],
    features: [
      "Sub-millisecond Redis response caching with X-Cache headers and mutation purging",
      "Server-authoritative coupon engine with atomic redemption tracking in MongoDB",
      "Dual-role RBAC with buyer cart/orders and seller inventory dashboards",
      "Editorial 65% hero slider with Cormorant Garamond luxury aesthetics",
      "Razorpay payment gateway integration with automated PDF invoice generation"
    ]
  },
  {
    id: 8,
    slug: "Loveable",
    number: "08",
    title: "CodeSpace — Cloud Microservices Web IDE",
    subtitle: "Cloud-Native Kubernetes Microservices IDE",
    category: "Cloud Native / Developer Tools",
    year: "2025",
    role: "Cloud Architecture & Microservices Engineering",
    description:
      "An event-driven cloud IDE architected as Kubernetes microservices. Spawns ephemeral container sandboxes on demand, streams in-browser Monaco editing, node-pty terminal sessions over WebSockets, LangGraph Mistral AI code generation via SSE, and bi-directional S3 file synchronization.",
    longDescription:
      "A cloud-native development environment engineered as isolated microservices. When a user opens a workspace, the orchestrator provisions an isolated Kubernetes pod sandbox with strict CPU/memory limits and Redis TTL cleanup. Workspaces synchronize via debounced S3 delta workers, stream terminal I/O using node-pty and xterm.js over WebSockets, and stream AI code generation using LangGraph and Mistral AI over Server-Sent Events with dynamic reverse proxy previews.",
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["Kubernetes", "Monaco Editor", "xterm.js", "Microservices", "LangGraph", "AWS S3"],
    featured: true,
    assetsTemporary: true,
    githubLink: "https://github.com/DeveloperHarshal92/The-CodeSpace.git",
    liveLink: "",
    techStack: [
      "React 19",
      "Vite 8",
      "Tailwind CSS v4",
      "Monaco Editor",
      "xterm.js",
      "Kubernetes (@kubernetes/client-node)",
      "Node.js",
      "Express 5",
      "LangGraph",
      "Mistral AI",
      "Redis",
      "RabbitMQ (amqplib)",
      "AWS S3",
      "MongoDB"
    ],
    features: [
      "On-demand Kubernetes pod sandbox provisioning with Redis TTL auto-cleanup",
      "In-browser Monaco Editor with local web workers and debounced container sync",
      "Real-time pseudo-terminal streaming via node-pty, Socket.io, and xterm.js",
      "AI code generator streaming mutations over Server-Sent Events via LangGraph",
      "Dynamic host-header reverse proxy for live wildcard subdomain web previews"
    ]
  },
  {
    id: 9,
    slug: "Resume Builder",
    number: "09",
    title: "AI ATS Resume Builder",
    subtitle: "Intelligent Resume Optimization & ATS Radar",
    category: "Full Stack / AI Tool",
    year: "2025",
    role: "Full-Stack Development & AI Prompt Engineering",
    description:
      "An intelligent resume optimization web application built with Next.js 16 (App Router) and TypeScript. Integrates Google Gemini AI to analyze ATS compatibility scores, polish bullet points into high-impact STAR accomplishments, generate role-tailored summaries, and export print-ready PDFs.",
    longDescription:
      "A modern career accelerator built with Next.js 16 App Router and React 19. Empowers candidates to compose ATS-compliant resumes with a multi-step structured wizard. Connected directly to Google Gemini AI models, the engine computes real-time keyword density and score radars, rewrites weak bullet points into quantifiable STAR-formatted impact statements, synthesizes executive career summaries, and provides real-time dual-pane PDF rendering.",
    coverImage:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["Next.js 16", "React 19", "Google Gemini AI", "TypeScript", "Tailwind CSS v4", "PDF Export"],
    featured: false,
    assetsTemporary: true,
    githubLink: "",
    liveLink: "",
    techStack: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript 5",
      "Tailwind CSS v4",
      "Google Gemini SDK (@google/genai)",
      "MongoDB / Mongoose",
      "JWT",
      "Bcrypt",
      "Lucide React"
    ],
    features: [
      "Guided multi-step wizard spanning experience, skills, projects, and awards",
      "Real-time ATS compatibility scoring and actionable keyword feedback",
      "Gemini AI bullet point rewrite and impact-enhancement engine",
      "Automatic career summary synthesis tailored to target job roles",
      "Live interactive preview with dynamic layout switching and PDF export"
    ]
  },
  {
    id: 10,
    slug: "Smart Trolly 2.0",
    number: "10",
    title: "Smart Trolly 2.0 — AI Autonomous Checkout",
    subtitle: "Edge Computer Vision & Real-Time FMCG Billing",
    category: "Edge AI / Computer Vision",
    year: "2025",
    role: "Edge AI Architecture & 3D Web Graphics",
    description:
      "An edge-AI retail checkout platform powered by a YOLOv8 ONNX model running in Node.js backend via onnxruntime-node. Features camera stream processing over WebSockets with temporal anti-duplication, 3D holographic hero rendering via Three.js / React Three Fiber, Razorpay checkout, and thermal PDF receipt emailing.",
    longDescription:
      "An autonomous retail checkout system designed to eliminate checkout friction in FMCG environments. A Node.js backend executes a YOLOv8 ONNX vision model locally using onnxruntime-node, processing incoming frame streams over WebSockets. Integrated temporal anti-duplication algorithms and Non-Maximum Suppression prevent duplicate item charges. The frontend features an interactive 3D holographic smart trolley rendered with React Three Fiber, automated tiered GST tax calculations, and instant thermal PDF receipt dispatch upon Razorpay payment completion.",
    coverImage:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556742049-0a67e5572263?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["YOLOv8 Edge AI", "Three.js / R3F", "WebSockets", "ONNX Runtime", "React 19", "Razorpay"],
    featured: true,
    assetsTemporary: true,
    githubLink: "https://github.com/DeveloperHarshal92/Smart-Trolly-2.0.git",
    liveLink: "",
    techStack: [
      "React 19",
      "Three.js",
      "@react-three/fiber",
      "@react-three/drei",
      "Redux Toolkit",
      "Tailwind CSS v4",
      "Node.js",
      "Express 5",
      "ONNX Runtime Node (YOLOv8)",
      "Sharp",
      "WebSockets (ws)",
      "Razorpay",
      "PDFKit",
      "MongoDB"
    ],
    features: [
      "Real-time YOLOv8 ONNX object detection directly in backend runtime",
      "WebSocket stream pipeline with temporal consistency and Non-Max Suppression",
      "Interactive 3D holographic smart trolley canvas via React Three Fiber",
      "Automated FMCG GST tiered tax computation and instant order totals",
      "Razorpay payment integration with automated PDF thermal receipt emailing"
    ]
  }
];
