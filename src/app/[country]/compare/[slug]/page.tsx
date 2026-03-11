import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

type Props = {
  params: Promise<{
    country: string
    slug: string
  }>
}

export default async function ComparePage({ params }: Props) {

  const { country, slug } = await params
  const cleanCountry = country.toLowerCase().trim()

  /* 1️⃣ جلب المقارنة */

  const { data: comparison, error: comparisonError } = await supabase
    .from("comparisons")
    .select("*")
    .eq("slug", slug)
    .eq("country", cleanCountry)
    .single()

  if (comparisonError || !comparison) {
    return (
      <div className="text-center py-20 text-xl">
        المقارنة غير موجودة
      </div>
    )
  }

  /* 2️⃣ جلب المنتجين */

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .in("slug", [comparison.product1_slug, comparison.product2_slug])

  if (productsError || !products || products.length < 2) {
    return (
      <div className="text-center py-20 text-xl">
        بيانات المنتجات غير مكتملة
      </div>
    )
  }

  const product1 = products.find(
    (p) => p.slug === comparison.product1_slug
  )

  const product2 = products.find(
    (p) => p.slug === comparison.product2_slug
  )

  if (!product1 || !product2) {
    return (
      <div className="text-center py-20 text-xl">
        خطأ في بيانات المقارنة
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10" dir="rtl">

      <h1 className="text-3xl font-bold text-center mb-10">
        مقارنة بين {product1.title} و {product2.title}
      </h1>

      {/* بطاقات المنتجات */}

      <div className="grid md:grid-cols-2 gap-8 mb-12">

        {[product1, product2].map((product) => (
          <div
            key={product.slug}
            className="bg-white shadow-lg rounded-2xl p-6 text-center border hover:shadow-xl transition"
          >

            <Image
              src={product.image_url || "/placeholder.png"}
              alt={product.title}
              width={250}
              height={250}
              className="mx-auto mb-4 object-contain"
            />

            <h2 className="text-xl font-semibold mb-2">
              {product.title}
            </h2>

            <p className="text-green-600 font-bold text-lg mb-4">
              {product.price}{" "}
              {cleanCountry === "eg"
                ? "EGP"
                : cleanCountry === "sa"
                ? "SAR"
                : ""}
            </p>

            <Link
              href={`/${cleanCountry}/product/${product.slug}`}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg inline-block transition"
            >
              عرض المنتج
            </Link>

          </div>
        ))}

      </div>

      {/* جدول المقارنة */}

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">

        <h3 className="text-xl font-bold text-center py-4 bg-gray-100">
          جدول المقارنة التفصيلي
        </h3>

        <table className="w-full text-center border-collapse">

          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">الميزة</th>
              <th className="p-3 border">{product1.title}</th>
              <th className="p-3 border">{product2.title}</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td className="p-3 border font-semibold">المعالج</td>
              <td className="p-3 border">{product1.processor || "-"}</td>
              <td className="p-3 border">{product2.processor || "-"}</td>
            </tr>

            <tr className="bg-gray-50">
              <td className="p-3 border font-semibold">الشاشة</td>
              <td className="p-3 border">{product1.screen || "-"}</td>
              <td className="p-3 border">{product2.screen || "-"}</td>
            </tr>

            <tr>
              <td className="p-3 border font-semibold">الكاميرا</td>
              <td className="p-3 border">{product1.camera || "-"}</td>
              <td className="p-3 border">{product2.camera || "-"}</td>
            </tr>

            <tr className="bg-gray-50">
              <td className="p-3 border font-semibold">البطارية</td>
              <td className="p-3 border">{product1.battery || "-"}</td>
              <td className="p-3 border">{product2.battery || "-"}</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  )
}