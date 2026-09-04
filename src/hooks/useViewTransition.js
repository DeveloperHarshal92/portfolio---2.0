"use client";

import gsap from "@/libs/gsap";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const STRIP_COUNT = 20;

const getStripColor = () => {
  if (typeof document === "undefined") return "#0a0d12";
  return document.documentElement.classList.contains("dark")
    ? "#ffffff"
    : "#0a0d12";
};

const removeOverlay = () => {
  if (typeof document === "undefined") return;
  const element = document.getElementById("page-transition-overlay");
  if (element) {
    gsap.killTweensOf(element.children);
    element.remove();
  }
};

const createStrips = () => {
  removeOverlay();
  const stripColor = getStripColor();

  const overlay = document.createElement("div");
  overlay.id = "page-transition-overlay";
  overlay.style.cssText = `
    position: fixed;
    inset: -2px;
    width: calc(100vw + 4px);
    height: calc(100vh + 4px);
    z-index: 99999;
    pointer-events: none;
    display: flex;
    overflow: hidden;
  `;

  for (let i = 0; i < STRIP_COUNT; i++) {
    const strip = document.createElement("div");
    strip.style.cssText = `
      flex: 1 0 calc(100% / ${STRIP_COUNT} + 1px);
      margin-right: -1px;
      height: 102%;
      background-color: ${stripColor};
      transform: scaleY(0) translateZ(0);
      transform-origin: bottom;
      will-change: transform;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      outline: 1px solid ${stripColor};
    `;
    overlay.appendChild(strip);
  }

  document.body.appendChild(overlay);
  return overlay;
};

export const revealFromStrips = (onComplete) => {
  if (typeof document === "undefined") {
    onComplete?.();
    return;
  }
  removeOverlay();
  const stripColor = getStripColor();

  const overlay = document.createElement("div");
  overlay.id = "page-transition-overlay";
  overlay.style.cssText = `
    position: fixed;
    inset: -2px;
    width: calc(100vw + 4px);
    height: calc(100vh + 4px);
    z-index: 999999;
    pointer-events: none;
    display: flex;
    overflow: hidden;
  `;

  for (let i = 0; i < STRIP_COUNT; i++) {
    const strip = document.createElement("div");
    strip.style.cssText = `
      flex: 1 0 calc(100% / ${STRIP_COUNT} + 1px);
      margin-right: -1px;
      height: 102%;
      background-color: ${stripColor};
      transform: scaleY(1) translateZ(0);
      transform-origin: top;
      will-change: transform;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      outline: 1px solid ${stripColor};
    `;
    overlay.appendChild(strip);
  }

  document.body.appendChild(overlay);

  const strips = Array.from(overlay.children);

  gsap.to(strips, {
    scaleY: 0,
    duration: 0.65,
    ease: "power3.inOut",
    delay: 0,
    stagger: {
      each: 0.025,
      from: "center",
    },
    transformOrigin: "top",
    onComplete: () => {
      removeOverlay();
      onComplete?.();
    },
  });
};

const useViewTransition = () => {
  const router = useRouter();

  const navigateTo = useCallback(
    (href) => {
      // If anchor link on the same page, scroll smoothly instead of full page wipe
      if (
        href.startsWith("#") ||
        (typeof window !== "undefined" &&
          window.location.pathname === "/" &&
          href.startsWith("/#"))
      ) {
        const targetId = href.replace(/^\/?#/, "");
        if (targetId) {
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth" });
            return;
          }
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }

      const overlay = createStrips();
      const strips = Array.from(overlay.children);

      gsap.to(strips, {
        scaleY: 1.02,
        duration: 0.45,
        ease: "power3.inOut",
        stagger: {
          each: 0.03,
          from: "center",
        },
        onComplete: () => {
          router.push(href);

          gsap.to(strips, {
            scaleY: 0,
            duration: 0.55,
            ease: "power3.inOut",
            delay: 0.1,
            stagger: {
              each: 0.03,
              from: "center",
            },
            transformOrigin: "top",
            onComplete: removeOverlay,
          });
        },
      });
    },
    [router],
  );

  return { navigateTo, revealFromStrips };
};

export default useViewTransition;
