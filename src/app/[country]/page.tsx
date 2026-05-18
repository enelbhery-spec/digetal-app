import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ExtraCodeProductCard from "@/components/market/ExtraCodeProductCard" // ✅ كارت المتجر
import Pagination from "@/components/Pagination"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export const dynamic = "force-dynamic"

type Props = {
  params: Promise<{ country: string }>
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

interface DBProduct {
  id: string | number;
  description?: string;
  excerpt?: string;
  seo_description?: string;
  category_slug?: string;
  [key: string]: any;
}

const allowedCountries = ["eg", "sa"]

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
  const countryName = country === "sa" ? "السعودية" : "مصر"

  return {
    title: `متجر إكسترا كود الحصري في ${countryName}`,
    description: `أحدث المنتجات الحصرية والعروض المتميزة في ${countryName} من متجر إكسترا كود.`,
    alternates: {
      canonical: `https://www.extracode.online/${country}`,
    },
    openGraph: {
      title: `متجر إكسترا كود الحصري - أفضل العروض في ${countryName}`,
      description: `تسوق بذكاء ووفر أكثر مع أحدث منتجات متجر إكسترا كود الحصري.`,
      url: `https://www.extracode.online/${country}`,
      siteName: "إكسترا كود",
      locale: "ar_EG",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "إكسترا كود ماركت",
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
  const sParams = await searchParams

  const countrySlug = country.toLowerCase().trim()

  // 1. إدارة متغيرات الصفحة والفلتر
  const pageExtra = Number(sParams?.pageExtra) || 1
  const extraLimit = 9 

  const categoryFilter =
    typeof sParams?.category === "string"
      ? sParams.category
      : null

  /* ===================================================== */
  /* التحقق من الدولة */
  /* ===================================================== */

  if (!allowedCountries.includes(countrySlug)) {
    notFound()
  }

  const { data: countryData } = await supabase
    .from("countries")
    .select("id, name, code")
    .eq("code", countrySlug)
    .single()

  if (!countryData) {
    notFound()
  }

  /* ===================================================== */
  /* 🏷️ جلب التصنيفات النشطة ديناميكياً (التي تحتوي على منتجات فقط) */
  /* ===================================================== */
  
  // نطلب فقط حقل الـ category_slug لمنتجات المتجر في هذه الدولة
  const { data: activeProductsCats } = await supabase
    .from("products")
    .select("category_slug")
    .eq("code", countrySlug)
    .eq("brand_slug", "extracode")

  // استخراج القيم الفريدة (Unique Slugs) لمنع التكرار
  const activeCategorySlugs = Array.from(
    new Set((activeProductsCats || []).map((p) => p.category_slug).filter(Boolean))
  )

  // جلب بيانات التصنيفات الفعلية (العنوان والـ slug) مع الالتزام بـ title لعرض الاسم القديم
  let activeCategories: any[] = []
  if (activeCategorySlugs.length > 0) {
    const { data: catsData } = await supabase
      .from("categories")
      .select("id, title, slug") 
      .in("slug", activeCategorySlugs)
    
    activeCategories = catsData || []
  }

  /* ===================================================== */
  /* 🛍️ جلب منتجات متجر إكسترا كود الحصري */
  /* ===================================================== */
  
  let extracodeProducts: any[] = [];
  let extraTotalPages = 0;
  
  try {
    const extraFrom = (pageExtra - 1) * extraLimit;
    const extraTo = extraFrom + extraLimit - 1;

    let query = supabase
      .from("products") 
      .select("*", { count: "exact" }) 
      .eq("code", countrySlug) 
      .eq("brand_slug", "extracode")

    // إذا اختار المستخدم تصنيفاً معيناً، يتم الفلترة بناءً عليه
    if (categoryFilter) {
      query = query.eq("category_slug", categoryFilter)
    }

    const { data: ecProducts, error: ecError, count: ecCount } = await query
      .order("created_at", { ascending: false })
      .range(extraFrom, extraTo);

    if (ecError) {
      console.error("Supabase Error fetching ExtraCode Market products:", ecError.message);
    } else {
      extracodeProducts = (ecProducts as DBProduct[] || []).map((prod) => {
        const fallbackDescription = prod.description || prod.excerpt || prod.seo_description || "";
        return {
          ...prod,
          description: fallbackDescription,
          seo_description: fallbackDescription 
        };
      });
      extraTotalPages = Math.ceil((ecCount || 0) / extraLimit);
    }
  } catch (err) {
    console.error("Failed to load ExtraCode market section:", err);
  }

  return (
    <main className="bg-gray-50 min-h-screen pb-20" dir="rtl">

      {/* العنوان الرئيسي للمتجر */}
      <div className="max-w-7xl mx-auto px-6 pt-12 text-center">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
          🛍️ متجر إكسترا كود الحصري
        </h1>
        <p className="text-emerald-700 font-bold text-sm md:text-base mt-3 bg-emerald-50 inline-block px-6 py-2 rounded-2xl border border-emerald-100/60 shadow-sm">
          منتجات منتقاة بعناية في {countrySlug === "eg" ? "جمهورية مصر العربية" : "المملكة العربية السعودية"} • شحن سريع • الدفع عند الاستلام
        </p>
      </div>

      {/* 🗂️ قطاع التصنيفات النشطة ديناميكياً */}
      {activeCategories.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-10">
          <div className="flex gap-3 flex-wrap justify-center md:justify-start items-center">
            
            {/* زر "الكل" */}
            <Link
              href={`/${countrySlug}`}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all text-sm shadow-sm border ${
                !categoryFilter
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-emerald-100"
                  : "bg-white text-gray-600 border-gray-200/80 hover:bg-emerald-50/50"
              }`}
            >
              كل المنتجات
            </Link>

            {/* عرض التصنيفات التي تحتوي على منتجات فقط باستخدام cat.title */}
            {activeCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/${countrySlug}?category=${cat.slug}`}
                className={`px-5 py-2.5 rounded-xl font-bold transition-all text-sm shadow-sm border ${
                  categoryFilter === cat.slug
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-emerald-100"
                    : "bg-white text-gray-600 border-gray-200/80 hover:border-emerald-500/40 hover:text-emerald-700"
                }`}
              >
                {cat.title} 
              </Link>
            ))}

          </div>
        </div>
      )}

      {/* شبكة عرض منتجات إكسترا كود */}
      <section className="max-w-7xl mx-auto px-6 mt-8">
        
        {extracodeProducts.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6 text-gray-500 font-bold text-xs md:text-sm">
              <span>
                {categoryFilter 
                  ? `عرض منتجات قسم (${activeCategories.find(c => c.slug === categoryFilter)?.title || categoryFilter})` 
                  : "يعرض حالياً أحدث المنتجات المتاحة"}
              </span>
              <span className="bg-emerald-600 text-white px-3 py-1.5 rounded-xl text-xs shadow-sm">
                الصفحة {pageExtra} من {extraTotalPages}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {extracodeProducts.map((product) => (
                <ExtraCodeProductCard
                  key={product.id}
                  product={product}
                  country={countrySlug}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-24 bg-white rounded-[2rem] border border-gray-100 shadow-inner">
            <p className="text-gray-400 font-bold text-xl italic">
              لا توجد منتجات متوفرة حالياً في هذا القسم
            </p>
          </div>
        )}

        {/* العداد الحصري للمتجر */}
        {extraTotalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <Pagination
              currentPage={pageExtra}
              totalPages={extraTotalPages}
              baseUrl={`/${countrySlug}?category=${categoryFilter || ""}&pageExtra=`}
            />
          </div>
        )}

      </section>

    </main>
  )
}