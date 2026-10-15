import type { Heading } from "../../content/about";

// About page section heading (Figma 2801:5783, 2804:5826, 2804:11929): serif
// medium italic. The leading kaomoji or symbol is decorative, so screen
// readers hear only the words. "[°◉]" is upright in Figma; the others italic.
export default function AboutHeading({ heading, id }: { heading: Heading; id: string }) {
  return (
    <h2 id={id} className="font-display text-about-heading-sm font-medium text-ink italic lg:text-about-heading">
      <span aria-hidden="true" className={heading.markItalic ? "" : "font-normal not-italic"}>
        {heading.mark}
      </span>{" "}
      {heading.text}
    </h2>
  );
}
