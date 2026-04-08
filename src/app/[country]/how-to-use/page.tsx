export const metadata = {
  title: "طريقة استخدام الموقع | ExtraCode",
  description:
    "تعرف على كيفية استخدام موقع ExtraCode للعثور على أفضل الخصومات والكوبونات والمنتجات بسهولة من أمازون ونون.",
};

export default function HowToUsePage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 text-right" dir="rtl">
      
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 italic">
          كيف تستفيد من ExtraCode؟
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          نحن نختصر عليك الوقت والمال بجمع أقوى العروض والكوبونات من 
          <span className="font-bold text-orange-500 mx-1">Amazon</span> 
          و 
          <span className="font-bold text-yellow-500 mx-1">Noon</span> 
          في مكان واحد.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Step 1 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border hover:border-green-500 transition-colors group">
          <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center text-green-600 text-2xl font-bold mb-6 group-hover:bg-green-600 group-hover:text-white transition-all">
            1
          </div>
          <h3 className="font-bold text-xl mb-3">ابحث واكتشف</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            تصفح الأقسام المختلفة أو استخدم محرك البحث للوصول إلى المنتجات التي تبحث عنها بأقل سعر متاح.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border hover:border-green-500 transition-colors group">
          <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center text-green-600 text-2xl font-bold mb-6 group-hover:bg-green-600 group-hover:text-white transition-all">
            2
          </div>
          <h3 className="font-bold text-xl mb-3">انسخ كود الخصم</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            إذا كان المنتج يمتلك كود خصم إضافي (مثل أكواد نون)، اضغط لنسخ الكود قبل الانتقال للمتجر.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border hover:border-green-500 transition-colors group">
          <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center text-green-600 text-2xl font-bold mb-6 group-hover:bg-green-600 group-hover:text-white transition-all">
            3
          </div>
          <h3 className="font-bold text-xl mb-3">انتقل للمتجر</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            اضغط على زر "عرض السعر" ليتم توجيهك بأمان إلى صفحة المنتج الرسمية على (أمازون أو نون).
          </p>
        </div>

        {/* Step 4 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border hover:border-green-500 transition-colors group">
          <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center text-green-600 text-2xl font-bold mb-6 group-hover:bg-green-600 group-hover:text-white transition-all">
            4
          </div>
          <h3 className="font-bold text-xl mb-3">وفر واستمتع</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            أكمل عملية الشراء كالمعتاد، واستمتع بالخصم الذي حصلت عليه من خلال روابطنا الحصرية.
          </p>
        </div>

      </div>

      <div className="mt-16 bg-gray-50 p-8 rounded-2xl border text-center">
        <h3 className="text-xl font-bold mb-4">هل موقع ExtraCode آمن؟</h3>
        <p className="text-gray-600 max-w-3xl mx-auto italic">
          "نعم، نحن لا نطلب منك أي بيانات دفع أو معلومات بنكية. دورنا هو توفير العروض فقط، بينما تتم عمليات الدفع والشحن بأمان كامل داخل مواقع المتاجر الرسمية."
        </p>
      </div>

    </section>
  );
}