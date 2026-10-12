import Link from "next/link";
import { getCaseStudies } from "@/lib/case-studies";

// "Next up" block at the end of every case study (Figma node 2682:69791). It
// links to the next case study in home-page order, wrapping from the last
// back to the first, using that study's meta title and description. The whole
// block is one link; READ NEXT is its visual button.

export default async function NextProject({ current }: { current: string }) {
  const studies = await getCaseStudies();
  const index = studies.findIndex((s) => s.slug === current);
  const next = studies[(index + 1) % studies.length];
  if (!next || next.slug === current) return null;

  return (
    <Link
      href={`/work/${next.slug}`}
      data-cursor="light"
      className="grain flex flex-col items-start gap-6 rounded-media bg-next-bg p-6 ring-1 ring-next-ring focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0 sm:flex-1">
        <p className="font-mono text-next-label text-next-text uppercase">Next up</p>
        <p className="mt-1.25 font-serif text-next-title text-paper">{next.title}</p>
        <p className="mt-1.5 font-sans text-next-desc text-next-text">{next.description}</p>
      </div>
      <span className="flex shrink-0 items-center gap-2 rounded-full bg-paper px-4.5 py-3 font-mono text-next-button font-semibold text-next-ink uppercase">
        Read next
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
