"use client";

import { motion, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";

/**
 * Cult UI — AnimatedNumber (https://www.cult-ui.com)
 *
 * 원본에서 바꾼 것:
 * - 원본은 `motion/react`에서 import한다. 이 프로젝트는 framer-motion을 쓰므로 경로만 바꿨다.
 * - 원본은 마운트되자마자 센다. 화면 밖에서 조용히 다 세어버리면 아무도 못 보므로
 *   뷰포트에 들어올 때 한 번만 세게 했다. 이때 useInView 훅은 세 개 중 하나가
 *   간헐적으로 발화하지 않았다 — 이 사이트의 다른 섹션이 이미 쓰고 있는
 *   motion 뷰포트 콜백(onViewportEnter)으로 붙이니 안정적으로 재생된다.
 */
export function AnimatedNumber({
  value,
  mass = 0.8,
  stiffness = 75,
  damping = 15,
  precision = 0,
  format = (num: number) => num.toLocaleString(),
}: {
  value: number;
  mass?: number;
  stiffness?: number;
  damping?: number;
  precision?: number;
  format?: (value: number) => string;
}) {
  const reduced = useReducedMotion();
  const spring = useSpring(0, { mass, stiffness, damping });
  const display: MotionValue<string> = useTransform(spring, (current) =>
    format(parseFloat(current.toFixed(precision))),
  );

  if (reduced) return <span>{format(value)}</span>;

  return (
    <motion.span
      // 세로 여백만 준다. "-10%"처럼 한 값만 쓰면 좌우에도 10%씩 안쪽으로 들어가서,
      // 그리드 맨 왼쪽 칸에 있는 숫자는 관측 영역 밖에 걸려 영영 발화하지 않는다.
      viewport={{ once: true, margin: "-10% 0px" }}
      onViewportEnter={() => spring.set(value)}
    >
      {display}
    </motion.span>
  );
}
