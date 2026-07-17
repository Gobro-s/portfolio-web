import { cycle } from "@/data/projects";

export default function ConceptStrip() {
  return (
    <section className="border-b border-line px-6 py-20 md:px-12">
      <div className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.2em] text-foreground-dim uppercase">
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
      <p className="font-display mt-8 max-w-3xl text-2xl leading-relaxed md:text-4xl">
        현장에서 발견한 문제를 설계하고, 만들고, <span className="text-accent italic">적용</span>합니다.
        <span className="block text-foreground-dim">
          그렇게 검증된 컴포넌트와 구조는 다음 현장에서 더 빠르게 완성됩니다.
        </span>
      </p>
    </section>
  );
}
