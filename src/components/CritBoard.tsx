import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import CaseImage from "./CaseImage";
import StickyNotes, { type Sticky } from "./StickyNotes";

type Card = { title: string; text: ReactNode; tone: "teal" | "purple" };

type Props = {
  /** Mono label at the top left of the board. */
  label: string;
  phone: { src: StaticImageData; alt: string };
  stickies: Sticky[];
  cards: Card[];
};

const TONES = {
  teal: "bg-crit-teal text-crit-teal-text",
  purple: "bg-crit-purple text-paper",
};

// Design Crit feedback (Figma 2682:69457): a gray board with the prototype
// (zoomable) and the crit stickies over it, beside the takeaway cards. The
// board keeps Figma's 420 × 422 proportions and scales on small screens; the
// stickies are placed in % of it. Side by side from xl, stacked below (with
// room under the board for the bottom sticky, which hangs off its edge).
export default function CritBoard({ label, phone, stickies, cards }: Props) {
  return (
    <div className="flex flex-col gap-crit-card-gap xl:flex-row xl:items-start xl:gap-crit-gap">
      <figure className="relative mx-auto aspect-[420/422] w-full max-w-crit-board shrink-0 rounded-stat border border-figure-border bg-figure-bg max-xl:mb-[10%] xl:mx-0">
        <figcaption className="absolute top-4.75 left-4.75 font-mono text-panel-label font-semibold text-figure-ink uppercase">
          {label}
        </figcaption>
        <div className="absolute top-[11.137%] left-[30.952%] w-[38.317%]">
          <CaseImage src={phone.src} alt={phone.alt} sizes="(min-width: 640px) 161px, 40vw" zoomable />
        </div>
        <StickyNotes notes={stickies} />
      </figure>
      <div className="grid gap-crit-card-gap sm:grid-cols-2 xl:w-crit-cards xl:grid-cols-1">
        {cards.map((c) => (
          <div key={c.title} data-cursor="light" className={`grain rounded-stat pt-6.25 pr-4.25 pb-6.75 pl-4 ${TONES[c.tone]}`}>
            <h4 className="font-serif text-crit-card-title text-paper">{c.title}</h4>
            <p className="mt-2 font-sans text-crit-card font-medium">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
