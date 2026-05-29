import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SiteAmbience from "@/components/common/SiteAmbience";

const SmoothScroll = dynamic(() => import("@/components/common/SmoothScroll"));
const CustomCursor = dynamic(() => import("@/components/common/CustomCursor"));

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["italic"],
  weight: "400",
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "TBM STUDIOZ | We Don't Edit Videos. We Build Attention.",
  description: "Premium creative video editing agency. We specialize in Social Media, YouTube, Ads, and Motion Graphics.",
  icons: {
    icon: [{ url: "/tbm-logo.png", type: "image/png" }],
    apple: [{ url: "/tbm-logo.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased text-tbm-light`}
        suppressHydrationWarning
      >
        <SiteAmbience />
        <SmoothScroll>
          <CustomCursor />
          <div className="relative z-[1]">{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
