import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterSW from "@/components/RegisterSW";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Digital Store - smart searching  - smart searching | متجر المنتجات الرقمية",
    template: "%s | Digital Store - smart search ",
  },
  description: " خدمات ومنتجات رقمية مجانية وسريعة",
  keywords: [
    "منتجات رقمية",
    "متجر رقمي",
    "خدمات رقمية",
    "Digital Products",
    "Digital Store - smart search",
  ],
  authors: [{ name: "Digital Store - Smart Search " }],
  creator: "Digital Store - Smart Search ",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Digital Store - Smart Search  | متجر المنتجات الرقمية",
    description: "خدمات ومنتجات رقمية مجانية وسريعة",
    type: "website",
    locale: "ar_EG",
    siteName: "Digital Store - smart searching ",
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
        {/* الطريقة الصحيحة لإضافة سكريبت Adsterra في Next.js */}
        <Script
          src="https://pl28375284.effectivegatecpm.com/a2/d8/f9/a2d8f911d27d875162419ab2c20d9e9b.js"
          strategy="afterInteractive"
          data-cfasync="false"
          async
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FGK2Z5C8W8"></script>

      </head>
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans antialiased">

        {/* حاوية الإعلان: يفضل وضعها في مكان استراتيجي، هنا ستظهر في أعلى الصفحة */}
         <div id="container-a2d8f911d27d875162419ab2c20d9e9b"></div>

        <RegisterSW />
        <Header />

        <main className="flex-1">
          {children}
        </main>


        <Footer />

      </body>
    </html>
  );
}