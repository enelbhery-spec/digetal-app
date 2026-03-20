import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductCard from "@/components/ProductCard"
import Pagination from "@/components/Pagination"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

type Props = {
  params: Promise<{ country: string }>
  searchParams?: Promise<{
    pageProducts?: string
    pageArticles?: string
  }>
}

const allowedCountries = ["eg", "sa"]

/* ================================
   SEO
================================ */

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { country } = await params
  const countrySlug = country.toLowerCase().trim()

  if (!allowedCountries.includes(countrySlug)) {
    return { title: "الصفحة غير موجودة" }
  }

  const { data: countryData } = await supabase
    .from("countries")
    .select("id,name,code")
    .eq("code", countrySlug)
    .single()

  if (!countryData) {
    return {
      title: "الدولة غير موجودة",
      description: "هذه الدولة غير متاحة حالياً"
    }
  }

  return {
    title: `أفضل عروض ${countryData.name}`,
    description: `أفضل المنتجات والعروض في ${countryData.name}`
  }
}

/* ================================
   الصفحة
================================ */

export default async function CountryPage({ params, searchParams }: Props) {

  const { country } = await params
  const { pageProducts, pageArticles } = (await searchParams) || {}

  const countrySlug = country.toLowerCase().trim()

  if (!allowedCountries.includes(countrySlug)) {
    notFound()
  }

  /* ======================
     جلب الدولة
  ====================== */

  const { data: countryData } = await supabase
    .from("countries")
    .select("id,name,code")
    .eq("code", countrySlug)
    .single()

  if (!countryData) {
    notFound()
  }

  /* ======================
     Pagination المنتجات
  ====================== */

  const productsPage = Number(pageProducts) || 1
  const productsLimit = 6
  const productsFrom = (productsPage - 1) * productsLimit
  const productsTo = productsFrom + productsLimit - 1

  const { data: products, count: productsCount } = await supabase
    .from("products")
    .select("*", { count: "exact" })
    .eq("country_id", countryData.id)
    .order("created_at", { ascending: false })
    .range(productsFrom, productsTo)

  const productsTotalPages = Math.ceil((productsCount || 0) / productsLimit)

  /* ======================
     Pagination المقالات
  ====================== */

  const articlesPage = Number(pageArticles) || 1
  const articlesLimit = 6
  const articlesFrom = (articlesPage - 1) * articlesLimit
  const articlesTo = articlesFrom + articlesLimit - 1

  const { data: articles, count: articlesCount } = await supabase
    .from("articles")
    .select("title, slug, created_at, country", { count: "exact" })
    .ilike("country", countrySlug) // ✅ مهم جدًا
    .order("created_at", { ascending: false })
    .range(articlesFrom, articlesTo)

  const articlesTotalPages = Math.ceil((articlesCount || 0) / articlesLimit)

  return (

    <main className="bg-gray-50 min-h-screen" dir="rtl">

      {/* الهيدر */}
      <section className="bg-white py-16 shadow-sm">

        <div className="max-w-7xl mx-auto text-center px-6">

          <h1 className="text-4xl font-bold mb-4">
            أفضل عروض {countryData.name}
          </h1>

          <p className="text-gray-600 text-lg">
            اكتشف أحدث المنتجات وأفضل الأسعار في {countryData.name}
          </p>

          {/* ✅ روابط المقالات حسب الدولة */}
          <div className="mt-6 flex justify-center gap-4">

            <Link
              href={`/${countrySlug}/articles`}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              عرض كل مقالات {countryData.name}
            </Link>

          </div>

        </div>

      </section>

      {/* =====================
         المنتجات
      ===================== */}
      <section className="max-w-7xl mx-auto p-6">

        <h2 className="text-2xl font-bold mb-6 text-center">
          أحدث المنتجات
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">

          {products?.length ? (
            products.map((product: any) => (
              <ProductCard
                key={product.id}
                product={product}
                country={countrySlug}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-10 text-gray-500">
              لا توجد منتجات حالياً
            </div>
          )}

        </div>

        {productsTotalPages > 1 && (
          <Pagination
            currentPage={productsPage}
            totalPages={productsTotalPages}
            baseUrl={`/${countrySlug}?pageArticles=${articlesPage}&pageProducts=`}
          />
        )}

      </section>

      {/* =====================
         المقالات
      ===================== */}
      <section className="max-w-7xl mx-auto p-6">

        <h2 className="text-2xl font-bold mb-6 text-center">
          أحدث المقالات
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {articles?.length ? (
            articles.map((article: any) => (
              <Link
                key={article.slug}
                href={`/${countrySlug}/articles/${article.slug}`}
                className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
              >
                <h3 className="font-bold text-lg mb-2 hover:text-green-600">
                  {article.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {new Date(article.created_at).toLocaleDateString()}
                </p>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">
              لا توجد مقالات حالياً
            </div>
          )}

        </div>

        {articlesTotalPages > 1 && (
          <Pagination
            currentPage={articlesPage}
            totalPages={articlesTotalPages}
            baseUrl={`/${countrySlug}?pageProducts=${productsPage}&pageArticles=`}
          />
        )}

      </section>

    </main>
  )
}