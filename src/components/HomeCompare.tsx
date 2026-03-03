import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default async function HomeCompare() {

  const { data: products, error } = await supabase
    .from("products")
    .select("title, price, slug, image_url")
    .in("slug", ["iphone-17", "iphone-16"])

  if (error || !products || products.length < 2) return null

  const product1 = products.find(p => p.slug === "iphone-17")
  const product2 = products.find(p => p.slug === "iphone-16")

  if (!product1 || !product2) return null

  return (
    <section className="container mx-auto px-4 py-16" dir="rtl">

      <h2 className="text-3xl font-bold text-center mb-10">
        مقارنة بين {product1.title} و {product2.title}
      </h2>

      <div className="grid md:grid-cols-2 gap-8 mb-12">

        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <Image
            src={product1.image_url}
            alt={product1.title}
            width={250}
            height={250}
            className="mx-auto mb-4 object-contain"
          />
          <h3 className="text-xl font-semibold mb-2">
            {product1.title}
          </h3>
          <p className="text-green-600 font-bold text-lg mb-4">
            {product1.price} EGP
          </p>
          <Link
            href={`/product/${product1.slug}`}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg inline-block"
          >
            شراء الآن
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <Image
            src={product2.image_url}
            alt={product2.title}
            width={250}
            height={250}
            className="mx-auto mb-4 object-contain"
          />
          <h3 className="text-xl font-semibold mb-2">
            {product2.title}
          </h3>
          <p className="text-green-600 font-bold text-lg mb-4">
            {product2.price} EGP
          </p>
          <Link
            href={`/product/${product2.slug}`}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg inline-block"
          >
            شراء الآن
          </Link>
        </div>

      </div>

    </section>
  )
}