import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hijab Essence | Liquid Glass Edition",
  description: "Sophisticated E-commerce for Hijab Essence",
};

import { Providers } from "./providers";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { TopBar } from "@/components/ui/TopBar";
import { LiveChat } from "@/components/ui/LiveChat";
import { GlobalModals } from "@/components/ui/GlobalModals";
import { CartDrawer } from "@/components/ui/CartDrawer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${playfair.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)] transition-colors duration-300">
            <TopBar />
            {children}
            <FloatingDock />
            <LiveChat />
            <CartDrawer />
            <GlobalModals />
          </div>
        </Providers>
      </body>
    </html>
  );
}
