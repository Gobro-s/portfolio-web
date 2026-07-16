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

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <main>
      <section
        className="grain relative border-b border-line px-6 pt-32 pb-20 md:px-12"
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
        </dl>
      </section>

      <section className="border-b border-line px-6 py-14 md:px-12">
        <div className="grid gap-6 md:grid-cols-3">
          {project.images.map((img, i) => (
            <figure
              key={img.src}
              className={`overflow-hidden rounded-2xl shadow-lg ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              } ${i % 2 === 0 ? "-rotate-1" : "rotate-1"} transition-transform duration-500 hover:rotate-0`}
              style={{ background: `${project.color}33` }}
            >
              <Image
                src={img.src}
                alt={img.caption}
                width={1400}
                height={1000}
                className="w-full object-cover object-top"
              />
              <figcaption className="px-4 py-3 font-mono text-xs text-foreground-dim">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-b border-line px-6 py-20 md:px-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-xs tracking-[0.3em] text-foreground-dim uppercase">Why</p>
          </div>
          <p className="font-display max-w-2xl text-2xl leading-relaxed md:col-span-8 md:text-3xl">
            {project.why}
          </p>
        </div>
      </section>

      <section className="border-b border-line px-6 py-20 md:px-12">
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

      <section className="border-b border-line px-6 py-20 md:px-12">
        <p className="font-mono text-xs tracking-[0.3em] text-foreground-dim uppercase">
          Highlights
        </p>
        <RevealGroup>
          {project.highlights.map((h) => (
            <div key={h.title} className="border-t border-line py-8">
              <h3 className="font-display text-xl font-bold md:text-2xl" style={{ color: project.color }}>
                {h.title}
              </h3>
              <p className="mt-3 max-w-2xl text-foreground-dim leading-relaxed">{h.body}</p>
            </div>
          ))}
        </RevealGroup>
      </section>

      <section className="border-b border-line px-6 py-20 md:px-12">
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

      <section className="px-6 py-20 md:px-12">
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
