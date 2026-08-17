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
    title: "Bitcoin Member",
    description: "Purchase, scan and get rewards",
};

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
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
            />
        </head>

        <body
            className={`${lineSeed.variable} ${lineSeed.className} ${orbitron.variable} min-h-screen bg-black text-white antialiased`}
        >
        {children}
        </body>
        </html>
    );
}