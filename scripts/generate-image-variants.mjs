/**
 * 프로젝트 이미지의 반응형 WebP 변형본을 미리 만들어 둔다.
 *
 * static export에서는 Next의 런타임 이미지 최적화를 쓸 수 없어서, 원본 PNG가 그대로
 * 나간다. 카드 썸네일은 192~222 CSS px로 보이는데 원본은 1000px이 넘어, 전송량보다
 * 디코딩된 비트맵(폭 × 높이 × 4바이트)이 메모리를 훨씬 크게 먹는 게 실제 문제였다.
 *
 * 여기서 만든 파일명 규칙(`<이름>-<너비>.webp`)을 src/lib/image-loader.ts가 그대로
 * 되짚어, next/image가 srcset을 만들고 브라우저가 슬롯 크기에 맞는 한 장만 받게 한다.
 *
 * 실행: node scripts/generate-image-variants.mjs
 */
import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";

// next.config.ts의 images.imageSizes + deviceSizes와 반드시 같은 목록이어야 한다.
// 목록에 없는 너비를 next/image가 요청하면 로더가 존재하지 않는 파일을 가리키게 된다.
const WIDTHS = [256, 384, 640, 828, 1200];

const SOURCE_DIR = "public/images/projects";
const OUTPUT_DIR = "public/images/projects/r";

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = (await readdir(SOURCE_DIR, { withFileTypes: true }))
    .filter((f) => f.isFile() && /\.(png|jpe?g)$/i.test(f.name))
    .map((f) => f.name);

  let originalBytes = 0;
  let generatedBytes = 0;

  for (const file of files) {
    const inputPath = path.join(SOURCE_DIR, file);
    const base = file.replace(/\.(png|jpe?g)$/i, "");
    originalBytes += (await stat(inputPath)).size;

    const image = sharp(inputPath);
    const { width: srcWidth } = await image.metadata();

    for (const width of WIDTHS) {
      // 원본보다 크게 늘리지 않는다. 대신 원본보다 큰 너비를 요청받을 수 있으므로
      // 그 경우에도 파일은 있어야 한다 — 원본 해상도 그대로 WebP로만 변환해 둔다.
      const targetWidth = Math.min(width, srcWidth);
      const outputPath = path.join(OUTPUT_DIR, `${base}-${width}.webp`);

      await sharp(inputPath)
        .resize({ width: targetWidth, withoutEnlargement: true })
        .webp({ quality: 82, effort: 6 })
        .toFile(outputPath);

      generatedBytes += (await stat(outputPath)).size;
    }

    process.stdout.write(`  ${base} (${srcWidth}px) → ${WIDTHS.length} variants\n`);
  }

  const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1);
  console.log(`\n원본 ${files.length}장: ${mb(originalBytes)} MB`);
  console.log(`변형본 ${files.length * WIDTHS.length}장 전체: ${mb(generatedBytes)} MB`);
  console.log(`(브라우저는 이 중 슬롯당 한 장만 내려받는다)`);
}

main();
