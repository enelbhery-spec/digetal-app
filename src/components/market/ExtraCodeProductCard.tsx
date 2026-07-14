"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, ArrowLeft, Star, ShoppingBag, Play } from "lucide-react";

type Props = {
  product: any;
  country: string;
};

export default function ExtraCodeProductCard({ product, country }: Props) {
  const [showVideo, setShowVideo] = useState(false);

  const price = Number(product?.price) || 0;
  const oldPrice = Number(product?.old_price) || 0;
  const discount = oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  const currency = country === "sa" ? "ر.س" : "ج.م";
  const videoId = product?.video_id?.toString()?.trim();
  
  const safeSlug = product?.slug ? encodeURIComponent(product.slug.trim().replace(/\s+/g, "-")) : "";
  const rating = product?.rating || 5.0;
  const reviewsCount = product?.reviewsCount || 0;
  const productUrl = product?.product_url || "#";

  return (
    <>
      <div className="group relative flex flex-col h-full bg-white rounded-[2rem] border border-slate-100 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
        
        {/* الشارات */}
        <div className="absolute top-4 inset-x-4 z-30 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className="bg-emerald-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg w-fit shadow-sm">تريند ستور</span>
            {product?.product_code && (
              <div className="bg-[#FF7A00] text-white text-[11px] font-extrabold px-3 py-1.5 rounded-lg shadow-sm">
                # كود: {product.product_code}
              </div>
            )}
          </div>
          {discount > 0 && (
            <div className="bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg text-[12px]">
              -{discount}%
            </div>
          )}
        </div>

        {/* الصورة */}
        <div className="relative w-full h-80 bg-white flex items-center justify-center pt-16 px-4">
          <img
            src={product?.image_url || "/no-image.png"}
            alt={product?.title || "منتج"}
            loading="lazy"
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500"
          />
        </div>

        {/* التفاصيل */}
        <div className="p-6 flex flex-col flex-grow text-right" dir="rtl">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 h-14 mb-2 leading-relaxed">
            {product?.title}
          </h3>

          <div className="flex items-center justify-between mb-5 text-gray-500 text-sm font-medium border-b border-slate-50 pb-3">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Eye size={14} /> <span>{reviewsCount.toLocaleString()} مشاهدة</span>
            </div>
            <div className="flex items-center gap-1.5" dir="ltr">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-slate-600">({rating})</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl font-black text-slate-950">{price.toLocaleString()}</span>
            <span className="text-lg font-bold text-slate-600">{currency}</span>
            {oldPrice > price && (
              <span className="text-slate-400 line-through text-sm font-medium">{oldPrice.toLocaleString()} {currency}</span>
            )}
          </div>

          {/* الأزرار */}
          <div className="flex gap-2 mt-auto">
            <a href={productUrl} target="_blank" rel="nofollow noopener" className="flex-[2] bg-slate-950 hover:bg-emerald-600 text-white py-4 rounded-3xl text-center text-base font-bold flex items-center justify-center gap-2 transition-all">
              <ShoppingBag size={18} /> شاهد التفاصيل
            </a>

            {videoId && videoId.length > 5 && (
              <button onClick={() => setShowVideo(true)} className="flex-none w-14 py-4 rounded-3xl bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors">
                <Play size={20} fill="currentColor" />
              </button>
            )}

            <Link href={`/${country}/product/${safeSlug}`} className="flex-none w-14 bg-slate-50 text-slate-600 rounded-3xl flex items-center justify-center hover:bg-slate-100 border border-slate-100 transition-colors">
              <ArrowLeft size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Popup الفيديو */}
      {showVideo && videoId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={() => setShowVideo(false)}>
          <div className="relative w-full max-w-2xl bg-black rounded-3xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowVideo(false)} className="absolute top-4 right-4 z-50 bg-white/20 text-white p-2 rounded-full hover:bg-white/40">✕</button>
            <div className="aspect-video w-full">
              <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} allow="autoplay; encrypted-media" allowFullScreen title="Video" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}