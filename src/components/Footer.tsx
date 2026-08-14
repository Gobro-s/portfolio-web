import Link from "next/link";
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
        <div className="flex flex-col gap-3 md:items-end">
          {/* /field는 기술영업 지원용이라 랜딩의 흐름에 끼워 넣지 않는다. 다만 어디에서도
              닿을 수 없는 페이지는 숨긴 페이지로 읽히므로, 조용한 자리에 하나 둔다. */}
          <Link href="/field" className="link-underline label">
            현장 사업 — 기업·기관 협업 →
          </Link>
          <p className="label">
            © {new Date().getFullYear()} Ko Sehoon — Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
