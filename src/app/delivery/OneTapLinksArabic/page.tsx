"use client";

import React, { useState } from "react";

type LinkItem = {
  name: string;
  type: string;
  url: string;
};

/* ================== DATA ================== */
const data: LinkItem[] = [
  { name: "البنك الأهلي المصري", type: "بنك", url: "https://www.nbe.com.eg" },
  { name: "بنك مصر", type: "بنك", url: "https://www.banquemisr.com" },
  { name: "البنك التجاري الدولي CIB", type: "بنك", url: "https://www.cibeg.com" },
  { name: "QNB الأهلي", type: "بنك", url: "https://www.qnbalahli.com" },
  { name: "بنك القاهرة", type: "بنك", url: "https://www.bdc.com.eg" },

  { name: "بوابة الحكومة المصرية", type: "حكومة", url: "https://www.egypt.gov.eg" },
  { name: "بوابة مصر الرقمية", type: "خدمات", url: "https://digital.gov.eg" },
  { name: "مصلحة الضرائب المصرية", type: "حكومة", url: "https://www.eta.gov.eg" },
  { name: "التأمينات الاجتماعية", type: "حكومة", url: "https://www.nosi.gov.eg" },

  { name: "وزارة الداخلية", type: "وزارة", url: "https://moi.gov.eg" },
  { name: "وزارة الصحة", type: "وزارة", url: "https://www.mohp.gov.eg" },
  { name: "وزارة التعليم", type: "وزارة", url: "https://moe.gov.eg" },

  { name: "المصرية للاتصالات WE", type: "اتصالات", url: "https://www.te.eg" },
  { name: "فودافون مصر", type: "اتصالات", url: "https://web.vodafone.com.eg" },

  { name: "هيئة المجتمعات العمرانية", type: "إسكان", url: "https://www.newcities.gov.eg" },
  { name: "جهاز حماية المستهلك", type: "خدمات", url: "https://www.cpa.gov.eg" },
];

/* ================== CATEGORIES ================== */
const categories = [
  { label: "الكل", value: "all" },
  { label: "🏦 بنوك", value: "بنك" },
  { label: "🏛️ حكومة", value: "حكومة" },
  { label: "⚡ خدمات", value: "خدمات" },
  { label: "📡 اتصالات", value: "اتصالات" },
  { label: "🏠 إسكان", value: "إسكان" },
];

export default function OneTapLinksArabic() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const results = data.filter((item) => {
    const matchQuery =
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase());

    const matchCategory =
      activeCategory === "all" || item.type.includes(activeCategory);

    return matchQuery && matchCategory;
  });

  return (
    <main className="bg-gray-50 min-h-screen" dir="rtl">

      {/* ================= HERO ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          الوصول السريع للمواقع والخدمات الرسمية
        </h1>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
          محرك بحث ذكي يجمع لك الروابط الرسمية للبنوك، الجهات الحكومية،
          والخدمات الأساسية في مكان واحد.
        </p>

        {/* ================= SEARCH ================= */}
        <div className="relative max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="اكتب اسم البنك، الوزارة، الخدمة..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-6 py-4 text-lg rounded-2xl shadow-lg border focus:outline-none focus:ring-2 focus:ring-green-600 text-right"
          />
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-gray-400">
            🔍
          </span>
        </div>

        {/* ================= TABS ================= */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition
                ${
                  activeCategory === cat.value
                    ? "bg-green-600 text-white shadow"
                    : "bg-white text-gray-700 border hover:bg-gray-100"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ================= RESULTS ================= */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        {query && results.length === 0 && (
          <p className="text-center text-gray-500 mb-6">
            😕 لا توجد نتائج مطابقة — جرّب كتابة اسم مختلف
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item, index) => (
            <div
              key={index}
              onClick={() => window.open(item.url, "_blank")}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition cursor-pointer"
            >
              <h3 className="font-bold text-lg mb-1">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.type}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm text-gray-600">
          <p>🔒 روابط رسمية وآمنة</p>
          <p>⚡ وصول مباشر بدون وسطاء</p>
          <p>🔄 تحديث مستمر للبيانات</p>
        </div>
      </section>

    </main>
  );
}
