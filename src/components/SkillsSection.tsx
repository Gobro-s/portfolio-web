"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/projects";

export default function SkillsSection() {
  return (
    <section className="border-b border-line px-6 py-24 md:px-12" id="about">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-mono text-xs tracking-[0.3em] text-foreground-dim uppercase">
            01 / Profile
          </p>
          <h2 className="font-display mt-6 text-3xl leading-snug font-bold md:text-4xl">
            {profile.bio.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <div className="mt-10 space-y-3 font-mono text-sm text-foreground-dim">
            {profile.experience.map((e) => (
              <div key={e.label} className="flex justify-between gap-4 border-t border-line pt-3">
                <span>{e.label}</span>
                <span>{e.period}</span>
              </div>
            ))}
            <div className="flex justify-between gap-4 border-t border-line pt-3">
              <span>{profile.education}</span>
            </div>
          </div>

          <ul className="mt-8 space-y-1 text-sm text-foreground-dim">
            {profile.awards.map((a) => (
              <li key={a} className="flex gap-2">
                <span className="text-accent">＋</span>
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-7">
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {profile.skills.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              >
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="font-display font-medium">{s.name}</span>
                  <span className="font-mono text-xs text-foreground-dim">{s.level}/5</span>
                </div>
                <div className="h-[3px] w-full bg-line">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${(s.level / 5) * 100}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-2">
            {profile.tools.map((t) => (
              <span
                key={t}
                className="font-mono rounded-full border border-line px-3 py-1 text-xs text-foreground-dim"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
