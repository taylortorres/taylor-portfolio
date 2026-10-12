"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "./use-in-view";
import { REDUCED_MOTION, useMediaQuery } from "./use-media-query";

const PRIME_AFTER = 1500; // ms: nudge browsers (iOS) that won't buffer without play()

// Two or more videos that run as one: they start together once all can play
// through, each plays once, the shorter ones hold their last frame until the
// longest ends, then all rewind and start again together. They load when near
// the screen, play only while on it and pause when it scrolls off (or while
// `hold` is set, e.g. one of them is open in the zoom viewer). Reduced motion
// keeps the posters: render `src` only when `reduced` is false.
export function useSyncedVideos(count: number, hold = false) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLVideoElement | null)[]>([]);
  const near = useInView(wrapRef, { rootMargin: "400px 0px" });
  const inView = useInView(wrapRef);
  const reduced = useMediaQuery(REDUCED_MOTION);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const started = useRef(false);

  // Reduced motion turned on: forget the loaded state (adjusting during render,
  // not in an effect), so turning it off waits for every video again.
  const [wasReduced, setWasReduced] = useState(reduced);
  if (reduced !== wasReduced) {
    setWasReduced(reduced);
    if (reduced) setReady(false);
  }

  const videoRef = useCallback(
    (i: number) => (el: HTMLVideoElement | null) => {
      els.current[i] = el;
    },
    [],
  );
  const videos = () => els.current.slice(0, count).filter((v): v is HTMLVideoElement => v !== null);

  // Load all once they're near the screen, then wait until all can play
  // through. Some browsers only buffer after play(): prime those muted.
  useEffect(() => {
    if (!near || reduced || ready) return;
    const list = videos();
    const check = () => {
      if (list.length === count && list.every((v) => v.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA)) {
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
  }, [near, reduced, ready, count]);

  // Play while on screen, pause when off it. All ended (or never started):
  // rewind and start together. Otherwise resume whichever hasn't ended.
  useEffect(() => {
    const list = videos();
    if (!ready || reduced) return;
    if (!inView || paused || hold) {
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
  }, [ready, reduced, inView, paused, hold]);

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

  return { wrapRef, videoRef, reduced, paused, setPaused };
}
