"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  ShoppingBag,
  ArrowLeft,
  Star,
  Hash,
} from "lucide-react";

type Props = {
  product: any;
  country: string;
};

export default function ProductCard({
  product,
  country,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const productUrl =
    product?.affiliate_link ||
    product?.product_url ||
    "#";

  const brandSlug = (
    product?.brand_slug ||
    product?.brands?.slug ||
    ""
  )
    .toLowerCase()
    .trim();

  const brandLogo =
    product?.brands?.logo || "";

  const price = product.price || 0;
  const oldPrice = product.old_price || 0;

  const discount =
    oldPrice > price
      ? Math.round(
          ((oldPrice - price) / oldPrice) * 100
        )
      : 0;

  const currency =
    country === "sa" ? "ر.س" : "ج.م";

  const safeSlug = product?.slug
    ? encodeURIComponent(
        product.slug
          .trim()
          .replace(/\s+/g, "-")
      )
    : "";

  const activeCoupon =
    product.coupon_code || "AHSB";

  const videoId =
    product?.video_id?.trim();

  const offerNo = product?.offer_no;

  const handleCopy = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    navigator.clipboard.writeText(
      activeCoupon
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <div className="group relative flex flex-col h-full bg-white rounded-[2rem] border border-slate-100 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">

        {/* اللوجو + الخصم + كود المنتج */}
        <div className="absolute top-4 inset-x-4 z-30 flex justify-between items-start">

          <div className="flex flex-col gap-2">

            {brandLogo ? (
              <div className="bg-white p-1.5 rounded-xl shadow-sm border border-slate-50 w-fit">

                <img
                  src={brandLogo}
                  alt={brandSlug || "brand"}
                  title={`${brandSlug || "brand"} | تريند ستور `}
                  loading="lazy"
                  decoding="async"
                  className="w-8 h-8 object-contain"
                />

              </div>
            ) : (
              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded-lg w-fit">
                {brandSlug || "brand"}
              </span>
            )}

            {offerNo && (
              <div className="bg-orange-500 text-white text-[10px] font-extrabold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">

                <Hash size={12} />

                كود المنتج: {offerNo}

              </div>
            )}

          </div>

          {discount > 0 && (
            <div className="bg-red-500 text-white font-bold px-2 py-1 rounded-lg text-[11px]">
              -{discount}%
            </div>
          )}

        </div>

        {/* صورة المنتج */}
        <div className="relative w-full h-60 bg-white flex items-center justify-center p-6">

          <img
            src={
              product?.image_url ||
              "/no-image.png"
            }
            alt={
              product?.title || "منتج"
            }
            title={`${product?.title || "منتج"} | تريند ستور `}
            loading="lazy"
            decoding="async"
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500"
          />

        </div>

        <div
          className="p-5 flex flex-col flex-grow text-right"
          dir="rtl"
        >

          {/* العنوان */}
          <h3 className="text-[15px] font-bold text-gray-800 line-clamp-2 h-12 mb-1 leading-snug group-hover:text-emerald-600 transition-colors">

            {product?.title}

          </h3>

          {/* المشاهدات والتقييم */}
          <div className="flex items-center justify-between mb-4 text-gray-400 text-[11px] font-medium border-b border-slate-50 pb-2">

            <div className="flex items-center gap-1">

              <Eye
                size={12}
                className="text-slate-300"
              />

              <span>
                {product.reviewsCount || 0} مشاهدة
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
                      size={10}
                      className={
                        index <
                        Math.floor(
                          product.rating || 0
                        )
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-slate-100 text-slate-100"
                      }
                    />
                  )
                )}

              </div>

              <span className="font-bold text-slate-500">
                ({product.rating || "0"})
              </span>

            </div>

          </div>

          {/* السعر */}
          <div className="flex items-center gap-2 mb-4">

            <span className="text-2xl font-black text-slate-900">
              {price.toLocaleString()}
            </span>

            <span className="text-sm font-bold text-slate-500">
              {currency}
            </span>

            {oldPrice > price && (
              <span className="text-slate-300 line-through text-xs font-medium">
                {oldPrice.toLocaleString()}
              </span>
            )}

          </div>

          {/* تنويه الواتساب */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-2 mb-4">

            <p className="text-[14px] text-slate-500 text-center font-medium">

              أرسل كود المنتج{" "}

              <span className="text-orange-600 font-bold">
                {offerNo}
              </span>{" "}

              للواتساب للحصول على العرض

            </p>

          </div>

          {/* الأزرار */}
          <div className="flex gap-2 mt-auto">

            {productUrl !== "#" ? (
              <a
                href={productUrl}
                target="_blank"
                rel="nofollow sponsored"
                className="flex-[3] bg-slate-900 hover:bg-emerald-600 text-white py-3 rounded-2xl text-center text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
              >

                <ShoppingBag size={16} />

                تسوق الآن

              </a>
            ) : (
              <div className="flex-[3] bg-slate-100 text-slate-400 py-3 rounded-2xl text-center text-sm font-bold">
                غير متاح
              </div>
            )}

            <Link
              href={`/${country}/product/${safeSlug}`}
              className="flex-1 bg-slate-50 text-slate-600 py-3 rounded-2xl text-center hover:bg-slate-100 flex items-center justify-center transition-colors"
            >

              <ArrowLeft size={18} />

            </Link>

          </div>

        </div>

      </div>

      {/* Popup الفيديو */}
      {showVideo && videoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">

          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl relative border border-slate-100">

            <button
              onClick={() =>
                setShowVideo(false)
              }
              className="absolute top-4 left-4 z-10 bg-white/90 hover:bg-white text-slate-900 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            >
              ✕
            </button>

            <div className="p-5 text-center font-bold text-slate-800 border-b border-slate-50">
              مميزات المنتج
            </div>

            <div className="aspect-video">

              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                allowFullScreen
                loading="lazy"
                title={product?.title || "فيديو المنتج"}
              />

            </div>

          </div>

        </div>
      )}
    </>
  );
}