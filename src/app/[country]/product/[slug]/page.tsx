import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string; country: string }>;
};

/* ======================
   SEO
====================== */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: product } = await supabase
    .from("products")
    .select("title, description, image_url")
    .eq("slug", slug)
    .single();

  if (!product) {
    return { title: "المنتج غير موجود" };
  }

  return {
    title: `${product.title} | أفضل سعر`,
    description: product.description?.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image_url],
    },
  };
}

/* ======================
   الصفحة
====================== */
export default async function ProductPage({ params }: Props) {
  const { slug, country } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  /* ======================
     1️⃣ تحويل الدولة إلى ID
  ====================== */
  const { data: countryData } = await supabase
    .from("countries")
    .select("id")
    .eq("code", country)
    .single();

  const countryId = countryData?.id;

  /* ======================
     المنتج
  ====================== */
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

  /* ======================
     منتجات مشابهة (صح 100%)
  ====================== */
  let relatedProducts: any[] = [];

  if (product.category_id && countryId) {
    const { data } = await supabase
      .from("products")
      .select("id, slug, title, image_url")
      .eq("category_id", product.category_id)
      .eq("country_id", countryId)
      .neq("slug", slug)
      .limit(6);

    if (data) relatedProducts = data;
  }

  // fallback نفس الدولة فقط
  if (relatedProducts.length === 0 && countryId) {
    const { data } = await supabase
      .from("products")
      .select("id, slug, title, image_url")
      .eq("country_id", countryId)
      .neq("slug", slug)
      .limit(6);

    if (data) relatedProducts = data;
  }

  // fallback نهائي
  if (relatedProducts.length === 0) {
    const { data } = await supabase
      .from("products")
      .select("id, slug, title, image_url")
      .neq("slug", slug)
      .limit(6);

    relatedProducts = data || [];
  }

  /* ======================
     مقالات
  ====================== */
  const { data: relatedArticles } = await supabase
    .from("articles")
    .select("title, slug")
    .limit(4);

  /* ======================
     حسابات
  ====================== */
  const discount =
    product.old_price && product.price
      ? Math.round(
          ((product.old_price - product.price) / product.old_price) * 100
        )
      : 0;

  const rating = product.rating || 4.5;

  /* ======================
     Schema
  ====================== */
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.image_url,
    description: product.description,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <div className="max-w-6xl mx-auto p-6">

        {/* المنتج */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

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

          <div>
            <h1 className="text-2xl font-bold mb-3">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 text-yellow-500 mb-4">
              {"⭐".repeat(Math.round(rating))}
              <span className="text-gray-600 text-sm">
                {rating} / 5
              </span>
            </div>

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

            <p className="text-gray-700 mb-6">
              {product.description}
            </p>

            <a
              href={product.product_url}
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
            >
              مشاهدة المنتج
            </a>
          </div>

        </div>

        {/* منتجات مشابهة */}
        <h2 className="text-xl font-bold mt-12 mb-6">
          منتجات مشابهة
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {relatedProducts.map((item: any) => (
            <Link key={item.slug} href={`/${country}/product/${item.slug}`}>
              <div className="border p-3 rounded hover:shadow transition">

                <img
                  src={item.image_url}
                  className="w-full h-32 object-cover rounded"
                />

                <p className="text-sm mt-2 line-clamp-2">
                  {item.title}
                </p>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </>
  );
}