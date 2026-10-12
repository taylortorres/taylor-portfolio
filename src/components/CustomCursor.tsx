"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// Decorative cursor for mouse users, replacing the native one site-wide: a
// purple dot that trails the pointer. Over links and buttons it grows slightly,
// turns flat (no grain) and a soft halo fades in behind it. It morphs into a "view case study" pill over
// project cards, or into a text pill over captioned media (data-cursor-label,
// see CursorCaption). Its color follows the nearest data-cursor zone under the
// pointer: "light" (purple or dark surfaces) shows a plain white circle and
// halo, "dark" or no zone shows the purple dot. Zones can nest, e.g. the cream
// paper inside the purple footer. It hides where a native cursor says more:
// text fields (I-beam), zoomable media (zoom-in) and the zoom viewer's backdrop
// (zoom-out). Only transform and opacity animate. With reduced motion it
// follows without lag and swaps instantly. Touch devices never mount it.
//
// It lives in the top layer (a manual popover) so it shows above the zoom
// viewer's modal dialog; Zoomable dispatches RAISE_CURSOR after opening one,
// which re-shows the popover on top of it.

export const RAISE_CURSOR = "cursor:raise";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const NATIVE =
  "input:not([type='button'], [type='submit'], [type='reset'], [type='checkbox'], [type='radio'], [type='range'], [type='color'], [type='file'], [type='image']), textarea, [contenteditable='true'], [data-zoomable], [data-scrim]";
const CLICKABLE = "a[href], button, select, summary, label, input, [role='button'], [role='link']";
const LAG = 0.2; // share of the remaining distance covered each frame
const TONE_DELAY = 80; // ms a new color must hold before switching (no flicker at zone edges)

type Mode = "hidden" | "dot" | "link" | "pill" | "caption";
type Tone = "dark" | "light";

function modeFor(node: Element | null, captioned: Element | null | undefined): Mode {
  if (node?.closest("[data-cursor='case-study']")) return "pill";
  if (node?.closest(NATIVE)) return "hidden";
  if (captioned) return "caption";
  if (node?.closest(CLICKABLE)) return "link";
  return "dot";
}

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const fine = window.matchMedia(FINE_POINTER);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!el || !fine.matches) return;

    const root = document.documentElement;
    root.classList.add("custom-cursor");
    const raise = () => {
      if (el.matches(":popover-open")) el.hidePopover();
      el.showPopover();
    };
    raise();
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
      const captioned = node?.closest("[data-cursor-label]");
      // Keep the old text while the pill fades out; swap it only on entry.
      if (captioned && labelRef.current) labelRef.current.textContent = captioned.getAttribute("data-cursor-label");
      setMode(modeFor(node, captioned));
      const zone = node?.closest("[data-cursor='light'], [data-cursor='dark']");
      const tone = zone?.getAttribute("data-cursor") === "light" ? "light" : "dark";
      if (first) el.dataset.tone = tone;
      else setTone(tone);
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onLeave = () => setMode("hidden");

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener(RAISE_CURSOR, raise);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(toneTimer);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener(RAISE_CURSOR, raise);
      if (el.matches(":popover-open")) el.hidePopover();
      root.classList.remove("custom-cursor");
    };
  }, []);

  const morph = "absolute top-0 left-0 max-w-none motion-safe:transition-[opacity,scale] motion-safe:duration-300 motion-safe:ease-out";
  // Tone layers crossfade quickly between the purple dot and the white circle.
  const tone = "absolute top-0 left-0 motion-safe:transition-opacity motion-safe:duration-150";
  // The dot: 1.15× over links (150ms), 3× while fading out into a pill (300ms).
  const dotBase =
    "-translate-1/2 scale-100 opacity-0 group-data-[mode=link]:scale-115 group-data-[mode=pill]:scale-[3] group-data-[mode=caption]:scale-[3] group-data-[mode=dot]:duration-150 group-data-[mode=link]:duration-150";
  // Soft halo behind the dot over links; scales (0.8 → 1) and fades together.
  const halo =
    "absolute top-0 left-0 size-cursor-halo -translate-1/2 scale-80 rounded-full opacity-0 group-data-[mode=link]:scale-100 group-data-[mode=link]:opacity-100 motion-safe:transition-[opacity,scale] motion-safe:duration-[180ms] motion-safe:ease-out";
  return (
    <div
      ref={ref}
      popover="manual"
      aria-hidden="true"
      data-mode="hidden"
      data-tone="dark"
      className="group pointer-events-none fixed inset-auto top-0 left-0 m-0 hidden size-0 overflow-visible border-0 bg-transparent p-0 will-change-transform [@media(hover:hover)_and_(pointer:fine)]:block"
    >
      <span className={`${tone} group-data-[tone=light]:opacity-0`}>
        <span className={`${halo} halo-accent`} />
        {/* Grainy dot normally; over links it crossfades to a flat circle of the same size. */}
        <Image
          src="/cursor/dot.svg"
          alt=""
          width={18}
          height={18}
          className={`${morph} ${dotBase} group-data-[mode=dot]:opacity-100`}
        />
        <span className={`${morph} ${dotBase} block size-4 rounded-full bg-accent group-data-[mode=link]:opacity-100`} />
      </span>
      <span className={`${tone} opacity-0 group-data-[tone=light]:opacity-100`}>
        <span className={`${halo} halo-paper`} />
        {/* Same 16px circle as the dot's artwork, solid white with no grain. */}
        <span
          className={`${morph} ${dotBase} block size-4 rounded-full bg-paper group-data-[mode=dot]:opacity-100 group-data-[mode=link]:opacity-100`}
        />
      </span>
      <Image
        src="/cursor/view-case-study.svg"
        alt=""
        width={173}
        height={32}
        className={`${morph} -translate-1/2 scale-[0.1] opacity-0 group-data-[mode=pill]:scale-100 group-data-[mode=pill]:opacity-100`}
      />
      {/* Caption pill: same morph and height as "view case study", text from the zone. */}
      <span
        ref={labelRef}
        className={`${morph} flex h-8 -translate-1/2 scale-[0.1] items-center rounded-full bg-accent px-3.5 font-mono text-eyebrow whitespace-nowrap text-paper uppercase opacity-0 group-data-[mode=caption]:scale-100 group-data-[mode=caption]:opacity-100`}
      />
    </div>
  );
}
