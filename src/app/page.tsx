"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const savedCountry = localStorage.getItem("country");
    if (savedCountry === "eg") {
      router.replace(`/${savedCountry}`);
    } else {
      setChecking(false);
    }
  }, [router]);

  const selectCountry = () => {
    localStorage.setItem("country", "eg");
    router.push("/eg");
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="animate-pulse">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* القسم العلوي: اختيار الدولة */}
      <section className="flex-grow flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-2xl font-black mb-4">أهلاً بك في متجرنا 🌍</h1>
        <button
          onClick={selectCountry}
          className="bg-green-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg"
        >
          🇪🇬 متابعة إلى مصر
        </button>
      </section>

      {/* القسم السفلي: الفيديوهات (سيظهر أسفل الصفحة) */}
      <section className="w-full bg-slate-50 py-16 border-t">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Play className="text-red-600" /> شاهد قبل الشراء
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-2 rounded-2xl shadow-sm">
                <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                  فيديو {i}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}