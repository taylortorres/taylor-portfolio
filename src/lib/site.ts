import type { Metadata } from "next";

// The site's public address. Metadata (metadataBase), Open Graph tags,
// canonical URLs, the sitemap and robots.txt all build from it. Change it here.
export const SITE_URL = "https://taylortorres.me";

export const SITE_NAME = "Taylor Torres";
export const SITE_DESCRIPTION = "Taylor designs the threads that tie people, ideas, and systems together.";

// Canonical link and Open Graph tags for one page (`path` relative to the
// site, e.g. "/work/treeats"). Next replaces openGraph wholesale per page, so
// every page sets the full object. No og:image yet: there is no share image.
export function pageMetadata({ path, title, description, type = "website" }: {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type, url: path, siteName: SITE_NAME, title, description, locale: "en_US" },
    twitter: { card: "summary", title, description },
  };
}
