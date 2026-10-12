import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import CompareArrow from "./CompareArrow";
import FramedImage, { type Frame } from "./FramedImage";

type Screen = {
  src: StaticImageData;
  alt: string;
  /** Width in % of the panel (Figma's screen width over its panel width). */
  w: number;
  /** Vertical center in % of the panel height (default 50; Figma drops some
   * screens a little to clear the label). */
  y?: number;
  frame?: Frame;
  /** Line under the screen; <strong> is the verdict ("Failed" / "Passed"). */
  caption?: ReactNode;
};

type Props = {
  /** Step number, shown before the title. */
  n: number;
  title: string;
  before: Screen;
  after: Screen;
  /** One line, or several as a bullet list. */
  feedback: string | string[];
  change: string | string[];
};

// One Design Evolution change (Treeats, Figma 2691:71166 and siblings): a
// numbered serif title, a gray BEFORE panel and a green AFTER panel with the
// arrow between them (equal widths, 364.5 × 307, like Solution), then
// FEEDBACK and ✓ CHANGE notes under the matching panels. Each screen is
// framed in CSS and zoomable. Stacked on phones: before, after, notes.

const SIZES = "(min-width: 768px) 330px, 90vw";

function Panel({ label, screen, after = false }: { label: string; screen: Screen; after?: boolean }) {
  const { src, alt, w, y = 50, frame, caption } = screen;
  return (
    <div className="relative aspect-[729/614]">
      <div
        className={`absolute inset-0 overflow-hidden rounded-stat border ${after ? "border-choice-border bg-choice-bg" : "border-figure-border bg-figure-bg"}`}
      >
        <p className={`absolute top-5.75 left-5.75 font-mono text-choice-label font-semibold uppercase ${after ? "text-choice-ink" : "text-figure-ink"}`}>
          {label}
        </p>
        <div style={{ top: `${y}%` }} className="absolute inset-x-0 flex -translate-y-1/2 flex-col items-center">
          <FramedImage src={src} alt={alt} width={w} frame={frame} sizes={SIZES} />
          {caption && (
            <p
              className={`mt-4.75 text-center font-sans text-choice-label font-medium ${after ? "text-choice-note [&_strong]:text-choice-ink" : "text-figure-ink [&_strong]:text-fail-ink"} [&_strong]:font-bold`}
            >
              {caption}
            </p>
          )}
        </div>
      </div>
      {!after && <CompareArrow className="absolute top-1/2 left-[calc(100%+var(--spacing-solution-gap)/2)] hidden -translate-1/2 md:block" />}
    </div>
  );
}

function Notes({ label, items, change = false }: { label: string; items: string | string[]; change?: boolean }) {
  return (
    <div>
      <p className={`font-mono text-compare-item leading-3.75 font-semibold uppercase ${change ? "text-choice-ink" : "text-figure-ink"}`}>{label}</p>
      {Array.isArray(items) ? (
        <ul className="mt-2.5 list-disc pl-5.25 font-sans text-compare-item text-muted">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-2.5 font-sans text-compare-item text-muted">{items}</p>
      )}
    </div>
  );
}

export default function EvolutionStep({ n, title, before, after, feedback, change }: Props) {
  return (
    <div data-step>
      <h3 className="pl-7.5 -indent-7.5 font-serif text-pair-title text-heading">
        <span className="inline-block w-7.5 pr-1.5 text-right">{n}.</span>
        {title}
      </h3>
      <div className="mt-step-head grid gap-6 md:grid-cols-2 md:gap-x-solution-gap">
        <Panel label="Before" screen={before} />
        <Panel label="After" screen={after} after />
      </div>
      <div className="mt-step-notes grid gap-6 md:grid-cols-2 md:gap-x-solution-gap">
        <Notes label="Feedback" items={feedback} />
        <Notes label="✓ Change" items={change} change />
      </div>
    </div>
  );
}
