"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import BackToTop from "./BackToTop";
import ChipIcon from "./ChipIcon";
import type { SectionLink } from "@/lib/sections";
import { REDUCED_MOTION } from "@/lib/use-media-query";

// Case study navigation. From lg: Figma's sticky left sidebar (node
// 2682:68508) with HOME, the section links and BACK TO TOP. Below lg: a sticky
// top bar with HOME and the current section, which opens the full list.
// Scroll-spy: the section whose top has passed a line near the top of the
// screen is current (the first one at the very top, the last one at the very
// bottom). It gets the purple moon style and
// aria-current. Clicking a link smooth-scrolls there and focuses its heading.

type Props = { sections: SectionLink[] };

// "˖ ִֶָ🌚 ": Figma's sparkle marks and new moon face before the active link.
const MOON = "˖ ִֶָ\u{1F31A} ";
const LINE = 0.25; // share of the viewport height that counts as "reached"
const SETTLE = 120; // ms without scroll events that counts as a finished scroll

function useActiveSection(sections: SectionLink[]) {
  const [active, setActive] = useState(sections[0].id);
  const lockUntilIdle = useRef(false);

  useEffect(() => {
    let frame = 0;
    let idle = 0;
    const compute = () => {
      frame = 0;
      const line = window.innerHeight * LINE;
      let current = sections[0].id;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // A short last section may never reach the line: at the bottom of the
      // page it's current.
      const root = document.documentElement;
      if (window.scrollY + window.innerHeight >= root.scrollHeight - 2) current = sections[sections.length - 1].id;
      setActive(current);
    };
    const onScroll = () => {
      // While a link click is scrolling, keep its section active instead of
      // flickering through the ones in between.
      if (lockUntilIdle.current) {
        clearTimeout(idle);
        idle = window.setTimeout(() => {
          lockUntilIdle.current = false;
          compute();
        }, SETTLE);
        return;
      }
      if (!frame) frame = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(idle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  function jumpTo(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    const instant = window.matchMedia(REDUCED_MOTION).matches;
    lockUntilIdle.current = !instant;
    setActive(id);
    target.scrollIntoView({ behavior: instant ? "instant" : "smooth", block: "start" });
    document.getElementById(`${id}-title`)?.focus({ preventScroll: true });
    history.replaceState(history.state, "", `#${id}`);
  }

  return { active, jumpTo };
}

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const chip = `relative flex w-fit items-center gap-2 rounded-chip bg-chip py-1 pr-1.5 pl-1 font-mono text-chip-label font-medium text-chip-text uppercase before:absolute before:-inset-x-1 before:-inset-y-2 ${focusRing}`;

function HomeChip() {
  return (
    <Link href="/" className={chip}>
      <ChipIcon />
      Home
    </Link>
  );
}

function SectionLinks({
  sections,
  active,
  onPick,
}: {
  sections: SectionLink[];
  active: string;
  onPick: (e: MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  return (
    <ul className="flex flex-col gap-1">
      {sections.map(({ id, title }) => {
        const current = id === active;
        return (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={current ? "location" : undefined}
              onClick={(e) => onPick(e, id)}
              className={`relative block rounded-section px-1.5 py-1 font-sans text-sidebar before:absolute before:inset-x-0 before:-inset-y-0.5 ${focusRing} ${current ? "font-medium text-section-active" : "text-section-idle hover:text-section-active focus-visible:text-section-active"} motion-safe:transition-colors motion-safe:duration-150`}
            >
              {current && <span aria-hidden="true">{MOON}</span>}
              {title}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default function SectionNav({ sections }: Props) {
  const { active, jumpTo } = useActiveSection(sections);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const barRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const activeTitle = sections.find((s) => s.id === active)?.title ?? sections[0].title;

  // Close the phone menu on Escape (focus back on the toggle) or a tap outside.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  function pick(e: MouseEvent<HTMLAnchorElement>, id: string) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // let new-tab clicks through
    e.preventDefault();
    setOpen(false);
    jumpTo(id);
  }

  return (
    <>
      {/* Phone and tablet: sticky bar with the current section. */}
      <div ref={barRef} className="sticky top-0 z-30 lg:hidden">
        <nav aria-label="Case study" className="border-b border-hairline bg-paper">
          <div className="flex h-section-bar items-center justify-between gap-4 px-4">
            <HomeChip />
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((o) => !o)}
              className={`-mr-2 flex h-11 min-w-0 items-center gap-1.5 rounded-section px-2 font-sans text-sidebar font-medium text-section-active ${focusRing}`}
            >
              <span className="sr-only">Sections, current: </span>
              <span aria-hidden="true" className="shrink-0">
                {MOON}
              </span>
              <span className="truncate">{activeTitle}</span>
              <svg
                viewBox="0 0 12 12"
                aria-hidden="true"
                className={`size-3 shrink-0 fill-none stroke-current stroke-[1.5] motion-safe:transition-transform ${open ? "rotate-180" : ""}`}
              >
                <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div
            id={menuId}
            hidden={!open}
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--spacing-section-bar))] overflow-y-auto border-b border-hairline bg-paper px-2.5 py-3"
          >
            <SectionLinks sections={sections} active={active} onPick={pick} />
          </div>
        </nav>
      </div>

      {/* Desktop: Figma's sticky sidebar. */}
      <aside className="hidden lg:block">
        <div className="sticky top-0 flex h-dvh flex-col gap-6 p-sidebar-pad">
          <nav aria-label="Case study" className="flex min-h-0 flex-col gap-6">
            <div className="px-3 py-0.5">
              <HomeChip />
            </div>
            <div className="w-sidebar-list-w overflow-y-auto p-3">
              <SectionLinks sections={sections} active={active} onPick={pick} />
            </div>
          </nav>
          <div className="mt-auto px-3 py-0.5">
            <BackToTop />
          </div>
        </div>
      </aside>
    </>
  );
}
