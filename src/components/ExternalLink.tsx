import type { ReactNode } from "react";

// An inline link in case study text that opens in a new tab (Treeats
// Reflections: "the original promo vid"), purple semibold as in Figma.
export default function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-link underline-offset-2 focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
