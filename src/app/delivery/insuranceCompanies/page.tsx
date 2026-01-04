"use client";

import { useState } from "react";

type Company = {
  id: number;
  name: string;
  type: string;
  phone: string;
  url: string;
  category: "cars" | "general" | "health";
};

const companies: Company[] = [
  {
    id: 1,
    name: "مصر للتأمين",
    type: "تأمين شامل – سيارات",
    phone: "19114",
    url: "https://misrins.com.eg/ar/",
    category: "cars",
  },
  {
    id: 2,
    name: "قناة السويس للتأمين",
    type: "تأمين سيارات",
    phone: "16569",
    url: "https://sci-egypt.com",
    category: "cars",
  },
  {
    id: 3,
    name: "أليانز مصر",
    type: "تأمين شامل",
    phone: "19909",
    url: "https://www.allianz.com.eg",
    category: "general",
  },
  {
    id: 4,
    name: "AXA مصر",
    type: "تأمين سيارات – صحي",
    phone: "16363",
    url: "https://www.axa-egypt.com",
    category: "health",
  },
  {
    id: 5,
    name: "GIG مصر",
    type: "تأمين عام وحياة",
    phone: "19792",
    url: "https://gig.com.eg",
    category: "general",
  },
];

const categories = [
  { id: "cars", label: "🚗 تأمين سيارات" },
  { id: "general", label: "🛡️ تأمين شامل" },
  { id: "health", label: "🏥 تأمين صحي" },
];

export default function InsuranceCompanies() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const normalizedQuery = query.trim().toLowerCase();

  const searchResults =
    normalizedQuery.length >= 1
      ? companies.filter(
          (c) =>
            c.name.toLowerCase().includes(normalizedQuery) ||
            c.type.toLowerCase().includes(normalizedQuery)
        )
      : [];

  const categoryResults = activeCategory
    ? companies.filter((c) => c.category === activeCategory)
    : [];

  return (
    <div className="max-w-xl mx-auto p-4 space-y-5" dir="rtl">
      {/* العنوان */}
      <h1 className="text-xl font-bold text-center">
        🚗 شركات التأمين على السيارات
      </h1>

      {/* مربع البحث */}
      <input
        className="w-full border rounded-xl p-3 text-right"
        placeholder="اكتب اسم الشركة أو نوع التأمين..."
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
        {(query ? searchResults : categoryResults).map((company) => (
          <li
            key={company.id}
            className="border rounded-xl p-4 flex justify-between items-center bg-white shadow-sm"
          >
            <div>
              <p className="font-semibold">{company.name}</p>
              <p className="text-sm text-gray-600">{company.type}</p>
            </div>

            <div className="flex gap-2">
              <a
                href={`tel:${company.phone}`}
                className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
              >
                اتصال
              </a>
              <a
                href={company.url}
                target="_blank"
                className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
              >
                الموقع
              </a>
            </div>
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
