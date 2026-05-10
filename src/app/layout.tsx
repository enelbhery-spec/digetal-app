import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Tajawal } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterSW from "@/components/RegisterSW";
import AppInstallLoader from "@/components/AppInstallLoader";
import Script from "next/script";

// ✅ نظام المقارنة
import { CompareProvider } from "@/context/CompareContext";
import CompareBar from "@/components/CompareBar";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.extracode.online"),

  title: {
    default:
      "إكسترا كود | كل عروض Amazon, Noon, Temu & Shein في مكان واحد",
    template: "%s | إكسترا كود",
  },

  description:
    "دليلك الشامل للتوفير؛ احصل على أحدث كوبونات خصم نون السعودية، أقوى عروض أمازون مصر، وخصومات تيمو وشي إن المحدثة يومياً.",

  keywords: [
    "إكسترا كود",
    "كوبونات نون",
    "عروض أمازون مصر",
    "خصومات أمازون",
    "كود خصم تيمو",
    "خصومات شي إن",
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
    title:
      "إكسترا كود | كل عروض Amazon, Noon, Temu & Shein في مكان واحد",

    description:
      "منصة رقمية مجانية توفر أفضل العروض والكوبونات المحدثة.",

    url: "https://www.extracode.online",

    siteName: "إكسترا كود",

    locale: "ar_EG",

    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "إكسترا كود",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "إكسترا كود | كل عروض Amazon, Noon, Temu & Shein",

    description:
      "وفر أموالك مع أحدث الخصومات والكوبونات.",

    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  other: {
    "google-site-verification":
      "7XY4QFlcbO13HsbJ3M-4Pl1l9A4Pbbe-GltnYncvINA",

    "google-adsense-account":
      "ca-pub-4973672854580770",
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
    <html
      lang="ar"
      dir="rtl"
      className={`scroll-smooth ${tajawal.variable}`}
    >
      <head>
        {/* OneSignal */}
        <Script
          id="onesignal-init"
          strategy="afterInteractive"
        >
          {`
            window.OneSignalDeferred = window.OneSignalDeferred || [];

            OneSignalDeferred.push(function(OneSignal) {

              OneSignal.init({
                appId: "6fc68aca-1ca2-47f6-96fd-9690fe507285",

                allowLocalhostAsSecureOrigin: true,

                notifyButton: {
                  enable: false
                }
              });

            });
          `}
        </Script>

        {/* Adsense */}
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4973672854580770"
          crossOrigin="anonymous"
        />

        {/* Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FGK2Z5C8W8"
          strategy="afterInteractive"
        />

        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag(){
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-FGK2Z5C8W8', {
              anonymize_ip: true
            });
          `}
        </Script>
      </head>

      <body
        className={`${tajawal.className} min-h-screen flex flex-col bg-gray-50 text-gray-800 antialiased`}
      >
        {/* ✅ نظام المقارنة */}
        <CompareProvider>

          <Header />

          <AppInstallLoader>
            <main className="flex-1 container mx-auto px-4">
              {children}
            </main>
          </AppInstallLoader>

          <Footer />

          {/* ✅ بار المقارنة */}
          <CompareBar />

          <RegisterSW />

          <SpeedInsights />

        </CompareProvider>
      </body>
    </html>
  );
}