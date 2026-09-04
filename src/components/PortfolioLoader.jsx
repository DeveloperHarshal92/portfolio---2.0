"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "@/libs/gsap";
import { cn } from "@/libs/utils";
import { revealFromStrips } from "@/hooks/useViewTransition";

// Base size of the iris circle before it's scaled up. Kept small so the
// scale factor (and therefore the transform math) stays simple; the actual
// covering radius is computed at exit time from the real viewport size.
const IRIS_BASE_DIAMETER = 40;

/**
 * Builds a repeating sine-like wave path using cubic-bezier half-periods.
 * Two calls with different amplitude/wavelength/phase, layered and
 * translated at different speeds, produces a true undulating liquid surface.
 */
function buildWavePath({
  amplitude,
  wavelength,
  baseline,
  bottom,
  startX,
  endX,
  phase = 1,
}) {
  let d = `M ${startX},${baseline}`;
  let x = startX;
  let up = phase > 0;
  while (x < endX) {
    const midX = x + wavelength / 4;
    const nextX = x + wavelength / 2;
    const peak = baseline - amplitude;
    const trough = baseline + amplitude;
    d += ` C ${midX},${up ? peak : trough} ${midX},${up ? peak : trough} ${nextX},${baseline}`;
    x = nextX;
    up = !up;
  }
  d += ` L ${endX},${bottom} L ${startX},${bottom} Z`;
  return d;
}

export default function PortfolioLoader({
  onComplete,
  duration = 6,
  label = "Sheryian",
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Determine whether this is the root homepage
  const isHome =
    typeof window !== "undefined"
      ? window.location.pathname === "/" || window.location.pathname === ""
      : !pathname || pathname === "/";

  // Latest pathname/router, read at exit time — NOT effect dependencies.
  // Kept as refs on purpose (see note above the main useEffect below).
  const pathnameRef = useRef(pathname);
  const routerRef = useRef(router);
  useEffect(() => {
    pathnameRef.current = pathname;
    routerRef.current = router;
  }, [pathname, router]);

  const [isDone, setIsDone] = useState(false);
  const [shouldRender, setShouldRender] = useState(isHome);
  const [finePointer, setFinePointer] = useState(false);

  const rawId = useId();
  const clipId = `portfolio-loader-clip-${rawId.replace(/:/g, "")}`;

  const containerRef = useRef(null);
  const wordRef = useRef(null);
  const liquidGroupRef = useRef(null);
  const waveFrontRef = useRef(null);
  const waveBackRef = useRef(null);
  const counterRef = useRef(null);
  const metaRef = useRef(null);
  const dotRef = useRef(null);
  const irisRef = useRef(null);

  const charCount = label?.length || 7;
  const fontSize = Math.min(190, Math.floor(1080 / (charCount * 0.64)));

  const sIndex = useMemo(() => label.toLowerCase().indexOf("y"), [label]);
  const sLetterRef = useRef(null);

  const waveConfig = useMemo(
    () => ({
      front: {
        amplitude: 22,
        wavelength: 260,
        baseline: 30,
        bottom: 320,
        startX: -600,
        endX: 1800,
        phase: 1,
      },
      back: {
        amplitude: 16,
        wavelength: 340,
        baseline: 34,
        bottom: 320,
        startX: -700,
        endX: 1900,
        phase: -1,
      },
    }),
    [],
  );

  const frontPath = useMemo(
    () => buildWavePath(waveConfig.front),
    [waveConfig],
  );
  const backPath = useMemo(() => buildWavePath(waveConfig.back), [waveConfig]);

  useEffect(() => {
    setFinePointer(window.matchMedia?.("(pointer: fine)").matches ?? true);
  }, []);

  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

  // If refreshed or directly landed on a project or subpage (not root "/"),
  // immediately reveal via the strips view transition instead of showing the full loader.
  useIsomorphicLayoutEffect(() => {
    if (!isHome) {
      revealFromStrips(() => {
        onComplete?.();
      });
    }
  }, [isHome]);

  // Main loader timeline for the homepage ("/")
  useEffect(() => {
    if (!containerRef.current || !isHome) return;

    const ctx = gsap.context(() => {
      gsap.set(wordRef.current, { scale: 1 });
      gsap.set(liquidGroupRef.current, { y: 240, willChange: "transform" });
      gsap.set([counterRef.current, metaRef.current], { opacity: 1, y: 0 });
      gsap.set(irisRef.current, { scale: 0 });

      const waveFrontAnim = gsap.to(waveFrontRef.current, {
        x: -waveConfig.front.wavelength,
        repeat: -1,
        duration: 2.4,
        ease: "none",
      });

      const waveBackAnim = gsap.to(waveBackRef.current, {
        x: waveConfig.back.wavelength,
        repeat: -1,
        duration: 3.6,
        ease: "none",
      });

      const progress = { value: 0 };
      const loadingTween = gsap.to(progress, {
        value: 100,
        duration,
        ease: "power2.inOut",
        onUpdate: () => {
          const val = Math.round(progress.value);
          if (counterRef.current) {
            counterRef.current.textContent = `${String(val).padStart(2, "0")}%`;
          }
          if (liquidGroupRef.current) {
            const currentY = gsap.utils.mapRange(0, 100, 240, 35, val);
            gsap.set(liquidGroupRef.current, { y: currentY });
          }
        },
        onComplete: () => {
          // 1. Immediately kill wave tweens before starting the exit sequence
          // so CPU/GPU rasterization overhead of SVG paths inside clipPath is eliminated.
          waveFrontAnim.kill();
          waveBackAnim.kill();

          setIsDone(true);

          // 2. Measure actual rendered pixel position of the "S" glyph
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          let sCenterX_viewport = vw / 2;
          let sCenterY_viewport = vh / 2;
          let originX_px = 0;
          let originY_px = 0;

          const wordEl = wordRef.current;
          const sEl = sLetterRef.current;

          if (wordEl) {
            const wordRect = wordEl.getBoundingClientRect();
            if (sEl) {
              const sRect = sEl.getBoundingClientRect();
              sCenterX_viewport = sRect.left + sRect.width / 2;
              sCenterY_viewport = sRect.top + sRect.height / 2;
            } else {
              sCenterX_viewport = wordRect.left + wordRect.width / 2;
              sCenterY_viewport = wordRect.top + wordRect.height / 2;
            }
            originX_px = sCenterX_viewport - wordRect.left;
            originY_px = sCenterY_viewport - wordRect.top;
          }

          const coverRadius = Math.max(
            Math.hypot(sCenterX_viewport, sCenterY_viewport),
            Math.hypot(vw - sCenterX_viewport, sCenterY_viewport),
            Math.hypot(sCenterX_viewport, vh - sCenterY_viewport),
            Math.hypot(vw - sCenterX_viewport, vh - sCenterY_viewport),
          );
          const irisScale = (coverRadius * 2.05) / IRIS_BASE_DIAMETER;

          if (wordEl) {
            gsap.set(wordEl, {
              transformOrigin: `${originX_px}px ${originY_px}px`,
            });
          }

          gsap.set(irisRef.current, {
            left: sCenterX_viewport,
            top: sCenterY_viewport,
            scale: 0,
          });

          const exitTl = gsap.timeline({ defaults: { overwrite: "auto" } });

          // 1. Telemetry & cursor fade
          exitTl.to(
            [counterRef.current, metaRef.current, dotRef.current],
            { opacity: 0, y: 8, duration: 0.18, ease: "power2.out" },
            0,
          );

          // 2. Zoom toward "S". Scale kept at 14 to avoid compositor thrashing.
          exitTl.to(
            wordRef.current,
            { scale: 14, duration: 0.75, ease: "power3.in" },
            0.05,
          );

          // 3. Iris scales up from the exact measured "S" coordinates to fill screen with black.
          exitTl.to(
            irisRef.current,
            { scale: irisScale, duration: 0.55, ease: "power2.in" },
            0.3,
          );

          // 4. Reveal main page via strips
          exitTl.call(() => {
            revealFromStrips(() => {
              onComplete?.();
            });

            setShouldRender(false);
          });
        },
      });

      return () => {
        loadingTween.kill();
        waveFrontAnim.kill();
        waveBackAnim.kill();
      };
    }, containerRef.current || undefined);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, onComplete, waveConfig, label]);

  // Trailing mouse-follower
  useEffect(() => {
    if (!finePointer || !shouldRender) return;

    const real = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const eased = { ...real };

    const handleMove = (e) => {
      real.x = e.clientX;
      real.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMove);

    const tick = () => {
      eased.x += (real.x - eased.x) * 0.14;
      eased.y += (real.y - eased.y) * 0.14;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${eased.x - 6}px, ${eased.y - 6}px, 0)`;
      }
    };
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      gsap.ticker.remove(tick);
    };
  }, [finePointer, shouldRender]);

  if (!shouldRender || !isHome) return null;

  return (
    <aside
      ref={containerRef}
      aria-label="Portfolio loading screen"
      aria-busy={!isDone}
      className={cn(
        "fixed inset-0 z-[99999] min-h-[100dvh] w-full overflow-hidden",
        "flex items-center justify-center select-none",
        "bg-[#f5f4ef]",
        isDone ? "pointer-events-none" : "pointer-events-auto",
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.98),rgba(245,244,239,0.78)_50%,rgba(238,237,231,0.95)_100%)]"
      />

      <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 sm:px-6">
        <div
          ref={wordRef}
          className="relative w-full max-w-5xl flex items-center justify-center select-none"
          style={{
            willChange: "transform",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <svg
            viewBox="0 0 1200 300"
            className={cn(
              "w-full h-auto overflow-visible select-none",
              // Filter is only applied at rest — dropped the instant the
              // exit zoom starts, since a filtered element scaled 14x is
              // what was actually causing the frame drops.
              !isDone && "drop-shadow-sm",
            )}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <clipPath id={clipId}>
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="font-black uppercase select-none"
                  style={{
                    fontSize: `${fontSize}px`,
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    letterSpacing: "-0.065em",
                    fontWeight: 900,
                  }}
                >
                  {label}
                </text>
              </clipPath>
            </defs>

            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#d7d6d0"
              className="font-black uppercase select-none"
              style={{
                fontSize: `${fontSize}px`,
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                letterSpacing: "-0.065em",
                fontWeight: 900,
              }}
            >
              {label.split("").map((char, i) =>
                i === sIndex ? (
                  <tspan key={i} ref={sLetterRef}>
                    {char}
                  </tspan>
                ) : (
                  <React.Fragment key={i}>{char}</React.Fragment>
                ),
              )}
            </text>

            <g clipPath={`url(#${clipId})`}>
              <g ref={liquidGroupRef}>
                <g ref={waveBackRef}>
                  <path d={backPath} fill="#0a0d12" opacity="0.38" />
                </g>
                <g ref={waveFrontRef}>
                  <path d={frontPath} fill="#0a0d12" />
                </g>
              </g>
            </g>
          </svg>

          <div
            ref={metaRef}
            className="absolute bottom-1 right-2 sm:bottom-2 sm:right-6 flex items-baseline gap-2 select-none"
          >
            <span className="text-[10px] font-medium lowercase tracking-[-0.01em] text-[#777771] sm:text-xs">
              loading...
            </span>
            <span
              ref={counterRef}
              className="min-w-[42px] text-right font-mono text-[11px] font-semibold tabular-nums text-[#222220] sm:text-xs"
            >
              00%
            </span>
          </div>
        </div>
      </div>

      {/* Iris — a small circle, positioned once at the exact measured "S" coordinates,
          scaling up smoothly on the GPU. */}
      <div
        ref={irisRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-20 rounded-full bg-[#0a0d12]"
        style={{
          width: IRIS_BASE_DIAMETER,
          height: IRIS_BASE_DIAMETER,
          marginLeft: -IRIS_BASE_DIAMETER / 2,
          marginTop: -IRIS_BASE_DIAMETER / 2,
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      />

      {finePointer && (
        <div
          ref={dotRef}
          aria-hidden="true"
          className="fixed top-0 left-0 z-[100000] h-3 w-3 rounded-full bg-[#0a0d12] mix-blend-difference pointer-events-none"
        />
      )}
    </aside>
  );
}
