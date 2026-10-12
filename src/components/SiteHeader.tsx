"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { HIDE_NAV, hideNavForJump } from "@/lib/nav";

const PHONE = "(width < 40rem)"; // below sm the nav is two rows
const PHONE_H = 109; // its height there: always shown within this much of the top
const STEP = 4; // px of scroll in one direction before hiding or showing
const JUMP = 400; // bigger moves in one event are jumps (e.g. a #hash on load): no change

// Sticky site header around <Nav>. It lives in the root layout, outside the
// page template, so it mounts once per full page load: the slide-in and the
// signature play only then, and in-site navigation leaves it in place.
// From sm it is always pinned (64px). On phones it slides away while
// scrolling down and comes back on any scroll up, near the top, on a page
// change, or when focus moves into it; --nav-offset (globals.css) follows, so
// the case study section bar moves up under the screen edge.
export default function SiteHeader({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  // A new page starts at the top with the header showing.
  const [page, setPage] = useState(pathname);
  if (page !== pathname) {
    setPage(pathname);
    setHidden(false);
  }

  useEffect(() => {
    const phone = window.matchMedia(PHONE);
    const root = document.documentElement;
    let lastY = window.scrollY;
    // Update the CSS variable right away (a jump reads scroll-margin before
    // React re-renders), then the state for the slide.
    const set = (h: boolean) => {
      if (h) root.style.setProperty("--nav-offset", "0px");
      else root.style.removeProperty("--nav-offset");
      setHidden(h);
    };
    const onScroll = () => {
      const y = window.scrollY;
      const d = y - lastY;
      lastY = y;
      if (!phone.matches || y <= PHONE_H) return set(false);
      if (Math.abs(d) > JUMP) return;
      if (d > STEP) set(true);
      else if (d < -STEP) set(false);
    };
    const onHide = () => {
      if (!phone.matches) return;
      lastY = window.scrollY;
      set(true);
    };
    // In-page anchor links (e.g. WORK on the home page): hide first if the
    // target is below, like the case study sidebar does.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href*='#']");
      if (!(a instanceof HTMLAnchorElement) || a.pathname !== location.pathname || !a.hash) return;
      hideNavForJump(document.getElementById(decodeURIComponent(a.hash.slice(1))));
    };
    const onChange = () => set(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener(HIDE_NAV, onHide);
    document.addEventListener("click", onClick, true);
    phone.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener(HIDE_NAV, onHide);
      document.removeEventListener("click", onClick, true);
      phone.removeEventListener("change", onChange);
      root.style.removeProperty("--nav-offset");
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.removeProperty("--nav-offset");
  }, [pathname]);

  return (
    <header
      onFocus={() => {
        document.documentElement.style.removeProperty("--nav-offset");
        setHidden(false);
      }}
      className={`sticky top-0 z-40 motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out ${hidden ? "max-sm:-translate-y-full" : ""}`}
    >
      <div className="border-b border-hairline bg-paper motion-safe:animate-nav-enter">{children}</div>
    </header>
  );
}
