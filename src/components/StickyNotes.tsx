"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import { useRevealOnce } from "@/lib/use-reveal-once";

export type Sticky = {
  src: StaticImageData;
  /** The note's text. */
  alt: string;
  /** Where the PNG (sticky plus its shadow) sits on the board, in % of its width and height. */
  left: number;
  top: number;
  width: number;
  /** Starting tilt in degrees; it settles to 0 (Figma's rotation). */
  tilt: number;
};

const STAGGER = 90; // ms between notes

// Crit stickies over the board: once half the board is in view they fade in
// one after another, drifting up 12px and settling from a slight tilt. Reduced
// motion (or already on screen at load) shows them in place.
export default function StickyNotes({ notes }: { notes: Sticky[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRevealOnce(ref, 0.5);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0">
      {notes.map((n, i) => (
        <Image
          key={i}
          src={n.src}
          alt={n.alt}
          sizes="(min-width: 640px) 144px, 35vw"
          className={`absolute h-auto ${state === "shown" ? "transition-[opacity,translate,rotate] duration-600 ease-out" : ""}`}
          style={{
            left: `${n.left}%`,
            top: `${n.top}%`,
            width: `${n.width}%`,
            transitionDelay: state === "shown" ? `${i * STAGGER}ms` : undefined,
            ...(state === "armed" && { opacity: 0, translate: "0 12px", rotate: `${n.tilt}deg` }),
          }}
        />
      ))}
    </div>
  );
}
