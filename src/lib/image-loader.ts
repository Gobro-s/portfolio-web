import { BASE_PATH } from "./base-path";

// static export에서는 기본 이미지 최적화를 쓸 수 없고(정적 서버뿐),
// basePath는 next/image src에 자동 적용되지 않으므로 여기서 prefix만 붙인다.
//
// 대신 scripts/generate-image-variants.mjs가 미리 만들어 둔 WebP 변형본
// (`/images/projects/r/<이름>-<너비>.webp`)으로 경로를 바꿔, next/image가 만드는
// srcset이 실제로 서로 다른 크기를 가리키게 한다. 여기 없이 원본 PNG를 그대로
// 내보내면 192px 슬롯에 1000px 넘는 비트맵이 들어가 메모리를 그만큼 잡아먹는다.
//
// width는 next.config.ts의 imageSizes + deviceSizes 중 하나로만 들어온다 —
// 변형본 생성 스크립트의 WIDTHS와 같은 목록을 유지해야 한다.
const VARIANT_SOURCE = /^\/images\/projects\/([^/]+)\.(png|jpe?g)$/i;

export default function imageLoader({ src, width }: { src: string; width: number }) {
  const match = src.match(VARIANT_SOURCE);
  if (match) {
    return `${BASE_PATH}/images/projects/r/${match[1]}-${width}.webp`;
  }
  // GIF·SVG 등 변형본이 없는 형식은 원본 그대로 내보낸다.
  return `${BASE_PATH}${src}`;
}
