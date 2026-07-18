"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const isPopState = useRef(false);

  useEffect(() => {
    // 브라우저 뒤로/앞으로가기는 popstate로 온다 — 이 경우엔 맨 위로 강제하지 않고
    // 브라우저가 기억한 스크롤 위치를 그대로 살린다.
    const onPopState = () => {
      isPopState.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    // 터치 기기에서는 네이티브 스크롤이 항상 낫다: OS 관성 그대로,
    // 스와이프 한 번에 내려가는 양도 시스템 기본을 따른다.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (isPopState.current) {
      // 뒤로/앞으로가기 — 브라우저가 이미 복원한 스크롤 위치에 Lenis 내부 상태만 맞춘다.
      isPopState.current = false;
      requestAnimationFrame(() => {
        lenisRef.current?.scrollTo(window.scrollY, { immediate: true });
      });
      return;
    }
    // 새 페이지로 이동할 때만 맨 위로 강제한다 — 위에서 아래로 읽는 구조이기 때문.
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
