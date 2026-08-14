/**
 * 안 쓰는 @font-face 선언을 잘라낸다.
 *
 * pretendard-all.css에는 4 weight × 92 유니코드 구간 = 368개의 @font-face가 들어 있다.
 * 브라우저는 그중 실제로 글자가 걸리는 구간의 woff2만 내려받지만, **선언 자체는 전부 읽는다.**
 * 배포본 실측(2026-08-14): 이 CSS가 gzip 62KB로 페이지에서 가장 무거운 렌더 블로킹
 * 리소스였고, 그중 73%가 이 사이트에 한 글자도 안 나오는 구간의 선언이었다.
 *
 * 이 사이트는 static export라 나갈 글자가 빌드 시점에 전부 정해져 있다.
 * 그래서 src/ 안의 글자를 모아, 걸리는 구간의 선언만 남긴다.
 *
 * 실행: node scripts/trim-font-css.mjs  (prebuild에서 자동 실행)
 * 입력: src/fonts/pretendard-all.css (커밋됨)
 * 출력: src/fonts/pretendard-dynamic-subset.css (gitignore — globals.css가 import하는 파일)
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";

const SOURCE = "src/fonts/pretendard-all.css";
const OUTPUT = "src/fonts/pretendard-dynamic-subset.css";
const SCAN_DIR = "src";

/** src/ 안에 등장하는 코드포인트 전부. 코드·주석까지 포함하는 과잉 집합이다 —
 *  빠뜨리면 글자가 안 나오지만 더 넣는 건 선언 몇 줄이 남는 것뿐이라 안전한 쪽으로 센다. */
async function usedCodePoints(dir, out = new Set()) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) await usedCodePoints(p, out);
    else if (/\.(ts|tsx|css|md)$/.test(entry.name) && !entry.name.startsWith("pretendard"))
      for (const ch of await readFile(p, "utf8")) out.add(ch.codePointAt(0));
  }
  return out;
}

/** "U+ac00-d7a3, U+f900" → [[0xac00, 0xd7a3], [0xf900, 0xf900]] */
function parseRanges(declaration) {
  return declaration.split(",").map((part) => {
    const [from, to] = part.trim().replace(/^U\+/i, "").split("-");
    return [parseInt(from, 16), parseInt(to ?? from, 16)];
  });
}

const source = await readFile(SOURCE, "utf8");
const codePoints = [...(await usedCodePoints(SCAN_DIR))];

// 첫 조각은 첫 @font-face 앞의 주석이다 — 그대로 살린다.
const [header, ...blocks] = source.split("@font-face");

/** 이어지는 코드포인트를 U+ 표기 구간으로 묶는다. [97,98,99,120] → "U+61-63, U+78" */
function formatRanges(sorted) {
  const out = [];
  for (const cp of sorted) {
    const last = out[out.length - 1];
    if (last && cp === last[1] + 1) last[1] = cp;
    else out.push([cp, cp]);
  }
  return out
    .map(([a, z]) => (a === z ? `U+${a.toString(16)}` : `U+${a.toString(16)}-${z.toString(16)}`))
    .join(", ");
}

const kept = blocks.flatMap((block) => {
  const declaration = block.match(/unicode-range:\s*([^;]+);/);
  // unicode-range가 없는 선언은 모든 글자를 담당하므로 자르면 안 된다.
  if (!declaration) return [block];
  const ranges = parseRanges(declaration[1]);
  const hit = codePoints.filter((cp) => ranges.some(([from, to]) => cp >= from && cp <= to));
  if (hit.length === 0) return [];
  // 남은 선언의 unicode-range도 실제 쓰는 글자만으로 다시 적는다.
  // 원본은 한글 구간을 글자 단위로 늘어놓아 선언 하나가 수백 바이트다 — 잘라낸 뒤에도
  // 그게 절반을 차지했다. 여기 없는 글자는 시스템 폰트로 떨어지지만, static export라
  // 나갈 글자가 빌드 시점에 고정이므로 그런 글자는 애초에 화면에 없다.
  return [
    block.replace(/unicode-range:\s*[^;]+;/, `unicode-range: ${formatRanges(hit.sort((a, b) => a - b))};`),
  ];
});

await writeFile(
  OUTPUT,
  `/* 자동 생성 — 고치지 말 것. 원본은 ${SOURCE}, 생성기는 scripts/trim-font-css.mjs */\n` +
    header.trimStart() +
    kept.map((b) => `@font-face${b}`).join(""),
  "utf8",
);

const kb = (s) => (Buffer.byteLength(s, "utf8") / 1024).toFixed(1);
console.log(
  `@font-face ${blocks.length} → ${kept.length}개 ` +
    `(${kb(source)} KB → ${kb(await readFile(OUTPUT, "utf8"))} KB, 글자 ${codePoints.length}종 기준)`,
);
