import { projects, profile } from "@/data/projects";
import { AnimatedNumber } from "./ui/animated-number";

// 숫자는 전부 데이터에서 끌어온다 — 손으로 적어두면 프로젝트가 늘어도 옛 숫자가 남는다.
const stats = [
  {
    value: projects.length,
    unit: "개",
    label: "Projects",
    note: "기획부터 적용까지 직접 돈 사이클",
  },
  {
    value: projects.filter((p) => p.inProduction).length,
    unit: "개",
    label: "In production",
    note: "근무지에서 지금도 운영 중인 시스템",
  },
  {
    value: profile.certifications.length,
    unit: "개",
    label: "Certifications",
    note: "데이터·문서·언어·과학해설 자격",
  },
];

export default function StatsBand() {
  return (
    <dl className="mt-12 grid grid-cols-1 gap-x-8 gap-y-8 border-t border-line pt-8 sm:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label}>
          <dt className="font-label text-[10px] text-foreground-dim ">
            {s.label}
          </dt>
          <dd className="font-display mt-2 text-4xl font-semibold tracking-tight tabular-nums md:text-5xl">
            <AnimatedNumber value={s.value} />
            <span className="ml-1 text-xl text-foreground-dim md:text-2xl">{s.unit}</span>
          </dd>
          <p className="mt-2 text-sm break-keep text-foreground-dim">{s.note}</p>
        </div>
      ))}
    </dl>
  );
}
