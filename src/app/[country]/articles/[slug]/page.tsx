import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Image from "next/image";

type Props = {
  params: Promise<{
    country: string;
    slug: string;
  }>;
};

export default async function ArticlePage({ params }: Props) {
  const { country, slug } = await params;

  // 1. جلب المقال
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("code", country) // استخدمت code كما في أعمدتك بدلاً من ilike
    .single();

  if (!article) {
    notFound();
  }

  // 2. جلب المقالات الأخرى للربط التلقائي (نفس الدولة)
  const { data: allArticles } = await supabase
    .from("articles")
    .select("title, slug")
    .eq("code", country)
    .neq("slug", slug)
    .limit(50);

  // 3. بناء الكلمات المفتاحية
  const keywords = (allArticles || []).map((item: any) => ({
    word: item.title.split(" ").slice(0, 2).join(" "),
    url: `/${country}/articles/${item.slug}`,
  }));

  // 4. تحويل المحتوى لروابط (تعديل طفيف لضمان دقة الاستبدال)
  function autoLink(content: string) {
    let result = content;
    let count = 0;

    keywords.forEach((k) => {
      if (!k.word || k.word.length < 4) return;
      // نستخدم word boundary (\b) لضمان مطابقة الكلمة كاملة
      const regex = new RegExp(`\\b(${k.word})\\b`, "gi");
      
      result = result.replace(regex, (match) => {
        if (count >= 5) return match;
        count++;
        return `[${match}](${k.url})`;
      });
    });
    return result;
  }

  const linkedContent = autoLink(article.content || "");
  const relatedArticles = (allArticles || []).slice(0, 6);

  return (
    <main className="max-w-3xl mx-auto p-6" dir="rtl">
      <h1 className="text-3xl md:text-4xl font-black mb-6 leading-tight text-gray-900">
        {article.title}
      </h1>

      {article.image_url && (
        <div className="relative w-full h-[300px] md:h-[450px] mb-10 overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover" 
          />
        </div>
      )}

      <div className="prose prose-lg md:prose-xl max-w-none text-right text-gray-800">
        <ReactMarkdown
          components={{
            a: ({ href, children }) => (
              <Link
                href={href || "#"}
                className="text-green-600 font-semibold underline decoration-2 underline-offset-4 hover:text-green-800"
              >
                {children}
              </Link>
            ),
          }}
        >
          {linkedContent}
        </ReactMarkdown>
      </div>

      <div className="mt-20 pt-10 border-t border-gray-100">
        <h2 className="text-xl font-black mb-8 text-gray-950">قد يهمك أيضاً</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {relatedArticles.map((item: any) => (
            <Link
              key={item.slug}
              href={`/${country}/articles/${item.slug}`}
              className="p-5 border border-gray-100 rounded-2xl hover:border-green-200 transition-all text-gray-700 font-medium text-sm leading-snug"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}