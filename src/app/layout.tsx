import type { Metadata, Viewport } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterSW from "@/components/RegisterSW";
import Script from "next/script";


export const metadata: Metadata = {
  title: {
    default: "Digital Store - smart searching | متجر التطبيقات الرقمية",
    template: "%s | Digital Store - smart search",
  },
  description: "خدمات وتطبيقات رقمية مجانية وسريعة",
  keywords: [
    "تطبيقات رقمية",
    "متجر رقمي",
    "خدمات رقمية",
    "Digital Products",
    "Digital Store",
  ],
  authors: [{ name: "Digital Store - Smart Search" }],
  creator: "Digital Store - Smart Search",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Digital Store - Smart Search | تطبيقات بحث رقمية",
    description: "خدمات وتطبيقات رقمية مجانية وسريعة",
    type: "website",
    locale: "ar_EG",
    siteName: "Digital Store",
  },
  other: {
    "google-site-verification":
      "7XY4QFlcbO13HsbJ3M-4Pl1l9A4Pbbe-GltnYncvINA",
    "google-adsense-account": "ca-pub-4973672854580770",
  },
};

export const viewport: Viewport = {
  themeColor: "#16a34a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
    <head>
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=G-FGK2Z5C8W8"
      strategy="afterInteractive"
    />
    <Script id="ga4" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-FGK2Z5C8W8', {
          page_path: window.location.pathname,
        });
      `}
    </Script>
  </head>

      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-800 antialiased">

        {/* ===== Header ===== */}
        <Header />


        {/* ===== Main Content ===== */}
        <main className="flex-1 container mx-auto px-4">
          {children}
        </main>



        {/* ===== Footer ===== */}
        <Footer />

        {/* ===== Service Worker ===== */}
        <RegisterSW />

      </body>
    </html>
  );
}
