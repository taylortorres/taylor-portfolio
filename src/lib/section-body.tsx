// Body rhythm of a case study section and of a <SectionPart> inside one
// (Figma 2682:69275 and siblings): 23px between paragraphs, 45px
// between text and a figure, 64px between two figures (or a figure and a
// sub-headline). A Markdown `###` is a sub-headline in the headline style,
// 22px above its text. Bold is semibold; <b> is medium (Figma's lighter
// emphasis). A line right after an <Insight> sits 25px below it. A <Callout>
// right after text sits 64px below it (Treeats Challenge). Markdown lists
// are bulleted. Treeats Research and Digging Deeper follow their Figma:
// text 30px after the Fizz collage and the site rows ([data-tight]), the
// site rows 64px after text, a <BodyLabel> 32px after text with its list
// 12px below, 45px from a list to a <Callout> and from it to an <Insight>,
// 45px between Design Evolution steps, a paragraph 12px under a <BodyLabel>,
// and a <YouTubeEmbed> 29px below text with 41px under it (Reflections).
export const SECTION_BODY =
  "font-sans text-case-body text-muted [&_strong]:font-semibold [&_b]:font-medium " +
  "[&>ul:not([data-lessons])]:list-disc [&>ul:not([data-lessons])]:pl-6.25 " +
  "[&>[data-insight]+p]:mt-crit-card-gap " +
  "[&>h3]:font-serif [&>h3]:text-section-title-sm [&>h3]:text-heading md:[&>h3]:text-section-title " +
  "[&>p+p]:mt-case-para [&>h3+p]:mt-case-headline-gap [&>p+:not(p)]:mt-case-block " +
  "[&>:not(p,h3)+p]:mt-case-block [&>:not(p)+:not(p)]:mt-case-gap [&>p+[data-callout]]:mt-case-gap " +
  "[&>[data-tight]+p]:mt-case-tight [&>p+[data-sites]]:mt-case-gap " +
  "[&>p+[data-body-label]]:mt-body-label-top [&>[data-body-label]+ul]:mt-body-label-gap " +
  "[&>ul+[data-callout]]:mt-case-block [&>[data-callout]+[data-insight]]:mt-case-block [&>[data-step]+[data-step]]:mt-case-block " +
  "[&>[data-body-label]+p]:mt-body-label-gap [&>p+[data-video]]:mt-video-top [&>[data-video]+p]:mt-video-bottom";

// "why not just *show* them?" → why not just <em>show</em> them?
export function emphasize(text: string) {
  return text.split(/\*([^*]+)\*/).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));
}
