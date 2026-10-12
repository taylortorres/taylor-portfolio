import type { ReactNode } from "react";

type Props = {
  /** Mono line above the question, e.g. "How might we...". */
  label: string;
  /** The question. Markdown emphasis (*obvious*) renders in italic. */
  children: ReactNode;
};

// Green "How might we" block (Figma 2682:69367): white text centered on the
// fill. In MDX: <Callout label="How might we...">make dragging feel *obvious*…</Callout>
export default function Callout({ label, children }: Props) {
  return (
    <aside data-callout className="rounded-callout bg-callout px-4 pt-8 pb-8.25 text-center text-paper">
      <p className="font-mono text-callout-label uppercase">{label}</p>
      <div className="mt-3.25 font-serif text-callout-question text-balance [&_em]:italic">{children}</div>
    </aside>
  );
}
