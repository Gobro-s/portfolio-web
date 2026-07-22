"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";

/**
 * Skiper UI — Skiper16 / StickyCard_001 (https://skiper-ui.com)
 * 무료 컴포넌트 사용 조건이 Skiper UI 출처 표기라 이 주석을 남긴다.
 *
 * 원본에서 바꾼 것:
 * - 원본은 `<ReactLenis root>`로 감싼다. 이 사이트는 이미 SmoothScroll에서 Lenis를
 *   하나 띄우고 있어서 그대로 두면 인스턴스가 둘이 된다 — 감싸지 않고 useScroll만 쓴다.
 * - 원본의 고정 크기(500×300px)를 없애고 카드가 폭을 채우게 했다.
 * - 스택은 데스크톱 전용이다. 좁은 화면에서는 스티키로 겹치면 카드가 화면을 다 덮고,
 *   터치 관성 스크롤과도 잘 안 맞아서 기존 리스트 그대로 내보낸다.
 */
function StickyProject({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // 뒤에 오는 카드가 앞 카드를 덮을 때 앞 카드는 조금씩 작아진다 —
  // 겹친 종이 더미처럼 보이게 하는 게 이 인터랙션의 전부다.
  const targetScale = 1 - (total - index - 1) * 0.035;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="sticky" style={{ top: `calc(5rem + ${index * 1.5}rem)` }}>
      <motion.div style={{ scale }} className="origin-top will-change-transform">
        <ProjectCard project={project} variant="panel" />
      </motion.div>
    </div>
  );
}

export default function ProjectStack({ projects }: { projects: Project[] }) {
  const container = useRef<HTMLDivElement>(null);
  const [stacked, setStacked] = useState(false);

  useEffect(() => {
    // 스택은 넓은 화면 + 모션을 허용한 사용자에게만. 서버 렌더 결과는 항상 리스트라
    // 자바스크립트가 늦거나 꺼져도 프로젝트 목록은 그대로 읽힌다.
    const query = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const apply = () => setStacked(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  // container는 스택 여부와 상관없이 항상 렌더한다. 리스트 모드일 때 ref를 안 붙이면
  // useScroll이 "Target ref is defined but not hydrated"로 예외를 던지고, 그 예외가
  // framer-motion의 프레임 배치 루프를 끊어 이 페이지의 다른 모션까지 전부 멈춘다.
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className={stacked ? "mt-12 pb-[30vh]" : "mt-12"}>
      {projects.map((p, i) =>
        stacked ? (
          <StickyProject
            key={p.slug}
            project={p}
            index={i}
            total={projects.length}
            progress={scrollYProgress}
          />
        ) : (
          <ProjectCard key={p.slug} project={p} variant="list" />
        ),
      )}
    </div>
  );
}
