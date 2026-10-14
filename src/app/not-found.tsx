import type { Metadata } from "next";
import Link from "next/link";
import ChipIcon from "@/components/ChipIcon";
import Footer from "@/components/Footer";
import { SITE_NAME } from "@/lib/site";

// The site's own 404, for unknown URLs and notFound() (e.g. a link-out
// project's /work/<slug>). It replaces Next's built-in page, whose inline
// <style> turns body black in dark mode and stays in the document after a
// client-side navigation away, darkening the next page.

export const metadata: Metadata = { title: `Page not found · ${SITE_NAME}` };

const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// Same chip as the case study sidebar's HOME (SectionNav.tsx); the ::before
// grows the tap target to 44px.
const chip = `relative flex w-fit items-center gap-2 rounded-chip bg-chip py-1 pr-1.5 pl-1 font-mono text-chip-label font-medium text-chip-text uppercase before:absolute before:-inset-x-1 before:-inset-y-2 ${focusRing}`;

export default function NotFound() {
  return (
    <>
      <main className="flex flex-1 items-center px-4 py-section-gap sm:px-gutter">
        <div className="mx-auto flex w-full max-w-case-content-max flex-col items-start">
          <p className="font-mono text-eyebrow text-muted uppercase">404 ✦ Page not found</p>
          <h1 className="mt-case-label-gap font-display text-hero-sm text-ink opsz-hero sm:text-hero-md">
            This page wandered off.
          </h1>
          <p className="mt-case-headline-gap max-w-prose text-case-body text-muted">
            The link may be old, or the page isn’t ready yet. The work is all on the home page.
          </p>
          <Link href="/" className={`mt-case-block ${chip}`}>
            <ChipIcon />
            Back home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
