import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// /robots.txt: everything is crawlable except the /dev pages, and it points
// crawlers to the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/dev/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
