import type { Metadata, Viewport } from "next";
import "@/app/globals.css"; 

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterSW from "@/components/RegisterSW";
import AppInstallLoader from "@/components/AppInstallLoader"; 
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.extracode.online"),

  title: {
    default: "إكسترا كود | عروض أمازون، كوبونات نون، وخصومات تيمو الحصرية",
    template: "%s | إكسترا كود",
  },

  description:
    "دليلك الشامل للتوفير؛ احصل على أحدث كوبونات خصم نون السعودية، أقوى عروض أمازون مصر، وخصومات تيمو (Temu) المحدثة يومياً لتسوق أذكى بأقل الأسعار.",

  keywords: [
    "اكسترا كود", "كوبونات نون", "عروض امازون مصر", "خصومات امازون",
    "كوبونات خصم نون السعودية", "كود خصم تيمو", "عروض Temu مصر", "توفير المال",
    "افضل منتجات امازون", "اكواد خصم نون", "عروض تيمو السعودية"
  ],

  authors: [{ name: "إكسترا كود" }],
  creator: "إكسترا كود",
  manifest: "/manifest.json",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  openGraph: {
    title: "إكسترا كود - عروض نون، أمازون، وتيمو",
    description: "منصة رقمية مجانية توفر لك أفضل منتجات أمازون مصر وكوبونات نون وتيمو المحدثة لحظة بلحظة.",
    url: "https://www.extracode.online",
    siteName: "إكسترا كود",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "إكسترا كود - دليلك للتوفير",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "إكسترا كود | خصومات أمازون ونون وتيمو",
    description: "وفر أموالك مع أحدث خصومات أمازون مصر وكوبونات نون السعودية وعروض تيمو.",
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
        {/* Schema Markup */}
        <Script id="schema-web" type="application/ld+json" strategy="afterInteractive">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "إكسترا كود",
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
                anonymize_ip: true
            });
          `}
        </Script>
      </head>

      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-800 antialiased font-sans">
        {/* الهيدر */}
        <Header />

        {/* مغلف التثبيت الذكي */}
        <AppInstallLoader>
          <main className="flex-1 container mx-auto px-4">
            {children}
          </main>
        </AppInstallLoader>

        {/* الفوتر */}
        <Footer />

        {/* تسجيل Service Worker */}
        <RegisterSW />
      </body>
    </html>
  );
}