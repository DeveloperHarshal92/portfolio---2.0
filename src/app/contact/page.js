"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import gsap, { useGSAP } from "@/libs/gsap";
import TextReveal from "@/components/TextReveal";
import {
  Mail,
  Send,
  Copy,
  Check,
  MapPin,
  Clock,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
} from "lucide-react";

// Inline Brand Icons
const Icons = {
  github: (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  linkedin: (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
};

const PROJECT_SCOPES = [
  "Full-Stack Web App",
  "Creative Motion UI",
  "Freelance / Contract",
  "Full-Time Role",
  "Other Inquiry",
];

export default function ContactPage() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    scope: "Full-Stack Web App",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailAddress = "developerever@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  // GSAP Entrance Animations
  useGSAP(
    () => {
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -40, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.15,
        },
      );

      gsap.fromTo(
        rightColRef.current,
        { opacity: 0, x: 40, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.25,
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#edf5ff] text-[#0a0d12] pt-[7rem] sm:pt-[8rem] pb-[5rem] px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden select-none"
    >
      <div className="relative max-w-7xl mx-auto flex flex-col gap-10 lg:gap-14">
        {/* =========================================================================
            HEADER TITLE
            ========================================================================= */}
        <section className="flex flex-col gap-4 max-w-3xl">
          <TextReveal delay="0.1" splitBy="words">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-slate-950">
              Let&apos;s build something <br />
              <span className="font-serif italic font-light text-slate-800">
                extraordinary.
              </span>
            </h1>
          </TextReveal>

          <TextReveal delay="0.25" splitBy="lines">
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
              Whether you need a high-performance web platform, interactive
              motion interface, or want to discuss full-stack engineering
              opportunities — my inbox is always open.
            </p>
          </TextReveal>
        </section>

        {/* =========================================================================
            2-COLUMN REDESIGN: LEFT PORTRAIT & DETAILS | RIGHT CONTACT TERMINAL
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* =====================================================================
              LEFT COLUMN: EDITORIAL PORTRAIT & PROFILE HUB (5 COLS)
              ===================================================================== */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 flex flex-col gap-5 h-full"
          >
            {/* Portrait Card */}
            <div className="relative group rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col min-h-[460px] sm:min-h-[520px] lg:min-h-[560px]">
              <Image
                src="/images/harshal-contact.jpg"
                alt="Harshal Varade"
                fill
                priority
                className="object-cover object-top filter grayscale contrast-110 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              {/* Bottom Card Content */}
              <div className="relative z-10 mt-auto p-6 sm:p-8 flex flex-col gap-4 text-white">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
                    Harshal Varade
                  </h2>
                  <p className="text-sm font-mono text-slate-300 mt-1">
                    Full-Stack Developer
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-400 border-t border-white/10 pt-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-300" />
                    <span>Pune, Maharashtra, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links & Email Strip */}
            <div className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-10 w-full sm:w-auto">
                <a
                  href="https://github.com/DeveloperHarshal92"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100/90 hover:bg-slate-200/90 text-slate-800 text-xs font-mono transition-all group"
                >
                  {Icons.github}
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://www.linkedin.com/in/harshal-varade-07945a3a3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-sky-50/80 hover:bg-sky-100 text-sky-800 text-xs font-mono transition-all group"
                >
                  {Icons.linkedin}
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-sky-400 group-hover:text-sky-800 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
              <button
                onClick={handleCopyEmail}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-950 text-white hover:bg-slate-800 text-xs font-mono transition-all cursor-pointer shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* =====================================================================
              RIGHT COLUMN: INTERACTIVE DISPATCH TERMINAL (7 COLS)
              ===================================================================== */}
          <div ref={rightColRef} className="lg:col-span-7 flex flex-col h-full">
            <div className="h-full p-6 sm:p-10 rounded-3xl bg-white/90 border border-[#b7c8de]/80 shadow-xl shadow-slate-300/40 backdrop-blur-xl flex flex-col justify-between">
              {submitted ? (
                <div className="py-20 flex flex-col items-center justify-center text-center gap-4 animate-in fade-in zoom-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-medium text-slate-950">
                    Dispatch Transmitted
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md leading-relaxed">
                    Thank you for reaching out, {formState.name || "friend"}.
                    Your message has been received and I will follow up
                    promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: "",
                        email: "",
                        scope: "Full-Stack Web App",
                        message: "",
                      });
                    }}
                    className="mt-4 px-6 py-3 rounded-full bg-slate-950 text-white font-mono text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6 h-full justify-between"
                >
                  <div className="flex flex-col gap-6">
                    {/* Header line */}
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-sky-600" />
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-700">
                          Direct Communication
                        </span>
                      </div>
                      <a
                        href={`mailto:${emailAddress}`}
                        className="text-xs font-mono text-slate-500 hover:text-sky-600 transition-colors"
                      >
                        {emailAddress}
                      </a>
                    </div>

                    {/* Scope Selector Pills */}
                    <div className="flex flex-col gap-2.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-600">
                        Project Scope / Inquiry
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {PROJECT_SCOPES.map((scope) => (
                          <button
                            type="button"
                            key={scope}
                            onClick={() =>
                              setFormState({ ...formState, scope })
                            }
                            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                              formState.scope === scope
                                ? "bg-slate-950 text-white shadow-sm"
                                : "bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/50"
                            }`}
                          >
                            {scope}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Inputs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono uppercase tracking-wider text-slate-600">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Morgan"
                          value={formState.name}
                          onChange={(e) =>
                            setFormState({ ...formState, name: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-[#b7c8de]/70 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all placeholder:text-slate-400"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono uppercase tracking-wider text-slate-600">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@domain.com"
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              email: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-[#b7c8de]/70 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-600">
                        Message / Details *
                      </label>
                      <textarea
                        required
                        rows={6}
                        placeholder="Tell me about your project, timeline, deliverables, or team..."
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            message: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-[#b7c8de]/70 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all placeholder:text-slate-400 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-slate-950 text-white font-mono text-xs uppercase tracking-widest shadow-lg hover:bg-sky-600 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
                    >
                      {loading ? (
                        <span className="animate-pulse">Transmitting...</span>
                      ) : (
                        <>
                          <span>Send Transmission</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
