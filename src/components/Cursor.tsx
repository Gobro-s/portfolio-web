"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const pos = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };

    // 위치만 기록한다 — DOM 반영은 rAF 한 번에 모아서 하므로, 고폴링레이트 마우스가
    // 프레임당 여러 번 이벤트를 쏴도 스타일 쓰기는 프레임당 한 번으로 고정된다.
    function onMove(e: PointerEvent) {
      pos.x = e.clientX;
      pos.y = e.clientY;
    }

    // hover 판정은 이동마다가 아니라 실제로 요소 경계를 넘을 때만 계산한다.
    // 매 mousemove마다 closest()로 DOM을 훑는 게 실제 프레임 드랍의 원인이었다.
    function onOver(e: PointerEvent) {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor-hover]"));
    }

    let rafId: number;
    function raf() {
      if (dotRef.current) {
        // 인라인 transform은 클래스의 -translate-1/2를 덮어쓰므로 중심 보정을 함께 넣는다
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent will-change-transform"
      />
      <div
        ref={ringRef}
        className={`custom-cursor pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,border-color] duration-200 will-change-transform ${
          hovering ? "h-12 w-12 border-accent" : "h-7 w-7 border-foreground-dim"
        }`}
      />
    </>
  );
}
