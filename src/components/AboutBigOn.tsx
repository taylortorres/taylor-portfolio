"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ABOUT_MOTION, FAN_TOTAL_MS } from "@/lib/about-motion";
import { REDUCED_MOTION } from "@/lib/use-media-query";
import { HEADING_TYPED } from "./AboutHeading";
import CursorCaption from "./CursorCaption";

type Item = {
  photo: { src: StaticImageData; alt: string };
  cursorCaption: string;
  title: string;
  text: string;
  funFact: string;
  ps?: string;
};

// The pile in Figma (2804:5825), per column: tilt, stacking order (the first,
// Paris, on top) and a small offset (the metro card sits 4px off center).
const PILE = [
  { rot: 0.47, z: 4, dx: 0, dy: 0 },
  { rot: -12.13, z: 3, dx: 4, dy: 4 },
  { rot: 13.43, z: 1, dx: 0, dy: 0 },
  { rot: -22.81, z: 2, dx: 0, dy: 0 },
];

// "pile": waiting below the fold; "spread": fanning out; "static": final row.
type Fan = "static" | "pile" | "spread";

// "Taylor is big on..." (Figma 2804:5826, 2824:12257). From lg, the four
// polaroids start as Figma's pile at the row's center and fan out into the
// row once, when half of it is in view; each text blurs in after its photo
// lands. The pile is only set up while the row is still below the screen,
// so arriving later (a reload further down, Back) shows the final row. Below
// lg, and with reduced motion, it's always the final layout (one column,
// two from sm). Each photo's cursor caption works once the row has landed.
// If the section heading (`headingId`) is still typing itself out, the fan
// waits for it to finish, so the two never run at once. Once landed, hovering
// or focusing a photo tilts it 2° (alternating) and shrinks it a little (CSS).
export default function AboutBigOn({ items, headingId }: { items: Item[]; headingId?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [fan, setFan] = useState<Fan>("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia(REDUCED_MOTION).matches || !window.matchMedia("(width >= 64rem)").matches) return;
    let timer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const below = entry.boundingClientRect.top > 0;
        if (entry.intersectionRatio === 0) {
          setFan((f) => (f === "static" && below ? "pile" : f));
        } else if (entry.intersectionRatio >= ABOUT_MOTION.fanThreshold) {
          observer.disconnect();
          const spread = () => {
            setFan((f) => (f === "pile" ? "spread" : f));
            timer = window.setTimeout(() => setFan("static"), FAN_TOTAL_MS);
          };
          const heading = headingId ? document.getElementById(headingId) : null;
          if (heading?.hasAttribute("data-typing")) {
            heading.addEventListener(HEADING_TYPED, () => (timer = window.setTimeout(spread, ABOUT_MOTION.afterHeadingMs)), { once: true });
          } else {
            spread();
          }
        }
      },
      { threshold: [0, ABOUT_MOTION.fanThreshold] },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [headingId]);

  return (
    <ul
      ref={ref}
      data-fan={fan}
      className="grid grid-cols-1 gap-y-big-on-row-gap sm:grid-cols-2 sm:gap-x-big-on-gap lg:grid-cols-4 lg:gap-y-0"
    >
      {items.map((item, i) => {
        const p = PILE[i];
        const vars = {
          "--i": i,
          "--pile-rot": `${p.rot}deg`,
          "--pile-z": p.z,
          "--pile-dx": `${p.dx}px`,
          "--pile-dy": `${p.dy}px`,
          "--hover-tilt": `calc(var(--big-on-hover-tilt) * ${i % 2 === 0 ? -1 : 1})`, // left, right, left, right
        } as CSSProperties;
        return (
          <li key={item.title} data-fan-item style={vars} className="relative">
            <div
              data-fan-card
              tabIndex={0}
              className="outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <div data-big-on-tilt>
                <CursorCaption
                  caption={item.cursorCaption}
                  keepCase
                  className="border border-polaroid-border bg-polaroid p-polaroid-pad shadow-polaroid"
                >
                  <Image
                    src={item.photo.src}
                    alt={item.photo.alt}
                    sizes="(min-width: 1280px) 250px, (min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                    className="block h-auto w-full"
                  />
                </CursorCaption>
              </div>
            </div>
            <div data-fan-text className="mt-big-on-text-top">
              <h3 className="flex items-center gap-2.5 font-display text-big-on-title font-medium text-ink italic">
                <span aria-hidden="true" className="size-big-on-square shrink-0 rounded-square bg-big-on-square" />
                {item.title}
              </h3>
              <div className="mt-big-on-title-gap flex flex-col gap-(--text-big-on--line-height) text-big-on text-about-soft">
                <p>{item.text}</p>
                <p>
                  <strong className="font-semibold">Fun fact:</strong> {item.funFact}
                </p>
                {item.ps && <p>{item.ps}</p>}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
