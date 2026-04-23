"use client"

import { useState } from 'react'
import { Eye, Star, ShoppingBag, ArrowLeft, Ticket, Copy, CheckCheck } from 'lucide-react'

type Props = {
  product: any
  country: string
}

export default function ProductCard({ product, country }: Props) {
  const [copied, setCopied] = useState(false)

  // 1. تجهيز البيانات الأساسية
  const productUrl = product?.product_url || "#";
  const brandSlug = (product?.brand_slug || product?.brands?.slug || "متجر").toLowerCase().trim();
  const price = product.price || 0;
  const oldPrice = product.old_price || 0;
  const discount = oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  const currency = country === "sa" ? "ر.س" : "ج.م";
  const safeSlug = product?.slug ? encodeURIComponent(product.slug.trim()) : "";

  // 2. الشرط الجديد: الظهور في صفحة السعودية فقط (بدون تحديد نون)
  const isSaudiPage = country === "sa";
  
  // الكوبون الافتراضي للسعودية (يمكنك تغييره حسب الحاجة)
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
      
      {/* التباين العالي - نسبة الخصم */}
      {discount > 0 && (
        <div className="absolute top-5 right-5 z-30 bg-red-600 text-white font-black px-3 py-1 rounded-full text-[11px] shadow-xl">
          {discount}%-
        </div>
      )}

      {/* منطقة الصورة */}
      <div className="relative w-full h-60 bg-slate-50/50 flex items-center justify-center p-8">
        <img
          src={product?.image_url || "/no-image.png"}
          alt={product?.title}
          className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow text-right" dir="rtl">
        {/* المتجر والإحصائيات */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-bold text-green-700 bg-green-50 px-3 py-1 rounded-lg uppercase tracking-wider">
            {brandSlug}
          </span>
          <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
            <Eye size={14} />
            <span>{(product.reviewsCount || 150).toLocaleString()} مشاهدة</span>
          </div>
        </div>

        {/* العنوان */}
        <h3 className="text-lg font-extrabold text-slate-800 line-clamp-2 h-14 mb-4 leading-snug group-hover:text-green-600 transition-colors">
          {product?.title}
        </h3>

        {/* السعر بتباين أخضر قوي */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl font-black text-green-700">
            {price.toLocaleString()} <small className="text-sm font-bold text-slate-500">{currency}</small>
          </span>
          {oldPrice > price && (
            <span className="text-slate-400 line-through text-base font-medium">
              {oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* --- قسم الكوبون الاحترافي: يظهر في السعودية فقط لجميع المتاجر --- */}
        {isSaudiPage && (
          <div 
            onClick={handleCopy}
            className={`relative mb-6 cursor-pointer overflow-hidden transition-all duration-300 transform active:scale-95 group/coupon`}
          >
            <div className={`flex items-center justify-between p-4 rounded-2xl border-2 border-dashed shadow-md transition-all ${
              copied ? 'bg-slate-900 border-slate-900' : 'bg-green-600 border-green-700 hover:bg-green-700'
            }`}>
              
              <div className="flex items-center gap-3">
                <Ticket className="text-white" size={24} />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white/80 leading-none mb-1">كود خصم إضافي</span>
                  <span className="text-xl font-black tracking-widest text-white uppercase">
                    {activeCoupon}
                  </span>
                </div>
              </div>

              <div className={`px-4 py-2 rounded-xl font-black text-[12px] uppercase shadow-sm transition-all flex items-center gap-1 ${
                copied ? 'bg-green-500 text-white' : 'bg-white text-green-700'
              }`}>
                {copied ? <><CheckCheck size={14} /> تم النسخ</> : <><Copy size={14} /> نسخ الكود</>}
              </div>
            </div>
            
            {/* دوائر التذكرة الجانبية للجمالية الاحترافية */}
            <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 bg-white rounded-full" />
            <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-white rounded-full" />
          </div>
        )}

        {/* أزرار الأكشن */}
        <div className="flex gap-3 mt-auto">
          <a
            href={productUrl}
            target="_blank"
            rel="nofollow"
            className="flex-[2.5] bg-slate-900 text-white py-4 rounded-2xl text-center font-black text-sm hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200"
          >
            <ShoppingBag size={18} />
            تسوق الآن
          </a>
          <a
            href={`/${country}/product/${safeSlug}`}
            className="flex-1 bg-slate-100 text-slate-700 py-4 rounded-2xl text-center font-bold text-sm hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
          </a>
        </div>
      </div>
    </div>
  )
}