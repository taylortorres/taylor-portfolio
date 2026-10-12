import Image, { type StaticImageData } from "next/image";
import CaseImage from "./CaseImage";

type Site = {
  /** Serif title above the panel, e.g. "Official R&DE site". */
  title: string;
  screen: { src: StaticImageData; alt: string };
  /** Bullets under WORKS GREAT! and COULD BE IMPROVED. */
  works: string[];
  improve: string[];
};

// Treeats Research, existing dining sites (Figma 2691:70967): a row per site
// with its title and a zoomable screenshot on a gray panel, and two short
// lists beside it. Screenshots are cropped inside their exported frame, so
// the 1px border, 6px corners and shadow come from CSS; each sits centered,
// as large as fits in Figma's 89.7% × 92.8% of the 393 × 307 panel. Stacked
// (title, panel, notes) on phones.

const SIZES = "(min-width: 768px) 360px, 90vw";

function Screen({ src, alt }: Site["screen"]) {
  const wide = src.width / src.height > 393 / 307;
  return (
    <div className="relative aspect-[393/307] rounded-stat border border-figure-border bg-figure-bg">
      <div
        style={{ aspectRatio: `${src.width} / ${src.height}` }}
        className={`absolute top-1/2 left-1/2 -translate-1/2 overflow-hidden rounded-screenshot border border-figure-border shadow-site ${wide ? "w-[89.74%]" : "h-[92.78%]"}`}
      >
        <CaseImage src={src} alt={alt} zoomable sizes={SIZES} />
      </div>
    </div>
  );
}

function Notes({ kind, points }: { kind: "works" | "improve"; points: string[] }) {
  const works = kind === "works";
  return (
    <div>
      <p className={`flex items-center gap-1.75 font-mono text-compare-item font-semibold uppercase ${works ? "text-choice-ink" : "text-caution-ink"}`}>
        <span className="flex size-6 shrink-0 items-center justify-center">
          <Image
            src={works ? "/case-study/treeats/icon-works.svg" : "/case-study/treeats/icon-improve.svg"}
            alt=""
            aria-hidden="true"
            width={works ? 18 : 20}
            height={works ? 18 : 20}
          />
        </span>
        {works ? "Works great!" : "Could be improved"}
      </p>
      <ul className="mt-2.5 list-disc pl-5.25 font-sans text-compare-item text-muted">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

export default function SiteReviews({ sites }: { sites: Site[] }) {
  return (
    <div data-sites data-tight className="flex flex-col gap-12 md:gap-site-rows">
      {sites.map((site) => (
        <div key={site.title} className="grid items-center gap-6 md:grid-cols-[393fr_343fr] md:gap-site-gap">
          <div>
            <h3 className="font-serif text-pair-title text-heading">{site.title}</h3>
            <div className="mt-site-head">
              <Screen {...site.screen} />
            </div>
          </div>
          <div className="flex flex-col gap-site-notes">
            <Notes kind="works" points={site.works} />
            <Notes kind="improve" points={site.improve} />
          </div>
        </div>
      ))}
    </div>
  );
}
