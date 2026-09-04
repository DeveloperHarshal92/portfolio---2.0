import Navbar from "@/components/Navbar";
import PortfolioLoader from "@/components/PortfolioLoader";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";
import ThemeProvider from "@/components/ThemeProvider";

import { Inter, JetBrains_Mono } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: "Harshal Varade | Systems & Full Stack Developer",
  description: "Full-stack developer crafting production systems and high-end interactive digital experiences.",
};

const themeInitScript = `
  (function() {
    try {
      var stored = localStorage.getItem('portfolio-theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (stored === 'dark' || (!stored && prefersDark)) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className="min-h-full flex flex-col bg-[#edf5ff] dark:bg-[#07090e] text-[#0a0d12] dark:text-[#f1f5f9] transition-colors duration-400 selection:bg-sky-500 selection:text-white"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <PortfolioLoader />
          <Navbar />
          <SmoothScroller>{children}</SmoothScroller>
        </ThemeProvider>
      </body>
    </html>
  );
}
