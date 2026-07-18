import type { Metadata } from "next";
import { Geist_Mono, Fraunces, Noto_Serif_KR } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

// 한글 본문: Pretendard Variable (시스템 폰트 폴백 방지, 셀프호스팅)
const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz", "SOFT", "WONK"],
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
      className={`${pretendard.variable} ${geistMono.variable} ${fraunces.variable} ${notoSerifKR.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
