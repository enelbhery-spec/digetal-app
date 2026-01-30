import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "لماذا يفشل البحث التقليدي عن الخطوط الساخنة؟",
  description:
    "تعرف على أسباب فشل البحث التقليدي عن أرقام الخطوط الساخنة ولماذا يضيع وقتك، وكيف يحل البحث الذكي هذه المشكلة.",
};

export default function TraditionalHotlineSearchFailure() {
  return (
    <main className="max-w-3xl mx-auto p-4 leading-relaxed" dir="rtl">
      {/* ===== TITLE ===== */}
      <h1 className="text-3xl font-bold mb-6">
        لماذا يفشل البحث التقليدي عن الخطوط الساخنة؟
      </h1>

      {/* ===== INTRO ===== */}
      <p className="text-gray-700 mb-5">
        كثير من المستخدمين يعتقدون أن البحث في جوجل أو فيسبوك هو أسرع
        طريقة للوصول إلى أرقام الخطوط الساخنة، لكن الواقع مختلف تمامًا.
        في أغلب الأحيان ينتهي البحث بإضاعة الوقت أو الوصول إلى رقم خاطئ.
      </p>

      {/* ===== REASON 1 ===== */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        1️⃣ نتائج قديمة وغير محدثة
      </h2>
      <p className="mb-4">
        أغلب المواقع التي تعرض أرقام الخطوط الساخنة لا تقوم بتحديث
        بياناتها باستمرار، مما يؤدي إلى أرقام مغلقة أو تم تغييرها
        منذ فترة طويلة.
      </p>

      {/* ===== REASON 2 ===== */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        2️⃣ تشتيت المستخدم بالإعلانات
      </h2>
      <p className="mb-4">
        عند البحث التقليدي، يظهر أمامك عشرات الروابط والإعلانات
        المدفوعة قبل الوصول إلى المعلومة الحقيقية، مما يضيع وقتك
        ويشتتك عن الهدف الأساسي.
      </p>

      {/* ===== REASON 3 ===== */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        3️⃣ صعوبة الوصول السريع في حالات الطوارئ
      </h2>
      <p className="mb-4">
        في حالات الطوارئ، لا يوجد وقت لتصفح صفحات طويلة أو مقارنة
        نتائج متعددة. البحث التقليدي لا يراعي عامل السرعة.
      </p>

      {/* ===== REASON 4 ===== */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        4️⃣ نتائج غير دقيقة أو مضللة
      </h2>
      <p className="mb-6">
        أحيانًا تظهر أرقام لا تخص الجهة التي تبحث عنها، أو أرقام
        وسيطة وخدمات غير رسمية، مما يؤدي إلى تجربة سيئة للمستخدم.
      </p>

      {/* ===== البحث الذكى SOLUTION ===== */}
      <h2 className="text-2xl font-semibold mt-10 mb-3">
        كيف يحل البحث الذكي هذه المشكلة؟
      </h2>

      <ul className="list-disc pr-6 text-gray-700 mb-6">
        <li>إظهار الرقم الصحيح مباشرة</li>
        <li>عدم الاعتماد على روابط خارجية</li>
        <li>تحديث مستمر للبيانات</li>
        <li>نتائج فورية بدون تشتيت</li>
      </ul>

      {/* ===== CTA ===== */}
      <div className="bg-green-50 p-6 rounded-xl text-center">
        <h3 className="text-xl font-bold mb-3">
          لا تضيع وقتك بعد الآن
        </h3>
        <p className="text-gray-600 mb-4">
          استخدم البحث الذكي للوصول إلى أي خط ساخن في ثوانٍ
        </p>
        <Link
          href="/delivery/hotline"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          فتح تطبيق الخط الساخن
        </Link>
      </div>

      {/* ===== BACK TO BLOG ===== */}
      <div className="mt-8 text-center">
        <Link
          href="/blog/app"
          className="text-green-600 font-semibold"
        >
          ← العودة إلى مقالات التطبيق
        </Link>
      </div>
    </main>
  );
}
