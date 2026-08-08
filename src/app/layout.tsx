import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// 한글 본문: Pretendard — globals.css에서 유니코드 서브셋 분할본을 셀프호스팅으로 import.
// 실제 쓰는 weight(400/500/600/700)의 등장 글자 청크만 병렬로 받아 2MB 단일 파일을 대체한다.

// 라틴 디스플레이·본문: Geist. 세리프(Caslon·고운바탕)를 걷어낸 자리다 —
// 세리프 디스플레이는 "웹 개발자"가 아니라 "아카이브·출판"으로 읽혔다.
// 한글은 Pretendard가 받는다(globals.css에서 서브셋 분할본 셀프호스팅).
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteDescription =
  "Open The Door, HARUMAN, VODA, RAIM Schedule Manager, Robotics Room Reservation — 현장의 요구에 맞춰 기획하고, 개발하고, 적용·운영까지 다루는 고세훈의 포트폴리오.";

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: {
    default: "고세훈 — 재활용하는 개발자",
    template: "%s — 고세훈",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    title: "고세훈 — 재활용하는 개발자",
    description: siteDescription,
    locale: "ko_KR",
    siteName: "고세훈 포트폴리오",
  },
  twitter: {
    card: "summary",
    title: "고세훈 — 재활용하는 개발자",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-background text-foreground">
        {/* 방향 계약 — 프로덕션 빌드에도 남아야 감사가 가능하다(JSX 주석은 빌드에서 사라진다). */}
        <div
          dangerouslySetInnerHTML={{
            __html: `<!--
THESIS: 이 사이트는 한 사람의 이력이 아니라 한 건의 소장 이력이다. 끊기지 않는 붉은 리본이
발견에서 운영까지를 통과하며, 확정과 추정을 실의 굵기로 구분한다. 개발자 포트폴리오가
늘 쓰는 카드 그리드 + 스크롤 리빌 배열을 거부한다.
OWN-WORLD: 아카이브 버프지(#EDE7D9) 위 잉크(#2A2621), 커스터디 라인은 적색 실크 리본(#B01B2E),
아직 안 짜인 구간은 미직 회색 실(#9A968C). 재질은 종이·실크·스탬프 잉크이며 전부 실제로 렌더된다 —
발이 보이는 버프지, 직조와 귀와 그림자를 가진 리본, 가장자리가 갉힌 스탬프. 날짜는 스몰캡,
본문은 원장 조판, 확정은 실선 추정은 헤어라인(콘텐츠에 없는 3단은 주장하지 않는다).
콘텐츠를 다 지워도 리본 하나로 알아볼 수 있어야 한다.
STORY: 심사자는 첫 화면에서 "이 사람이 만든 것이 지금 돌아간다"를 보고, 리본을 따라가며
발견에서 운영까지 전 구간을 직접 다뤘음을 이해하고, 실운영 2건의 상세로 들어간다.
FIRST VIEWPORT: 좌측에서 시작한 적색 리본이 화면을 세로로 관통한다. 리본 위 첫 접힘에
2026.04 — 운영 중이 스몰캡 날짜로 박히고, 그 오른쪽에 실운영 시스템 2건이 실선으로 선다.
이름은 상단 좌측, 주 액션(프로젝트 보기)은 리본의 첫 갈래에 붙는다.
FORM: 소장 이력 리본. 배정(6, 관보 조판)을 청중 식별·제품 명료성 두 축에서 이겨 채택.
seed key 2a4f73db.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`,
          }}
        />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <SmoothScroll>{children}</SmoothScroll>
        </div>
      </body>
    </html>
  );
}
