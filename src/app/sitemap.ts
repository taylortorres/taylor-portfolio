import type { MetadataRoute } from "next";
import { getCaseStudies } from "@/lib/case-studies";
import { SITE_URL } from "@/lib/site";

// /sitemap.xml: the home page and every case study page. Projects that link
// out (meta.externalUrl, e.g. DuoRooms' slides) have no page, and the /dev
// pages are left out.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const studies = await getCaseStudies();
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...studies
      .filter((s) => !s.externalUrl)
      .map((s) => ({ url: `${SITE_URL}/work/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
