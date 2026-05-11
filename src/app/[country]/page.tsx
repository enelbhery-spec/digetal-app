import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductCard from "@/components/ProductCard"
import Pagination from "@/components/Pagination"
import Categories from "@/app/[country]/Categories"
import { supabase } from "@/lib/supabase"
import ArticlesSection from "@/components/ArticlesSection"
import Link from "next/link"

// ✅ السلايدر
import TopRatedSlider from "@/components/TopRatedGrid"

// ✅ كوبونات نون
import NoonCouponsSection from "@/components/NoonCouponsSection"

export const dynamic = "force-dynamic"

type Props = {
  params: Promise<{ country: string }>
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

const allowedCountries = ["eg", "sa"]

const allowedBrandsByCountry: Record<
  string,
  string[]
> = {
  eg: ["amazon", "temu", "shin-eg"],
  sa: ["noon", "shin-sa", "temu"],
}

/* ===================================================== */
/* SEO */
/* ===================================================== */

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    country: string
  }>
}): Promise<Metadata> {

  const { country } = await params

  const countryName =
    country === "sa"
      ? "السعودية"
      : "مصر"

  return {

    title:
      `أفضل عروض التسوق في ${countryName}`,

    description:
      `أحدث عروض وكوبونات الخصم في ${countryName} من نون وأمازون وتيمو وشي إن.`,

    alternates: {
      canonical:
        `https://www.extracode.online/${country}`,
    },

    openGraph: {

      title:
        `أفضل عروض التسوق خضومات وكيونات في ${countryName}`,

      description:
        `تسوق بذكاء ووفر أكثر مع أحدث العروض والكوبونات.`,

      url:
        `https://www.extracode.online/${country}`,

      siteName: "إكسترا كود",

      locale: "ar_EG",

      type: "website",

      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "إكسترا كود",
        },
      ],
    },

    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function CountryPage({
  params,
  searchParams,
}: Props) {

  const { country } = await params

  const sParams =
    await searchParams

  const countrySlug =
    country.toLowerCase().trim()

  const pageProducts =
    Number(
      sParams?.pageProducts
    ) || 1

  const brandFilter =
    typeof sParams?.brand ===
    "string"
      ? sParams.brand
      : null

  /* ===================================================== */
  /* التحقق */
  /* ===================================================== */

  if (
    !allowedCountries.includes(
      countrySlug
    )
  ) {
    notFound()
  }

  const allowedBrandsSlugs =
    allowedBrandsByCountry[
      countrySlug
    ]

  if (
    brandFilter &&
    !allowedBrandsSlugs.includes(
      brandFilter
    )
  ) {
    notFound()
  }

  /* ===================================================== */
  /* البراندات */
  /* ===================================================== */

  const {
    data: brandsData,
  } = await supabase
    .from("brands")
    .select("slug, logo")
    .in(
      "slug",
      allowedBrandsSlugs
    )

  /* ===================================================== */
  /* الدولة */
  /* ===================================================== */

  const {
    data: countryData,
  } = await supabase
    .from("countries")
    .select("id, name, code")
    .eq("code", countrySlug)
    .single()

  if (!countryData) {
    notFound()
  }

  const countryId =
    countryData.id

  /* ===================================================== */
  /* المنتجات */
  /* ===================================================== */

  const productsLimit = 9

  const productsFrom =
    (pageProducts - 1) *
    productsLimit

  const productsTo =
    productsFrom +
    productsLimit -
    1

  let query = supabase
    .from("products")
    .select(
      `
      *,
      brands!fk_products_brand (
        logo,
        slug
      )
    `,
      {
        count: "exact",
      }
    )
    .eq(
      "country_id",
      countryId
    )

  if (brandFilter) {

    query = query.eq(
      "brand_slug",
      brandFilter
    )
  }

  query = query.order(
    "created_at",
    {
      ascending: false,
    }
  )

  const {
    data: products,
    count: productsCount,
  } = await query.range(
    productsFrom,
    productsTo
  )

  const finalProducts =
    products || []

  const productsTotalPages =
    Math.ceil(
      (productsCount || 0) /
        productsLimit
    )

  /* ===================================================== */
  /* مقالات المقارنات */
  /* ===================================================== */

  const {
    data: comparisonArticles,
  } = await supabase
    .from("comparison_articles")
    .select(`
      id,
      title,
      slug,
      image,
      excerpt,
      category_slug,
      created_at,
      code
    `)

    .eq("published", true)

    .eq("code", countrySlug)

    .order("created_at", {
      ascending: false,
    })

    .limit(4)

  return (

    <main
      className="bg-gray-50 min-h-screen pb-20"
      dir="rtl"
    >

      {/* ===================================================== */}
      {/* العنوان */}
      {/* ===================================================== */}

      <div className="max-w-7xl mx-auto px-6 pt-10 text-center">

        <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">

          {
            brandFilter
              ? `عروض ماركة ${brandFilter.toUpperCase()}`
              : `أفضل عروض و خصومات وكوبونات التسوق في ${
                  countrySlug === "eg"
                    ? "مصر"
                    : "السعودية"
                }`
          }

        </h1>

        <p className="text-gray-500 mt-2 font-bold">

          تسوق بذكاء ووفر أكثر مع أحدث العروض المضافة

        </p>

      </div>

      {/* ===================================================== */}
      {/* كوبونات نون */}
      {/* ===================================================== */}

      {countrySlug === "sa" &&
        !brandFilter && (

        <div className="max-w-7xl mx-auto px-4 mt-8">

          <NoonCouponsSection />

        </div>
      )}

      {/* ===================================================== */}
      {/* السلايدر */}
      {/* ===================================================== */}

      {!brandFilter &&
        pageProducts === 1 && (

        <>

          <div className="mt-8">

            <TopRatedSlider
              country={
                countrySlug === "eg"
                  ? "egypt"
                  : "saudi"
              }
            />

          </div>

          {/* بانر المقارنات */}

          <div className="max-w-7xl mx-auto px-4 mt-8 mb-4">

            <Link
              href={`/${countrySlug}/comparison_categories`}
              className="flex items-center justify-between gap-4 w-full p-4 md:p-5 bg-gradient-to-r from-[#00A67E] to-[#008564] text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden relative border border-white/20"
            >

              <div className="flex items-center gap-4 relative z-10">

                <div className="bg-white p-1.5 rounded-xl hidden sm:block shadow-sm">

                  <img
                    src="/logo.png"
                    alt="إكسترا كود"
                    className="h-8 w-auto object-contain"
                  />

                </div>

                <div className="bg-white/20 p-2 rounded-xl group-hover:rotate-12 transition-transform">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >

                    <path d="m3 16 4 4 4-4" />
                    <path d="M7 20V4" />
                    <path d="m21 8-4-4-4 4" />
                    <path d="M17 4v16" />

                  </svg>

                </div>

                <div>

                  <h2 className="text-lg md:text-xl font-black leading-tight">

                    مركز مقارنة المواصفات

                  </h2>

                  <p className="text-[10px] md:text-xs text-green-50 opacity-90 font-medium">

                    قارن بين أفضل المنتجات بسهولة

                  </p>

                </div>

              </div>

              <div className="bg-white text-[#00A67E] px-5 py-2.5 rounded-xl font-black text-xs md:text-sm shadow-md whitespace-nowrap group-hover:scale-105 transition-transform relative z-10">

                فتح المقارنات

              </div>

            </Link>

          </div>

        </>
      )}

      {/* ===================================================== */}
      {/* المنتجات */}
      {/* ===================================================== */}

      <section className="max-w-7xl mx-auto p-6 mt-4">

        {/* الفلاتر */}

        <div className="flex gap-3 mb-10 flex-wrap justify-center md:justify-start">

          <Link
            href={`/${countrySlug}`}
            className={`px-8 py-2.5 rounded-xl font-bold transition-all shadow-sm border ${
              !brandFilter
                ? "bg-green-600 text-white border-green-600 shadow-green-200"
                : "bg-white text-gray-600 border-gray-100 hover:bg-green-50"
            }`}
          >

            الكل

          </Link>

          {brandsData?.map(
            (brand) => (

              <Link
                key={brand.slug}
                href={`/${countrySlug}?brand=${brand.slug}`}
                className={`px-4 py-2 rounded-xl font-bold transition-all capitalize shadow-sm flex items-center gap-3 border ${
                  brandFilter ===
                  brand.slug
                    ? "bg-green-600 text-white border-green-600 shadow-green-200"
                    : "bg-white text-gray-600 border-gray-100 hover:border-green-300"
                }`}
              >

                <div className="w-8 h-8 bg-white rounded-full p-1 flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm">

                  <img
                    src={brand.logo}
                    alt={brand.slug}
                    className="w-full h-full object-contain"
                  />

                </div>

                <span className="hidden sm:inline">

                  {brand.slug}

                </span>

              </Link>
            )
          )}

        </div>

        {/* المنتجات */}

        {finalProducts.length > 0 ? (

          <div className="grid !grid-cols-1 sm:!grid-cols-1 lg:!grid-cols-3 gap-8">

            {finalProducts.map(
              (product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                  country={countrySlug}
                />

              )
            )}

          </div>

        ) : (

          <div className="text-center py-24 bg-white rounded-[2rem] border border-gray-100 shadow-inner">

            <p className="text-gray-400 font-bold text-xl italic">

              لا توجد منتجات متوفرة حالياً

            </p>

          </div>
        )}

        {/* Pagination */}

        {productsTotalPages > 1 && (

          <div className="mt-16 flex justify-center">

            <Pagination
              currentPage={
                pageProducts
              }
              totalPages={
                productsTotalPages
              }
              baseUrl={`/${countrySlug}?brand=${
                brandFilter || ""
              }&pageProducts=`}
            />

          </div>
        )}

      </section>

      {/* ===================================================== */}
      {/* الأقسام */}
      {/* ===================================================== */}

      <div className="bg-white py-16 border-y border-gray-100 my-16 shadow-inner">

        <div className="max-w-7xl mx-auto">

          <Categories />

        </div>

      </div>

      {/* ===================================================== */}
      {/* مقالات المقارنات */}
      {/* ===================================================== */}

      {comparisonArticles &&
        comparisonArticles.length > 0 && (

        <section className="max-w-7xl mx-auto px-6 mb-20">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-black text-slate-900">

              مقالات المقارنات

            </h2>

            <Link
              href={`/${countrySlug}/comparison-articles`}
              className="text-green-600 font-black hover:underline"
            >

              عرض الكل ←

            </Link>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {comparisonArticles.map(
              (article) => (

                <Link
                  key={article.id}
                  href={`/${countrySlug}/comparison-articles/${article.slug}`}
                  className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow hover:shadow-2xl transition-all"
                >

                  <img
                    src={
                      article.image ||
                      "/no-image.png"
                    }
                    alt={
                      article.title
                    }
                    className="w-full h-56 object-contain bg-white p-4"
                  />

                  <div className="p-5">

                    <div className="inline-block bg-orange-100 text-orange-600 text-xs font-black px-3 py-1 rounded-full mb-3">

                      {
                        article.category_slug
                      }

                    </div>

                    <h3 className="font-black text-lg leading-relaxed line-clamp-2 text-slate-900">

                      {article.title}

                    </h3>

                    <p className="text-slate-500 text-sm mt-3 line-clamp-3 leading-7">

                      {
                        article.excerpt
                      }

                    </p>

                    <div className="mt-5 text-green-600 font-black text-sm">

                      اقرأ المقارنة ←

                    </div>

                  </div>

                </Link>

              )
            )}

          </div>

        </section>
      )}

      {/* ===================================================== */}
      {/* المقالات */}
      {/* ===================================================== */}

      <div className="max-w-7xl mx-auto px-6 mb-20">

        <ArticlesSection
          countryCode={
            countrySlug
          }
        />

      </div>

    </main>
  )
}