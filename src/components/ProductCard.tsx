"use client"

import { useState } from 'react'
import { Eye, ShoppingBag, ArrowLeft, Ticket, Copy, CheckCheck } from 'lucide-react'

type Props = {
  product: any
  country: string
}

export default function ProductCard({ product, country }: Props) {
  const [copied, setCopied] = useState(false)

  // 1. تجهيز البيانات الأساسية وتنظيفها
  const productUrl = product?.product_url || "#";
  const brandSlug = (product?.brand_slug || product?.brands?.slug || "متجر").toLowerCase().trim();
  const price = product.price || 0;
  const oldPrice = product.old_price || 0;
  const discount = oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  const currency = country === "sa" ? "ر.س" : "ج.م";
  const safeSlug = product?.slug ? encodeURIComponent(product.slug.trim()) : "";

  // 2. شرط الظهور: صفحة السعودية فقط
  const isSaudiPage = country === "sa";
  
  // الكوبون المخصص
  const activeCoupon = product.coupon_code || "AHSB";

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(activeCoupon);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-[2rem] border-2 border-slate-100 hover:border-green-600 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
      
      {/* نسبة الخصم - تباين أحمر صارخ */}
      {discount > 0 && (
        <div className="absolute top-5 right-5 z-30 bg-red-600 text-white font-black px-3 py-1 rounded-full text-[11px] shadow-xl animate-pulse">
          {discount}%-
        </div>
      )}

      {/* منطقة الصورة - خلفية هادئة لإبراز المنتج */}
      <div className="relative w-full h-60 bg-slate-50/50 flex items-center justify-center p-8 overflow-hidden">
        <img
          src={product?.image_url || "/no-image.png"}
          alt={product?.title}
          className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow text-right" dir="rtl">
        {/* الترويسة: المتجر والإحصائيات */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-black text-green-700 bg-green-50 px-3 py-1 rounded-lg uppercase tracking-tighter border border-green-100">
            {brandSlug}
          </span>
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold">
            <Eye size={14} className="text-slate-300" />
            <span>{(product.reviewsCount || 150).toLocaleString()} مشاهدة</span>
          </div>
        </div>

        {/* العنوان - خط عريض وقابل للقراءة */}
        <h3 className="text-[17px] font-extrabold text-slate-800 line-clamp-2 h-12 mb-4 leading-snug group-hover:text-green-600 transition-colors duration-300">
          {product?.title}
        </h3>

        {/* السعر - تحسين التسلسل البصري (Hierarchy) */}
        <div className="flex items-baseline gap-1.5 mb-6">
          <span className="text-3xl font-black text-slate-900 tracking-tight">
            {price.toLocaleString()}
          </span>
          <span className="text-xs font-black text-slate-500 ml-2">
            {currency}
          </span>
          {oldPrice > price && (
            <span className="text-slate-400 line-through text-sm font-medium decoration-red-500/30">
              {oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* --- قسم الكوبون الاحترافي: يظهر في السعودية فقط --- */}
        {isSaudiPage && (
          <div 
            onClick={handleCopy}
            className={`relative mb-6 cursor-pointer overflow-hidden transition-all duration-300 transform active:scale-95 group/coupon`}
          >
            <div className={`flex items-center justify-between p-4 rounded-2xl border-2 border-dashed shadow-md transition-all duration-300 ${
              copied ? 'bg-slate-900 border-slate-900' : 'bg-green-600 border-green-700 hover:bg-green-700 hover:shadow-green-200'
            }`}>
              
              <div className="flex items-center gap-3">
                <Ticket className="text-white opacity-90" size={22} />
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-white/70 leading-none mb-1">كود خصم إضافي</span>
                  <span className="text-xl font-black tracking-[0.15em] text-white uppercase">
                    {activeCoupon}
                  </span>
                </div>
              </div>

              <div className={`px-4 py-2 rounded-xl font-black text-[11px] uppercase shadow-sm transition-all flex items-center gap-1.5 ${
                copied ? 'bg-green-500 text-white' : 'bg-white text-green-700'
              }`}>
                {copied ? <><CheckCheck size={14} /> تم النسخ</> : <><Copy size={14} /> نسخ</>}
              </div>
            </div>
            
            {/* دوائر التذكرة الجانبية (Ticket Punch Effect) */}
            <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-r-2 border-slate-100" />
            <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-l-2 border-slate-100" />
          </div>
        )}

        {/* أزرار الأكشن - تحسين التوزيع والأوزان */}
        <div className="flex gap-3 mt-auto">
          <a
            href={productUrl}
            target="_blank"
            rel="nofollow"
            className="flex-[3] bg-slate-900 text-white py-4 rounded-2xl text-center font-black text-[13px] hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200 active:scale-95"
          >
            <ShoppingBag size={18} />
            تسوق الآن
          </a>
          <a
            href={`/${country}/product/${safeSlug}`}
            className="flex-1 bg-slate-100 text-slate-700 py-4 rounded-2xl text-center font-bold text-sm hover:bg-slate-200 transition-all flex items-center justify-center active:scale-95"
          >
            <ArrowLeft size={20} />
          </a>
        </div>
      </div>
    </div>
  )
}