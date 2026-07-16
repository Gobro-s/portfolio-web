"use client";

import dynamic from "next/dynamic";
import { profile } from "@/data/projects";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function Hero() {
  return (
    <section className="grain relative flex min-h-screen flex-col justify-between overflow-hidden border-b border-line px-6 pt-32 pb-10 md:px-12">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <Scene />
      </div>

      <div className="relative z-10 max-w-4xl">
        <p className="font-mono text-xs tracking-[0.3em] text-foreground-dim uppercase">
          Frontend Developer / RAIM · Reservation
        </p>
        <h1 className="font-display mt-6 text-[13vw] leading-[0.9] font-bold tracking-tight md:text-[7.5rem]">
          GO
          <br />
          SEHOON
        </h1>
      </div>

      <div className="relative z-10 mt-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <p className="max-w-md text-lg leading-relaxed text-foreground-dim">
          {profile.tagline}
          <span className="font-mono block text-sm mt-1 opacity-60">
            {profile.taglineEn}
          </span>
        </p>
        <a
          href="#projects"
          data-cursor-hover
          className="link-underline font-mono text-sm tracking-widest uppercase"
        >
          Scroll to explore ↓
        </a>
      </div>
    </section>
  );
}
