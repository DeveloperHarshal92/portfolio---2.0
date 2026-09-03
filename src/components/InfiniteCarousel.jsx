import React, { useRef, useEffect } from "react";
import CarouselCard from "./CarouselCard";
import gsap from "@/libs/gsap";

const CARD_W = 330;
const CARD_H = 350;
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
      style={{ padding: "90px 0 0 0" }}
      className="w-full overflow-hidden flex justify-center items-center select-none"
    >
      <div
        ref={trackRef}
        style={{
          gap: `${CARD_GAP}px`,
          width: "max-content",
          height: `${TRACK_H}px`,
        }}
        className="track flex items-center"
      >
        {doubled.map((project, index) => {
          return (
            <CarouselCard
              key={`infinite-card-${project.id ?? project.slug ?? index}-${index}`}
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
