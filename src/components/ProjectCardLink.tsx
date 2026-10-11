"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";

// The whole project card is one link. With a mouse hover or keyboard focus,
// the preview video loads, plays and crossfades over the poster. Leaving fades
// back to the poster, then pauses and rewinds. Touch devices and reduced
// motion only ever show the poster.

type Props = {
  href: string;
  video?: string;
  poster: ReactNode;
  children: ReactNode;
};

const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function ProjectCardLink({ href, video, poster, children }: Props) {
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

  return (
    <Link
      href={href}
      data-cursor="case-study"
      className="block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      onPointerEnter={(e) => e.pointerType === "mouse" && canHover() && start()}
      onPointerLeave={stop}
      onFocus={(e) => e.currentTarget.matches(":focus-visible") && start()}
      onBlur={stop}
    >
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
    </Link>
  );
}
