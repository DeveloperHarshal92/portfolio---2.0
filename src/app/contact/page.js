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
  Phone,
  ArrowUpRight,
  FileText,
  Terminal,
} from "lucide-react";

// Inline Brand SVGs
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
  "Full-Time Role",
  "Contract / Architecture",
  "General Inquiry",
];

export function ContactSection() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    scope: "Full-Stack Web App",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailAddress = "developer.ever@gmail.com";
  const phoneNumber = "+91 9834681815";
  const resumeUrl =
    "https://docs.google.com/document/d/1bWZFFMI3BcylqzLrPf6MVyXw6qKXPpXuZm-Df56X2Q8/edit?usp=drive_link";

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
    }, 900);
  };

  // Entrance animation for content
  useGSAP(
    () => {
      if (!contentRef.current) return;
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#edf5ff] text-[#0a0d12] py-20 lg:py-28 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden select-none flex flex-col justify-center"
    >

      {/* =========================================================================
          FOREGROUND CONTENT WRAPPER
          ========================================================================= */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-12 lg:gap-16"
      >
        {/* =======================================================================
            HEADER: INDUSTRIAL BRUTALIST TELEMETRY & HERO HEADLINE
            ======================================================================= */}
        <div className="flex flex-col gap-5 max-w-3xl">

          <TextReveal delay="0.1" splitBy="words">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-slate-950">
              Let&apos;s architect what comes next.
            </h1>
          </TextReveal>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
            Open for full-stack engineering roles, technical architecture contracts,
            and creative frontend collaborations. Drop a direct transmission or connect
            via the channels below.
          </p>
        </div>

        {/* =======================================================================
            SWITCHED DUAL-PANEL LAYOUT:
            LEFT (7 COLS): INTERACTIVE DISPATCH TERMINAL
            RIGHT (5 COLS): DIRECT CHANNELS & RESUME STATION
            ======================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* =====================================================================
              LEFT PANEL: DISPATCH CONSOLE (7 COLS)
              ===================================================================== */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Double-Bezel Shell */}
            <div className="p-2 sm:p-2.5 rounded-[2rem] bg-black/5 ring-1 ring-black/5 border border-white/40 shadow-xl backdrop-blur-2xl">
              <div className="p-6 sm:p-9 rounded-[calc(2rem-0.625rem)] bg-white/85 border border-[#b7c8de]/70 shadow-sm flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-[#b7c8de]/60 pb-4">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-slate-700" />
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-800">
                      Transmission Terminal
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    P2P Secure Channel
                  </span>
                </div>

                {submitted ? (
                  <div className="py-16 flex flex-col items-center justify-center text-center gap-4 animate-in fade-in zoom-in duration-500">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
                      <Check className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-medium text-slate-950">
                      Transmission Received
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md leading-relaxed">
                      Thank you, {formState.name || "friend"}. Your dispatch has been logged
                      and I will follow up promptly.
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
                      className="mt-4 px-6 py-2.5 rounded-full bg-slate-950 text-white font-mono text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors"
                    >
                      Send Another Dispatch
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Scope Selector */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono text-slate-600 uppercase tracking-wider">
                        Engagement Scope
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {PROJECT_SCOPES.map((scope) => (
                          <button
                            key={scope}
                            type="button"
                            onClick={() =>
                              setFormState((prev) => ({ ...prev, scope }))
                            }
                            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                              formState.scope === scope
                                ? "bg-slate-950 text-white shadow-sm"
                                : "bg-slate-100/90 text-slate-700 hover:bg-slate-200/80"
                            }`}
                          >
                            {scope}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Inputs Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono text-slate-600 uppercase tracking-wider">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) =>
                            setFormState({ ...formState, name: e.target.value })
                          }
                          placeholder="Your Name"
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#b7c8de] text-slate-950 text-sm font-mono placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950 transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono text-slate-600 uppercase tracking-wider">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({ ...formState, email: e.target.value })
                          }
                          placeholder="your.email@domain.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#b7c8de] text-slate-950 text-sm font-mono placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950 transition-all"
                        />
                      </div>
                    </div>

                    {/* Message Box */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-slate-600 uppercase tracking-wider">
                        Transmission Brief *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({ ...formState, message: e.target.value })
                        }
                        placeholder="Project overview, engineering requirements, or inquiry..."
                        className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#b7c8de] text-slate-950 text-sm font-mono placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950 transition-all resize-none"
                      />
                    </div>

                    {/* Button-in-Button CTA */}
                    <div className="pt-2 flex justify-start">
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-4 pl-7 pr-3 py-2.5 rounded-full bg-slate-950 text-white font-mono text-xs uppercase tracking-wider shadow-lg hover:bg-slate-800 active:scale-[0.98] transition-all duration-300 group cursor-pointer disabled:opacity-50"
                      >
                        <span>{loading ? "Transmitting..." : "Transmit Dispatch"}</span>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                          <Send className="w-3.5 h-3.5 text-white" />
                        </div>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* =====================================================================
              RIGHT PANEL: DIRECT CHANNELS & RESUME (5 COLS)
              ===================================================================== */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Direct Connect Hub Card */}
            <div className="p-2 sm:p-2.5 rounded-[2rem] bg-black/5 ring-1 ring-black/5 border border-white/40 shadow-xl backdrop-blur-2xl">
              <div className="p-6 sm:p-8 rounded-[calc(2rem-0.625rem)] bg-white/85 border border-[#b7c8de]/70 shadow-sm flex flex-col gap-6">
                <div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">
                    Direct Wire
                  </span>
                  <h3 className="text-xl font-medium text-slate-950 mt-1">
                    Direct Channels
                  </h3>
                </div>

                <div className="flex flex-col gap-4 font-mono text-xs">
                  {/* Email Channel */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-slate-600" />
                      <a
                        href={`mailto:${emailAddress}`}
                        className="text-slate-900 hover:underline"
                      >
                        {emailAddress}
                      </a>
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      title="Copy Email"
                      className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Phone Channel */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-slate-600" />
                      <a
                        href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
                        className="text-slate-900 hover:underline"
                      >
                        {phoneNumber}
                      </a>
                    </div>
                  </div>

                  {/* Location Coordinate */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80 text-slate-700">
                    <MapPin className="w-4 h-4 text-slate-600" />
                    <span>Pune, Maharashtra, India</span>
                  </div>
                </div>

                {/* Social & Resume Links */}
                <div className="pt-2 border-t border-[#b7c8de]/60 flex flex-col gap-3">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    External Repositories & Credentials
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="https://github.com/DeveloperHarshal92"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between p-3 rounded-xl bg-white border border-[#b7c8de]/70 text-slate-900 text-xs font-mono hover:bg-slate-50 transition-all group shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        {Icons.github}
                        <span>GitHub</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>

                    <a
                      href="https://www.linkedin.com/in/harshal-varade-07945a3a3"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between p-3 rounded-xl bg-white border border-[#b7c8de]/70 text-slate-900 text-xs font-mono hover:bg-slate-50 transition-all group shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        {Icons.linkedin}
                        <span>LinkedIn</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>

                  {/* Verified CV Button */}
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between p-3.5 rounded-xl bg-slate-950 text-white text-xs font-mono hover:bg-slate-800 transition-all group shadow-md"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-amber-300" />
                      <span>Verified Curriculum Vitae</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#edf5ff]">
      <ContactSection />
    </main>
  );
}
