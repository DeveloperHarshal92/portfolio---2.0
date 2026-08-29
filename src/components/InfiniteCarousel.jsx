import React, { useRef, useEffect } from "react";
import CarouselCard from "./CarouselCard";
import gsap from "@/libs/gsap";

const CARD_W = 180;
const CARD_H = 250;
const SCALE = 1.35;
const CARD_GAP = 25;

const DURATION = 25;

const TRACK_H = CARD_H * SCALE;

const InfiniteCarousel = ({ projects }) => {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const singleWidth = projects.length * (CARD_W + CARD_GAP);

    tweenRef.current = gsap.to(trackRef.current, {
      x: -singleWidth,
      ease: "none",
      duration: DURATION,
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [projects]);

  const doubled = [...projects, ...projects];

  return (
    <div
      style={{ padding: `${TRACK_H * 0.3}px 0 14px` }}
      className="overflow-hidden"
    >
      <div
        ref={trackRef}
        style={{
          gap: `${CARD_GAP}`,
          width: "max-content",
          height: `${TRACK_H}px`,
        }}
        className="track flex items-center gap-5"
      >
        {doubled.map((project, id) => {
          return (
            <CarouselCard
              key={id}
              project={project}
              onHoverStart={() => tweenRef.current?.pause()}
              onHoverEnd={() => tweenRef.current?.play()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default InfiniteCarousel;
