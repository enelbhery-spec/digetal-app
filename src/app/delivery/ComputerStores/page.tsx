"use client";

import { useState } from "react";

type Store = {
  id: number;
  name: string;
  type: string;
  url: string;
  category: "gaming" | "parts" | "hardware";
};

const stores: Store[] = [
  {
    id: 1,
    name: "Maximum Hardware",
    type: "تجميعات وقطع غيار",
    url: "https://maximumhardware.store/accessories-1/meetion-mt-pd121-large-rgb-gaming-mouse-pad?tracking=4yz6vQ0EwyDAoenU2015Q0TGZW6F33PIlo4hTiVRTZFnBW6QOzR94stOEpjiQsz0&fbclid=IwY2xjawP5uo5leHRuA2FlbQIxMABicmlkETF0NkdUNWV4MnlFV1V6YjJac3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHiCuC8PyZ2WCaemepjdSmr_f78jD7o7B6EQY-C7WnaLUy3cgC4rGiSJzSkR-_aem_9dQyFBKqorYkORc2KO4Ypg",
    category: "hardware",
  },
  {
    id: 2,
    name: "High End Store",
    type: "كمبيوتر جيمينج",
    url: "https://highend-store.com",
    category: "gaming",
  },
  {
    id: 3,
    name: "Arab Hardware Store",
    type: "قطع غيار",
    url: "https://store.arabhardware.net",
    category: "parts",
  },
];

const categories = [
  { id: "gaming", label: "🎮 جيمينج" },
  { id: "parts", label: "🧩 قطع غيار" },
  { id: "hardware", label: "🖥️ هاردوير" },
];

export default function ComputerStores() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const normalizedQuery = query.trim().toLowerCase();

  // نتائج البحث النصي
  const searchResults =
    normalizedQuery.length >= 1
      ? stores.filter(
          (s) =>
            s.name.toLowerCase().includes(normalizedQuery) ||
            s.type.toLowerCase().includes(normalizedQuery)
        )
      : [];

  // نتائج الأيقونات
  const categoryResults = activeCategory
    ? stores.filter((s) => s.category === activeCategory)
    : [];

  return (
    <div className="max-w-xl mx-auto p-4 space-y-5" dir="rtl">
      {/* العنوان */}
      <h1 className="text-xl font-bold text-center">
        🖥️ دليل متاجر الكمبيوتر وقطع الغيار
      </h1>

      {/* مربع البحث */}
      <input
        className="w-full border rounded-xl p-3 text-right"
        placeholder="اكتب اسم المتجر أو نوع الخدمة..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveCategory(null); // إخفاء نتائج الأيقونات عند البحث
        }}
      />

      {/* الأيقونات */}
      {!query && (
        <div className="grid grid-cols-3 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`border rounded-xl py-3 text-sm font-medium hover:bg-gray-100 ${
                activeCategory === cat.id ? "bg-gray-100" : ""
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* النتائج */}
      <ul className="space-y-3">
        {(query ? searchResults : categoryResults).map((store) => (
          <li
            key={store.id}
            className="border rounded-xl p-4 flex justify-between items-center bg-white shadow-sm"
          >
            <div>
              <p className="font-semibold">{store.name}</p>
              <p className="text-sm text-gray-600">{store.type}</p>
            </div>

            <a
              href={store.url}
              target="_blank"
              className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm"
            >
              زيارة
            </a>
          </li>
        ))}
      </ul>

      {/* لا توجد نتائج */}
      {query && searchResults.length === 0 && (
        <p className="text-center text-gray-400 mt-6">
          لا توجد نتائج مطابقة
        </p>
      )}
    </div>
  );
}
