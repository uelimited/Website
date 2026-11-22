import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SITE } from "@/data/site-content";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: "Unique Engineers — MEPF, BMS and civil contracting",
  description:
    "Unique Engineers delivers mechanical, electrical, plumbing, fire protection, building controls and civil contracting across India.",
  openGraph: {
    title: "Unique Engineers",
    description:
      "Integrated MEPF engineering and project delivery across India.",
    type: "website",
    siteName: SITE.name,
  },
  twitter: {
    card: "summary",
    title: SITE.name,
    description:
      "Integrated MEPF engineering and project delivery across India.",
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${interTight.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a className="ue-skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
