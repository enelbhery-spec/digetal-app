import { createClient } from "@supabase/supabase-js"
import Link from "next/link"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
)

export default async function ArticlesPage() {

  const { data: articles } = await supabase
    .from("articles")
    .select("title, slug, created_at")
    .order("created_at", { ascending: false })

  return (
    <div style={{maxWidth:"900px",margin:"auto",padding:"20px"}}>

      <h1 style={{fontSize:"28px",marginBottom:"20px"}}>
        المقالات
      </h1>

      {articles?.map((article) => (

        <div key={article.slug} style={{
          borderBottom:"1px solid #eee",
          padding:"15px 0"
        }}>

          <Link href={`/articles/${article.slug}`}>
            <h2 style={{
              fontSize:"20px",
              color:"#0070f3",
              cursor:"pointer"
            }}>
              {article.title}
            </h2>
          </Link>

          <small>
            {new Date(article.created_at).toLocaleDateString()}
          </small>

        </div>

      ))}

    </div>
  )
}