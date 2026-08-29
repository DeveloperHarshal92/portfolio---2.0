import React, { useRef } from "react";
import TextReveal from "./TextReveal";
import gsap from "@/libs/gsap";

const CARD_W = 200;
const CARD_H = 280;
const SCALE = 1.35;

const CarouselCard = ({ project, onHoverStart, onHoverEnd }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const numRef = useRef(null);
  const titleRef = useRef(null);

  const onEnter = () => {
    onHoverStart?.();

    gsap.to(cardRef.current, {
      width: CARD_W * SCALE,
      height: CARD_H * SCALE,
      duration: 0.45,
      ease: "power3.out",
    });

    numRef.current?.play();
    titleRef.current?.play();
  };

  const onLeave = () => {
    onHoverEnd?.();

    gsap.to(cardRef.current, {
      width: CARD_W,
      height: CARD_H,
      duration: 0.25,
      ease: "power3.out",
    });

    numRef.current?.reverse();
    titleRef.current?.reverse();
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ width: CARD_W, height: CARD_H, flexShrink: 0 }}
      className="relative cursor-pointer overflow-visible"
    >
      {/* Title Panel */}
      <div
        style={{ bottom: "calc(100% + 3rem)" }}
        className="titlePanel absolute left-0 pointer-events-none flex flex-col gap-[1rem]"
      >
        <TextReveal ref={numRef} trigger="manual" splitBy="chars">
          <h3 className="text-[1rem] text-[#010101]">{project.number}</h3>
        </TextReveal>
        <TextReveal ref={titleRef} trigger="manual" splitBy="words">
          <h3 className="text-[1rem] text-[#010101]">{project.title}</h3>
        </TextReveal>
      </div>

      <div className="imgDiv absolute h-full w-full overflow-hidden">
        <img
          style={{ transformOrigin: "center center", userSelect: "none" }}
          className="h-full w-full object-cover"
          ref={imgRef}
          src={project.coverImage}
          alt={project.title}
        />
      </div>
    </div>
  );
};

export default CarouselCard;
