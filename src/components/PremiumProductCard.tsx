"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Eye,
  ShoppingBag,
  ArrowLeft,
  Star,
  Hash,
  GitCompare,
} from "lucide-react";

import { useCompare } from "@/context/CompareContext";

type Props = {
  product?: any;
  country: string;
};

export default function PremiumProductCard({
  product,
  country,
}: Props) {

  if (!product) return null;

  const [showVideo, setShowVideo] =
    useState(false);

  const { add, items } =
    useCompare();

  // =====================================================
  // رابط المنتج
  // =====================================================

  const productUrl =
    product?.affiliate_link ||
    product?.product_url ||
    "#";

  // =====================================================
  // بيانات البراند
  // =====================================================

  const brandSlug = (
    product?.brand_slug ||
    product?.brands?.slug ||
    ""
  )
    .toLowerCase()
    .trim();

  const brandLogo =
    product?.brands?.logo || "";

  // =====================================================
  // الأسعار
  // =====================================================

  const price =
    Number(product?.price) || 0;

  const oldPrice =
    Number(product?.old_price) || 0;

  const discount =
    oldPrice > price
      ? Math.round(
          ((oldPrice - price) /
            oldPrice) *
            100
        )
      : 0;

  // =====================================================
  // العملة
  // =====================================================

  const currency =
    product?.currency ||
    product?.country_currency ||
    (country === "sa"
      ? "ر.س"
      : country === "ae"
      ? "د.إ"
      : "ج.م");

  // =====================================================
  // slug
  // =====================================================

  const safeSlug = product?.slug
    ? encodeURIComponent(
        product.slug
          .trim()
          .replace(/\s+/g, "-")
      )
    : "";

  // =====================================================
  // فيديو
  // =====================================================

  const videoId =
    product?.video_id?.trim();

  // =====================================================
  // كود المنتج
  // =====================================================

  const offerNo =
    product?.offer_no;

  // =====================================================
  // المقارنة
  // =====================================================

  const isAdded = items.some(
    (i) => i.id === product.id
  );

  const handleCompare = () => {

    add({
      id: product.id,
      title: product.title,
      slug: product.slug,
      image_url: product.image_url,
      price: product.price,
      category_slug:
        product.category_slug,
    });
  };

  return (
    <>
      {/* الكارت */}
      <div className="group relative flex flex-col h-full overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:border-emerald-500 hover:shadow-2xl">

        {/* الهيدر */}
        <div className="absolute inset-x-4 top-4 z-30 flex items-start justify-between">

          <div className="flex flex-col gap-2">

            {brandLogo ? (
              <div className="w-fit rounded-xl border border-slate-100 bg-white p-1.5 shadow-sm">

                <img
                  src={brandLogo}
                  alt={
                    brandSlug ||
                    "brand"
                  }
                  title={`${brandSlug || "brand"} | تريند ستور `}
                  loading="lazy"
                  decoding="async"
                  className="h-8 w-8 object-contain"
                />

              </div>
            ) : (
              <span className="w-fit rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">

                {brandSlug ||
                  "brand"}

              </span>
            )}

            {offerNo && (
              <div className="flex w-fit items-center gap-1 rounded-xl bg-orange-500 px-3 py-1 text-[13px] font-extrabold text-white shadow-sm">

                <Hash size={12} />

                كود المنتج:
                {offerNo}

              </div>
            )}

          </div>

          {discount > 0 && (
            <div className="rounded-xl bg-red-500 px-3 py-1 text-[12px] font-bold text-white shadow">

              خصم {discount}%

            </div>
          )}

        </div>

        {/* الصورة */}
        <div className="relative flex h-60 w-full items-center justify-center overflow-hidden bg-white p-6">

          <img
            src={
              product?.image_url ||
              "/no-image.png"
            }
            alt={
              product?.title ||
              "منتج"
            }
            title={`${product?.title || "منتج"} | تريند ستور `}
            loading="lazy"
            decoding="async"
            className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105"
          />

        </div>

        {/* المحتوى */}
        <div
          className="flex flex-grow flex-col p-5 text-right"
          dir="rtl"
        >

          {/* العنوان */}
          <h3 className="min-h-[52px] text-[15px] font-bold leading-snug text-slate-800 transition-colors group-hover:text-emerald-600 line-clamp-2">

            {product?.title}

          </h3>

          {/* التقييم */}
          <div className="mt-3 mb-4 flex items-center justify-between border-b border-slate-100 pb-3 text-[11px] font-medium text-gray-400">

            <div className="flex items-center gap-1">

              <Eye
                size={13}
                className="text-slate-300"
              />

              <span>
                {Number(
                  product?.reviewsCount || 0
                ).toLocaleString()} مشاهدة
              </span>

            </div>

            <div
              className="flex items-center gap-1"
              dir="ltr"
            >

              <div className="flex items-center">

                {[...Array(5)].map(
                  (_, index) => (
                    <Star
                      key={index}
                      size={11}
                      className={
                        index <
                        Math.floor(
                          product?.rating || 0
                        )
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-slate-200 text-slate-200"
                      }
                    />
                  )
                )}

              </div>

              <span className="font-bold text-slate-500">

                (
                {product?.rating || "0"}
                )

              </span>

            </div>

          </div>

          {/* السعر */}
          <div className="mb-4 flex items-end gap-2">

            <span className="text-3xl font-black text-slate-900">

              {price.toLocaleString()}

            </span>

            <span className="mb-1 text-sm font-bold text-slate-500">

              {currency}

            </span>

            {oldPrice > price && (
              <span className="mb-1 text-sm text-slate-300 line-through">

                {oldPrice.toLocaleString()}

              </span>
            )}

          </div>

          {/* كود المنتج */}
          {offerNo && (
            <div className="mb-5 rounded-2xl border border-slate-100 bg-slate-50 p-3">

              <p className="text-center text-[13px] font-medium leading-loose text-slate-600">

                أرسل كود المنتج{" "}

                <span className="font-extrabold text-orange-600">

                  {offerNo}

                </span>{" "}

                للواتساب للحصول على العرض

              </p>

            </div>
          )}

          {/* الأزرار */}
          <div className="mt-auto flex gap-2">

            {/* شراء */}
            {productUrl !== "#" ? (
              <a
                href={productUrl}
                target="_blank"
                rel="nofollow sponsored"
                title={`شراء ${product?.title || "المنتج"}`}
                aria-label={`شراء ${product?.title || "المنتج"}`}
                className="flex-[2.5] active:scale-95 rounded-2xl bg-slate-900 py-3 text-center text-sm font-bold text-white transition-all hover:bg-emerald-600 flex items-center justify-center gap-2"
              >

                <ShoppingBag size={16} />

                تسوق

              </a>
            ) : (
              <div className="flex-[2.5] rounded-2xl bg-slate-100 py-3 text-center text-sm font-bold text-slate-400">

                غير متاح

              </div>
            )}

            {/* مقارنة */}
            <button
              onClick={handleCompare}
              title="إضافة للمقارنة"
              aria-label="إضافة المنتج للمقارنة"
              className={`flex-1 rounded-2xl py-3 flex items-center justify-center transition-all ${
                isAdded
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-orange-50 text-orange-600 hover:bg-orange-100"
              }`}
            >

              <GitCompare size={18} />

            </button>

            {/* التفاصيل */}
            <Link
              href={`/${country}/product/${safeSlug}`}
              title={`عرض تفاصيل ${product?.title || "المنتج"}`}
              aria-label={`عرض تفاصيل ${product?.title || "المنتج"}`}
              className="flex-1 rounded-2xl bg-slate-50 py-3 text-slate-600 transition-all hover:bg-slate-100 flex items-center justify-center"
            >

              <ArrowLeft size={18} />

            </Link>

          </div>

        </div>
      </div>

      {/* الفيديو */}
      {showVideo &&
        videoId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">

            <div className="relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-2xl">

              {/* إغلاق */}
              <button
                onClick={() =>
                  setShowVideo(false)
                }
                title="إغلاق الفيديو"
                aria-label="إغلاق الفيديو"
                className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition-transform hover:scale-110 hover:bg-white"
              >
                ✕

              </button>

              {/* العنوان */}
              <div className="border-b border-slate-100 p-5 text-center font-bold text-slate-800">

                مميزات المنتج

              </div>

              {/* الفيديو */}
              <div className="aspect-video">

                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  allowFullScreen
                  loading="lazy"
                  title={`${product?.title || "المنتج"} - فيديو شرح`}
                />

              </div>

            </div>

          </div>
        )}
    </>
  );
}