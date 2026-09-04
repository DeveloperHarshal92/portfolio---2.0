"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";

const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
  isDark: false,
  isMounted: false,
});

export const THEME_STORAGE_KEY = "portfolio-theme";

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("light");
  const [isMounted, setIsMounted] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "dark" || stored === "light") {
        setThemeState(stored);
        applyThemeClass(stored);
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initial = prefersDark ? "dark" : "light";
        setThemeState(initial);
        applyThemeClass(initial);
      }
    } catch {
      // Fallback if localStorage is inaccessible
      applyThemeClass("light");
    }
  }, []);

  const applyThemeClass = (newTheme) => {
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  };

  const setTheme = (newTheme) => {
    const targetTheme = newTheme === "dark" ? "dark" : "light";
    startTransition(() => {
      setThemeState(targetTheme);
      applyThemeClass(targetTheme);
    });
    try {
      localStorage.setItem(THEME_STORAGE_KEY, targetTheme);
    } catch {
      /* ignore */
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        isDark,
        isMounted,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "dark",
      setTheme: () => {},
      toggleTheme: () => {},
      isDark: true,
      isMounted: false,
    };
  }
  return context;
}

export default ThemeProvider;
