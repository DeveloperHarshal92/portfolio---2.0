"use client";

import React from "react";
import CoverflowCarousel from "@/components/CoverflowCarousel";
import { projects } from "@/data/projects";

export function ProjectSection() {
  return (
    <section
      id="project"
      className="relative w-full bg-[#edf5ff] text-[#0a0d12] select-none"
    >
      <CoverflowCarousel projects={projects} />
    </section>
  );
}

export default function ProjectPage() {
  return (
    <main className="w-full min-h-screen bg-[#edf5ff]">
      <ProjectSection />
    </main>
  );
}