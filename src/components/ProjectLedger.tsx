import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";

/**
 * 원장(ledger). 프로젝트는 카드가 아니라 소장 이력의 항목이다.
 * 리본이 항목마다 접히고, 항목은 그 접힘에 걸린다 — `data-fold`가 그 좌표를 리본에 알린다.
 *
 * 카드 그리드와 스티키 스택은 THESIS가 이름 대고 거부한 배열이라 쓰지 않는다.
 * 겹쳐 쌓으면 정지 상태에서 뒤 항목이 영구히 가려지기도 했다.
 *
 * 실 굵기가 커스터디를 말한다:
 *   확정(known)   — 지금 현장에서 돌아가고 있어 직접 확인이 되는 것
 *   추정(inferred) — 종료돼 저장소와 산출물로만 남은 것
 */

/** 사진을 대지에 끼운 자국. 네 귀의 삼각 탭 — 붙인 게 아니라 끼운 것이다. */
function CornerTabs() {
  const corners = [
    "top-0 left-0 [clip-path:polygon(0_0,100%_0,0_100%)]",
    "top-0 right-0 [clip-path:polygon(0_0,100%_0,100%_100%)]",
    "bottom-0 left-0 [clip-path:polygon(0_0,0_100%,100%_100%)]",
    "bottom-0 right-0 [clip-path:polygon(100%_0,100%_100%,0_100%)]",
  ];
  return (
    <>
      {corners.map((c) => (
        <span
          key={c}
          aria-hidden
          className={`absolute h-5 w-5 bg-background-elevated shadow-[0_1px_1px_rgba(42,38,33,0.25)] ${c}`}
        />
      ))}
    </>
  );
}

export default function ProjectLedger() {
  return (
    <section id="projects" className="scroll-mt-8 px-6 py-16 md:px-12 md:py-24">
      <h2 className="font-display text-3xl font-bold break-keep md:text-4xl">
        프로젝트마다, 다른 근육을 썼습니다.
      </h2>

      <ol className="mt-14">
        {projects.map((p) => {
          const known = p.inProduction;
          return (
            <li
              key={p.slug}
              data-fold
              data-fold-state={known ? "known" : "inferred"}
              className={`${known ? "thread-known" : "thread-inferred"} border-t border-line py-10 pl-5 md:py-14 md:pl-8`}
            >
              <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
                <div className="flex-1">
                  <p className="font-label flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-foreground-dim">
                    <span>{p.period}</span>
                    {known && <span className="stamp font-label text-[11px]">운영 중</span>}
                  </p>

                  <h3 className="font-display font-display-lg mt-4 text-4xl leading-[0.95] font-semibold tracking-tight break-keep sm:text-5xl">
                    <Link href={`/projects/${p.slug}`} className="link-underline">
                      {p.name}
                    </Link>
                  </h3>

                  <p className="mt-4 max-w-lg break-keep text-foreground-dim">{p.tagline}</p>

                  <p className="font-label mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-foreground-dim">
                    <span>{p.phases.join(" → ")}</span>
                    <span aria-hidden>·</span>
                    <span>{p.coreSkill}</span>
                  </p>
                </div>

                {/* 표본 — 대지에 끼운 도판. 주장 옆에 물건을 둔다. */}
                <figure className="w-full shrink-0 md:w-72">
                  <div className="relative shadow-[0_8px_18px_-10px_rgba(42,38,33,0.6)]">
                    <Image
                      src={p.images[0].src}
                      alt={p.images[0].caption}
                      width={480}
                      height={360}
                      sizes="(min-width: 768px) 288px, calc(100vw - 3rem)"
                      // 5장이 한 화면에 다 안 들어와도 eager로 받는다 — Lenis 스무스 스크롤이
                      // IntersectionObserver 판정을 흔들어 lazy면 계단식으로 뜨거나 안 뜬다.
                      loading="eager"
                      className="block w-full"
                    />
                    <CornerTabs />
                  </div>
                </figure>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
