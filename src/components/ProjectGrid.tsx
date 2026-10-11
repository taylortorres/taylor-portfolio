import { getCaseStudies, type CaseStudy } from "@/lib/case-studies";
import ProjectCard from "./ProjectCard";

// Card height in column widths: the thumbnail plus the ~106px text block of a
// 617px card. Only used to balance the two columns.
const height = (study: CaseStudy) => study.thumbnail.height / study.thumbnail.width + 106 / 617;

// Fill the left column in `order` until it holds half the total height, then
// the right column. Source order stays 1, 2, 3…, so one column below md and
// keyboard focus both follow the same order as the two columns read.
function splitColumns(studies: CaseStudy[]) {
  const total = studies.reduce((sum, s) => sum + height(s), 0);
  let left = 0;
  let split = studies.length;
  for (let i = 0; i < studies.length; i++) {
    if (left + height(studies[i]) / 2 > total / 2) {
      split = i;
      break;
    }
    left += height(studies[i]);
  }
  return [studies.slice(0, split), studies.slice(split)];
}

export default async function ProjectGrid() {
  const studies = await getCaseStudies();
  const columns = splitColumns(studies);
  let index = 0;
  return (
    <section id="work" aria-labelledby="work-heading" className="pt-projects-top pb-projects-bottom">
      <h2 id="work-heading" className="sr-only">
        Work
      </h2>
      <div className="mx-auto flex max-w-content-max flex-col gap-stack px-4 md:grid md:grid-cols-2 md:items-start md:gap-gutter md:px-gutter">
        {columns.map((column, c) => (
          <ul key={c} className="flex flex-col gap-stack">
            {column.map((study) => (
              <li key={study.slug}>
                <ProjectCard study={study} preload={index++ === 0} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
