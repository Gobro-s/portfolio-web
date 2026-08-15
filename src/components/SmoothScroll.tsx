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
    // reduced-motion도 여기서 걸러야 한다 — globals.css의 감소 블록은 animation·transition만
    // 잡고, Lenis는 rAF로 스크롤 위치를 직접 보간하므로 CSS로는 꺼지지 않는다.
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // 페이지 내 앵커(#projects 등)를 Lenis가 직접 처리해 내부 위치가 어긋나지 않게 한다.
      anchors: true,
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
      // 뒤로/앞으로가기 — 브라우저의 스크롤 복원은 이미지·폰트 로딩에 따라 몇 프레임 늦게
      // 일어날 수 있다. 잠시 동안 매 프레임 Lenis 내부 상태를 네이티브 위치에 맞춰,
      // 복원 직후 휠이 옛 위치로 되감는 일을 막는다.
      isPopState.current = false;
      let frames = 0;
      let aborted = false;
      const abort = () => {
        aborted = true;
      };
      // 사용자가 휠·터치를 시작하면 즉시 동기화를 멈춰 입력을 방해하지 않는다.
      window.addEventListener("wheel", abort, { once: true, passive: true });
      window.addEventListener("touchstart", abort, { once: true, passive: true });
      const sync = () => {
        if (aborted) return;
        lenisRef.current?.scrollTo(window.scrollY, { immediate: true });
        if (++frames < 20) {
          requestAnimationFrame(sync);
        } else {
          window.removeEventListener("wheel", abort);
          window.removeEventListener("touchstart", abort);
        }
      };
      requestAnimationFrame(sync);
      return;
    }
    // 새 페이지로 이동할 때만 맨 위로 강제한다 — 위에서 아래로 읽는 구조이기 때문.
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
