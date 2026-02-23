import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "كيف يعمل البحث الذكي للوصول للخدمة الصحيحة؟",
  description:
    "تعرف على كيفية عمل Smart Search للوصول السريع والدقيق إلى الخطوط الساخنة والخدمات بدون نتائج خاطئة أو إعلانات.",
  alternates: {
    canonical: "/articles/how-smart-search-works",
  },
  openGraph: {
    title: "كيف يعمل البحث الذكي للوصول للخدمة الصحيحة؟",
    description:
      "شرح عملي لطريقة عمل Smart Search للوصول إلى أرقام وخدمات العملاء بسرعة ودقة.",
    url: "/articles/how-smart-search-works",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "كيف يعمل البحث الذكي؟",
    description:
      "اكتشف آلية Smart Search للوصول للخدمة الصحيحة بدون تشتيت.",
  },
};

export default function HowSmartSearchWorksPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "كيف يعمل البحث الذكي للوصول للخدمة الصحيحة؟",
    description:
      "شرح عملي لكيفية عمل Smart Search في الوصول السريع والدقيق إلى الخطوط الساخنة والخدمات.",
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
        "https://digetal-app-q1mf.vercel.app/articles/how-smart-search-works",
    },
  };

  return (
    <main className="max-w-4xl mx-auto p-4 leading-relaxed" dir="rtl">
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <h1 className="text-3xl font-bold mb-6">
        كيف يعمل Smart Search للوصول للخدمة الصحيحة؟
      </h1>

      <p className="text-gray-700 mb-6">
        في البحث التقليدي، أنت تبحث داخل ملايين الصفحات،
        أما في <strong>Smart Search</strong> فأنت تبحث داخل
        <strong> بيانات مُنظمة ومُفلترة </strong>
        تم إعدادها مسبقًا للوصول إلى الخدمة الصحيحة مباشرة.
      </p>

      <h2 className="text-2xl font-bold mb-3">
        1️⃣ فهم نية المستخدم وليس الكلمة فقط
      </h2>
      <p className="mb-6">
        Smart Search لا يعتمد على التطابق الحرفي للكلمات،
        بل يحلل <strong>نية البحث</strong>.
      </p>

      <ul className="list-disc pr-6 mb-6 text-gray-700">
        <li>بحثك عن: <strong>خط ساخن كهرباء</strong></li>
        <li>أو: <strong>رقم طوارئ الكهرباء</strong></li>
      </ul>

      <p className="mb-6">
        كلاهما يقودك لنفس النتيجة الصحيحة بدون تشتيت.
      </p>

      <h2 className="text-2xl font-bold mb-3">
        2️⃣ قاعدة بيانات مخصصة وليست الإنترنت بالكامل
      </h2>

      <ul className="list-disc pr-6 mb-6 text-gray-700">
        <li>أرقام وخدمات مؤكدة</li>
        <li>تصنيفات واضحة</li>
        <li>تحديث دوري للبيانات</li>
      </ul>

      <h2 className="text-2xl font-bold mb-3">
        3️⃣ نتائج فورية بدون إعلانات أو روابط مضللة
      </h2>
      <p className="mb-6">
        النتيجة = <strong>الخدمة نفسها</strong>.
      </p>

      <h2 className="text-2xl font-bold mb-3">
        4️⃣ تجربة مصممة للهاتف وسرعة القرار
      </h2>

      <ul className="list-disc pr-6 mb-6 text-gray-700">
        <li>زر اتصال مباشر</li>
        <li>فتح الموقع الرسمي بضغطة واحدة</li>
        <li>لا حاجة للحفظ أو النسخ</li>
      </ul>

      <h2 className="text-2xl font-bold mb-3">
        الخلاصة
      </h2>
      <p className="mb-8">
        Smart Search لا يجعلك تبحث أكثر،
        بل يجعلك <strong>تصل أسرع</strong>.
      </p>

      <div className="bg-green-50 p-6 rounded-xl text-center">
        <h3 className="text-xl font-bold mb-2">
          🚀 جرّب البحث الذكي الآن
        </h3>
        <p className="text-gray-600 mb-4">
          لا تضيع وقتك في البحث التقليدي
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/smart-search"
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            استخدم البحث الذكي (Smart Search)
          </Link>
          <Link
            href="/delivery/hotline"
            className="border border-green-600 text-green-600 px-6 py-2 rounded-lg font-semibold"
          >
            بحث الخط الساخن
          </Link>
        </div>
      </div>
    </main>
  );
}