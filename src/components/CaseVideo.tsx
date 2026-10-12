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
  /** Buffers once it is within one screen of the viewport, starts once a quarter is on screen (so it is already moving when it arrives), and pauses and rewinds once fully off screen. */
  playEarly?: boolean;
  /** Pause button in the corner (WCAG 2.2.2, for loops longer than 5s). */
  pausable?: boolean;
};

// Case study video: muted loop that plays only while on screen. Nothing
// downloads until then (preload="none"; play() starts the download), so a
// page of videos costs only its posters up front. With reduced motion it
// shows the poster. With `zoomable`, the viewer plays it large with
// controls while the inline copy pauses. `playEarly` and `pausable` are the
// Treeats feature recordings' rules (see Props); other videos keep the
// default above.
const NEAR = { rootMargin: "100% 0px" }; // one viewport height above and below
const QUARTER = { threshold: 0.25 };

export default function CaseVideo({
  src,
  label,
  width,
  height,
  poster,
  zoomable = false,
  fullSrc = src,
  className = "",
  playEarly = false,
  pausable = false,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref);
  const near = useInView(ref, NEAR);
  const quarter = useInView(ref, QUARTER);
  const reduced = useMediaQuery(REDUCED_MOTION);
  const [zoomed, setZoomed] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const stopped = reduced || zoomed || paused;
    if (!playEarly) {
      if (inView && !stopped) video.play().catch(() => {});
      else video.pause();
      return;
    }
    if (quarter && !stopped) video.play().catch(() => {});
    else if (!inView || stopped) video.pause();
    if (!inView && video.currentTime > 0) video.currentTime = 0;
  }, [inView, quarter, reduced, zoomed, paused, playEarly]);

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
      preload={playEarly && near && !reduced ? "auto" : "none"}
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
