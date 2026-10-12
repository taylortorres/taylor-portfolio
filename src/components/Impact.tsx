type Stat = {
  /** The number, e.g. "↓2.44%" or "1.7M+". A leading ↓ or ↑ is read as "down" or "up". */
  value: string;
  label: string;
};

// IMPACT row near the top of a case study (Figma node 2682:69255): a mono
// label over equal-width purple callouts with Figma's light grain. Content
// comes from the MDX: <Impact stats={[{ value: "↓2.44%", label: "..." }]} />.
// On phones the callouts stack. Labels may wrap below xl; from xl they stay on
// one line like Figma (the longest runs 6px into the right padding at 1440).

const ARROWS: Record<string, string> = { "↓": "Down ", "↑": "Up " };

function Value({ value }: { value: string }) {
  const arrow = ARROWS[value[0]];
  if (!arrow) return value;
  return (
    <>
      <span aria-hidden="true">{value[0]}</span>
      <span className="sr-only">{arrow}</span>
      {value.slice(1)}
    </>
  );
}

export default function Impact({ stats }: { stats: Stat[] }) {
  return (
    <section aria-labelledby="impact-title">
      <h2 id="impact-title" className="font-mono text-detail text-muted uppercase">
        Impact
      </h2>
      <ul className="mt-impact-label-gap grid gap-4 md:grid-cols-3">
        {stats.map(({ value, label }) => (
          <li
            key={label}
            data-cursor="light"
            className="grain rounded-stat border border-impact-border bg-impact pt-6.25 pr-4.25 pb-4 pl-4"
          >
            <p className="font-serif text-stat text-paper">
              <Value value={value} />
            </p>
            <p className="mt-2 font-mono text-stat-label font-medium text-impact-label uppercase xl:whitespace-nowrap">{label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
