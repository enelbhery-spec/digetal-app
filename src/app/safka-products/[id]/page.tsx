export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailsPage({
  params,
}: Props) {

  const { id } = await params;

  // جلب المنتج من قاعدة البيانات
  const { data: product, error } = await supabase
    .from("safka_products")
    .select("*")
    .eq("safka_id", id)
    .maybeSingle();

  console.log("ID:", id);
  console.log("PRODUCT:", product);
  console.log("ERROR:", error);

  // لو المنتج غير موجود
  if (error || !product) {
    return notFound();
  }

  // السعر الذي يظهر للمستخدم
  const finalPrice = Number(product?.price ?? 0);

  // السعر القديم الحقيقي
  const oldPrice = Number(product?.sale_price ?? 0);

  // نسبة الخصم
  const discount =
    oldPrice > finalPrice
      ? Math.round(
          ((oldPrice - finalPrice) / oldPrice) * 100
        )
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="grid lg:grid-cols-2 gap-10">

        {/* صورة المنتج */}
        <div className="bg-white rounded-[2rem] border border-slate-100 p-6 flex items-center justify-center shadow-sm">

          <img
            src={product.main_image || "/no-image.png"}
            alt={product.name || "منتج"}
            className="max-w-full max-h-[550px] object-contain"
          />

        </div>

        {/* التفاصيل */}
        <div dir="rtl">

          {/* اسم المنتج */}
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 leading-relaxed mb-6">
            {product.name}
          </h1>

          {/* كود المنتج */}
          {product.code && (
            <div className="mb-5">
              <span className="bg-orange-500 text-white text-sm font-bold px-4 py-2 rounded-xl">
                كود المنتج: {product.code}
              </span>
            </div>
          )}

          {/* السعر */}
          <div className="flex items-center gap-4 mb-8 flex-wrap">

            {/* السعر الحالي */}
            <span className="text-5xl font-black text-emerald-600">
              {finalPrice.toLocaleString()}
            </span>

            <span className="text-2xl font-bold text-slate-500">
              ج.م
            </span>

            {/* السعر القديم */}
            {oldPrice > finalPrice && (
              <span className="text-slate-400 line-through text-xl font-medium">
                {oldPrice.toLocaleString()} ج.م
              </span>
            )}

            {/* نسبة الخصم */}
            {discount > 0 && (
              <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
                خصم {discount}%
              </span>
            )}

          </div>

          {/* الوصف */}
          {product.description && (
            <div className="bg-white border border-slate-100 rounded-[2rem] p-6 leading-loose text-slate-700 text-[16px] shadow-sm mb-8">

              <h2 className="text-xl font-black mb-4 text-slate-900">
                تفاصيل المنتج
              </h2>

              <div
                dangerouslySetInnerHTML={{
                  __html: product.description,
                }}
              />

            </div>
          )}

          {/* زر الشراء */}
          <a
            //href={product.media_url || "#"}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="w-full bg-slate-950 hover:bg-emerald-600 text-white py-5 rounded-3xl text-center text-lg font-bold flex items-center justify-center transition-all active:scale-95"
          >
            شراء المنتج الآن
          </a>

        </div>

      </div>

    </div>
  );
}