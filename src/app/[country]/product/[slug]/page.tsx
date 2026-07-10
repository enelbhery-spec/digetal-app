import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import Tracker from "@/components/Tracker"; // تم إضافة مكون التتبع

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  params: Promise<{
    slug: string;
    country: string;
  }>;
};

// =====================================================
// Metadata SEO
// =====================================================

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug, country } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", decodedSlug)
    .single();

  if (!product) {
    return {};
  }

  return {
    title: `${product.title} | تريند ستور `,
    description: product.description || product.title,
    alternates: {
      canonical: `https://www.extracode.online/${country}/product/${slug}`,
    },
    openGraph: {
      title: product.title,
      description: product.description || product.title,
      images: [
        {
          url: product.image_url || "/og-image.png",
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description || product.title,
      images: [product.image_url || "/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug, country } = await params;
  const decodedSlug = decodeURIComponent(slug);

  // =====================================================
  // جلب المنتج
  // =====================================================

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", decodedSlug)
    .single();

  if (!product) {
    return notFound();
  }

  // =====================================================
  // العملة
  // =====================================================

  const currency =
    product?.currency ||
    product?.country_currency ||
    (country === "sa" || country === "saudi"
      ? "ر.س"
      : country === "ae"
      ? "د.إ"
      : "ج.م");

  // =====================================================
  // الأسعار
  // =====================================================

  const price = Number(product?.price) || 0;
  const oldPrice = Number(product?.old_price) || 0;
  const hasDiscount = oldPrice > price;
  const discount = hasDiscount
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  // =====================================================
  // Product Schema
  // =====================================================

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: [product.image_url],
    description: product.description || product.title,
    sku: product.offer_no || product.id,
    brand: {
      "@type": "Brand",
      name: product?.brand_slug || "Extra Code",
    },
    offers: {
      "@type": "Offer",
      url: product.affiliate_link || product.product_url,
      priceCurrency:
        country === "sa" ? "SAR" : country === "ae" ? "AED" : "EGP",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating || 5,
      reviewCount: product.reviewsCount || 1,
    },
  };

  return (
    <>
      {/* Product Schema */}
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <main
        className="max-w-7xl mx-auto px-3 py-4 md:px-4 md:py-6"
        dir="rtl"
      >
        {/* مكون التتبع: يسجل زيارة صفحة المنتج */}
        <Tracker eventName="product_view" productId={product.id?.toString()} />

        <div
          className="
            bg-white
            rounded-2xl md:rounded-[2rem]
            shadow
            border border-gray-100
            p-4 md:p-10
            grid grid-cols-1 md:grid-cols-2
            gap-5 md:gap-10
          "
        >
          {/* الصورة */}
          <div
            className="
              bg-gray-50
              rounded-xl md:rounded-2xl
              flex items-center justify-center
              p-4 md:p-6
            "
          >
            <img
              src={product.image_url || "/no-image.png"}
              alt={product.title}
              title={`${product.title} | تريند ستور `}
              loading="lazy"
              decoding="async"
              className="
                max-h-[250px]
                md:max-h-[350px]
                object-contain
              "
            />
          </div>

          {/* التفاصيل */}
          <div className="flex flex-col justify-center">
            <h1
              className="
                text-lg md:text-3xl
                font-black
                text-gray-900
                mb-4 md:mb-6
                leading-snug
              "
            >
              {product.title}
            </h1>

            <div className="mb-4 md:mb-6">
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className="
                    text-2xl md:text-4xl
                    font-black
                    text-green-600
                  "
                >
                  {price.toLocaleString()} {currency}
                </span>

                {hasDiscount && (
                  <>
                    <span
                      className="
                        text-gray-400
                        line-through
                        text-lg
                      "
                    >
                      {oldPrice.toLocaleString()} {currency}
                    </span>
                    <span
                      className="
                        bg-red-100
                        text-red-600
                        px-3 py-1
                        rounded-full
                        text-sm
                        font-bold
                      "
                    >
                      خصم {discount}%
                    </span>
                  </>
                )}
              </div>
            </div>

            <p
              className="
                text-sm md:text-base
                text-gray-600
                leading-relaxed
                mb-5 md:mb-6
              "
            >
              {product.description}
            </p>

            <div
              className="
                flex flex-col
                md:flex-row
                gap-3
              "
            >
              {product.affiliate_link && (
                <a
                  href={product.affiliate_link}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  title={`شراء ${product.title}`}
                  aria-label={`شراء ${product.title}`}
                  // لإضافة تتبع عند الضغط على زر الشراء أيضاً
                  onClick={() => {
                    import("@/lib/analytics").then((a) => a.trackEvent("click_buy", product.id?.toString()));
                  }}
                  className="
                    w-full md:flex-1
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    py-3 md:py-4
                    rounded-xl
                    text-center
                    font-black
                    text-sm md:text-lg
                    transition-all
                  "
                >
                  تسوق عبر المتجر 🔥
                </a>
              )}

              <Link
                href={`/${country}`}
                title="العودة للرئيسية"
                aria-label="العودة للرئيسية"
                className="
                  w-full md:flex-1
                  border-2 border-gray-200
                  text-gray-600
                  py-3 md:py-4
                  rounded-xl
                  text-center
                  font-bold
                  hover:bg-gray-50
                  transition-all
                "
              >
                رجوع
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}