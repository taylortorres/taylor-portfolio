"use client";

import Link from "next/link";
import { useRef, useState, type FocusEvent, type PointerEvent, type ReactNode } from "react";

// The whole project card is one link. With a mouse hover or keyboard focus,
// the preview video loads, plays and crossfades over the poster. Leaving fades
// back to the poster, then pauses and rewinds. Touch devices and reduced
// motion only ever show the poster. The cursor pill reads `cursorLabel` (with
// a ↗ when `external`). External links open in a new tab.

type Props = {
  href: string;
  /** Text in the cursor pill over the card, e.g. "view slides". */
  cursorLabel: string;
  /** Opens `href` in a new tab; `label` names the link for screen readers. */
  external?: { label: string };
  video?: string;
  poster: ReactNode;
  children: ReactNode;
};

const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function ProjectCardLink({ href, cursorLabel, external, video, poster, children }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const active = useRef(false);
  const [playing, setPlaying] = useState(false);

  function start() {
    const el = videoRef.current;
    if (!el || reducedMotion()) return;
    active.current = true;
    el.play().catch(() => {});
  }

  function stop() {
    const el = videoRef.current;
    active.current = false;
    if (!el) return;
    el.pause();
    // Visible: rewind once the fade-out ends. Never shown: nothing fades, rewind now.
    if (playing) setPlaying(false);
    else el.currentTime = 0;
  }

  const props = {
    "data-cursor": "case-study",
    "data-cursor-pill": cursorLabel,
    "data-cursor-external": external ? "" : undefined,
    className: "block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
    onPointerEnter: (e: PointerEvent) => e.pointerType === "mouse" && canHover() && start(),
    onPointerLeave: stop,
    onFocus: (e: FocusEvent<HTMLAnchorElement>) => e.currentTarget.matches(":focus-visible") && start(),
    onBlur: stop,
  };
  const content = (
    <>
      <div className="relative">
        {poster}
        {video && (
          <video
            ref={videoRef}
            src={video}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            className={`absolute inset-0 size-full object-cover motion-safe:transition-opacity motion-safe:duration-200 ${playing ? "opacity-100" : "opacity-0"}`}
            onPlaying={() => active.current && setPlaying(true)}
            onTransitionEnd={(e) => {
              if (!active.current && e.currentTarget.currentTime > 0) e.currentTarget.currentTime = 0;
            }}
          />
        )}
      </div>
      {children}
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={external.label} {...props}>
      {content}
    </a>
  ) : (
    <Link href={href} {...props}>
      {content}
    </Link>
  );
}
