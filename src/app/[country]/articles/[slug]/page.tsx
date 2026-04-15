import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"
import ReactMarkdown from "react-markdown"
import Link from "next/link"
import Image from "next/image" // ✅ استيراد مكون الصورة

type Props = {
  params: Promise<{
    country: string
    slug: string
  }>
}

export default async function ArticlePage({ params }: Props) {

  const { country, slug } = await params

  /* ======================
      جلب المقال (مع التأكد من جلب image_url)
  ====================== */

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .ilike("country", country) 
    .single()

  if (!article) {
    notFound()
  }

  /* ======================
      جلب باقي المقالات (للربط)
  ====================== */

  const { data: allArticles } = await supabase
    .from("articles")
    .select("title, slug")
    .ilike("country", country)
    .neq("slug", slug) 
    .limit(50)

  /* ======================
      بناء الكلمات المفتاحية
  ================= */

  const keywords = (allArticles || []).map((item: any) => ({
    word: item.title.split(" ").slice(0, 2).join(" "),
    url: `/${country}/articles/${item.slug}`,
  }))

  /* ======================
      تحويل المحتوى لروابط
  ====================== */

  function autoLink(content: string) {
    let result = content
    let count = 0

    keywords.forEach((k) => {
      if (!k.word || k.word.length < 4) return 

      const regex = new RegExp(`(${k.word})`, "gi")

      result = result.replace(regex, (match) => {
        if (count >= 5) return match
        count++

        return `[${match}](${k.url})`
      })
    })

    return result
  }

  const linkedContent = autoLink(article.content || "")

  /* ======================
      مقالات ذات صلة
  ====================== */

  const relatedArticles = (allArticles || []).slice(0, 6)

  return (
    <main className="max-w-3xl mx-auto p-6" dir="rtl">

      <h1 className="text-3xl font-black mb-6 leading-tight">
        {article.title}
      </h1>

      {/* ✅ تعديل مقاس الصورة لتظهر بالكامل وبوضوح */}
      {article.image_url && (
        <div className="relative w-full h-[350px] md:h-[500px] mb-10 overflow-hidden rounded-2xl shadow-sm border border-gray-100 bg-white">
          <Image
            src={article.image_url}
            alt={article.title}
            fill // تملأ الحاوية
            priority // تحميل بأولوية عالية
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px" // لتكييف المقاس
            className="object-contain p-4 transition-transform duration-700 hover:scale-102" // ✅object-contain لإظهار الصورة بالكامل وبدون قص
          />
        </div>
      )}

      {/* ✅ المحتوى */}
      <div className="prose prose-lg md:prose-xl max-w-none text-right font-normal leading-relaxed text-gray-800">
        <ReactMarkdown
          components={{
            a: ({ href, children }) => (
              <Link
                href={href || "#"}
                className="text-green-600 font-semibold underline decoration-2 underline-offset-4 hover:text-green-800 transition-colors"
              >
                {children}
              </Link>
            ),
          }}
        >
          {linkedContent}
        </ReactMarkdown>
      </div>

      {/* ✅ مقالات ذات صلة */}
      <div className="mt-20 pt-10 border-t border-gray-100">
        <h2 className="text-xl font-black mb-8 text-gray-950">
          قد يهمك أيضاً
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {relatedArticles.map((item: any) => (
            <Link
              key={item.slug}
              href={`/${country}/articles/${item.slug}`}
              className="p-5 border border-gray-100 rounded-2xl hover:bg-gray-50 hover:border-green-200 transition-all text-gray-700 font-medium text-sm leading-snug"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

    </main>
  )
}