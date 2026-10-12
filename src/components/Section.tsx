import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  /** The big serif line under the label, e.g. "Learners expected to tap, not drag". `*word*` is italic. */
  headline?: string;
  children?: ReactNode;
};

// Body rhythm (Figma 2682:69275 and siblings): 23px between paragraphs, 45px
// between text and a figure, 64px between two figures (or a figure and a
// sub-headline). A Markdown `###` is a sub-headline in the headline style,
// 22px above its text. Bold is semibold; <b> is medium (Figma's lighter
// emphasis). A line right after an <Insight> sits 25px below it.
const BODY =
  "font-sans text-case-body text-muted [&_strong]:font-semibold [&_b]:font-medium " +
  "[&>[data-insight]+p]:mt-crit-card-gap " +
  "[&>h3]:font-serif [&>h3]:text-section-title-sm [&>h3]:text-heading md:[&>h3]:text-section-title " +
  "[&>p+p]:mt-case-para [&>h3+p]:mt-case-headline-gap [&>p+:not(p)]:mt-case-block " +
  "[&>:not(p,h3)+p]:mt-case-block [&>:not(p)+:not(p)]:mt-case-gap";

// "why not just *show* them?" → why not just <em>show</em> them?
function emphasize(text: string) {
  return text.split(/\*([^*]+)\*/).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));
}

// One part of a case study: a mono label (the sidebar title), an optional
// serif headline, then the MDX body. Its id and title also become the sidebar
// link (read from the MDX source by getSections). The label takes focus when
// the sidebar jumps here, so keyboard and screen reader users land in place.
export default function Section({ id, title, headline, children }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-[calc(var(--spacing-section-bar)+var(--spacing-stack))] lg:scroll-mt-sidebar-pad"
    >
      <h2 id={`${id}-title`} tabIndex={-1} className="font-mono text-detail text-muted uppercase focus:outline-none">
        {title}
      </h2>
      {headline && (
        <h3 className="mt-case-label-gap font-serif text-section-title-sm text-heading md:text-section-title">{emphasize(headline)}</h3>
      )}
      {children && <div className={`${headline ? "mt-case-headline-gap" : "mt-case-label-gap"} ${BODY}`}>{children}</div>}
    </section>
  );
}
