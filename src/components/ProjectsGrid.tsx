import { projects } from "@/data/projects";
import ProjectStack from "./ProjectStack";

export default function ProjectsGrid() {
  return (
    <section id="projects" className="scroll-mt-8 px-6 py-16 md:px-12 md:py-24">
      <p className="font-label text-xs text-foreground-dim ">
        03 / Projects
      </p>
      <h2 className="font-display mt-6 text-2xl font-bold break-keep md:text-3xl">
        프로젝트마다, 다른 근육을 썼습니다.
      </h2>

      <ProjectStack projects={projects} />
    </section>
  );
}
