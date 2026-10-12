"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// Decorative cursor for mouse users, replacing the native one site-wide: a
// purple dot that trails the pointer. Over links and buttons it grows slightly,
// turns flat (no grain) and a soft halo fades in behind it. It morphs into a "view case study" pill over
// project cards, or into a text pill over captioned media (data-cursor-label,
// see CursorCaption; uppercase unless the zone sets data-cursor-case="keep").
// The text pill shifts sideways to stay at least 8px inside the window. Its color follows the nearest data-cursor zone under the
// pointer: "light" (purple or dark surfaces) shows a plain white circle and
// halo, "dark" or no zone shows the purple dot. Zones can nest, e.g. the cream
// paper inside the purple footer. It hides where a native cursor says more:
// text fields (I-beam), zoomable media (zoom-in) and the zoom viewer's backdrop
// (zoom-out). Only transform and opacity animate. With reduced motion it
// follows without lag and swaps instantly. Touch devices never mount it.
//
// Dot ↔ pill is a crossfade of two layers (opacity plus a 0.9 → 1 scale,
// 120ms), never a resize. Leaving a pill, its text fades out first (70ms),
// then the pill fades into the dot. The pill has no lag: the position snaps
// to the pointer on enter and leave and follows it 1:1 in between, so it
// never trails outside the zone.
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
const EDGE = 8; // px the caption pill keeps from the window edges
const LEAVE_MS = 200; // how long the "leaving a pill" timing applies

type Mode = "hidden" | "dot" | "link" | "pill" | "caption";
const isPill = (mode: string | undefined) => mode === "pill" || mode === "caption";
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
  const labelRef = useRef<HTMLSpanElement>(null); // caption text
  const pillRef = useRef<HTMLSpanElement>(null); // caption pill around it

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
    let leaveTimer = 0;

    const setMode = (mode: Mode) => {
      const was = el.dataset.mode;
      if (was === mode) return;
      if (isPill(was) !== isPill(mode)) {
        // Entering or leaving a pill: no lag, so it never trails behind the pointer.
        current.x = target.x;
        current.y = target.y;
        place();
      }
      // Leaving a pill: text fades first, the dot comes back after it (see the classes below).
      clearTimeout(leaveTimer);
      if (isPill(was) && !isPill(mode)) {
        el.dataset.leaving = was ?? "";
        leaveTimer = window.setTimeout(() => delete el.dataset.leaving, LEAVE_MS);
      } else delete el.dataset.leaving;
      el.dataset.mode = mode;
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
    // Move to `current`; a caption pill near a window edge slides back inside
    // (layout width, unaffected by its scale).
    const place = () => {
      el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      const pill = pillRef.current;
      if (!pill) return;
      const half = pill.offsetWidth / 2;
      const right = document.documentElement.clientWidth - EDGE - half;
      const shift = Math.max(EDGE + half - current.x, Math.min(0, right - current.x));
      pill.style.marginLeft = shift ? `${shift}px` : "";
    };
    const render = () => {
      const k = reduced.matches || isPill(el.dataset.mode) ? 1 : LAG;
      current.x += (target.x - current.x) * k;
      current.y += (target.y - current.y) * k;
      place();
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
      if (captioned && labelRef.current) {
        labelRef.current.textContent = captioned.getAttribute("data-cursor-label");
        labelRef.current.style.textTransform = captioned.getAttribute("data-cursor-case") === "keep" ? "none" : "";
        place(); // new text, new width: re-clamp before it fades in
      }
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
      clearTimeout(leaveTimer);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener(RAISE_CURSOR, raise);
      if (el.matches(":popover-open")) el.hidePopover();
      root.classList.remove("custom-cursor");
    };
  }, []);

  const morph = "absolute top-0 left-0 max-w-none motion-safe:transition-[opacity,scale] motion-safe:duration-150 motion-safe:ease-out";
  // Pills crossfade in 120ms. Leaving, the caption pill waits for its text to fade (70ms)
  // first; "view case study" has its text baked in, so it fades straight away.
  const pill =
    "absolute top-0 left-0 max-w-none -translate-1/2 scale-90 opacity-0 motion-safe:transition-[opacity,scale] motion-safe:duration-120 motion-safe:ease-out";
  // Tone layers crossfade quickly between the purple dot and the white circle.
  const tone = "absolute top-0 left-0 motion-safe:transition-opacity motion-safe:duration-150";
  // The dot: 1.15× over links (150ms); fades out (with a slight shrink) as a pill fades in (120ms),
  // and back in after a pill's text has faded.
  const dotBase =
    "-translate-1/2 scale-100 opacity-0 group-data-[mode=link]:scale-115 group-data-[mode=pill]:scale-90 group-data-[mode=caption]:scale-90 group-data-[mode=pill]:duration-120 group-data-[mode=caption]:duration-120 group-data-[leaving=caption]:delay-70";
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
        className={`${pill} group-data-[mode=pill]:scale-100 group-data-[mode=pill]:opacity-100`}
      />
      {/* Caption pill: same crossfade and height as "view case study", text from the zone.
          The text sits in its own layer so it can fade out before the pill does. */}
      <span
        ref={pillRef}
        className={`${pill} flex h-8 items-center group-data-[leaving=caption]:delay-70 rounded-full bg-accent px-3.5 group-data-[mode=caption]:scale-100 group-data-[mode=caption]:opacity-100`}
      >
        <span
          ref={labelRef}
          className="font-mono text-eyebrow whitespace-nowrap text-paper uppercase opacity-0 motion-safe:transition-opacity motion-safe:duration-70 group-data-[mode=caption]:opacity-100 group-data-[mode=caption]:duration-120"
        />
      </span>
    </div>
  );
}
