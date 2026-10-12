import type { ReactNode } from "react";
import BackToTop from "./BackToTop";
import SectionNav from "./SectionNav";
import type { SectionLink } from "@/lib/sections";

type Props = {
  sections: SectionLink[];
  children: ReactNode;
};

// Case study page body: Figma's 306px sticky sidebar beside the content from
// lg, a sticky section bar above it below lg. `#top` is where focus goes after
// BACK TO TOP. Below lg, BACK TO TOP floats in the bottom-right corner.
export default function CaseStudyLayout({ sections, children }: Props) {
  return (
    <div className="lg:grid lg:grid-cols-[var(--spacing-sidebar-w)_minmax(0,1fr)]">
      <SectionNav sections={sections} />
      <article
        id="top"
        tabIndex={-1}
        className="mx-auto w-full max-w-case-content-max px-4 pt-6 pb-section-gap focus:outline-none sm:px-8 lg:mx-0 lg:px-sidebar-pad lg:pt-sidebar-pad"
      >
        {children}
      </article>
      <BackToTop floating />
    </div>
  );
}
