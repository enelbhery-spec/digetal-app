export const metadata = {
  title: "سياسة الخصوصية | ExtraCode",
  description:
    "تعرف على كيفية حماية بياناتك واستخدامها في موقع ExtraCode للتسويق بالعمولة وروابط الشراء.",
  keywords: ["سياسة الخصوصية", "ExtraCode", "التسويق بالعمولة", "affiliate", "cookies"],
  alternates: {
    canonical: "https://extracode.online/privacy-policy",
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-right" dir="rtl">
      <div className="bg-white shadow-sm border p-8 rounded-2xl">

        <h1 className="text-3xl font-black mb-8 border-b pb-4 text-gray-800">
          سياسة الخصوصية
        </h1>

        {/* مقدمة */}
        <section className="mb-8">
          <p className="text-lg leading-relaxed text-gray-700">
            نحن في <strong>ExtraCode</strong> نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.
            توضح هذه السياسة كيفية جمع واستخدام المعلومات عند زيارتك لموقعنا.
          </p>
        </section>

        {/* البيانات */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-blue-700">
            1. المعلومات التي نجمعها
          </h2>
          <p className="leading-relaxed text-gray-600">
            لا نطلب منك تسجيل حساب أو إدخال بيانات شخصية حساسة. قد يتم جمع بعض المعلومات
            تلقائيًا مثل عنوان IP، نوع المتصفح، ونظام التشغيل، وذلك لأغراض تحليل الأداء
            وتحسين تجربة المستخدم.
          </p>
        </section>

        {/* Affiliate */}
        <section className="mb-8 border-r-4 border-green-500 pr-4 bg-green-50 py-4 rounded">
          <h2 className="text-xl font-bold mb-4 text-green-700">
            2. روابط التسويق بالعمولة (Affiliate Links)
          </h2>
          <p className="leading-relaxed text-gray-700">
            يحتوي موقع ExtraCode على روابط لمنتجات في متاجر خارجية مثل أمازون، نون، شي إن وغيرها.
            عند النقر على هذه الروابط وإتمام عملية شراء، قد نحصل على عمولة بسيطة دون أي تكلفة إضافية عليك.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            ⚠️ نحن لا نتحكم في المنتجات أو الأسعار داخل هذه المتاجر.
          </p>
        </section>

        {/* Cookies */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-blue-700">
            3. ملفات تعريف الارتباط (Cookies)
          </h2>
          <p className="leading-relaxed text-gray-600">
            نستخدم ملفات Cookies لتحسين الأداء، تحليل الاستخدام، وتتبع الروابط التابعة (Affiliate Tracking).
            يمكنك تعطيل الكوكيز من إعدادات المتصفح، لكن قد يؤثر ذلك على بعض وظائف الموقع.
          </p>
        </section>

        {/* Analytics */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-blue-700">
            4. أدوات التحليل
          </h2>
          <p className="leading-relaxed text-gray-600">
            قد نستخدم أدوات مثل Google Analytics لفهم سلوك المستخدمين وتحسين تجربة الموقع.
            هذه الأدوات تجمع بيانات مجهولة الهوية ولا تُستخدم لتحديد هويتك الشخصية.
          </p>
        </section>

        {/* الأمان */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-blue-700">
            5. حماية البيانات
          </h2>
          <p className="leading-relaxed text-gray-600">
            نستخدم بروتوكول HTTPS وتقنيات حماية حديثة لضمان أمان البيانات أثناء التصفح.
          </p>
        </section>

        {/* التواصل */}
        <section className="mt-10 pt-6 border-t">
          <h2 className="text-xl font-bold mb-4">
            التواصل معنا
          </h2>
          <p className="text-gray-600">
            لأي استفسار بخصوص سياسة الخصوصية:
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

      {/* ✅ Structured Data (مهم جدا لجوجل) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "سياسة الخصوصية",
            url: "https://extracode.online/privacy-policy",
            description:
              "سياسة الخصوصية لموقع ExtraCode للتسويق بالعمولة",
          }),
        }}
      />
    </main>
  );
}