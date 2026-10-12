const TAG =
  "rounded-tag border border-tag bg-paper px-tag-x py-tag-y font-mono text-(length:--text-tag) leading-(--text-tag--line-height) font-medium whitespace-nowrap text-tag uppercase";

// Outlined mono tags, shared by the project cards and the case study hero.
// `linkTag` adds one more in the same style for a card that links out, e.g.
// SLIDES ↗ (the arrow is visual; the link already says it opens a new tab).
export default function TagList({ tags, linkTag }: { tags: string[]; linkTag?: string }) {
  return (
    <ul className="flex flex-wrap gap-tag-gap" aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag} className={TAG}>
          {tag}
        </li>
      ))}
      {linkTag && (
        <li className={TAG}>
          {linkTag} <span aria-hidden="true">↗</span>
        </li>
      )}
    </ul>
  );
}
