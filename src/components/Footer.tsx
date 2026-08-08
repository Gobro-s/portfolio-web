import ArrowLink from "./ui/arrow-link";

export default function Footer() {
  return (
    <footer className="border-t border-line wrap py-16">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label">
            Contact
          </p>
          <div className="mt-4 flex flex-col gap-4">
            <div>
              <p className="label">
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
              <p className="label">
                GitHub
              </p>
              <ArrowLink
                href="https://github.com/Gobro-s"
                external
                className="label mt-1 text-sm text-foreground"
              >
                github.com/Gobro-s
              </ArrowLink>
            </div>
          </div>
        </div>
        <p className="label">
          © {new Date().getFullYear()} Ko Sehoon — Built with Next.js
        </p>
      </div>
    </footer>
  );
}
