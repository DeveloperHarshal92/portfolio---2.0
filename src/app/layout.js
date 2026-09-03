import Navbar from "@/components/Navbar";
import PortfolioLoader from "@/components/PortfolioLoader";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";

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
  title: "Cohort 2.0 Portfolio",
  description: "My portfolio project",
};

// const filterDeprecationsScript = `
//   (function() {
//     var origWarn = console.warn;
//     console.warn = function() {
//       if (arguments[0] && typeof arguments[0] === 'string') {
//         if (
//           arguments[0].indexOf('THREE.Clock: This module has been deprecated') !== -1 ||
//           arguments[0].indexOf('using deprecated parameters for the initialization function') !== -1
//         ) {
//           return;
//         }
//       }
//       return origWarn.apply(console, arguments);
//     };
//   })();
// `;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* <script
          dangerouslySetInnerHTML={{ __html: filterDeprecationsScript }}
        /> */}
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <PortfolioLoader />
        <Navbar />
        <SmoothScroller>{children}</SmoothScroller>
      </body>
    </html>
  );
}
