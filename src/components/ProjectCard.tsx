"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={`/projects/${project.slug}`} data-cursor-hover className="group block">
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden border-t border-line py-10 transition-colors md:py-14"
      >
        <div
          className="absolute inset-0 -z-10 origin-bottom scale-y-0 opacity-[0.06] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100"
          style={{ background: project.color }}
        />

        <div className="flex flex-col gap-4 px-1 md:flex-row md:items-center md:justify-between">
          <div className="flex items-baseline gap-6">
            <span className="font-mono text-sm text-foreground-dim">{project.no}</span>
            <h3 className="font-display text-3xl font-bold tracking-tight break-keep transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl md:text-6xl">
              {project.name}
            </h3>
          </div>
          <span
            className="font-mono w-fit rounded-full border px-4 py-1.5 text-[11px] tracking-[0.15em] uppercase"
            style={{ borderColor: project.color, color: project.color }}
          >
            {project.coreSkill}
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-2 px-1 md:flex-row md:items-center md:justify-between">
          <p className="max-w-lg text-foreground-dim">{project.tagline}</p>
          <p className="font-mono text-xs text-foreground-dim">{project.period}</p>
        </div>
      </motion.article>
    </Link>
  );
}
