import Link from "next/link";
import Image from "next/image";
import { profile, projects } from "@/data/projects";

/** 행 단위 마스크 리빌: 줄이 아래에서 떠오르며 한 번만 재생된다. CSS 애니메이션이라
 * 마운트 시 항상 재생을 보장한다 (JS 애니메이션 라이브러리의 rAF 경합에 영향받지 않음). */
function RevealLine({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden">
      <span
        className={`block animate-reveal-up ${className ?? ""}`}
        style={{ animationDelay: `${delay}s` }}
      >
        {children}
      </span>
    </span>
  );
}

/**
 * 첫 접힘(fold). 소장 이력에서 하나의 구간이 확정되는 지점이다.
 * 여기 걸리는 것은 주장이 아니라 지금 돌아가고 있는 시스템 — 리본이 실선인 이유.
 */
function Fold({
  date,
  children,
}: {
  date: string;
  children: React.ReactNode;
}) {
  return (
    // data-fold: 리본이 이 좌표에서 접혀 본문 칼럼으로 건너온다. 날짜는 그 접힘 위에 얹힌다.
    <div data-fold data-fold-state="known" className="thread-known pl-4 md:pl-6">
      <p className="font-label text-xs text-accent">{date}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export default function Hero() {
  // 첫 화면이 증명해야 하는 단 하나의 사실: 만든 것이 지금 현장에서 돌아간다.
  const live = projects.filter((p) => p.inProduction);

  return (
    <section className="relative min-h-svh border-b border-line px-6 pt-24 pb-8 md:px-12 md:pt-32 md:pb-10">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col justify-between lg:col-span-7 lg:min-h-[calc(100svh-14rem)]">
      <div className="relative z-10">
        <p
          className="animate-fade-up font-label text-sm text-foreground-dim"
          style={{ animationDelay: "0.05s" }}
        >
          고세훈 · Ko Sehoon
        </p>
        <h1 className="font-display font-display-lg mt-10 text-[clamp(2.1rem,6.5vw,4.8rem)] leading-[1.15] font-bold tracking-[-0.03em] break-keep md:mt-14">
          <RevealLine delay={0.15}>
            <span className="text-accent">요구</span>를 읽고,
          </RevealLine>
          <RevealLine delay={0.27}>
            <span className="text-accent">설계</span>하고, 만들고,
          </RevealLine>
          <RevealLine delay={0.39}>
            <span className="text-accent">적용</span>합니다.
          </RevealLine>
        </h1>
        <p
          className="animate-fade-up mt-8 max-w-md text-base leading-relaxed text-foreground-dim md:mt-10 md:text-lg"
          style={{ animationDelay: "0.6s" }}
        >
          모든 작업은 현장의 문제에서 시작합니다.
          <span className="mt-1 block text-sm leading-snug">
            {profile.tagline} — {profile.taglineEn}
          </span>
        </p>
      </div>

      {/* 첫 접힘: 슬로건 다음에 곧바로 증거가 온다. 심사자가 15초에 이탈해도
          "지금 돌아가는 시스템 2건"은 이미 읽고 나간다. */}
      <div
        className="animate-fade-up relative z-10 mt-14 max-w-xl"
        style={{ animationDelay: "0.75s" }}
      >
        <Fold date="2026.04 — 운영 중">
          <ul className="space-y-2">
            {live.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="link-underline font-display text-lg leading-snug font-bold break-keep md:text-xl"
                >
                  {p.name}
                </Link>
                {/* 인라인으로 붙이면 이름 뒤에서 시작한 태그라인이 다음 줄에서
                    왼쪽 끝으로 떨어져 계단이 생긴다. 원장 항목처럼 한 단 내려 앉힌다. */}
                <span className="mt-0.5 block text-sm leading-snug text-foreground-dim">
                  {p.tagline}
                </span>
              </li>
            ))}
          </ul>
        </Fold>

        {/* 주 액션. 10px 스몰캡으로 괘선 밑에 두면 각주로 읽힌다 —
            심사자가 찾아 헤매지 않을 크기로, 접힘 바로 다음 자리에 둔다. */}
        <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-line pt-6">
          <a
            href="#projects"
            className="link-underline font-display text-xl font-bold break-keep md:text-2xl"
          >
            이력 전체 보기 ↓
          </a>
          <p className="font-label ml-auto text-xs text-foreground-dim">
            재직 · 서울로봇인공지능과학관
          </p>
        </div>
          </div>
        </div>

        {/* 도판. 주장 대신 물건을 건다 — 지금 현장에서 돌아가는 화면 자체.
            박물관 마운트처럼 매트에 얹고 도판 번호와 캡션을 붙인다. */}
        <figure className="lg:col-span-5 lg:pt-6">
          <div className="border border-line bg-background-elevated p-3 shadow-sm">
            <Image
              src="/images/projects/reservation-dashboard.png"
              alt="체험실 대기열 시스템의 직원 대시보드 — 테이블 배정과 SMS 호출 현황"
              width={1200}
              height={750}
              sizes="(min-width: 1024px) 38vw, 90vw"
              loading="eager"
              className="w-full"
            />
          </div>
          <figcaption className="mt-3 flex flex-col gap-1 border-t border-line pt-3">
            <span className="font-label text-xs text-accent">
              도판 1 · 2026.04 — 운영 중
            </span>
            <span className="text-sm leading-snug text-foreground-dim">
              체험실 대기열 시스템의 직원 대시보드. 기획·개발·배포·운영을 혼자
              진행했고, 서울로봇인공지능과학관 현장에서 매일 사용됩니다.
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
