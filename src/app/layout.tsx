import type { Metadata } from "next";
import { Geist_Mono, Fraunces, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

// 한글 본문: Pretendard — globals.css에서 유니코드 서브셋 분할본을 셀프호스팅으로 import.
// 실제 쓰는 weight(400/500/600/700)의 등장 글자 청크만 병렬로 받아 2MB 단일 파일을 대체한다.

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  // opsz만 실제로 쓴다(font-optical-sizing: auto) — SOFT/WONK는 CSS에서 건드리지 않는데
  // 요청만 하면 변수 폰트 디자인 공간이 넓어져 파일이 그만큼 커진다.
  axes: ["opsz"],
});

// 한글 디스플레이: Fraunces(라틴) 뒤 폴백으로 세리프 무드를 한글 제목까지 유지
const notoSerifKR = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: "variable",
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
      className={`${geistMono.variable} ${fraunces.variable} ${notoSerifKR.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
