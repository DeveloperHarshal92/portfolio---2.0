"use client"

import { useRef } from "react"
import TextReveal from "@/components/TextReveal";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import {projects} from "@/data/projects.js";

export default function Home() {
  // const triggerRef = useRef(null);

  // const handleHoverEnter = () => {
  //   triggerRef.current?.play();
  // };

  // const handleHoverLeave = () => {
  //   triggerRef.current?.reverse();
  // };

  return (
    <main className="h-screen w-full flex items-center">
      {/* <div
        onPointerEnter={handleHoverEnter}
        onPointerLeave={handleHoverLeave}
        className="h-[8rem] w-[12rem] bg-red-500"
      ></div>
      <TextReveal
        ref={triggerRef}
        splitBy="chars"
        trigger="scroll"
        className="text-[3rem]  text-white"
      >
        Hello Everyone
      </TextReveal> */}
      <InfiniteCarousel projects={projects} />
    </main>
  );
}
