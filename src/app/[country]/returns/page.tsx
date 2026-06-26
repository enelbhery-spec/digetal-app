import React from "react";

export const metadata = {
  title: "سياسة الإرجاع والاستبدال | ExtraCode",
  description:
    "تعرف على سياسة الإرجاع والاستبدال للمنتجات التي يتم شراؤها عبر روابط ExtraCode من المتاجر الخارجية.",
  keywords: [
    "سياسة الإرجاع",
    "استرجاع المنتجات",
    "ExtraCode",
    "أمازون",
    "نون",
    "affiliate",
  ],
  alternates: {
    canonical: "https://extracode.online/returns",
  },
};

export default function ReturnsPage() {
  return (
    <main
      className="max-w-4xl mx-auto px-6 py-12 text-right min-h-screen"
      dir="rtl"
    >
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

        <h1 className="text-3xl font-black mb-8 text-gray-900 border-r-4 border-green-600 pr-4">
          سياسة الإرجاع والاستبدال
        </h1>

        {/* مقدمة */}
        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            يوضح هذا القسم سياسة الإرجاع والاستبدال الخاصة بالمنتجات التي يتم الوصول إليها
            من خلال موقع <strong>ExtraCode</strong>.
          </p>
        </section>


        {/* طريقة الإرجاع */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-blue-700">
            1. كيفية إرجاع المنتج
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            لإرجاع أي منتج، يجب تسجيل الدخول إلى حسابك في المتجر الذي تم الشراء منه،
            ثم التوجه إلى قسم "طلباتي" واتباع خطوات الإرجاع.
          </p>
        </section>


        {/* ملاحظات */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-blue-700">
            2. ملاحظات هامة
          </h2>
          <ul className="list-disc pr-6 text-gray-600 space-y-2">
            <li>مدة الإرجاع تختلف حسب كل متجر.</li>
            <li>بعض المنتجات لا يمكن إرجاعها (مثل المنتجات الشخصية).</li>
            <li>قد يتم فرض رسوم شحن على الإرجاع حسب سياسة المتجر.</li>
          </ul>
        </section>

        {/* تواصل */}
        <section className="mt-10 pt-6 border-t">
          <h2 className="text-xl font-bold mb-4">
            التواصل معنا
          </h2>
          <p className="text-gray-600">
            في حال وجود استفسار يمكنك التواصل معنا عبر:
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

      {/* ✅ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "سياسة الإرجاع والاستبدال",
            url: "https://extracode.online/returns",
            description:
              "سياسة الإرجاع والاستبدال لموقع ExtraCode وروابط التسويق بالعمولة",
          }),
        }}
      />
    </main>
  );
}