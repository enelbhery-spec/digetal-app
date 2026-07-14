"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterSW from "@/components/RegisterSW";
import AppInstallLoader from "@/components/AppInstallLoader";
import Tracker from "@/components/Tracker";

import { CompareProvider } from "@/context/CompareContext";
import CompareBar from "@/components/CompareBar";
import CartDrawer from "@/components/CartDrawer";

type Props = {
  children: React.ReactNode;
};

export default function ClientProviders({ children }: Props) {
  const [isEgypt, setIsEgypt] = useState<boolean>(true);

  useEffect(() => {
    try {
      const userTimeZone =
        Intl.DateTimeFormat().resolvedOptions().timeZone;

      const userLanguage = navigator.language || "";

      if (
        userTimeZone === "Africa/Cairo" ||
        userLanguage.toLowerCase().includes("ar") ||
        userLanguage.toLowerCase().includes("eg")
      ) {
        setIsEgypt(true);
      } else {
        setIsEgypt(false);
      }
    } catch {
      setIsEgypt(true);
    }
  }, []);

  return (
    <>
      {isEgypt && (
        <>
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-FGK2Z5C8W8"
            strategy="afterInteractive"
          />

          <Script
            id="google-analytics"
            strategy="afterInteractive"
          >
            {`
              window.dataLayer = window.dataLayer || [];

              function gtag(){
                dataLayer.push(arguments);
              }

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
              }).observe(document, {
                subtree: true,
                childList: true
              });
            `}
          </Script>

          <Script
            id="facebook-sdk"
            strategy="afterInteractive"
          >
            {`
              window.fbAsyncInit = function() {
                FB.init({
                  appId: '2099990403916493',
                  cookie: true,
                  xfbml: true,
                  version: 'v20.0'
                });

                FB.AppEvents.logPageView();
              };

              (function(d,s,id){
                var js,fjs=d.getElementsByTagName(s)[0];

                if(d.getElementById(id)) return;

                js=d.createElement(s);
                js.id=id;
                js.src="https://connect.facebook.net/en_US/sdk.js";

                fjs.parentNode.insertBefore(js,fjs);

              }(document,'script','facebook-jssdk'));
            `}
          </Script>

          <Tracker eventName="page_view" />
        </>
      )}

      {isEgypt && (
        <noscript>
          <img
            height="1"
            width="1"
            alt="facebook-pixel"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1326805792177297&ev=PageView&noscript=1"
          />
        </noscript>
      )}

      <CompareProvider>
        <CartDrawer />

        <Header />

        <AppInstallLoader>
          <main className="flex-1 container mx-auto px-4">
            {children}
          </main>
        </AppInstallLoader>

        <Footer />

        <CompareBar />

        <RegisterSW />

        <SpeedInsights />

        {isEgypt && <Analytics />}
      </CompareProvider>
    </>
  );
}