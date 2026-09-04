"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/libs/utils";

/**
 * Animated Solar / Lunar Switch
 * Source Design from 21st.dev (Component #9362 by axai-kaizoku)
 * Enhanced with High-End Agency Double-Bezel Island button architecture
 */
const SolarSwitch = ({ isDark }) => {
  const duration = 0.55;

  const moonVariants = {
    checked: { scale: 1, rotate: 0, opacity: 1 },
    unchecked: { scale: 0, rotate: -45, opacity: 0 },
  };

  const sunVariants = {
    checked: { scale: 0, rotate: 45, opacity: 0 },
    unchecked: { scale: 1, rotate: 0, opacity: 1 },
  };

  const scaleMoon = useMotionValue(isDark ? 1 : 0);
  const scaleSun = useMotionValue(isDark ? 0 : 1);

  useEffect(() => {
    scaleMoon.set(isDark ? 1 : 0);
    scaleSun.set(isDark ? 0 : 1);
  }, [isDark, scaleMoon, scaleSun]);

  const pathLengthMoon = useTransform(scaleMoon, [0.3, 1], [0, 1]);
  const pathLengthSun = useTransform(scaleSun, [0.3, 1], [0, 1]);

  return (
    <motion.div
      animate={isDark ? "checked" : "unchecked"}
      initial={false}
      className="relative flex items-center justify-center w-5 h-5"
    >
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Sun Core */}
        <motion.path
          d="M12.4058 17.7625C15.1672 17.7625 17.4058 15.5239 17.4058 12.7625C17.4058 10.0011 15.1672 7.76251 12.4058 7.76251C9.64434 7.76251 7.40576 10.0011 7.40576 12.7625C7.40576 15.5239 9.64434 17.7625 12.4058 17.7625Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={sunVariants}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          style={{
            pathLength: pathLengthSun,
            scale: scaleSun,
          }}
        />
        {/* Sun Rays */}
        <motion.path
          d="M12.4058 1.76251V3.76251"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={sunVariants}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          style={{ pathLength: pathLengthSun, scale: scaleSun }}
        />
        <motion.path
          d="M12.4058 21.7625V23.7625"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={sunVariants}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          style={{ pathLength: pathLengthSun, scale: scaleSun }}
        />
        <motion.path
          d="M4.62598 4.98248L6.04598 6.40248"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={sunVariants}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          style={{ pathLength: pathLengthSun, scale: scaleSun }}
        />
        <motion.path
          d="M18.7656 19.1225L20.1856 20.5425"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={sunVariants}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          style={{ pathLength: pathLengthSun, scale: scaleSun }}
        />
        <motion.path
          d="M1.40576 12.7625H3.40576"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={sunVariants}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          style={{ pathLength: pathLengthSun, scale: scaleSun }}
        />
        <motion.path
          d="M21.4058 12.7625H23.4058"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={sunVariants}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          style={{ pathLength: pathLengthSun, scale: scaleSun }}
        />
        <motion.path
          d="M4.62598 20.5425L6.04598 19.1225"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={sunVariants}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          style={{ pathLength: pathLengthSun, scale: scaleSun }}
        />
        <motion.path
          d="M18.7656 6.40248L20.1856 4.98248"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={sunVariants}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          style={{ pathLength: pathLengthSun, scale: scaleSun }}
        />

        {/* Moon Crescent */}
        <motion.path
          d="M21.1918 13.2013C21.0345 14.9035 20.3957 16.5257 19.35 17.8781C18.3044 19.2305 16.8953 20.2571 15.2875 20.8379C13.6797 21.4186 11.9398 21.5294 10.2713 21.1574C8.60281 20.7854 7.07479 19.9459 5.86602 18.7371C4.65725 17.5283 3.81774 16.0003 3.4457 14.3318C3.07367 12.6633 3.18451 10.9234 3.76526 9.31561C4.346 7.70783 5.37263 6.29868 6.72501 5.25307C8.07739 4.20746 9.69959 3.56862 11.4018 3.41132C10.4052 4.75958 9.92564 6.42077 10.0503 8.09273C10.175 9.76469 10.8957 11.3364 12.0812 12.5219C13.2667 13.7075 14.8384 14.4281 16.5104 14.5528C18.1823 14.6775 19.8435 14.1979 21.1918 13.2013Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={moonVariants}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          style={{
            pathLength: pathLengthMoon,
            scale: scaleMoon,
          }}
        />
      </motion.svg>
    </motion.div>
  );
};

export default function ThemeToggle({ className, size = "md" }) {
  const { theme, toggleTheme, isDark, isMounted } = useTheme();

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div
        className={cn(
          "w-11 h-11 md:w-12 md:h-12 rounded-full p-1 ring-1 ring-slate-900/10 dark:ring-white/15 bg-slate-900/5 dark:bg-white/5 opacity-0",
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center p-0.5 rounded-full",
        "bg-slate-900/5 dark:bg-white/10 ring-1 ring-slate-900/10 dark:ring-white/15",
        "backdrop-blur-md transition-all duration-300",
        className,
      )}
    >
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        title={isDark ? "Switch to light theme" : "Switch to dark theme"}
        className={cn(
          "group relative flex items-center justify-center cursor-pointer select-none",
          "w-10 h-10 md:w-11 md:h-11 rounded-full",
          "bg-white/95 dark:bg-[#0c121e]/95",
          "text-slate-800 dark:text-amber-300",
          "shadow-[0_2px_8px_rgba(10,13,18,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)]",
          "dark:shadow-[0_2px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)]",
          "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:scale-[1.04] active:scale-[0.94]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
        )}
      >
        <SolarSwitch isDark={isDark} />
        <span className="sr-only">
          {isDark ? "Switch to light theme" : "Switch to dark theme"}
        </span>
      </button>
    </div>
  );
}
