"use client";

import { useEffect, useRef, useState } from "react";
import PauseButton from "./PauseButton";
import Zoomable from "./Zoomable";
import { useInView } from "@/lib/use-in-view";
import { REDUCED_MOTION, useMediaQuery } from "@/lib/use-media-query";

type Props = {
  src: string;
  /** Describes what the video shows. */
  label: string;
  width: number;
  height: number;
  poster?: string;
  /** Opens in the zoom viewer when clicked. */
  zoomable?: boolean;
  /** Bigger version for the viewer; only loaded when it opens. */
  fullSrc?: string;
  /** Extra classes for the inline video (e.g. rounded corners). */
  className?: string;
  /** Loads about 400px before the screen, starts once half is on screen, and pauses and rewinds once off screen. */
  playAtHalf?: boolean;
  /** Pause button in the corner (WCAG 2.2.2, for loops longer than 5s). */
  pausable?: boolean;
};

// Case study video: muted loop that plays only while on screen. Nothing
// downloads until then (preload="none"; play() starts the download), so a
// page of videos costs only its posters up front. With reduced motion it
// shows the poster. With `zoomable`, the viewer plays it large with
// controls while the inline copy pauses. `playAtHalf` and `pausable` are the
// Treeats feature recordings' stricter rules (see Props).
const NEAR = { rootMargin: "400px 0px" };
const HALF = { threshold: 0.5 };

export default function CaseVideo({
  src,
  label,
  width,
  height,
  poster,
  zoomable = false,
  fullSrc = src,
  className = "",
  playAtHalf = false,
  pausable = false,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref);
  const near = useInView(ref, NEAR);
  const half = useInView(ref, HALF);
  const reduced = useMediaQuery(REDUCED_MOTION);
  const [zoomed, setZoomed] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const stopped = reduced || zoomed || paused;
    if (!playAtHalf) {
      if (inView && !stopped) video.play().catch(() => {});
      else video.pause();
      return;
    }
    if (half && !stopped) video.play().catch(() => {});
    else if (!inView || stopped) video.pause();
    if (!inView && video.currentTime > 0) video.currentTime = 0;
  }, [inView, half, reduced, zoomed, paused, playAtHalf]);

  const inline = (
    <video
      ref={ref}
      src={src}
      poster={poster}
      width={width}
      height={height}
      aria-label={label}
      muted
      loop
      playsInline
      preload={playAtHalf && near && !reduced ? "auto" : "none"}
      className={`block h-auto w-full ${className}`}
    />
  );
  const button = pausable && !reduced && (
    <PauseButton paused={paused} onToggle={() => setPaused((p) => !p)} label="Pause video" />
  );
  if (!zoomable) {
    return button ? (
      <div className="relative">
        {inline}
        {button}
      </div>
    ) : (
      inline
    );
  }

  const zoom = (
    <Zoomable
      label={label}
      width={width}
      height={height}
      onOpenChange={setZoomed}
      full={
        <video
          src={fullSrc}
          poster={poster}
          aria-label={label}
          autoPlay={!reduced}
          muted
          loop
          playsInline
          controls
          className="absolute inset-0 size-full object-contain"
        />
      }
    >
      {inline}
    </Zoomable>
  );
  return button ? (
    <div className="relative">
      {zoom}
      {button}
    </div>
  ) : (
    zoom
  );
}
