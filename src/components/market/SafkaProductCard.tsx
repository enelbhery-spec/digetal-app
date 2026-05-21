"use client";

import React from "react";
import Link from "next/link";

import {
  Eye,
  ArrowLeft,
  Star,
  ShoppingBag,
} from "lucide-react";

export interface SafkaProduct {
  safka_id?: string | null;

  name?: string | null;

  price?: number | null;

  sale_price?: number | null;

  main_image?: string | null;

  views?: number | null;

  rating?: number | null;

  barcode?: string | null;
}

interface SafkaProductCardProps {
  product: SafkaProduct;
}

export default function SafkaProductCard({
  product,
}: SafkaProductCardProps) {

  /**
   * ID المنتج
   */
  const safkaId =
    String(product?.safka_id || "").trim();

  /**
   * تحقق من ID
   */
  const hasValidId =
    safkaId.length > 5;

  /**
   * رابط التفاصيل
   */
  const detailsUrl =
    `/safka-products/${encodeURIComponent(
      safkaId
    )}`;

  /**
   * بيانات آمنة
   */
  const name =
    product?.name || "منتج بدون اسم";

  const mainImage =
    product?.main_image || "/no-image.png";

  const views =
    Number(product?.views ?? 0);

  const rating =
    Number(product?.rating ?? 4);

  const barcode =
    product?.barcode || "";

  /**
   * الأسعار
   */
  const price =
    Number(product?.price ?? 0);

  const oldPrice =
    Number(product?.sale_price ?? 0);

  /**
   * الخصم
   */
  const discount =
    oldPrice > price
      ? Math.round(
          ((oldPrice - price) / oldPrice) * 100
        )
      : 0;

  return (

    <article
      className="
        group
        relative
        flex
        flex-col
        h-full
        bg-white
        rounded-[2rem]
        border
        border-slate-100
        hover:border-emerald-500
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        overflow-hidden
      "
    >

      {/* الشارات */}
      <div className="absolute top-4 inset-x-4 z-30 flex justify-between items-start">

        <div className="flex flex-col gap-2">

          {/* المتجر */}
          <span className="bg-emerald-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg w-fit shadow-sm">
            إكسترا كود ماركت
          </span>

          {/* الباركود */}
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
      <div className="relative w-full h-80 bg-white flex items-center justify-center pt-16 px-4 overflow-hidden">

        <img
          src={mainImage}
          alt={name}
          title={name}
          loading="lazy"
          decoding="async"
          className="
            max-h-full
            max-w-full
            object-contain
            group-hover:scale-105
            transition
            duration-500
          "
        />

      </div>

      {/* المحتوى */}
      <div
        className="p-6 flex flex-col flex-grow text-right"
        dir="rtl"
      >

        {/* الاسم */}
        <h3
          className="
            text-lg
            font-bold
            text-gray-900
            line-clamp-2
            min-h-[56px]
            mb-2
            leading-relaxed
            group-hover:text-emerald-600
            transition-colors
          "
        >
          {name}
        </h3>

        {/* المشاهدات والتقييم */}
        <div className="flex items-center justify-between mb-5 text-gray-500 text-sm font-medium border-b border-slate-50 pb-3">

          <div className="flex items-center gap-1.5 text-slate-500">

            <Eye
              size={14}
              className="text-slate-400"
            />

            <span>
              {views.toLocaleString()} مشاهدة
            </span>

          </div>

          <div
            className="flex items-center gap-1.5"
            dir="ltr"
          >

            <Star
              size={12}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="font-bold text-slate-600">
              ({rating})
            </span>

          </div>

        </div>

        {/* السعر */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">

          <span className="text-3xl font-black text-slate-950">
            {price.toLocaleString()}
          </span>

          <span className="text-lg font-bold text-slate-600">
            ج.م
          </span>

          {oldPrice > price && (
            <span className="text-slate-400 line-through text-sm font-medium">
              {oldPrice.toLocaleString()} ج.م
            </span>
          )}

        </div>

        {/* الأزرار */}
        <div className="flex gap-3 mt-auto">

          {/* زر التسوق */}
          {hasValidId ? (

            <Link
              href={detailsUrl}
              prefetch={false}
              className="
                flex-[3]
                py-4
                rounded-3xl
                text-center
                text-base
                font-bold
                flex
                items-center
                justify-center
                gap-2.5
                transition-all
                active:scale-95
                shadow-sm
                bg-slate-950
                hover:bg-emerald-600
                text-white
              "
            >

              <ShoppingBag size={18} />

              تسوق الآن

            </Link>

          ) : (

            <div
              className="
                flex-[3]
                py-4
                rounded-3xl
                text-center
                text-base
                font-bold
                flex
                items-center
                justify-center
                gap-2.5
                bg-gray-200
                text-gray-500
                cursor-not-allowed
              "
            >

              <ShoppingBag size={18} />

              الرابط غير متوفر

            </div>

          )}

          {/* زر التفاصيل */}
          {hasValidId && (

            <Link
              href={detailsUrl}
              prefetch={false}
              className="
                flex-1
                bg-slate-50
                text-slate-600
                py-4
                rounded-3xl
                text-center
                hover:bg-slate-100
                flex
                items-center
                justify-center
                transition-colors
                border
                border-slate-100
              "
            >

              <ArrowLeft size={20} />

            </Link>

          )}

        </div>

      </div>

    </article>

  );

}