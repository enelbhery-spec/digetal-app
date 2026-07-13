import type { Metadata, Viewport } from "next";
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
  return (
    <html lang="ar" dir="rtl" className={`scroll-smooth ${tajawal.variable}`}>
      <head>
        {/* ✅ استدعاء مكتبة Google Tag */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FGK2Z5C8W8"
          strategy="afterInteractive"
        />

        {/* ✅ إعداد وتفعيل التتبع التلقائي والديناميكي لمنع ظهور (not set) */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // تهيئة مع تفعيل إرسال المشاهدات وإجبار قراءة المسار الحالي للمتصفح
            gtag('config', 'G-FGK2Z5C8W8', {
              send_page_view: true,
              page_path: window.location.pathname,
              page_title: document.title
            });

            // الاستماع لتغييرات الروابط الداخلية لـ Next.js وإرسال البيانات الجديدة فوراً
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

        <meta name="facebook-domain-verification" content="dnug90dlldt2djikp2yjdhj88pbekd" />
      </head>

      <body className={`${tajawal.className} min-h-screen flex flex-col bg-gray-50 text-gray-800 antialiased`}>
        
        {/* ✅ كود فيسبوك المطورين المحدث والمطابق للمعايير */}
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

        {/* ✅ التتبع العام لكل الموقع */}
        <Tracker eventName="page_view" />

        {/* ✅ Facebook Pixel NoScript */}
        <noscript>
          <img 
            height="1" 
            width="1" 
            className="fb-pixel-noscript" 
            src="https://www.facebook.com/tr?id=1326805792177297&ev=PageView&noscript=1" 
            alt="fb-pixel" 
          />
        </noscript>

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
          <Analytics />
        </CompareProvider>
      </body>
    </html>
  );
}