"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ABOUT_MOTION } from "@/lib/about-motion";
import { graphemes } from "@/lib/graphemes";
import { REDUCED_MOTION } from "@/lib/use-media-query";
import type { Heading } from "../../content/about";

// Fired on the heading when its typing has finished (AboutBigOn waits for it).
export const HEADING_TYPED = "about-heading-typed";


// "static": shown complete (server render, no JavaScript, reduced motion, or
// already scrolled past on load). "armed": not reached yet, waiting.
// "typing": being typed. "done": typed.
type Phase = "static" | "armed" | "typing" | "done";

// About page section heading (Figma 2801:5783, 2804:5826, 2804:11929): serif
// medium italic. The leading kaomoji or symbol is decorative, so screen
// readers hear only the words. "[°◉]" is upright in Figma; the others italic.
// With `typed`, it types itself out once, character by character (whole
// graphemes, so kaomoji never split), once the whole heading is inside the top
// 65% of the screen (right away if it's already there at load). The untyped
// rest stays in place but invisible, so nothing moves; the visible copy is
// aria-hidden and screen readers get the full words at once.
// It also tells its section (`data-reveal-scope`) where it is, as
// data-reveal: "armed" and "typing" hold the section's content
// (data-reveal-item) hidden, "shown" blurs it in, "static" leaves it alone
// (CSS in globals.css). Each item is marked data-revealed once its blur-in
// has ended, so its hover can start.
export default function AboutHeading({ heading, id, typed = false }: { heading: Heading; id: string; typed?: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [phase, setPhase] = useState<Phase>("static");
  const phaseRef = useRef<Phase>("static");
  const go = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };
  const [count, setCount] = useState(0);

  const mark = graphemes(heading.mark);
  const text = graphemes(` ${heading.text}`);
  const total = mark.length + text.length;

  // Decide before the first paint after React starts: still ahead → armed, scrolled past → static.
  // Until then (server HTML, with JavaScript on) CSS keeps the heading text and content hidden,
  // so nothing is ever painted and then taken away.
  // A link to something further down (#experience-heading) counts as already scrolled past:
  // the smooth jump there would otherwise trigger every heading it passes.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!typed || !el || window.matchMedia(REDUCED_MOTION).matches) return;
    const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
    const jumpingPast = target && target !== el && el.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING;
    if (!jumpingPast && el.getBoundingClientRect().top > 0) go("armed");
  }, [typed]);

  useEffect(() => {
    const el = ref.current;
    if (!typed || !el || window.matchMedia(REDUCED_MOTION).matches) return;
    let timer: number | undefined;
    let first = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Already above the screen on the first report (scrolled past): complete, nothing to type.
        if (first && entry.boundingClientRect.top <= 0 && phaseRef.current === "armed") {
          observer.disconnect();
          go("static");
          return;
        }
        first = false;
        if (entry.intersectionRatio < ABOUT_MOTION.headingThreshold) return;
        observer.disconnect();
        if (phaseRef.current !== "armed") return;
        go("typing");
        let n = 0;
        timer = window.setInterval(() => {
          n += 1;
          setCount(n);
          if (n >= total) {
            window.clearInterval(timer);
            go("done");
            el.dispatchEvent(new Event(HEADING_TYPED));
          }
        }, ABOUT_MOTION.headingTypeMsPerChar);
      },
      { threshold: [0, ABOUT_MOTION.headingThreshold], rootMargin: ABOUT_MOTION.headingRootMargin },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [typed, total]);

  useLayoutEffect(() => {
    const scope = ref.current?.closest("[data-reveal-scope]");
    if (!typed || !scope) return;
    scope.setAttribute("data-reveal", phase === "done" ? "shown" : phase);
  }, [typed, phase]);

  useEffect(() => {
    const scope = ref.current?.closest("[data-reveal-scope]");
    if (!typed || !scope) return;
    const onEnd = (e: Event) => {
      const item = (e.target as Element).closest("[data-reveal-item]");
      if (item && e.target === item && (e as AnimationEvent).animationName === "intro-in") item.setAttribute("data-revealed", "");
    };
    scope.addEventListener("animationend", onEnd);
    return () => scope.removeEventListener("animationend", onEnd);
  }, [typed]);

  const shown = phase === "armed" ? 0 : phase === "typing" ? count : total;
  const markShown = Math.min(shown, mark.length);
  const textShown = Math.max(0, shown - mark.length);
  // The caret follows the last typed character, in the mark or in the words.
  const caret = phase === "typing" && <span data-heading-caret />;

  return (
    <h2
      ref={ref}
      id={id}
      data-typing={phase === "armed" || phase === "typing" || undefined}
      className="font-display text-about-heading-sm font-medium text-ink italic lg:text-about-heading"
    >
      <span className="sr-only">{heading.text}</span>
      <span aria-hidden="true" data-heading-visual={typed || undefined}>
        <span className={heading.markItalic ? "" : "font-normal not-italic"}>
          {mark.slice(0, markShown).join("")}
          {markShown < mark.length && caret}
          <span className="invisible">{mark.slice(markShown).join("")}</span>
        </span>
        {text.slice(0, textShown).join("")}
        {markShown === mark.length && caret}
        <span className="invisible">{text.slice(textShown).join("")}</span>
      </span>
    </h2>
  );
}
