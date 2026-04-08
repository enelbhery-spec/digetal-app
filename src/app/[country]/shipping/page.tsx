export const metadata = {
  title: "سياسة الشحن والتوصيل - ExtraCode",
  description: "معلومات حول شحن وتوصيل المنتجات من خلال شركائنا أمازون ونون",
};

export default function Shipping() {
  return (
    <div className="container mx-auto px-6 py-12 text-right min-h-screen" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 border-r-4 border-green-600 pr-4">
          سياسة الشحن والتوصيل
        </h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">1. معلومات عامة</h2>
          <p className="leading-relaxed text-gray-600">
            بما أن موقعنا **ExtraCode** متخصص في استعراض الكوبونات والعروض، فإن جميع عمليات الشحن والتوصيل تتم مباشرة بواسطة المتاجر التي تشتري منها (أمازون أو نون).
          </p>
        </section>

        <section className="mb-8 border-t pt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">2. مدة التوصيل</h2>
          <p className="leading-relaxed text-gray-600">
            تعتمد مدة التوصيل على المتجر البائع ونوع الخدمة المختارة (مثل أمازون برايم أو نون اكسبريس). غالباً ما يستغرق التوصيل بين 24 ساعة إلى 5 أيام عمل داخل مصر والسعودية والإمارات.
          </p>
        </section>

        <section className="mb-8 border-t pt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">3. رسوم الشحن</h2>
          <p className="leading-relaxed text-gray-600 italic text-blue-700">
            نصيحة: يمكنك الحصول على شحن مجاني في كثير من الأحيان عند تجاوز قيمة معينة للطلب أو استخدام عروض "الشحن المجاني" التي نوفر أكوادها في صفحتنا الرئيسية.
          </p>
        </section>

        <div className="mt-10 p-4 bg-gray-50 rounded-lg text-sm text-gray-500">
          لأي استفسار بخصوص شحنة قائمة، يرجى التواصل مع خدمة عملاء المتجر الذي تم الشراء منه مباشرة باستخدام رقم الطلب الخاص بك.
        </div>
      </div>
    </div>
  );
}