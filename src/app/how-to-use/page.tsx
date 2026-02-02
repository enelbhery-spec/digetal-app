export const metadata = {
  title: "طريقة الاستخدام",
};

export default function HowToUsePage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-8 text-center">
        طريقة استخدام موقع البحث الذكى
      </h1>

      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        اتبع الخطوات التالية للحصول على التطبيق الرقمي الخاص بك بسهولة
        وبشكل فوري بعد إتمام الطلب.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-green-600 text-3xl font-bold mb-4">1</div>
          <h3 className="font-bold text-lg mb-2">اختيار التطبيق</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            تصفّح التطبيقات الرقمية المتاحة واختر التطبيق المناسب لاحتياجك.
          </p>
        </div>



        {/* Step 2 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-green-600 text-3xl font-bold mb-4">2</div>
          <h3 className="font-bold text-lg mb-2">فتح الرابط</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            افتح الرابط مباشرة واستمتع باستخدام التطبيق بدون أي تعقيد.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-green-600 text-3xl font-bold mb-4">3</div>
          <h3 className="font-bold text-lg mb-2">الدعم الفني</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            في حالة وجود أي مشكلة يمكنك التواصل معنا عبر واتساب في أي وقت.
          </p>
        </div>
      </div>
    </section>
  );
}
