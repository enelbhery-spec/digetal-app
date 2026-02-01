import Link from "next/link";

export const metadata = {
  title: "الخط الساخن | أرقام الطوارئ وخدمة العملاء في مكان واحد",
  description:
    "الوصول السريع لأرقام الخط الساخن وخدمة العملاء والطوارئ بدون بحث طويل أو أرقام خاطئة. استخدم تطبيق الخط الساخن الآن.",
};

export default function HotlineServicePage() {
  return (
    <main className="container mx-auto px-4 py-12 text-right">

      {/* H1 */}
      <h1 className="text-3xl font-bold mb-6">
        الخط الساخن – الوصول السريع للأرقام المهمة
      </h1>

      {/* Intro */}
      <p className="text-lg text-gray-700 mb-8">
        في مواقف كتير بتحتاج رقم صحيح بسرعة:
        خدمة عملاء، طوارئ، دعم فني أو استفسار عاجل.
        البحث التقليدي غالبًا بيضيّع وقتك أو يوصلك لرقم غلط.
      </p>

      {/* Problem */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          مشكلة البحث عن الخط الساخن
        </h2>
        <ul className="list-disc pr-6 text-gray-700 space-y-2">
          <li>نتائج متفرقة وغير محدثة</li>
          <li>أرقام قديمة أو غير فعالة</li>
          <li>مواقع مليئة بإعلانات وروابط مضللة</li>
          <li>إضاعة وقت في لحظات مهمة</li>
        </ul>
      </section>

      {/* Solution */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          الحل: تطبيق الخط الساخن
        </h2>
        <p className="text-gray-700">
          تطبيق الخط الساخن بيجمع لك أرقام الطوارئ وخدمة العملاء
          في مكان واحد، بنتائج مباشرة وسهلة الاستخدام،
          بدون تسجيل وبدون انتظار.
        </p>
      </section>

      {/* Covered */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          يشمل التطبيق
        </h2>
        <ul className="list-disc pr-6 text-gray-700 space-y-2">
          <li>أرقام الطوارئ</li>
          <li>خدمة عملاء البنوك</li>
          <li>شركات الاتصالات</li>
          <li>الدعم الفني والخدمات العامة</li>
        </ul>
      </section>

      {/* Why Better */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          لماذا هذه الصفحة؟
        </h2>
        <p className="text-gray-700">
          بدل ما تدور في عشرات المواقع،
          الصفحة دي بتوصلك مباشرة للحل الفعلي:
          تطبيق واحد يجمع كل الخطوط الساخنة الموثوقة.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center mt-12">
        <Link
          href="/delivery/hotline"
          className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
        >
          استخدم تطبيق الخط الساخن الآن
        </Link>
      </section>

      {/* FAQ */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">
          أسئلة شائعة
        </h2>

        <div className="space-y-4 text-gray-700">
          <p><strong>هل الأرقام محدثة؟</strong><br />نعم، يتم تحديثها باستمرار.</p>
          <p><strong>هل الاستخدام مجاني؟</strong><br />نعم، بدون أي رسوم.</p>
          <p><strong>هل أحتاج تسجيل؟</strong><br />لا، الاستخدام مباشر.</p>
        </div>
      </section>

    </main>
  );
}
