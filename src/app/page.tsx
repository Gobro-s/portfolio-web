import Hero from "@/components/Hero";
import ConceptStrip from "@/components/ConceptStrip";
import SkillsSection from "@/components/SkillsSection";
import AIPractice from "@/components/AIPractice";
import ProjectLedger from "@/components/ProjectLedger";
import Footer from "@/components/Footer";
import PrefetchDetailImages from "@/components/PrefetchDetailImages";

export default function Home() {
  return (
    <main>
      <Hero />
      <ConceptStrip />
      <SkillsSection />
      <AIPractice />
      <ProjectLedger />
      <Footer />
      <PrefetchDetailImages />
    </main>
  );
}
