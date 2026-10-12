// Body rhythm of a case study section and of a <SectionPart> inside one
// (Figma 2682:69275 and siblings): 23px between paragraphs, 45px
// between text and a figure, 64px between two figures (or a figure and a
// sub-headline). A Markdown `###` is a sub-headline in the headline style,
// 22px above its text. Bold is semibold; <b> is medium (Figma's lighter
// emphasis). A line right after an <Insight> sits 25px below it.
export const SECTION_BODY =
  "font-sans text-case-body text-muted [&_strong]:font-semibold [&_b]:font-medium " +
  "[&>[data-insight]+p]:mt-crit-card-gap " +
  "[&>h3]:font-serif [&>h3]:text-section-title-sm [&>h3]:text-heading md:[&>h3]:text-section-title " +
  "[&>p+p]:mt-case-para [&>h3+p]:mt-case-headline-gap [&>p+:not(p)]:mt-case-block " +
  "[&>:not(p,h3)+p]:mt-case-block [&>:not(p)+:not(p)]:mt-case-gap";

// "why not just *show* them?" → why not just <em>show</em> them?
export function emphasize(text: string) {
  return text.split(/\*([^*]+)\*/).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));
}
