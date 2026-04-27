import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "طريقة استخدام الموقع | ExtraCode",
  description:
    "تعرف على كيفية استخدام موقع ExtraCode للحصول على أفضل العروض والكوبونات من أمازون ونون بسهولة وأمان.",
  robots: "index, follow",
};

export default function HowToUsePage() {
  return (
    <section
      className="max-w-6xl mx-auto px-6 py-16 md:py-24 text-right"
      dir="rtl"
    >
      {/* العنوان */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 italic">
          كيف تستخدم ExtraCode للحصول على أفضل العروض؟
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          نوفر لك أقوى الخصومات والكوبونات من
          <span className="font-bold text-orange-500 mx-1">Amazon</span>
          و
          <span className="font-bold text-yellow-500 mx-1">Noon</span>
          في مكان واحد لتوفير وقتك ومالك.
        </p>
      </div>

      {/* الخطوات */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border hover:border-green-500 transition group">
          <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center text-green-600 text-2xl font-bold mb-6 group-hover:bg-green-600 group-hover:text-white transition">
            1
          </div>
          <h3 className="font-bold text-xl mb-3">ابحث واكتشف</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            تصفح المنتجات أو استخدم البحث للوصول إلى أفضل العروض المتاحة.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border hover:border-green-500 transition group">
          <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center text-green-600 text-2xl font-bold mb-6 group-hover:bg-green-600 group-hover:text-white transition">
            2
          </div>
          <h3 className="font-bold text-xl mb-3">انسخ كود الخصم</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            انسخ كود الخصم (إن وجد) للحصول على سعر أقل قبل الذهاب للمتجر.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border hover:border-green-500 transition group">
          <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center text-green-600 text-2xl font-bold mb-6 group-hover:bg-green-600 group-hover:text-white transition">
            3
          </div>
          <h3 className="font-bold text-xl mb-3">الانتقال للمتجر</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            اضغط على زر "تسوق الآن" ليتم تحويلك إلى صفحة المنتج الرسمية.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border hover:border-green-500 transition group">
          <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center text-green-600 text-2xl font-bold mb-6 group-hover:bg-green-600 group-hover:text-white transition">
            4
          </div>
          <h3 className="font-bold text-xl mb-3">وفر واستمتع</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            أكمل الشراء من المتجر واستفد من الخصومات المقدمة.
          </p>
        </div>
      </div>

      {/* تنويه الثقة */}
      <div className="mt-16 bg-gray-50 p-8 rounded-2xl border text-center">
        <h3 className="text-xl font-bold mb-4">هل موقع ExtraCode آمن؟</h3>
        <p className="text-gray-600 max-w-3xl mx-auto italic">
          نعم، نحن لا نقوم ببيع المنتجات أو طلب بيانات الدفع. يتم الشراء بالكامل
          عبر مواقع المتاجر الرسمية مثل أمازون ونون.
        </p>
      </div>

      {/* ✅ تنويه الأفلييت (مهم لجوجل) */}
      <div className="mt-8 text-center text-xs text-gray-400 max-w-2xl mx-auto">
        روابط الموقع هي روابط تسويق بالعمولة (Affiliate)، وقد نحصل على عمولة
        عند الشراء دون أي تكلفة إضافية عليك.
      </div>

      {/* ✅ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "طريقة استخدام ExtraCode",
            step: [
              { "@type": "HowToStep", name: "ابحث عن المنتج" },
              { "@type": "HowToStep", name: "انسخ كود الخصم" },
              { "@type": "HowToStep", name: "انتقل للمتجر" },
              { "@type": "HowToStep", name: "أكمل الشراء" },
            ],
          }),
        }}
      />
    </section>
  );
}