import type { Metadata, Viewport } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterSW from "@/components/RegisterSW";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "البحث الذكى - بحث رقمى ذكى | متجر الحث الرفمى",
    template: "%s | البحث الذكى - بحث رقمى ذكى",
  },
  description: "خدمات بحث رقمية مجانية وسريعة",
  keywords: [
    "تطبيقات بخث رقمية",
    "بحث  رقمي",
    "خدمات رقمية",
     "البحث الذكى",
    "محرك بحث ذكي",
    "البحث عن الخدمات",
    "أرقام الخط الساخن",
    "خدمات الدليفري في مصر",
    "دليل الخدمات في مصر",
    "رقم خدمة العملاء",
    "الخط الساخن لشركة",
    "رقم شكاوى",
    "خدمة عملاء مصر",
    "بحث جوجل ",
    "البحث عن رقم الخط الساخن في مصر",
    "أفضل طريقة للبحث عن خدمات الدليفري",
    "ازاي أوصل لخدمة عملاء الشركات",
    "دليل شامل للشركات والخدمات في مصر",
    "محرك بحث للخدمات المصرية",
    "محرك بحث ذكي",
    "البحث الذكي",
    "محرك بحث للخدمات",
    "Digital Products",
    "البحث الذكى",
  ],
  authors: [{ name: "البحث الذكى - البحث الذكى" }],
  creator: "البحث الذكى - البحث الذكى",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "البحث الذكى – البحث الذكي",
    description:
      "كل التطبيقات والخدمات الرقمية في مكان واحد، بحث سريع وذكي بدون تعقيد",
    url: "https://digital-app-q1mf.vercel.app",
    siteName: "البحث الذكى",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: "https://digital-app-q1mf.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "البحث الذكى – البحث الذكي",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "البحث الذكى – البحث الذكي",
    description: "كل التطبيقات والخدمات في مكان واحد",
    images: ["https://digital-app-q1mf.vercel.app/og-image.png"],
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
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4973672854580770"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Google Analytics */}
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
        <Header />

        <main className="flex-1 container mx-auto px-4">
          {children}
        </main>

        <Footer />

        <RegisterSW />
      </body>
    </html>
  );
}
