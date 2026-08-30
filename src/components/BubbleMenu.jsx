"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "@/libs/gsap";
import useViewTransition from "@/hooks/useViewTransition";
import { cn } from "@/libs/utils";

const DEFAULT_ITEMS = [
  {
    number: "01",
    label: "Home",
    subtitle: "Main Canvas",
    href: "/",
    ariaLabel: "Home",
    widthDesktop: "35vw",
    widthMobile: "70vw",
  },
  {
    number: "02",
    label: "Projects",
    subtitle: "Projects & Systems",
    href: "/project",
    ariaLabel: "Selected Projects",
    widthDesktop: "41vw",
    widthMobile: "80vw",
  },
  {
    number: "03",
    label: "About",
    subtitle: "Bio & Tech Stack",
    href: "/about",
    ariaLabel: "About Harshal",
    widthDesktop: "48vw",
    widthMobile: "90vw",
  },
  {
    number: "04",
    label: "Contact",
    subtitle: "Direct Channel",
    href: "/contact",
    ariaLabel: "Direct Contact",
    widthDesktop: "55vw",
    widthMobile: "100vw",
  },
];

export default function BubbleMenu({
  logo,
  onMenuClick,
  className,
  style,
  menuAriaLabel = "Toggle navigation menu",
  useFixedPosition = true,
  items,
  animationDuration = 0.55,
  staggerDelay = 0.08,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { navigateTo } = useViewTransition();

  const overlayRef = useRef(null);
  const stripRefs = useRef([]);
  const contentRefs = useRef([]);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at top of page
      if (currentScrollY < 40) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Avoid jitter from micro-scrolls
      if (Math.abs(currentScrollY - lastScrollY.current) < 8) {
        return;
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Scrolling down -> hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up -> show navbar
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  const handleItemClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setShowOverlay(false);
    onMenuClick?.(false);
    navigateTo(href);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const strips = stripRefs.current.filter(Boolean);
    const contents = contentRefs.current.filter(Boolean);

    if (!overlay || !strips.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: "flex", opacity: 1 });
      gsap.killTweensOf([...strips, ...contents]);

      // Initial state: shifted off-screen to the right
      gsap.set(strips, {
        xPercent: 105,
        opacity: 0,
        transformOrigin: "right center",
      });
      gsap.set(contents, { opacity: 0, x: 25 });

      // Staggered slide-in from right
      strips.forEach((strip, i) => {
        const delay = i * staggerDelay + 0.04;
        const tl = gsap.timeline({ delay });

        tl.to(strip, {
          xPercent: 0,
          opacity: 1,
          duration: animationDuration,
          ease: "power4.out",
        });

        if (contents[i]) {
          tl.to(
            contents[i],
            {
              x: 0,
              opacity: 1,
              duration: animationDuration * 0.7,
              ease: "power2.out",
            },
            `-=${animationDuration * 0.65}`,
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...strips, ...contents]);

      gsap.to(contents, {
        opacity: 0,
        x: 15,
        duration: 0.15,
        ease: "power2.in",
      });

      gsap.to(strips, {
        xPercent: 105,
        opacity: 0,
        duration: 0.25,
        ease: "power3.in",
        stagger: 0.03,
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          setShowOverlay(false);
        },
      });
    }
  }, [isMenuOpen, showOverlay, animationDuration, staggerDelay]);

  return (
    <>
      {/* Top Header Row */}
      <nav
        className={cn(
          "top-5 md:top-6 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12 pointer-events-none select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          useFixedPosition ? "fixed" : "absolute",
          !isVisible && !isMenuOpen
            ? "-translate-y-24 opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100",
          className,
        )}
        style={style}
        aria-label="Main navigation"
      >
        {/* Brand Logo Capsule */}
        <a
          href="/"
          onClick={(e) => handleItemClick(e, "/")}
          className="h-11 md:h-12 px-4 md:px-5 inline-flex items-center gap-2.5 transition-all duration-300 cursor-pointer no-underline group pointer-events-auto"
          aria-label="Home"
        >
          <span
            className="text-[1.4rem] uppercase font-bold tracking-wider text-slate-900"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {typeof logo === "string" ? logo : logo || "Harshal Varade"}
          </span>
        </a>

        {/* Toggle Button */}
        <button
          type="button"
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          aria-pressed={isMenuOpen}
          className="w-11 h-11 md:w-12 md:h-12 backdrop-blur-md flex flex-col items-center justify-center gap-1 pointer-events-auto hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
        >
          <span
            className={cn(
              "w-4 h-0.5 bg-slate-900 rounded-full transition-all duration-300 origin-center",
              isMenuOpen && "translate-y-1.5 rotate-45 bg-slate-950",
            )}
          />
          <span
            className={cn(
              "w-2.5 group-hover:w-4 h-0.5 bg-slate-900 rounded-full transition-all duration-300 origin-center",
              isMenuOpen && "w-4 -translate-y-0 -rotate-45 bg-slate-950",
            )}
          />
        </button>
      </nav>

      {/* Fullscreen Backdrop & Flush Gapless Staircase Strips Overlay */}
      {showOverlay && (
        <div
          ref={overlayRef}
          className={cn(
            "inset-0 z-40 flex flex-col justify-center items-end bg-[#edf5ff]/80 backdrop-blur-xl select-none overflow-hidden isolate",
            useFixedPosition ? "fixed" : "absolute",
          )}
          aria-hidden={!isMenuOpen}
        >
          {/* Right-aligned Flush Strips Container (Zero gap) */}
          <div className="relative z-10 w-full flex flex-col items-end gap-0 py-0 pr-0">
            {menuItems.map((item, idx) => {
              // Progressively larger width reaching 55vw
              const stripWidth =
                typeof window !== "undefined" && window.innerWidth >= 768
                  ? item.widthDesktop || `${35 + idx * 6}vw`
                  : item.widthMobile || `${70 + idx * 10}vw`;

              return (
                <div
                  key={idx}
                  ref={(el) => {
                    if (el) stripRefs.current[idx] = el;
                  }}
                  style={{
                    width: stripWidth,
                    maxWidth: "100%",
                  }}
                  className="flex justify-end"
                >
                  <a
                    role="menuitem"
                    href={item.href}
                    onClick={(e) => handleItemClick(e, item.href)}
                    aria-label={item.ariaLabel || item.label}
                    className={cn(
                      "group w-full flex items-center justify-between px-6 md:px-10 py-6 md:py-8 rounded-none border-t border-l border-r-0 transition-all duration-300 no-underline cursor-pointer overflow-hidden shadow-md",
                      "bg-white/95 text-slate-900 border-[#b7c8de]/85 hover:bg-slate-950 hover:text-white hover:border-slate-950 hover:-translate-x-3 hover:shadow-2xl hover:z-20 backdrop-blur-md z-10",
                      idx === menuItems.length - 1 && "border-b",
                    )}
                  >
                    {/* Content: Index + Title */}
                    <div
                      ref={(el) => {
                        if (el) contentRefs.current[idx] = el;
                      }}
                      className="flex items-center gap-4 md:gap-6"
                    >
                      <div className="flex flex-col">
                        <span
                          className="text-2xl sm:text-3xl md:text-4xl font-light uppercase tracking-tight text-slate-950 group-hover:text-white transition-colors duration-300 whitespace-nowrap"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {item.label}
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
