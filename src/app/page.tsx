import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import ProjectGrid from "@/components/ProjectGrid";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <ProjectGrid />
      </main>
    </>
  );
}
