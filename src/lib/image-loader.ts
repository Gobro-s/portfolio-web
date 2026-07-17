import { BASE_PATH } from "./base-path";

// static export에서는 기본 이미지 최적화를 쓸 수 없고(정적 서버뿐),
// basePath는 next/image src에 자동 적용되지 않으므로 여기서 prefix만 붙인다.
export default function imageLoader({ src }: { src: string }) {
  return `${BASE_PATH}${src}`;
}
