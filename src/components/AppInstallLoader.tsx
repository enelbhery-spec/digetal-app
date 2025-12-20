"use client";

import { useEffect, useState } from "react";

let deferredPrompt: any = null;

export default function AppInstallLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [canInstall, setCanInstall] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      deferredPrompt = e;
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      setInstalled(true);
      setCanInstall(false);
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
        لتحصل على تجربة أسرع وأسهل
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
