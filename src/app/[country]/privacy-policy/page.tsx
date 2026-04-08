export const metadata = {
  title: "سياسة الخصوصية - ExtraCode",
  description: "سياسة الخصوصية وحماية البيانات لموقع ExtraCode للتسويق بالعمولة",
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 text-right" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white shadow-sm border p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-8 border-b pb-4 text-gray-800">
          سياسة الخصوصية
        </h1>

        <section className="mb-8">
          <p className="text-lg leading-relaxed text-gray-700">
            نحن في <strong>ExtraCode</strong> نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيفية تعاملنا مع المعلومات عند زيارتك لموقعنا.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">1. المعلومات التي نجمعها</h2>
          <p className="leading-relaxed text-gray-600">
            نحن لا نطلب منك تسجيل حساب أو تقديم بيانات شخصية حساسة. المعلومات التي قد نجمعها تلقائياً تشمل عنوان IP، نوع المتصفح، ونظام التشغيل، وذلك لأغراض تقنية بحتة تتعلق بتحسين أداء الموقع وتجربة المستخدم.
          </p>
        </section>

        <section className="mb-8 border-r-4 border-blue-500 pr-4 bg-blue-50 py-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">2. روابط الأفلييت (Affiliate Links)</h2>
          <p className="leading-relaxed text-gray-600">
            يحتوي موقعنا على روابط لمتاجر خارجية مثل <strong>Amazon (أمازون)</strong> و <strong>Noon (نون)</strong>. عند نقرك على هذه الروابط وإتمام عملية شراء، قد نحصل على عمولة تسويقية بسيطة. هذا لا يؤثر إطلاقاً على السعر الذي تدفعه، بل يساعدنا في الاستمرار في تقديم العروض.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">3. ملفات تعريف الارتباط (Cookies)</h2>
          <p className="leading-relaxed text-gray-600">
            نستخدم ملفات Cookies لضمان عمل روابط الأفلييت بشكل صحيح ولتحليل حركة المرور عبر Google Analytics. يمكنك تعطيل هذه الملفات من إعدادات متصفحك في أي وقت.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">4. أمن البيانات</h2>
          <p className="leading-relaxed text-gray-600">
            نحن نطبق إجراءات أمنية تقنية لحماية موقعنا من الوصول غير المصرح به، ونستخدم بروتوكول HTTPS المشفر لضمان تصفح آمن.
          </p>
        </section>

        <section className="mt-12 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-4">التواصل معنا</h2>
          <p className="text-gray-600">
            إذا كان لديك أي استفسار بخصوص سياسة الخصوصية، يمكنك التواصل معنا عبر:
            <br />
            <span className="font-mono text-blue-600 block mt-2">support@extracode.online</span>
          </p>
        </section>
        
        <p className="text-sm text-gray-400 mt-8 italic text-center">
          آخر تحديث: أبريل 2026
        </p>
      </div>
    </div>
  );
}