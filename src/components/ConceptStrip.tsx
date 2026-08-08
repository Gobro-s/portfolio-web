import { cycle } from "@/data/projects";

export default function ConceptStrip() {
  return (
    <section className="border-b border-line wrap py-20 md:py-24">
      <div className="label flex flex-wrap items-center gap-x-3 gap-y-2">
        {cycle.map((phase, i) => (
          <span key={phase} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden>→</span>}
            <span>{phase}</span>
          </span>
        ))}
        <span aria-hidden>→</span>
        <span className="text-accent">재활용</span>
        <span aria-hidden>↩</span>
      </div>
      <p className="mt-8 max-w-3xl text-xl leading-relaxed font-bold tracking-tight break-keep text-pretty md:text-3xl">
        한 번 검증된 구조는 버리지 않습니다.
        <span className="mt-1 block font-medium text-foreground-dim">
          컴포넌트도, 배운 것도 — 다음 현장에서 더 빠르게 완성됩니다.
        </span>
      </p>
    </section>
  );
}
