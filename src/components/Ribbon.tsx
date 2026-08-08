"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * 커스터디 리본. 이 사이트의 서명 요소 — 콘텐츠를 다 지워도 이것 하나로 알아봐야 한다.
 *
 * 여백에 그은 선이 아니라 폭을 가진 천이다. 문서 전체 높이를 타고 내려오면서
 * `[data-fold]`가 붙은 날짜 항목마다 접혀 본문 칼럼 쪽으로 건너간다.
 * 접힘의 굵기가 곧 문법이다 — 확정은 제비꼬리로 마감된 온폭의 천, 추정은 잘린 실 한 올.
 *
 * 스크롤이 리본을 풀어낸다. 아직 안 지난 구간은 미직(未織)의 회색 윤곽으로만 남고,
 * 지나온 구간에만 붉은 실크가 짜인다.
 */

type FoldState = "known" | "inferred";

type Fold = { y: number; reach: number; state: FoldState };

/**
 * 실 굵기 = 문법. 온폭과 반폭(1 : 0.5)은 1440에서 둘 다 그냥 "붉은 탭"으로 읽혔다 —
 * 굵기 차이만으로는 구분이 안 선다. 추정은 천이 아니라 실 한 올로 내리고,
 * 뻗는 거리도 줄여 형태 자체가 다르게 보이도록 한다.
 */
const GAUGE: Record<FoldState, number> = { known: 1, inferred: 0.16 };

/** 확정만 제비꼬리로 마감한다. 추정은 잘린 실이라 끝을 맺지 않는다. */
const REACH_SCALE: Record<FoldState, number> = { known: 1, inferred: 0.55 };

/** 리본이 걸린 자리(제본 여백)와 폭. body의 padding-left와 짝을 이룬다. */
const LAYOUT = {
  mobile: { spine: 22, band: 15, sway: 5 },
  desktop: { spine: 46, band: 26, sway: 9 },
};

/**
 * 리본 몸통의 외곽선. 폭이 일정한 직사각형은 다시 "선"으로 읽히므로,
 * 천이 비틀리는 자리에서 폭이 좁아지도록 좌우 가장자리를 따로 그린다.
 */
function spinePath(x: number, band: number, sway: number, height: number) {
  const step = 14;
  const left: string[] = [];
  const right: string[] = [];
  for (let y = 0; y <= height; y += step) {
    const t = y / 260; // 비틀림 주기 — 화면 높이와 무관하게 일정해야 천처럼 보인다
    const center = x + Math.sin(t) * sway;
    // 비틀리는 지점에서 폭이 줄어든다. 0.55는 완전히 접히지 않을 만큼의 하한.
    const w = (band / 2) * (0.55 + 0.45 * Math.abs(Math.cos(t)));
    left.push(`${center - w},${y}`);
    right.push(`${center + w},${y}`);
  }
  return `M${left.join(" L")} L${right.reverse().join(" L")} Z`;
}

/**
 * 접힘 하나. 몸통에서 천이 꺾여 나와 본문 쪽으로 뻗고, 끝은 리본 특유의 제비꼬리로 잘린다.
 * `reach`는 이 접힘이 가로로 건너갈 거리다.
 */
function foldPath(x: number, band: number, y: number, reach: number, state: FoldState) {
  const w = (band * GAUGE[state]) / 2;
  const tip = x + reach * REACH_SCALE[state];
  if (state !== "known") {
    // 추정 — 잘린 실. 제비꼬리도 없고 본문까지 닿지도 않는다.
    return `M${x},${y - w} L${tip},${y - w} L${tip},${y + w} L${x},${y + w} Z`;
  }
  const notch = Math.min(10, w * 1.4); // 제비꼬리 깊이
  return [
    `M${x},${y - w}`,
    `L${tip},${y - w}`,
    `L${tip - notch},${y}`,
    `L${tip},${y + w}`,
    `L${x},${y + w}`,
    "Z",
  ].join(" ");
}

export default function Ribbon() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  // 스크롤 0에서도 첫 화면은 이미 짜여 있어야 한다 — 0에서 시작하면 첫 뷰포트에
  // 서명 요소가 회색 윤곽뿐이다. 히어로 높이만큼 미리 풀어둔다.
  const woven = useTransform(spring, (v) => 0.16 + v * 0.84);

  const [doc, setDoc] = useState({ height: 0, wide: false });
  const [folds, setFolds] = useState<Fold[]>([]);

  useEffect(() => {
    const measure = () => {
      const height = document.documentElement.scrollHeight;
      const wide = window.innerWidth >= 768;
      const { spine } = wide ? LAYOUT.desktop : LAYOUT.mobile;
      const marks = [...document.querySelectorAll<HTMLElement>("[data-fold]")].map((el) => {
        const r = el.getBoundingClientRect();
        const state = (el.dataset.foldState ?? "known") as FoldState;
        return {
          y: r.top + window.scrollY + Math.min(r.height / 2, 26),
          // 항목의 왼쪽 끝을 조금 지나 물린다 — 날짜 라벨이 접힘 위에 얹히도록.
          reach: Math.max(24, r.left + window.scrollX - spine + 28),
          state,
        };
      });
      setDoc({ height, wide });
      setFolds(marks);
    };

    measure();
    // 폰트·이미지가 늦게 앉으면 문서 높이와 항목 위치가 전부 바뀐다.
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  if (!doc.height) return null;

  const { spine, band, sway } = doc.wide ? LAYOUT.desktop : LAYOUT.mobile;
  const body = spinePath(spine, band, sway, doc.height);
  const width = spine + band + Math.max(0, ...folds.map((f) => f.reach)) + 40;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden"
      style={{ height: doc.height }}
    >
      <svg
        width={width}
        height={doc.height}
        viewBox={`0 0 ${width} ${doc.height}`}
        fill="none"
        style={{ filter: "drop-shadow(1px 3px 3px rgba(42,38,33,0.28))" }}
      >
        <defs>
          {/* 실크 광택 — 천의 가로 단면. 가장자리는 어둡고 가운데가 밝아야 원통으로 읽힌다. */}
          <linearGradient id="silk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7d1220" />
            <stop offset="28%" stopColor="#c8253c" />
            <stop offset="52%" stopColor="#dc4152" />
            <stop offset="100%" stopColor="#8e1524" />
          </linearGradient>

          {/* 직조 — 씨실 방향으로만 촘촘한 이방성 노이즈. 등방성 노이즈는 종이가 되고,
              이건 천이 된다. */}
          <filter id="weave" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.7 0.05" numOctaves="3" seed="7" />
            <feColorMatrix type="saturate" values="0" />
          </filter>

          <clipPath id="ribbon-shape">
            <path d={body} />
            {folds.map((f, i) => (
              <path key={i} d={foldPath(spine, band, f.y, f.reach, f.state)} />
            ))}
          </clipPath>

          {/* 짜인 구간만 드러내는 마스크. 흰 사각형의 높이가 곧 스크롤 진행이다. */}
          <mask id="woven">
            <motion.rect
              x="0"
              width={width}
              height={doc.height}
              fill="#fff"
              // origin은 반드시 framer 쪽 프로퍼티로 준다. CSS transformOrigin으로 주면
              // framer가 자기 기본값(50% 50%)으로 덮어써서, 마스크가 위에서부터 자라지 않고
              // 문서 한가운데를 덮는다 — 첫 화면에 리본이 통째로 사라진다.
              style={{ scaleY: reduced ? 1 : woven, originX: 0, originY: 0 }}
            />
          </mask>
        </defs>

        {/* 미직 구간 — 아직 지나지 않은 이력. 폭은 이미 잡혀 있고 천만 없다. */}
        <g stroke="var(--thread)" strokeWidth="1" strokeDasharray="4 6" fill="none" opacity="0.7">
          <path d={body} />
          {folds.map((f, i) => (
            <path key={i} d={foldPath(spine, band, f.y, f.reach, f.state)} />
          ))}
        </g>

        {/* 짜인 구간 — 적색 실크 */}
        <g mask="url(#woven)">
          <g clipPath="url(#ribbon-shape)">
            <rect x="0" y="0" width={width} height={doc.height} fill="url(#silk)" />
            {/* 직조 결. multiply라 광택 위에 얹혀도 색이 뜨지 않는다. */}
            <rect
              x="0"
              y="0"
              width={width}
              height={doc.height}
              filter="url(#weave)"
              opacity="0.22"
              style={{ mixBlendMode: "multiply" }}
            />
          </g>

          {/* 접힘의 꺾인 자리 — 천이 몸통에서 빠져나오는 지점에 생기는 그늘과 광. */}
          {folds.map((f, i) => {
            const w = (band * GAUGE[f.state]) / 2;
            return (
              <g key={i}>
                <line
                  x1={spine + band / 2}
                  y1={f.y - w}
                  x2={spine + band / 2}
                  y2={f.y + w}
                  stroke="rgba(60,8,16,0.55)"
                  strokeWidth="3"
                />
                <line
                  x1={spine + band / 2 + 3}
                  y1={f.y - w + 1}
                  x2={spine + band / 2 + 3}
                  y2={f.y + w - 1}
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1"
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
