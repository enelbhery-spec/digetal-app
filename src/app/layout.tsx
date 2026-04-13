import type { Metadata, Viewport } from "next";
import "@/app/globals.css"; 

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterSW from "@/components/RegisterSW";
import AppInstallLoader from "@/components/AppInstallLoader"; // ✅ استيراد المكون الجديد
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.extracode.online"),

  title: {
    default: "عروض امازون - كوبونات نون - كبونات نون السعودية وخصومات أمازون",
    template: "%s | اكسترا كود",
  },

  description:
    "اكسترا كود منصة رقمية مجانية تساعدك الحصول على كوبونات خصم نون السعودية وأفضل منتجات وخصومات أمازون مصر المحدثة يوميًا بسهولة.",

  keywords: [
    "اكسترا كود", "كوبونات نون", "عروض امازون مصر", "خصومات امازون",
    "كوبونات خصم", "افضل منتجات امازون", "خصومات نون السعودية", "عروض امازون",
  ],

  authors: [{ name: "اكسترا كود" }],
  creator: "اكسترا كود",
  manifest: "/manifest.json",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  openGraph: {
    title: "اكسترا كود - نون السعودية وخصومات أمازون",
    description: "أفضل منتجات أمازون مصر ونون السعودية مع كوبونات خصم مباشرة.",
    url: "https://www.extracode.online",
    siteName: "اكسترا كود",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "اكسترا كود",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "اكسترا كود - خصومات أمازون",
    description: "أفضل خصومات أمازون مصر وكوبونات نون السعودية المحدثة يوميًا.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  other: {
    "google-site-verification": "7XY4QFlcbO13HsbJ3M-4Pl1l9A4Pbbe-GltnYncvINA",
    "google-adsense-account": "ca-pub-4973672854580770",
  },
};

export const viewport: Viewport = {
  themeColor: "#16a34a", // اللون الأخضر الخاص بك
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
        {/* Schema Markup */}
        <Script id="schema-web" type="application/ld+json" strategy="afterInteractive">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "اكسترا كود",
            "url": "https://www.extracode.online",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.extracode.online/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
          `}
        </Script>

        {/* Google AdSense */}
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4973672854580770"
          crossOrigin="anonymous"
        />

        {/* Google Analytics (Tag Manager) */}
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
                anonymize_ip: true
            });
          `}
        </Script>
      </head>

      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-800 antialiased">
        {/* 1. الهيدر يظل ثابتاً في الأعلى */}
        <Header />

        {/* 2. مغلف التثبيت الذكي يغطي المحتوى الرئيسي */}
        <AppInstallLoader>
          <main className="flex-1 container mx-auto px-4">
            {children}
          </main>
        </AppInstallLoader>

        {/* 3. الفوتر */}
        <Footer />

        {/* 4. تسجيل Service Worker الخاص بالـ PWA */}
        <RegisterSW />
      </body>
    </html>
  );
}