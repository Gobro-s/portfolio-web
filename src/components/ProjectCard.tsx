"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor-hover
      className="group block border-t border-line py-8 md:py-10"
    >
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10"
      >
        <div
          className={`order-first mx-auto aspect-4/3 w-full max-w-56 shrink-0 overflow-hidden rounded-xl shadow-sm transition-transform duration-500 ease-out group-hover:scale-[1.03] md:order-none md:mx-0 md:w-48`}
        >
          <Image
            src={project.images[0].src}
            alt={project.images[0].caption}
            width={480}
            height={360}
            className="h-full w-full object-cover object-top"
          />
        </div>

        <div className={`flex-1 ${reversed ? "md:order-first" : ""}`}>
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-sm text-foreground-dim">{project.no}</span>
            <span
              className="font-mono w-fit rounded-full border px-3 py-1 text-[11px] tracking-[0.15em] uppercase"
              style={{ borderColor: project.color, color: project.color }}
            >
              {project.coreSkill}
            </span>
          </div>
          <h3 className="font-display mt-4 text-4xl leading-[0.95] font-semibold tracking-tight break-keep transition-transform duration-500 group-hover:translate-x-2 sm:text-5xl md:text-6xl">
            {project.name}
          </h3>
          <p className="mt-4 max-w-lg text-foreground-dim">{project.tagline}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-foreground-dim">
            <span>{project.period}</span>
            <span aria-hidden>·</span>
            <span>{project.phases.join(" → ")}</span>
            <span className="link-underline text-foreground">케이스 스터디 열기 →</span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
