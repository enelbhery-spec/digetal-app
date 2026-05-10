import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";

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

export default async function ProductPage({
  params,
}: Props) {

  const {
    slug,
    country,
  } = await params;

  const decodedSlug =
    decodeURIComponent(slug);

  // =====================================================
  // جلب المنتج
  // =====================================================

  const {
    data: product,
  } = await supabase
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
    (
      country === "sa" ||
      country === "saudi"
        ? "ر.س"
        : country === "ae"
        ? "د.إ"
        : "ج.م"
    );

  // =====================================================
  // الأسعار
  // =====================================================

  const price =
    Number(product?.price) || 0;

  const oldPrice =
    Number(product?.old_price) || 0;

  const hasDiscount =
    oldPrice > price;

  const discount =
    hasDiscount
      ? Math.round(
          (
            (oldPrice - price) /
            oldPrice
          ) * 100
        )
      : 0;

  return (
    <main
      className="max-w-7xl mx-auto px-3 py-4 md:px-4 md:py-6"
      dir="rtl"
    >

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
            src={
              product.image_url ||
              "/no-image.png"
            }
            alt={product.title}
            className="
              max-h-[250px]
              md:max-h-[350px]
              object-contain
            "
          />

        </div>

        {/* التفاصيل */}
        <div className="flex flex-col justify-center">

          {/* العنوان */}
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

          {/* السعر */}
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

          {/* الوصف */}
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

          {/* تنويه */}
          <p
            className="
              text-[11px] md:text-xs
              text-gray-500
              mb-6
              leading-relaxed
              bg-gray-50
              p-3
              rounded-lg
              border border-gray-100
            "
          >

            هذا الموقع يعمل بنظام
            التسويق بالعمولة،
            وقد نحصل على عمولة
            عند الشراء من خلال
            الروابط بدون أي
            تكلفة إضافية عليك.

          </p>

          {/* الأزرار */}
          <div
            className="
              flex flex-col
              md:flex-row
              gap-3
            "
          >

            {/* زر الشراء */}
            {product.affiliate_link && (
              <a
                href={
                  product.affiliate_link
                }
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                title="شراء المنتج"
                aria-label="شراء المنتج"
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

            {/* زر الرجوع */}
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
  );
}