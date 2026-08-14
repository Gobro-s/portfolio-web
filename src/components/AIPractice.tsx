"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { aiPractice } from "@/data/projects";

export default function AIPractice() {
  return (
    <section className="border-b border-line wrap py-20 md:py-28" id="ai">
      {/* SkillsSection과 같은 이유로 md에서는 간격을 좁힌다 (12칼럼 × gap-16 = 704px). */}
      <div className="grid gap-8 md:grid-cols-12 lg:gap-16">
        <div className="md:col-span-5">
          {/* balance가 없으면 "…일을 / 맡깁니다."처럼 서술어만 다음 줄로 떨어진다. */}
          <h2 className="font-display text-3xl leading-snug font-bold text-balance md:text-4xl">
            {aiPractice.heading}
          </h2>

          {/* blockquote가 아니라 원칙 목록이다. 인용 서식은 화자가 따로 있다는 뜻인데,
              이 문장들은 본인이 본인 방식을 말하는 1인칭이다. */}
          <motion.ul
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
          >
            {aiPractice.principles.map((line) => (
              <li
                key={line}
                className="border-l-2 border-accent py-2 pl-5 text-lg font-semibold text-balance"
              >
                {line}
              </li>
            ))}
          </motion.ul>

          {/* 스스로 범위를 긋는 문장. 원칙과 같은 무게로 두면 방어처럼 읽히므로 한 단 낮춘다. */}
          <p className="mt-7 text-pretty text-foreground-dim">
            {aiPractice.boundary}
          </p>
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
              <div className="mt-2 text-foreground-dim">
                {e.body.map((line) => (
                  <p key={line} className="text-pretty">
                    {line}
                  </p>
                ))}
              </div>
              {/* 이미지 오른쪽 끝을 본문 끝과 같은 자리에 맞춘다 — 어긋나면 단이 두 개로 보인다. */}
              {e.image && (
                <figure className="mt-4 max-w-(--measure) overflow-hidden rounded-lg border border-line shadow-sm">
                  <Image
                    src={e.image.src}
                    // figcaption이 바로 아래에서 같은 문장을 말한다. alt에 또 넣으면
                    // 스크린 리더가 두 번 읽는다 — 캡션이 설명을 맡고 alt는 비운다.
                    alt=""
                    width={640}
                    height={420}
                    sizes="(min-width: 640px) 576px, calc(100vw - 3rem)"
                    className="w-full object-cover object-top"
                  />
                  <figcaption className="px-2 py-1.5 text-[13px] text-foreground-dim">
                    {e.image.caption}
                  </figcaption>
                </figure>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
