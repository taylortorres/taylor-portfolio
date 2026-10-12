import type { ReactNode } from "react";
import { SECTION_BODY, emphasize } from "@/lib/section-body";

type Props = {
  id: string;
  title: string;
  /** What the page shows above the headline when it differs from the sidebar title (Figma's label), e.g. "🚀 Shipped". */
  label?: string;
  /** The big serif line under the label, e.g. "Learners expected to tap, not drag". `*word*` is italic. */
  headline?: string;
  /** Sidebar item for the top of the page (hero and Impact): renders nothing here. Must be the first section. */
  top?: boolean;
  /** Keep the label for screen readers and the sidebar jump, but don't show it (Props' Reach Out!, whose Figma has none). */
  labelHidden?: boolean;
  children?: ReactNode;
};

// One part of a case study: a mono label (the sidebar title, or `label`), an optional
// serif headline, then the MDX body. Its id and title also become the sidebar
// link (read from the MDX source by getSections). The label takes focus when
// the sidebar jumps here, so keyboard and screen reader users land in place.
// With `top` (Treeats' Overview) the sidebar keeps the item but the page shows
// no label: clicking it scrolls to the top (SectionNav).
export default function Section({ id, title, label, headline, top = false, labelHidden = false, children }: Props) {
  if (top) return null;
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-[calc(var(--nav-offset)+var(--spacing-section-bar)+var(--spacing-stack))] lg:scroll-mt-[calc(var(--nav-offset)+var(--spacing-sidebar-pad))]"
    >
      {/* A display label can hold emoji or kaomoji: screen readers get the plain title. */}
      <h2
        id={`${id}-title`}
        tabIndex={-1}
        aria-label={label ? title : undefined}
        className={`font-mono text-detail text-muted uppercase focus:outline-none ${labelHidden ? "sr-only" : ""}`}
      >
        {label ?? title}
      </h2>
      {headline && (
        <h3 className="mt-case-label-gap font-serif text-section-title-sm text-heading md:text-section-title">{emphasize(headline)}</h3>
      )}
      {children && (
        <div className={`${headline ? "mt-case-headline-gap" : labelHidden ? "" : "mt-case-label-gap"} ${SECTION_BODY}`}>{children}</div>
      )}
    </section>
  );
}
