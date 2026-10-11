import { getCaseStudies } from "@/lib/case-studies";
import ProjectCard from "./ProjectCard";

// Two balanced columns from md up (CSS columns fill the left column first, so
// the Figma layout comes from `order`), one column below md. Reading and focus
// order match the visual order at every width.
export default async function ProjectGrid() {
  const studies = await getCaseStudies();
  return (
    <section id="work" aria-labelledby="work-heading" className="pt-projects-top">
      <h2 id="work-heading" className="sr-only">
        Work
      </h2>
      <ul className="mx-auto max-w-content-max px-4 md:columns-2 md:gap-gutter md:px-gutter">
        {studies.map((study, i) => (
          <li key={study.slug} className="break-inside-avoid pb-stack">
            <ProjectCard study={study} preload={i === 0} />
          </li>
        ))}
      </ul>
    </section>
  );
}
