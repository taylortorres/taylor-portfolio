import type { ReactNode } from "react";
import { SECTION_BODY, emphasize } from "@/lib/section-body";

type Props = {
  /** Mono label, e.g. "What’s next". */
  label: string;
  /** Serif headline under it. `*word*` is italic. */
  headline: string;
  children: ReactNode;
};

// A second labeled block inside one sidebar section (Figma's "WHAT’S NEXT"
// inside Shipped & Up Next): same label, headline and body rhythm as a
// <Section>, 64px below what comes before it, without its own sidebar link.
export default function SectionPart({ label, headline, children }: Props) {
  return (
    <div>
      <p className="font-mono text-detail text-muted uppercase">{label}</p>
      <h3 className="mt-case-label-gap font-serif text-section-title-sm text-heading md:text-section-title">{emphasize(headline)}</h3>
      <div className={`mt-case-headline-gap ${SECTION_BODY}`}>{children}</div>
    </div>
  );
}
