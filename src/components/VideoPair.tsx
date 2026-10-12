"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/use-in-view";
import { REDUCED_MOTION, useMediaQuery } from "@/lib/use-media-query";

type Clip = {
  src: string;
  poster: string;
  /** Describes what the video shows. */
  label: string;
  width: number;
  height: number;
};

type Props = { left: Clip; right: Clip };

const PRIME_AFTER = 1500; // ms: nudge browsers (iOS) that won't buffer without play()

// Two videos side by side that run as one: they start together once both
// can play through, each plays once, the shorter one holds its last frame
// until the longer one ends, then both rewind and start again together.
// They load when near the screen, play only while on it and pause when it
// scrolls off. Reduced motion shows the posters. A pause button covers WCAG
// 2.2.2 (moving content longer than 5s).
export default function VideoPair({ left, right }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const refs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const near = useInView(wrapRef, { rootMargin: "400px 0px" });
  const inView = useInView(wrapRef);
  const reduced = useMediaQuery(REDUCED_MOTION);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const started = useRef(false);

  // Reduced motion turned on: forget the loaded state (adjusting during render,
  // not in an effect), so turning it off waits for both videos again.
  const [wasReduced, setWasReduced] = useState(reduced);
  if (reduced !== wasReduced) {
    setWasReduced(reduced);
    if (reduced) setReady(false);
  }

  const videos = () => refs.map((r) => r.current).filter((v): v is HTMLVideoElement => v !== null);

  // Load both once they're near the screen, then wait until both can play
  // through. Some browsers only buffer after play(): prime those muted.
  useEffect(() => {
    if (!near || reduced || ready) return;
    const list = videos();
    const check = () => {
      if (list.length === 2 && list.every((v) => v.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA)) {
        list.forEach((v) => v.pause());
        setReady(true);
      }
    };
    list.forEach((v) => {
      v.addEventListener("canplaythrough", check);
      v.preload = "auto";
      if (v.readyState === HTMLMediaElement.HAVE_NOTHING) v.load();
    });
    const prime = window.setTimeout(() => {
      list.forEach((v) => {
        if (v.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA) {
          v.play()
            .then(() => {
              if (!started.current) {
                v.pause();
                v.currentTime = 0;
              }
            })
            .catch(() => {});
        }
      });
    }, PRIME_AFTER);
    check();
    return () => {
      clearTimeout(prime);
      list.forEach((v) => v.removeEventListener("canplaythrough", check));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refs are stable
  }, [near, reduced, ready]);

  // Play while on screen, pause when off it. Both ended (or never started):
  // rewind and start together. Otherwise resume whichever hasn't ended.
  useEffect(() => {
    const list = videos();
    if (!ready || reduced) return;
    if (!inView || paused) {
      list.forEach((v) => v.pause());
      return;
    }
    const restart = () => {
      started.current = true;
      list.forEach((v) => {
        v.pause();
        v.currentTime = 0;
      });
      list.forEach((v) => v.play().catch(() => {}));
    };
    const onEnded = () => {
      if (list.every((v) => v.ended)) restart();
    };
    if (!started.current || list.every((v) => v.ended)) restart();
    else list.forEach((v) => !v.ended && v.play().catch(() => {}));
    list.forEach((v) => v.addEventListener("ended", onEnded));
    return () => list.forEach((v) => v.removeEventListener("ended", onEnded));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refs are stable
  }, [ready, reduced, inView, paused]);

  // Turning reduced motion on mid-play: stop and go back to the posters.
  useEffect(() => {
    if (!reduced) return;
    videos().forEach((v) => {
      v.pause();
      v.load(); // src is gone (see render): back to the poster
    });
    started.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refs are stable
  }, [reduced]);

  return (
    <div ref={wrapRef} className="relative">
      <div className="grid grid-cols-2 items-start gap-gutter">
        {[left, right].map((clip, i) => (
          <video
            key={clip.src}
            ref={refs[i]}
            src={reduced ? undefined : clip.src}
            poster={clip.poster}
            width={clip.width}
            height={clip.height}
            aria-label={clip.label}
            muted
            playsInline
            preload="none"
            className="block h-auto w-full"
          />
        ))}
      </div>
      {!reduced && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="absolute right-2 bottom-2 flex size-11 items-center justify-center rounded-full text-chip-text focus-visible:outline-2 focus-visible:outline-accent"
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-chip">
            <span className="sr-only">Pause videos</span>
            <svg viewBox="0 0 12 12" aria-hidden="true" className="size-3 fill-current">
              {paused ? <path d="M3 1.5v9l7.5-4.5z" /> : <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" />}
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
