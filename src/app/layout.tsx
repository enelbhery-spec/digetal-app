// src/app/layout.tsx
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

// ✅ استيراد السلة الجانبية
import CartDrawer from "@/components/CartDrawer";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
  variable: "--font-tajawal",
});

// ... (Metadata و Viewport كما هما دون تغيير)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`scroll-smooth ${tajawal.variable}`}>
      <head>
        {/* (كل الـ Scripts والـ Meta Tags الخاصة بك كما هي) */}
        <meta name="facebook-domain-verification" content="dnug90dlldt2djikp2yjdhj88pbekd" />
        {/* ... بقية الـ Scripts ... */}
      </head>

      <body className={`${tajawal.className} min-h-screen flex flex-col bg-gray-50 text-gray-800 antialiased`}>
        {/* (الـ noscript الخاص بالفيسبوك بيكسل) */}
        <noscript>
          <img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=1326805792177297&ev=PageView&noscript=1" alt="fb-pixel" />
        </noscript>

        <CompareProvider>
          {/* ✅ تم إضافة السلة هنا */}
          <CartDrawer />
          
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