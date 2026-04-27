import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الشروط والأحكام - ExtraCode",
  description:
    "الشروط والأحكام والسياسات القانونية لموقع ExtraCode للتسويق بالعمولة وعرض العروض والكوبونات",
  robots: "index, follow",
};

export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-12 text-right" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white shadow-sm border p-8 rounded-2xl">
        
        <h1 className="text-3xl font-bold mb-8 border-r-4 border-green-600 pr-4 text-gray-900">
          الشروط والأحكام
        </h1>

        <section className="mb-6">
          <p className="text-gray-700 leading-relaxed">
            مرحباً بك في <strong>ExtraCode</strong>. باستخدامك لهذا الموقع،
            فإنك توافق على الالتزام بالشروط والأحكام التالية. إذا كنت لا توافق
            على أي جزء منها، يرجى التوقف عن استخدام الموقع.
          </p>
        </section>

        {/* Affiliate */}
        <section className="mb-6 bg-blue-50 border border-blue-100 p-5 rounded-xl">
          <h2 className="text-xl font-semibold mb-3 text-blue-800">
            1. طبيعة الخدمة (التسويق بالعمولة)
          </h2>
          <p className="text-gray-700 leading-relaxed">
            موقع <strong>ExtraCode</strong> هو منصة لعرض العروض والكوبونات
            والمنتجات من متاجر خارجية مثل أمازون ونون. نحن نشارك في برامج
            التسويق بالعمولة، مما يعني أننا قد نحصل على عمولة عند إتمام الشراء
            من خلال الروابط الخاصة بنا، <strong>دون أي تكلفة إضافية عليك</strong>.
          </p>
        </section>

        {/* Prices */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            2. دقة المعلومات والأسعار
          </h2>
          <p className="text-gray-600 leading-relaxed">
            نسعى لتقديم معلومات دقيقة ومحدثة، ولكن قد تختلف الأسعار أو العروض
            حسب المتجر الخارجي. السعر النهائي والتوافر يخضع لسياسات المتجر البائع،
            ولا نتحمل مسؤولية أي تغييرات.
          </p>
        </section>

        {/* Purchase */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            3. عمليات الشراء والشحن
          </h2>
          <p className="text-gray-600 leading-relaxed">
            لا يقوم موقع ExtraCode ببيع المنتجات مباشرة. جميع عمليات الدفع،
            الشحن، والاسترجاع تتم عبر المتاجر الخارجية (مثل أمازون أو نون).
            يرجى التواصل مع المتجر مباشرة لأي استفسار.
          </p>
        </section>

        {/* Liability */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            4. حدود المسؤولية
          </h2>
          <p className="text-gray-600 leading-relaxed">
            لا يتحمل الموقع أي مسؤولية عن جودة المنتجات أو تأخير الشحن أو
            أي مشاكل تحدث بعد إتمام عملية الشراء، حيث أن العملية تتم بالكامل
            عبر طرف ثالث.
          </p>
        </section>

        {/* IP */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            5. الملكية الفكرية
          </h2>
          <p className="text-gray-600 leading-relaxed">
            جميع العلامات التجارية والشعارات المعروضة هي ملك لأصحابها الأصليين،
            وتستخدم لأغراض التوضيح فقط.
          </p>
        </section>

        {/* Contact */}
        <section className="mt-10 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            6. التواصل معنا
          </h2>
          <p className="text-gray-600">
            لأي استفسارات، يمكنك التواصل معنا عبر:
          </p>
          <span className="block mt-2 text-blue-600 font-mono">
            support@extracode.online
          </span>
        </section>

        <p className="text-sm text-gray-400 mt-8 text-center italic">
          آخر تحديث: أبريل 2026
        </p>
      </div>

      {/* ✅ Structured Data (مهم لجوجل) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "الشروط والأحكام - ExtraCode",
            description:
              "الشروط والأحكام الخاصة بموقع ExtraCode للتسويق بالعمولة",
          }),
        }}
      />
    </div>
  );
}