import Image from "next/image";
import type { CaseStudy } from "@/lib/case-studies";
import ProjectCardLink from "./ProjectCardLink";
import TagList from "./TagList";

type Props = {
  study: CaseStudy;
  preload?: boolean;
};

// Bold each highlight phrase where it appears in the description.
function Description({ text, highlights }: { text: string; highlights: string[] }) {
  if (highlights.length === 0) return text;
  const pattern = new RegExp(`(${highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`);
  return text.split(pattern).map((part, i) =>
    highlights.includes(part) ? (
      <span key={i} className="font-medium">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

// "Duolingo ✦ Shipped 2026": Geist Mono has no ✦, so draw it to match Figma.
function Eyebrow({ text }: { text: string }) {
  return text.split(/(✦)/).map((part, i) =>
    part === "✦" ? (
      <svg
        key={i}
        viewBox="0 0 10 10"
        aria-hidden="true"
        className="inline-block size-eyebrow-mark fill-current align-[-0.02em]"
      >
        <path d="M5 0C5.6 3.2 6.8 4.4 10 5 6.8 5.6 5.6 6.8 5 10 4.4 6.8 3.2 5.6 0 5 3.2 4.4 4.4 3.2 5 0Z" />
      </svg>
    ) : (
      part
    ),
  );
}

export default function ProjectCard({ study, preload = false }: Props) {
  const { slug, title, eyebrow, description, highlights, tags, thumbnail, video } = study;
  return (
    <ProjectCardLink
      href={`/work/${slug}`}
      video={video}
      poster={
        <Image
          src={thumbnail}
          alt=""
          sizes="(min-width: 1275px) 617px, (min-width: 768px) 50vw, 100vw"
          preload={preload}
          className="block h-auto w-full"
        />
      }
    >
      <div className="mt-card-gap flex flex-col gap-meta-gap">
        <div className="flex flex-col gap-meta-gap">
          <div>
            <p className="font-mono text-eyebrow text-muted uppercase word-tight-mono">
              <Eyebrow text={eyebrow} />
            </p>
            <h3 className="font-serif text-title text-heading">{title}</h3>
          </div>
          <p className="min-h-card-desc font-sans text-body text-muted">
            <Description text={description} highlights={highlights} />
          </p>
        </div>
        <TagList tags={tags} />
      </div>
    </ProjectCardLink>
  );
}
