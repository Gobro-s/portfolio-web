import { cn } from "@/lib/utils";

/**
 * Skiper UI — Skiper40 / Link003 (https://skiper-ui.com)
 * 무료 컴포넌트 사용 조건이 Skiper UI 출처 표기라 이 주석을 남긴다.
 *
 * 원본에서 바꾼 것: 밑줄 위치를 고정값(top-[1.5em]) 대신 글자 아래(bottom)에 붙여
 * 이 사이트의 큰 디스플레이 폰트에서도 어긋나지 않게 했고, 외부 링크가 아닐 때는
 * 화살표를 빼도록 옵션을 뒀다. 전부 CSS 전환이라 자바스크립트 비용이 없다.
 */
export default function ArrowLink({
  children,
  href,
  className,
  external = false,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}

      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group relative inline-flex items-center",
        className,
        "before:pointer-events-none before:absolute before:bottom-[-0.1em] before:left-0 before:h-[0.05em] before:w-full before:bg-current before:content-['']",
        "before:origin-center before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:before:scale-x-100",
      )}
    >
      {children}
      <svg
        className="ml-[0.3em] size-[0.55em] shrink-0 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
        fill="none"
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
