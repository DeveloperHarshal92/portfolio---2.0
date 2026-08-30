"use client";

import { useState, useRef } from "react";
import{ useGSAP, ScrollTrigger } from "@/libs/gsap";
import InfiniteSpiral from "@/components/InfiniteSpiral";
import TextReveal from "./TextReveal";
import  SKILLS_DATA  from "@/data/skills";



export default function SkillsSpiral() {
  const pinSectionRef = useRef(null);
  const spiralRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSkill = SKILLS_DATA[activeIndex] || SKILLS_DATA[0];

  useGSAP(
    () => {
      if (!pinSectionRef.current) return;

      // Pin the section and drive progress via scroll scrub
      const pinST = ScrollTrigger.create({
        trigger: pinSectionRef.current,
        start: "top top",
        end: "+=2600",
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        onUpdate: (self) => {
          if (spiralRef.current?.setProgress) {
            spiralRef.current.setProgress(self.progress);
          }
        },
      });

      return () => {
        pinST.kill();
      };
    },
    { scope: pinSectionRef },
  );

  return (
    <div
      ref={pinSectionRef}
      className="relative w-full min-h-screen h-screen flex flex-col justify-center items-center overflow-hidden select-none px-4 sm:px-8 md:px-12 lg:px-16"
    >
      {/* 2-PART SPLIT GRID (Widened Left Column for 3D Helix) */}
      <div className="w-full max-w-[1400px] mx-auto h-[88vh] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* =====================================================================
            LEFT COLUMN (PART 1): 3D INFINITE SPIRAL GALLERY (WIDER: 7 COLS)
            ===================================================================== */}
        <div className="lg:col-span-7 h-full flex flex-col justify-center items-center relative">
          <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[650px] flex items-center justify-center">
            <InfiniteSpiral
              ref={spiralRef}
              items={SKILLS_DATA}
              animationMode="all"
              speed={0.35}
              radius={210}
              cardWidth={140}
              cardHeight={140}
              verticalSpacing={75}
              perspective={1150}
              cardRadius={20}
              centerScale={1.3}
              edgeBlur={5}
              cardsPerTurn={6}
              scrollMultiplier={2.0}
              pauseOnHover
              imageFit="cover"
              onActiveChange={(idx) => setActiveIndex(idx)}
            />
          </div>
        </div>

        {/* =====================================================================
            RIGHT COLUMN (PART 2): CURRENT SKILL INFORMATION (5 COLS)
            ===================================================================== */}
        <div className="lg:col-span-5 h-full flex flex-col justify-center">
          <div
            key={activeSkill.id}
            className="p-6 sm:p-8 rounded-3xl flex flex-col gap-6 transition-all duration-300 animate-fadeIn"
          >
            {/* Header / Category */}
            <div className="flex items-center justify-between border-b border-slate-200/70 pb-4">
              <TextReveal splitBy="words">
                <span className="text-3xl sm:text-4xl lg:text-[2.75rem] font-mono font-medium text-slate-900 leading-tight">
                  {activeSkill.category}
                </span>
              </TextReveal>
            </div>

            {/* Skill Title & Tagline */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3 ">
                <img
                  src={activeSkill.src}
                  alt={activeSkill.name}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-sm"
                />
                <TextReveal splitBy="words">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-slate-950">
                    {activeSkill.name}
                  </h3>
                </TextReveal>
              </div>
              <TextReveal splitBy="words">
                <p className="text-xs sm:text-sm font-mono text-slate-500 uppercase tracking-wider pl-13">
                  {activeSkill.tagline}
                </p>
              </TextReveal>
            </div>

            {/* Description */}
            <TextReveal splitBy="lines">
              <p className="text-base sm:text-lg font-normal text-slate-600 leading-relaxed mt-2">
                {activeSkill.description}
              </p>
            </TextReveal>

            {/* Key Capabilities / Highlights Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <TextReveal splitBy="words">
                <span className="text-sm font-mono uppercase text-slate-400 mr-1">
                  Core Stack:
                </span>
              </TextReveal>
              {activeSkill.highlights.map((h, i) => (
                <TextReveal key={i} splitBy="words">
                  <span className="px-3 py-1 rounded-full text-xs sm:text-sm font-mono">
                    {h}
                  </span>
                </TextReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
