import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

type PageProps = {
  params: Promise<{
    country: string
    slug: string
  }>
}

export default async function ComparePage({ params }: PageProps) {

  // ✅ مهم جدًا في Next 15
  const { country } = await params

  const { data: products, error } = await supabase
    .from("products")
    .select("title, price, slug, image_url")
    .in("slug", ["iphone-17", "iphone-16"])

  if (error || !products || products.length < 2) {
    return (
      <div className="text-center py-20">
        المنتجات غير موجودة
      </div>
    )
  }

  const product1 = products.find(p => p.slug === "iphone-17")
  const product2 = products.find(p => p.slug === "iphone-16")

  if (!product1 || !product2) {
    return (
      <div className="text-center py-20">
        بيانات غير مكتملة
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10" dir="rtl">

      <h1 className="text-3xl font-bold text-center mb-10">
        مقارنة بين {product1.title} و {product2.title}
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">

        {/* المنتج الأول */}
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <Image
            src={product1.image_url || "/placeholder.png"}
            alt={product1.title}
            width={250}
            height={250}
            className="mx-auto mb-4 object-contain"
            priority
          />

          <h2 className="text-xl font-semibold mb-2">
            {product1.title}
          </h2>

          <p className="text-green-600 font-bold text-lg mb-4">
            {product1.price} {country === "eg" ? "EGP" : "SAR"}
          </p>

          <Link
            href={`/${country}/product/${product1.slug}`}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg inline-block"
          >
            شراء الآن
          </Link>
        </div>

        {/* المنتج الثاني */}
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <Image
            src={product2.image_url || "/placeholder.png"}
            alt={product2.title}
            width={250}
            height={250}
            className="mx-auto mb-4 object-contain"
          />

          <h2 className="text-xl font-semibold mb-2">
            {product2.title}
          </h2>

          <p className="text-green-600 font-bold text-lg mb-4">
            {product2.price} {country === "eg" ? "EGP" : "SAR"}
          </p>

          <Link
            href={`/${country}/product/${product2.slug}`}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg inline-block"
          >
            شراء الآن
          </Link>
        </div>

      </div>

      {/* جدول المقارنة */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden mb-12">

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
              <td className="p-3 border">A19 Bionic</td>
              <td className="p-3 border">A18 Bionic</td>
            </tr>

            <tr className="bg-gray-50">
              <td className="p-3 border font-semibold">الشاشة</td>
              <td className="p-3 border">6.7 بوصة OLED 120Hz</td>
              <td className="p-3 border">6.5 بوصة OLED 60Hz</td>
            </tr>

            <tr>
              <td className="p-3 border font-semibold">الكاميرا</td>
              <td className="p-3 border">48MP + تحسين تصوير ليلي</td>
              <td className="p-3 border">48MP</td>
            </tr>

            <tr className="bg-gray-50">
              <td className="p-3 border font-semibold">البطارية</td>
              <td className="p-3 border">أطول بـ 3 ساعات</td>
              <td className="p-3 border">عادية</td>
            </tr>

            <tr>
              <td className="p-3 border font-semibold">السعر</td>
              <td className="p-3 border text-green-600 font-bold">
                {product1.price} {country === "eg" ? "EGP" : "SAR"}
              </td>
              <td className="p-3 border text-green-600 font-bold">
                {product2.price} {country === "eg" ? "EGP" : "SAR"}
              </td>
            </tr>
          </tbody>

        </table>
      </div>

    </div>
  )
}