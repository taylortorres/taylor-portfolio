import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import { pageMetadata, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = pageMetadata({ path: "/", title: SITE_NAME, description: SITE_DESCRIPTION });

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <ProjectGrid />
      </main>
      <Footer />
    </>
  );
}
