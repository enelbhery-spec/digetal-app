import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductCard from "@/components/ProductCard"
import Pagination from "@/components/Pagination"
import Categories from "@/app/[country]/Categories"
import { supabase } from "@/lib/supabase"
import ArticlesSection from '@/components/ArticlesSection'
import Link from "next/link"

// ✅ استيراد السلايدر (TopRatedGrid)
import TopRatedSlider from "@/components/TopRatedGrid"

export const dynamic = "force-dynamic"

type Props = {
  params: Promise<{ country: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const allowedCountries = ["eg", "sa"]

const allowedBrandsByCountry: Record<string, string[]> = {
  eg: ["amazon", "temu", "shin-eg"],
  sa: ["noon", "shin-sa", "temu"]
}

export default async function CountryPage({ params, searchParams }: Props) {
  const { country } = await params
  const sParams = await searchParams
  
  const countrySlug = country.toLowerCase().trim()
  const pageProducts = Number(sParams?.pageProducts) || 1
  const brandFilter = typeof sParams?.brand === 'string' ? sParams.brand : null

  /* ================= 1. التحقق من البيانات والجلب الأولي ================= */
  if (!allowedCountries.includes(countrySlug)) {
    notFound()
  }

  const allowedBrandsSlugs = allowedBrandsByCountry[countrySlug]
  if (brandFilter && !allowedBrandsSlugs.includes(brandFilter)) {
    notFound()
  }

  const { data: brandsData } = await supabase
    .from("brands")
    .select("slug, logo")
    .in("slug", allowedBrandsSlugs)

  const { data: countryData } = await supabase
    .from("countries")
    .select("id, name, code")
    .eq("code", countrySlug)
    .single()

  if (!countryData) {
    notFound()
  }

  const countryId = countryData.id

  /* ================= 2. جلب المنتجات (ترتيب الأحدث أولاً) ================= */
  const productsLimit = 9 
  const productsFrom = (pageProducts - 1) * productsLimit
  const productsTo = productsFrom + productsLimit - 1

  let query = supabase
    .from("products")
    .select(`
      *,
      brands!fk_products_brand (
        logo,
        slug
      )
    `, { count: "exact" })
    .eq("country_id", countryId)

  if (brandFilter) {
    query = query.eq("brand_slug", brandFilter)
  }

  query = query.order("created_at", { ascending: false })

  const { data: products, count: productsCount } = await query
    .range(productsFrom, productsTo)

  const finalProducts = products || [];
  const productsTotalPages = Math.ceil((productsCount || 0) / productsLimit)

  return (
    <main className="bg-gray-50 min-h-screen pb-20" dir="rtl">

      {/* 1. العنوان العلوي */}
      <div className="max-w-7xl mx-auto px-6 pt-10 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
           {brandFilter ? `عروض ماركة ${brandFilter.toUpperCase()}` : `أفضل عروض التسوق في ${countrySlug === 'eg' ? 'مصر' : 'السعودية'}`}
        </h1>
        <p className="text-gray-500 mt-2 font-bold">تسوق بذكاء ووفر أكثر مع أحدث العروض المضافة</p>
      </div>

      {/* ✅ 2. قسم نخبة المنتجات وبنر المقارنات المحدث */}
      {!brandFilter && pageProducts === 1 && (
        <>
          <div className="mt-8">
            <TopRatedSlider country={countrySlug === 'eg' ? 'egypt' : 'saudi'} />
          </div>

          {/* ✅ التصحيح النهائي للرابط ليطابق مسار مجلداتك المذكور */}
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
                    title="انتقل إلى مركز مقارنة المواصفات"
                    className="h-8 w-auto object-contain" 
                  />
                </div>

                <div className="bg-white/20 p-2 rounded-xl group-hover:rotate-12 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-black leading-tight">مركز مقارنة المواصفات</h2>
                  <p className="text-[10px] md:text-xs text-green-50 opacity-90 font-medium">قارن بين أفضل 6 منتجات في كل تصنيف</p>
                </div>
              </div>

              <div className="bg-white text-[#00A67E] px-5 py-2.5 rounded-xl font-black text-xs md:text-sm shadow-md whitespace-nowrap group-hover:scale-105 transition-transform relative z-10">
                فتح المقارنات
              </div>

              <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
            </Link>
          </div>
        </>
      )}

      <section className="max-w-7xl mx-auto p-6 mt-4">
        
        {/* 3. أزرار الفلاتر */}
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

          {brandsData?.map((brand) => (
            <Link
              key={brand.slug}
              href={`/${countrySlug}?brand=${brand.slug}`}
              className={`px-4 py-2 rounded-xl font-bold transition-all capitalize shadow-sm flex items-center gap-3 border ${
                brandFilter === brand.slug 
                ? "bg-green-600 text-white border-green-600 shadow-green-200" 
                : "bg-white text-gray-600 border-gray-100 hover:border-green-300"
              }`}
            >
              <div className="w-8 h-8 bg-white rounded-full p-1 flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm">
                <img 
                  src={brand.logo} 
                  alt={`ماركة ${brand.slug}`} 
                  title={brand.slug}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="hidden sm:inline">{brand.slug}</span>
            </Link>
          ))}
        </div>

        {/* 4. شبكة المنتجات الأحدث */}
        {finalProducts.length > 0 ? (
          <div className="grid !grid-cols-1 sm:!grid-cols-1 lg:!grid-cols-3 gap-8">
            {finalProducts.map((product) => (
              <ProductCard key={product.id} product={product} country={countrySlug} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[2rem] border border-gray-100 shadow-inner">
            <p className="text-gray-400 font-bold text-xl italic">لا توجد منتجات متوفرة حالياً</p>
          </div>
        )}

        {/* 5. الترقيم */}
        {productsTotalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <Pagination
              currentPage={pageProducts}
              totalPages={productsTotalPages}
              baseUrl={`/${countrySlug}?brand=${brandFilter || ""}&pageProducts=`}
            />
          </div>
        )}
      </section>

      {/* 6. قسم الأقسام */}
      <div className="bg-white py-16 border-y border-gray-100 my-16 shadow-inner">
        <div className="max-w-7xl mx-auto">
           <Categories /> 
        </div>
      </div>

      {/* 7. قسم المقالات */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <ArticlesSection countryCode={countrySlug} />
      </div>

    </main>
  )
}