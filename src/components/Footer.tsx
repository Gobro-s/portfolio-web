export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-16 md:px-12">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-foreground-dim uppercase">
            Contact
          </p>
          <a
            href="mailto:govelopper@gmail.com"
            data-cursor-hover
            className="link-underline font-display mt-4 block text-2xl font-bold break-all sm:text-3xl md:text-5xl"
          >
            govelopper@gmail.com
          </a>
          <a
            href="https://github.com/Gobro-s"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="link-underline font-mono mt-4 inline-block text-sm tracking-widest uppercase text-foreground-dim"
          >
            github.com/Gobro-s ↗
          </a>
        </div>
        <p className="font-mono text-xs text-foreground-dim">
          © {new Date().getFullYear()} Ko Sehoon — Built with Next.js &amp; Three.js
        </p>
      </div>
    </footer>
  );
}
