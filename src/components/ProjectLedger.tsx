import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";

/**
 * 프로젝트 목록. 카드 그리드가 아니라 항목 나열이다 — 카드는 테두리·그림자·배경이
 * 내용보다 먼저 읽히고, 같은 크기 3열은 가장 흔한 배열이라 아무것도 구분해주지 않는다.
 *
 * 각 항목이 답하는 것: 무엇을 / 왜 만들었나 / 무엇으로 만들었나 / 지금 돌아가나.
 * "왜"는 상세 페이지에만 두면 아무도 안 읽는다. 목록에서 첫 문단으로 올린다.
 */

/** why 배열에서 가장 강한 한 줄. 문제를 재정의한 문장이 있으면 그게 온다. */
function keyReason(why: string[]) {
  return why.find((line) => line.startsWith("하지만") || line.includes("진짜 문제")) ?? why[0];
}

function restOfReason(why: string[]) {
  const key = keyReason(why);
  return why.filter((l) => l !== key).slice(0, 2);
}

export default function ProjectLedger() {
  return (
    <section id="projects" className="wrap scroll-mt-8 py-20 md:py-28">
      <h2 className="font-display text-3xl font-extrabold text-balance md:text-4xl">
        프로젝트마다, 다른 근육을 썼습니다.
      </h2>
      <p className="mt-4 max-w-[54ch] text-pretty text-foreground-dim">
        각 항목은 무엇을 만들었는지보다 <strong className="font-semibold text-foreground">왜 만들었는지</strong>
        를 먼저 답합니다. 기능 목록은 상세 페이지에 있습니다.
      </p>

      <ol className="mt-14">
        {projects.map((p, i) => (
          <li key={p.slug} className="border-t border-line py-12 md:py-16">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <span className="label font-mono">{String(i + 1).padStart(2, "0")}</span>
                  {p.inProduction ? (
                    <span className="live">운영 중</span>
                  ) : (
                    <span className="label">{p.period}</span>
                  )}
                  {p.inProduction && <span className="label">{p.period}</span>}
                </div>

                <h3 className="font-display mt-4 text-4xl font-extrabold text-balance sm:text-5xl">
                  <Link href={`/projects/${p.slug}`} className="link-underline">
                    {p.name}
                  </Link>
                </h3>
                <p className="mt-3 max-w-[48ch] text-lg text-pretty text-foreground-dim">{p.tagline}</p>

                <div className="mt-8 border-l-2 border-accent pl-5">
                  <p className="label text-accent">왜 만들었나</p>
                  <p className="mt-2.5 max-w-[52ch] text-lg leading-snug font-semibold text-balance">
                    {keyReason(p.why)}
                  </p>
                  {restOfReason(p.why).map((line) => (
                    <p key={line} className="mt-2 max-w-[54ch] text-[15px] text-pretty text-foreground-dim">
                      {line}
                    </p>
                  ))}
                </div>

                <p className="mt-7 font-mono text-[13px] leading-relaxed text-foreground-mute">
                  {p.stack.flatMap((g) => g.items).join(" · ")}
                </p>

                {/* 상세 페이지 입구. 이름에만 링크를 걸어두면 링크가 있는 줄도 모른다 —
                    구조·문제해결·결과가 전부 그 안에 있으므로 진입점이 눈에 보여야 한다. */}
                <Link
                  href={`/projects/${p.slug}`}
                  className="link-underline font-display mt-7 inline-block text-lg font-bold text-accent"
                >
                  케이스 스터디 — 구조 · 문제 해결 · 결과 →
                </Link>
              </div>

              <figure className="lg:col-span-5">
                <Link
                  href={`/projects/${p.slug}`}
                  aria-label={`${p.name} 케이스 스터디 열기`}
                  className="plate group block overflow-hidden bg-background-elevated hover:-translate-y-0.5"
                >
                  <Image
                    src={p.images[0].src}
                    alt={p.images[0].caption}
                    width={640}
                    height={480}
                    sizes="(min-width: 1024px) 38vw, 90vw"
                    // 5장이 한 화면에 다 안 들어와도 eager로 받는다 — Lenis 스무스 스크롤이
                    // IntersectionObserver 판정을 흔들어 lazy면 계단식으로 뜨거나 안 뜬다.
                    loading="eager"
                    className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </Link>
                <figcaption className="mt-3 text-sm leading-snug text-foreground-mute">
                  {p.images[0].caption}
                </figcaption>
              </figure>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
