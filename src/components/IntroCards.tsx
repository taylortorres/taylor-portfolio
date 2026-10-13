"use client";

import { useEffect } from "react";

// During the home intro (html.intro), project cards visible on load follow
// the CSS timeline. Cards below the fold wait (data-intro-wait: held in the
// start state, offscreen so nothing visibly changes) and play the same
// blur-in once, as they scroll into view.
export default function IntroCards() {
  useEffect(() => {
    if (!document.documentElement.classList.contains("intro")) return;
    const cards = [...document.querySelectorAll<HTMLElement>("[data-intro='card']")];
    const below = cards.filter((el) => el.getBoundingClientRect().top >= window.innerHeight);
    if (below.length === 0) return;
    below.forEach((el) => el.setAttribute("data-intro-wait", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const { isIntersecting, target } of entries) {
          if (!isIntersecting) continue;
          target.removeAttribute("data-intro-wait");
          target.setAttribute("data-intro-now", "");
          observer.unobserve(target);
        }
      },
      { threshold: 0.15 },
    );
    below.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}
