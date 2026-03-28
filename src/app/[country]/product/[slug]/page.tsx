import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { Metadata } from "next";
import ProductCard from "@/components/ProductCard";

type Props = {
  params: Promise<{ slug: string; country: string }>;
};

/* ======================
   SEO
====================== */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, country } = await params;

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
    title: `${product.title}   | أفضل سعر 2026`,
    description: `${product.description?.slice(0, 140)}  بأفضل سعر`,

    alternates: {
      canonical: `https://www.extracode.online/${country}/product/${slug}`,
    },

    openGraph: {
      title: `${product.title}`,
      description: product.description,
      images: [product.image_url],
      locale: "ar_EG",
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

  /* الدولة */
  const { data: countryData } = await supabase
    .from("countries")
    .select("id")
    .eq("code", country)
    .single();

  const countryId = countryData?.id;

  /* المنتج */
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
     منتجات مشابهة
  ====================== */
  let relatedProducts: any[] = [];

  if (product.category_id && countryId) {
    const { data } = await supabase
      .from("products")
      .select("id, slug, title, image_url, price, old_price")
      .eq("category_id", product.category_id)
      .eq("country_id", countryId)
      .neq("slug", slug)
      .limit(6);

    if (data) relatedProducts = data;
  }

  if (relatedProducts.length === 0 && countryId) {
    const { data } = await supabase
      .from("products")
      .select("id, slug, title, image_url, price, old_price")
      .eq("country_id", countryId)
      .neq("slug", slug)
      .limit(6);

    if (data) relatedProducts = data;
  }

  if (relatedProducts.length === 0) {
    const { data } = await supabase
      .from("products")
      .select("id, slug, title, image_url, price, old_price")
      .neq("slug", slug)
      .limit(6);

    relatedProducts = data || [];
  }

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

  return (
    <>
      {/* ======================
          Product Schema (SEO)
      ====================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                name: "ExtraCode",
                url: "https://www.extracode.online",
                inLanguage: "ar-EG",
                areaServed: {
                  "@type": "Country",
                  name: "Egypt"
                }
              },
              {
                "@type": "Product",
                name: product.title,
                image: product.image_url,
                description: product.description,
                sku: product.id,
                brand: {
                  "@type": "Brand",
                  name: "ExtraCode"
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: rating,
                  reviewCount: 20
                },
                offers: {
                  "@type": "Offer",
                  url: `https://www.extracode.online/${country}/product/${slug}`,
                  priceCurrency: "EGP",
                  price: product.price,
                  availability: "https://schema.org/InStock"
                }
              }
            ]
          })
        }}
      />

      <div className="max-w-6xl mx-auto p-6">

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
              className="rounded-xl shadow-lg object-contain"
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
                {product.price} 
              </span>

              {product.old_price && (
                <span className="text-gray-400 line-through text-lg">
                  {product.old_price} 
                </span>
              )}
            </div>

            <p className="text-gray-700 mb-6">
              {product.description} متوفر الآن بأفضل سعر.
            </p>

            {/* 🔥 التعديل هنا فقط */}
            <a
              href={`/api/redirect?id=${product.id}`}
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
            >
              مزيد من التفاصيل
            </a>

          </div>

        </div>

        <h2 className="text-xl font-bold mt-12 mb-6">
          منتجات مشابهة
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {relatedProducts.map((item: any) => (
            <ProductCard
              key={item.id}
              product={item}
              country={country}
            />
          ))}
        </div>

      </div>
    </>
  );
}