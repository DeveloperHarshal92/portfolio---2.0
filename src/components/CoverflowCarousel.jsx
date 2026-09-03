"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  forwardRef,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap, { ScrollTrigger, useGSAP } from "@/libs/gsap";
import useViewTransition from "@/hooks/useViewTransition";
import TextReveal from "@/components/TextReveal";
import { cn } from "@/libs/utils";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* =========================================================================
   INDIVIDUAL COVERFLOW CARD
   Robust link-based navigation with zero gesture cancellation
   ========================================================================= */
const CoverflowCard = forwardRef(
  (
    { slide, index, onCardClick, onHoverStart, onHoverEnd, cardClassName },
    ref,
  ) => {
    const imgRef = useRef(null);

    const onEnter = () => {
      onHoverStart?.(index);

      if (imgRef.current) {
        gsap.to(imgRef.current, {
          scale: 1.1,
          duration: 0.35,
          ease: "power2.out",
        });
      }
    };

    const onLeave = () => {
      onHoverEnd?.(index);

      if (imgRef.current) {
        gsap.to(imgRef.current, {
          scale: 1,
          duration: 0.35,
          ease: "power2.out",
        });
      }
    };

    const slideSlug = slide.slug || slide.title || `Project-${index + 1}`;
    const slideCover =
      slide.coverImage || slide.heroImage || slide.src || "";
    const projectUrl = `/project/${encodeURIComponent(slideSlug)}`;

    const handleClick = (e) => {
      e.preventDefault();
      onCardClick(slide);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "absolute left-1/2 top-0 select-none overflow-visible group",
          cardClassName,
        )}
        style={{
          width: "var(--cf-card)",
          height: "calc(var(--cf-card) * 1.35)",
        }}
      >
        <Link
          href={projectUrl}
          onClick={handleClick}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          aria-label={slideSlug}
          className="relative block w-full h-full rounded-3xl overflow-hidden bg-slate-950 shadow-2xl border border-white/20 transition-all duration-300 hover:border-white/50 cursor-pointer"
        >
          <img
            ref={imgRef}
            src={slideCover}
            alt={slideSlug}
            draggable={false}
            className="h-full w-full select-none object-cover pointer-events-none transition-transform duration-500"
          />

          {/* Subtle bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
        </Link>
      </div>
    );
  },
);

CoverflowCard.displayName = "CoverflowCard";

/* =========================================================================
   SCROLL-TRIGGERED 3D COVERFLOW CAROUSEL (60FPS GSAP PINNED ARCHITECTURE)
   ========================================================================= */
export function CoverflowCarousel({
  slides = [],
  projects = [],
  rotate = 46,
  depth = 0.65,
  perspective = 3,
  falloff = 0.56,
  fade = 0.12,
  cardWidth = "clamp(260px, 24vw, 350px)",
  gap = 0.08,
  cardClassName,
  className,
}) {
  const router = useRouter();
  const { navigateTo } = useViewTransition();

  // Support both slides and projects prop
  const items = projects && projects.length > 0 ? projects : slides;
  const count = items.length;

  const wrapperRef = useRef(null);
  const frameRef = useRef(null);
  const cardRefs = useRef([]);
  const isNavigatingRef = useRef(false);

  // Position & active slide state tracking
  const posRef = useRef(0);
  const widthRef = useRef(0);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Direct DOM matrix painting for 60fps performance
  const paint = useCallback(() => {
    const width = widthRef.current;
    if (!width || count === 0) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const offset = index - pos;
      const distance = Math.abs(offset);

      const ramp = Math.pow(distance, falloff);
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);

      // Hardware-accelerated 3D transform
      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

      const opacityVal = Math.max(0.08, 1 - fade * distance);
      card.style.opacity = String(opacityVal);

      // Monotonic stable z-index: center card always sits on top, layered outward cleanly
      const baseZ = 1000 - Math.round(distance * 50);
      card.style.zIndex = String(baseZ);

      // Visibility & Pointer Events: allow generous range for all visible cards
      const isVisible = distance <= 8;
      card.style.pointerEvents = isVisible ? "auto" : "none";
      card.style.visibility = isVisible ? "visible" : "hidden";
    });
  }, [count, depth, fade, falloff, gap, rotate]);

  // GSAP ScrollTrigger Scrubbing Engine
  useGSAP(
    () => {
      if (!wrapperRef.current || count === 0) return;

      // Calculate total scroll distance needed to scrub through all cards
      const scrollDistance = Math.max((count - 1) * 320, 2400);

      const st = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        onUpdate: (self) => {
          // Map scroll progress (0 -> 1) directly to posRef (0 -> count - 1)
          posRef.current = self.progress * (count - 1);

          // Update active index for center text reveal
          const curIdx = Math.min(
            Math.max(Math.round(self.progress * (count - 1)), 0),
            count - 1,
          );
          if (curIdx !== activeIndexRef.current) {
            activeIndexRef.current = curIdx;
            setActiveIndex(curIdx);
          }

          paint();
        },
      });

      return () => {
        st.kill();
      };
    },
    {
      scope: wrapperRef,
      dependencies: [count, paint],
    },
  );

  // Click handler with debounced navigation guard
  const handleCardClick = (slide) => {
    if (!slide?.slug || isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    const url = `/project/${encodeURIComponent(slide.slug)}`;
    if (navigateTo) {
      navigateTo(url);
    } else {
      router.push(url);
    }

    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1200);
  };

  // Responsive measure
  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  if (count === 0) return null;

  // Currently focused project (hover takes preview precedence, otherwise active scroll project)
  const displayIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
  const currentProject = items[displayIndex] || items[0];

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative w-full h-screen min-h-[100dvh] flex flex-col justify-between items-center select-none overflow-hidden bg-[#edf5ff] py-8 sm:py-12",
        className,
      )}
      style={{ "--cf-card": cardWidth }}
    >
      {/* =========================================================================
          CENTER HEADER: ACTIVE PROJECT NUMBER & SLUG REVEAL
          ========================================================================= */}
      <div className="w-full max-w-4xl mx-auto px-6 pt-4 flex flex-col items-center text-center z-20 pointer-events-auto">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500 mb-2 pointer-events-none">
          {currentProject.number} / Selected Work
        </span>

        {/* Dynamic Center Title with TextReveal Effect */}
        <Link
          href={`/project/${encodeURIComponent(currentProject?.slug || "")}`}
          onClick={(e) => {
            e.preventDefault();
            handleCardClick(currentProject);
          }}
          className="min-h-[85px] flex flex-col items-center justify-center cursor-pointer group"
          title="Click to view project details"
        >
          {currentProject && (
            <div
              key={currentProject.slug || displayIndex}
              className="flex flex-col items-center text-center gap-1"
            >
              {/* <TextReveal
                key={`num-${currentProject.number || displayIndex}`}
                splitBy="chars"
                duration={0.3}
              >
                <span className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-[0.3em] text-slate-500 group-hover:text-slate-900 transition-colors">
                  [ {currentProject.number} ]
                </span>
              </TextReveal> */}

              <TextReveal
                key={`slug-${currentProject.slug || displayIndex}`}
                splitBy="chars"
                duration={0.4}
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-tight text-slate-950 uppercase font-mono group-hover:text-sky-600 transition-colors">
                  {currentProject.slug}
                </h2>
              </TextReveal>
            </div>
          )}
        </Link>
      </div>

      {/* =========================================================================
          3D PERSPECTIVE STAGE
          ========================================================================= */}
      <div className="relative w-full flex-1 flex items-center justify-center overflow-visible my-auto">
        <div
          ref={frameRef}
          className="relative w-full max-w-7xl mx-auto overflow-visible"
          style={{
            perspective: `calc(var(--cf-card) * ${perspective})`,
          }}
        >
          <div
            className="relative select-none overflow-visible"
            style={{
              height: "calc(var(--cf-card) * 1.35)",
              transformStyle: "preserve-3d",
            }}
          >
            {items.map((slide, index) => (
              <CoverflowCard
                key={slide.id || index}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                slide={slide}
                index={index}
                cardClassName={cardClassName}
                onCardClick={handleCardClick}
                onHoverStart={(idx) => {
                  setHoveredIndex(idx);
                }}
                onHoverEnd={() => {
                  setHoveredIndex(null);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM TELEMETRY STATUS
          ========================================================================= */}
      <div className="w-full max-w-md mx-auto pb-4 flex items-center justify-center gap-3 z-20 pointer-events-none">
        <span className="text-[11px] font-mono text-slate-500 tracking-widest uppercase">
          [ {displayIndex + 1} / {items.length} ]
        </span>
      </div>
    </div>
  );
}

export default CoverflowCarousel;
