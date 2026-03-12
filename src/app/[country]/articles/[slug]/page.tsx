import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"
import ReactMarkdown from "react-markdown"

type Props = {
  params: Promise<{
    country: string
    slug: string
  }>
}

export default async function ArticlePage({ params }: Props) {

  const { slug } = await params

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!article) {
    notFound()
  }

  return (

    <main className="max-w-3xl mx-auto p-6" dir="rtl">

      <h1 className="text-3xl font-bold mb-6">
        {article.title}
      </h1>

      <div className="prose max-w-none text-right">
        <ReactMarkdown>
          {article.content}
        </ReactMarkdown>
      </div>

    </main>

  )
}