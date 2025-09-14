import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ConfigProvider, App } from "antd";
import "antd/dist/reset.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LQ Shop",
  description: "Shop bán account Liên Quân Mobile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <ConfigProvider theme={{ token: { colorPrimary: "#1677ff" } }}>
          <App>
            <header className="border-b bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/50">
              <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                <Link href="/" className="font-semibold">
                  LQ Shop
                </Link>
                <nav className="flex items-center gap-4 text-sm">
                  <Link href="/accounts">Tài khoản</Link>
                  <Link href="/auth/login">Đăng nhập</Link>
                </nav>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t">
              <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">
                © {new Date().getFullYear()} LQ Shop
              </div>
            </footer>
          </App>
        </ConfigProvider>
        <div id="message-container"></div>
      </body>
    </html>
  );
}
