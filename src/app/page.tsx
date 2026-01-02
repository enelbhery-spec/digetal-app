export default function Home() {
  return (
    <main className="bg-gray-50 text-gray-800">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-gradient-to-bl from-green-600 via-green-500 to-emerald-500 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              البحث الذكى الرقمى
              <br />
              <span className="text-yellow-300">
                استخدم البحث فورًا
              </span>
            </h1>

            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              نوفر لك خدمات ومنتجات رقمية مجانية وسريعة.
            </p>

            <div className="flex gap-4 flex-wrap">
              <a
                href="/products"
                className="bg-white text-green-600 px-7 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
              >
                تصفح المنتجات
              </a>


            </div>

            {/* Trust Badges */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              {[
                "تسليم فوري",
                "بدون تسجيل",
                "دعم واتساب",
                "منتجات موثوقة",
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur rounded-lg py-2 text-center font-semibold"
                >
                  {item}

                </div>
              ))}
            </div>
          </div>

          {/* Card */}
          <div>
            <div className="bg-white rounded-3xl shadow-2xl p-8 text-gray-800">
              <h3 className="text-xl font-bold mb-4">
                كيف يعمل المتجر؟
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>✔ اختر المنتج المناسب</li>
                <li>✔ اضغط على افتح المنتج </li>
                <li>✔ بدون الدفع - مجانا</li>
                <li>✔ ااستعمل البحث  فورًا</li>
              </ul>


            </div>
          </div>

        </div>
      </section>

      {/* ================= WHAT WE OFFER ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            ماذا نقدم؟
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "منتجات رقمية جاهزة",
                desc: "ملفات وأدوات قابلة للاستخدام الفوري",
              },
              {
                title: "استخدام فوري",
                desc: "يتم فتح البحث مباشرة",
              },
              {
                title: "دعم واتساب",
                desc: "تواصل مباشر وسريع عند الحاجة",
              },
              {
                title: "المنتجات مجانا",
                desc: "منتجات عالية القيمة مجانا",
              },
              {
                title: "سهولة الاستخدام",
                desc: "بدون تسجيل أو خطوات معقدة",
              },
              {
                title: "خصوصية وأمان",
                desc: "لا نحتفظ بأي بيانات شخصية",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold mb-3 text-green-600">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            كيف تحصل على منتج مدفوع؟
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
            {[
              "اختر المنتج",
              "اضغط اطلب",
              "أرسل رسالة واتساب",
              "أتمم الدفع",
              "استلم الرابط فورًا",
            ].map((step, i) => (
              <div
                key={i}
                className="border rounded-xl p-6 hover:border-green-500 transition"
              >
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {i + 1}
                </div>
                <p className="font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-green-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">
          جاهز تبدأ؟
        </h2>
        <p className="mb-8 text-lg">
          اختر منتجك الآن واستلمه فورًا
        </p>
        <a
            href="/products/"
          target="_blank"
          className="bg-white text-green-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
        >
          ابدا بتصفح المنتجات
        </a>
      </section>

      {/* ================= WHATSAPP FLOAT ================= */}
      <a
        href="https://wa.me/201234567890?text"
        target="_blank"
        className="fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition"
      >
        واتساب
      </a>

    </main>
  );
}
