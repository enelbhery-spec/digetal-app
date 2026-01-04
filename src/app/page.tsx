import Link from "next/link";
import Image from "next/image";
import Categories from "../components/Categories";

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

      {/* ================= SMART SEARCH ================= */}
      <p className="mt-4 text-sm text-gray-600">
  📖 تعرّف على
  <Link
    href="/blog"
    className="text-green-600 font-semibold mx-1"
  >
    مقالات Smart Search
  </Link>
  لفهم طريقة البحث الذكي ولماذا هو أفضل من البحث التقليدي.
</p>

      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Smart Search – محرك البحث الذكي
        </h2>

        <p className="text-gray-600 mb-8">
          طريقة ذكية للوصول السريع إلى الخدمات والأرقام المهمة.
        </p>

        <Link
          href="/smart-search"
          className="inline-block bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition"
        >
          استخدم Smart Search الآن
        </Link>
      </section>

      {/* ================= CATEGORIES ================= */}
      <Categories />
      {/* ================= التطبيقات ================= */}
<section className="py-16 bg-gray-50">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-10">
      📱 التطبيقات المتاحة
    </h2>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl border p-4 shadow hover:shadow-lg transition">
        <img
          src="/products/hotline-guide.png"
          alt="بحث الخط الساخن"
          className="rounded-lg mb-4"
        />
        <h3 className="font-bold text-lg mb-2">
          بحث الخط الساخن – اتصال مباشر
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          الوصول السريع لأرقام الطوارئ والخدمات.
        </p>
        <Link
          href="/delivery/hotline"
          className="text-green-600 font-semibold"
        >
          فتح التطبيق →
        </Link>
      </div>

      <div className="bg-white rounded-xl border p-4 shadow hover:shadow-lg transition">
        <img
          src="/products/egyptstores.png"
          alt="العروض الحصرية"
          className="rounded-lg mb-4"
        />
        <h3 className="font-bold text-lg mb-2">
          العروض الحصرية للمتاجر
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          أفضل عروض المتاجر الإلكترونية في مكان واحد.
        </p>
        <Link
          href="/delivery/egyptStores"
          className="text-green-600 font-semibold"
        >
          فتح التطبيق →
        </Link>
      </div>

      <div className="bg-white rounded-xl border p-4 shadow hover:shadow-lg transition">
        <img
          src="/products/ComputerStores.png"
          alt="متاجر الكمبيوتر"
          className="rounded-lg mb-4"
        />
        <h3 className="font-bold text-lg mb-2">
          متاجر أجهزة اللابتوب
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          أجهزة وقطع غيار من متاجر موثوقة.
        </p>
        <Link
          href="/delivery/ComputerStores"
          className="text-green-600 font-semibold"
        >
          فتح التطبيق →
        </Link>
      </div>
    </div>
  </div>
</section>


      {/* ================= BLOG SECTION (NEW) ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">

          <h2 className="text-4xl font-bold text-center mb-4">
            مقالات ودليل الاستخدام
          </h2>

          <p className="text-center text-gray-600 mb-12">
            مقالات تشرح الطرق التقليدية مقابل البحث الذكي داخل تطبيقاتنا
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Article 1 */}
            <div className="bg-gray-50 rounded-xl p-6 border hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-3">
                البحث عن الخط الساخن بالطريقة التقليدية
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                كيف كان المستخدم يبحث عن أرقام الطوارئ والخدمات سابقًا؟
              </p>
              <Link
                href="/blog/app/hotline-smart-search"
                className="text-green-600 font-semibold"
              >
                اقرأ المقال →
              </Link>
            </div>

            {/* Article 2 */}
            <div className="bg-gray-50 rounded-xl p-6 border hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-3">
                البحث الذكي عن الخط الساخن
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                كيف يوفر التطبيق نتائج فورية بحرف أو اثنين فقط؟
              </p>
              <Link
                href="/blog/app/how-smart-search-works"
                className="text-green-600 font-semibold"
              >
                اقرأ المقال →
              </Link>
            </div>

            {/* Article 3 */}
            <div className="bg-gray-50 rounded-xl p-6 border hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-3">
                لماذا البحث الذكي أفضل؟
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                مقارنة حقيقية بين البحث اليدوي والتطبيقات الذكية.
              </p>
              <Link
                href="/blog/app/why-smart-search"
                className="text-green-600 font-semibold"
              >
                اقرأ المقال →
              </Link>
            </div>

          </div>

          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition"
            >
              عرض كل المقالات
            </Link>
          </div>

        </div>
      </section>

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
