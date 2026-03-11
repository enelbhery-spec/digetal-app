import type { Metadata } from "next"
import ProductCard from "@/components/ProductCard"
import { supabase } from "@/lib/supabase"

type Props = {
  params: Promise<{
    country: string
    slug: string
  }>
}

/* ================================
   SEO
================================ */

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { slug } = await params

  const { data: category } = await supabase
    .from("categories")
    .select("title")
    .eq("slug", slug)
    .single()

  if (!category) {
    return {
      title: "التصنيف غير موجود",
      description: "هذا التصنيف غير متاح حالياً"
    }
  }

  return {
    title: `أفضل عروض ${category.title}`,
    description: `تصفح أفضل منتجات ${category.title} بأفضل الأسعار`
  }
}

/* ================================
   الصفحة
================================ */

export default async function CategoryPage({ params }: Props) {

  const { country, slug } = await params

  /* ======================
     جلب التصنيف
  ====================== */

  const { data: category } = await supabase
    .from("categories")
    .select("id,title")
    .eq("slug", slug)
    .single()

  if (!category) {
    return (
      <div className="p-10 text-center text-xl">
        التصنيف غير موجود
      </div>
    )
  }

  /* ======================
     جلب المنتجات
  ====================== */

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", category.id)
    .order("created_at", { ascending: false })

  /* ======================
     الصفحة
  ====================== */

  return (

    <main className="max-w-7xl mx-auto p-6" dir="rtl">

      <h1 className="text-3xl font-bold mb-8 text-center">
        {category.title}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products?.length ? (

          products.map((product: any) => (

            <ProductCard
              key={product.id}
              product={product}
              country={country}
            />

          ))

        ) : (

          <div className="col-span-4 text-center py-10 text-gray-500">
            لا توجد منتجات في هذا التصنيف
          </div>

        )}

      </div>

    </main>

  )
}