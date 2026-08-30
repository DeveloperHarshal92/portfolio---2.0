"use client";

import React, { useRef } from "react";
import gsap, { useGSAP } from "@/libs/gsap";
import TextReveal from "@/components/TextReveal";
import {
  ArrowUpRight,
  Code2,
  Sparkles,
  Compass,
  Layers,
  Cpu,
} from "lucide-react";
import Lanyard from "@/components/Lanyard";
import SkillsSpiral from "@/components/SkillsSpiral";

export default function AboutPage() {
  const containerRef = useRef(null);
  const statsRef = useRef(null);
  const bioCardsRef = useRef(null);

  // GSAP Entrance Animations
  useGSAP(
    () => {
      // Metric numbers animation
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.4,
          },
        );
      }

      // Bio and Pillars stagger
      if (bioCardsRef.current) {
        gsap.fromTo(
          bioCardsRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bioCardsRef.current,
              start: "top 80%",
            },
          },
        );
      }
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#edf5ff] text-[#0a0d12] pt-[8rem] pb-[6rem] select-none overflow-x-hidden"
    >
      {/* =========================================================================
          HERO / INTRODUCTION ROW WITH 3D LANYARD BADGE (IN CONTAINER)
          ========================================================================= */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-16 mb-16 lg:mb-24">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Roles & Introduction */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Kinetic Main Headline */}
            <div className="flex flex-col">
              <TextReveal delay="0.2" splitBy="words">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-slate-950">
                  Engineering Systems with Kinetic Craft.
                </h1>
              </TextReveal>
            </div>

            {/* Editorial Lead Paragraph */}
            <TextReveal delay="0.4" splitBy="words">
              <p className="text-lg md:text-xl font-normal text-slate-600 leading-relaxed max-w-2xl">
                I am Harshal Varade - a full-stack engineer and creative
                developer designing architectures where the infrastructure
                beneath is as considered as the tactile motion on top.
              </p>
            </TextReveal>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/project"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-950 text-white font-mono text-xs uppercase tracking-wider shadow-lg hover:bg-slate-800 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>View Selected Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-slate-900 border border-[#b7c8de] font-mono text-xs uppercase tracking-wider shadow-sm hover:bg-slate-50 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Initiate Dialogue</span>
              </a>
            </div>
          </div>

          {/* Right Column: Only Lanyard 3D Physics Component */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <Lanyard
              frontImage="/images/harshal-portrait.png"
              position={[0, 0, 24]}
              gravity={[0, -35, 0]}
              fov={20}
              lanyardWidth={0.8}
              className="w-full h-[520px] lg:h-[620px]"
            />
          </div>
        </section>
      </div>
      <section>
        <div className="flex flex-col items-center text-center gap-2 px-6 pointer-events-none mb-16">
          <TextReveal splitBy="words">
            <h2 className="text-4xl sm:text-5xl md:text-5xl font-medium tracking-tight text-slate-950">
              Services
            </h2>
          </TextReveal>
        </div>

        {/* =========================================================================
          INFINITE SPIRAL PINNED SCROLL SECTION (FULL WIDTH - NO CONTAINER)
          ========================================================================= */}
        <SkillsSpiral />
      </section>

      {/* =========================================================================
          BOTTOM CONTACT / COLLABORATION CTA (IN CONTAINER)
          ========================================================================= */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-16 mt-16 lg:mt-24">
        <section className="flex flex-col items-center text-center gap-6 py-12 border-t border-[#b7c8de]/60">
          <TextReveal delay="0.1" splitBy="words">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-slate-950">
              Ready to Build What Comes Next?
            </h3>
          </TextReveal>
          <p className="text-slate-600 max-w-xl text-base">
            Open for software engineering roles, full-stack architectural
            contracts, and creative frontend explorations.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-950 text-white font-mono text-xs uppercase tracking-widest shadow-lg hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1"
          >
            <span>Initiate Dialogue</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </section>
      </div>
    </main>
  );
}
