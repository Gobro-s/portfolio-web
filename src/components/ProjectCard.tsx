import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";

/**
 * 프로젝트 카드의 내용만 담당한다. 등장 애니메이션과 스택 레이아웃은
 * ProjectStack이 감싸면서 붙인다 — 리스트 모드와 스택 모드가 같은 마크업을 쓴다.
 */
export default function ProjectCard({
  project,
  variant,
  onOpen,
}: {
  project: Project;
  variant: "list" | "panel";
  /** 스택 모드에서 카드 접힘 전환을 재생할 기회를 준다. 넘기지 않으면 평범한 링크. */
  onOpen?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const panel = variant === "panel";

  return (
    <Link
      href={`/projects/${project.slug}`}
      onClick={onOpen}
      data-cursor-hover
      className={
        panel
          ? // Cult UI의 texture-card에서 가져온 발상: 겹친 인셋 보더로 판을 띄운다.
            // 원본은 중첩 div 5겹에 neutral 팔레트가 하드코딩돼 있어, 같은 효과를
            // 이 사이트의 --line 토큰과 ring/shadow 한 겹으로 다시 만들었다.
            "group block overflow-hidden rounded-2xl border border-line bg-background-elevated p-6 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_18px_40px_-24px_rgba(20,24,33,0.45)] ring-1 ring-white/50 md:p-9"
          : "group block border-t border-line py-8 md:py-10"
      }
    >
      <article className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
        <div className="order-first aspect-video w-full shrink-0 overflow-hidden rounded-xl shadow-sm transition-transform duration-500 ease-out group-hover:scale-[1.03] md:order-none md:aspect-4/3 md:w-48">
          <Image
            src={project.images[0].src}
            alt={project.images[0].caption}
            width={480}
            height={360}
            // 데스크톱에선 192px 슬롯, 모바일에선 좌우 패딩을 뺀 전체 폭.
            // 이게 없으면 브라우저가 100vw로 가정해 필요 이상 큰 변형본을 받는다.
            sizes="(min-width: 768px) 192px, calc(100vw - 3rem)"
            // 카드 5장은 스택 모드에서 sticky로 겹쳐 있어, lazy면 Lenis 스무스 스크롤이
            // IntersectionObserver 판정을 흔들어 하나씩 계단식으로 뜨거나 안 뜬다.
            // eager로 처음부터 병렬로 받는다 — sizes+webp 변형본이라 5장 합쳐 ~150KB뿐.
            loading="eager"
            className="h-full w-full object-cover object-top"
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-sm text-foreground-dim">{project.no}</span>
            <span className="font-mono flex w-fit items-center gap-2 rounded-full border border-line px-3 py-1 text-[11px] tracking-[0.15em] text-foreground-dim uppercase">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: project.color }}
              />
              {project.coreSkill}
            </span>
          </div>
          <h3 className="font-display mt-4 text-4xl leading-[0.95] font-semibold tracking-tight break-keep transition-transform duration-500 group-hover:translate-x-2 sm:text-5xl md:text-6xl">
            {project.name}
          </h3>
          <p className="mt-4 max-w-lg text-foreground-dim">{project.tagline}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-foreground-dim">
            <span>{project.period}</span>
            <span aria-hidden>·</span>
            <span>{project.phases.join(" → ")}</span>
            <span className="link-underline text-foreground">케이스 스터디 열기 →</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
