"use client";

import { useState, useRef, useCallback } from "react";
import{ useGSAP, ScrollTrigger } from "@/libs/gsap";
import InfiniteSpiral from "@/components/InfiniteSpiral";
import TextReveal from "./TextReveal";
import  SKILLS_DATA  from "@/data/skills";



export default function SkillsSpiral() {
  const pinSectionRef = useRef(null);
  const spiralRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSkill = SKILLS_DATA[activeIndex] || SKILLS_DATA[0];

  const handleActiveChange = useCallback((idx) => {
    setActiveIndex(idx);
  }, []);

  useGSAP(
    () => {
      if (!pinSectionRef.current) return;

      // Pin the section and drive progress via scroll scrub ONLY on desktop screens (>= 1024px)
      const mm = ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function () {
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
          return () => pinST.kill();
        },
      });

      return () => mm.revert();
    },
    { scope: pinSectionRef },
  );

  return (
    <div
      ref={pinSectionRef}
      className="relative w-full min-h-screen lg:h-screen flex flex-col justify-center items-center overflow-visible lg:overflow-hidden select-none px-4 sm:px-8 md:px-12 lg:px-16 py-10 lg:py-0"
    >
      {/* 2-PART SPLIT GRID (Widened Left Column for 3D Helix) */}
      <div className="w-full max-w-[1400px] mx-auto h-auto lg:h-[88vh] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* =====================================================================
            LEFT COLUMN (PART 1): 3D INFINITE SPIRAL GALLERY (DESKTOP ONLY)
            ===================================================================== */}
        <div className="hidden lg:flex lg:col-span-7 h-full flex-col justify-center items-center relative">
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
              onActiveChange={handleActiveChange}
            />
          </div>
        </div>

        {/* =====================================================================
            RIGHT COLUMN (PART 2): CURRENT SKILL INFORMATION (FULL WIDTH ON MOBILE)
            ===================================================================== */}
        <div className="w-full lg:col-span-5 h-auto lg:h-full flex flex-col justify-center">
          {/* MOBILE SKILLS SELECTOR / HORIZONTAL CHIP TABS */}
          <div className="lg:hidden w-full flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-4 -mx-1 px-1">
            {SKILLS_DATA.map((skill, index) => {
              const isSelected = index === activeIndex;
              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-slate-950 dark:border-white shadow-md font-semibold scale-[1.02]"
                      : "bg-white/80 dark:bg-[#0c121e]/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20"
                  }`}
                >
                  <img
                    src={skill.src}
                    alt={skill.name}
                    loading="lazy"
                    decoding="async"
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>{skill.name}</span>
                </button>
              );
            })}
          </div>

          <div
            className="p-6 sm:p-8 rounded-3xl flex flex-col gap-6 transition-all duration-300 backdrop-blur-md"
          >
            {/* Header / Category */}
            <div className="flex items-center justify-between border-b border-slate-200/70 dark:border-white/10 pb-4">
              <span className="text-2xl sm:text-3xl lg:text-[2.75rem] font-mono font-medium text-slate-900 dark:text-slate-100 leading-tight transition-colors">
                {activeSkill.category}
              </span>
              <span className="text-xs font-mono text-slate-400 dark:text-slate-500 lg:hidden">
                0{activeIndex + 1} / 0{SKILLS_DATA.length}
              </span>
            </div>

            {/* Skill Title & Tagline */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3 ">
                <img
                  src={activeSkill.src}
                  alt={activeSkill.name}
                  loading="lazy"
                  decoding="async"
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-white/15 shadow-sm"
                />
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-slate-950 dark:text-slate-50 transition-colors">
                  {activeSkill.name}
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-13 transition-colors">
                {activeSkill.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg font-normal text-slate-600 dark:text-slate-300 leading-relaxed mt-2 transition-colors">
              {activeSkill.description}
            </p>

            {/* Key Capabilities / Highlights Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-sm font-mono uppercase text-slate-400 dark:text-slate-500 mr-1">
                Core Stack:
              </span>
              {activeSkill.highlights.map((h, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 transition-colors"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
