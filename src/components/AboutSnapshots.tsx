"use client";

import type { StaticImageData } from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { ABOUT_MOTION } from "@/lib/about-motion";
import { graphemes } from "@/lib/graphemes";
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
const CAPTION_GAP = 24; // grown frame to its caption (--spacing-snapshot-caption)
const CAPTION_H = 44; // two 22px lines
const CLEAR = 12; // least space between a caption and a neighbor's frame

type Point = [number, number];

// A tilted frame's corners on the stage (CSS rotation: clockwise for positive degrees).
function corners(cx: number, cy: number, w: number, h: number, deg: number): Point[] {
  const a = (deg * Math.PI) / 180;
  const [c, s] = [Math.cos(a), Math.sin(a)];
  return [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]].map(([x, y]) => [cx + x * c - y * s, cy + x * s + y * c]);
}

// Where a convex outline crosses the horizontal line `y` (its left and right x), if it does.
function spanAt(poly: Point[], y: number): [number, number] | null {
  const xs: number[] = [];
  poly.forEach(([x1, y1], i) => {
    const [x2, y2] = poly[(i + 1) % poly.length];
    if (y1 !== y2 && (y1 - y) * (y2 - y) <= 0) xs.push(x1 + ((y - y1) * (x2 - x1)) / (y2 - y1));
  });
  return xs.length ? [Math.min(...xs), Math.max(...xs)] : null;
}

// Each typed caption's spot, relative to its photo's center: under the grown
// photo's left edge, as wide as Figma's caption but never wider than the
// photo. If a neighbor's tilted frame shows anywhere between the photo and
// the bottom of its caption (Duolingo: the board photo's corner), the caption
// moves inward past it (or its right edge in), so it reads as one photo's.
const CAPTIONS = LAYOUT.map((l, i) => {
  const scale = ABOUT_MOTION.snapshotScale;
  const photoLeft = l.cx - (l.w * scale) / 2;
  const photoRight = l.cx + (l.w * scale) / 2;
  const frameBottom = l.cy + ((l.h + FRAME) * scale) / 2;
  const top = frameBottom + CAPTION_GAP;
  let left = photoLeft;
  let right = photoRight; // only a neighbor on the right pulls this in
  LAYOUT.forEach((n, j) => {
    if (j === i) return;
    const poly = corners(n.cx, n.cy, n.w + FRAME, n.h + FRAME, n.tilt);
    for (let y = Math.floor(frameBottom); y <= top + CAPTION_H; y++) {
      const span = spanAt(poly, y);
      if (!span || span[1] < left - CLEAR || span[0] > Math.min(left + l.captionW, right) + CLEAR) continue;
      if (n.cx < l.cx) left = Math.max(left, span[1] + CLEAR);
      else right = Math.min(right, span[0] - CLEAR);
    }
  });
  const width = Math.min(l.captionW, right - left);
  return { x: Math.round(left - l.cx), y: Math.round(top - l.cy), w: Math.round(width) };
});

// Must match the `stage` variant in globals.css.
const STAGE = "(width >= 80rem) and (hover: hover) and (pointer: fine)";

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

  // Not until the photo's own blur-in (after the heading types) has ended.
  const enter = (i: number, el: Element) => {
    const reveal = el.closest("[data-reveal]")?.getAttribute("data-reveal");
    const ready = !reveal || reveal === "static" || (reveal === "shown" && el.closest("[data-revealed]"));
    if (stage && ready) setActive(i);
  };
  const leave = (i: number) => setActive((a) => (a === i ? null : a));

  return (
    <ul
      style={{ "--reveal-stagger": "var(--snapshot-reveal-stagger)" } as CSSProperties}
      className="grid grid-cols-1 gap-snapshot-grid sm:grid-cols-2 lg:grid-cols-4 lg:items-start stage:relative stage:block stage:h-snapshot-stage"
    >
      {photos.map((photo, i) => {
        const l = LAYOUT[i];
        const vars = {
          "--cx": `${l.cx}px`,
          "--cy": `${l.cy}px`,
          "--fw": `${l.w + FRAME}px`,
          "--tilt": `${l.tilt}deg`,
          "--z": i + 1,
          "--reveal-i": i, // blurs in after the heading, 100ms apart
          "--cap-x": `${CAPTIONS[i].x}px`,
          "--cap-y": `${CAPTIONS[i].y}px`,
          "--cap-w": `${CAPTIONS[i].w}px`,
        } as CSSProperties;
        const isActive = active === i;
        return (
          <li key={photo.caption} data-reveal-item style={vars} className="stage:absolute stage:top-(--cy) stage:left-(--cx) stage:size-0">
            <figure>
              <div
                data-snap-card
                data-active={isActive || undefined}
                tabIndex={stage ? 0 : undefined}
                onPointerEnter={(e) => e.pointerType === "mouse" && enter(i, e.currentTarget)}
                onPointerLeave={() => leave(i)}
                onFocus={(e) => enter(i, e.currentTarget)}
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
