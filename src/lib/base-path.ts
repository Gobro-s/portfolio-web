// GitHub Pages처럼 서브 경로에 배포될 때 빌드 시점에 주입되는 prefix.
// 로컬 개발/일반 호스팅에서는 빈 문자열.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
