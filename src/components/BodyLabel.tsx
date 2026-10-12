import type { ReactNode } from "react";

// Mono label inside a section body, over a list (Treeats Digging Deeper,
// Figma 2691:71036: "SO, **I INTERVIEWED 6 STUDENTS**. THIS IS WHAT I HEARD.").
// Styled like a section label; **bold** is semibold. Section rules put it
// 32px below a paragraph and its list 12px below it.
export default function BodyLabel({ children }: { children: ReactNode }) {
  return (
    <p data-body-label className="font-mono text-detail text-muted uppercase [&_strong]:font-semibold">
      {children}
    </p>
  );
}
