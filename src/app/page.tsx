import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";

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
