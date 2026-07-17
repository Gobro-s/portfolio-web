"use client";

import { motion } from "framer-motion";
import { aiPractice } from "@/data/projects";

export default function AIPractice() {
  return (
    <section className="border-b border-line px-6 py-24 md:px-12" id="ai">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-mono text-xs tracking-[0.3em] text-foreground-dim uppercase">
            02 / {aiPractice.label}
          </p>
          <h2 className="font-display mt-6 text-3xl leading-snug font-bold md:text-4xl">
            {aiPractice.heading}
          </h2>

          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 border-l-2 border-accent pl-5"
          >
            {aiPractice.assessment.lines.map((line) => (
              <p key={line} className="mt-4 leading-relaxed text-foreground-dim first:mt-0">
                {line}
              </p>
            ))}
            <p className="mt-4 leading-relaxed text-foreground-dim">
              {aiPractice.assessment.boundary}
            </p>
            <footer className="font-mono mt-6 text-xs tracking-[0.15em] text-foreground-dim uppercase">
              — {aiPractice.assessment.by}
            </footer>
          </motion.blockquote>
        </div>

        <div className="md:col-span-7">
          {aiPractice.evidence.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="border-t border-line py-6"
            >
              <h3 className="font-display text-lg font-bold md:text-xl">{e.title}</h3>
              <p className="mt-2 max-w-xl leading-relaxed text-foreground-dim">{e.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
