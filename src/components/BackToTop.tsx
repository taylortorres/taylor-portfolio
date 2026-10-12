"use client";

import { useEffect, useState } from "react";
import ChipIcon from "./ChipIcon";
import { REDUCED_MOTION } from "@/lib/use-media-query";

type Props = {
  /** Phones and tablets: float in the bottom-right corner instead. */
  floating?: boolean;
  /** Element that takes focus after scrolling up (needs tabIndex={-1}). */
  focusId?: string;
};

// "BACK TO TOP" chip from the case study sidebar. Hidden (and inert) until the
// reader has scrolled about one screen, then fades in. Scrolls smoothly to
// the top, or instantly with reduced motion, then moves focus to the top.
export default function BackToTop({ floating = false, focusId = "top" }: Props) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const update = () => setShown(window.scrollY > window.innerHeight * 0.9);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function toTop() {
    const instant = window.matchMedia(REDUCED_MOTION).matches;
    window.scrollTo({ top: 0, behavior: instant ? "instant" : "smooth" });
    document.getElementById(focusId)?.focus({ preventScroll: true });
  }

  return (
    <button
      type="button"
      onClick={toTop}
      inert={!shown}
      className={`${floating ? "fixed right-4 bottom-4 z-30 lg:hidden" : "relative"} flex w-fit items-center gap-2 rounded-chip bg-chip py-1 pr-1.5 pl-1 font-mono text-chip-label font-medium text-chip-text uppercase before:absolute before:-inset-x-1 before:-inset-y-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:transition-opacity motion-safe:duration-300 ${shown ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <ChipIcon up />
      Back to top
    </button>
  );
}
