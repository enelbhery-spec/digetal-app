export const metadata = {
  title: "طريقة استخدام الموقع | ExtraCode",
  description:
    "تعرف على كيفية استخدام موقع ExtraCode للعثور على أفضل الخصومات والكوبونات والمنتجات بسهولة.",
};

export default function HowToUsePage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">

      <h1 className="text-3xl font-bold mb-8 text-center">
        طريقة استخدام موقع الخصومات والكوبونات
      </h1>

      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        اتبع الخطوات التالية للعثور على أفضل العروض والمنتجات بسهولة
        من المتاجر الإلكترونية مثل Amazon و Noon.
      </p>

      <div className="grid md:grid-cols-3 gap-8">

        {/* Step 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-green-600 text-3xl font-bold mb-4">1</div>

          <h3 className="font-bold text-lg mb-2">
            اختر المنتج
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed">
            تصفح المنتجات والعروض المتاحة واختر المنتج الذي تريد شراءه
            من بين أفضل الخصومات المتوفرة.
          </p>
        </div>


        {/* Step 2 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-green-600 text-3xl font-bold mb-4">2</div>

          <h3 className="font-bold text-lg mb-2">
            افتح صفحة المنتج
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed">
            اضغط على المنتج لعرض التفاصيل والمقارنة بين الأسعار
            والعروض المتاحة.
          </p>
        </div>


        {/* Step 3 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-green-600 text-3xl font-bold mb-4">3</div>

          <h3 className="font-bold text-lg mb-2">
            الانتقال للمتجر
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed">
            انتقل مباشرة إلى المتجر الإلكتروني لإتمام عملية الشراء
            والاستفادة من الخصومات المتاحة.
          </p>
        </div>

      </div>

    </section>
  );
}