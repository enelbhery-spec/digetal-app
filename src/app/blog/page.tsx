import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "مدونة البحث الذكى | البحث الذكي عن الخدمات والمنتجات",
  description:
    "مقالات ودلائل تساعدك على البحث الذكي عن الخطوط الساخنة، الخدمات، المتاجر، والتطبيقات بدل الطرق التقليدية المرهقة.",
};

const categories = [
  {
    title: "📱 مقالات التطبيق",
    desc: "شرح خدمات البحث الذكى وكيف تحل مشكلات البحث اليومي",
    link: "/blog/app",
  },
  {
    title: "📘 الأدلة والمقارنات",
    desc: "مقارنات بين البحث التقليدي والبحث الذكي",
    link: "/blog/guides-and-comparisons",
  },
  {
    title: "⚠️ مشاكل المستخدم",
    desc: "مشاكل حقيقية يواجهها المستخدم أثناء البحث عن الخدمات",
    link: "/blog/problems/user-search-problems",
  },
  {
    title: "🚀 تحديثات البحث الذكى",
    desc: "آخر التحديثات والتحسينات داخل التطبيق",
    link: "/blog/updates/smart-search-updates",
  },
];

export default function BlogPage() {
  return (
    <main className="max-w-6xl mx-auto p-4" dir="rtl">
      {/* ====== HERO ====== */}
      <section className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">
          📝 مدونة البحث الذكى
        </h1>
        <p className="text-gray-600 text-lg">
          دليلك العملي للبحث الذكي عن الخطوط الساخنة، الخدمات، والمتاجر
          بدون تضييع وقت أو نتائج خاطئة.
        </p>
      </section>

      {/* ====== CATEGORIES ====== */}
      <section className="grid md:grid-cols-2 gap-6 mb-12">
        {categories.map((cat, i) => (
          <Link
            key={i}
            href={cat.link}
            className="border rounded-xl p-5 hover:shadow-lg transition bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">
              {cat.title}
            </h2>
            <p className="text-gray-600">{cat.desc}</p>
          </Link>
        ))}
      </section>

      {/* ====== LATEST ARTICLES ====== */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          📰 أحدث المقالات
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* مقال تجريبي 1 */}
          <article className="border rounded-xl p-4 bg-white">
            <h3 className="font-bold mb-2">
              الخط الساخن: من البحث التقليدي إلى البحث الذكي
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              لماذا تضيع وقتك في البحث عن أرقام الخدمات بينما يمكنك
              الوصول لها في ثوانٍ؟
            </p>
            <Link
              href="/blog/app/hotline-smart-search"
              className="text-green-600 font-semibold"
            >
              قراءة المقال →
            </Link>
          </article>
          <article className="border rounded-xl p-4 bg-white">
            <h3 className="font-bold mb-2">
              لماذا يفشل البحث التقليدي عن الخطوط الساخنة؟
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              سباب ضياع الوقت وظهور أرقام خاطئة عند البحث في جوجل أو فيسبوك
            </p>
            <Link
              href="/blog/app/traditional-search-problems"
              className="text-green-600 font-semibold"
            >
              قراءة المقال →
            </Link>
          </article>
          <article className="border rounded-xl p-4 bg-white">
            <h3 className="font-bold mb-2">
              Google أم البحث الذكى؟ أيهما أفضل للعثور على الخطوط الساخنةالذكي
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              مقارنة عملية بين البحث في Google واستخدام البحث الذكى من حيث السرعة والدقة وتجربة المستخدم.
            </p>
            <Link
              href="/blog/guides-and-comparisons/google-vs-smart-search"
              className="text-green-600 font-semibold"
            >
              قراءة المقال →
            </Link>
          </article>
        </div>

      </section>

      {/* ====== CTA ====== */}
      <section className="text-center bg-green-50 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-2">
          🚀 جرّب البحث الذكي الآن
        </h2>
        <p className="text-gray-600 mb-4">
          اختصر وقتك واعثر على أي خدمة أو رقم في ثوانٍ
        </p>
        <Link
          href="/"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          الذهاب إلى البحث الذكى
        </Link>
      </section>
    </main>
  );
}
