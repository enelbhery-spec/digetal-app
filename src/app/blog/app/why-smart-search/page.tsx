import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "لماذا Smart Search هو الحل الذكي للبحث عن الخدمات؟",
  description:
    "تعرف على أسباب فشل البحث التقليدي عن الخطوط الساخنة والخدمات، ولماذا Smart Search هو الحل الأسرع والأدق للوصول للخدمة الصحيحة.",
};

export default function WhySmartSearchPage() {
  return (
    <main className="max-w-4xl mx-auto p-4 leading-loose" dir="rtl">
      {/* ===== TITLE ===== */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6">
        لماذا Smart Search هو الحل الذكي للبحث عن الخدمات؟
      </h1>

      {/* ===== INTRO ===== */}
      <p className="text-gray-700 mb-6">
        في السنوات الأخيرة أصبح البحث عن <strong>الخطوط الساخنة</strong>،
        <strong>الخدمات</strong>، و<strong>الدعم الفني</strong> مهمة مرهقة.
        رغم استخدام جوجل أو فيسبوك، إلا أن النتائج غالبًا غير دقيقة،
        قديمة، أو مضللة.
      </p>

      <p className="text-gray-700 mb-10">
        هنا ظهر مفهوم <strong>Smart Search</strong> كحل ذكي وحديث
        يختصر الوقت ويمنح المستخدم النتيجة الصحيحة من أول محاولة.
      </p>

      {/* ===== PROBLEM ===== */}
      <h2 className="text-2xl font-bold mb-4">
        ❌ لماذا فشل البحث التقليدي؟
      </h2>

      <ul className="list-disc pr-6 text-gray-700 mb-8">
        <li>نتائج غير محدثة أو أرقام خاطئة</li>
        <li>تكرار نفس الأسئلة في جروبات فيسبوك</li>
        <li>إعلانات مضللة بدل النتائج الحقيقية</li>
        <li>إضاعة وقت كبير للوصول لمعلومة بسيطة</li>
      </ul>

      <p className="mb-10">
        يمكنك قراءة شرح أعمق في هذا المقال:
        <Link
          href="/blog/app/traditional-search-problems"
          className="text-green-600 font-semibold mx-1"
        >
          لماذا يفشل البحث التقليدي؟
        </Link>
      </p>

      {/* ===== SOLUTION ===== */}
      <h2 className="text-2xl font-bold mb-4">
        ✅ ما الذي يقدمه Smart Search؟
      </h2>

      <p className="text-gray-700 mb-6">
        Smart Search ليس مجرد محرك بحث، بل نظام ذكي
        مصمم خصيصًا للوصول إلى الخدمات الحقيقية بسرعة ودقة.
      </p>

      <ul className="list-disc pr-6 text-gray-700 mb-8">
        <li>نتائج موثوقة ومجربة</li>
        <li>تصنيف واضح للخدمات</li>
        <li>وصول مباشر بدون تسجيل</li>
        <li>تجربة استخدام بسيطة وسريعة</li>
      </ul>

      <p className="mb-10">
        لمعرفة آلية العمل بالتفصيل:
        <Link
          href="/blog/app/how-smart-search-works"
          className="text-green-600 font-semibold mx-1"
        >
          كيف يعمل Smart Search؟
        </Link>
      </p>

      {/* ===== USER VALUE ===== */}
      <h2 className="text-2xl font-bold mb-4">
        🎯 الفائدة الحقيقية للمستخدم
      </h2>

      <p className="text-gray-700 mb-8">
        باستخدام Smart Search، لن تحتاج إلى:
        البحث في عشرات المواقع، أو تجربة أرقام خاطئة،
        أو الانتظار في الردود.
        كل ما تحتاجه متاح في مكان واحد.
      </p>

      <p className="mb-10">
        إذا كنت تواجه مشاكل فعلية أثناء البحث،
        يمكنك قراءة:
        <Link
          href="/blog/problems"
          className="text-green-600 font-semibold mx-1"
        >
          مشاكل المستخدم أثناء البحث
        </Link>
      </p>

      {/* ===== CTA ===== */}
      <section className="bg-green-50 p-6 rounded-xl text-center">
        <h2 className="text-xl font-bold mb-2">
          🚀 هل أنت مستعد لتجربة البحث الذكي؟
        </h2>
        <p className="text-gray-600 mb-4">
          اختصر وقتك واعثر على الخدمة الصحيحة من أول مرة
        </p>
        <Link
          href="/"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          ابدأ باستخدام Smart Search
        </Link>
      </section>
    </main>
  );
}
