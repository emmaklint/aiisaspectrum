import type { Metadata, Viewport } from "next";
import { site } from "@/content/site";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.title} — chat is one way to interact with AI`,
  description: site.description,
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.title} — chat is one way to interact with AI`,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23E0602F'/%3E%3Cstop offset='.35' stop-color='%23F28C86'/%3E%3Cstop offset='.65' stop-color='%2398A55A'/%3E%3Cstop offset='1' stop-color='%235E6B2A'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='32' height='32' fill='url(%23g)'/%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7E7E2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Azeret+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:border focus:border-ink focus:bg-paper focus:px-5 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
