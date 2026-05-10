"use client";

import Link from "next/link";

import { useParams } from "next/navigation";

import {
  X,
  GitCompare,
} from "lucide-react";

import {
  useCompare,
} from "@/context/CompareContext";

export default function CompareBar() {

  const {
    items,
    clear,
    remove,
  } = useCompare();

  const params = useParams();

  const country =
    (params?.country as string) ||
    "eg";

  // ✅ لا تعرض البار إذا لا توجد منتجات
  if (items.length === 0)
    return null;

  // ✅ تجهيز الرابط الصحيح
  let compareUrl = "#";

  if (items.length === 2) {

    const categorySlug =
      items[0]?.category_slug ||
      "products";

    const comparisonSlug =
      `${items[0].id}-vs-${items[1].id}`;

    compareUrl =
      `/${country}/product-comparisons/${categorySlug}/${comparisonSlug}`;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-slate-200 shadow-2xl p-4">

      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">

        {/* المنتجات */}
        <div className="flex items-center gap-3 flex-wrap">

          {items.map(
            (item, index) => (

              <div
                key={item.id}
                className="bg-orange-50 border border-orange-200 text-orange-700 px-4 py-2 rounded-2xl flex items-center gap-2 text-sm font-bold"
              >

                <span className="max-w-[140px] truncate">

                  {item.title ||
                    `منتج ${index + 1}`}

                </span>

                <button
                  onClick={() =>
                    remove(item.id)
                  }
                  title="حذف المنتج"
                  aria-label="حذف المنتج"
                  className="text-red-500 hover:text-red-700 transition-colors"
                >

                  <X size={16} />

                </button>

              </div>
            )
          )}

        </div>

        {/* الأزرار */}
        <div className="flex items-center gap-2">

          {/* مسح */}
          <button
            onClick={clear}
            title="مسح المقارنة"
            aria-label="مسح المقارنة"
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3 rounded-2xl font-bold transition-colors"
          >

            مسح

          </button>

          {/* مقارنة */}
          {items.length === 2 && (

            <Link
              href={compareUrl}
              title="ابدأ المقارنة"
              aria-label="ابدأ المقارنة"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all"
            >

              <GitCompare size={18} />

              ابدأ المقارنة

            </Link>
          )}

        </div>

      </div>

    </div>
  );
}