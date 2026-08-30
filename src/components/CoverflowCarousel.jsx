"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  forwardRef,
} from "react";
import { useRouter } from "next/navigation";
import gsap, { useGSAP } from "@/libs/gsap";
import useViewTransition from "@/hooks/useViewTransition";
import TextReveal from "@/components/TextReveal";
import { cn } from "@/libs/utils";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* =========================================================================
   INDIVIDUAL COVERFLOW CARD (Matches CarouselCard hover & pop-out behavior)
   ========================================================================= */
const CoverflowCard = forwardRef(
  (
    { slide, index, onCardClick, onHoverStart, onHoverEnd, cardClassName },
    ref,
  ) => {
    const numRef = useRef(null);
    const titleRef = useRef(null);
    const innerCardRef = useRef(null);
    const imgRef = useRef(null);

    const onEnter = () => {
      onHoverStart?.(index);

      if (innerCardRef.current) {
        gsap.to(innerCardRef.current, {
          scale: 1.1,
          duration: 0.3,
          ease: "power3.out",
        });
      }

      if (imgRef.current) {
        gsap.to(imgRef.current, {
          scale: 1.15,
          duration: 0.3,
          ease: "power3.out",
        });
      }

      console.log(
        `[Coverflow] onEnter card ${index} -> numRef:`,
        numRef.current,
        "titleRef:",
        titleRef.current,
      );
      numRef.current?.play();
      titleRef.current?.play();
    };

    const onLeave = () => {
      onHoverEnd?.(index);

      if (innerCardRef.current) {
        gsap.to(innerCardRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power3.out",
        });
      }

      if (imgRef.current) {
        gsap.to(imgRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power3.out",
        });
      }

      console.log(`[Coverflow] onLeave card ${index}`);
      numRef.current?.reverse();
      titleRef.current?.reverse();
    };

    const slideNumber = slide.number || String(index + 1).padStart(2, "0");
    const slideTitle = slide.title || slide.name || `Project ${index + 1}`;
    const slideCover = slide.coverImage || slide.src || slide.heroImage || "";

    return (
      <div
        ref={ref}
        onClick={() => onCardClick(slide)}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        role="button"
        tabIndex={0}
        aria-label={slideTitle}
        className={cn(
          "absolute left-1/2 top-0 select-none cursor-pointer overflow-visible group",
          cardClassName,
        )}
        style={{
          width: "var(--cf-card)",
          height: "calc(var(--cf-card) * 1.35)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Title Panel (Pops out above card on hover exactly like CarouselCard) */}
        <div
          style={{
            bottom: "calc(100% + 1.2rem)",
            transform: "translateZ(80px)",
            transformStyle: "preserve-3d",
          }}
          className="titlePanel absolute left-0 pointer-events-none flex flex-col gap-1 min-w-[240px] z-50 select-none"
        >
          <TextReveal
            ref={numRef}
            duration="0.25"
            trigger="manual"
            splitBy="chars"
          >
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-700">
              {slideNumber}
            </h4>
          </TextReveal>

          <TextReveal
            ref={titleRef}
            duration="0.25"
            trigger="manual"
            splitBy="words"
          >
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-slate-950 leading-tight">
              {slideTitle}
            </h3>
          </TextReveal>
        </div>

        {/* Card Body Container */}
        <div
          ref={innerCardRef}
          className="relative w-full h-full rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border border-white/20 transition-all duration-300"
        >
          <img
            ref={imgRef}
            src={slideCover}
            alt={slideTitle}
            draggable={false}
            className="h-full w-full select-none object-cover pointer-events-none transition-transform duration-500"
          />

          {/* Subtle bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    );
  },
);

CoverflowCard.displayName = "CoverflowCard";

/* =========================================================================
   INFINITE 3D COVERFLOW CAROUSEL (Zero Re-render Thrash 60FPS Architecture)
   ========================================================================= */
export function CoverflowCarousel({
  slides = [],
  rotate = 46,
  depth = 0.65,
  perspective = 3,
  falloff = 0.56,
  fade = 0.12,
  cardWidth = "clamp(220px, 24vw, 340px)",
  gap = 0.08,
  loop = true,
  autoScroll = true,
  autoSpeed = 0.002, // Speed of infinite rotation per frame
  pauseOnHover = true,
  label = "3D Coverflow Infinite Carousel",
  className,
  cardClassName,
}) {
  const router = useRouter();
  const { navigateTo } = useViewTransition();
  const count = slides.length;

  const frameRef = useRef(null);
  const cardRefs = useRef([]);

  // Position & hover state tracking (kept in Ref for zero render thrash)
  const posRef = useRef(0);
  const widthRef = useRef(0);
  const isHoveredRef = useRef(false);
  const hoveredIndexRef = useRef(null);

  // Direct DOM matrix painting for 60fps performance
  const paint = useCallback(() => {
    const width = widthRef.current;
    if (!width || count === 0) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      let offset = index - pos;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      const isCardHovered = hoveredIndexRef.current === index;

      const ramp = Math.pow(distance, falloff);
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);

      // 3D positioning
      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      const opacityVal = Math.max(0, 1 - fade * distance) * edge;
      card.style.opacity = String(opacityVal);

      // Z-index: hovered card gets highest priority
      const baseZ = 1000 - Math.round(distance * 20);
      card.style.zIndex = String(isCardHovered ? 9999 : baseZ);

      // Determine pointerEvents & visibility with hoveredIndexRef exemption
      const isHidden =
        !isCardHovered && (distance >= count / 2 || opacityVal <= 0);
      const pointerEventsValue = isHidden ? "none" : "auto";
      const visibilityValue = isHidden ? "hidden" : "visible";

      card.style.pointerEvents = pointerEventsValue;
      card.style.visibility = visibilityValue;

      if (isCardHovered) {
        console.log(
          `[Coverflow] Hovered card ${index} -> distance: ${distance.toFixed(3)}, opacityVal: ${opacityVal.toFixed(3)}, pointerEvents: ${pointerEventsValue}`,
        );
      }
    });
  }, [count, depth, fade, falloff, gap, loop, rotate]);

  // GSAP Ticker for continuous infinite auto-scroll without React re-renders
  useGSAP(
    () => {
      const tick = () => {
        // Advance rotation when NOT hovered
        if (autoScroll && (!pauseOnHover || !isHoveredRef.current)) {
          posRef.current += autoSpeed;
        }

        // Bounded range wrap
        if (loop && count > 0) {
          if (posRef.current > count * 1000) {
            posRef.current -= count * 1000;
          } else if (posRef.current < -count * 1000) {
            posRef.current += count * 1000;
          }
        }

        paint();
      };

      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
      };
    },
    {
      dependencies: [autoScroll, autoSpeed, pauseOnHover, loop, count, paint],
    },
  );

  // Click handler
  const handleCardClick = (slide) => {
    if (slide?.slug) {
      if (navigateTo) {
        navigateTo(`/project/${slide.slug}`);
      } else {
        router.push(`/project/${slide.slug}`);
      }
    }
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

  return (
    <div
      className={cn(
        "w-full flex flex-col items-center justify-center select-none overflow-visible",
        className,
      )}
      style={{ "--cf-card": cardWidth }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="relative w-full max-w-7xl mx-auto overflow-visible">
        <div
          ref={frameRef}
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
            hoveredIndexRef.current = null;
          }}
          className="overflow-visible py-28"
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
            {slides.map((slide, index) => (
              <CoverflowCard
                key={index}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                slide={slide}
                index={index}
                cardClassName={cardClassName}
                onCardClick={handleCardClick}
                onHoverStart={(idx) => {
                  hoveredIndexRef.current = idx;
                }}
                onHoverEnd={() => {
                  hoveredIndexRef.current = null;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoverflowCarousel;
