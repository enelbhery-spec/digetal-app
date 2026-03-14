import type { Metadata, Viewport } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterSW from "@/components/RegisterSW";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.extracode.online"),

  title: {
    default: "عروض امازون - كوبونات نون - كبونات نون السعودية وخصومات أمازون",
    template: "%s | خصومات وكوبونات",
  },

  description:
    "خصومات وكوبونات منصة رقمية مجانية تساعدك الحصول على كوبونات خصم نون السعودية وأفضل منتجات وخصومات أمازون مصر المحدثة يوميًا بسهولة.",

  keywords: [
    "خصومات وكوبونات",
    "كوبونات نون",
    "عروض امازون مصر",
    "خصومات امازون",
    "كوبونات خصم",
    "افضل منتجات امازون",
    "خصومات نون السعودية",
    "عروض امازون",
  ],

  authors: [{ name: "خصومات وكوبونات" }],
  creator: "خصومات وكوبونات",

  manifest: "/manifest.json",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  alternates: {
    canonical: "https://www.extracode.online",
  },

  openGraph: {
    title: "خصومات وكوبونات - نون السعودية وخصومات أمازون",
    description:
      "أفضل منتجات أمازون مصر ونون السعودية مع كوبونات خصم مباشرة.",
    url: "https://www.extracode.online",
    siteName: "خصومات وكوبونات",
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
    title: "خصومات وكوبونات - خصومات أمازون",
    description:
      "أفضل خصومات أمازون مصر وكوبونات نون السعودية المحدثة يوميًا.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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

        {/* Canonical */}
        <link rel="canonical" href="https://www.extracode.online" />

        {/* Structured Data SEO */}
        <Script id="schema-web" type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "خصومات وكوبونات",
            "url": "https://www.extracode.online",
            "description": "أفضل خصومات أمازون مصر وكوبونات نون السعودية المحدثة يوميًا.",
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