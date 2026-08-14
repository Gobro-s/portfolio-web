"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

export const INITIAL = 4;
const STEP = 4;

/** 상세 이미지가 차지하는 슬롯 크기. PrefetchDetailImages가 같은 값으로 미리 받아둬야
 *  브라우저가 srcset에서 같은 후보를 골라 캐시가 실제로 맞는다 — 여기서만 고친다. */
export const HIGHLIGHT_IMAGE_SIZES = "(min-width: 640px) 208px, 45vw";

/**
 * 케이스 스터디의 Highlights는 프로젝트당 최대 11장의 이미지를 끌고 온다.
 * 처음부터 전부 마크업에 넣으면 화면에 안 보이는 이미지까지 DOM에 올라가므로,
 * 처음 4개만 렌더하고 나머지는 눌러서 이어붙인다 — 안 펼치면 아예 만들지 않는다.
 */
export default function Highlights({
  highlights,
}: {
  highlights: Project["highlights"];
}) {
  const [shown, setShown] = useState(INITIAL);
  const remaining = highlights.length - shown;

  return (
    <div className="mt-8">
      {highlights.slice(0, shown).map((h, i) => (
        <motion.div
          key={h.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          // 펼쳐서 나온 항목은 이미 화면 근처라 순차 지연을 주면 오히려 굼떠 보인다.
          transition={{ duration: 0.5, delay: i < INITIAL ? i * 0.08 : 0 }}
          className="flex flex-col gap-6 border-t border-line py-8 sm:flex-row"
        >
          <div className="flex-1">
            {/* 규칙선은 커스터디 색(accent) 하나로 간다. 프로젝트마다 다른 파스텔을 쓰면
                버프지 위에서 1.45~2.36:1까지 떨어지고, 세계관의 색 문법도 깨진다. */}
            {/* 제목도 본문과 같은 폭으로 묶는다. 안 묶으면 이미지가 있는 항목과 없는 항목에서
                제목의 오른쪽 끝이 항목마다 튀고, 제목만 아래 본문보다 훨씬 넓어진다. */}
            <h3 className="font-display max-w-(--measure) border-l-[3px] border-accent pl-3 text-xl leading-snug font-bold break-keep text-balance md:text-2xl">
              {h.title}
            </h3>
            {/* 17px · 1.65 = 줄 사이 약 11px → 문단 사이 16px.
                1.5(6px)는 줄 사이보다 좁아 문장 경계가 안 보였다. */}
            <div className="mt-3 space-y-4 text-foreground-dim">
              {h.body.map((line) => (
                <p key={line} className="text-pretty">
                  {line}
                </p>
              ))}
            </div>
          </div>
          {/* 이미지가 없는 항목도 이미지 열 자리는 비워 둔다. 안 그러면 그 항목만 글이
              한 칸 더 뻗어서 항목마다 오른쪽 끝이 다른 자리에 생긴다.
              열 너비 208px은 임의값이 아니다 — 남는 글 폭이 정확히 --measure(34rem)가 되는 값이라,
              상세 페이지의 모든 본문이 한 자리에서 끊긴다. */}
          {(!h.images || h.images.length === 0) && <div className="hidden shrink-0 sm:block sm:w-52" />}
          {h.images && h.images.length > 0 && (
            <div className="flex shrink-0 gap-3 sm:w-52 sm:flex-col">
              {h.images.map((img) => (
                <figure
                  key={img.src}
                  className="flex-1 overflow-hidden rounded-lg border border-line shadow-sm sm:flex-none"
                >
                  <Image
                    src={img.src}
                    // 캡션이 바로 아래에 같은 문장으로 있다 — 중복 낭독을 막으려 비운다.
                    alt=""
                    width={480}
                    height={360}
                    sizes={HIGHLIGHT_IMAGE_SIZES}
                    // 홈 카드 덱과 같은 이유로 eager다(커밋 88da47e) — Lenis 스무스 스크롤이
                    // IntersectionObserver 판정을 흔들어 lazy면 계단식으로 뜨거나 안 뜬다.
                    // 상세 한 장이 10~19KB라 미리 받아도 무게가 없다.
                    loading="eager"
                    className="w-full object-cover object-top"
                  />
                  <figcaption className="px-2 py-1.5 text-[13px] text-foreground-dim">
                    {img.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </motion.div>
      ))}

      {remaining > 0 && (
        <button
          type="button"

          onClick={() => setShown((n) => n + STEP)}
          className="label mt-6 w-full rounded-full border border-line py-3 text-[13px] text-foreground-dim  transition-colors hover:border-accent hover:text-accent"
        >
          + {remaining}개 더 보기
        </button>
      )}
    </div>
  );
}
