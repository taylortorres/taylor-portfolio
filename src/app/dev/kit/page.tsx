import path from "node:path";
import type { Metadata } from "next";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import Footer from "@/components/Footer";
import { getSections } from "@/lib/sections";
import Demo from "./demo.mdx";

// TEMPORARY: demo of the shared case study pieces. Not linked anywhere;
// delete this folder (and public/videos/posters if unused) when done.

export const metadata: Metadata = {
  title: "Case study kit (dev)",
  robots: { index: false, follow: false },
};

const sections = getSections(path.join(process.cwd(), "src/app/dev/kit/demo.mdx"));

export default function Kit() {
  return (
    <>
      <main className="flex-1">
        <CaseStudyLayout sections={sections}>
          <h1 className="pt-8 font-display text-footer-title text-ink lg:pt-case-top">Case study kit</h1>
          <div className="mt-stack flex flex-col gap-section-gap [&_p]:mt-3 [&_p]:text-body [&_p]:text-muted [&_strong]:font-medium [&_strong]:text-heading [&_a]:underline [&_figure]:mt-stack [&_section>button]:mt-stack [&_section>img]:mt-stack [&_section>video]:mt-stack [&_section>div]:mt-stack">
            <Demo />
          </div>
        </CaseStudyLayout>
      </main>
      <Footer />
    </>
  );
}
