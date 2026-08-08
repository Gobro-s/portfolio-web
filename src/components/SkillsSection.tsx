"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/projects";

export default function SkillsSection() {
  return (
    <section className="border-b border-line px-6 py-16 md:px-12 md:py-24" id="about">
      {/* 12칼럼 그리드에서 gap은 11번 들어간다 — gap-16(64px)이면 간격만 704px이라
          768px(콘텐츠 폭 672px)에서는 트랙이 전부 0px로 붕괴하고 내용이 삐져나온다.
          여유가 생기는 lg부터 넓은 간격을 준다. */}
      <div className="grid gap-8 md:grid-cols-12 lg:gap-16">
        <div className="min-w-0 md:col-span-5">
          <p className="font-label text-xs text-foreground-dim ">
            01 / Profile
          </p>
          {/* 한 문장이 접힐 때의 줄 간격(leading-snug)과 문장 사이 간격(space-y)을 분리한다.
              둘이 같으면 "컴포넌트 구조화로 반복 / 작업을 줄입니다"처럼 접힌 자리가
              문장이 끝난 자리처럼 읽힌다. */}
          <h2 className="font-display mt-6 text-2xl font-bold break-keep md:text-3xl">
            {profile.bio.map((line) => (
              <span key={line} className="mb-5 block leading-snug last:mb-0 md:mb-6">
                {line}
              </span>
            ))}
          </h2>

          <div className="mt-10 space-y-3 text-sm text-foreground-dim">
            {profile.experience.map((e) => (
              <div
                key={e.label}
                className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-line pt-3"
              >
                <span>{e.label}</span>
                <span className="whitespace-nowrap">{e.period}</span>
              </div>
            ))}
            <div className="flex justify-between gap-4 border-t border-line pt-3">
              <span>{profile.education}</span>
            </div>
          </div>

          <div className="mt-8">
            <p className="font-label text-[11px] text-foreground-dim ">
              Awards
            </p>
            <ul className="mt-2 space-y-1.5 text-sm leading-snug text-foreground-dim">
              {profile.awards.map((a) => (
                <li key={a} className="flex gap-2">
                  <span className="text-accent">＋</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <p className="font-label text-[11px] text-foreground-dim ">
              Certifications
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm leading-snug text-foreground-dim">
              {profile.certifications.map((c) => (
                <li key={c} className="flex gap-2">
                  <span className="text-accent">·</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* min-w-0: grid 자식의 기본 min-width는 auto라 안쪽 내용이 트랙보다 넓어지면
            트랙을 밀어낸다 — 768px에서 스킬 바가 4px 삐져나오던 원인. */}
        <div className="min-w-0 md:col-span-7">
          <p className="font-label text-[11px] text-foreground-dim ">
            Stack — 어디에 썼는지
          </p>
          <ul className="mt-4 min-w-0">
            {profile.skills.map((s, i) => (
              <motion.li
                key={s.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="flex min-w-0 flex-col gap-x-6 gap-y-1 border-t border-line py-3 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="font-display leading-snug font-medium">{s.name}</span>
                <span className="text-xs leading-snug text-foreground-dim sm:text-right">
                  {s.usedIn.join(" · ")}
                </span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10">
            <p className="font-label text-[11px] text-foreground-dim ">
              AI — 매일 쓰는 도구
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.aiTools.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-accent/40 px-3 py-1 text-xs leading-snug text-accent"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="font-label text-[11px] text-foreground-dim ">
              Tools
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line px-3 py-1 text-xs leading-snug text-foreground-dim"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
