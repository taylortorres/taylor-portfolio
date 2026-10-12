import type { ReactNode } from "react";
import BackToTop from "./BackToTop";
import SectionNav from "./SectionNav";
import type { SectionLink } from "@/lib/sections";

type Props = {
  sections: SectionLink[];
  children: ReactNode;
};

// Case study page body: Figma's 306px sticky sidebar beside the content from
// lg, a sticky section bar above it below lg. The 768px column sits 180px
// right of the sidebar from xl (x=486 at 1440, as in Figma) and is centered
// in the space beside the sidebar below that. `#top` is where focus goes after
// BACK TO TOP. Below lg, BACK TO TOP floats in the bottom-right corner.
export default function CaseStudyLayout({ sections, children }: Props) {
  return (
    <div className="lg:grid lg:grid-cols-[var(--spacing-sidebar-w)_minmax(0,1fr)]">
      <SectionNav sections={sections} />
      <article
        id="top"
        tabIndex={-1}
        className="min-w-0 px-4 pb-case-bottom focus:outline-none sm:px-8 lg:px-sidebar-pad xl:pl-case-content-x"
      >
        <div className="mx-auto max-w-case-content-max xl:mx-0">{children}</div>
      </article>
      <BackToTop floating />
    </div>
  );
}
