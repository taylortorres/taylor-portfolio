import type { Metadata } from "next";

// The site's public address. Metadata (metadataBase), Open Graph tags,
// canonical URLs, the sitemap and robots.txt all build from it. Change it here.
export const SITE_URL = "https://taylortorres.me";

export const SITE_NAME = "Taylor Torres";
export const SITE_DESCRIPTION =
  "Product designer at the Stanford d.school, previously at Duolingo. I design the threads that tie people, ideas, and systems together.";

export type ShareImage = { url: string; width: number; height: number; alt: string };

// Default share image (og:image and twitter:image) for every page. Made from
// design-assets/og-image.png (6000 × 3150), scaled to 1200 × 630.
export const DEFAULT_SHARE_IMAGE: ShareImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Taylor designs the threads that tie people, ideas, and systems together. Currently at Stanford d.school, previously at Duolingo.",
};

// Canonical link, Open Graph and Twitter tags for one page (`path` relative to
// the site, e.g. "/work/treeats"). Next replaces openGraph wholesale per page,
// so every page sets the full object. `image` defaults to DEFAULT_SHARE_IMAGE.
export function pageMetadata({ path, title, description, type = "website", image = DEFAULT_SHARE_IMAGE }: {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  image?: ShareImage;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type, url: path, siteName: SITE_NAME, title, description, locale: "en_US", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
