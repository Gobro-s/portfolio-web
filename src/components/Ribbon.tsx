"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * 커스터디 라인. 페이지 전체를 관통하는 단 하나의 적색 리본이다.
 *
 * 아래 깔린 회색 실은 "아직 지나지 않은 구간"(미직), 그 위에 그려지는 붉은 실크가
 * "확인된 구간"이다. 스크롤이 리본을 풀어내는 동작 자체가 이 세계의 문법 —
 * 소장 이력을 따라 내려간다는 것.
 *
 * 뷰포트 고정(fixed)이라 문서가 아무리 길어도 리본은 끊기지 않는다.
 * 왼쪽 여백에만 있고 콘텐츠를 덮지 않는다(pointer-events: none).
 */
export default function Ribbon() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  // 스프링을 물려야 실크처럼 따라온다 — 스크롤 값을 그대로 쓰면 종이처럼 뻣뻣하다.
  const spring = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  // 스크롤 0에서도 리본은 이미 첫 화면을 관통해 있어야 한다 — 0에서 시작하면
  // 첫 뷰포트에 서명 요소가 아예 없다. 히어로 높이만큼(약 0.14)을 미리 풀어둔다.
  const drawn = useTransform(spring, (v) => 0.14 + v * 0.86);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-4 z-0 w-8 md:left-10 md:w-12"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 48 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* 미직 구간 — 아직 지나지 않은 이력 */}
        <path
          d="M24 0 C 12 180, 36 320, 24 500 C 12 680, 36 820, 24 1000"
          stroke="var(--thread)"
          strokeWidth="1.5"
          strokeDasharray="3 7"
          vectorEffect="non-scaling-stroke"
        />
        {/* 확인된 구간 — 적색 실크 */}
        <motion.path
          d="M24 0 C 12 180, 36 320, 24 500 C 12 680, 36 820, 24 1000"
          stroke="var(--accent)"
          strokeWidth="6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: reduced ? 1 : drawn }}
        />
        {/* 실크 하이라이트 — 리본이 선이 아니라 천으로 읽히게 하는 한 겹 */}
        <motion.path
          d="M24 0 C 12 180, 36 320, 24 500 C 12 680, 36 820, 24 1000"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: reduced ? 1 : drawn }}
        />
      </svg>
    </div>
  );
}
