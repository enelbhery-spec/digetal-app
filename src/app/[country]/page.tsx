import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductCard from "@/components/ProductCard"
import Pagination from "@/components/Pagination"
import Categories from "@/app/[country]/Categories"
import { supabase } from "@/lib/supabase"
import ArticlesSection from '@/components/ArticlesSection'
import Link from "next/link"

type Props = {
  params: Promise<{ country: string }>
  searchParams?: Promise<{
    pageProducts?: string
    pageHotlines?: string
  }>
}

const allowedCountries = ["eg", "sa"]

export default async function CountryPage({ params, searchParams }: Props) {
  const { country } = await params
  const sParams = await searchParams
  
  const countrySlug = country.toLowerCase().trim()
  const pageProducts = Number(sParams?.pageProducts) || 1
  const pageHotlines = Number(sParams?.pageHotlines) || 1

  if (!allowedCountries.includes(countrySlug)) {
    notFound()
  }

  const { data: countryData } = await supabase
    .from("countries")
    .select("id,name,code")
    .eq("code", countrySlug)
    .single()

  if (!countryData) notFound()

  /* ======================
      جلب المنتجات
  ====================== */
  const productsLimit = 6
  const productsFrom = (pageProducts - 1) * productsLimit
  const productsTo = productsFrom + productsLimit - 1

  const { data: products, count: productsCount } = await supabase
    .from("products")
    .select("*", { count: "exact" })
    .eq("country_id", countryData.id)
    .order("created_at", { ascending: false })
    .range(productsFrom, productsTo)

  const productsTotalPages = Math.ceil((productsCount || 0) / productsLimit)

  /* ======================
      جلب الخطوط الساخنة
  ====================== */
  const hotlinesLimit = 6
  const hotlinesFrom = (pageHotlines - 1) * hotlinesLimit
  const hotlinesTo = hotlinesFrom + hotlinesLimit - 1

  const { data: hotlines, count: hotlinesCount } = await supabase
    .from("hotlines")
    .select("*", { count: "exact" })
    .eq("country_code", countrySlug) 
    .range(hotlinesFrom, hotlinesTo)

  const hotlinesTotalPages = Math.ceil((hotlinesCount || 0) / hotlinesLimit)

  return (
    <main className="bg-gray-50 min-h-screen" dir="rtl">
      {/* 1. الهيدر */}
      <section className="bg-white py-16 shadow-sm border-b">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h1 className="text-4xl font-black mb-4 text-gray-900">
            أفضل عروض {countryData.name}
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-bold">
            منصة اكسترا كود تضمن لك الوصول لأحدث كوبونات الخصم، المنتجات الرائجة، وأرقام الخدمات الحيوية.
          </p>
        </div>
      </section>

      {/* 2. المنتجات */}
      <section className="max-w-7xl mx-auto p-6 mt-12">
        <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black text-gray-900">⚡ أحدث المنتجات</h2>
            <div className="h-1 flex-1 mx-6 bg-gray-200/50 rounded-full hidden md:block"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products && products.length > 0 ? (
            products.map((product: any) => (
              <ProductCard
                key={product.id}
                product={product}
                country={countrySlug}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
              <p className="text-gray-400 font-bold">لا توجد منتجات متاحة حالياً لـ {countryData.name}</p>
            </div>
          )}
        </div>

        {productsTotalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={pageProducts}
              totalPages={productsTotalPages}
              baseUrl={`/${countrySlug}?pageHotlines=${pageHotlines}&pageProducts=`}
            />
          </div>
        )}
      </section>

      {/* 3. التصنيفات */}
      <div className="bg-white py-12 border-y border-gray-100 my-16">
         <Categories /> 
      </div>

      {/* 4. الخطوط الساخنة */}
      <section className="max-w-7xl mx-auto p-6 mb-16">
        <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black text-gray-900">📞 أرقام تهمك في {countryData.name}</h2>
            <div className="h-1 flex-1 mx-6 bg-gray-200/50 rounded-full hidden md:block"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotlines && hotlines.length > 0 ? (
            hotlines.map((item: any) => (
              <div key={item.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex justify-between items-center group hover:border-green-500 transition-all">
                <div>
                  <h3 className="font-black text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-green-600 font-black text-xl tracking-wider">{item.number}</p>
                </div>
                <div className="bg-gray-50 px-3 py-1 rounded-full text-xs text-gray-400 font-bold">
                  {item.category}
                </div>
              </div>
            ))
          ) : (
             <div className="col-span-full text-center py-10 bg-white rounded-3xl border border-dashed">
                <p className="text-gray-400 font-bold">لا توجد أرقام مسجلة حالياً.</p>
             </div>
          )}
        </div>

        {hotlinesTotalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={pageHotlines}
              totalPages={hotlinesTotalPages}
              baseUrl={`/${countrySlug}?pageProducts=${pageProducts}&pageHotlines=`}
            />
          </div>
        )}
      </section>

      {/* 5. قسم المقالات (تمت إضافته هنا ليكون فوق الفوتر) */}
      <ArticlesSection countryCode={countrySlug} />

    </main>
  )
}