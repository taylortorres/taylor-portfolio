"use client";

import { useEffect, useRef, useState } from "react";
import { useRevealOnce } from "@/lib/use-reveal-once";

// ATSB "quits spike at launch" chart (Figma 2682:69340): a gray panel with a
// white card, real text for the labels and an SVG plot. The plot stretches
// to the card width at a fixed 146px height (non-scaling strokes keep the
// lines 1px), so the annotations stay readable on phones, where the second
// one moves to the empty top-right corner to stay off the squeezed line.
// Coordinates are Figma's: the plot box is x 56–630, y 111–257 of the card.
// Motion (once, when 60% is in view): the red line draws left to right over
// 1.6s; "quits spike at launch" fades in as it reaches the spike, "gap narrows"
// near the end. Grid, baseline and header stay still. Reduced motion, or the
// chart already on screen at load, shows the final state.

// From design-assets/story_beats/quit rate line.svg (one stroked path).
const RED_LINE =
  "M0.292969 21.5405L41.793 51.5405L80.793 0.540527L121.793 7.04053L161.793 9.04053L201.793 30.0405L242.293 43.5405L282.293 48.5405L322.293 73.5405L362.293 69.0405L402.793 57.0405L442.793 69.5405L483.293 76.0405L523.293 79.0405";
const RED_POINTS = [...RED_LINE.matchAll(/[\d.]+ [\d.]+/g)].map(([pair]) => pair.split(" ").map(Number));
const SPIKE = 2; // index of the spike's peak in RED_POINTS
const DRAW_MS = 1600;
const GAP_NOTE_AT = 0.85; // share of the line drawn when "gap narrows" fades in
const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2; // easeInOutSine
const BLUE_LINE =
  "M0.037 15.004L40.537 18.004L80.537 6.004L120.537 12.504L160.537 6.004L201.037 9.004H241.537L281.037 13.504L321.537 12.504L361.537 7.504L402.037 3.504L441.537 0.504L482.537 9.004L522.537 3.504";

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <li className="flex items-center gap-1.5">
      <span aria-hidden="true" className={`size-2.5 ${swatch}`} />
      {label}
    </li>
  );
}

// The line's length on screen, in px, up to each point. The plot stretches
// horizontally and the stroke doesn't scale, so dashes are in screen px.
function screenLengths(svg: SVGSVGElement) {
  const { width, height } = svg.getBoundingClientRect();
  const sx = width / 574;
  const sy = height / 146;
  const lengths = [0];
  for (let i = 1; i < RED_POINTS.length; i++) {
    const [x0, y0] = RED_POINTS[i - 1];
    const [x1, y1] = RED_POINTS[i];
    lengths.push(lengths[i - 1] + Math.hypot((x1 - x0) * sx, (y1 - y0) * sy));
  }
  return lengths;
}

export default function QuitRateChart() {
  const figRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const reveal = useRevealOnce(figRef, 0.6);
  const [notes, setNotes] = useState(0); // annotations shown so far while drawing

  useEffect(() => {
    const svg = svgRef.current;
    const line = lineRef.current;
    if (!svg || !line || reveal === "static") return;
    const lengths = screenLengths(svg);
    const total = lengths[lengths.length - 1];
    line.style.strokeDasharray = `${total} ${total}`;
    line.style.strokeDashoffset = `${total}`;
    if (reveal === "armed") return;

    const spikeAt = lengths[SPIKE] / total;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / DRAW_MS, 1);
      const drawn = ease(t);
      line.style.strokeDashoffset = `${total * (1 - drawn)}`;
      setNotes(drawn >= GAP_NOTE_AT ? 2 : drawn >= spikeAt ? 1 : 0);
      if (t < 1) frame = requestAnimationFrame(tick);
      else line.style.strokeDasharray = line.style.strokeDashoffset = ""; // done: plain line again
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reveal]);

  const noteClass = (n: number) =>
    reveal === "static" ? "" : `transition-opacity duration-400 ${notes >= n ? "opacity-100" : "opacity-0"}`;

  return (
    <figure ref={figRef} className="rounded-stat border border-figure-border bg-figure-bg px-3 py-4 md:px-9.75 md:pt-8.75 md:pb-8.75">
      <div className="max-w-chart-card-max rounded-chart border border-chart-card-border bg-paper px-4 pt-7.75 pb-7.75 md:pr-14 md:pl-13.75">
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4 font-mono uppercase">
          <div>
            <p className="text-chart-label text-muted">Total stories quit rate</p>
            <p className="mt-1 text-case-body font-medium text-muted">
              <span className="text-chart-up">+21%</span> more quits than baseline
            </p>
          </div>
          <ul className="flex flex-col gap-1.5 text-chart-label text-muted md:-mr-6.25 md:w-22">
            <Legend swatch="bg-chart-up" label="With ATSB" />
            <Legend swatch="bg-chart-base" label="Baseline" />
          </ul>
        </div>

        <div className="relative mt-10 h-36.5">
          <svg
            ref={svgRef}
            aria-hidden="true"
            viewBox="0 0 574 146"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full overflow-visible fill-none [&_*]:[vector-effect:non-scaling-stroke]"
          >
            <g className="stroke-chart-grid" opacity="0.4">
              <line x1="0" x2="574" y1="6.5" y2="6.5" strokeDasharray="3 3" strokeOpacity="0.4" />
              <line x1="0" x2="574" y1="51.5" y2="51.5" strokeDasharray="3 3" />
              <line x1="0" x2="574" y1="100.5" y2="100.5" strokeDasharray="3 3" />
              <line x1="0" x2="574" y1="145.5" y2="145.5" />
            </g>
            <path ref={lineRef} d={RED_LINE} transform="translate(45.207 23.647)" className="stroke-chart-up" />
            <path d={BLUE_LINE} transform="translate(45.963 109.184)" className="stroke-chart-base" />
          </svg>
          <p
            className={`absolute top-0 left-[22.125%] w-32 -translate-x-1/2 text-center font-sans text-chart-note font-semibold text-chart-up ${noteClass(1)}`}
          >
            quits spike at launch
          </p>
          <p
            className={`absolute top-0 right-0 max-w-28 text-right font-sans text-chart-note font-semibold text-chart-up md:top-14.5 md:right-auto md:left-[81.18%] md:max-w-none md:-translate-x-1/2 md:text-center md:whitespace-nowrap ${noteClass(2)}`}
          >
            gap narrows as learners adapt
          </p>
        </div>

        <p className="mt-2.75 flex justify-between font-mono text-chart-label text-muted uppercase">
          <span>April 14</span>
          <span>April 28</span>
        </p>
      </div>

      <figcaption className="mt-7 text-center font-mono text-case-body font-medium text-figure-ink uppercase">
        TL;DR: Learners are giving up :(
      </figcaption>
      <p className="sr-only">
        Line chart, April 14 to April 28. With ATSB, the total stories quit rate spiked at launch, about 21% above the
        baseline, then the gap narrowed as learners adapted.
      </p>
    </figure>
  );
}
