"use client";

import { useState } from "react";
import PauseButton from "./PauseButton";
import Zoomable from "./Zoomable";
import { useSyncedVideos } from "@/lib/use-synced-videos";

type Option = {
  /** Panel label, e.g. "Altogether". */
  label: string;
  src: string;
  poster: string;
  /** Describes what the video shows. */
  alt: string;
  width: number;
  height: number;
  /** The option we went with: green panel. */
  chosen?: boolean;
};

type Props = {
  /** Mono line above the question, e.g. "Shuffle demo". */
  eyebrow: string;
  question: string;
  options: Option[];
  /** "✓ Altogether" and why. */
  verdict: { label: string; note: string };
};

// One design decision (Figma 2682:69503): a question, two or three recordings
// side by side that play in sync (useSyncedVideos), each zoomable, and the
// verdict with its reason. The chosen option's panel is green. Back-to-back
// decisions sit 105px apart (beats the section's 64px figure-to-figure gap).
export default function Decision({ eyebrow, question, options, verdict }: Props) {
  const [zoomed, setZoomed] = useState(false);
  const { wrapRef, videoRef, reduced, paused, setPaused } = useSyncedVideos(options.length, zoomed);
  const trio = options.length > 2;

  return (
    <div data-decision className="[[data-decision]+&]:mt-decision-gap">
      <p className="font-mono text-decision-eyebrow font-medium text-figure-ink uppercase">{eyebrow}</p>
      <h4 className="mt-1.5 font-serif text-decision-question text-heading">{question}</h4>

      <div ref={wrapRef} className="relative mt-decision-head">
        <div
          className={`grid ${trio ? "grid-cols-3 gap-2 sm:gap-choice-trio-gap" : "grid-cols-2 gap-3 sm:gap-choice-pair-gap"}`}
        >
          {options.map((o, i) => (
            <figure
              key={o.src}
              className={`flex flex-col items-center rounded-stat px-2 pt-6.25 pb-4 sm:h-choice-h sm:pb-0 ${
                o.chosen ? "border-2 border-choice-border bg-choice-bg" : "border border-figure-border bg-figure-bg"
              }`}
            >
              <figcaption
                className={`text-center font-mono text-choice-label font-semibold uppercase ${o.chosen ? "text-choice-ink" : "text-figure-ink"} ${
                  trio ? "flex min-h-7.5 items-center sm:block sm:min-h-0" : ""
                }`}
              >
                {o.label}
                {o.chosen && <span className="sr-only"> (chosen)</span>}
              </figcaption>
              <div className="mt-2.5 w-full max-w-choice-phone rounded-screen outline -outline-offset-1 outline-chart-card-border">
                <Zoomable
                  label={o.alt}
                  width={o.width}
                  height={o.height}
                  onOpenChange={setZoomed}
                  full={
                    <video
                      src={o.src}
                      poster={o.poster}
                      aria-label={o.alt}
                      autoPlay={!reduced}
                      muted
                      loop
                      playsInline
                      controls
                      className="absolute inset-0 size-full object-contain"
                    />
                  }
                >
                  <video
                    ref={videoRef(i)}
                    src={reduced ? undefined : o.src}
                    poster={o.poster}
                    width={o.width}
                    height={o.height}
                    aria-label={o.alt}
                    muted
                    playsInline
                    preload="none"
                    className="block h-auto w-full rounded-screen"
                  />
                </Zoomable>
              </div>
            </figure>
          ))}
        </div>
        {!reduced && <PauseButton paused={paused} onToggle={() => setPaused((p) => !p)} />}
      </div>

      <p className="mt-verdict-gap font-mono text-verdict font-semibold text-choice-ink uppercase">
        <span aria-hidden="true">✓</span>
        <span className="sr-only">Chosen:</span> {verdict.label}
      </p>
      <p className="mt-2 border-l-2 border-choice-ink pl-2 font-sans text-verdict-note font-medium text-figure-ink">
        {verdict.note}
      </p>
    </div>
  );
}
