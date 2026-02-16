import Link from "next/link";
import Image from "next/image";
import Categories from "../components/Categories";
import SmartSearchPreview from "../components/SmartSearchPreview"; // استيراد المكون الجديد

export default function Home() {
  return (
    <main className="bg-gray-50 text-gray-800">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-gradient-to-bl from-green-600 via-green-500 to-emerald-500 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              البحث الذكى الرقمى
              <br />
              <span className="text-yellow-300">استخدم البحث فورًا</span>
            </h1>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              نوفر لك خدمات ومنتجات رقمية مجانية وسريعة.
            </p>
            <Link
              href="/products"
              className="bg-white text-green-600 px-7 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
            >
              تصفح التطبيقات
            </Link>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-gray-800">
            <h3 className="text-xl font-bold mb-4">كيف يعمل المتجر؟</h3>
            <ul className="space-y-3 text-gray-600">
              <li>✔ اختر التطبيق المناسب</li>
              <li>✔ اضغط على فتح التطبيق</li>
              <li>✔ بدون دفع – مجانًا</li>
              <li>✔ استخدم البحث فورًا</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= البحث الذكى السريع ================= */}
      <div className="max-w-7xl mx-auto px-6">
         <p className="mt-4 text-sm text-gray-600 text-center md:text-right">
          📖 تعرّف على
          <Link href="/blog" className="text-green-600 font-semibold mx-1">
            مقالات البحث الذكى
          </Link>
          لفهم طريقة البحث الذكي ولماذا هو أفضل من البحث التقليدي.
        </p>
      </div>

      {/* استدعاء عرض المحرك الذكي هنا (قبل التصنيفات لزيادة التفاعل) */}
      <SmartSearchPreview />

      {/* ================= CATEGORIES ================= */}
      <Categories />

      {/* ================= التطبيقات ================= */}
      {/* ... باقي الأقسام الخاصة بك كما هي دون تغيير ... */}
      <section className="py-16 bg-gray-50">
          {/* ... كود التطبيقات ... */}
      </section>

      {/* ================= خدمات العملاء ================= */}
      {/* ... كود الخدمات ... */}

      {/* ================= BLOG SECTION ================= */}
      {/* ... كود المقالات ... */}

      {/* ================= CTA ================= */}
      <section className="py-20 bg-green-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">جاهز تبدأ؟</h2>
        <Link
          href="/products"
          className="bg-white text-green-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
        >
          ابدأ بتصفح التطبيقات
        </Link>
      </section>
    </main>
  );
}