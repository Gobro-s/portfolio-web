"use client";

import { useEffect } from "react";
import { projects } from "@/data/projects";
import imageLoader from "@/lib/image-loader";
import { HIGHLIGHT_IMAGE_SIZES, INITIAL } from "./Highlights";

/**
 * 다음 depth(케이스 스터디) 이미지를 랜딩에서 미리 받아둔다.
 *
 * <Link>는 뷰포트에 들어온 링크의 라우트 페이로드를 이미 프리페치한다(정적 라우트라 전체).
 * 그래서 클릭하면 마크업은 즉시 뜨는데, **무게의 대부분인 이미지는 그때부터 받는다** —
 * 실측(2026-08-14 배포본)으로 상세 한 장당 이미지가 289 KB ~ 836 KB다.
 * 그 구간을 랜딩이 다 뜬 뒤 유휴 시간으로 옮긴다.
 *
 * 안 하는 것:
 * - 아낀 데이터 모드·느린 회선에서는 아예 안 돈다. 안 볼 수도 있는 파일이라 그쪽이 손해다.
 * - 접혀 있는 Highlights(더 보기)까지는 안 받는다. 상세 페이지가 처음에 그리는 만큼만 맞춘다.
 */

// next/image가 sizes를 받으면 srcset을 next.config.ts의 imageSizes + deviceSizes로 만든다.
const WIDTHS = [256, 384, 640, 828, 1200];

// 한 번에 몇 장씩 띄울지. 브라우저 연결 수(호스트당 6)를 넘겨봐야 큐에서 기다릴 뿐이다.
const BATCH = 4;

export default function PrefetchDetailImages() {
  useEffect(() => {
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? "")) return;

    const sources = projects.flatMap((project) =>
      project.highlights
        .slice(0, INITIAL)
        .flatMap((highlight) => highlight.images?.map((image) => image.src) ?? []),
    );

    let index = 0;
    let handle = 0;

    const pump = () => {
      for (let n = 0; n < BATCH && index < sources.length; n++, index++) {
        const img = new Image();
        img.fetchPriority = "low"; // 랜딩의 나머지 리소스와 경쟁하지 않게 한다
        img.sizes = HIGHLIGHT_IMAGE_SIZES;
        img.srcset = WIDTHS.map((w) => `${imageLoader({ src: sources[index], width: w })} ${w}w`).join(", ");
      }
      if (index < sources.length) handle = requestIdleCallback(pump);
    };

    // 랜딩이 다 뜨고 유휴가 될 때까지 기다린다. 이미 load가 지난 뒤 마운트되는 경우도 있다.
    const start = () => {
      handle = requestIdleCallback(pump);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      cancelIdleCallback(handle);
    };
  }, []);

  return null;
}
