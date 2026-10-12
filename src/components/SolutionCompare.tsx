import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import CaseImage from "./CaseImage";
import CompareArrow from "./CompareArrow";

type Screen = {
  src: StaticImageData;
  alt: string;
  /** Upright copy for the zoom viewer when `src` is exported tilted. */
  full?: StaticImageData;
};

type Side = {
  /** Serif title under the BEFORE / AFTER label, e.g. "Treeats". */
  title: string;
  /** Bullet points; JSX like <strong>…</strong> is allowed. */
  points: ReactNode[];
};

type Props = {
  before: Side & { screens: [Screen, Screen] };
  after: Side & { screen: Screen };
};

// Treeats Solution, BEFORE → AFTER (Figma 2691:70813, 2691:70823). Two gray
// panels with the arrow centered between them, then a label, title and
// bullet list under each. The before panel overlaps two tilted site
// screenshots, the after panel shows the top of the Treeats Community screen.
// The screenshots are exported tilted with their shadows, so they're placed
// by their full image box, in % of Figma's panel (columns unified to equal
// widths: 364.5 × 307), and open upright in the zoom viewer (`full`).
// Treeats only, like QuitRateChart for ATSB.
// Stacks on phones, each panel above its list.

const SIZES = "(min-width: 768px) 270px, 70vw";

const PLACEMENT = {
  rde: "top-[3.19%] left-[2.83%] w-[65.36%]", // R&DE site, tilted −2.95°
  stanfood: "top-[28.96%] left-[32.35%] w-[66.01%]", // Stanfood, tilted 3°, in front
  community: "top-[0.78%] left-1/2 w-[59.29%] -translate-x-1/2", // clipped by the panel bottom
};

function Panel({ children, arrow = false }: { children: ReactNode; arrow?: boolean }) {
  return (
    <div className="relative aspect-[729/614] rounded-stat border border-figure-border bg-figure-bg">
      <div className="absolute inset-0 overflow-hidden rounded-stat">{children}</div>
      {arrow && (
        <CompareArrow className="absolute top-1/2 left-[calc(100%+var(--spacing-solution-gap)/2)] hidden -translate-1/2 md:block" />
      )}
    </div>
  );
}

function Text({ label, side }: { label: string; side: Side }) {
  return (
    <div className="mt-solution-head">
      <p className="font-mono text-panel-label font-semibold text-figure-ink uppercase">{label}</p>
      <h4 className="mt-1.5 font-serif text-pair-title text-heading">{side.title}</h4>
      <ul className="mt-2.5 list-disc pl-5.25 font-sans text-compare-item text-muted [&_strong]:font-semibold">
        {side.points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

export default function SolutionCompare({ before, after }: Props) {
  const [rde, stanfood] = before.screens;
  return (
    <div className="grid gap-y-10 md:grid-cols-2 md:gap-x-solution-gap">
      <div>
        <Panel arrow>
          <div className={`absolute ${PLACEMENT.rde}`}>
            <CaseImage src={rde.src} alt={rde.alt} full={rde.full} zoomable sizes={SIZES} />
          </div>
          <div className={`absolute ${PLACEMENT.stanfood}`}>
            <CaseImage src={stanfood.src} alt={stanfood.alt} full={stanfood.full} zoomable sizes={SIZES} />
          </div>
        </Panel>
        <Text label="Before" side={before} />
      </div>
      <div>
        <Panel>
          <div className={`absolute ${PLACEMENT.community}`}>
            <CaseImage src={after.screen.src} alt={after.screen.alt} zoomable sizes={SIZES} />
          </div>
        </Panel>
        <Text label="After" side={after} />
      </div>
    </div>
  );
}
