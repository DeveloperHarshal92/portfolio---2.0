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
      className="relative min-h-screen lg:h-screen w-full bg-[#edf5ff] dark:bg-[#07090e] text-[#0a0d12] dark:text-[#f1f5f9] flex flex-col justify-center py-20 lg:py-0 overflow-y-auto lg:overflow-hidden transition-colors duration-400"
    >
      <div className="w-full px-6 sm:px-10 lg:px-16">
        <TextReveal splitBy="words">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight mb-3 text-slate-950 dark:text-slate-50 transition-colors">
            Let's talk
          </h2>
        </TextReveal>
        <p
          data-fade
          className="text-slate-600 dark:text-slate-300 max-w-md text-base md:text-[1.05rem] leading-relaxed mb-10 lg:mb-12 transition-colors"
        >
          Open to full-time roles and select contract work. If something
          here fits, send a message — I read everything myself.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: form */}
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
                  className={`px-4 py-2 rounded-full text-xs border transition-colors cursor-pointer ${
                    engagement === type
                      ? "bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-slate-950 dark:border-white font-medium"
                      : "bg-white dark:bg-[#0f1626] text-slate-700 dark:text-slate-300 border-[#b7c8de] dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-slate-500 dark:text-slate-400">Name</span>
                <input
                  type="text"
                  required
                  className="bg-white dark:bg-[#0f1626] border border-[#b7c8de] dark:border-white/15 text-slate-900 dark:text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-sky-500/40 transition-colors"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-slate-500 dark:text-slate-400">Email</span>
                <input
                  type="email"
                  required
                  className="bg-white dark:bg-[#0f1626] border border-[#b7c8de] dark:border-white/15 text-slate-900 dark:text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-sky-500/40 transition-colors"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-slate-500 dark:text-slate-400">Message</span>
              <textarea
                required
                rows={4}
                className="bg-white dark:bg-[#0f1626] border border-[#b7c8de] dark:border-white/15 text-slate-900 dark:text-slate-100 rounded-lg px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-sky-500/40 transition-colors"
              />
            </label>

            <button
              type="submit"
              className="self-start inline-flex items-center gap-2 px-7 py-3 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-mono text-xs uppercase tracking-wider hover:bg-slate-800 dark:hover:bg-slate-200 active:scale-[0.98] transition-all shadow-sm cursor-pointer"
            >
              <span>Send message</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
            </button>
          </form>

          {/* Right: direct info */}
          <div data-fade className="lg:col-span-4 flex flex-col gap-7">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-slate-500 dark:text-slate-400">Email</span>
              <a
                href="mailto:developer.ever@gmail.com"
                className="text-base text-slate-900 dark:text-slate-100 hover:underline underline-offset-4"
              >
                developer.ever@gmail.com
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-slate-500 dark:text-slate-400">Phone</span>
              <a
                href="tel:+919834681815"
                className="text-base text-slate-900 dark:text-slate-100 hover:underline underline-offset-4"
              >
                +91 98346 81815
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-slate-500 dark:text-slate-400">Based in</span>
              <span className="text-base text-slate-900 dark:text-slate-100">Pune, Maharashtra, India</span>
            </div>
            <div className="flex gap-5 pt-2 border-t border-[#b7c8de]/70 dark:border-white/10">
              <a
                href="https://github.com/DeveloperHarshal92"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/harshal-varade-07945a3a3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://docs.google.com/document/d/1bWZFFMI3BcylqzLrPf6MVyXw6qKXPpXuZm-Df56X2Q8/view"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <main className="relative h-screen w-full bg-[#edf5ff] dark:bg-[#07090e] text-[#0a0d12] dark:text-[#f1f5f9] overflow-hidden transition-colors duration-400">
      <ContactSection />
    </main>
  );
}