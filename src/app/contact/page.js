"use client";

import React, { useRef, useState } from "react";
import gsap, { useGSAP } from "@/libs/gsap";
import TextReveal from "@/components/TextReveal";
import { ArrowUpRight } from "lucide-react";

const ENGAGEMENT_TYPES = [
  "Full-time role",
  "Contract",
  "Project inquiry",
  "Something else",
];

export function ContactSection() {
  const containerRef = useRef(null);
  const [engagement, setEngagement] = useState(ENGAGEMENT_TYPES[0]);

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current.querySelectorAll("[data-fade]"),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1 },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative h-screen w-full bg-[#edf5ff] text-[#0a0d12] flex flex-col justify-center overflow-hidden"
    >
      <div className="w-full px-6 sm:px-10 lg:px-16">
        <TextReveal splitBy="words">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight mb-3">
            Let's talk
          </h2>
        </TextReveal>
        <p
          data-fade
          className="text-slate-600 max-w-md text-base md:text-[1.05rem] leading-relaxed mb-10 lg:mb-12"
        >
          Open to full-time roles and select contract work. If something
          here fits, send a message — I read everything myself.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: direct info */}
          <div data-fade className="lg:col-span-4 flex flex-col gap-7">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-slate-500">Email</span>
              <a
                href="mailto:developer.ever@gmail.com"
                className="text-base hover:underline underline-offset-4"
              >
                developer.ever@gmail.com
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-slate-500">Phone</span>
              <a href="tel:+919834681815" className="text-base hover:underline underline-offset-4">
                +91 98346 81815
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-slate-500">Based in</span>
              <span className="text-base">Pune, Maharashtra, India</span>
            </div>
            <div className="flex gap-5 pt-2 border-t border-[#b7c8de]/70">
              <a href="https://github.com/DeveloperHarshal92" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-700 hover:text-slate-950 hover:underline underline-offset-4">
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/harshal-varade-07945a3a3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-700 hover:text-slate-950 hover:underline underline-offset-4"
              >
                LinkedIn
              </a>
              <a
                href="https://docs.google.com/document/d/1bWZFFMI3BcylqzLrPf6MVyXw6qKXPpXuZm-Df56X2Q8/view"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-700 hover:text-slate-950 hover:underline underline-offset-4"
              >
                Resume
              </a>
            </div>
          </div>

          {/* Right: form */}
          <form
            data-fade
            className="lg:col-span-8 flex flex-col gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-wrap gap-2">
              {ENGAGEMENT_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setEngagement(type)}
                  className={`px-4 py-2 rounded-full text-xs border transition-colors ${
                    engagement === type
                      ? "bg-slate-950 text-white border-slate-950"
                      : "bg-white text-slate-700 border-[#b7c8de] hover:border-slate-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-slate-500">Name</span>
                <input
                  type="text"
                  required
                  className="bg-white border border-[#b7c8de] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-slate-500">Email</span>
                <input
                  type="email"
                  required
                  className="bg-white border border-[#b7c8de] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-slate-500">Message</span>
              <textarea
                required
                rows={4}
                className="bg-white border border-[#b7c8de] rounded-lg px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </label>

            <button
              type="submit"
              className="self-start inline-flex items-center gap-2 px-7 py-3 rounded-full bg-slate-950 text-white font-mono text-xs uppercase tracking-wider hover:bg-slate-800 active:scale-[0.98] transition-all shadow-sm"
            >
              <span>Send message</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <main className="relative h-screen w-full bg-[#edf5ff] overflow-hidden">
      <ContactSection />
    </main>
  );
}