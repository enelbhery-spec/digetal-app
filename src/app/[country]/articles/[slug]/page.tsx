import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"
import ReactMarkdown from "react-markdown"
import Link from "next/link"

type Props = {
  params: Promise<{
    country: string
    slug: string
  }>
}

export default async function ArticlePage({ params }: Props) {

  const { country, slug } = await params

  /* ======================
     جلب المقال
  ====================== */

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .ilike("country", country) // ✅ حل مشكلة الـ case
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
    .neq("slug", slug) // ✅ استبعاد المقال الحالي
    .limit(50)

  /* ======================
     بناء الكلمات المفتاحية
  ====================== */

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
      if (!k.word || k.word.length < 4) return // تجاهل الكلمات الصغيرة

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

      <h1 className="text-3xl font-bold mb-6">
        {article.title}
      </h1>

      {/* ✅ المحتوى */}
      <div className="prose max-w-none text-right">
        <ReactMarkdown
          components={{
            a: ({ href, children }) => (
              <Link
                href={href || "#"}
                className="text-green-600 font-semibold underline"
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
      <div className="mt-10">

        <h2 className="text-xl font-bold mb-4">
          مقالات ذات صلة
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          {relatedArticles.map((item: any) => (
            <Link
              key={item.slug}
              href={`/${country}/articles/${item.slug}`}
              className="p-4 border rounded hover:bg-gray-50 transition"
            >
              {item.title}
            </Link>
          ))}

        </div>

      </div>

    </main>
  )
}