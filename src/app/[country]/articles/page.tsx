import { createClient } from "@supabase/supabase-js"
import Link from "next/link"
import { notFound } from "next/navigation"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
)

const allowedCountries = ["eg", "sa"]

export default async function CountryArticlesPage({
  params,
}: {
  params: { country: string }
}) {

  const country = params.country.toLowerCase()

  /* ======================
     تحقق من الدولة
  ====================== */

  if (!allowedCountries.includes(country)) {
    notFound()
  }

  /* ======================
     جلب المقالات حسب الدولة
  ====================== */

  const { data: articles } = await supabase
    .from("articles")
    .select("title, slug, created_at, country")
    .ilike("country", country)
    .order("created_at", { ascending: false })

  /* ======================
     Schema
  ====================== */

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `مقالات ${country === "eg" ? "مصر" : "السعودية"}`,
    url: `https://www.extracode.online/${country}/articles`,
  }

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }} dir="rtl">

      {/* ✅ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        مقالات {country === "eg" ? "مصر" : "السعودية"}
      </h1>

      {articles?.length ? (
        articles.map((article) => (

          <div
            key={article.slug}
            style={{
              borderBottom: "1px solid #eee",
              padding: "15px 0"
            }}
          >

            <Link href={`/${country}/articles/${article.slug}`}>

              <h2
                style={{
                  fontSize: "20px",
                  color: "#0070f3",
                  cursor: "pointer"
                }}
              >
                {article.title}
              </h2>

            </Link>

            <small>
              {new Date(article.created_at).toLocaleDateString()}
            </small>

          </div>

        ))
      ) : (

        <p style={{ textAlign: "center", color: "#777" }}>
          لا توجد مقالات حالياً
        </p>

      )}

    </div>
  )
}