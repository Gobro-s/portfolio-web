import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import Footer from "@/components/Footer";
import RevealGroup from "@/components/RevealGroup";

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
      <section
        className="grain relative border-b border-line px-6 pt-24 pb-14 md:px-12 md:pt-32 md:pb-20"
        style={{ background: `linear-gradient(180deg, ${project.color}14, transparent 60%)` }}
      >
        <Link
          href="/#projects"
          data-cursor-hover
          className="link-underline font-mono text-xs tracking-[0.2em] text-foreground-dim uppercase"
        >
          ← All projects
        </Link>

        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-sm text-foreground-dim">{project.no}</span>
            <h1 className="font-display mt-2 text-4xl font-bold tracking-tight break-keep sm:text-6xl md:text-8xl">
              {project.name}
            </h1>
          </div>
          <span
            className="font-mono w-fit rounded-full border px-4 py-1.5 text-[11px] tracking-[0.15em] uppercase"
            style={{ borderColor: project.color, color: project.color }}
          >
            {project.coreSkill}
          </span>
        </div>

        <p className="mt-6 max-w-2xl text-lg text-foreground-dim">{project.tagline}</p>

        <dl className="mt-10 grid grid-cols-2 gap-6 font-mono text-xs text-foreground-dim md:grid-cols-4">
          <div>
            <dt className="uppercase tracking-widest">Period</dt>
            <dd className="mt-1 text-foreground">{project.period}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest">Role</dt>
            <dd className="mt-1 text-foreground">{project.role}</dd>
          </div>
          <div className="col-span-2">
            <dt className="uppercase tracking-widest">Cycle</dt>
            <dd className="mt-1 text-foreground">{project.phases.join(" → ")}</dd>
          </div>
        </dl>
      </section>

      <section className="border-b border-line px-6 py-14 md:px-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-xs tracking-[0.3em] text-foreground-dim uppercase">Why</p>
          </div>
          <p className="font-display max-w-2xl text-2xl leading-relaxed md:col-span-8 md:text-3xl">
            {project.why}
          </p>
        </div>
      </section>

      <section className="border-b border-line px-6 py-14 md:px-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-xs tracking-[0.3em] text-foreground-dim uppercase">
              My Role in the Architecture
            </p>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-foreground-dim md:col-span-8">
            {project.architecture}
          </p>
        </div>
      </section>

      <section className="border-b border-line px-6 py-14 md:px-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-xs tracking-[0.3em] text-foreground-dim uppercase">Stack</p>
          </div>
          <div className="space-y-6 md:col-span-8">
            {project.stack.map((s) => (
              <div key={s.label} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <span className="font-mono w-32 shrink-0 text-sm text-foreground-dim">
                  {s.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="font-mono rounded-full border border-line px-3 py-1 text-xs"
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
        <p className="font-mono text-xs tracking-[0.3em] text-foreground-dim uppercase">
          Highlights
        </p>
        <RevealGroup>
          {project.highlights.map((h) => (
            <div key={h.title} className="flex flex-col gap-6 border-t border-line py-8 sm:flex-row">
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold md:text-2xl" style={{ color: project.color }}>
                  {h.title}
                </h3>
                <p className="mt-3 max-w-2xl text-foreground-dim leading-relaxed">{h.body}</p>
              </div>
              {h.images && h.images.length > 0 && (
                <div className="flex shrink-0 gap-3 sm:w-56 sm:flex-col">
                  {h.images.map((img) => (
                    <figure
                      key={img.src}
                      className="flex-1 overflow-hidden rounded-lg border border-line shadow-sm sm:flex-none"
                    >
                      <Image
                        src={img.src}
                        alt={img.caption}
                        width={480}
                        height={360}
                        className="w-full object-cover object-top"
                      />
                      <figcaption className="px-2 py-1.5 font-mono text-[10px] leading-snug text-foreground-dim">
                        {img.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </div>
          ))}
        </RevealGroup>
      </section>

      <section className="border-b border-line px-6 py-14 md:px-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-xs tracking-[0.3em] text-foreground-dim uppercase">
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
        <Link href={`/projects/${next.slug}`} data-cursor-hover className="group block">
          <p className="font-mono text-xs tracking-[0.3em] text-foreground-dim uppercase">
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
