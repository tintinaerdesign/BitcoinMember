import "./globals.css";
import React from "react";
import { Orbitron } from "next/font/google";
import { lineSeed } from "./fonts";
import type { Metadata, Viewport } from "next";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Bitcoin Membership",
  description: "Purchase, scan and get rewards",
};

// ✅ เพิ่ม Viewport เพื่อให้ Responsive Breakpoints (hidden, md:flex) ทำงานบนมือถือได้อย่างถูกต้อง
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
      <head>
        {/* Material Symbols */}
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </head>
      {/*
        ✅ เพิ่ม ${lineSeed.className} หรือเรียกใช้ font-sans เพื่อให้นำฟอนต์ไปใช้จริงกับทั้งหน้า
      */}
      <body
          className={`${lineSeed.variable} ${lineSeed.className} ${orbitron.variable} bg-black text-white antialiased`}
      >
      {children}
      </body>
      </html>
  );
}