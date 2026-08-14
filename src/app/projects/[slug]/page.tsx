import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import Footer from "@/components/Footer";
import Highlights from "@/components/Highlights";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const description = `${project.tagline} · ${project.period} · ${project.role}`;
  return {
    title: project.name,
    description,
    openGraph: {
      title: `${project.name} — 고세훈`,
      description,
      images: project.images.map((img) => ({ url: img.src, alt: img.caption })),
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — 고세훈`,
      description,
    },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <main>
      <section className="relative border-b border-line wrap pt-24 pb-14 md:pt-32 md:pb-20">
        <Link
          href="/#projects"
          className="link-underline label"
        >
          ← All projects
        </Link>

        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tight break-keep sm:text-6xl md:text-8xl">
              {project.name}
            </h1>
          </div>
          {/* 분류는 잉크로 적는다. 리디자인 전 정체성의 파스텔 5종은 버프지 위에서
              1.4:1까지 떨어져 PRODUCT.md의 AA 제약을 깼다 — 색이 아니라 괘선이 구분한다. */}
          <span className="label w-fit border-l-2 border-accent pl-3 text-[13px] text-foreground">
            {project.coreSkill}
          </span>
        </div>

        <p className="mt-6 max-w-2xl text-lg text-foreground-dim">{project.tagline}</p>

        <dl className="mt-10 grid grid-cols-2 gap-6 text-[13px] text-foreground-dim md:grid-cols-4">
          <div>
            <dt className="label">Period</dt>
            <dd className="mt-1 text-foreground">{project.period}</dd>
          </div>
          <div>
            <dt className="label">Role</dt>
            <dd className="mt-1 text-foreground">{project.role}</dd>
          </div>
          <div className="col-span-2">
            <dt className="label">Cycle</dt>
            <dd className="mt-1 text-foreground">{project.phases.join(" → ")}</dd>
          </div>
        </dl>
      </section>

      <section className="border-b border-line wrap py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label">Why</p>
          </div>
          {/* 문단 사이 간격은 문단 안 줄 간격보다 넓어야 한다 — 좁으면 문장이 끝난 자리보다
              줄이 넘어간 자리가 더 벌어져 어디서 끊어 읽을지가 안 보인다.
              30px · 줄높이 1.65 = 줄 사이 약 19.5px이므로 문단 사이는 28px.
              leading-snug은 지웠다: 자식이 전부 <p>라 globals.css의 1.65가 이기고 있었다(죽은 값). */}
          <div className="font-display space-y-7 text-2xl font-medium md:col-span-8 md:text-3xl">
            {project.why.map((line) => (
              <p key={line} className="text-balance">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line wrap py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label">
              My Role in the Architecture
            </p>
          </div>
          {/* 18px · 1.65 = 줄 사이 약 11.7px → 문단 사이 16px */}
          <div className="space-y-4 text-lg text-foreground-dim md:col-span-8">
            {project.architecture.map((line) => (
              <p key={line} className="text-pretty">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line wrap py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label">Stack</p>
          </div>
          <div className="space-y-6 md:col-span-8">
            {project.stack.map((s) => (
              <div key={s.label} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <span className="w-32 shrink-0 label">
                  {s.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-line px-3 py-1 text-[13px]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line wrap py-16 md:py-20">
        <p className="label">
          Highlights
        </p>
        <Highlights highlights={project.highlights} />
      </section>

      <section className="border-b border-line wrap py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label">
              Friction &amp; Resolution
            </p>
          </div>
          <div className="space-y-4 text-lg text-foreground-dim md:col-span-8">
            {project.challenges.map((line) => (
              <p key={line} className="text-pretty">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line wrap py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label">
              Result
            </p>
          </div>
          {/* 24px · 1.65 = 줄 사이 약 15.6px → 항목 사이 24px */}
          <ul className="md:col-span-8 space-y-6">
            {project.results.map((r) => (
              <li key={r} className="font-display text-xl md:text-2xl">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap py-16 md:py-20">
        <Link href={`/projects/${next.slug}`} className="group block">
          <p className="label">
            Next project
          </p>
          <h2 className="font-display link-underline mt-4 inline-block text-3xl font-bold break-keep transition-transform duration-500 group-hover:translate-x-3 sm:text-5xl md:text-7xl">
            {next.name}
          </h2>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
