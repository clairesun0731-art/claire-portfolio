import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. 更新你的个人品牌 SEO 信息
export const metadata: Metadata = {
  title: "Claire Sun | B2B SEO & GEO Growth Expert",
  description: "Growth Portfolio of Claire Sun - Specialized in B2B SEO, SEM, and AI Search Optimization.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* 2. 必须把 font 变量加在 className 里，否则 globals.css 里的字体会失效 */}
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} 
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}