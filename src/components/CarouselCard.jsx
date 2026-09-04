import React, { useRef } from "react";
import TextReveal from "./TextReveal";
import gsap from "@/libs/gsap";
import useViewTransition from "@/hooks/useViewTransition";

const CARD_W = 330;
const CARD_H = 350;
const SCALE = 1.35;

const CarouselCard = ({ project, onHoverStart, onHoverEnd }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const numRef = useRef(null);
  const titleRef = useRef(null);

  const titlePanelRef = useRef(null);

  const onEnter = () => {
    onHoverStart?.();

    if (cardRef.current) {
      gsap.to(cardRef.current, {
        width: CARD_W * SCALE,
        height: CARD_H * SCALE,
        duration: 0.3,
        ease: "power3.out",
      });
    }

    if (imgRef.current) {
      gsap.to(imgRef.current, {
        scale: 1.2,
        duration: 0.3,
        ease: "power3.out",
      });
    }

    if (titlePanelRef.current) {
      gsap.to(titlePanelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power3.out",
      });
    }

    numRef.current?.play();
    titleRef.current?.play();
  };

  const onLeave = () => {
    onHoverEnd?.();

    if (cardRef.current) {
      gsap.to(cardRef.current, {
        width: CARD_W,
        height: CARD_H,
        duration: 0.3,
        ease: "power3.out",
      });
    }

    if (imgRef.current) {
      gsap.to(imgRef.current, {
        scale: 1.6,
        duration: 0.3,
        ease: "power3.out",
      });
    }

    if (titlePanelRef.current) {
      gsap.to(titlePanelRef.current, {
        opacity: 0,
        y: 6,
        duration: 0.25,
        ease: "power3.out",
      });
    }

    numRef.current?.reverse();
    titleRef.current?.reverse();
  };

  const { navigateTo } = useViewTransition();

  const handleClick = () => {
    navigateTo(`/project/${encodeURIComponent(project.slug)}`);
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ width: CARD_W, height: CARD_H, flexShrink: 0 }}
      className="relative cursor-pointer overflow-visible flex items-start justify-start group"
    >
      {/* Title Panel - Only visible on hover */}
      <div
        ref={titlePanelRef}
        style={{
          bottom: "calc(100% + 1.25rem)",
          opacity: 0,
          transform: "translate(-50%, 6px)",
        }}
        className="titlePanel absolute left-1/2 w-[220px] pointer-events-none flex flex-col items-start text-start gap-1.5"
      >
        <TextReveal
          ref={numRef}
          duration="0.25"
          trigger="manual"
          splitBy="chars"
          className="flex justify-center"
        >
          <span className="text-[1rem] font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase text-center transition-colors">
            {project.number}
          </span>
        </TextReveal>
        <TextReveal
          ref={titleRef}
          duration="0.25"
          trigger="manual"
          splitBy="words"
          className="flex justify-center"
        >
          <h3 className="text-[3rem] sm:text-[1.5rem] font-medium text-slate-900 dark:text-slate-100 leading-tight tracking-tight text-center transition-colors">
            {project.slug}
          </h3>
        </TextReveal>
      </div>

      <div className="imgDiv absolute inset-0 overflow-hidden shadow-lg bg-slate-900">
        <img
          style={{ transformOrigin: "center center", userSelect: "none" }}
          className="h-full w-full object-cover scale-[1.5]"
          ref={imgRef}
          src={project.coverImage}
          alt={project.title}
        />
      </div>
    </div>
  );
};

export default CarouselCard;
