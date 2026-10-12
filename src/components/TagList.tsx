// Outlined mono tags, shared by the project cards and the case study hero.
export default function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-tag-gap" aria-label="Tags">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-tag border border-tag bg-paper px-tag-x py-tag-y font-mono text-(length:--text-tag) leading-(--text-tag--line-height) font-medium whitespace-nowrap text-tag uppercase"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
