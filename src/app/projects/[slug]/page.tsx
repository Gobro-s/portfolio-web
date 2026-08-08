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
      <section className="relative border-b border-line px-6 pt-24 pb-14 md:px-12 md:pt-32 md:pb-20">
        <Link
          href="/#projects"
          className="link-underline font-label text-xs text-foreground-dim "
        >
          ← All projects
        </Link>

        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-display font-display-lg text-4xl font-bold tracking-tight break-keep sm:text-6xl md:text-8xl">
              {project.name}
            </h1>
          </div>
          {/* 분류는 잉크로 적는다. 리디자인 전 정체성의 파스텔 5종은 버프지 위에서
              1.4:1까지 떨어져 PRODUCT.md의 AA 제약을 깼다 — 색이 아니라 괘선이 구분한다. */}
          <span className="font-label w-fit border-l-2 border-accent pl-3 text-xs text-foreground">
            {project.coreSkill}
          </span>
        </div>

        <p className="mt-6 max-w-2xl text-lg text-foreground-dim">{project.tagline}</p>

        <dl className="mt-10 grid grid-cols-2 gap-6 text-xs text-foreground-dim md:grid-cols-4">
          <div>
            <dt className="font-label text-foreground-dim">Period</dt>
            <dd className="mt-1 text-foreground">{project.period}</dd>
          </div>
          <div>
            <dt className="font-label text-foreground-dim">Role</dt>
            <dd className="mt-1 text-foreground">{project.role}</dd>
          </div>
          <div className="col-span-2">
            <dt className="font-label text-foreground-dim">Cycle</dt>
            <dd className="mt-1 text-foreground">{project.phases.join(" → ")}</dd>
          </div>
        </dl>
      </section>

      <section className="border-b border-line px-6 py-14 md:px-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-label text-xs text-foreground-dim ">Why</p>
          </div>
          <div className="font-display text-2xl leading-snug font-medium md:col-span-8 md:text-3xl">
            {project.why.map((line) => (
              <p key={line} className="text-pretty">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line px-6 py-14 md:px-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-label text-xs text-foreground-dim ">
              My Role in the Architecture
            </p>
          </div>
          <div className="space-y-2 text-lg text-foreground-dim md:col-span-8">
            {project.architecture.map((line) => (
              <p key={line} className="text-pretty leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line px-6 py-14 md:px-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-label text-xs text-foreground-dim ">Stack</p>
          </div>
          <div className="space-y-6 md:col-span-8">
            {project.stack.map((s) => (
              <div key={s.label} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <span className="w-32 shrink-0 font-label text-sm text-foreground-dim">
                  {s.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-line px-3 py-1 text-xs"
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

      <section className="border-b border-line px-6 py-14 md:px-12 md:py-20">
        <p className="font-label text-xs text-foreground-dim ">
          Highlights
        </p>
        <Highlights highlights={project.highlights} />
      </section>

      <section className="border-b border-line px-6 py-14 md:px-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-label text-xs text-foreground-dim ">
              Friction &amp; Resolution
            </p>
          </div>
          <div className="space-y-2 text-lg text-foreground-dim md:col-span-8">
            {project.challenges.map((line) => (
              <p key={line} className="text-pretty leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line px-6 py-14 md:px-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-label text-xs text-foreground-dim ">
              Result
            </p>
          </div>
          <ul className="md:col-span-8 space-y-2">
            {project.results.map((r) => (
              <li key={r} className="font-display text-xl md:text-2xl">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-14 md:px-12 md:py-20">
        <Link href={`/projects/${next.slug}`} className="group block">
          <p className="font-label text-xs text-foreground-dim ">
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
