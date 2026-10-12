// The small gray → between a BEFORE and an AFTER panel (Figma 2682:69383,
// 2691:70822: the same arrow in both case studies). Decorative.
export default function CompareArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 15.3 9.57"
      className={`w-3.75 shrink-0 fill-none stroke-figure-arrow stroke-[1.3] ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M.65 4.79h14M10.51.65l4.14 4.14-4.14 4.13" />
    </svg>
  );
}
