// ATSB "quits spike at launch" chart (Figma 2682:69340): a gray panel with a
// white card, real text for the labels and an SVG plot. The plot stretches
// to the card width at a fixed 146px height (non-scaling strokes keep the
// lines 1px), so the annotations stay readable on phones, where the second
// one moves to the empty top-right corner to stay off the squeezed line.
// Coordinates are Figma's: the plot box is x 56–630, y 111–257 of the card.

const RED_LINE =
  "M0.293 21.541L41.793 51.541L80.793 0.541L121.793 7.041L161.793 9.041L201.793 30.041L242.293 43.541L282.293 48.541L322.293 73.541L362.293 69.041L402.793 57.041L442.793 69.541L483.293 76.041L523.293 79.041";
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

export default function QuitRateChart() {
  return (
    <figure className="rounded-stat border border-figure-border bg-figure-bg px-3 py-4 md:px-9.75 md:pt-8.75 md:pb-8.75">
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
            <path d={RED_LINE} transform="translate(45.207 23.647)" className="stroke-chart-up" />
            <path d={BLUE_LINE} transform="translate(45.963 109.184)" className="stroke-chart-base" />
          </svg>
          <p className="absolute top-0 left-[22.125%] w-32 -translate-x-1/2 text-center font-sans text-chart-note font-semibold text-chart-up">
            quits spike at launch
          </p>
          <p className="absolute top-0 right-0 max-w-28 text-right font-sans text-chart-note font-semibold text-chart-up md:top-14.5 md:right-auto md:left-[81.18%] md:max-w-none md:-translate-x-1/2 md:text-center md:whitespace-nowrap">
            gap narrows as learners adapt
          </p>
        </div>

        <p className="mt-2.75 flex justify-between font-mono text-chart-label text-muted uppercase">
          <span>April 14</span>
          <span>April 28</span>
        </p>
      </div>

      <figcaption className="mt-7 text-center font-mono text-case-body font-medium text-chart-gray uppercase">
        TL;DR: Learners are giving up :(
      </figcaption>
      <p className="sr-only">
        Line chart, April 14 to April 28. With ATSB, the total stories quit rate spiked at launch, about 21% above the
        baseline, then the gap narrowed as learners adapted.
      </p>
    </figure>
  );
}
