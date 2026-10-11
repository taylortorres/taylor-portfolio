"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// Decorative cursor for mouse users: a purple dot that trails the pointer and
// morphs into a "view case study" pill over project cards. Its color follows
// the nearest data-cursor zone under the pointer: "light" (purple or dark
// surfaces) shows a plain white circle, "dark" or no zone shows the purple dot.
// Zones can nest, e.g. the cream paper inside the purple footer. Over other
// links, buttons and inputs it hides so the native cursor shows. Only transform
// and opacity animate. With reduced motion it follows without lag and swaps
// without fading. Touch devices never mount it.

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const NATIVE = "a, button, input, textarea, select, label, summary, [role='button'], [contenteditable='true']";
const LAG = 0.2; // share of the remaining distance covered each frame
const TONE_DELAY = 80; // ms a new color must hold before switching (no flicker at zone edges)

type Mode = "hidden" | "dot" | "pill";
type Tone = "dark" | "light";

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const fine = window.matchMedia(FINE_POINTER);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!el || !fine.matches) return;

    const root = document.documentElement;
    root.classList.add("custom-cursor");
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    let seen = false;
    let toneTimer = 0;

    const setMode = (mode: Mode) => {
      if (el.dataset.mode !== mode) el.dataset.mode = mode;
    };
    const setTone = (tone: Tone) => {
      if (el.dataset.tone === tone) {
        clearTimeout(toneTimer);
        toneTimer = 0;
      } else if (!toneTimer) {
        toneTimer = window.setTimeout(() => {
          el.dataset.tone = tone;
          toneTimer = 0;
        }, TONE_DELAY);
      }
    };
    const render = () => {
      const k = reduced.matches ? 1 : LAG;
      current.x += (target.x - current.x) * k;
      current.y += (target.y - current.y) * k;
      el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      const settled = Math.abs(target.x - current.x) < 0.1 && Math.abs(target.y - current.y) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(render);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      const first = !seen;
      if (!seen) {
        seen = true;
        current.x = target.x;
        current.y = target.y;
      }
      const node = e.target instanceof Element ? e.target : null;
      setMode(node?.closest("[data-cursor='case-study']") ? "pill" : node?.closest(NATIVE) ? "hidden" : "dot");
      const zone = node?.closest("[data-cursor='light'], [data-cursor='dark']");
      const tone = zone?.getAttribute("data-cursor") === "light" ? "light" : "dark";
      if (first) el.dataset.tone = tone;
      else setTone(tone);
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onLeave = () => setMode("hidden");

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(toneTimer);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      root.classList.remove("custom-cursor");
    };
  }, []);

  const morph = "absolute top-0 left-0 max-w-none motion-safe:transition-[opacity,scale] motion-safe:duration-300 motion-safe:ease-out";
  // Tone layers crossfade quickly between the purple dot and the white circle.
  const tone = "absolute top-0 left-0 motion-safe:transition-opacity motion-safe:duration-150";
  const dotMode = "-translate-1/2 scale-100 opacity-0 group-data-[mode=dot]:opacity-100 group-data-[mode=pill]:scale-[3]";
  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-mode="hidden"
      data-tone="dark"
      className="group pointer-events-none fixed top-0 left-0 z-50 hidden will-change-transform [@media(hover:hover)_and_(pointer:fine)]:block"
    >
      <span className={`${tone} group-data-[tone=light]:opacity-0`}>
        <Image src="/cursor/dot.svg" alt="" width={18} height={18} className={`${morph} ${dotMode}`} />
      </span>
      <span className={`${tone} opacity-0 group-data-[tone=light]:opacity-100`}>
        {/* Same 16px circle as the dot's artwork, solid white with no grain. */}
        <span className={`${morph} ${dotMode} block size-4 rounded-full bg-paper`} />
      </span>
      <Image
        src="/cursor/view-case-study.svg"
        alt=""
        width={173}
        height={32}
        className={`${morph} -translate-1/2 scale-[0.1] opacity-0 group-data-[mode=pill]:scale-100 group-data-[mode=pill]:opacity-100`}
      />
    </div>
  );
}
