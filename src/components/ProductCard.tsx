"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft, Star } from "lucide-react";

type Props = {
  product: any; // بيانات منتج صفقة
};

export default function SafkaProductCard({ product }: Props) {
  // استخراج البيانات من كائن منتج صفقة
  const name = product?.name || "منتج بدون اسم";
  const price = product?.price || 0;
  const imageUrl = product?.main_image || "/no-image.png";
  const safkaId = product?.safka_id;

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-[2rem] border border-slate-100 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      
      {/* 1. صورة المنتج */}
      <div className="relative w-full h-60 bg-white flex items-center justify-center p-6">
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500"
        />
      </div>

      {/* 2. تفاصيل المنتج */}
      <div className="p-5 flex flex-col flex-grow text-right" dir="rtl">
        
        {/* العنوان */}
        <h3 className="text-[15px] font-bold text-gray-800 line-clamp-2 h-12 mb-1 leading-snug group-hover:text-emerald-600 transition-colors">
          {name}
        </h3>

        {/* التقييم */}
        <div className="flex items-center mb-4 text-gray-400 text-[11px] font-medium border-b border-slate-50 pb-2">
          <div className="flex items-center gap-1" dir="ltr">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star key={index} size={10} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-bold text-slate-500">(4.8)</span>
          </div>
        </div>

        {/* السعر */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-black text-slate-900">
            {price.toLocaleString()}
          </span>
          <span className="text-sm font-bold text-slate-500">ج.م</span>
        </div>

        {/* الأزرار */}
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/safka-products/${safkaId}`}
            className="flex-[3] bg-slate-900 hover:bg-emerald-600 text-white py-3 rounded-2xl text-center text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <ShoppingBag size={16} />
            تفاصيل المنتج وشراء
          </Link>

          <Link
            href={`/safka-products/${safkaId}`}
            className="flex-1 bg-slate-50 text-slate-600 py-3 rounded-2xl text-center hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}