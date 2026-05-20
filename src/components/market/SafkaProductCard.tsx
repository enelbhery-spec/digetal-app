import React from "react";
import Link from "next/link";
import {
  Eye,
  ArrowLeft,
  Star,
  ShoppingBag,
} from "lucide-react";

export interface SafkaProduct {
  safka_id: string;
  name: string;
  price: number | null;

  // سعر قبل الخصم
  sale_price?: number | null;

  main_image: string | null;

  views?: number;
  rating?: number;

  // باركود المنتج
  barcode?: string;
}

interface SafkaProductCardProps {
  product: SafkaProduct;
}

export default function SafkaProductCard({
  product,
}: SafkaProductCardProps) {

  const {
    safka_id,
    name,
    main_image,
    views = 0,
    rating = 4,
    barcode,
  } = product;

  // السعر الحالي
  const price =
    Number(product?.price ?? 0);

  // السعر القديم
  const oldPrice =
    Number(product?.sale_price ?? 0);

  // نسبة الخصم
  const discount =
    oldPrice > price
      ? Math.round(
          ((oldPrice - price) / oldPrice) * 100
        )
      : 0;

  /**
   * IMPORTANT
   * صفقة لا تعمل بالـ barcode
   * الرابط الصحيح يعتمد على safka_id
   */
  const safkaProductUrl =
    safka_id
      ? `https://aff.safka-eg.com/product/${safka_id}`
      : "#";

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-[2rem] border border-slate-100 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">

      {/* الشارات */}
      <div className="absolute top-4 inset-x-4 z-30 flex justify-between items-start">

        <div className="flex flex-col gap-2">

          {/* شارة المتجر */}
          <span className="bg-emerald-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg w-fit shadow-sm">
            إكسترا كود ماركت
          </span>

          {/* كود المنتج */}
          {barcode && (
            <div className="bg-[#FF7A00] text-white text-[11px] font-extrabold px-3 py-1.5 rounded-lg shadow-sm">
              كود المنتج: {barcode}
            </div>
          )}

        </div>

        {/* الخصم */}
        {discount > 0 && (
          <div className="bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg text-[12px]">
            خصم {discount}%
          </div>
        )}

      </div>

      {/* الصورة */}
      <div className="relative w-full h-80 bg-white flex items-center justify-center pt-16 px-4">

        <img
          src={main_image || "/no-image.png"}
          alt={name || "منتج"}
          title={name || "منتج"}
          loading="lazy"
          decoding="async"
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500"
        />

      </div>

      {/* التفاصيل */}
      <div
        className="p-6 flex flex-col flex-grow text-right"
        dir="rtl"
      >

        {/* العنوان */}
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 h-14 mb-2 leading-relaxed group-hover:text-emerald-600 transition-colors">
          {name}
        </h3>

        {/* المشاهدات والتقييم */}
        <div className="flex items-center justify-between mb-5 text-gray-500 text-sm font-medium border-b border-slate-50 pb-3">

          {/* المشاهدات */}
          <div className="flex items-center gap-1.5 text-slate-500">

            <Eye
              size={14}
              className="text-slate-400"
            />

            <span>
              {views.toLocaleString()} مشاهدة
            </span>

          </div>

          {/* التقييم */}
          <div
            className="flex items-center gap-1.5"
            dir="ltr"
          >

            <div className="flex items-center">

              <Star
                size={12}
                className="fill-yellow-400 text-yellow-400"
              />

            </div>

            <span className="font-bold text-slate-600">
              ({rating})
            </span>

          </div>

        </div>

        {/* السعر */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">

          {/* السعر الحالي */}
          <span className="text-3xl font-black text-slate-950">
            {price.toLocaleString()}
          </span>

          <span className="text-lg font-bold text-slate-600">
            ج.م
          </span>

          {/* السعر القديم */}
          {oldPrice > price && (
            <span className="text-slate-400 line-through text-sm font-medium">
              {oldPrice.toLocaleString()} ج.م
            </span>
          )}

        </div>

        {/* الأزرار */}
        <div className="flex gap-3 mt-auto">

          {/* زر الشراء */}
          <a
            href={safkaProductUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-[3] py-4 rounded-3xl text-center text-base font-bold flex items-center justify-center gap-2.5 transition-all active:scale-95 shadow-sm ${
              safka_id
                ? "bg-slate-950 hover:bg-emerald-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
            }`}
          >

            <ShoppingBag size={18} />

            {safka_id
              ? "تسوق الآن"
              : "الرابط غير متوفر"}

          </a>

          {/* زر التفاصيل */}
          <Link
            href={`/eg/safka-products/${safka_id}`}
            className="flex-1 bg-slate-50 text-slate-600 py-4 rounded-3xl text-center hover:bg-slate-100 flex items-center justify-center transition-colors border border-slate-100"
          >

            <ArrowLeft size={20} />

          </Link>

        </div>

      </div>

    </div>
  );
}