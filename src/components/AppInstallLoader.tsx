"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// إعداد Supabase (تأكد من وضع القيم الخاصة بك في ملف .env)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

let deferredPrompt: any = null;

export default function AppInstallLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [canInstall, setCanInstall] = useState(false);
  const [installed, setInstalled] = useState(false);

  // وظيفة إرسال السجل لـ Supabase
  const logInstallToSupabase = async () => {
    try {
      const { error } = await supabase
        .from("app_installs")
        .insert([{ platform: window.navigator.userAgent.includes("Mobi") ? "Mobile" : "Desktop" }]);
      
      if (error) console.error("Error logging install:", error);
    } catch (err) {
      console.error("Failed to log install:", err);
    }
  };

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      deferredPrompt = e;
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // هذا الحدث يعمل عندما يكتمل التثبيت بنجاح
    window.addEventListener("appinstalled", () => {
      setInstalled(true);
      setCanInstall(false);
      logInstallToSupabase(); // تسجيل العملية في قاعدة البيانات
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setInstalled(true);
      // ملاحظة: حدث appinstalled سيقوم بالمهمة أيضاً ولكن وضعها هنا للاحتياط
    }

    deferredPrompt = null;
    setCanInstall(false);
  };

  if (!canInstall || installed) return <>{children}</>;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(135deg, #16a34a, #15803d)",
        color: "#fff",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 20,
      }}
    >
      <h1 style={{ fontSize: 26, fontWeight: "bold" }}>
        📲 ثبّت التطبيق الآن
      </h1>

      <p style={{ marginTop: 15, fontSize: 18 }}>
        لتحصل على تجربة أسرع وأسهل لمتابعة كوبونات إكسترا كود
      </p>

      <button
        onClick={installApp}
        style={{
          marginTop: 30,
          fontSize: 20,
          background: "#fff",
          color: "#15803d",
          padding: "14px 30px",
          borderRadius: 14,
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
        }}
      >
        ➕ تثبيت التطبيق
      </button>

      <p style={{ marginTop: 25, fontSize: 13, opacity: 0.9 }}>
        يمكنك استخدام التطبيق بدون متصفح بعد التثبيت
      </p>
    </div>
  );
}