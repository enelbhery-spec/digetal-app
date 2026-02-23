import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "لماذا يُعد البحث الذكي أفضل طريقة للعثور على الخدمات؟ | البحث الذكي",
  description:
    "اكتشف لماذا يفشل البحث التقليدي عن الخطوط الساخنة وخدمة العملاء، وكيف يمنحك البحث الذكي نتائج دقيقة وسريعة للوصول إلى الخدمة الصحيحة.",
};

export default function WhySmartSearchPage() {
  return (
    <main className="max-w-4xl mx-auto p-4 leading-loose" dir="rtl">
      
      {/* ===== TITLE ===== */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6">
        لماذا يُعد البحث الذكي أفضل حل للبحث عن الخدمات؟
      </h1>

      {/* ===== INTRO ===== */}
      <p className="text-gray-700 mb-6">
        أصبح البحث عن أرقام <strong>الخطوط الساخنة</strong>،
        <strong>خدمة العملاء</strong>، أو <strong>الدعم الفني</strong>
        أمرًا مرهقًا بسبب كثرة النتائج غير الدقيقة والإعلانات المضللة.
      </p>

      <p className="text-gray-700 mb-10">
        هنا يأتي <strong>البحث الذكي</strong> كحل حديث يختصر الوقت
        ويوفر لك النتيجة الصحيحة مباشرة دون تشتيت.
      </p>

      {/* ===== PROBLEM ===== */}
      <h2 className="text-2xl font-bold mb-4">
        ❌ لماذا يفشل البحث التقليدي؟
      </h2>

      <ul className="list-disc pr-6 text-gray-700 mb-8">
        <li>أرقام غير محدثة أو خاطئة</li>
        <li>إعلانات قبل الوصول للمعلومة</li>
        <li>نتائج غير رسمية أو وسيطة</li>
        <li>إضاعة وقت في التصفح والمقارنة</li>
      </ul>

      <p className="mb-10">
        اقرأ شرحًا تفصيليًا هنا:
        <Link
          href="/blog/app/traditional-search-problems"
          className="text-green-600 font-semibold mx-1"
        >
          لماذا يفشل البحث التقليدي؟
        </Link>
      </p>

      {/* ===== SOLUTION ===== */}
      <h2 className="text-2xl font-bold mb-4">
        ✅ ماذا يقدم البحث الذكي؟
      </h2>

      <p className="text-gray-700 mb-6">
        البحث الذكي ليس مجرد محرك بحث، بل منصة رقمية متخصصة
        في عرض النتائج الدقيقة للخدمات الحقيقية بسرعة وسهولة.
      </p>

      <ul className="list-disc pr-6 text-gray-700 mb-8">
        <li>عرض الرقم الصحيح فورًا</li>
        <li>تحديث مستمر للبيانات</li>
        <li>وصول مباشر بدون تسجيل</li>
        <li>تجربة استخدام بسيطة وسريعة</li>
      </ul>

      <p className="mb-10">
        تعرّف على طريقة العمل:
        <Link
          href="/blog/app/how-smart-search-works"
          className="text-green-600 font-semibold mx-1"
        >
          كيف يعمل البحث الذكي؟
        </Link>
      </p>

      {/* ===== USER VALUE ===== */}
      <h2 className="text-2xl font-bold mb-4">
        🎯 الفائدة الحقيقية لك
      </h2>

      <p className="text-gray-700 mb-8">
        باستخدام البحث الذكي لن تحتاج إلى تصفح عشرات المواقع
        أو تجربة أرقام خاطئة. كل ما تبحث عنه متاح في مكان واحد
        وبأقل عدد من الخطوات.
      </p>

      <p className="mb-10">
        تعرّف أيضًا على:
        <Link
          href="/blog/problems"
          className="text-green-600 font-semibold mx-1"
        >
          أبرز مشاكل المستخدم أثناء البحث
        </Link>
      </p>

      {/* ===== CTA ===== */}
      <section className="bg-green-50 p-6 rounded-xl text-center">
        <h2 className="text-xl font-bold mb-2">
          🚀 جرّب البحث الذكي الآن
        </h2>
        <p className="text-gray-600 mb-4">
          اختصر وقتك واعثر على الخدمة الصحيحة من أول مرة
        </p>
        <Link
          href="/"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          ابدأ الآن
        </Link>
      </section>

    </main>
  );
}