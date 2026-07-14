"use client"; // تحويل الملف ليعمل من جهة العميل للتحقق من موقع الزائر

import { useEffect, useState } from "react";
import "@/app/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Tajawal } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterSW from "@/components/RegisterSW";
import AppInstallLoader from "@/components/AppInstallLoader";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import Tracker from "@/components/Tracker";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isEgypt, setIsEgypt] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      // التحقق من المنطقة الزمنية للمتصفح (مصر تستخدم توقيت القاهرة وهو Africa/Cairo)
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // التحقق أيضاً من لغة المتصفح المفضلة للزائر (تحتوي غالباً على ar أو eg)
      const userLanguage = navigator.language || "";

      if (userTimeZone === "Africa/Cairo" || userLanguage.includes("ar") || userLanguage.includes("eg")) {
        setIsEgypt(true);
      } else {
        setIsEgypt(false);
      }
    } catch (e) {
      // في حال حدوث أي خطأ، نعتبره زائر طبيعي احتياطاً
      setIsEgypt(true);
    }
  }, []);

  return (
    <html lang="ar" dir="rtl" className={`scroll-smooth ${tajawal.variable}`}>
      <head>
        {/* ✅ تفعيل جوجل أناليتكس فقط إذا كان الزائر من مصر */}
        {isEgypt && (
          <>
            <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-FGK2Z5C8W8"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                gtag('config', 'G-FGK2Z5C8W8', {
                  send_page_view: true,
                  page_path: window.location.pathname,
                  page_title: document.title
                });

                let lastUrl = location.href;
                new MutationObserver(() => {
                  const url = location.href;
                  if (url !== lastUrl) {
                    lastUrl = url;
                    gtag('event', 'page_view', {
                      page_path: window.location.pathname,
                      page_title: document.title,
                      page_location: url
                    });
                  }
                }).observe(document, { subtree: true, childList: true });
              `}
            </Script>
          </>
        )}

        <meta name="facebook-domain-verification" content="dnug90dlldt2djikp2yjdhj88pbekd" />
      </head>

      <body className={`${tajawal.className} min-h-screen flex flex-col bg-gray-50 text-gray-800 antialiased`}>
        
        {/* ✅ تفعيل كود تتبع فيسبوك للمطورين فقط لزوار مصر */}
        {isEgypt && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.fbAsyncInit = function() {
                  FB.init({
                    appId      : '2099990403916493',
                    cookie     : true,
                    xfbml      : true,
                    version    : 'v20.0'
                  });
                  FB.AppEvents.logPageView();
                };

                (function(d, s, id){
                   var js, fjs = d.getElementsByTagName(s)[0];
                   if (d.getElementById(id)) {return;}
                   js = d.createElement(s); js.id = id;
                   js.src = "https://connect.facebook.net/en_US/sdk.js";
                   fjs.parentNode.insertBefore(js, fjs);
                 }(document, 'script', 'facebook-jssdk'));
              `,
            }}
          />
        )}

        {/* ✅ تتبع الأحداث يعمل فقط لزوار مصر */}
        {isEgypt && <Tracker eventName="page_view" />}

        {/* ✅ Facebook Pixel NoScript يعمل فقط لزوار مصر */}
        {isEgypt && (
          <noscript>
            <img 
              height="1" 
              width="1" 
              className="fb-pixel-noscript" 
              src="https://www.facebook.com/tr?id=1326805792177297&ev=PageView&noscript=1" 
              alt="fb-pixel" 
            />
          </noscript>
        )}

        <CompareProvider>
          <CartDrawer />
          <Header />
          <AppInstallLoader>
            <main className="flex-1 container mx-auto px-4">{children}</main>
          </AppInstallLoader>
          <Footer />
          <CompareBar />
          <RegisterSW />
          <SpeedInsights />
          
          {/* ✅ تشغيل تحليلات Vercel فقط للزوار الفعليين من مصر */}
          {isEgypt && <Analytics />}
        </CompareProvider>
      </body>
    </html>
  );
}