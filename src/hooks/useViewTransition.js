"use client";

import gsap from "@/libs/gsap";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const STRIP_COUNT = 20;

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
      background-color: #0a0d12;
      transform: scaleY(0);
      transform-origin: bottom;
      will-change: transform;
      outline: 1px solid #0a0d12;
    `;
    overlay.appendChild(strip);
  }

  document.body.appendChild(overlay);
  return overlay;
};

const useViewTransition = () => {
  const router = useRouter();

  const navigateTo = useCallback(
    (href) => {
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
    [router]
  );

  return { navigateTo };
};

export default useViewTransition;
