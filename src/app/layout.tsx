import type { Metadata } from "next";
import "@/app/globals.css";
import { Tajawal } from "next/font/google";
import ClientProviders from "@/components/ClientProviders";
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.extracode.online"),
  icons: {
  icon: "/favicon.ico",
  shortcut: "/favicon.ico",
  apple: "/apple-touch-icon.png",
},
verification: {
  google: "ضع كود Google Search Console هنا",
  other: {
    "facebook-domain-verification":
      "dnug90dlldt2djikp2yjdhj88pbekd",
  },
},
robots: {
  index: true,
  follow: true,
  nocache: false,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
},

  title: {
    default: "ExtraCode",
    template: "%s | ExtraCode",
  },

  description:
    "اكتشف أفضل المنتجات الرقمية والعروض والكوبونات والمقالات وتجارب العملاء.",

  keywords: [
    "ExtraCode",
    "كوبونات",
    "منتجات رقمية",
    "عروض",
    "تريند ستور",
  ],

  alternates: {
    canonical: "https://www.extracode.online",
  },


  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://www.extracode.online",
    siteName: "ExtraCode",
    title: "ExtraCode",
    description:
      "اكتشف أفضل المنتجات الرقمية والعروض والكوبونات والمقالات.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ExtraCode",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ExtraCode",
    description:
      "اكتشف أفضل المنتجات الرقمية والعروض والكوبونات.",
    images: ["/logo.png"],
  },
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
      <body
        className={`${tajawal.className} min-h-screen flex flex-col bg-gray-50 text-gray-800 antialiased`}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}