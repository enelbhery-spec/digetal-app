import Link from "next/link";

export const metadata = {
  title: "خدمة عملاء شركات الاتصالات | أرقام الدعم الفني والخط الساخن",
  description:
    "أرقام خدمة عملاء شركات الاتصالات في مصر (محمول – إنترنت – أرضي). الوصول السريع للدعم الفني بدون بحث طويل أو أرقام خاطئة.",
};

export default function TelecomServicePage() {
  return (
    <main className="container mx-auto px-4 py-12 text-right">

      {/* H1 */}
      <h1 className="text-3xl font-bold mb-6">
        خدمة عملاء شركات الاتصالات في مصر
      </h1>

      {/* Intro */}
      <p className="text-lg text-gray-700 mb-8">
        مشاكل الشبكة، الإنترنت، الباقات أو الفواتير بتحتاج
        رقم خدمة عملاء صحيح وسريع.
        البحث العشوائي غالبًا بيضيّع وقتك أو يوصلك لمعلومة غير دقيقة.
      </p>

      {/* User Problems */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          مشاكل البحث عن أرقام الاتصالات
        </h2>
        <ul className="list-disc pr-6 text-gray-700 space-y-2">
          <li>أرقام قديمة أو غير مفعلة</li>
          <li>نتائج بحث غير واضحة</li>
          <li>مواقع مليئة بإعلانات</li>
          <li>صعوبة الوصول للدعم الفني بسرعة</li>
        </ul>
      </section>

      {/* Solution */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          الحل الذكي
        </h2>
        <p className="text-gray-700">
          من خلال تطبيق الخط الساخن، تقدر توصل
          لأرقام خدمة عملاء شركات الاتصالات المختلفة
          في مكان واحد، بنتائج مباشرة وسهلة.
        </p>
      </section>

      {/* Coverage */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          تشمل الخدمة
        </h2>
        <ul className="list-disc pr-6 text-gray-700 space-y-2">
          <li>شركات المحمول</li>
          <li>خدمات الإنترنت المنزلي</li>
          <li>الدعم الفني</li>
          <li>الخطوط الأرضية</li>
        </ul>
      </section>

      {/* Why Page */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          لماذا هذه الصفحة؟
        </h2>
        <p className="text-gray-700">
          الصفحة دي بتخدم نية المستخدم مباشرة:
          الوصول السريع لرقم خدمة العملاء الصحيح
          بدون تعقيد أو تضليل.
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
          <p><strong>هل تشمل كل شركات الاتصالات؟</strong><br />تشمل أغلب الشركات داخل مصر.</p>
          <p><strong>هل الأرقام محدثة؟</strong><br />يتم تحديثها بشكل دوري.</p>
          <p><strong>هل أحتاج تسجيل؟</strong><br />لا، الاستخدام مباشر.</p>
        </div>
      </section>

    </main>
  );
}
