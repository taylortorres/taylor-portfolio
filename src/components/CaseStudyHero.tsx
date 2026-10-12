import type { CaseStudy, CaseStudyHero as Hero } from "@/lib/case-studies";
import CaseImage from "./CaseImage";
import TagList from "./TagList";

// Top of a case study (Figma node 2682:69211), fed by `meta.hero`: tags, title
// (its own Title Case field; meta.title stays the card title), hero media
// (zoomable), then ROLE / TIMELINE / TEAM / SKILLS.
// Each detail is a list of lines; long lines wrap within their column.

const DETAILS: { key: keyof Pick<Hero, "role" | "timeline" | "team" | "skills">; label: string }[] = [
  { key: "role", label: "Role" },
  { key: "timeline", label: "Timeline" },
  { key: "team", label: "Team" },
  { key: "skills", label: "Skills" },
];

export default function CaseStudyHero({ study }: { study: CaseStudy & { hero: Hero } }) {
  const { hero } = study;
  return (
    <header className="pt-8 lg:pt-case-top">
      <TagList tags={hero.tags} />
      <h1 className="mt-case-title-gap font-serif text-case-title-sm text-case-ink md:text-case-title">{hero.title}</h1>
      <div className="mt-case-media-gap">
        <CaseImage
          src={hero.image}
          alt={hero.imageAlt}
          zoomable
          preload
          className="rounded-media"
          sizes="(min-width: 1280px) 768px, (min-width: 1024px) calc(100vw - 386px), 100vw"
        />
      </div>
      <dl className="mt-details-top grid grid-cols-2 gap-x-6 gap-y-8 xl:grid-cols-4 xl:gap-x-details-gap">
        {DETAILS.map(({ key, label }) => (
          <div key={key}>
            <dt className="font-mono text-detail font-semibold text-muted uppercase">{label}</dt>
            <dd className="mt-detail-label-gap font-sans text-detail text-muted">
              {hero[key].map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
