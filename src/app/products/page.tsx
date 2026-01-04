'use client';

import Image from "next/image";
import { useState } from "react";
import { products } from "@/data/products";

export default function ProductsPage() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className="bg-gray-50">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-l from-green-600 to-emerald-500 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            منتجات البحث الذكي
          </h1>
          <p className="text-lg leading-relaxed opacity-95">
            Smart Search هو رفيقك للوصول إلى المعلومة الصحيحة في ثوانٍ،
            بدون روابط مكسورة أو نتائج غير دقيقة.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        {/* وصف */}
        <div className="max-w-4xl mx-auto text-center mb-16 text-gray-700 leading-relaxed">
          <p>
            في عالم يمتلئ بالبيانات، لم يعد التحدي في إيجاد المعلومة،
            بل في الوصول إليها بسرعة ودقة.
            منتجات <strong>Smart Search</strong> صُممت لتقدم لك
            <strong> الإجابة </strong> وليس مجرد روابط.
          </p>
        </div>

        {/* ================= PRODUCTS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl shadow hover:shadow-xl transition p-6 flex flex-col"
            >
              {/* صورة */}
              <Image
                src={product.image}
                alt={product.title}
                width={220}
                height={220}
                className="mx-auto mb-6 rounded-xl"
              />

              {/* عنوان */}
              <h3 className="text-xl font-bold text-center mb-3">
                {product.title}
              </h3>

              {/* وصف */}
              <p className="text-gray-600 text-sm text-center mb-6">
                {product.description}
              </p>

              {/* زر */}
              <button
                onClick={() =>
                  setActiveId(activeId === product.id ? null : product.id)
                }
                className="mt-auto bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
              >
                ابدأ البحث
              </button>

              {/* ================= DETAILS ================= */}
              {activeId === product.id && (
                <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 text-center animate-fadeIn">
                  <p className="text-green-700 font-semibold mb-2">
                    تم تفعيل البحث
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    سيتم عرض نتائج البحث الخاصة بهذا المنتج فقط.
                  </p>

                  {product.link && (
                    <a
                      href={product.link}
                      className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
                    >
                      الانتقال للنتائج
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}

        </div>
      </section>
    </div>
  );
}
