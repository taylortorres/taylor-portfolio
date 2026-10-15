import type { Metadata } from "next";
import type { CSSProperties } from "react";
import AboutBigOn from "@/components/AboutBigOn";
import AboutExperience from "@/components/AboutExperience";
import AboutHeading from "@/components/AboutHeading";
import AboutPortrait from "@/components/AboutPortrait";
import AboutSnapshots from "@/components/AboutSnapshots";
import Footer from "@/components/Footer";
import { aboutMotionVars } from "@/lib/about-motion";
import { pageMetadata } from "@/lib/site";
import { about } from "../../../content/about";

export const metadata: Metadata = pageMetadata({ path: "/about", title: about.title, description: about.description });

// About page (Figma 2748:5479): one column, no sidebar. The copy lives in
// content/about/index.ts; the motion timings in src/lib/about-motion.ts.
export default function AboutPage() {
  const { portrait, intro, snapshots, bigOn, experience } = about;
  return (
    <>
      <main className="flex-1" style={aboutMotionVars()}>
        <div className="mx-auto max-w-[calc(var(--spacing-about-max)+2*var(--spacing-gutter))] px-4 pt-about-top-sm sm:px-gutter lg:pt-about-top lg:pb-about-bottom">
          {/* Intro (Figma 2824:12259): portrait beside the text from lg, above it below lg. */}
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-center lg:gap-about-intro-gap">
            <div className="flex shrink-0 justify-center lg:w-portrait-box">
              <AboutPortrait photo={portrait.photo} caption={portrait.caption} character={portrait.character} />
            </div>
            <div className="flex max-w-about-text flex-col gap-about-stack">
              <h1 data-about-intro="headline" className="font-display text-about-lede-sm font-normal text-ink italic lg:text-about-lede">
                {intro.lede}
              </h1>
              <div className="flex flex-col gap-(--text-about-body--line-height) text-about-body font-book text-about-ink">
                {intro.paragraphs.map((p, i) => (
                  <p key={p} data-about-intro="text" style={{ "--about-i": i } as CSSProperties}>
                    {p}
                  </p>
                ))}
              </div>
              <div className="flex flex-col gap-belief-gap">
                <p
                  data-about-intro="text"
                  style={{ "--about-i": intro.paragraphs.length } as CSSProperties}
                  className="font-mono text-about-label font-medium text-section-active"
                >
                  {intro.beliefsLabel}
                </p>
                <ul className="text-about-body text-about-ink">
                  {intro.beliefs.map((b, i) => (
                    <li key={b.lead} data-about-intro="text" style={{ "--about-i": intro.paragraphs.length + 1 + i } as CSSProperties}>
                      <span className="font-lead text-about-strong">{b.lead}</span> — {b.rest}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <section aria-labelledby="snapshots-heading" className="mt-about-section-sm motion-safe:animate-page-enter lg:mt-about-section">
            <AboutHeading id="snapshots-heading" heading={snapshots.heading} typed />
            <div className="mt-8 stage:mt-about-heading-gap">
              <AboutSnapshots photos={snapshots.photos} />
            </div>
          </section>

          <section
            aria-labelledby="big-on-heading"
            className="mt-about-section-sm motion-safe:animate-page-enter lg:mt-about-section stage:mt-snapshot-after"
          >
            <AboutHeading id="big-on-heading" heading={bigOn.heading} typed />
            <div className="mt-8 lg:mt-big-on-heading-gap">
              <AboutBigOn items={bigOn.items} headingId="big-on-heading" />
            </div>
          </section>

          <section aria-labelledby="experience-heading" className="mt-about-section-sm motion-safe:animate-page-enter lg:mt-about-section">
            <AboutHeading id="experience-heading" heading={experience.heading} />
            <div className="mt-8 md:mt-experience-gap">
              <AboutExperience rows={experience.rows} />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
