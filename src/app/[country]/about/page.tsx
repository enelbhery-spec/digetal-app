import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن | ExtraCode",
  description:
    "تعرف على فريق ExtraCode وكيف نساعدك في العثور على أفضل العروض والكوبونات من أمازون ونون بكل شفافية.",
  robots: "index, follow",
};

export default function AboutPage() {
  return (
    <section
      className="max-w-6xl mx-auto px-6 py-16 md:py-24 text-right"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto bg-white shadow-sm border rounded-2xl p-8 md:p-12">
        
        {/* العنوان */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 border-r-4 border-green-600 pr-4">
          من نحن
        </h1>

        {/* تعريف */}
        <p className="text-gray-700 leading-relaxed mb-6">
          مرحبًا بك في <strong>ExtraCode</strong> 👋
          نحن منصة رقمية متخصصة في عرض أفضل العروض والكوبونات من أشهر المتاجر
          الإلكترونية مثل أمازون ونون، بهدف مساعدتك على التسوق بذكاء وتوفير المال.
        </p>

        {/* الهدف */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            🎯 هدفنا
          </h2>
          <p className="text-gray-600 leading-relaxed">
            نسعى إلى تجميع أقوى العروض والخصومات في مكان واحد، بحيث نوفر عليك
            عناء البحث ونساعدك في الوصول إلى أفضل سعر بسهولة وسرعة.
          </p>
        </section>

        {/* طريقة العمل */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            ⚙️ كيف نعمل؟
          </h2>
          <p className="text-gray-600 leading-relaxed">
            نقوم بجمع وتحليل العروض من المتاجر الإلكترونية، ثم نعرضها لك بشكل
            منظم مع أكواد الخصم وروابط مباشرة للشراء.
          </p>
        </section>

        {/* Affiliate disclosure */}
        <section className="mb-6 bg-blue-50 border border-blue-100 p-5 rounded-xl">
          <h2 className="text-lg font-bold mb-2 text-blue-800">
            💼 إفصاح التسويق بالعمولة
          </h2>
          <p className="text-gray-700 leading-relaxed">
            يحتوي الموقع على روابط تسويق بالعمولة (Affiliate Links)، مما يعني أننا
            قد نحصل على عمولة عند إتمام عملية شراء من خلال هذه الروابط، دون أي
            تكلفة إضافية عليك.
          </p>
        </section>

        {/* الشفافية */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            🔒 الشفافية والأمان
          </h2>
          <p className="text-gray-600 leading-relaxed">
            نحن لا نقوم ببيع المنتجات مباشرة ولا نطلب أي بيانات دفع. جميع عمليات
            الشراء تتم عبر مواقع المتاجر الرسمية مثل أمازون ونون.
          </p>
        </section>

        {/* التواصل */}
        <section className="mt-10 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            📩 تواصل معنا
          </h2>
          <p className="text-gray-600">
            لأي استفسار أو اقتراح، يمكنك التواصل معنا عبر البريد:
          </p>
          <span className="block mt-2 text-blue-600 font-mono">
            support@extracode.online
          </span>
        </section>

        <p className="text-sm text-gray-400 mt-8 text-center italic">
          ExtraCode - تسوق بذكاء
        </p>
      </div>

      {/* ✅ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ExtraCode",
            url: "https://extracode.online",
            description:
              "منصة لعرض العروض والكوبونات من المتاجر الإلكترونية مثل أمازون ونون",
          }),
        }}
      />
    </section>
  );
}