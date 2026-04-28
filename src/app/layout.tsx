import type { Metadata, Viewport } from "next";
import "@/app/globals.css"; 

// 1. استيراد الخط بشكل محسن من Next.js
import { Tajawal } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterSW from "@/components/RegisterSW";
import AppInstallLoader from "@/components/AppInstallLoader"; 
import Script from "next/script";

// 2. إعداد الخط
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.extracode.online"),
  title: {
    default: "إكسترا كود | كل عروض Amazon, Noon, Temu & Shein في مكان واحد",
    template: "%s | إكسترا كود",
  },
  description:
    "دليلك الشامل للتوفير؛ احصل على أحدث كوبونات خصم نون السعودية، أقوى عروض أمازون مصر، وخصومات تيمو (Temu) وشي إن (Shein) المحدثة يومياً لتسوق أذكى بأقل الأسعار.",
  keywords: [
    "إكسترا كود", "كوبونات نون", "عروض أمازون مصر", "خصومات أمازون",
    "كوبونات خصم نون السعودية", "كود خصم تيمو", "عروض Temu مصر", "توفير المال",
    "أفضل منتجات أمازون", "أكواد خصم نون", "عروض تيمو السعودية", "خصومات شي إن"
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
    title: "إكسترا كود | كل عروض Amazon, Noon, Temu & Shein في مكان واحد",
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
    title: "إكسترا كود | كل عروض Amazon, Noon, Temu & Shein في تطبيق واحد",
    description: "وفر أموالك مع أحدث خصومات أمازون مصر وكوبونات نون السعودية وعروض تيمو وشي إن.",
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
    <html lang="ar" dir="rtl" className={`scroll-smooth ${tajawal.variable}`}>
      <head>
        {/* --- OneSignal SDK --- */}
       <Script id="onesignal-init" strategy="afterInteractive">
  {`
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    OneSignalDeferred.push(function(OneSignal) {
      OneSignal.init({
        appId: "6fc68aca-1ca2-47f6-96fd-9690fe507285",
        allowLocalhostAsSecureOrigin: true,
        // إضافة التفعيل التلقائي هنا
        promptOptions: {
          slidedown: {
            prompts: [
              {
                type: "push",
                autoPrompt: true, // يظهر الرسالة تلقائياً
                text: {
                  actionMessage: "هل تود استقبال أحدث كوبونات الخصم والعروض فور صدورها؟",
                  acceptButton: "نعم، أريد التوفير",
                  cancelButton: "ليس الآن"
                },
                delay: {
                  pageViews: 1, // تظهر من أول صفحة
                  timeDelay: 3  // تظهر بعد 3 ثوانٍ
                }
              }
            ]
          }
        },
        notifyButton: {
          enable: false, // يمكنك إخفاء الجرس إذا فعلت الطلب التلقائي أعلاه
        },
      });
    });
  `}
</Script>

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

      <body className={`${tajawal.className} min-h-screen flex flex-col bg-gray-50 text-gray-800 antialiased`}>
        <Header />

        <AppInstallLoader>
          <main className="flex-1 container mx-auto px-4">
            {children}
          </main>
        </AppInstallLoader>

        <Footer />

        <RegisterSW />
      </body>
    </html>
  );
}