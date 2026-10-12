import type { StaticImageData } from "next/image";
import CaseImage from "./CaseImage";
import CompareArrow from "./CompareArrow";

type Screen = { src: StaticImageData; alt: string };

type Props = {
  before: Screen;
  after: Screen;
};

const SIZES = "206px";

function Panel({ label, screen }: { label: string; screen: Screen }) {
  return (
    <figure className="relative h-compare-h flex-1 overflow-hidden rounded-stat border border-figure-border bg-figure-bg">
      <figcaption className="absolute top-3.75 left-3.75 font-mono text-panel-label font-semibold text-figure-ink uppercase">
        {label}
      </figcaption>
      <div className="mx-auto -mt-px w-compare-screen max-w-[calc(100%-2*var(--spacing-compare-inset))]">
        <CaseImage src={screen.src} alt={screen.alt} sizes={SIZES} zoomable />
      </div>
    </figure>
  );
}

// BEFORE → AFTER screens (Figma 2682:69383): two equal gray panels with an
// arrow centered between them, each screen centered at the top of its panel.
// In narrower panels the screen shrinks to stay clear of the label.
// Stacked with a downward arrow on phones.
export default function BeforeAfter({ before, after }: Props) {
  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-0">
      <Panel label="Before" screen={before} />
      <CompareArrow className="self-center max-sm:rotate-90 sm:mx-3" />
      <Panel label="After" screen={after} />
    </div>
  );
}
