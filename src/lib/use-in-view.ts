import { useEffect, useState, type RefObject } from "react";

// Whether an element is on screen (any part, by default; at least `threshold`
// of it when one is given). Starts false.
export function useInView(ref: RefObject<Element | null>, options: IntersectionObserverInit = {}) {
  const [inView, setInView] = useState(false);
  const { root, rootMargin, threshold } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // With a threshold, "in view" means at least that much is visible (the
    // browser reports any overlap as intersecting, e.g. on first load).
    const min = Array.isArray(threshold) ? Math.min(...threshold) : (threshold ?? 0);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= min), {
      root,
      rootMargin,
      threshold,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, root, rootMargin, threshold]);

  return inView;
}
