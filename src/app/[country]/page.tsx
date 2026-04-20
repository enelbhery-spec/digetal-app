import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductCard from "@/components/ProductCard"
import Pagination from "@/components/Pagination"
import Categories from "@/app/[country]/Categories"
import { supabase } from "@/lib/supabase"
import ArticlesSection from '@/components/ArticlesSection'
import Link from "next/link"

export const dynamic = "force-dynamic"

type Props = {
  params: Promise<{ country: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const allowedCountries = ["eg", "sa"]

const allowedBrandsByCountry: Record<string, string[]> = {
  eg: ["amazon", "temu"],
  sa: ["noon"]
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

  /* ================= 2. جلب المنتجات (تعديل العدد والترتيب) ================= */
  const productsLimit = 9 // ✅ تم زيادة العدد إلى 9
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
    // عند اختيار براند معين، نظهر الأحدث أولاً
    query = query.order("created_at", { ascending: false })
  } else {
    // ✅ حل مشكلة التشويق: الترتيب العشوائي أو بكسر التتابع عبر ID
    // في Supabase لا يوجد random() مباشر بكفاءة، لذا نستخدم الترتيب بـ ID 
    // لضمان عدم تتابع المنتجات المضافة في نفس الدقيقة.
    query = query.order("id", { ascending: true }) 
  }

  const { data: products, count: productsCount } = await query
    .range(productsFrom, productsTo)

  // ✅ خطوة إضافية: بعثرة عشوائية للمنتجات المجلوبة في الصفحة الحالية فقط لزيادة التنوع
  const shuffledProducts = products ? [...products].sort(() => Math.random() - 0.5) : [];

  const productsTotalPages = Math.ceil((productsCount || 0) / productsLimit)

  return (
    <main className="bg-gray-50 min-h-screen pb-20" dir="rtl">

      {/* ✅ العنوان العلوي */}
      <div className="max-w-7xl mx-auto px-6 pt-10 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
           {brandFilter ? `عروض ماركة ${brandFilter.toUpperCase()}` : `أفضل عروض التسوق في ${countrySlug === 'eg' ? 'مصر' : 'السعودية'}`}
        </h1>
        <p className="text-gray-500 mt-2 font-bold">تسوق بذكاء ووفر أكثر مع عروضنا الحصرية</p>
      </div>

      <section className="max-w-7xl mx-auto p-6 mt-4">
        
        {/* ✅ أزرار الفلاتر المطورة */}
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
                  alt={brand.slug} 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="hidden sm:inline">{brand.slug}</span>
            </Link>
          ))}
        </div>

        {/* ✅ شبكة المنتجات (تستخدم المصفوفة المبعثرة) */}
        {shuffledProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {shuffledProducts.map((product) => (
              <ProductCard key={product.id} product={product} country={countrySlug} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[2rem] border border-gray-100 shadow-inner">
            <p className="text-gray-400 font-bold text-xl italic">لا توجد منتجات متوفرة حالياً</p>
          </div>
        )}

        {/* ✅ الترقيم */}
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

      {/* الأقسام والمقالات كما هي */}
      <div className="bg-white py-16 border-y border-gray-100 my-16 shadow-inner">
        <div className="max-w-7xl mx-auto">
           <Categories /> 
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-20">
        <ArticlesSection countryCode={countrySlug} />
      </div>

    </main>
  )
}