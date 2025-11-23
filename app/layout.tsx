import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Firecomponents",
  description:
    "Firecomponents is a collection of modern and unique components for Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.className} ${geistMono.variable} antialiased overflow-x-hidden py-8 px-4`}
      >
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-2xl ">{children}</div>
        </div>
      </body>
    </html>
  );
}
