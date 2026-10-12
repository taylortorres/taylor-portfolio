import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import CaseStudyHero from "@/components/CaseStudyHero";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import Footer from "@/components/Footer";
import NextProject from "@/components/NextProject";
import { getCaseStudies, getCaseStudySections } from "@/lib/case-studies";

// One page per folder in content/case-studies. With a meta.hero and <Section>
// tags it gets the full layout (sidebar, hero, sections); placeholders without
// them get a plain title and body. Every page ends with the "next up" block.
// Projects with meta.externalUrl (e.g. DuoRooms' slides) get no page: the card
// links out instead, and /work/<slug> is a 404.

// Placeholder bodies are plain Markdown ("## Coming soon" and a line of text).
const PLACEHOLDER_BODY =
  "[&_h2]:font-serif [&_h2]:text-title [&_h2]:text-heading [&_p]:mt-3 [&_p]:text-body [&_p]:text-muted";

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.filter((s) => !s.externalUrl).map(({ slug }) => ({ slug }));
}

async function getStudy(slug: string) {
  const studies = await getCaseStudies();
  return studies.find((s) => s.slug === slug && !s.externalUrl);
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const study = await getStudy((await params).slug);
  return study ? { title: `${study.title} · Taylor Torres`, description: study.description } : {};
}

// The footer is the instant shell (the nav is in the root layout); everything that reads `params` sits
// behind <Suspense> (Next requires it even with generateStaticParams). Each
// known slug is fully prerendered, so the fallback only shows for a moment on
// an unprefetched navigation.
export default function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <>
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-dvh" />}>
          <CaseStudyBody params={params} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

async function CaseStudyBody({ params }: { params: PageProps<"/work/[slug]">["params"] }) {
  const { slug } = await params;
  const study = await getStudy(slug);
  if (!study) notFound();
  const { Content, hero } = study;
  const sections = getCaseStudySections(slug);

  const body = (
    <>
      <div className="flex flex-col gap-case-gap">
        {hero ? (
          <CaseStudyHero study={{ ...study, hero }} />
        ) : (
          <h1 className="pt-8 font-serif text-case-title-sm text-case-ink md:text-case-title lg:pt-case-top">
            {study.title}
          </h1>
        )}
        {/* display: contents keeps Impact and each Section as items of the 64px stack. */}
        <div className={hero ? "contents" : PLACEHOLDER_BODY}>
          <Content />
        </div>
      </div>
      <div className="mt-next-top">
        <NextProject current={slug} />
      </div>
    </>
  );

  return sections.length > 0 ? (
    <CaseStudyLayout sections={sections}>{body}</CaseStudyLayout>
  ) : (
    <article className="mx-auto max-w-case-content-max px-4 pb-case-bottom sm:px-8">{body}</article>
  );
}
