"use client"

import { useState } from 'react'
import { Eye, ShoppingBag, ArrowLeft, Ticket, Copy, CheckCheck } from 'lucide-react'

type Props = {
  product: any
  country: string
}

export default function ProductCard({ product, country }: Props) {
  const [copied, setCopied] = useState(false)

  const productUrl = product?.product_url || "#";
  const brandSlug = (product?.brand_slug || product?.brands?.slug || "").toLowerCase().trim();
  const brandLogo = product?.brands?.logo || ""; 
  
  const price = product.price || 0;
  const oldPrice = product.old_price || 0;
  const discount = oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  const currency = country === "sa" ? "ر.س" : "ج.م";
  const safeSlug = product?.slug ? encodeURIComponent(product.slug.trim()) : "";

  const isSaudiPage = country === "sa";
  const activeCoupon = product.coupon_code || "AHSB";

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(activeCoupon);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-[2rem] border-2 border-slate-100 hover:border-emerald-500 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
      
      {/* 1. نسبة الخصم واللوجو فوق الصورة */}
      <div className="absolute top-4 inset-x-4 z-30 flex justify-between items-start pointer-events-none">
        {brandLogo ? (
          <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-xl shadow-sm border border-slate-100 pointer-events-auto">
            <img src={brandLogo} alt={brandSlug} className="w-8 h-8 object-contain" />
          </div>
        ) : (
          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2 py-1 rounded-lg uppercase pointer-events-auto">
            {brandSlug}
          </span>
        )}
        
        {discount > 0 && (
          <div className="bg-red-500 text-white font-black px-2.5 py-1 rounded-lg text-[11px] shadow-lg pointer-events-auto">
            {discount}%-
          </div>
        )}
      </div>

      {/* 2. منطقة الصورة */}
      <div className="relative w-full h-64 bg-slate-50/50 flex items-center justify-center p-10">
        <img
          src={product?.image_url || "/no-image.png"}
          alt={product?.title}
          className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow text-right" dir="rtl">
        {/* 3. الإحصائيات */}
        <div className="flex items-center justify-end mb-3 text-slate-400 text-[11px] font-bold gap-1.5">
          <Eye size={14} className="text-slate-300" />
          <span>{(product.reviewsCount || 1200).toLocaleString()} مشاهدة</span>
        </div>

        {/* 4. العنوان */}
        <h3 className="text-[16px] font-extrabold text-slate-800 line-clamp-2 h-12 mb-4 leading-snug group-hover:text-emerald-600 transition-colors">
          {product?.title}
        </h3>

        {/* 5. السعر - تحسين الخط والوزن */}
        <div className="flex items-baseline gap-1.5 mb-6">
          <span className="text-3xl font-black text-slate-900 tracking-tight">
            {price.toLocaleString()}
          </span>
          <span className="text-xs font-black text-slate-500">
            {currency}
          </span>
          {oldPrice > price && (
            <span className="text-slate-300 line-through text-sm font-medium mr-2">
              {oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* 6. الكوبون الاحترافي - أخضر زمردي Emerald */}
        {/* 6. الكوبون الاحترافي - يظهر فقط إذا وجد كود خصم في البيانات */}
{product.coupon_code && (
  <div 
    onClick={handleCopy}
    className="relative mb-6 cursor-pointer overflow-hidden transition-all active:scale-95 group/coupon"
  >
    <div className={`flex items-center justify-between p-4 rounded-2xl border-2 border-dashed shadow-md transition-all ${
      copied ? 'bg-slate-800 border-slate-800' : 'bg-emerald-600 border-emerald-700 hover:bg-emerald-700'
    }`}>
      <div className="flex items-center gap-3">
        <Ticket className="text-white opacity-90" size={22} />
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-white/70 leading-none mb-1">كود خصم إضافي</span>
          <span className="text-xl font-black tracking-widest text-white uppercase italic">
            {product.coupon_code}
          </span>
        </div>
      </div>
      <div className={`px-4 py-2 rounded-xl font-black text-[11px] uppercase shadow-sm transition-all ${
        copied ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-700'
      }`}>
        {copied ? <CheckCheck size={16} /> : "نسخ"}
      </div>
    </div>
    {/* تأثير التذكرة الجانبي */}
    <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 bg-white rounded-full" />
    <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-white rounded-full" />
  </div>
)}
        {/* 7. أزرار الأكشن - كحلي فاخر (Slate-900) متناسق مع الأخضر */}
        <div className="flex gap-3 mt-auto">
          <a
            href={productUrl}
            target="_blank"
            className="flex-[3] bg-[#0f172a] hover:bg-emerald-900 text-white py-4 rounded-2xl text-center font-black text-[13px] transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200"
          >
            <ShoppingBag size={18} />
            تسوق الآن
          </a>
          <a
            href={`/${country}/product/${safeSlug}`}
            className="flex-1 bg-slate-100 text-slate-700 py-4 rounded-2xl text-center font-bold hover:bg-slate-200 transition-all flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </a>
        </div>
      </div>
    </div>
  )
}