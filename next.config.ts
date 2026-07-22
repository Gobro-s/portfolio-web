import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    // scripts/generate-image-variants.mjs의 WIDTHS와 같은 집합이어야 한다.
    // 로더가 이 너비로 파일명을 만들기 때문에, 목록에 없는 값이 들어오면
    // 존재하지 않는 파일을 가리키게 된다.
    // imageSizes는 sizes prop이 있는(= 뷰포트보다 좁은) 이미지에만 쓰이고,
    // 전부 deviceSizes의 최솟값보다 작아야 한다.
    imageSizes: [256, 384],
    deviceSizes: [640, 828, 1200],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
