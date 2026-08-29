"use client";

import { useRef } from "react";
import TextReveal from "./TextReveal";
import gsap, { ScrollTrigger, useGSAP } from "@/libs/gsap";
import useViewTransition from "@/hooks/useViewTransition";

const ProjectPage = ({ project, next }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  useGSAP(() => {
    const sections = gsap.utils.toArray("section");

    gsap.to(imageRef.current, {
      clipPath: "inset(0 0 0% 0)",
      duration: 1.6,
      ease: "expo.out",
      scale: 1,
      delay: 0.7,
    });

    sections.forEach((section, id) => {
      const container = section.children[0];

      gsap.to(container, {
        rotate: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top 20%",
          scrub: true,
        },
      });

      if (id === sections.length - 1) return;

      ScrollTrigger.create({
        trigger: section,
        start: "bottom bottom",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });
    });
  });

  const {navigateTo} = useViewTransition();

  const handleNextClick = () => {
    const nextUrl = `/project/${next.slug}`;
    navigateTo(nextUrl);
  }
  return (
    <>
      <main ref={containerRef}>
        <section className="h-screen w-full ">
          <div className="sectionContainer h-full w-full flex pt-[7rem] pb-[4rem] px-[3rem] ">
            <div className="firstSegment h-full w-[10%]">
              <TextReveal>
                <h3 className="text-[2rem]">{project.number}</h3>
              </TextReveal>
            </div>
            <div className="secondSegment h-[85%] w-[30%]">
              <div className="imageDiv overflow-hidden h-full w-full">
                <img
                  ref={imageRef}
                  style={{ clipPath: "inset(0 0 100% 0)" }}
                  className="h-full w-full object-cover scale-[1.4]"
                  src={project.heroImage}
                  alt={project.title}
                />
              </div>
            </div>
            <div className="thirdSegment pl-[8rem] h-[85%] w-[60%] flex flex-col justify-end">
              <div className="heading">
                <TextReveal delay="0.7" ease="power4.out" splitBy="chars">
                  <h1 className="text-[5rem] leading-[1.1]">{project.title}</h1>
                </TextReveal>
              </div>
              <div className="subheading flex gap-[3rem]">
                <TextReveal delay="0.7" splitBy="words">
                  <h1 className="text-[2rem]">{project.subtitle}</h1>
                </TextReveal>
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
                <button className="mr-[2rem] bg-amber-100 px-[1.5rem] py-[0.5rem] rounded-[0.9rem]">
                  <a className="" href="">
                    <TextReveal delay="0.7" splitBy="words">
                        Github
                    </TextReveal>
                  </a>
                </button>
                <button className="mr-[2rem] bg-amber-100 px-[1.5rem] py-[0.5rem] rounded-[0.9rem]">
                  <a className="" href="">
                    <TextReveal delay="0.7" splitBy="words">
                        Live
                    </TextReveal>
                  </a>
                </button>
              </div>
            </div>
          </div>
        </section>
        {project.gallery.map((ele, id) => {
          return (
            <section key={id} className="h-screen w-full">
              <div
                style={{ transformOrigin: "bottom left" }}
                className="container rotate-[30deg] h-full w-full"
              >
                <img className="h-full w-full object-cover" src={ele} alt="" />
              </div>
            </section>
          );
        })}
        <footer className="h-screen w-full flex items-center justify-center">
          <div className="text-center bg-amber-500 px-[3rem] py-[2rem] rounded-[1.5rem] flex flex-col gap-[1rem]">
            <p onClick={handleNextClick} className="text-[1.2rem]">{next.title} </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default ProjectPage;
