import type { ReactNode } from "react";

type Props = {
  /** Mono label, e.g. "Key insight". */
  label: string;
  /** The quote. Markdown `*word*` is italic, `***words***` semibold italic. */
  children: ReactNode;
};

// KEY INSIGHT / REFRAMING THE PROBLEM (Figma 2682:69488, 2682:69670): a mono
// label over a serif quote with a dark bar on its left. A paragraph right
// after it sits 25px below (Section's [data-insight] rule).
export default function Insight({ label, children }: Props) {
  return (
    <aside data-insight>
      <p className="font-mono text-insight-label font-semibold text-heading uppercase">{label}</p>
      <blockquote className="mt-insight-gap border-l-4 border-heading pl-2.75 font-serif text-insight text-heading [&_em]:italic [&_strong]:font-semibold">
        {children}
      </blockquote>
    </aside>
  );
}
