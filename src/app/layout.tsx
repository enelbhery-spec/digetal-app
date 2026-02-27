import type { Metadata, Viewport } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterSW from "@/components/RegisterSW";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://digetal-app-q1mf.vercel.app"),

  title: {
    default: " عروض امازون - كوبونات نون - كبونات نون السعودية وخصومات أمازون",
    template: "%s | حصومات وكوبونات",
  },

  description:
    "خصومات وكوبونات منصة رقمية مجانية تساعدك الحصول على كوبونات خصومان نون السعودية  وأفضل منتجات وخصومات أمازون مصر المحدثة يوميًا بسهولة ودقة.",

  keywords: [
    "تطبيقات بحث رقمية",
    "بحث رقمي",
    "خدمات رقمية",
    "خصومات وكوبونات",
    "محرك بحث ذكي",
    "أرقام الخط الساخن",
    "خدمة عملاء مصر",
    "رقم خدمة العملاء",
    "عروض وخصومات أمازون مصر",
    "محرك بحث أمازون",
    "ادوات المطبخ من امازون",
  ],

  authors: [{ name: "خصومات وكوبونات" }],
  creator: "خصومات وكوبونات",

  manifest: "/manifest.json",

  icons: {
    icon: "/favicon.ico",
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "حصومات وكبونات  - نون السعودية وخصومات أمازون",
    description:
      "افضل المنتجات امازون مصر ونون السعودية مع كوبونا خصم مباشر  ",
    url: "/",
    siteName: "خصومات وكوبونات ",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "خصومات وكوبونات",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "خصومات وكوبونات - خدمات رقمية وخصومات أمازون",
    description:
      "خصومات وكوبونات منصة رقمية مجانية للوصول السريع إلى خدمات العملاء وخصومات أمازون.",
    images: ["/og-image.png"],
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