import ArrowLink from "./ui/arrow-link";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-16 md:px-12">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-foreground-dim uppercase">
            Contact
          </p>
          <div className="mt-4 flex flex-col gap-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-foreground-dim uppercase">
                Email
              </p>
              <ArrowLink
                href="mailto:govelopper@gmail.com"
                className="font-display mt-1 text-lg font-bold break-all sm:text-xl md:text-2xl"
              >
                govelopper@gmail.com
              </ArrowLink>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-foreground-dim uppercase">
                GitHub
              </p>
              <ArrowLink
                href="https://github.com/Gobro-s"
                external
                className="font-mono mt-1 text-sm tracking-widest text-foreground"
              >
                github.com/Gobro-s
              </ArrowLink>
            </div>
          </div>
        </div>
        <p className="font-mono text-xs text-foreground-dim">
          © {new Date().getFullYear()} Ko Sehoon — Built with Next.js
        </p>
      </div>
    </footer>
  );
}
