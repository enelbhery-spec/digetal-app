import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "كيف يعمل Smart Search للوصول للخدمة الصحيحة؟",
  description:
    "شرح عملي لكيفية عمل Smart Search في الوصول السريع والدقيق إلى الخطوط الساخنة والخدمات بدون نتائج خاطئة.",
};

export default function HowSmartSearchWorksPage() {
  return (
    <main className="max-w-4xl mx-auto p-4 leading-relaxed" dir="rtl">
      {/* ===== TITLE ===== */}
      <h1 className="text-3xl font-bold mb-6">
        كيف يعمل Smart Search للوصول للخدمة الصحيحة؟
      </h1>

      {/* ===== INTRO ===== */}
      <p className="text-gray-700 mb-6">
        في البحث التقليدي، أنت تبحث داخل ملايين الصفحات،
        أما في <strong>Smart Search</strong> فأنت تبحث داخل
        <strong> بيانات مُنظمة ومُفلترة </strong>
        تم إعدادها مسبقًا للوصول إلى الخدمة الصحيحة مباشرة.
      </p>

      {/* ===== SECTION 1 ===== */}
      <h2 className="text-2xl font-bold mb-3">
        1️⃣ فهم نية المستخدم وليس الكلمة فقط
      </h2>
      <p className="mb-6">
        Smart Search لا يعتمد على التطابق الحرفي للكلمات،
        بل يحلل <strong>نية البحث</strong>.
        <br />
        على سبيل المثال:
      </p>
      <ul className="list-disc pr-6 mb-6 text-gray-700">
        <li>بحثك عن: <strong>خط ساخن كهرباء</strong></li>
        <li>أو: <strong>رقم طوارئ الكهرباء</strong></li>
      </ul>
      <p className="mb-6">
        كلاهما يقودك لنفس النتيجة الصحيحة بدون تشتيت.
      </p>

      {/* ===== SECTION 2 ===== */}
      <h2 className="text-2xl font-bold mb-3">
        2️⃣ قاعدة بيانات مخصصة وليست الإنترنت بالكامل
      </h2>
      <p className="mb-6">
        بدل البحث في مواقع غير موثوقة أو قديمة،
        يعتمد Smart Search على:
      </p>
      <ul className="list-disc pr-6 mb-6 text-gray-700">
        <li>أرقام وخدمات مؤكدة</li>
        <li>تصنيفات واضحة</li>
        <li>تحديث دوري للبيانات</li>
      </ul>

      {/* ===== SECTION 3 ===== */}
      <h2 className="text-2xl font-bold mb-3">
        3️⃣ نتائج فورية بدون إعلانات أو روابط مضللة
      </h2>
      <p className="mb-6">
        لا توجد إعلانات في منتصف النتائج،
        ولا مواقع وسيطة.
        <br />
        النتيجة = <strong>الخدمة نفسها</strong>.
      </p>

      {/* ===== SECTION 4 ===== */}
      <h2 className="text-2xl font-bold mb-3">
        4️⃣ تجربة مصممة للهاتف وسرعة القرار
      </h2>
      <p className="mb-6">
        Smart Search مصمم ليعمل بسرعة على الموبايل:
      </p>
      <ul className="list-disc pr-6 mb-6 text-gray-700">
        <li>زر اتصال مباشر</li>
        <li>فتح الموقع الرسمي بضغطة واحدة</li>
        <li>لا حاجة للحفظ أو النسخ</li>
      </ul>

      {/* ===== CONCLUSION ===== */}
      <h2 className="text-2xl font-bold mb-3">
        الخلاصة
      </h2>
      <p className="mb-8">
        Smart Search لا يجعلك تبحث أكثر،
        بل يجعلك <strong>تصل أسرع</strong>.
        <br />
        الفرق الحقيقي ليس في السرعة فقط،
        بل في <strong>دقة النتيجة</strong>.
      </p>

      {/* ===== CTA ===== */}
      <div className="bg-green-50 p-6 rounded-xl text-center">
        <h3 className="text-xl font-bold mb-2">
          🚀 جرّب البحث الذكي الآن
        </h3>
        <p className="text-gray-600 mb-4">
          لا تضيع وقتك في البحث التقليدي
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/smart-search"
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
             استخدم البحث الذكى  ()Smart Search)
          </Link>
          <Link
            href="/delivery/hotline"
            className="border border-green-600 text-green-600 px-6 py-2 rounded-lg font-semibold"
          >
            بحث الخط الساخن
          </Link>
        </div>
      </div>
    </main>
  );
}
