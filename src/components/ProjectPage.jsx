"use client";

import { useRef } from "react";
import TextReveal from "./TextReveal";
import gsap, { ScrollTrigger, useGSAP } from "@/libs/gsap";
import useViewTransition from "@/hooks/useViewTransition";

const ProjectPage = ({ project, next }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      if (!project || !containerRef.current) return;
      const sections = gsap.utils.toArray(
        containerRef.current.querySelectorAll("section")
      );

      gsap.to(imageRef.current, {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.6,
        ease: "expo.out",
        scale: 1,
        delay: 0.7,
      });

      sections.forEach((section, id) => {
        const card = section.querySelector(".slideCard") || section.children[0];
        const featureBox = section.querySelector(".featureBox");
        if (!card) return;

        if (id > 0) {
          // Unrotate card smoothly into view
          gsap.fromTo(
            card,
            { rotate: 25 },
            {
              rotate: 0,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            }
          );

          // Animate centered feature text reveal on scroll
          if (featureBox) {
            gsap.fromTo(
              featureBox,
              { opacity: 0, y: 35, scale: 0.96 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 75%",
                  end: "top 20%",
                  scrub: true,
                },
              }
            );
          }
        }

        // GSAP Pin: each section pins at the top of the viewport while user scrolls
        if (id < sections.length - 1) {
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
          });
        }
      });
    },
    { scope: containerRef, dependencies: [project] }
  );

  const { navigateTo } = useViewTransition();

  const handleNextClick = () => {
    if (!next?.slug) return;
    const nextUrl = `/project/${encodeURIComponent(next.slug)}`;
    navigateTo(nextUrl);
  };

  if (!project) return null;

  const galleryItems = Array.isArray(project.gallery) ? project.gallery : [];

  return (
    <>
      <main ref={containerRef} className="bg-[#edf5ff] dark:bg-[#07090e] text-[#0a0d12] dark:text-[#f1f5f9] transition-colors duration-400">
        <section className="min-h-screen lg:h-screen w-full">
          <div className="sectionContainer h-full w-full flex flex-col lg:flex-row pt-24 sm:pt-28 lg:pt-[7rem] pb-12 lg:pb-[4rem] px-5 sm:px-8 lg:px-[3rem] gap-6 lg:gap-0">
            <div className="firstSegment w-full lg:w-[10%]">
              <TextReveal>
                <h3 className="text-[1.5rem] sm:text-[2rem] text-slate-900 dark:text-slate-100">{project.number || "01"}</h3>
              </TextReveal>
            </div>
            <div className="secondSegment w-full lg:w-[30%] h-[260px] sm:h-[340px] lg:h-[85%]">
              <div className="imageDiv overflow-hidden h-full w-full rounded-2xl border border-slate-200/60 dark:border-white/10 shadow-lg">
                <img
                  ref={imageRef}
                  style={{ clipPath: "inset(0 0 100% 0)" }}
                  className="h-full w-full object-cover scale-[1.4]"
                  src={project.heroImage || project.coverImage}
                  alt={project.title || "Project"}
                />
              </div>
            </div>
            <div className="thirdSegment w-full lg:w-[60%] pl-0 lg:pl-[6rem] h-auto lg:h-[75%] flex flex-col justify-end">
              <div className="heading">
                <TextReveal delay="0.7" ease="power4.out" splitBy="words">
                  <h1 className="text-[1.75rem] sm:text-[2rem] leading-[1.15] text-slate-950 dark:text-slate-50">{project.title}</h1>
                </TextReveal>
              </div>
              <div className="subheading flex gap-6 sm:gap-[3rem] mt-2">
                <TextReveal delay="0.7" splitBy="chars">
                  <h1 className="text-[1.5rem] sm:text-[2rem] text-slate-500 dark:text-slate-400">{project.year}</h1>
                </TextReveal>
              </div>
              <div className="subheading mt-1">
                <TextReveal delay="0.7" splitBy="words">
                  <h1 className="text-[1.1rem] sm:text-[1.2rem] text-slate-700 dark:text-slate-300">{project.role}</h1>
                </TextReveal>
              </div>
              <div className="description mt-4 lg:mt-[2rem] w-full lg:w-[80%] text-balance">
                <TextReveal delay="0.7" splitBy="lines">
                  <p className="text-[0.95rem] sm:text-[1rem] leading-relaxed text-slate-600 dark:text-slate-300">
                    {project.description}
                  </p>
                </TextReveal>
              </div>
              <div className="heading mt-5 flex flex-wrap gap-3">
                {project.githubLink && (
                  <button className="bg-amber-400 hover:bg-amber-300 dark:bg-amber-400 dark:hover:bg-amber-300 text-slate-950 font-semibold border border-amber-500/40 dark:border-amber-300/40 px-[1.5rem] py-[0.6rem] rounded-full cursor-pointer transition-all shadow-sm hover:shadow-[0_0_16px_rgba(251,191,36,0.25)] font-mono text-xs uppercase tracking-wider">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <TextReveal delay="0.7" splitBy="words">
                        Git Repo
                      </TextReveal>
                    </a>
                  </button>
                )}
                {project.liveLink && (
                  <button className="bg-emerald-500 hover:bg-emerald-400 dark:bg-emerald-400 dark:hover:bg-emerald-300 text-slate-950 font-semibold border border-emerald-600/40 dark:border-emerald-300/40 px-[1.5rem] py-[0.6rem] rounded-full cursor-pointer transition-all shadow-sm hover:shadow-[0_0_16px_rgba(52,211,153,0.25)] font-mono text-xs uppercase tracking-wider">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <TextReveal delay="0.7" splitBy="words">
                        Live Demo
                      </TextReveal>
                    </a>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
        {galleryItems.map((ele, id) => {
          const feature =
            (project.features && project.features[id]) ||
            (project.features && project.features[id % project.features.length]);

          return (
            <section key={id} className="relative h-screen w-full overflow-hidden">
              <div
                style={{ transformOrigin: "bottom left" }}
                className="slideCard rotate-[25deg] h-full w-full relative overflow-hidden"
              >
                <img
                  className="absolute inset-0 h-full w-full object-cover"
                  src={ele}
                  alt={project.title ? `${project.title} gallery ${id + 1}` : ""}
                />

                {/* Darkened backdrop for high-contrast center reading */}
                <div className="absolute inset-0 bg-black/45 backdrop-brightness-95 pointer-events-none" />

                {/* Feature in the Dead Center of the Page */}
                {feature && (
                  <div className="featureBox absolute inset-0 flex items-center justify-center p-6 sm:p-12 pointer-events-none z-20">
                    <div className="max-w-3xl w-full flex flex-col items-center justify-center text-center gap-4 px-8 py-8 ">
                      <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-amber-300">
                        Feature 0{id + 1}
                      </span>
                      <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium text-white tracking-tight leading-snug text-center">
                        {feature}
                      </h2>
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        })}
        {next && (
          <footer className="relative h-screen w-full flex items-center justify-center overflow-hidden z-30">
            {/* Background image: next project coverImage / heroImage */}
            {(next.coverImage || next.heroImage) && (
              <img
                src={next.coverImage || next.heroImage}
                alt={next.title ? `${next.title} preview` : "Next Project"}
                className="absolute inset-0 w-full h-full object-cover scale-105"
              />
            )}

            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[2px]" />

            {/* Transparent Next Project CTA button */}
            <div
              onClick={handleNextClick}
              className="relative z-10 text-center bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white/60 px-6 sm:px-[3.5rem] py-5 sm:py-[2rem] rounded-[1.5rem] flex flex-col gap-[0.8rem] cursor-pointer backdrop-blur-md hover:scale-105 active:scale-95 transition-all shadow-2xl select-none group max-w-sm sm:max-w-none mx-4"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-amber-300 group-hover:text-amber-200 transition-colors">
                Next Project
              </span>
              <p className="text-[1.5rem] font-medium tracking-tight text-white">
                {next.title}
              </p>
            </div>
          </footer>
        )}
      </main>
    </>
  );
};

export default ProjectPage;
