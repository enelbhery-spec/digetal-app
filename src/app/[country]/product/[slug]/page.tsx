import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  description: string;
  image_url: string;
  price?: number;
  old_price?: number;
  rating?: number;
  currency?: string;
  product_url: string;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; country: string }>;
}) {

  const { slug } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!product) {
    return (
      <div className="text-center p-10 text-xl">
        المنتج غير موجود
      </div>
    );
  }

  const discount =
    product.old_price && product.price
      ? Math.round(
          ((product.old_price - product.price) / product.old_price) * 100
        )
      : 0;

  const rating = product.rating || 4.5;

  // ⭐ Product Schema لجوجل
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.image_url,
    description: product.description,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      reviewCount: 120,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency || "EGP",
      availability: "https://schema.org/InStock",
      url: product.product_url,
    },
  };

  return (
    <>
      {/* Schema لجوجل */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10 items-center">

        {/* صورة المنتج */}
        <div className="relative flex justify-center">

          {discount > 0 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
              -{discount}%
            </div>
          )}

          <Image
            src={product.image_url}
            alt={product.title}
            width={450}
            height={450}
            className="rounded-xl shadow-lg"
          />

        </div>

        {/* تفاصيل المنتج */}
        <div>

          {/* العنوان */}
          <h1 className="text-2xl font-bold mb-3 leading-relaxed">
            {product.title}
          </h1>

          {/* التقييم */}
          <div className="flex items-center gap-2 text-yellow-500 mb-4">
            {"⭐".repeat(Math.round(rating))}
            <span className="text-gray-600 text-sm">
              {rating} / 5
            </span>
          </div>

          {/* السعر */}
          <div className="flex items-center gap-4 mb-5">

            <span className="text-3xl font-bold text-green-600">
              {product.price} {product.currency}
            </span>

            {product.old_price && (
              <span className="text-gray-400 line-through text-lg">
                {product.old_price}
              </span>
            )}

          </div>

          {/* الوصف */}
          <p className="text-gray-700 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* زر الشراء */}
          <a
            href={product.product_url}
            target="_blank"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg"
          >
            مشاهدة المنتج
          </a>

        </div>

      </div>
    </>
  );
}