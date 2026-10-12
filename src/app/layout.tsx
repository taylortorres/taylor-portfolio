import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader, Source_Serif_4 } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["normal", "italic"], // italic for emphasis in case study callouts
  axes: ["opsz"], // optical size follows the font size, like Figma's Source Serif Pro display cuts
});

export const metadata: Metadata = {
  title: "Taylor Torres",
  description:
    "Taylor designs the threads that tie people, ideas, and systems together.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} ${sourceSerif.variable} h-full antialiased motion-safe:scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        {/* Outside the page template: mounts once per full load, stays put on navigation. */}
        <SiteHeader>
          <Nav />
        </SiteHeader>
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
