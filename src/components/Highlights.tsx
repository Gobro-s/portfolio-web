"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

const INITIAL = 4;
const STEP = 4;

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
            <h3 className="font-display border-l-[3px] border-accent pl-3 text-xl leading-snug font-bold break-keep md:text-2xl">
              {h.title}
            </h3>
            <div className="mt-3 space-y-1.5 text-foreground-dim">
              {h.body.map((line) => (
                <p key={line} className="text-pretty leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </div>
          {h.images && h.images.length > 0 && (
            <div className="flex shrink-0 gap-3 sm:w-56 sm:flex-col">
              {h.images.map((img) => (
                <figure
                  key={img.src}
                  className="flex-1 overflow-hidden rounded-lg border border-line shadow-sm sm:flex-none"
                >
                  <Image
                    src={img.src}
                    alt={img.caption}
                    width={480}
                    height={360}
                    sizes="(min-width: 640px) 224px, 45vw"
                    className="w-full object-cover object-top"
                  />
                  <figcaption className="px-2 py-1.5 text-[11px] leading-snug text-foreground-dim">
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
          className="font-label mt-6 w-full rounded-full border border-line py-3 text-xs text-foreground-dim  transition-colors hover:border-accent hover:text-accent"
        >
          + {remaining}개 더 보기
        </button>
      )}
    </div>
  );
}
