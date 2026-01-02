import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterSW from "@/components/RegisterSW";
import AdsterraResponsive from "@/components/AdsterraResponsive";

export const metadata: Metadata = {
  title: {
    default: "Digital Store - smart searching | متجر المنتجات الرقمية",
    template: "%s | Digital Store - smart search",
  },
  description: "خدمات ومنتجات رقمية مجانية وسريعة",
  keywords: [
    "منتجات رقمية",
    "متجر رقمي",
    "خدمات رقمية",
    "Digital Products",
    "Digital Store",
  ],
  authors: [{ name: "Digital Store - Smart Search" }],
  creator: "Digital Store - Smart Search",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Digital Store - Smart Search | متجر المنتجات الرقمية",
    description: "خدمات ومنتجات رقمية مجانية وسريعة",
    type: "website",
    locale: "ar_EG",
    siteName: "Digital Store",
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
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans antialiased">

        <Header />
        {/* 🔹 إعلان Adsterra داخل المحتوى (لن يظهر أسفل الفوتر) */}
          <div className="w-full flex justify-center my-6">
            <AdsterraResponsive />

        <main className="flex-1">

          {/* 🔹 إعلان Adsterra داخل المحتوى (لن يظهر أسفل الفوتر) */}
          <div className="w-full flex justify-center my-6">
            <AdsterraResponsive />
          </div>

          {children}
        </main>

        <Footer />
        <RegisterSW />

      </body>
    </html>
  );
}
