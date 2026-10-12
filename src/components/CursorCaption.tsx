import type { ReactNode } from "react";

type Props = {
  /** Short text shown in the cursor pill and as the figure's caption. */
  caption: string;
  /** Show the caption as written instead of uppercase (cursor pill and touch label). */
  keepCase?: boolean;
  /** Extra classes for the figure (e.g. rounded corners and a shadow). */
  className?: string;
  children: ReactNode;
};

// Media with a caption that rides on the cursor: with a mouse, the purple dot
// morphs into a pill reading `caption` (CustomCursor). The caption is also a
// real <figcaption>: screen-reader-only where there's a mouse, and a small
// label on the media on touch screens, where there's no cursor.
export default function CursorCaption({ caption, keepCase = false, className = "", children }: Props) {
  return (
    <figure data-cursor-label={caption} data-cursor-case={keepCase ? "keep" : undefined} className={`relative ${className}`}>
      {children}
      <figcaption
        className={`pointer-events-none absolute bottom-2 left-2 rounded-tag bg-paper/90 px-tag-x py-tag-y font-mono text-(length:--text-tag) leading-(--text-tag--line-height) font-medium text-heading ${keepCase ? "" : "uppercase"} [@media(hover:hover)_and_(pointer:fine)]:sr-only`}
      >
        {caption}
      </figcaption>
    </figure>
  );
}
