"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// Decorative cursor for mouse users: a purple dot that trails the pointer and
// morphs into a "view case study" pill over project cards. Over other links,
// buttons and inputs it hides so the native cursor shows. Only transform and
// opacity animate. With reduced motion it follows without lag and swaps
// without morphing. Touch devices never mount it.

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const NATIVE = "a, button, input, textarea, select, label, summary, [role='button'], [contenteditable='true']";
const LAG = 0.2; // share of the remaining distance covered each frame

type Mode = "hidden" | "dot" | "pill";

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

    const setMode = (mode: Mode) => {
      if (el.dataset.mode !== mode) el.dataset.mode = mode;
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
      if (!seen) {
        seen = true;
        current.x = target.x;
        current.y = target.y;
      }
      const node = e.target instanceof Element ? e.target : null;
      setMode(node?.closest("[data-cursor='case-study']") ? "pill" : node?.closest(NATIVE) ? "hidden" : "dot");
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onLeave = () => setMode("hidden");

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      root.classList.remove("custom-cursor");
    };
  }, []);

  const morph = "absolute top-0 left-0 max-w-none motion-safe:transition-[opacity,scale] motion-safe:duration-300 motion-safe:ease-out";
  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-mode="hidden"
      className="group pointer-events-none fixed top-0 left-0 z-50 hidden will-change-transform [@media(hover:hover)_and_(pointer:fine)]:block"
    >
      <Image
        src="/cursor/dot.svg"
        alt=""
        width={18}
        height={18}
        className={`${morph} -translate-1/2 scale-100 opacity-0 group-data-[mode=dot]:opacity-100 group-data-[mode=pill]:scale-[3]`}
      />
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
