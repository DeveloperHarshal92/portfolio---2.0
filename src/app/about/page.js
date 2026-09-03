"use client";

import React, { useRef } from "react";
import gsap, { useGSAP } from "@/libs/gsap";
import TextReveal from "@/components/TextReveal";
import { ArrowUpRight } from "lucide-react";
import Lanyard from "@/components/Lanyard";
import SkillsSpiral from "@/components/SkillsSpiral";
import useViewTransition from "@/hooks/useViewTransition";

export function AboutSection({ showCta = false }) {
  const { navigateTo } = useViewTransition();
  const containerRef = useRef(null);
  const paragraphsRef = useRef(null);

  // Subtle editorial paragraph entrance
  useGSAP(
    () => {
      if (!paragraphsRef.current) return;
      gsap.fromTo(
        paragraphsRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.14,
          duration: 0.85,
          ease: "power3.out",
          delay: 0.3,
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#edf5ff] text-[#0a0d12] py-16 lg:py-24 select-none overflow-x-hidden flex flex-col justify-center"
    >
      {/* Full-width container: zero extra side padding restrictions */}
      <div className="relative w-full px-6 sm:px-10 lg:px-16 mb-20 lg:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div
              ref={paragraphsRef}
              className="flex flex-col gap-5 text-slate-700 leading-relaxed text-base md:text-[1.05rem]"
            >
              <p>
                I'm <strong>Harshal Varade</strong>, a full-stack engineer based
                in Pune, India. I build production-grade applications in
                JavaScript and TypeScript, and I care as much about the system
                underneath as the interface on top.
              </p>

              <p>
                On the backend: Node.js and Express services backed by MongoDB,
                with hardened JWT authentication, role-based access control, and
                real-time features over Socket.IO. Payments run through
                Razorpay.
              </p>

              <p>
                I also build AI-augmented tools — a search engine that
                coordinates multiple LLM providers through LangChain, and Smart
                Trolly, a retail billing system using ONNX Runtime for in-aisle
                recommendations.
              </p>

              <p>
                My frontend work is React 19, Next.js, and GSAP — shaped by
                internships at Mass IT Solutions and Cognifyz Technologies.
              </p>
            </div>

            {/* Minimalist Action & Contact Row */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#b7c8de]/70">
              <a
                href="#project"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 text-white font-mono text-xs uppercase tracking-wider hover:bg-slate-800 active:scale-[0.98] transition-all shadow-sm group"
              >
                <span>View Selected Work</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 border border-[#b7c8de] font-mono text-xs uppercase tracking-wider hover:bg-slate-50 active:scale-[0.98] transition-all shadow-sm"
              >
                <span>Initiate Dialogue</span>
              </a>

              <a
                href="https://docs.google.com/document/d/1bWZFFMI3BcylqzLrPf6MVyXw6qKXPpXuZm-Df56X2Q8/edit?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-slate-700 hover:text-slate-950 font-mono text-xs uppercase tracking-wider hover:underline transition-colors ml-auto"
              >
                <span>Curriculum Vitae</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Right Column: 3D Realistic ID Card Lanyard - Aligned Vertically with Narrative */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <Lanyard
              strapLength={0.6}
              frontImage="/images/harshal-portrait.png"
              position={[0, 0, 21]}
              gravity={[0, -35, 0]}
              fov={21}
              lanyardWidth={0.85}
              className="w-full h-[540px] lg:h-[640px]"
            />
          </div>
        </div>
      </div>

      {/* =========================================================================
          TECHNICAL CAPABILITIES HELIX (PINNED 3D SCROLL SECTION)
          ========================================================================= */}
      <div>
        <div className="flex flex-col items-center text-center gap-2 px-6 pointer-events-none mb-12">
          <TextReveal splitBy="words">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-950">
              Technical Stack & Capabilities
            </h3>
          </TextReveal>
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            Interactive 3D Spiral Helix
          </p>
        </div>

        <SkillsSpiral />
      </div>

      {/* =========================================================================
          OPTIONAL BOTTOM CTA (FOR STANDALONE ABOUT PAGE)
          ========================================================================= */}
      {showCta && (
        <div className="relative max-w-7xl mx-auto px-6 md:px-16 mt-16 lg:mt-24">
          <div className="flex flex-col items-center text-center gap-5 py-12 border-t border-[#b7c8de]/60">
            <TextReveal delay="0.1" splitBy="words">
              <h3 className="text-3xl sm:text-4xl font-normal tracking-tight text-slate-950">
                Ready to Build What Comes Next?
              </h3>
            </TextReveal>
            <p className="text-slate-600 max-w-lg text-sm md:text-base leading-relaxed">
              Open for software engineering roles, full-stack architectural
              contracts, and creative frontend collaborations.
            </p>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/contact");
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-950 text-white font-mono text-xs uppercase tracking-wider hover:bg-slate-800 active:scale-[0.98] transition-all shadow-md cursor-pointer"
            >
              <span>Initiate Dialogue</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#edf5ff]">
      <AboutSection showCta={true} />
    </main>
  );
}
