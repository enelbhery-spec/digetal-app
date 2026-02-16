"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// إعدادات Supabase (نفس التي استخدمناها في البايثون)
const SUPABASE_URL = "https://addlrxwxjquowcmkyyqg.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkZGxyeHd4anF1b3djbWt5eXFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODg5MTAsImV4cCI6MjA4Njc2NDkxMH0.Ba5lUtyfN1SUye1kZ-tmOKrs3fFxA993YXSqVOuR4aA";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

type Store = {
  id: number;
  title: string;
  description: string;
  main_value: string;
  category: string;
};

const categories = [
  { id: "laptops", label: "💻 لابتوب وكومبيوتر" },
];

export default function ComputerStores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>("laptops");

  // 1. جلب البيانات من Supabase عند تحميل الصفحة
  useEffect(() => {
    async function fetchStores() {
      setLoading(true);
      const { data, error } = await supabase
        .from("universal_search")
        .select("*")
        .eq("is_active", true); // جلب المتاجر النشطة فقط

      if (data) setStores(data);
      if (error) console.error("Error fetching stores:", error);
      setLoading(false);
    }
    fetchStores();
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  // 2. فلترة النتائج بناءً على البحث أو التصنيف
  const filteredResults = stores.filter((s) => {
    if (query) {
      return (
        s.title.toLowerCase().includes(normalizedQuery) ||
        s.description.toLowerCase().includes(normalizedQuery)
      );
    }
    return s.category === activeCategory;
  });

  return (
    <div className="max-w-xl mx-auto p-4 space-y-5" dir="rtl">
      <h1 className="text-xl font-bold text-center">
        🖥️ دليل متاجر الكمبيوتر (تحديث مباشر)
      </h1>

      {/* مربع البحث */}
      <input
        className="w-full border rounded-xl p-3 text-right shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="ابحث عن متجر (سيجما، أمازون...)"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveCategory(null);
        }}
      />

      {/* الأيقونات */}
      {!query && (
        <div className="grid grid-cols-3 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`border rounded-xl py-3 text-sm font-medium transition-all ${
                activeCategory === cat.id ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* حالة التحميل */}
      {loading && <p className="text-center text-gray-500">جاري جلب المتاجر من الداتابيز...</p>}

      {/* قائمة النتائج */}
      <ul className="space-y-3">
        {filteredResults.map((store) => (
          <li
            key={store.id}
            className="border rounded-xl p-4 flex justify-between items-center bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex-1 ml-4">
              <p className="font-semibold text-blue-900">{store.title}</p>
              <p className="text-xs text-gray-500 mt-1">{store.description}</p>
            </div>

            <a
              href={store.main_value}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors"
            >
              زيارة
            </a>
          </li>
        ))}
      </ul>

      {/* رسالة لا توجد نتائج */}
      {!loading && filteredResults.length === 0 && (
        <p className="text-center text-gray-400 mt-6">لا توجد متاجر في هذا القسم حالياً</p>
      )}
    </div>
  );
}