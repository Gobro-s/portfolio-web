/**
 * 잘라낸 폰트 CSS가 실제로 나간 HTML의 글자를 전부 덮는지 확인한다.
 *
 * trim-font-css.mjs는 src/를 훑어 쓰는 글자를 셈하는데, 빌드 결과에만 나타나는 글자가
 * 있으면(다른 패키지가 넣는 문자열 등) 그 글자만 시스템 폰트로 떨어진다 — 화면에서
 * 알아채기 어려운 종류의 회귀라 자동으로 잡는다.
 *
 * 실행: npm run build 뒤에 `node scripts/check-font-coverage.mjs`
 */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const CSS = "src/fonts/pretendard-dynamic-subset.css";
const OUT_DIR = "out";

async function htmlFiles(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) await htmlFiles(p, out);
    else if (entry.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const css = await readFile(CSS, "utf8");
const covered = [...css.matchAll(/unicode-range:\s*([^;]+);/g)].flatMap(([, decl]) =>
  decl.split(",").map((part) => {
    const [from, to] = part.trim().replace(/^U\+/i, "").split("-");
    return [parseInt(from, 16), parseInt(to ?? from, 16)];
  }),
);

// 라틴·기호는 Geist가 맡고, 시스템 sans도 다 갖고 있다. 빠지면 실제로 곤란한 건 한글이다.
const isHangul = (cp) =>
  (cp >= 0xac00 && cp <= 0xd7a3) || (cp >= 0x1100 && cp <= 0x11ff) || (cp >= 0x3130 && cp <= 0x318f);

const missing = new Set();
for (const file of await htmlFiles(OUT_DIR)) {
  for (const ch of await readFile(file, "utf8")) {
    const cp = ch.codePointAt(0);
    if (isHangul(cp) && !covered.some(([a, z]) => cp >= a && cp <= z)) missing.add(ch);
  }
}

if (missing.size > 0) {
  console.error(`✗ 폰트가 안 덮는 한글 ${missing.size}자: ${[...missing].join("")}`);
  console.error(`  ${CSS}를 만든 scripts/trim-font-css.mjs의 SCAN_DIR 범위를 넓혀야 한다.`);
  process.exit(1);
}
console.log("✓ 빌드된 HTML의 한글이 전부 잘라낸 폰트 CSS 안에 있다.");
