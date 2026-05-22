import BuyNowButton from "./BuyNowButton";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailsPage({
  params,
}: Props) {

  const { id } = await params;

  // =========================
  // جلب المنتج
  // =========================

  const { data: product, error } =
    await supabase
      .from("safka_products")
      .select(`
        id,
        safka_id,
        property_id,
        name,
        images_urls,
        description,
        price,
        sale_price,
        barcode
      `)
      .eq("safka_id", id)
      .single();

  // =========================
  // المنتج غير موجود
  // =========================

  if (error || !product) {
    notFound();
  }

  // =========================
  // الصور
  // =========================

  const images = Array.isArray(
    product.images_urls
  )
    ? product.images_urls
    : [];

  const mainImage =
    images[0] || "/no-image.png";

  // =========================
  // الأسعار
  // =========================

  const costPrice = Number(
    product.price ?? 0
  );

  const salePrice = Number(
    product.sale_price ?? 0
  );

  const finalPrice =
    salePrice > 0
      ? salePrice
      : costPrice;

  // =========================
  // الخصم
  // =========================

  const discount =
    costPrice > salePrice &&
    salePrice > 0
      ? Math.round(
          ((costPrice - salePrice) /
            costPrice) *
            100
        )
      : 0;

  return (

    <main className="min-h-screen bg-[#f5f5f5] py-5 sm:py-10 px-3 sm:px-4">

      <div className="max-w-7xl mx-auto">

        <div className="bg-white w-full rounded-[2rem] shadow-sm overflow-hidden border border-slate-100">

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-10 p-4 sm:p-6 lg:p-10">

            {/* الصورة */}
            <div
              className="
                relative
                bg-white
                rounded-[2rem]
                border
                border-slate-100
                overflow-hidden
                h-[320px]
                sm:h-[420px]
                lg:h-[550px]
                flex
                items-center
                justify-center
                order-1
                lg:order-2
              "
            >

              {/* الخصم */}
              {discount > 0 && (
                <div className="absolute top-5 left-5 z-20 bg-red-500 text-white text-sm font-black px-4 py-2 rounded-2xl shadow-lg">
                  خصم {discount}%
                </div>
              )}

              <img
                src={mainImage}
                alt={product.name || "product"}
                className="
                  w-full
                  h-full
                  object-contain
                  p-4
                  sm:p-8
                  transition-transform
                  duration-500
                  hover:scale-105
                "
              />

            </div>

            {/* البيانات */}
            <div
              className="
                flex
                flex-col
                order-2
                lg:order-1
              "
              dir="rtl"
            >

              {/* الشارات */}
              <div className="flex items-center gap-3 mb-5 flex-wrap">

                <span className="bg-emerald-600 text-white text-sm font-bold px-4 py-2 rounded-xl">
                  إكسترا كود ماركت
                </span>

                {product.barcode && (
                  <span className="bg-[#FF7A00] text-white text-sm font-bold px-4 py-2 rounded-xl">
                    كود:
                    {" "}
                    {product.barcode}
                  </span>
                )}

              </div>

              {/* الاسم */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 leading-relaxed mb-6">
                {product.name}
              </h1>

              {/* السعر */}
              <div className="flex items-center gap-4 flex-wrap mb-8">

                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950">
                  {finalPrice.toLocaleString()}
                </span>

                <span className="text-xl sm:text-2xl font-bold text-slate-600">
                  ج.م
                </span>

                {costPrice > salePrice &&
                  salePrice > 0 && (
                    <span className="text-slate-400 line-through text-lg sm:text-2xl">
                      {costPrice.toLocaleString()} ج.م
                    </span>
                  )}

              </div>

              {/* الوصف */}
              {product.description && (

                <div className="mb-8">

                  <h2 className="text-xl sm:text-2xl font-black mb-4 text-slate-900">
                    وصف المنتج
                  </h2>

                  <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4 sm:p-6">

                    <div
                      className="
                        prose
                        prose-sm
                        sm:prose-base
                        lg:prose-lg
                        max-w-none
                        text-right
                        leading-8
                        sm:leading-9
                      "
                      dangerouslySetInnerHTML={{
                        __html:
                          product.description,
                      }}
                    />

                  </div>

                </div>

              )}

              {/* زر الشراء */}
              <BuyNowButton
                productId={product.safka_id}
                propertyId={product.property_id}
                price={finalPrice}
              />

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}