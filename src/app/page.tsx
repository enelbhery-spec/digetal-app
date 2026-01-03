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
                تصفح  التطبيقات
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
                <li>✔ اختر  التطبيق  المناسب</li>
                <li>✔ اضغط على افتح  التطبيق  </li>
                <li>✔ بدون الدفع - مجانا</li>
                <li>✔ ااستعمل البحث  فورًا</li>
              </ul>


            </div>
          </div>

        </div>
      </section>
      {/* ================= SMART SEARCH SEO SECTION ================= */}
<section className="py-16 bg-white">
  <div className="max-w-5xl mx-auto px-4 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
      Smart Search – محرك البحث الذكي
    </h2>

    <p className="text-gray-600 leading-relaxed mb-8">
      Smart Search هو محرك بحث ذكي يساعدك على الوصول السريع
      إلى الخدمات و التطبيقات الرقمية داخل موقع واحد
      بنتائج دقيقة وسهلة الاستخدام.
    </p>

    <a
      href="/smart-search"
      className="inline-block bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition"
    >
      استخدم Smart Search الآن
    </a>
  </div>
</section>



      {/* ======== عرض 3 منتجات فقط ======== */}
<section className="mt-10">
  <div className="grid gap-6 md:grid-cols-3">

    {/*  التطبيق  1 */}
    <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition">
      <div className="h-40 flex items-center justify-center mb-4">
        <img
          src="/products/hotline-guide.png"
          alt="نسطبيق بحث الخط الساخن "
          className="max-h-full"
        />
      </div>
      <h3 className="font-bold text-lg mb-2">بحث الخط الساخن – اتصال مباشر</h3>
      <p className="text-sm text-gray-600 mb-4">
       الوصول السريع لأرقام البنوك والجهات الرسمية والخدمات الحكومية وشركات الاتصالات وغيرها لتوفير وقتك
      </p>
      <a href="/delivery/hotline" className="text-green-600 font-semibold">
        عرض التطبيق →
      </a>
    </div>

    {/*  التطبيق  2 */}
    <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition">
      <div className="h-40 flex items-center justify-center mb-4">
        <img
          src="/products/egyptstores.png"
          alt="تطليق بحث متاجر اكتروني "
          className="max-h-full"
        />
      </div>
      <h3 className="font-bold text-lg mb-2">العروض الحصرية للمتاجر الاكترونية</h3>
      <p className="text-sm text-gray-600 mb-4">
       احصل على العروض حصريا للمتاجر الاكترونية حتى تتمكن من متابعة احتياجات بضطة  واجة من هاتفك توفر عليك البحث على المتصفحات
      </p>
      <a href="/delivery/egyptStores" className="text-green-600 font-semibold">
        عرض التطبيق →
      </a>
    </div>

    {/*  التطبيق  3 */}
    <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition">
      <div className="h-40 flex items-center justify-center mb-4">
        <img
          src="/products/ComputerStores.png"
          alt="تطبيق بحث متاجر اكتونية لبيع اللابتوب وقطع غيار"
          className="max-h-full"
        />
      </div>
      <h3 className="font-bold text-lg mb-2">متاجر الكترونية لاجهزة اللابتوب وقطع الغيار</h3>
      <p className="text-sm text-gray-600 mb-4">
       عروص حصرية لمتاجر الكترونية لاجهزة اللابتوب وقطع الغيار
      </p>
      <a href="/delivery/ComputerStores" className="text-green-600 font-semibold">
        عرض التطبيق →
      </a>
    </div>

  </div>


</section>

<br/>


      {/* ================= CTA ================= */}
      <section className="py-20 bg-green-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">
          جاهز تبدأ؟
        </h2>
        <p className="mb-8 text-lg">
        </p>
        <a
            href="/products/"
          target="_blank"
          className="bg-white text-green-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
        >
          ابدا بتصفح  التطبيقات

        </a>

      </section>



    </main>
  );
}
