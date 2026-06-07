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
  alternates: { canonical: "https://www.extracode.online" },
  title: {
    default: "تريند ستور  | عروض حصرية للمنتجات في مكان واحد",
    template: "%s | تريند ستور ",
  },
  description: "دليلك الشامل للتوفير؛ احصل على أحدث العروض الحصرية لاحتياجاتك فى مصر والسعودية .",
  keywords: ["تريند ستور ", "كوبونات نون", "عروض أمازون مصر", "خصومات أمازون", "كود خصم تيمو", "خصومات شي إن"],
  authors: [{ name: "تريند ستور " }],
  creator: "تريند ستور ",
  publisher: "تريند ستور ",
  manifest: "/manifest.json",
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/favicon.ico" },
  openGraph: {
    title: "عروض حصرية يوميه من  تريند ستور ",
    description: "منصة رقمية مجانية توفر أفضل العروض الحصرية و المحدثة.",
    url: "https://www.extracode.online",
    siteName: "تريند ستور ",
    locale: "ar_EG",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "تريند ستور " }],
  },
  twitter: {
    card: "summary_large_image",
    title: "تريند ستور  | كل عروض ",
    description: "وفر أموالك مع أحدث العروض و ارخص الاسعار .",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  other: {
    "google-site-verification": "7XY4QFlcbO13HsbJ3M-4Pl1l9A4Pbbe-GltnYncvINA",
    "google-adsense-account": "ca-pub-4973672854580770",
    "X-Robots-Tag": "index, follow",
  },
};

export const viewport: Viewport = {
  themeColor: "#16a34a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`scroll-smooth ${tajawal.variable}`}>
      <head>
        {/* ✅ Domain Verification */}
        <meta name="facebook-domain-verification" content="dnug90dlldt2djikp2yjdhj88pbekd" />

        {/* ✅ Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1326805792177297');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* ✅ Organization Schema */}
        <Script id="organization-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "تريند ستور ",
            url: "https://www.extracode.online",
            logo: "https://www.extracode.online/logo.png",
          })}
        </Script>

        {/* ✅ Website Schema */}
        <Script id="website-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "تريند ستور ",
            url: "https://www.extracode.online",
          })}
        </Script>

        {/* OneSignal */}
        <Script id="onesignal-init" strategy="afterInteractive">
          {`
            window.OneSignalDeferred = window.OneSignalDeferred || [];
            OneSignalDeferred.push(function(OneSignal) {
              OneSignal.init({
                appId: "6fc68aca-1ca2-47f6-96fd-9690fe507285",
                allowLocalhostAsSecureOrigin: true,
                notifyButton: { enable: false }
              });
            });
          `}
        </Script>

        {/* Adsense */}
        <Script async strategy="afterInteractive" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4973672854580770" crossOrigin="anonymous" />

        {/* Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-FGK2Z5C8W8" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-FGK2Z5C8W8', { anonymize_ip: true });
          `}
        </Script>
      </head>

      <body className={`${tajawal.className} min-h-screen flex flex-col bg-gray-50 text-gray-800 antialiased`}>
        <noscript>
          <img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=1326805792177297&ev=PageView&noscript=1" alt="fb-pixel" />
        </noscript>

        <CompareProvider>
          <Header />
          <AppInstallLoader>
            <main className="flex-1 container mx-auto px-4">{children}</main>
          </AppInstallLoader>
          <Footer />
          <CompareBar />
          <RegisterSW />
          <SpeedInsights />
        </CompareProvider>
      </body>
    </html>
  );
}