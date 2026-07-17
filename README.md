# portfolio-web

고세훈 포트폴리오 — 현장의 요구에 맞춰 설계하고, 만들고, 적용합니다.

## 배포 주소

**https://gobro-s.github.io/portfolio-web/**

`main` 브랜치에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가 자동으로
static export를 빌드해 GitHub Pages에 배포합니다. 배포 상태는 리포지토리의
[Actions 탭](https://github.com/Gobro-s/portfolio-web/actions)에서 확인할 수 있습니다.

> 첫 배포 시 Actions가 Pages를 자동 활성화하지 못하면:
> Settings → Pages → Source를 **GitHub Actions**로 한 번만 설정해 주세요.

## 로컬 개발

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # static export → out/
```

## 스택

- Next.js 16 (App Router, static export) + React 19
- Tailwind CSS 4, framer-motion, Lenis
- Three.js / @react-three/fiber — 히어로 사이클 씬

## 구조 메모

- 프로젝트·프로필 데이터는 전부 `src/data/projects.ts` 한 파일에서 관리
- `phases`(발견→기획→개발→적용·운영)가 각 프로젝트가 커버한 사이클 단계를 표시
- 서브 경로 배포용 basePath는 빌드 시 `NEXT_PUBLIC_BASE_PATH` 환경변수로 주입
  (이미지 prefix는 `src/lib/image-loader.ts`)
