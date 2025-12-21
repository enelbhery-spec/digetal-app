import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterSW from "@/components/RegisterSW";

export const metadata: Metadata = {
  title: {
    default: "Digital Store | متجر المنتجات الرقمية",
    template: "%s | Digital Store",
  },
  description: "متجر منتجات رقمية – استلم منتجك فورًا بعد الطلب",
  keywords: [
    "منتجات رقمية",
    "متجر رقمي",
    "تحميل فوري",
    "Digital Products",
    "Digital Store",
  ],
  authors: [{ name: "Digital Store" }],
  creator: "Digital Store",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Digital Store | متجر المنتجات الرقمية",
    description: "منتجات رقمية جاهزة – استلام فوري – دعم عبر واتساب",
    type: "website",
    locale: "ar_EG",
    siteName: "Digital Store",
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

        {/* ✅ تسجيل Service Worker */}
        <RegisterSW />
         <meta name="google-site-verification" content="7XY4QFlcbO13HsbJ3M-4Pl1l9A4Pbbe-GltnYncvINA" />
         <meta name="google-adsense-account" content="ca-pub-4973672854580770">
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}
