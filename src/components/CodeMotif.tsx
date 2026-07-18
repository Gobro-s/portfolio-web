/**
 * Hero 장식: 터미널 스니펫으로 정체성을 보여준다 — 특정 도구 이름 대신
 * "무엇을 하는 사람인지"에 집중한다. 순수 CSS 애니메이션이라(자바스크립트 없음)
 * 마운트 시 항상 재생을 보장한다.
 */
export default function CodeMotif() {
  return (
    <div className="animate-float-y w-full max-w-md rounded-xl border border-line bg-foreground text-background-elevated shadow-lg">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
      </div>
      <div className="font-mono px-6 py-8 leading-loose">
        <p className="text-sm text-white/40">$ whoami</p>
        <p className="mt-3 text-xl font-bold text-white/90 sm:text-2xl">
          <span className="relative inline-block overflow-hidden align-bottom">
            <span className="animate-reveal-x block">요구를 코드로 바꾸는 사람</span>
          </span>
          <span className="animate-blink-caret ml-1 inline-block h-5 w-[3px] translate-y-1 bg-accent align-middle" />
        </p>
        <p className="animate-fade-line mt-3 text-lg text-accent opacity-0 sm:text-xl">
          → 실운영까지 직접 배포합니다
        </p>
      </div>
    </div>
  );
}
