"use client";

import { useEffect, useState, type RefObject } from "react";
import { REDUCED_MOTION } from "./use-media-query";

// One-time scroll reveal. "static" is the final state (server render, reduced
// motion, or already on screen when the page loaded); "armed" hides it until
// `threshold` of the element is in view; then "shown" plays the entrance once.
export type Reveal = "static" | "armed" | "shown";

export function useRevealOnce(ref: RefObject<Element | null>, threshold: number): Reveal {
  const [state, setState] = useState<Reveal>("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia(REDUCED_MOTION).matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= threshold) {
          setState((s) => (s === "armed" ? "shown" : s));
          observer.disconnect();
        } else {
          setState((s) => (s === "static" ? "armed" : s));
        }
      },
      { threshold: [0, threshold] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return state;
}
