"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
 * - 카드를 고르면 나머지가 그 카드 쪽으로 접히고 나서 상세로 넘어간다(아래 FOLD_MS).
 */

/** 접힘이 끝나고 상세로 넘어가기까지. 스태거까지 합친 실제 재생 시간과 맞춰둔다. */
const FOLD_MS = 520;

function StickyProject({
  project,
  index,
  total,
  progress,
  folding,
  onOpen,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  /** 열리는 중인 카드의 인덱스. null이면 평소 상태. */
  folding: number | null;
  onOpen: (event: React.MouseEvent<HTMLAnchorElement>, index: number) => void;
}) {
  // 뒤에 오는 카드가 앞 카드를 덮을 때 앞 카드는 조금씩 작아진다 —
  // 겹친 종이 더미처럼 보이게 하는 게 이 인터랙션의 전부다.
  const targetScale = 1 - (total - index - 1) * 0.035;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  const isChosen = folding === index;
  const distance = folding === null ? 0 : Math.abs(index - folding);

  // 고른 카드 위의 것은 위로, 아래 것은 아래로 접는다. 경첩이 고른 카드 쪽을
  // 향해야 "그 카드로 빨려 들어가는" 방향으로 읽힌다.
  const foldsUp = folding !== null && index < folding;

  return (
    <div className="sticky" style={{ top: `calc(5rem + ${index * 1.5}rem)` }}>
      {/* 바깥: 스크롤 연동 스케일. 안쪽: 접힘. 같은 요소에 style과 animate로
          변형을 동시에 걸면 서로 덮어써서 한쪽이 무시된다.
          will-change는 일부러 안 건다 — 카드 5장에 상시로 걸면 그만큼 합성 레이어가
          계속 메모리에 상주한다. 변형이 실제로 일어날 때 브라우저가 알아서 승격시킨다. */}
      <motion.div style={{ scale }} className="origin-top">
        <motion.div
          style={{
            transformOrigin: foldsUp ? "center bottom" : "center top",
            transformPerspective: 1400,
          }}
          animate={
            folding === null
              ? { rotateX: 0, scaleY: 1, opacity: 1, scale: 1 }
              : isChosen
                ? { rotateX: 0, scaleY: 1, opacity: 1, scale: 1.03 }
                : { rotateX: foldsUp ? 82 : -82, scaleY: 0.08, opacity: 0, scale: 1 }
          }
          transition={{
            duration: 0.42,
            ease: [0.65, 0, 0.35, 1],
            // 고른 카드에서 먼 것부터가 아니라 가까운 것부터 접혀야
            // 한 장씩 넘어가듯 "샤라락" 읽힌다.
            delay: folding === null ? 0 : distance * 0.05,
          }}
        >
          <ProjectCard project={project} variant="panel" onOpen={(e) => onOpen(e, index)} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ProjectStack({ projects }: { projects: Project[] }) {
  const container = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [stacked, setStacked] = useState(false);
  const [folding, setFolding] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // 스택은 넓은 화면 + 모션을 허용한 사용자에게만. 서버 렌더 결과는 항상 리스트라
    // 자바스크립트가 늦거나 꺼져도 프로젝트 목록은 그대로 읽힌다.
    const query = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const apply = () => setStacked(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  // 전환 도중 이 컴포넌트가 사라지면(뒤로가기 등) 예약된 이동을 취소한다.
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
      // 새 탭·다운로드 등 브라우저 기본 동작은 절대 가로채지 않는다.
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      if (folding !== null) {
        // 이미 접히는 중이면 두 번째 클릭은 무시한다.
        event.preventDefault();
        return;
      }

      const slug = projects[index].slug;
      event.preventDefault();
      setFolding(index);
      // 애니메이션이 끝나갈 때 이동한다. 상세 페이지 청크는 Link가 이미 프리페치해 둔다.
      timer.current = setTimeout(() => router.push(`/projects/${slug}`), FOLD_MS);
    },
    [folding, projects, router],
  );

  // container는 스택 여부와 상관없이 항상 렌더한다. 리스트 모드일 때 ref를 안 붙이면
  // useScroll이 "Target ref is defined but not hydrated"로 예외를 던지고, 그 예외가
  // framer-motion의 프레임 배치 루프를 끊어 이 페이지의 다른 모션까지 전부 멈춘다.
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className={stacked ? "mt-12 pb-[14vh]" : "mt-12"}>
      {projects.map((p, i) =>
        stacked ? (
          <StickyProject
            key={p.slug}
            project={p}
            index={i}
            total={projects.length}
            progress={scrollYProgress}
            folding={folding}
            onOpen={handleOpen}
          />
        ) : (
          <ProjectCard key={p.slug} project={p} variant="list" />
        ),
      )}
    </div>
  );
}
