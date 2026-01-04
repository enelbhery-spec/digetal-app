import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الأدلة والمقارنات | Smart Search",
  description:
    "مقارنات وأدلة عملية توضح الفرق بين البحث التقليدي والبحث الذكي باستخدام Smart Search للوصول السريع للخدمات والخطوط الساخنة.",
};

const articles = [
  {
    title: "Google أم Smart Search؟ أيهما أفضل للعثور على الخطوط الساخنة",
    desc: "مقارنة عملية بين البحث في Google واستخدام Smart Search من حيث السرعة والدقة وتجربة المستخدم.",
    link: "/blog/guides-and-comparisons/google-vs-smart-search",
  },
  {
    title: "البحث التقليدي مقابل تطبيقات البحث الذكي",
    desc: "لماذا لم تعد طرق البحث القديمة كافية في عالم الخدمات السريع؟",
    link: "#", // مقال قادم
  },
  {
    title: "أفضل طريقة للوصول إلى الخط الساخن الصحيح",
    desc: "دليل عملي للوصول إلى رقم الخدمة الصحيح بدون تضييع وقت أو نتائج خاطئة.",
    link: "#", // مقال قادم
  },
];

export default function GuidesAndComparisonsPage() {
  return (
    <main className="max-w-6xl mx-auto p-4" dir="rtl">
      {/* ===== HERO ===== */}
      <section className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">
          📘 الأدلة والمقارنات
        </h1>
        <p className="text-gray-600 text-lg">
          اكتشف الفرق الحقيقي بين البحث التقليدي والبحث الذكي،
          وتعلّم كيف تصل للخدمة الصحيحة بأسرع وأسهل طريقة.
        </p>
      </section>

      {/* ===== ARTICLES LIST ===== */}
      <section className="grid md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div
            key={index}
            className="border rounded-xl p-5 bg-white hover:shadow-lg transition"
          >
            <h2 className="text-lg font-bold mb-2">
              {article.title}
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              {article.desc}
            </p>

            {article.link !== "#" ? (
              <Link
                href={article.link}
                className="text-green-600 font-semibold"
              >
                اقرأ الدليل →
              </Link>
            ) : (
              <span className="text-gray-400 text-sm">
                قريبًا ✨
              </span>
            )}
          </div>
        ))}
      </section>

      {/* ===== CTA ===== */}
      <section className="mt-14 text-center bg-green-50 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-2">
          🚀 هل تريد البحث بطريقة أذكى؟
        </h2>
        <p className="text-gray-600 mb-4">
          وفّر وقتك واعثر على أي خدمة أو خط ساخن في ثوانٍ
        </p>
        <Link
          href="/"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          استخدم Smart Search الآن
        </Link>
      </section>
    </main>
  );
}
