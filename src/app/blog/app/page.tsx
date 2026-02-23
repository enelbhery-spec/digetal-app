import type { Metadata } from "next";
import Link from "next/link";

/* ================== SEO META ================== */
export const metadata: Metadata = {
  title: "مقالات تطبيق البحث الذكي | بديل بحث جوجل للخدمات",
  description:
    "اكتشف مقالات تشرح فكرة تطبيق البحث الذكي وكيف يساعدك في الوصول السريع إلى أرقام الخطوط الساخنة وخدمة العملاء والمتاجر بدقة وسرعة.",
  keywords: [
    "البحث الذكي",
    "بديل جوجل",
    "أرقام خدمة العملاء",
    "الخط الساخن",
    "البحث عن الخدمات",
    "دليل الخدمات",
  ],
};

/* ================== DATA ================== */
const articles = [
  {
    title: "الخط الساخن: من البحث التقليدي إلى البحث الذكي",
    desc: "مقارنة عملية بين الطرق القديمة للبحث عن أرقام الخدمات والطريقة الذكية عبر تطبيق البحث الذكي.",
    link: "/blog/app/hotline-smart-search",
  },
  {
    title: "لماذا يفشل البحث التقليدي عن الخطوط الساخنة؟",
    desc: "تعرف على أسباب ضياع الوقت وظهور أرقام خاطئة عند البحث في جوجل أو مواقع التواصل.",
    link: "/blog/app/traditional-search-problems",
  },
  {
    title: "مقارنة بين بحث جوجل والبحث الذكي",
    desc: "شرح مبسط يوضح الفرق بين نتائج جوجل العامة والبحث الذكي المتخصص في الخدمات.",
    link: "/blog/app/google-vs-smart-search",
  },
];

/* ================== PAGE ================== */
export default function AppArticlesPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-14" dir="rtl">

      {/* ===== HEADER ===== */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          📱 مقالات تطبيق البحث الذكي
        </h1>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
          تعرّف على كيفية استخدام <strong>البحث الذكي</strong> للوصول إلى
          أرقام الخطوط الساخنة، خدمة العملاء، والمتاجر بسهولة
          بدل الاعتماد على البحث التقليدي المرهق.
        </p>
      </header>

      {/* ===== ARTICLES GRID ===== */}
      <section className="grid md:grid-cols-2 gap-8">
        {articles.map((article, index) => (
          <article
            key={index}
            className="bg-white border rounded-2xl p-6 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-bold mb-3 leading-snug">
              {article.title}
            </h2>

            <p className="text-gray-600 mb-5 leading-relaxed">
              {article.desc}
            </p>

            <Link
              href={article.link}
              className="inline-flex items-center text-green-600 font-semibold hover:underline"
            >
              قراءة المقال
              <span className="mr-2">←</span>
            </Link>
          </article>
        ))}
      </section>

      {/* ===== CTA ===== */}
      <section className="mt-16 bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl text-center border">
        <h2 className="text-2xl font-bold mb-3">
          🚀 اختصر وقتك مع البحث الذكي
        </h2>

        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          بدل التنقل بين عشرات المواقع والنتائج غير الدقيقة،
          استخدم البحث الذكي للوصول إلى المعلومة الصحيحة في ثوانٍ.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/delivery/hotline"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            تجربة الخط الساخن الذكي
          </Link>

          <Link
            href="/"
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
          >
            الانتقال للبحث الذكي
          </Link>
        </div>
      </section>

    </main>
  );
}