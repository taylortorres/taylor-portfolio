"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { RAISE_CURSOR } from "./CustomCursor";
import { REDUCED_MOTION } from "@/lib/use-media-query";

type Props = {
  /** Accessible name of the media, e.g. the image's alt text. */
  label: string;
  /** Intrinsic size of the media, used to fit it to the screen. */
  width: number;
  height: number;
  /** The inline media (thumbnail). */
  children: ReactNode;
  /** What the viewer shows. Only mounted while open, so full-res loads then. */
  full: ReactNode;
  onOpenChange?: (open: boolean) => void;
};

const MS = 250; // open/close duration (matches the duration-250 classes)

// Zoom viewer (lightbox). The inline media is a button; clicking or tapping it
// opens a modal <dialog> (aria-modal, focus kept inside by the browser) with
// the media centered over a blurred scrim. Clicking outside the media,
// pressing Escape or the close button fades it out, unlocks scrolling at the
// same spot and returns focus to the button.
export default function Zoomable({ label, width, height, children, full, onOpenChange }: Props) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef(0);
  const closing = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!mounted || !dialog) return;
    const root = document.documentElement;
    const gap = window.innerWidth - root.clientWidth; // keep the layout still when the scrollbar goes
    const before = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };
    root.style.overflow = "hidden";
    if (gap > 0) root.style.paddingRight = `${gap}px`;
    dialog.showModal();
    document.dispatchEvent(new Event(RAISE_CURSOR)); // keep the custom cursor above the dialog
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => {
      cancelAnimationFrame(frame);
      root.style.overflow = before.overflow;
      root.style.paddingRight = before.paddingRight;
    };
  }, [mounted]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  function open() {
    setMounted(true);
    onOpenChange?.(true);
  }

  // Fade out, then close the dialog; its close event finishes up. Chrome can
  // also close it natively (a second Escape), which lands in finish() too.
  function close() {
    if (closing.current) return;
    closing.current = true;
    setVisible(false);
    const delay = window.matchMedia(REDUCED_MOTION).matches ? 0 : MS;
    closeTimer.current = window.setTimeout(() => dialogRef.current?.close(), delay);
  }

  function finish() {
    clearTimeout(closeTimer.current);
    closing.current = false;
    setVisible(false);
    setMounted(false);
    triggerRef.current?.focus({ preventScroll: true });
    onOpenChange?.(false);
  }

  const fade = `motion-safe:transition motion-safe:duration-250 motion-safe:ease-out ${visible ? "opacity-100" : "opacity-0"}`;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        data-zoomable
        aria-haspopup="dialog"
        aria-label={`Enlarge: ${label}`}
        onClick={open}
        className="block w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        {children}
      </button>
      {mounted && (
        <dialog
          ref={dialogRef}
          aria-modal="true"
          aria-label={label}
          onCancel={(e) => {
            e.preventDefault(); // Escape: animate out instead of closing at once
            close();
          }}
          onClose={finish}
          onClick={(e) => {
            if (!mediaRef.current?.contains(e.target as Node)) close();
          }}
          className="lightbox fixed inset-0 m-0 size-full max-h-none max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-transparent"
        >
          <div data-scrim aria-hidden="true" className={`absolute inset-0 bg-scrim backdrop-blur-md ${fade}`} />
          <button
            type="button"
            onClick={close}
            className={`absolute top-2 right-2 z-10 flex size-11 items-center justify-center rounded-full text-paper focus-visible:outline-2 focus-visible:outline-paper ${fade}`}
          >
            <span className="sr-only">Close</span>
            <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4 fill-none stroke-current stroke-[1.5]">
              <path d="m3 3 10 10M13 3 3 13" strokeLinecap="round" />
            </svg>
          </button>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-(--lightbox-pad)">
            <div
              ref={mediaRef}
              style={{
                aspectRatio: `${width} / ${height}`,
                width: `min(100%, (100dvh - 2 * var(--lightbox-pad)) * ${width / height}, ${width}px)`,
              }}
              className={`pointer-events-auto relative ${fade} ${visible ? "scale-100" : "scale-95"}`}
            >
              {full}
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
