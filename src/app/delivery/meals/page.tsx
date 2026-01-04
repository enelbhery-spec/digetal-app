"use client";

import { useState } from "react";

type Meal = {
  id: string;
  title: string;
  ingredients: string;
  steps: string;
  youtubeUrl: string;
  category: "breakfast" | "lunch" | "dinner";
};

const meals: Meal[] = [
  {
    id: "breakfast-1",
    title: "بيض بالماء بدون زيت",
    ingredients: "3 بيض – ماء – رشة ملح",
    steps: "غلي الماء، كسر البيض بهدوء، تركه 2–3 دقائق.",
    youtubeUrl: "https://youtube.com/shorts/jN2IQ-Ozxlk",
    category: "breakfast",
  },
  {
    id: "breakfast-2",
    title: "فول مصري بالطماطم",
    ingredients: "فول – طماطم – ثوم – بصل – كمون",
    steps: "تشويح الثوم، إضافة الطماطم ثم الفول.",
    youtubeUrl: "https://www.youtube.com/shorts/FyUxz7DstxQ",
    category: "breakfast",
  },
  {
    id: "lunch-1",
    title: "أرز أبيض سادة",
    ingredients: "أرز – ماء – زيت – ملح",
    steps: "طريقة التحضير موضحة بالفيديو.",
    youtubeUrl: "https://www.youtube.com/shorts/U6JZUbWUQok",
    category: "lunch",
  },
  {
    id: "lunch-2",
    title: "مكرونة بالبشاميل",
    ingredients: "المكونات كاملة بالفيديو",
    steps: "طريقة التحضير موضحة بالفيديو.",
    youtubeUrl: "https://youtu.be/QHMsZG1-Ibc",
    category: "lunch",
  },
  {
    id: "dinner-1",
    title: "عشاء اقتصادي بدون لحوم",
    ingredients: "المكونات كاملة بالفيديو",
    steps: "طريقة التحضير موضحة بالفيديو.",
    youtubeUrl: "https://youtu.be/j1mp6Id47w4",
    category: "dinner",
  },
  {
    id: "dinner-2",
    title: "عشاء تونة سريع",
    ingredients: "المكونات كاملة بالفيديو",
    steps: "طريقة التحضير موضحة بالفيديو.",
    youtubeUrl: "https://www.youtube.com/shorts/UziRWwZqefA",
    category: "dinner",
  },
];

const categories = [
  { id: "breakfast", label: "🍳 فطار" },
  { id: "lunch", label: "🍽️ غداء" },
  { id: "dinner", label: "🌙 عشاء" },
];

export default function MealsProductPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const normalizedQuery = query.trim().toLowerCase();

  // نتائج البحث
  const searchResults =
    normalizedQuery.length >= 1
      ? meals.filter(
          (m) =>
            m.title.toLowerCase().includes(normalizedQuery) ||
            m.ingredients.toLowerCase().includes(normalizedQuery)
        )
      : [];

  // نتائج الأيقونات
  const categoryResults = activeCategory
    ? meals.filter((m) => m.category === activeCategory)
    : [];

  const results = query ? searchResults : categoryResults;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-5" dir="rtl">
      {/* العنوان */}
      <h1 className="text-xl font-bold text-center">
        🍽️ دليل الوجبات اليومية
      </h1>

      {/* البحث */}
      <input
        className="w-full border rounded-xl p-3 text-right"
        placeholder="ابحث عن وجبة أو مكون..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveCategory(null); // إخفاء نتائج الأيقونات
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
      <div className="space-y-4">
        {results.map((meal) => (
          <div
            key={meal.id}
            className="border rounded-xl p-4 bg-white shadow-sm"
          >
            <h3 className="font-bold mb-2">{meal.title}</h3>
            <p className="text-sm">
              <strong>المقادير:</strong> {meal.ingredients}
            </p>
            <p className="text-sm mt-1">
              <strong>التحضير:</strong> {meal.steps}
            </p>

            <a
              href={meal.youtubeUrl}
              target="_blank"
              className="inline-block mt-3 bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              ▶️ مشاهدة الفيديو
            </a>

            <p className="text-xs text-gray-400 mt-2">
              ⚠️ الفيديوهات لأصحابها على يوتيوب – للاستخدام الإرشادي فقط
            </p>
          </div>
        ))}
      </div>

      {/* لا نتائج */}
      {query && searchResults.length === 0 && (
        <p className="text-center text-gray-400">
          لا توجد نتائج مطابقة
        </p>
      )}
    </div>
  );
}
