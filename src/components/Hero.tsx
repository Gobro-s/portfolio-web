"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/projects";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

/** 행 단위 마스크 리빌: 줄이 아래에서 떠오르며 한 번만 재생된다 */
function RevealLine({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={reduced ? false : { y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const fadeUp = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section className="grain relative flex min-h-svh flex-col justify-between overflow-hidden border-b border-line px-6 pt-24 pb-8 md:px-12 md:pt-32 md:pb-10">
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        <Scene />
      </div>

      <div className="relative z-10">
        <motion.p
          {...fadeUp(0.05)}
          className="font-mono text-[11px] tracking-[0.2em] text-foreground-dim uppercase sm:text-xs sm:tracking-[0.3em]"
        >
          고세훈 · Ko Sehoon
        </motion.p>
        <h1 className="font-display mt-10 text-[clamp(2.4rem,8.5vw,6.5rem)] leading-[1.13] font-semibold tracking-[-0.03em] break-keep md:mt-14">
          <RevealLine delay={0.15}>
            <span className="text-accent">요구</span>를 읽고,
          </RevealLine>
          <RevealLine delay={0.27}>
            <span className="text-accent">설계</span>하고, 만들고,
          </RevealLine>
          <RevealLine delay={0.39}>
            <span className="text-accent">적용</span>합니다.
          </RevealLine>
        </h1>
        <motion.p
          {...fadeUp(0.6)}
          className="mt-8 max-w-md text-base leading-relaxed text-foreground-dim md:mt-10 md:text-lg"
        >
          모든 작업은 현장의 문제에서 시작합니다.
          <span className="font-mono mt-1 block text-sm opacity-60">
            {profile.tagline} — {profile.taglineEn}
          </span>
        </motion.p>
      </div>

      <motion.div
        {...fadeUp(0.75)}
        className="relative z-10 mt-14 grid grid-cols-2 items-end gap-x-6 gap-y-4 border-t border-line pt-5 font-mono text-[11px] tracking-[0.12em] text-foreground-dim uppercase sm:text-xs md:grid-cols-4"
      >
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
      </motion.div>
    </section>
  );
}
