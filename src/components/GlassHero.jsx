"use client";

import { useEffect, useRef } from "react";
import gsap, { useGSAP } from "@/libs/gsap";
import TextReveal from "./TextReveal";

const DESKTOP_RADIUS = 235;
const MOBILE_RADIUS = 150;
const POS_LERP = 0.14;
const RADIUS_LERP = 0.12;

export default function GlassHero() {
  const heroRef = useRef(null);
  const baseRef = useRef(null);
  const bottomRef = useRef(null);

  // rAF mask state
  const raw = useRef({ x: -999, y: -999 });
  const smoothed = useRef({ x: -999, y: -999 });
  const currentRadius = useRef(0);
  const targetRadius = useRef(0);
  const isTouching = useRef(false);
  const reducedMotion = useRef(false);
  const frameId = useRef(null);

  // --- GSAP entrance animations (replaces all CSS @keyframes) ---
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const dur = prefersReduced ? 0 : 1;

      // Base image: scale-up reveal
      if (baseRef.current) {
        gsap.fromTo(
          baseRef.current,
          { opacity: 0, scale: 1.035 },
          { opacity: 1, scale: 1, duration: dur * 1.1, ease: "expo.out" },
        );
      }

      // Bottom block: fade + slide up
      if (bottomRef.current) {
        gsap.fromTo(
          bottomRef.current,
          { opacity: 0, y: "0.6rem" },
          {
            opacity: 1,
            y: 0,
            duration: dur * 0.9,
            ease: "expo.out",
            delay: prefersReduced ? 0 : 0.85,
          },
        );
      }
    },
    { scope: heroRef },
  );

  // --- rAF loop + pointer/touch/scroll events ---
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = motionQuery.matches;
    const handleMotionChange = (e) => {
      reducedMotion.current = e.matches;
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // Single rAF loop — drives the CSS-variable mask position & radius
    const tick = () => {
      const posFactor = reducedMotion.current ? 1 : POS_LERP;
      const radiusFactor = reducedMotion.current ? 1 : RADIUS_LERP;

      smoothed.current.x += (raw.current.x - smoothed.current.x) * posFactor;
      smoothed.current.y += (raw.current.y - smoothed.current.y) * posFactor;
      currentRadius.current +=
        (targetRadius.current - currentRadius.current) * radiusFactor;

      hero.style.setProperty("--reveal-x", `${smoothed.current.x}px`);
      hero.style.setProperty("--reveal-y", `${smoothed.current.y}px`);
      hero.style.setProperty(
        "--reveal-radius",
        `${Math.max(currentRadius.current, 0)}px`,
      );

      frameId.current = requestAnimationFrame(tick);
    };
    frameId.current = requestAnimationFrame(tick);

    // Desktop pointer
    const handlePointerEnter = (e) => {
      if (e.pointerType !== "mouse") return;
      raw.current.x = e.clientX;
      raw.current.y = e.clientY;
      targetRadius.current = DESKTOP_RADIUS;
    };
    const handlePointerMove = (e) => {
      if (e.pointerType === "mouse") {
        raw.current.x = e.clientX;
        raw.current.y = e.clientY;
        return;
      }
      if (isTouching.current) {
        raw.current.x = e.clientX;
        raw.current.y = e.clientY;
      }
    };
    const handlePointerLeave = (e) => {
      if (e.pointerType !== "mouse") return;
      targetRadius.current = 0;
    };

    // Touch
    const handlePointerDown = (e) => {
      if (e.pointerType === "mouse") return;
      isTouching.current = true;
      if (typeof hero.setPointerCapture === "function") {
        try {
          hero.setPointerCapture(e.pointerId);
        } catch {
          /* safe to ignore */
        }
      }
      raw.current.x = e.clientX;
      raw.current.y = e.clientY;
      targetRadius.current = MOBILE_RADIUS;
    };
    const endTouch = (e) => {
      if (e.pointerType === "mouse") return;
      isTouching.current = false;
      targetRadius.current = 0;
    };

    hero.addEventListener("pointerenter", handlePointerEnter);
    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerleave", handlePointerLeave);
    hero.addEventListener("pointerdown", handlePointerDown);
    hero.addEventListener("pointerup", endTouch);
    hero.addEventListener("pointercancel", endTouch);

    // Release touch-action once scrolled past hero (Lenis uses window scroll)
    const updateLock = () => {
      const pinned = window.scrollY < window.innerHeight * 0.1;
      hero.style.touchAction = pinned ? "none" : "pan-y";
    };
    updateLock();
    window.addEventListener("scroll", updateLock, { passive: true });

    return () => {
      if (frameId.current !== null) cancelAnimationFrame(frameId.current);
      motionQuery.removeEventListener("change", handleMotionChange);
      hero.removeEventListener("pointerenter", handlePointerEnter);
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", handlePointerLeave);
      hero.removeEventListener("pointerdown", handlePointerDown);
      hero.removeEventListener("pointerup", endTouch);
      hero.removeEventListener("pointercancel", endTouch);
      window.removeEventListener("scroll", updateLock);
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative isolate overflow-hidden min-w-80 min-h-dvh h-dvh bg-[#edf5ff] dark:bg-[#07090e] text-[#0a0d12] dark:text-[#f1f5f9] transition-colors duration-400"
      style={{
        "--reveal-x": "-999px",
        "--reveal-y": "-999px",
        "--reveal-radius": "0px",
      }}
    >
      {/* Base image — entrance animated by GSAP (scale + opacity) */}
      <div
        ref={baseRef}
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/images/Base_image_desktop.png')] max-[767px]:bg-[url('/images/Base_image_mobile.png')] bg-cover bg-center bg-no-repeat gh-base-landscape"
        style={{ opacity: 0 }}
      />

      {/* Dark mode ethereal depth wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#07090e]/10 via-[#07090e]/40 to-[#07090e]/85 opacity-0 dark:opacity-100 pointer-events-none transition-opacity duration-500"
      />

      {/* Reveal image — masked by CSS-variable radial gradient (kept in glass-hero.css) */}
      <div
        aria-hidden="true"
        className="gh-reveal absolute inset-0 bg-[url('/images/Reveal_image_desktop.png')] max-[767px]:bg-[url('/images/Reveal_image_mobile.png')] bg-cover bg-center bg-no-repeat pointer-events-none"
      />

      {/* Content */}
      <div className="absolute inset-0">
        {/*
          Headline — TextReveal handles GSAP SplitText char-by-char entrance.
          splitBy="chars" stagger gives a sequential letter reveal.
          delay="0.35" gives the base image time to reveal first.
          className positions the wrapper div absolutely (TextReveal renders a div).
          Font is set explicitly to --font-sans because globals.css maps
          h1/span/h3 → mono via tag selector — we override here.
        */}
        <TextReveal
          splitBy="chars"
          trigger="mount"
          delay="0.35"
          duration={0.9}
          stagger={0.03}
          ease="power4.out"
          className="absolute top-[34%] max-[767px]:top-[15%] left-[max(5.6vw,2rem)] max-[767px]:left-5 max-[767px]:w-[62%] m-0"
        >
          <h1
            className="m-0 font-normal leading-[0.93] tracking-[-0.085em] text-[clamp(5.4rem,6.2vw,6.8rem)] max-[767px]:text-[clamp(2.7rem,12.5vw,3.8rem)] max-[767px]:leading-[0.87] text-slate-950 dark:text-slate-50 transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Form
            <br />
            Follows
            <br />
            Structure
          </h1>
        </TextReveal>

        {/* Intro paragraph + CTA — GSAP fade-up via bottomRef */}
        <div
          ref={bottomRef}
          className="absolute left-[max(5.6vw,2rem)] max-[767px]:left-5 max-[767px]:right-5 bottom-[max(3rem,env(safe-area-inset-bottom))] max-[767px]:bottom-[max(2rem,calc(env(safe-area-inset-bottom)+2rem))] max-w-[26rem] max-[767px]:max-w-none flex flex-col items-start gap-[1.4rem]"
          style={{ opacity: 0 }}
        >
          <TextReveal splitBy="words" trigger="mount" delay="1.35" duration={0.9} stagger={0.03} ease="power4.out">
            <p
            className="m-0 text-[clamp(1rem,1.1vw,1.15rem)] leading-[1.45] tracking-[-0.01em] text-slate-700 dark:text-slate-300 transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            I design and build systems where the engineering underneath is as
            considered as the interface on top
          </p>
          </TextReveal>
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href="https://www.linkedin.com/in/harshal-varade-07945a3a3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-[1.5rem] rounded-full bg-white dark:bg-[#0f1626] text-[#0a0d12] dark:text-[#f1f5f9] text-[0.8rem] tracking-[0.04em] uppercase no-underline ring-1 ring-slate-900/10 dark:ring-white/15 shadow-[0_1px_2px_rgba(10,13,18,0.08),0_8px_24px_rgba(10,13,18,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:bg-[#f8fafd] dark:hover:bg-[#162034] active:scale-[0.98] focus-visible:-translate-y-px focus-visible:outline-none cursor-pointer"
              style={{ fontFamily: "var(--font-mono)" }}
              aria-label="LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/DeveloperHarshal92"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-[1.5rem] rounded-full bg-white dark:bg-[#0f1626] text-[#0a0d12] dark:text-[#f1f5f9] text-[0.8rem] tracking-[0.04em] uppercase no-underline ring-1 ring-slate-900/10 dark:ring-white/15 shadow-[0_1px_2px_rgba(10,13,18,0.08),0_8px_24px_rgba(10,13,18,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:bg-[#f8fafd] dark:hover:bg-[#162034] active:scale-[0.98] focus-visible:-translate-y-px focus-visible:outline-none cursor-pointer"
              style={{ fontFamily: "var(--font-mono)" }}
              aria-label="GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
