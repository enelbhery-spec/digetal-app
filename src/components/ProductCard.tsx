"use client"

import { useState, useEffect } from 'react'
import { Eye, Star, ShoppingBag } from 'lucide-react'

type Props = {
  product: any
  country: string
}

export default function ProductCard({ product, country }: Props) {
  const [copied, setCopied] = useState(false)
  const [isCampaignActive, setIsCampaignActive] = useState(false)

  useEffect(() => {
    // تحديد تاريخ بداية الحملة (22 أبريل 2026)
    const campaignStartDate = new Date('2026-04-22T00:00:00');
    const now = new Date();
    if (now >= campaignStartDate) {
      setIsCampaignActive(true);
    }
  }, []);

  const productUrl = product?.product_url || "";
  
  // ✅ جلب بيانات المتجر (اللوجو والاسم) من العلاقات في قاعدة البيانات
  const brandSlug = product?.brand_slug || product?.brands?.slug || "";
  const brandLogo = product?.brands?.logo || ""; 
  const isNoonProduct = brandSlug === "noon";

  const price = product.price || 0
  const oldPrice = product.old_price || 0
  const discount = oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0
  const currency = country === "sa" ? "ر.س" : "ج.م"
  
  // جلب عدد المراجعات/المشاهدات والنجوم من قاعدة البيانات
  const reviewsCount = product.reviewsCount || 0;
  const stars = product.stars || 0;

  const activeCoupon = product.coupon_code || (country === "sa" ? "AHSB" : "HLWAC");
  const safeSlug = product?.slug ? encodeURIComponent(product.slug.trim()) : "";

  const handleCopy = () => {
    if (!isCampaignActive || !isNoonProduct) return;
    navigator.clipboard.writeText(activeCoupon)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border relative group flex flex-col h-full">
      
      {/* 1. نسبة الخصم (أعلى اليمين) */}
      {discount > 0 && (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-2 py-1 rounded z-20 font-bold shadow-sm">
          -{discount}%
        </div>
      )}

      {/* 2. منطقة الصورة + لوجو المتجر العائم (أعلى اليسار) */}
      <div className="relative w-full h-52 bg-gray-50 flex items-center justify-center overflow-hidden p-4">
        
        {/* ✅ لوجو المتجر العائم: يظهر بوضوح فوق أي صورة منتج */}
        {brandLogo && (
          <div className="absolute top-2 left-2 z-20 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-md border border-gray-100 transition-transform group-hover:scale-110">
            <img
              src={brandLogo}
              alt={brandSlug}
              className="w-7 h-7 object-contain"
            />
          </div>
        )}

        {/* صورة المنتج الرئيسية */}
        <img
          src={product?.image_url || "/no-image.png"}
          alt={product?.title}
          className="max-h-[85%] max-w-[85%] object-contain group-hover:scale-105 transition duration-500 ease-in-out"
        />

        {/* ✅ تسمية اسم المتجر (خلفية سوداء شفافة لضمان التباين) */}
        {brandSlug && (
          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] px-2 py-0.5 rounded backdrop-blur-sm uppercase font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
            {brandSlug}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow text-right" dir="rtl">
        {/* 3. التقييم والمشاهدات واسم المتجر نصياً */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            {stars > 0 && (
              <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded text-[10px] font-bold border border-yellow-100">
                <Star size={10} fill="currentColor" />
                {stars}
              </div>
            )}
            <div className="flex items-center gap-1 text-slate-600 bg-slate-50 px-2 py-0.5 rounded text-[10px] font-semibold border border-slate-100">
              <Eye size={12} />
              <span>{reviewsCount > 0 ? reviewsCount.toLocaleString() : "0"}</span>
            </div>
          </div>
          {/* نص صغير لتأكيد اسم المتجر */}
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 capitalize">
            {brandSlug}
          </span>
        </div>

        {/* 4. عنوان المنتج */}
        <h3 className="text-sm font-bold leading-6 h-12 overflow-hidden text-gray-800 line-clamp-2 mb-2 group-hover:text-green-700 transition-colors">
          {product?.title}
        </h3>

        {/* 5. السعر الحالي والقديم */}
        <div className="mt-2 flex items-center gap-2 mb-3">
          <span className="text-green-600 font-black text-lg">
            {price.toLocaleString()} <span className="text-xs">{currency}</span>
          </span>
          {oldPrice > price && (
            <span className="text-gray-400 line-through text-xs font-medium">
              {oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* 6. قسم الكوبون (يظهر لنون فقط بناءً على صورك) */}
        {isNoonProduct && (
          <div 
            onClick={handleCopy}
            className="mt-auto mb-3 p-2 border-2 border-dashed border-yellow-400 bg-yellow-50 rounded-lg flex items-center justify-between cursor-pointer hover:bg-yellow-100 transition"
          >
            <div className="flex flex-col">
              <span className="text-[9px] text-yellow-700 font-bold leading-none uppercase mb-1">كود خصم نون</span>
              <span className="text-xs font-black text-gray-800 tracking-wider">
                {isCampaignActive ? activeCoupon : "قريباً"}
              </span>
            </div>
            <div className="bg-yellow-400 text-yellow-900 text-[9px] px-2 py-1 rounded font-bold uppercase shadow-sm">
              {copied ? "تم!" : "نسخ"}
            </div>
          </div>
        )}

        {/* 7. أزرار الأكشن */}
        <div className="mt-auto flex gap-2">
          <a
            href={`/${country}/product/${safeSlug}`}
            className="w-1/3 bg-gray-100 text-gray-700 text-[11px] py-3 rounded-lg text-center font-bold hover:bg-gray-200 transition"
          >
            التفاصيل
          </a>

          <a
            href={productUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="w-2/3 bg-green-600 text-white text-[11px] py-3 rounded-lg text-center font-bold hover:bg-green-700 transition flex items-center justify-center gap-1.5 shadow-md shadow-green-100"
          >
            <ShoppingBag size={14} />
            <span>اشتري من {brandSlug.toUpperCase()}</span>
          </a>
        </div>
      </div>
    </div>
  )
}