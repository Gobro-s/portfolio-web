import { profile } from "@/data/projects";
import CodeMotif from "./CodeMotif";

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

export default function Hero() {
  return (
    <section className="grain relative flex min-h-svh flex-col justify-between overflow-hidden border-b border-line px-6 pt-24 pb-8 md:px-12 md:pt-32 md:pb-10">
      <div className="pointer-events-none absolute inset-0 z-0 hidden items-center justify-end pr-8 md:flex lg:pr-24">
        <CodeMotif />
      </div>

      <div className="relative z-10">
        <p
          className="animate-fade-up font-mono text-[11px] tracking-[0.2em] text-foreground-dim uppercase sm:text-xs sm:tracking-[0.3em]"
          style={{ animationDelay: "0.05s" }}
        >
          고세훈 · Ko Sehoon
        </p>
        <h1 className="font-display mt-10 text-[clamp(2.1rem,6.5vw,4.8rem)] leading-[1.15] font-semibold tracking-[-0.03em] break-keep md:mt-14">
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
          <span className="font-mono mt-1 block text-sm opacity-60">
            {profile.tagline} — {profile.taglineEn}
          </span>
        </p>
      </div>

      <div
        className="animate-fade-up relative z-10 mt-14 grid grid-cols-2 items-end gap-x-6 gap-y-4 border-t border-line pt-5 font-mono text-[11px] tracking-[0.12em] text-foreground-dim uppercase sm:text-xs md:grid-cols-4"
        style={{ animationDelay: "0.75s" }}
      >
        <div>
          <p className="opacity-60">Now</p>
          <p className="mt-1 text-foreground normal-case">서울로봇인공지능과학관</p>
        </div>
        <div>
          <p className="opacity-60">Focus</p>
          <p className="mt-1 text-foreground normal-case">기획 · 개발 · 운영</p>
        </div>
        <div className="hidden md:block">
          <p className="opacity-60">Base</p>
          <p className="mt-1 text-foreground normal-case">Seoul, KR</p>
        </div>
        <a
          href="#projects"
          data-cursor-hover
          className="link-underline col-start-2 justify-self-end text-foreground md:col-start-auto"
        >
          Scroll ↓
        </a>
      </div>
    </section>
  );
}
