export const metadata = {
  title: "سياسة الشحن والتوصيل | ExtraCode",
  description:
    "تعرف على تفاصيل الشحن والتوصيل للمنتجات التي يتم شراؤها عبر روابط ExtraCode من المتاجر الخارجية.",
  keywords: [
    "الشحن",
    "التوصيل",
    "ExtraCode",
    "أمازون",
    "نون",
    "التسويق بالعمولة",
  ],
  alternates: {
    canonical: "https://extracode.online/shipping",
  },
};

export default function Shipping() {
  return (
    <main
      className="max-w-4xl mx-auto px-6 py-12 text-right min-h-screen"
      dir="rtl"
    >
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

        <h1 className="text-3xl font-black mb-8 text-gray-900 border-r-4 border-green-600 pr-4">
          سياسة الشحن والتوصيل
        </h1>

        {/* مقدمة */}
        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            يوضح هذا القسم كيفية الشحن والتوصيل للمنتجات التي يتم الوصول إليها
            من خلال موقع <strong>ExtraCode</strong>.
          </p>
        </section>

        {/* إخلاء مسؤولية */}
        <section className="mb-8 bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4 text-yellow-800">
            1. إخلاء مسؤولية
          </h2>
          <p className="text-gray-700 leading-relaxed">
            موقع ExtraCode هو منصة تسويق بالعمولة (Affiliate) ولا يقوم ببيع المنتجات
            أو شحنها بشكل مباشر. جميع عمليات الشحن والتوصيل تتم بواسطة المتاجر
            الخارجية مثل أمازون ونون، وفقًا لسياسات كل متجر.
          </p>
        </section>

        {/* مدة التوصيل */}
        <section className="mb-8 border-t pt-6">
          <h2 className="text-xl font-bold mb-4 text-blue-700">
            2. مدة التوصيل
          </h2>
          <p className="text-gray-600 leading-relaxed">
            تختلف مدة التوصيل حسب المتجر، المدينة، ونوع الشحن المختار. عادةً ما تتراوح
            مدة الشحن بين:
          </p>

          <ul className="list-disc pr-6 text-gray-600 mt-3 space-y-2">
            <li>24 - 48 ساعة للشحن السريع</li>
            <li>2 - 5 أيام عمل للشحن العادي</li>
          </ul>
        </section>

        {/* رسوم الشحن */}
        <section className="mb-8 border-t pt-6">
          <h2 className="text-xl font-bold mb-4 text-blue-700">
            3. رسوم الشحن
          </h2>
          <p className="text-gray-600 leading-relaxed">
            تختلف رسوم الشحن حسب سياسة المتجر وقيمة الطلب. بعض المتاجر تقدم شحنًا مجانيًا
            عند الوصول إلى حد معين من قيمة الطلب.
          </p>

          <p className="mt-3 text-green-600 font-medium">
            💡 نصيحة: تابع العروض وكوبونات الشحن المجاني التي نعرضها لتقليل التكلفة.
          </p>
        </section>

        {/* تتبع الشحنة */}
        <section className="mb-8 border-t pt-6">
          <h2 className="text-xl font-bold mb-4 text-blue-700">
            4. تتبع الشحنات
          </h2>
          <p className="text-gray-600 leading-relaxed">
            بعد إتمام الشراء، يمكنك تتبع الشحنة من خلال حسابك في المتجر الذي اشتريت منه،
            باستخدام رقم الطلب.
          </p>
        </section>

        {/* ملاحظات */}
        <section className="mb-8 border-t pt-6">
          <h2 className="text-xl font-bold mb-4 text-blue-700">
            5. ملاحظات هامة
          </h2>
          <ul className="list-disc pr-6 text-gray-600 space-y-2">
            <li>مواعيد التوصيل قد تختلف حسب العطلات الرسمية.</li>
            <li>قد تتأخر الشحنات في أوقات الضغط (العروض الكبرى).</li>
            <li>الشحن الدولي قد يستغرق وقتًا أطول.</li>
          </ul>
        </section>

        {/* تواصل */}
        <section className="mt-10 pt-6 border-t">
          <h2 className="text-xl font-bold mb-4">
            التواصل معنا
          </h2>
          <p className="text-gray-600">
            في حال وجود استفسار يمكنك التواصل معنا عبر:
          </p>

          <a
            href="mailto:support@extracode.online"
            className="block mt-2 text-green-600 font-bold"
          >
            support@extracode.online
          </a>
        </section>

        <p className="text-sm text-gray-400 mt-10 text-center">
          آخر تحديث: أبريل 2026
        </p>
      </div>

      {/* ✅ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "سياسة الشحن والتوصيل",
            url: "https://extracode.online/shipping",
            description:
              "سياسة الشحن والتوصيل لموقع ExtraCode وروابط التسويق بالعمولة",
          }),
        }}
      />
    </main>
  );
}