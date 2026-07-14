"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, ArrowLeft, Star, ShoppingBag, Play } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  const [showVideo, setShowVideo] = useState(false);

  // طباعة بيانات المنتج للتأكد من وصولها (افتح الكونسول F12)
  useEffect(() => {
    console.log("Current Product Object:", product);
  }, [product]);

  // تجهيز القيم بشكل آمن
  const slug = product?.slug || String(product?.id || "");
  const videoId = product?.video_id?.toString()?.trim();
  const detailsUrl = `/products/${slug}`;
  const title = product?.title || "منتج بدون اسم";
  const image = product?.image_url || "/no-image.png";
  const code = product?.code;

  const currentPrice = Number(product?.price || 0);
  const oldPrice = Number(product?.old_price || 0);
  const discount = oldPrice > currentPrice && oldPrice > 0 
    ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100) 
    : 0;

  return (
    <>
      <article className="group relative flex flex-col h-full bg-white rounded-[2rem] border border-slate-100 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
        
        {/* الشارات */}
        <div className="absolute top-4 inset-x-4 z-30 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className="bg-emerald-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg w-fit shadow-sm">متجر</span>
            {code && (
              <span className="bg-[#FF7A00] text-white text-[11px] font-extrabold px-3 py-1.5 rounded-lg shadow-sm w-fit">
                كود: {code}
              </span>
            )}
          </div>
          {discount > 0 && (
            <div className="bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg text-[12px]">
              خصم {discount}%
            </div>
          )}
        </div>

        {/* الصورة */}
        <div className="relative w-full h-80 bg-white flex items-center justify-center pt-16 px-4 overflow-hidden">
          <img src={image} alt={title} loading="lazy" className="max-h-full object-contain group-hover:scale-105 transition duration-500" />
        </div>

        {/* المحتوى */}
        <div className="p-6 flex flex-col flex-grow text-right" dir="rtl">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 min-h-[56px] mb-4 leading-relaxed">
            {title}
          </h3>

          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <span className="text-3xl font-black text-slate-950">{currentPrice.toLocaleString()}</span>
            <span className="text-lg font-bold text-slate-600">ج.م</span>
          </div>

          {/* الأزرار */}
          <div className="flex gap-2 mt-auto">
            <Link href={detailsUrl} className="flex-[2] py-4 rounded-3xl text-center text-base font-bold bg-slate-950 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 transition-all">
              <ShoppingBag size={18} /> شراء الآن
            </Link>

            {videoId && videoId.length > 5 && (
              <button
                type="button"
                onClick={() => setShowVideo(true)}
                className="flex-none w-14 py-4 rounded-3xl bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <Play size={20} fill="currentColor" />
              </button>
            )}

            <Link href={detailsUrl} className="flex-none w-14 bg-slate-50 text-slate-600 rounded-3xl flex items-center justify-center hover:bg-slate-100 border border-slate-100 transition-colors">
              <ArrowLeft size={20} />
            </Link>
          </div>
        </div>
      </article>

      {/* Popup الفيديو - تم تعديل الزر ليصبح أكثر استجابة */}
      {showVideo && videoId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={() => setShowVideo(false)}>
          <div className="relative w-full max-w-2xl bg-black rounded-3xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowVideo(false)} 
              className="absolute top-4 right-4 z-50 bg-white/20 text-white p-2 rounded-full hover:bg-white/40"
            >
              ✕
            </button>
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full" 
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} 
                allow="autoplay; encrypted-media" 
                allowFullScreen 
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}