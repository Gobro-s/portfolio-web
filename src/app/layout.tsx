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
        {/* 여기 있던 "붉은 리본 / 버프지(#EDE7D9)" 방향 계약 주석을 지웠다.
            그 세계관은 커밋 70fc6ae에서 폐기됐는데 주석만 남아 페이지마다 1.3KB씩
            나가고 있었다 — 소스를 열어본 사람에게 사이트가 자기를 실제와 다르게 설명하는 셈이다.
            지금 기준은 리포 루트의 DESIGN.md에 있다. 빌드 산출물이 아니라 문서로 둔다. */}
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <SmoothScroll>{children}</SmoothScroll>
        </div>
      </body>
    </html>
  );
}
