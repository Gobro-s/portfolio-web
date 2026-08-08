import Link from "next/link";
import Image from "next/image";
import { profile, projects } from "@/data/projects";

/** 행 단위 마스크 리빌: 줄이 아래에서 떠오르며 한 번만 재생된다. CSS 애니메이션이라
 * 마운트 시 항상 재생을 보장한다 (JS 애니메이션 라이브러리의 rAF 경합에 영향받지 않음). */
function RevealLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <span className="animate-reveal-up block" style={{ animationDelay: `${delay}s` }}>
        {children}
      </span>
    </span>
  );
}

/**
 * 첫 화면. 심사자가 15초에 읽는 순서 그대로 쌓는다 —
 * 누구인가 / 무엇을 주장하는가 / 그 증거가 지금 돌아가는가 / 무엇으로 만들었는가.
 * 스토리는 그 다음이다. 여기서 이탈해도 "운영 중 2건"은 읽고 나가야 한다.
 */
export default function Hero() {
  const live = projects.filter((p) => p.inProduction);
  const core = profile.skills.slice(0, 6).map((s) => s.name);

  return (
    <section className="wrap grid items-start gap-12 pt-24 pb-20 md:pt-32 md:pb-28 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <p className="animate-fade-up label" style={{ animationDelay: "0.05s" }}>
          고세훈 · Ko Sehoon — 웹 개발 · 서울로봇인공지능과학관 재직
        </p>

        <h1 className="font-display mt-7 text-[clamp(2.4rem,5.4vw,4.1rem)] font-extrabold text-balance md:mt-9">
          <RevealLine delay={0.12}>현장의 문제를 찾아</RevealLine>
          <RevealLine delay={0.24}>
            <span className="text-accent">직접 만들고, 운영합니다.</span>
          </RevealLine>
        </h1>

        <p
          className="animate-fade-up mt-8 max-w-[46ch] text-lg leading-relaxed text-pretty text-foreground-dim md:text-xl"
          style={{ animationDelay: "0.5s" }}
        >
          기획서를 받아 구현하는 자리가 아니었습니다.{" "}
          <strong className="font-semibold text-foreground">
            문제를 발견한 사람이 그대로 만들고, 배포하고, 지금도 고쳐 쓰고 있습니다.
          </strong>
        </p>

        {/* 주장 바로 다음에 증거. 심사자가 제일 먼저 확인하는 것은 "실제로 돌아가느냐"다. */}
        <div
          className="animate-fade-up mt-12 border-t border-line pt-7"
          style={{ animationDelay: "0.62s" }}
        >
          <p className="live">지금 근무지에서 운영 중 · {live.length}건</p>
          <ul className="mt-5 grid gap-6 sm:grid-cols-2">
            {live.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="link-underline font-display text-xl font-bold text-balance"
                >
                  {p.name}
                </Link>
                <p className="mt-1.5 text-[15px] leading-snug text-foreground-dim">{p.tagline}</p>
                <p className="label mt-2">{p.period}</p>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="animate-fade-up mt-10 flex flex-wrap items-baseline gap-x-10 gap-y-4"
          style={{ animationDelay: "0.74s" }}
        >
          <a href="#projects" className="link-underline font-display text-lg font-bold">
            프로젝트 5건 · 왜 만들었는지부터 →
          </a>
          <p className="font-mono text-[13px] text-foreground-mute">{core.join(" · ")}</p>
        </div>
      </div>

      {/* 주장 옆에 물건을 건다. 지금 현장에서 돌아가는 화면 자체가 가장 강한 증거다. */}
      <figure className="lg:col-span-5 lg:pt-3">
        <div className="plate overflow-hidden bg-background-elevated">
          <Image
            src="/images/projects/reservation-dashboard.png"
            alt="체험실 대기열 시스템의 직원 대시보드 — 테이블 배정과 SMS 호출 현황"
            width={1200}
            height={750}
            sizes="(min-width: 1024px) 40vw, 90vw"
            loading="eager"
            className="w-full"
          />
        </div>
        <figcaption className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-foreground-dim">
          <strong className="font-semibold text-foreground">체험실 대기열 시스템의 직원 대시보드.</strong>{" "}
          기획·개발·배포·운영을 혼자 진행했고, 서울로봇인공지능과학관 현장에서 매일 사용됩니다.
        </figcaption>
      </figure>
    </section>
  );
}
