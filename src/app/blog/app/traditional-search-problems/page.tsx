import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "لماذا يفشل البحث التقليدي عن الخطوط الساخنة؟ | البحث الذكى",
  description:
    "تعرف على أسباب فشل البحث في جوجل عن أرقام الخطوط الساخنة وكيف يوفر البحث الذكى نتائج دقيقة وفورية بدون إعلانات أو روابط مضللة.",
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
        عندما تحتاج إلى رقم خدمة عملاء أو خط ساخن بشكل عاجل، 
        أول ما يخطر ببالك هو البحث في جوجل. لكن في الواقع،
        هذه الطريقة غالبًا ما تؤدي إلى نتائج غير دقيقة أو
        مضيعة للوقت.
      </p>

      {/* ===== REASON 1 ===== */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        1️⃣ نتائج قديمة وغير محدثة
      </h2>
      <p className="mb-4">
        العديد من المواقع تنشر أرقام الخطوط الساخنة دون تحديثها
        بشكل مستمر، مما يعرضك لخطر الاتصال بأرقام مغلقة أو تم تغييرها.
      </p>

      {/* ===== REASON 2 ===== */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        2️⃣ تشتيت بالإعلانات والروابط
      </h2>
      <p className="mb-4">
        تظهر عشرات النتائج والإعلانات قبل الوصول إلى الرقم الصحيح،
        مما يستهلك وقتك ويشتتك خاصة في الحالات العاجلة.
      </p>

      {/* ===== REASON 3 ===== */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">
        3️⃣ أرقام غير رسمية أو وسيطة
      </h2>
      <p className="mb-6">
        أحيانًا تظهر أرقام غير رسمية أو خدمات وسيطة لا تتبع
        الجهة الأصلية، مما يؤدي إلى تجربة سيئة أو معلومات مضللة.
      </p>

      {/* ===== SOLUTION ===== */}
      <h2 className="text-2xl font-semibold mt-10 mb-3">
        الحل: البحث الذكى
      </h2>

      <p className="mb-4">
        البحث الذكى يوفر لك الرقم الصحيح مباشرة دون الحاجة
        إلى تصفح روابط خارجية أو التعرض لإعلانات مزعجة.
      </p>

      <ul className="list-disc pr-6 text-gray-700 mb-6">
        <li>نتائج دقيقة ومحدثة</li>
        <li>وصول فوري بدون تشتيت</li>
        <li>بدون تسجيل أو خطوات معقدة</li>
        <li>اتصال مباشر بخدمة العملاء</li>
      </ul>

      {/* ===== CTA ===== */}
      <div className="bg-green-50 p-6 rounded-xl text-center">
        <h3 className="text-xl font-bold mb-3">
          اختصر وقتك الآن
        </h3>
        <p className="text-gray-600 mb-4">
          جرّب البحث الذكى للوصول إلى أي رقم خدمة عملاء في ثوانٍ
        </p>
        <Link
          href="/delivery/hotline"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          فتح تطبيق الخط الساخن
        </Link>
      </div>

      {/* ===== BACK ===== */}
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