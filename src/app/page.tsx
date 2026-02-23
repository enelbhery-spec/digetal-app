import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";

import Categories from "../components/Categories";
import StoresPreview from "../components/StoresPreview";
import AmazonProductsPreview from "../components/AmazonProductsPreview";

export default async function Home() {

  // ✅ قراءة الدولة من middleware
  const cookieStore = cookies();
  const country =
    (await cookieStore).get("user_country")?.value || "EG";

  return (
    <main className="bg-gray-50 text-gray-800">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-gradient-to-bl from-green-600 via-green-500 to-emerald-500 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              البحث الذكي الرقمي
              <br />
              <span className="text-yellow-300">
                خدمات عملاء • منتجات • خصومات أمازون
              </span>
            </h1>

            <p className="text-lg text-white/90 mb-6 leading-relaxed">
              منصة رقمية تساعدك في الوصول السريع إلى أرقام خدمة العملاء،
              أفضل المنتجات، وأحدث عروض وخصومات أمازون – كل ذلك مجانًا.
            </p>

            <div className="flex gap-4 flex-wrap">
              <Link
                href="/delivery/hotline"
                className="bg-white text-green-600 px-7 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
              >
                البحث عن رقم خدمة
              </Link>

              <Link
                href="/products"
                className="bg-yellow-400 text-black px-7 py-4 rounded-xl font-bold hover:bg-yellow-300 transition"
              >
                تصفح المنتجات والعروض
              </Link>
            </div>
          </div>

          {/* RIGHT BOX */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-gray-800">
            <h3 className="text-xl font-bold mb-4">
              كيف يعمل البحث الذكي؟
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>✔ اكتب اسم الخدمة أو المنتج</li>
              <li>✔ تحصل على النتيجة الصحيحة فورًا</li>
              <li>✔ بدون تسجيل أو خطوات معقدة</li>
              <li>✔ وصول مباشر وسريع</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= BLOG LINK ================= */}
      <div className="max-w-7xl mx-auto px-6">
        <p className="mt-6 text-sm text-gray-600 text-center md:text-right">
          📖 تعرّف على
          <Link href="/blog" className="text-green-600 font-semibold mx-1">
            مقالات البحث الذكي
          </Link>
          لمعرفة لماذا هو البديل الأفضل للبحث التقليدي.
        </p>
      </div>

      {/* ================= AMAZON PREVIEW ================= */}
      
      {/* ✅ تظهر فقط للمصريين */}
      {country === "EG" && <AmazonProductsPreview />}

      {/* ================= STORES ================= */}
      <StoresPreview />

      {/* ================= CATEGORIES ================= */}
      <Categories />

      {/* ================= CTA ================= */}
      <section className="py-20 bg-green-600 text-white text-center mt-16">
        <h2 className="text-4xl font-bold mb-6">
          اختصر وقتك وابدأ الآن
        </h2>
        <p className="mb-8 text-white/90">
          ابحث عن خدمة عملاء أو اكتشف أفضل العروض والخصومات في ثوانٍ
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/delivery/hotline"
            className="bg-white text-green-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
          >
            البحث عن رقم خدمة
          </Link>

          <Link
            href="/products"
            className="bg-yellow-400 text-black px-10 py-4 rounded-xl font-bold hover:bg-yellow-300 transition"
          >
            تصفح العروض
          </Link>
        </div>
      </section>

    </main>
  );
}