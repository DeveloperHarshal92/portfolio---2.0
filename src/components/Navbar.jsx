"use client";

import React from "react";
import BubbleMenu from "./BubbleMenu";

const items = [
  {
    number: "01",
    label: "Home",
    subtitle: "Main Canvas & Introduction",
    href: "/",
    ariaLabel: "Home",
    stairOffset: 0,
  },
  {
    number: "02",
    label: "About",
    subtitle: "Engineering Philosophy & Tech Ecosystem",
    href: "/about",
    ariaLabel: "About Harshal",
    stairOffset: 1,
  },
  {
    number: "03",
    label: "Projects",
    subtitle: "Selected Projects & Interactive Systems",
    href: "/project",
    ariaLabel: "Selected Projects",
    stairOffset: 2,
  },
  {
    number: "04",
    label: "Contact",
    subtitle: "Direct Transmission & Inquiries",
    href: "/contact",
    ariaLabel: "Direct Contact",
    stairOffset: 3,
  },
];

export default function Navbar() {
  return (
    <header>
      <BubbleMenu
        logo="Harshal Varade"
        items={items}
        menuAriaLabel="Toggle navigation menu"
        useFixedPosition={true}
        animationEase="power3.out"
        animationDuration={0.55}
        staggerDelay={0.08}
      />
    </header>
  );
}