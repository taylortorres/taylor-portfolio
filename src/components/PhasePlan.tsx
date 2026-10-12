type Phase = {
  title: string;
  description: string;
  /** Effort, out of 3 bars. */
  effort: number;
  status: string;
  /** Shipped: green check, title and status. */
  done?: boolean;
};

function Step({ n, done }: { n: number; done?: boolean }) {
  if (done) {
    return (
      <svg viewBox="0 0 25.2 25.2" aria-hidden="true" className="relative size-plan-step shrink-0">
        <circle cx="12.6" cy="12.6" r="12.6" className="fill-paper" />
        <path
          className="fill-choice-ink"
          fillRule="evenodd"
          d="M12.6 25.2a12.6 12.6 0 1 0 0-25.2 12.6 12.6 0 0 0 0 25.2Zm-.33-7.5 7-8.4-2.15-1.8-6.02 7.23-3.11-3.12-1.98 1.98 4.2 4.2 1.08 1.08.98-1.17Z"
        />
      </svg>
    );
  }
  return (
    <span
      aria-hidden="true"
      className="relative flex size-plan-step shrink-0 items-center justify-center rounded-full border border-chart-card-border bg-figure-bg font-mono text-phase-step font-semibold text-figure-ink"
    >
      {n}
    </span>
  );
}

// The Plan (Figma 2682:69683): three phases on a timeline, each with a step
// marker, title, description, effort (filled bars out of 3) and a status
// pill; the shipped phase is green. Across from md, with the line running
// through the markers; stacked below md, with the line running down.
export default function PhasePlan({ phases }: { phases: Phase[] }) {
  return (
    <ol className="relative grid gap-8 rounded-stat border border-figure-border bg-plan-bg px-4 py-6 md:h-plan-h md:grid-cols-3 md:gap-0 md:pt-7.5 md:pr-2.5 md:pl-plan-x">
      {/* Across: one line through the markers. Down (phones): a segment from each marker to the next. */}
      <span aria-hidden="true" className="absolute top-10.75 right-10 left-plan-x hidden h-px bg-figure-arrow md:block" />
      {phases.map((p, i) => (
        <li key={p.title} className="relative flex gap-4 md:block">
          {i < phases.length - 1 && (
            <span aria-hidden="true" className="absolute top-6.25 -bottom-8 left-3 w-px bg-figure-arrow md:hidden" />
          )}
          <Step n={i + 1} done={p.done} />
          <div className="md:mt-4.75">
            <p className={`font-mono text-phase-title font-semibold uppercase ${p.done ? "text-choice-ink" : "text-figure-ink"}`}>
              <span className="sr-only">{p.done ? "Done: " : ""}</span>
              {p.title}
            </p>
            <p className="mt-0.5 font-sans text-phase text-muted">{p.description}</p>
            <p className="mt-3.25 font-mono text-effort text-figure-ink uppercase">Effort</p>
            <p className="mt-1.25 flex gap-1" role="img" aria-label={`${p.effort} of 3`}>
              {[0, 1, 2].map((b) => (
                <span
                  key={b}
                  className={`h-effort-bar-h w-effort-bar rounded-effort ${
                    b < p.effort ? (p.done ? "bg-choice-ink" : "bg-figure-ink") : "bg-effort-empty"
                  }`}
                />
              ))}
            </p>
            <p
              className={`mt-2.75 inline-flex rounded-full border px-2.75 py-0.5 font-sans text-phase font-medium ${
                p.done ? "border-choice-border bg-choice-bg text-choice-ink" : "border-status-border bg-status-bg text-figure-ink"
              }`}
            >
              {p.status}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
