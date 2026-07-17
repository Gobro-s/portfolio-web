"use client";

import dynamic from "next/dynamic";
import { profile } from "@/data/projects";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function Hero() {
  return (
    <section className="grain relative flex min-h-svh flex-col justify-between overflow-hidden border-b border-line px-6 pt-24 pb-8 md:px-12 md:pt-32 md:pb-10">
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        <Scene />
      </div>

      <div className="relative z-10">
        <p className="font-mono text-[11px] tracking-[0.2em] text-foreground-dim uppercase sm:text-xs sm:tracking-[0.3em]">
          고세훈 · Ko Sehoon
        </p>
        <h1 className="font-display mt-10 text-[clamp(2.4rem,8.5vw,6.5rem)] leading-[1.14] font-semibold tracking-[-0.03em] break-keep md:mt-14">
          현장의 요구에서
          <br />
          설계하고, 만들고,
          <br />
          <span className="inline-block pl-[6vw] md:pl-[9vw]">
            <span className="text-accent">적용</span>합니다.
          </span>
        </h1>
        <p className="mt-8 max-w-md text-base leading-relaxed text-foreground-dim md:mt-10 md:text-lg">
          {profile.tagline}
          <span className="font-mono mt-1 block text-sm opacity-60">{profile.taglineEn}</span>
        </p>
      </div>

      <div className="relative z-10 mt-14 grid grid-cols-2 items-end gap-x-6 gap-y-4 border-t border-line pt-5 font-mono text-[11px] tracking-[0.12em] text-foreground-dim uppercase sm:text-xs md:grid-cols-4">
        <div>
          <p className="opacity-60">Now</p>
          <p className="mt-1 text-foreground normal-case">서울로봇인공지능과학관</p>
        </div>
        <div>
          <p className="opacity-60">Focus</p>
          <p className="mt-1 text-foreground normal-case">기획 · 개발 · 운영</p>
        </div>
        <div className="hidden md:block">
          <p className="opacity-60">Base</p>
          <p className="mt-1 text-foreground normal-case">Seoul, KR</p>
        </div>
        <a
          href="#projects"
          data-cursor-hover
          className="link-underline col-start-2 justify-self-end text-foreground md:col-start-auto"
        >
          Scroll ↓
        </a>
      </div>
    </section>
  );
}
