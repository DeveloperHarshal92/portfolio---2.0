"use client";

import GlassHero from "@/components/GlassHero";
import { AboutSection } from "./about/page";
import { ProjectSection } from "./project/page";
import { ContactSection } from "./contact/page";

export default function Home() {
  return (
    <div className="relative w-full bg-[#edf5ff] text-[#0a0d12]">
      {/* 01. Home Canvas & Introduction */}
      <GlassHero />

      {/* 02. Engineering Philosophy, Lanyard & Services Spiral */}
      <AboutSection showCta={false} />

      {/* 03. Selected Work & Infinite Carousel */}
      <ProjectSection />

      {/* 04. Direct Transmission & Contact */}
      <ContactSection />
    </div>
  );
}
