import type { ReactNode } from "react";

type Props = {
  /** Mono label above the media, e.g. "Stories flow". */
  label: string;
  children: ReactNode;
};

// Labeled media inside a case study section (Figma "STORIES FLOW"): the label
// sits 13px above the image or video and doubles as its caption.
export default function Figure({ label, children }: Props) {
  return (
    <figure>
      <figcaption className="mb-figure-label-gap font-mono text-detail text-muted uppercase">{label}</figcaption>
      {children}
    </figure>
  );
}
