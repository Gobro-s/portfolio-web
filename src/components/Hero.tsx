"use client";

import dynamic from "next/dynamic";
import { profile } from "@/data/projects";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function Hero() {
  return (
    <section className="grain relative flex min-h-screen flex-col justify-between overflow-hidden border-b border-line px-6 pt-32 pb-10 md:px-12">
      <div className="pointer-events-none absolute inset-0 -z-0 hidden md:block">
        <Scene />
      </div>

      <div className="relative z-10 max-w-4xl">
        <p className="font-mono text-[10px] tracking-[0.15em] text-foreground-dim uppercase sm:text-xs sm:tracking-[0.3em]">
          Plan · Build · Apply — 현장의 요구에서 시작합니다
        </p>
        <h1 className="font-display mt-6 text-[13vw] leading-[0.9] font-semibold tracking-tight md:text-[7.5rem]">
          KO
          <br />
          <span className="italic text-accent">SEHOON</span>
        </h1>
      </div>

      <div className="relative z-10 mt-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <p className="max-w-md text-lg leading-relaxed text-foreground-dim">
          {profile.positioning}
          <span className="font-mono block text-sm mt-1 opacity-60">
            {profile.tagline} — {profile.taglineEn}
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
