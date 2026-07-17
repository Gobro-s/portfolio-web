import Hero from "@/components/Hero";
import ConceptStrip from "@/components/ConceptStrip";
import SkillsSection from "@/components/SkillsSection";
import AIPractice from "@/components/AIPractice";
import ProjectsGrid from "@/components/ProjectsGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <ConceptStrip />
      <SkillsSection />
      <AIPractice />
      <ProjectsGrid />
      <Footer />
    </main>
  );
}
