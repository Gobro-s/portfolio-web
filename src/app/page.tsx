import Hero from "@/components/Hero";
import ConceptStrip from "@/components/ConceptStrip";
import SkillsSection from "@/components/SkillsSection";
import AIPractice from "@/components/AIPractice";
import ProjectLedger from "@/components/ProjectLedger";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <ConceptStrip />
      <SkillsSection />
      <AIPractice />
      <ProjectLedger />
      <Footer />
    </main>
  );
}
