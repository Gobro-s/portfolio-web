import type { Metadata } from "next";
import Link from "next/link";
import { fieldWork, projects } from "@/data/projects";
import Footer from "@/components/Footer";

/**
 * 기술영업·프리세일즈·기술지원 지원용 페이지.
 *
 * 랜딩(/)은 개발 포트폴리오다. 여기에 현장 사업을 섞으면 심사자의 초점이 흐려지고,
 * 반대로 사이트를 두 벌로 복제하면 사실관계가 갈라져 한쪽만 낡는다.
 * 그래서 콘텐츠 소스는 projects.ts 하나로 두고 페이지만 하나 더 판다.
 * 지원할 때 URL을 골라서 낸다 — 개발이면 /, 기술영업이면 /field.
 */
export const metadata: Metadata = {
  // layout.tsx의 template이 "— 고세훈"을 붙인다. 여기서 또 붙이면 두 번 나온다.
  title: "현장 사업",
  description:
    "현대백화점 판교점 팝업스토어, KT·도봉경찰서 협업 행사 — 기업·기관 담당자와 관람객에게 로봇과 교육 프로그램을 설명하고 현장에 걸어 온 기록.",
};

export default function FieldPage() {
  const bridged = fieldWork.bridge.slugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p) => p !== undefined);

  return (
    <main>
      <section className="border-b border-line wrap pt-24 pb-16 md:pt-32 md:pb-20">
        <Link href="/" className="link-underline label">
          ← 개발 포트폴리오
        </Link>

        <h1 className="font-display mt-10 text-4xl font-extrabold text-balance sm:text-5xl md:text-6xl">
          {fieldWork.title}
        </h1>

        <div className="mt-8">
          {fieldWork.lead.map((line, i) => (
            <p
              key={line}
              className={
                i === 0
                  ? "max-w-(--measure-lead) text-xl font-semibold text-pretty md:text-2xl"
                  : "mt-4 text-lg text-pretty text-foreground-dim"
              }
            >
              {line}
            </p>
          ))}
        </div>

        {/* 고객사 이름이 세 개 붙어 있으면 영업 실적으로 읽힌다. 그 오해를 페이지 맨 앞에서 끊는다 —
            뒤에서 물어보게 두면 숨긴 것이 되고, 먼저 꺼내면 그게 신뢰가 된다. */}
        <p className="mt-10 border-l-2 border-accent py-1 pl-5 text-[15px] text-pretty text-foreground-dim">
          {fieldWork.boundary}
        </p>
      </section>

      <section className="wrap py-16 md:py-20">
        <ol>
          {fieldWork.items.map((item, i) => (
            <li key={item.name} className="border-b border-line py-12 first:pt-0 md:py-16">
              <div className="grid gap-8 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-4">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="label font-mono">{String(i + 1).padStart(2, "0")}</span>
                    {item.inProgress ? (
                      <span className="live">진행 중</span>
                    ) : (
                      <span className="label">{item.period}</span>
                    )}
                  </div>
                  <h2 className="font-display mt-4 text-2xl font-bold text-balance md:text-3xl">
                    {item.name}
                  </h2>
                  <p className="label mt-3">{item.partner}</p>
                </div>

                <div className="md:col-span-8">
                  <p className="text-lg font-semibold text-pretty">{item.summary}</p>
                  {item.body.map((line) => (
                    <p key={line} className="mt-4 text-pretty text-foreground-dim">
                      {line}
                    </p>
                  ))}
                  {/* 배정된 업무라는 근거. 업무분장표에 있는 표현을 그대로 쓴다. */}
                  <p className="label mt-6 border-t border-line pt-4">{item.scope}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-line wrap py-16 md:py-20">
        <h2 className="font-display max-w-(--measure-lead) text-3xl font-extrabold text-balance md:text-4xl">
          {fieldWork.bridge.heading}
        </h2>
        <p className="mt-6 text-lg text-pretty text-foreground-dim">{fieldWork.bridge.body}</p>

        <ul className="mt-10 grid gap-8 sm:grid-cols-2">
          {bridged.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                className="link-underline font-display text-xl font-bold text-balance"
              >
                {p.name}
              </Link>
              <p className="mt-1.5 text-[15px] text-balance text-foreground-dim">{p.tagline}</p>
              <p className="label mt-2">{p.period}</p>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="link-underline font-display mt-12 inline-block text-lg font-bold text-accent"
        >
          개발 포트폴리오 전체 보기 — 프로젝트 5건 →
        </Link>
      </section>

      <Footer />
    </main>
  );
}
