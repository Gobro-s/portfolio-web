import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid() {
  return (
    <section id="projects" className="scroll-mt-8 px-6 py-16 md:px-12 md:py-24">
      <p className="font-mono text-xs tracking-[0.3em] text-foreground-dim uppercase">
        03 / Projects
      </p>
      <h2 className="font-display mt-6 text-2xl font-bold break-keep md:text-3xl">
        프로젝트마다, 다른 근육을 썼습니다.
      </h2>

      <div className="mt-12">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
