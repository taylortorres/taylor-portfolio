import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  children?: ReactNode;
};

// One part of a case study. Its id and title also become the sidebar link
// (read from the MDX source by getSections). The heading takes focus when the
// sidebar jumps here, so keyboard and screen reader users land in place.
export default function Section({ id, title, children }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-[calc(var(--spacing-section-bar)+var(--spacing-stack))] lg:scroll-mt-sidebar-pad"
    >
      {/* PROVISIONAL heading style until the case study content frame is in Figma. */}
      <h2 id={`${id}-title`} tabIndex={-1} className="font-serif text-title text-heading focus:outline-none">
        {title}
      </h2>
      {children}
    </section>
  );
}
