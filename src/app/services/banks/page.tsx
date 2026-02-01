export const metadata = {
  title: "خدمة عملاء البنوك في مصر | أرقام البنوك بدون انتظار",
  description:
    "ابحث عن أرقام خدمة عملاء البنوك المصرية بسهولة. الخط الساخن للبنوك في مكان واحد بدون انتظار أو تسجيل.",
};

export default function BanksServicePage() {
  return (
    <main className="container mx-auto px-4 py-12 text-right">

      {/* H1 */}
      <h1 className="text-3xl font-bold mb-6">
        خدمة عملاء البنوك في مصر – أرقام محدثة الآن
      </h1>

      {/* Intro */}
      <p className="text-lg mb-8 text-gray-700">
        لو بتدور على رقم خدمة العملاء لأي بنك في مصر وملقتش نتيجة سريعة،
        هنا هتوصل للرقم الصحيح مباشرة بدون بحث طويل أو انتظار.
      </p>

      {/* User Intent */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          ماذا يبحث عنه المستخدم؟
        </h2>
        <ul className="list-disc pr-6 text-gray-700 space-y-2">
          <li>رقم خدمة عملاء البنك</li>
          <li>الخط الساخن بدون انتظار</li>
          <li>أرقام بنوك محدثة</li>
          <li>التواصل السريع مع خدمة العملاء</li>
        </ul>
      </section>

      {/* Solution */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          الحل الأسرع
        </h2>
        <p className="text-gray-700">
          من خلال تطبيق الخط الساخن، تقدر توصل لأرقام خدمة عملاء البنوك
          الحكومية والخاصة في مكان واحد، بنتائج فورية ومحدثة باستمرار.
        </p>
      </section>

      {/* Covered Services */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          البنوك المشمولة
        </h2>
        <p className="text-gray-700">
          تشمل الخدمة البنوك الحكومية، البنوك الخاصة، البنوك الرقمية،
          وبنوك الاستثمار داخل مصر.
        </p>
      </section>

      {/* Comparison */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          لماذا هذه الصفحة أفضل من البحث العشوائي؟
        </h2>
        <ul className="list-disc pr-6 text-gray-700 space-y-2">
          <li>نتائج جوجل متفرقة وغير محدثة</li>
          <li>أرقام خاطئة على مواقع قديمة</li>
          <li>انتظار طويل في بعض المصادر</li>
          <li><strong>هنا تحصل على الرقم مباشرة</strong></li>
        </ul>
      </section>



      {/* FAQ */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">
          أسئلة شائعة
        </h2>

        <div className="space-y-4 text-gray-700">
          <p><strong>هل الأرقام محدثة؟</strong><br />نعم، يتم تحديثها باستمرار.</p>
          <p><strong>هل الخدمة مجانية؟</strong><br />نعم، بدون أي رسوم.</p>
          <p><strong>هل تشمل كل البنوك؟</strong><br />تشمل أغلب البنوك المصرية.</p>
          <p><strong>هل أحتاج تسجيل؟</strong><br />لا، الاستخدام مباشر.</p>
        </div>
      </section>
            {/* CTA */}
      <section className="text-center mt-12">
        <a
          href="/delivery/hotline"
          className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
        >
          استخدم تطبيق الخط الساخن الآن
        </a>
      </section>

    </main>
  );
}
