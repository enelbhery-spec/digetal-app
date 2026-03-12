import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductCard from "@/components/ProductCard"
import { supabase } from "@/lib/supabase"

type Props = {
  params: {
    country: string
  }
}

/* ================================
   الدول المسموحة
================================ */

const allowedCountries = ["eg", "sa"]

/* ================================
   SEO
================================ */

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const countrySlug = params.country.toLowerCase().trim()

  if (!allowedCountries.includes(countrySlug)) {
    return {
      title: "الصفحة غير موجودة"
    }
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

export default async function CountryPage({ params }: Props) {

  const countrySlug = params.country.toLowerCase().trim()

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
     جلب المنتجات
  ====================== */

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("country_id", countryData.id)
    .order("created_at", { ascending: false })
    .limit(12)

  /* ======================
     الصفحة
  ====================== */

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

        </div>

      </section>

      {/* المنتجات */}

      <section className="max-w-7xl mx-auto p-6">

        <h2 className="text-2xl font-bold mb-6 text-center">
          أحدث المنتجات
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products?.length ? (

            products.map((product: any) => (

              <ProductCard
                key={product.id}
                product={product}
                country={countrySlug}
              />

            ))

          ) : (

            <div className="col-span-4 text-center py-10 text-gray-500">
              لا توجد منتجات حالياً
            </div>

          )}

        </div>

      </section>

    </main>
  )
}