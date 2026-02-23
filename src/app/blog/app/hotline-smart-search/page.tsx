import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "البحث عن الخط الساخن: من الطريقة التقليدية إلى البحث الذكي",
  description:
    "اكتشف الفرق بين البحث التقليدي عن الخط الساخن والبحث الذكي، وكيف تصل لرقم أي خدمة عملاء في ثوانٍ بسهولة ودقة.",
  alternates: {
    canonical: "/articles/hotline-smart-search",
  },
  openGraph: {
    title:
      "البحث عن الخط الساخن: من الطريقة التقليدية إلى البحث الذكي",
    description:
      "كيف تصل لرقم أي خدمة عملاء بسرعة؟ تعرف على قوة البحث الذكي مقارنة بالطريقة التقليدية.",
    url: "/articles/hotline-smart-search",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "البحث عن الخط الساخن: من الطريقة التقليدية إلى البحث الذكي",
    description:
      "تعرف على أفضل طريقة للوصول إلى أرقام خدمة العملاء في ثوانٍ.",
  },
};

export default function HotlineSmartSearchArticle() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "البحث عن الخط الساخن: من الطريقة التقليدية إلى البحث الذكي",
    description:
      "تعرف على الفرق بين البحث التقليدي والبحث الذكي للوصول إلى أرقام خدمة العملاء بسرعة.",
    author: {
      "@type": "Organization",
      name: "البحث الذكي",
    },
    publisher: {
      "@type": "Organization",
      name: "البحث الذكي",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":
        "https://digetal-app-q1mf.vercel.app/articles/hotline-smart-search",
    },
  };

  return (
    <main className="max-w-3xl mx-auto p-4 leading-relaxed" dir="rtl">
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <h1 className="text-3xl font-bold mb-6">
        البحث عن الخط الساخن: من الطريقة التقليدية إلى البحث الذكي
      </h1>

      <p className="text-gray-700 mb-4">
        في مواقف كثيرة نحتاج إلى رقم الخط الساخن بسرعة، سواء لخدمة طوارئ،
        شركة إنترنت، تأمين أو خدمة عملاء. المشكلة ليست في وجود الرقم،
        بل في طريقة الوصول إليه.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        أولًا: البحث بالطريقة التقليدية
      </h2>

      <ul className="list-disc pr-6 text-gray-700 mb-4">
        <li>البحث في جوجل</li>
        <li>التصفح في فيسبوك</li>
        <li>مواقع قديمة غير محدثة</li>
      </ul>

      <p className="mb-4">
        هذه الطرق تستهلك وقتًا، وغالبًا تعطي أرقامًا خاطئة أو غير مفعلة.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        ثانيًا: ما هو البحث الذكي؟
      </h2>

      <p className="mb-4">
        البحث الذكي يعتمد على إظهار النتيجة مباشرة بدون روابط أو إعلانات.
        تكتب اسم الخدمة، تحصل على الرقم الصحيح فورًا.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        لماذا البحث الذكي هو الحل؟
      </h2>

      <ul className="list-disc pr-6 text-gray-700 mb-6">
        <li>نتائج دقيقة</li>
        <li>توفير الوقت</li>
        <li>بدون تسجيل</li>
        <li>اتصال مباشر</li>
      </ul>

      <div className="bg-green-50 p-6 rounded-xl text-center">
        <h3 className="text-xl font-bold mb-3">
          جرّب البحث الذكي الآن
        </h3>
        <p className="text-gray-600 mb-4">
          اختصر وقتك واعثر على أي رقم خدمة في ثوانٍ
        </p>
        <Link
          href="/delivery/hotline"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          فتح تطبيق الخط الساخن
        </Link>
      </div>
    </main>
  );
}