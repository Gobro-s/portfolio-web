# portfolio-web

고세훈 포트폴리오 — 현장의 요구에 맞춰 설계하고, 만들고, 적용합니다.

## 배포 주소 — 지원 직무에 따라 URL을 골라서 냅니다

| 지원 직무 | 제출할 URL |
|---|---|
| **개발 (프론트엔드·풀스택)** | **https://gobro-s.github.io/portfolio-web/** |
| **기술영업 · 프리세일즈 · 기술지원** | **https://gobro-s.github.io/portfolio-web/field/** |

`/field`는 기업·기관 담당자와 관람객을 직접 마주한 현장 사업(현대백화점 판교점 팝업스토어,
KT·도봉경찰서 협업 행사 등)을 다룹니다. **사이트를 두 벌로 복제한 것이 아니라** 콘텐츠 소스
(`src/data/projects.ts`)는 하나로 두고 페이지만 하나 더 둔 구조입니다 — 복제하면 사실관계가
갈라져 한쪽만 낡고, 면접관이 두 링크를 다 보면 그게 더 위험하기 때문입니다.

개별 케이스 스터디는 `https://gobro-s.github.io/portfolio-web/projects/<slug>/` 입니다
(`voda` · `open-the-door` · `haruman` · `raim` · `robotics-reservation`).

`main` 브랜치에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가 자동으로
static export를 빌드해 GitHub Pages에 배포합니다. 배포 상태는 리포지토리의
[Actions 탭](https://github.com/Gobro-s/portfolio-web/actions)에서 확인할 수 있습니다.

> 첫 배포 시 Actions가 Pages를 자동 활성화하지 못하면:
> Settings → Pages → Source를 **GitHub Actions**로 한 번만 설정해 주세요.

## 로컬 개발

```bash
npm install
npm run dev         # http://localhost:3000
npm run build       # static export → out/
npm run check:fonts # 빌드 후: 잘라낸 폰트 CSS가 실제 나간 한글을 다 덮는지 대조
```

## 스택

- Next.js 16 (App Router, static export) + React 19
- Tailwind CSS 4, framer-motion, Lenis
- 폰트: Geist / Geist Mono(`next/font`) + Pretendard(서브셋 셀프호스팅)

## 구조 메모

- 프로젝트·프로필·현장 사업 데이터는 전부 `src/data/projects.ts` 한 파일에서 관리
- `phases`(발견→기획→개발→적용·운영)가 각 프로젝트가 커버한 사이클 단계를 표시
- 서브 경로 배포용 basePath는 빌드 시 `NEXT_PUBLIC_BASE_PATH` 환경변수로 주입
  (이미지 prefix는 `src/lib/image-loader.ts`)
- **빌드 시 생성되는 것 2가지** (둘 다 gitignore):
  - `public/images/projects/r/` ← `scripts/generate-image-variants.mjs`
  - `src/fonts/pretendard-dynamic-subset.css` ← `scripts/trim-font-css.mjs`
    (원본은 커밋된 `src/fonts/pretendard-all.css`)

## 문서

| 파일 | 내용 |
|---|---|
| `PRODUCT.md` | 목적(서류 통과율), 절대 제약 3개, 지어내면 안 되는 것 |
| `DESIGN.md` | 색·타이포·레이아웃·모션의 실제 값과 그 이유, 금지 목록 |
| `AGENTS.md` | **Next.js 16은 학습 데이터와 다름** — 코드 작성 전 `node_modules/next/dist/docs/` 확인 |
| `HANDOFF.md` | 인수인계 |
