import type { StaticImageData } from "next/image";
import CaseImage from "./CaseImage";

type Phone = { src: StaticImageData; alt: string; caption: string };

type Props = {
  /** Serif line beside the panel, e.g. "Removing drag altogether and going back to tap". */
  title: string;
  left: Phone;
  right: Phone;
};

// Phone width: 165px in Figma's 442px panel; about a third of the screen on phones.
const SIZES = "(min-width: 640px) 165px, 40vw";

function Screen({ phone }: { phone: Phone }) {
  return (
    <figure>
      <CaseImage src={phone.src} alt={phone.alt} sizes={SIZES} zoomable />
      <figcaption className="mt-3 text-center font-mono text-panel-label font-medium text-figure-ink uppercase">
        {phone.caption}
      </figcaption>
    </figure>
  );
}

// Two zoomable phone screenshots in a gray panel with a serif title beside it
// (Figma 2682:69398). The title sits to the right from xl, as in Figma, and
// above the panel on smaller screens. Back-to-back pairs sit 45px apart
// (beats the section's 64px figure-to-figure gap).
export default function PhonePair({ title, left, right }: Props) {
  return (
    <div
      data-phone-pair
      className="flex flex-col gap-4 xl:flex-row-reverse xl:items-center xl:justify-between [[data-phone-pair]+&]:mt-case-block"
    >
      <h4 className="font-serif text-pair-title text-heading xl:w-pair-title">{title}</h4>
      <div className="grid w-full max-w-pair-panel grid-cols-2 gap-5 rounded-stat border border-figure-border bg-figure-bg px-5 pt-7 pb-8 sm:gap-8 sm:px-9.75">
        <Screen phone={left} />
        <Screen phone={right} />
      </div>
    </div>
  );
}
