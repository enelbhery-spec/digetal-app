"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Eye,
  ArrowLeft,
  Star,
  ShoppingBag,
  Play,
} from "lucide-react";

export interface SafkaProduct {
  safka_id?: string | null;
  name?: string | null;
  price?: number | null;
  sale_price?: number | null;
  main_image?: string | null;
  barcode?: string | null;
  description?: string | null;
  note?: string | null;
  video_id?: string | null;
}

interface SafkaProductCardProps {
  product: SafkaProduct;
}

export default function SafkaProductCard({ product }: SafkaProductCardProps) {
  const [showVideo, setShowVideo] = useState(false);

  const safkaId = String(product?.safka_id || "").trim();
  const videoId = product?.video_id?.trim();
  const detailsUrl = `/safka-products/${encodeURIComponent(safkaId)}`;
  const name = product?.name || "منتج بدون اسم";
  const mainImage = product?.main_image || "/no-image.png";
  const barcode = product?.barcode || "";

  const costPrice = Number(product?.price ?? 0);
  const salePrice = Number(product?.sale_price ?? 0);
  const finalPrice = salePrice > 0 ? salePrice : costPrice;
  const oldPrice = costPrice > salePrice ? costPrice : 0;
  const discount = oldPrice > finalPrice ? Math.round(((oldPrice - finalPrice) / oldPrice) * 100) : 0;

  return (
    <>
      <article className="group relative flex flex-col h-full bg-white rounded-[2rem] border border-slate-100 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
        
        {/* الشارات */}
        <div className="absolute top-4 inset-x-4 z-30 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className="bg-emerald-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg w-fit shadow-sm">تريند ستور</span>
            {barcode && (
              <div className="bg-[#FF7A00] text-white text-[11px] font-extrabold px-3 py-1.5 rounded-lg shadow-sm">
                كود: {barcode}
              </div>
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
          <img src={mainImage} alt={name} loading="lazy" className="max-h-full object-contain group-hover:scale-105 transition duration-500" />
          <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm">
            <Eye size={14} />
            <span className="text-xs font-bold">2.4k</span>
          </div>
        </div>

        {/* المحتوى */}
        <div className="p-6 flex flex-col flex-grow text-right" dir="rtl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={16} fill="currentColor" />
              <span className="text-sm font-bold">4.9</span>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 min-h-[56px] mb-4 leading-relaxed">
            {name}
          </h3>

          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <span className="text-3xl font-black text-slate-950">{finalPrice.toLocaleString()}</span>
            <span className="text-lg font-bold text-slate-600">ج.م</span>
            {oldPrice > 0 && (
              <span className="text-slate-400 line-through text-sm font-medium">{oldPrice.toLocaleString()} ج.م</span>
            )}
          </div>

          {/* الأزرار */}
          <div className="flex gap-2 mt-auto">
            <Link href={detailsUrl} prefetch={false} className="flex-[2] py-4 rounded-3xl text-center text-base font-bold bg-slate-950 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 transition-all">
              <ShoppingBag size={18} /> شاهد التفاصيل 
            </Link>

            {videoId && (
              <button
                onClick={() => setShowVideo(true)}
                aria-label="مشاهدة فيديو المنتج"
                className="flex-none w-14 py-4 rounded-3xl bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <Play size={20} fill="currentColor" />
              </button>
            )}

            <Link 
              href={detailsUrl} 
              prefetch={false} 
              aria-label="تفاصيل المنتج"
              className="flex-none w-14 bg-slate-50 text-slate-600 rounded-3xl flex items-center justify-center hover:bg-slate-100 border border-slate-100 transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
          </div>
        </div>
      </article>

      {/* الـ Popup الخاص بالفيديو */}
      {showVideo && videoId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={() => setShowVideo(false)}>
          <div className="relative w-full max-w-2xl bg-black rounded-3xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowVideo(false)} 
              aria-label="إغلاق الفيديو"
              className="absolute top-4 right-4 z-10 bg-white/20 text-white p-2 rounded-full hover:bg-white/40"
            >
              ✕
            </button>
            <div className="aspect-video">
              <iframe 
                className="w-full h-full" 
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
                allow="autoplay; encrypted-media" 
                allowFullScreen 
                title="Product Video" 
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}