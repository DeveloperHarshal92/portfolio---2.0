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
      <main ref={containerRef}>
        <section className="h-screen w-full ">
          <div className="sectionContainer h-full w-full flex pt-[7rem] pb-[4rem] px-[3rem] ">
            <div className="firstSegment h-full w-[10%]">
              <TextReveal>
                <h3 className="text-[2rem]">{project.number || "01"}</h3>
              </TextReveal>
            </div>
            <div className="secondSegment h-[85%] w-[30%]">
              <div className="imageDiv overflow-hidden h-full w-full">
                <img
                  ref={imageRef}
                  style={{ clipPath: "inset(0 0 100% 0)" }}
                  className="h-full w-full object-cover scale-[1.4]"
                  src={project.heroImage || project.coverImage}
                  alt={project.title || "Project"}
                />
              </div>
            </div>
            <div className="thirdSegment pl-[6rem] h-[75%] w-[60%] flex flex-col justify-end">
              <div className="heading">
                <TextReveal delay="0.7" ease="power4.out" splitBy="words">
                  <h1 className="text-[2rem] leading-[1.1]">{project.title}</h1>
                </TextReveal>
              </div>
              <div className="subheading flex gap-[3rem]">
                <TextReveal delay="0.7" splitBy="chars">
                  <h1 className="text-[2rem]">{project.year}</h1>
                </TextReveal>
              </div>
              <div className="subheading">
                <TextReveal delay="0.7" splitBy="words">
                  <h1 className="text-[1.2rem]">{project.role}</h1>
                </TextReveal>
              </div>
              <div className="description mt-[2rem] w-[80%] text-balance">
                <TextReveal delay="0.7" splitBy="lines">
                  <p className="text-[1rem] leading-1.2">
                    {project.description}
                  </p>
                </TextReveal>
              </div>
              <div className="heading mt-5 flex gap-[1rem]">
                {project.githubLink && (
                  <button className="mr-[2rem] bg-amber-100 px-[1.5rem] py-[0.5rem] rounded-[0.9rem] cursor-pointer hover:opacity-80 transition-opacity">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TextReveal delay="0.7" splitBy="words">
                        Git Repo
                      </TextReveal>
                    </a>
                  </button>
                )}
                {project.liveLink && (
                  <button className="mr-[2rem] bg-amber-100 px-[1.5rem] py-[0.5rem] rounded-[0.9rem] cursor-pointer hover:opacity-80 transition-opacity">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
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
          <footer className="relative h-screen w-full flex items-center justify-center bg-[#edf5ff] z-30">
            <div
              onClick={handleNextClick}
              className="text-center bg-amber-400 hover:bg-amber-300 text-slate-950 px-[3.5rem] py-[2rem] rounded-[1.5rem] flex flex-col gap-[0.8rem] cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-xl select-none"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-slate-800">
                Next Project
              </span>
              <p className="text-[1.5rem] font-medium tracking-tight">
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
