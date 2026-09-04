"use client";

import React from "react";
import CoverflowCarousel from "@/components/CoverflowCarousel";
import { projects } from "@/data/projects";

export function ProjectSection() {
  return (
    <section
      id="project"
      className="relative w-full bg-[#edf5ff] dark:bg-[#07090e] text-[#0a0d12] dark:text-[#f1f5f9] select-none transition-colors duration-400"
    >
      <CoverflowCarousel projects={projects} />
    </section>
  );
}

export default function ProjectPage() {
  return (
    <main className="w-full min-h-screen bg-[#edf5ff] dark:bg-[#07090e] text-[#0a0d12] dark:text-[#f1f5f9] transition-colors duration-400">
      <ProjectSection />
    </main>
  );
}