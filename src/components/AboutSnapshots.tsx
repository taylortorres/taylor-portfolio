"use client";

import type { StaticImageData } from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { ABOUT_MOTION } from "@/lib/about-motion";
import { REDUCED_MOTION, useMediaQuery } from "@/lib/use-media-query";
import Polaroid from "./Polaroid";

type Snapshot = { src: StaticImageData; alt: string; caption: string };

// Figma 2804:11571 … 2804:11573: where each photo sits on the 1200px stage
// (center, from the stage's top-left), its photo size, tilt, and the width
// its typed caption wraps at (from the straightened row in Figma).
const LAYOUT = [
  { cx: 140, cy: 190, w: 260, h: 325, tilt: -4.36, captionW: 248 },
  { cx: 448, cy: 237, w: 336, h: 253, tilt: 1.73, captionW: 334 },
  { cx: 776, cy: 193, w: 309, h: 266, tilt: -1.51, captionW: 255 },
  { cx: 1065, cy: 185, w: 248, h: 329, tilt: 4.33, captionW: 255 },
];
const FRAME = 20; // 9px padding and 1px border on each side

// Must match the `stage` variant in globals.css.
const STAGE = "(width >= 80rem) and (hover: hover) and (pointer: fine)";

// Splits text into what a reader sees as characters, so an emoji (even a
// multi-part one) types as one.
function graphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    return Array.from(new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

// "Snapshots of my life as a designer" (Figma 2801:5783). With a mouse on a
// wide screen: four overlapping, tilted polaroids; hovering or focusing one
// straightens it, grows it, brings it to the front and types its caption
// below (visual only: the full caption is always in the DOM for screen
// readers). Only one is active at a time. On touch screens and narrower
// windows they sit straight in a grid with their captions showing.
export default function AboutSnapshots({ photos }: { photos: Snapshot[] }) {
  const stage = useMediaQuery(STAGE);
  const reduced = useMediaQuery(REDUCED_MOTION);
  const [active, setActive] = useState<number | null>(null);
  // Characters typed so far, for which photo: a newly active photo starts
  // from zero, never from the previous one's count.
  const [typed, setTyped] = useState({ i: -1, n: 0 });

  const chars = active === null ? [] : graphemes(photos[active].caption);
  const shown = reduced ? chars.length : typed.i === active ? typed.n : 0;

  useEffect(() => {
    if (active === null || reduced) return;
    const total = graphemes(photos[active].caption).length;
    let n = 0;
    const timer = window.setInterval(() => {
      n += 1;
      setTyped({ i: active, n });
      if (n >= total) window.clearInterval(timer);
    }, ABOUT_MOTION.typeMsPerChar);
    return () => window.clearInterval(timer);
  }, [active, photos, reduced]);

  const enter = (i: number) => stage && setActive(i);
  const leave = (i: number) => setActive((a) => (a === i ? null : a));

  return (
    <ul className="grid grid-cols-1 gap-snapshot-grid sm:grid-cols-2 lg:grid-cols-4 lg:items-start stage:relative stage:block stage:h-snapshot-stage">
      {photos.map((photo, i) => {
        const l = LAYOUT[i];
        const vars = {
          "--cx": `${l.cx}px`,
          "--cy": `${l.cy}px`,
          "--fw": `${l.w + FRAME}px`,
          "--tilt": `${l.tilt}deg`,
          "--z": i + 1,
          // The caption starts under the grown photo's left edge, 24px below the grown frame.
          "--cap-x": `calc(${l.w / 2}px * var(--snapshot-scale) * -1)`,
          "--cap-y": `calc(${(l.h + FRAME) / 2}px * var(--snapshot-scale) + var(--spacing-snapshot-caption))`,
          "--cap-w": `${l.captionW}px`,
        } as CSSProperties;
        const isActive = active === i;
        return (
          <li key={photo.caption} style={vars} className="stage:absolute stage:top-(--cy) stage:left-(--cx) stage:size-0">
            <figure>
              <div
                data-snap-card
                data-active={isActive || undefined}
                tabIndex={stage ? 0 : undefined}
                onPointerEnter={(e) => e.pointerType === "mouse" && enter(i)}
                onPointerLeave={() => leave(i)}
                onFocus={() => enter(i)}
                onBlur={() => leave(i)}
                className="outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent stage:absolute stage:top-0 stage:left-0 stage:w-(--fw)"
              >
                <Polaroid
                  src={photo.src}
                  alt={photo.alt}
                  sizes={`(min-width: 1280px) ${Math.round(l.w * ABOUT_MOTION.snapshotScale)}px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw`}
                />
              </div>
              <figcaption className="mt-snapshot-caption font-display text-snapshot-caption font-medium text-about-ink italic stage:sr-only">
                {photo.caption}
              </figcaption>
              {isActive && (
                <p
                  aria-hidden="true"
                  className="pointer-events-none absolute top-(--cap-y) left-(--cap-x) z-40 hidden w-(--cap-w) font-display text-snapshot-caption font-medium text-about-ink italic stage:block"
                >
                  {chars.slice(0, shown).join("")}
                </p>
              )}
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
