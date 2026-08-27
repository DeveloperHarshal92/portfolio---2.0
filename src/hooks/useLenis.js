"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // 1. Every time Lenis scrolls, tell ScrollTrigger to recalc
    lenis.on("scroll", ScrollTrigger.update);

    // 2. Drive Lenis's internal raf with GSAP's ticker instead of its own rAF loop
    //    This is the actual fix for the "conflict" — a single clock source.
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 3. Kill GSAP's lag smoothing — it fights with Lenis's own easing
    //    and causes stutter on tab-refocus.
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return lenisRef;
}
