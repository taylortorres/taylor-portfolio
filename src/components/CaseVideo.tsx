"use client";

import { useEffect, useRef, useState } from "react";
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
};

// Case study video: muted loop that plays only while on screen. Nothing
// downloads until then (preload="none"; play() starts the download), so a
// page of videos costs only its posters up front. With reduced motion it
// shows the poster. With `zoomable`, the viewer plays it large with
// controls while the inline copy pauses.
export default function CaseVideo({
  src,
  label,
  width,
  height,
  poster,
  zoomable = false,
  fullSrc = src,
  className = "",
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref);
  const reduced = useMediaQuery(REDUCED_MOTION);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (inView && !reduced && !zoomed) video.play().catch(() => {});
    else video.pause();
  }, [inView, reduced, zoomed]);

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
      preload="none"
      className={`block h-auto w-full ${className}`}
    />
  );
  if (!zoomable) return inline;

  return (
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
}
