"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { ABOUT_MOTION } from "@/lib/about-motion";

type Props = {
  photo: { src: StaticImageData; alt: string };
  /** Two lines under the photo. */
  caption: string[];
  /** Transparent PNG that peeks over the polaroid; optional until it's added. */
  character?: StaticImageData;
};

// The About intro portrait (Figma 2755:7207): a white polaroid tilted −3.14°.
// With a mouse, hovering straightens and grows it while the pink character
// rises from behind it (CSS in globals.css, timings in about-motion.ts).
// Keyboard focus does the same. Touch screens play it once when the portrait
// is mostly in view and leave it straight, character peeking.
export default function AboutPortrait({ photo, caption, character }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: none)").matches) return;
    let timer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < ABOUT_MOTION.touchThreshold) return;
        observer.disconnect();
        timer = window.setTimeout(() => setActive(true), ABOUT_MOTION.touchDelayMs);
      },
      { threshold: [0, ABOUT_MOTION.touchThreshold] },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <figure
      ref={ref}
      tabIndex={0}
      data-portrait
      data-active={active || undefined}
      className="relative w-fit rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
    >
      <div data-portrait-card className="relative isolate">
        {character && (
          <Image
            data-portrait-character
            src={character}
            alt=""
            aria-hidden="true"
            sizes="112px"
            className="absolute top-0 -z-10 h-auto max-w-none"
          />
        )}
        <div className="flex flex-col items-center gap-portrait-caption bg-paper px-portrait-x py-portrait-y shadow-portrait">
          <Image
            src={photo.src}
            alt={photo.alt}
            sizes="(min-width: 640px) 275px, calc(100vw - 68px)"
            preload
            className="block h-auto w-portrait-w max-w-full"
          />
          <figcaption className="text-center font-mono text-polaroid-caption font-medium text-figure-ink">
            {caption.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </figcaption>
        </div>
      </div>
    </figure>
  );
}
