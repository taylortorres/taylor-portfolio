import type { ReactNode } from "react";
import { SECTION_BODY, emphasize } from "@/lib/section-body";

type Props = {
  /** Mono label, e.g. "What’s next". */
  label: string;
  /** Serif headline under it. `*word*` is italic. */
  headline: string;
  /** "sm": a 24px headline 32px above its body (Treeats concept validation). */
  size?: "md" | "sm";
  children: ReactNode;
};

// A second labeled block inside one sidebar section (Figma's "WHAT’S NEXT"
// inside Shipped & Up Next): same label, headline and body rhythm as a
// <Section>, 64px below what comes before it, without its own sidebar link.
export default function SectionPart({ label, headline, size = "md", children }: Props) {
  const sm = size === "sm";
  return (
    <div>
      <p className="font-mono text-detail text-muted uppercase">{label}</p>
      <h3
        className={`mt-case-label-gap font-serif text-heading ${sm ? "text-lesson-title" : "text-section-title-sm md:text-section-title"}`}
      >
        {emphasize(headline)}
      </h3>
      <div className={`${sm ? "mt-headline-sm-gap" : "mt-case-headline-gap"} ${SECTION_BODY}`}>{children}</div>
    </div>
  );
}
