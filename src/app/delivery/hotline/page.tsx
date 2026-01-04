"use client";

import { useState } from "react";
import AppInstallLoader from "@/components/AppInstallLoader";
import DeviceLock from "@/components/DeviceLock";
import Link from "next/link";


/* ================== DATA ================== */
const hotlines = [
  { name: "البنك الأهلي المصري", phone: "19623", category: "بنوك" },
  { name: "بنك مصر", phone: "19888", category: "بنوك" },
  { name: "بنك القاهرة", phone: "16990", category: "بنوك" },

  { name: "فودافون", phone: "888", category: "اتصالات" },
  { name: "اورنج", phone: "110", category: "اتصالات" },
  { name: "WE", phone: "111", category: "اتصالات" },

  { name: "الشرطة", phone: "122", category: "طوارئ" },
  { name: "الإسعاف", phone: "123", category: "طوارئ" },
  { name: "المطافئ", phone: "180", category: "طوارئ" },

  { name: "حماية المستهلك", phone: "19588", category: "حكومة" },
  { name: "التموين", phone: "16528", category: "حكومة" },

  { name: "أوبر", phone: "01202222222", category: "منصات" },
  { name: "طلبات", phone: "19511", category: "منصات" },
];

/* ================== CATEGORIES ================== */
const categories = [
  { label: "🏦 بنوك", value: "بنوك" },
  { label: "📡 اتصالات", value: "اتصالات" },
  { label: "🚨 طوارئ", value: "طوارئ" },
  { label: "🏛️ حكومة", value: "حكومة" },
  { label: "🛒 منصات", value: "منصات" },
];

export default function HotlinePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const cleanQuery = query.trim().toLowerCase();
  const isNumberOnly = /^[0-9]+$/.test(cleanQuery);

  const isSearching = cleanQuery.length > 0;

  const shouldShowResults =
    isSearching || activeCategory !== null;

  const filteredHotlines = shouldShowResults
    ? hotlines.filter((item) => {
        // ❌ منع البحث بالأرقام
        if (isNumberOnly) return false;

        // ✅ البحث له أولوية ويُلغي الأيقونة
        if (isSearching) {
          return item.name.toLowerCase().includes(cleanQuery);
        }

        // ✅ عرض حسب الأيقونة فقط
        return item.category === activeCategory;
      })
    : [];

  return (
    <DeviceLock>
      <AppInstallLoader>
        <main className="bg-gray-50 min-h-screen px-4 py-12" dir="rtl">

          {/* العنوان */}
          <section className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl font-extrabold mb-4">
              📞 دليل الخطوط الساخنة
            </h1>
            <p className="text-gray-600">
              اختر تصنيفًا أو ابدأ بالبحث
            </p>
          </section>

          {/* البحث */}
          <div className="max-w-3xl mx-auto mb-6">
            <input
              type="text"
              placeholder="اكتب اسم الجهة (مثال: بنك – إسعاف)"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveCategory(null); // 🔥 إلغاء الأيقونة عند البحث
              }}
              className="w-full p-4 rounded-2xl border shadow focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* تحذير الأرقام */}
          {isNumberOnly && (
            <p className="text-center text-orange-500 text-sm mb-4">
              ⚠️ البحث بالأرقام غير مدعوم
            </p>
          )}

          {/* الأيقونات */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setActiveCategory(cat.value);
                  setQuery(""); // 🔥 مسح البحث عند الضغط على أيقونة
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition
                  ${
                    activeCategory === cat.value
                      ? "bg-green-600 text-white"
                      : "bg-white border hover:bg-gray-100"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* رسالة البداية */}
          {!shouldShowResults && (
            <p className="text-center text-gray-400 text-sm">
              👆 اختر تصنيفًا أو ابدأ بالبحث
            </p>
          )}

          {/* لا نتائج */}
          {shouldShowResults &&
            filteredHotlines.length === 0 &&
            !isNumberOnly && (
              <p className="text-center text-red-500 text-sm">
                ❌ لا توجد نتائج
              </p>
            )}

          {/* النتائج */}
          <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredHotlines.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow text-center"
              >
                <h3 className="font-bold mb-2">{item.name}</h3>
                <p className="text-green-600 font-bold text-xl">
                  {item.phone}
                </p>
                <a
                  href={`tel:${item.phone}`}
                  className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-xl"
                >
                  📞 اتصال مباشر
                </a>
              </div>
            ))}
          </section>
          <section className="mt-12 bg-gray-50 p-6 rounded-xl">
             <h3 className="text-xl font-bold mb-3">
         📘 مقالات تهمك عن الخطوط الساخنة
        </h3>

      <ul className="space-y-2">
          <li>
       <Link
        href="/blog/app/hotline-smart-search"
        className="text-green-600 font-semibold"
      >
        الخط الساخن: من البحث التقليدي إلى البحث الذكي
      </Link>
    </li>

    <li>
      <Link
        href="/blog/problems/user-search-problems"
        className="text-green-600 font-semibold"
      >
        مشاكل المستخدم عند البحث عن أرقام الخدمات
       </Link>
      </li>
      </ul>
       </section>


        </main>
      </AppInstallLoader>
    </DeviceLock>
  );
}
