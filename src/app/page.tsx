"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const savedCountry = localStorage.getItem("country");

    if (savedCountry === "eg" || savedCountry === "sa") {
      router.replace(`/${savedCountry}`);
    } else {
      setChecking(false); // ⛔ أظهر الصفحة فقط لو مفيش اختيار
    }
  }, [router]);

  const selectCountry = (country: string) => {
    localStorage.setItem("country", country);
    router.push(`/${country}`);
  };

  // ⏳ Loading state
  if (checking) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-sm animate-pulse">
          جاري التوجيه...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-10">

      {/* العنوان */}
      <h1 className="text-xl md:text-2xl font-extrabold mb-4">
        اختر بلدك 🌍
      </h1>

      {/* الوصف */}
      <p className="text-gray-500 mb-8 text-sm max-w-xs leading-relaxed">
        سيتم حفظ اختيارك تلقائيًا لزياراتك القادمة لتجربة أسرع
      </p>

      {/* الأزرار */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">

        <button
          onClick={() => selectCountry("eg")}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition shadow"
        >
          🇪🇬 مصر
        </button>

        <button
          onClick={() => selectCountry("sa")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition shadow"
        >
          🇸🇦 السعودية
        </button>

      </div>

    </main>
  );
}