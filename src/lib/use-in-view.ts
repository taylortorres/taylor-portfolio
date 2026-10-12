import { useEffect, useState, type RefObject } from "react";

// Whether an element is on screen (any part, by default). Starts false.
export function useInView(ref: RefObject<Element | null>, options: IntersectionObserverInit = {}) {
  const [inView, setInView] = useState(false);
  const { root, rootMargin, threshold } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      root,
      rootMargin,
      threshold,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, root, rootMargin, threshold]);

  return inView;
}
