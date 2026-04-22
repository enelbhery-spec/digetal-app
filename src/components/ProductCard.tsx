"use client"

import { useState, useEffect } from 'react'
import { Eye, Star, ShoppingBag, ArrowLeft } from 'lucide-react'

type Props = {
  product: any
  country: string
}

export default function ProductCard({ product, country }: Props) {
  const [copied, setCopied] = useState(false)
  const [isCampaignActive, setIsCampaignActive] = useState(false)

  useEffect(() => {
    const campaignStartDate = new Date('2026-04-22T00:00:00');
    const now = new Date();
    if (now >= campaignStartDate) {
      setIsCampaignActive(true);
    }
  }, []);

  const productUrl = product?.product_url || "";
  const brandSlug = product?.brand_slug || product?.brands?.slug || "";
  const brandLogo = product?.brands?.logo || ""; 
  const isNoonProduct = brandSlug === "noon";

  const price = product.price || 0
  const oldPrice = product.old_price || 0
  const discount = oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0
  const currency = country === "sa" ? "ر.س" : "ج.م"
  
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
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 relative group flex flex-col h-full">
      
      {/* 1. نسبة الخصم */}
      {discount > 0 && (
        <div className="absolute top-3 right-3 bg-red-500 text-white text-[11px] px-2.5 py-1 rounded-lg z-20 font-black shadow-lg shadow-red-100">
          -{discount}%
        </div>
      )}

      {/* 2. منطقة الصورة واللوجو العائم */}
      <div className="relative w-full h-56 bg-gray-50/50 flex items-center justify-center overflow-hidden p-6">
        {brandLogo && (
          <div className="absolute top-3 left-3 z-20 bg-white p-1.5 rounded-xl shadow-sm border border-gray-100 transition-transform duration-300 group-hover:rotate-6">
            <img
              src={brandLogo}
              alt={brandSlug}
              className="w-8 h-8 object-contain"
            />
          </div>
        )}

        <img
          src={product?.image_url || "/no-image.png"}
          alt={product?.title}
          className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow text-right" dir="rtl">
        {/* 3. الإحصائيات والماركة */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {stars > 0 && (
              <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md text-[11px] font-bold">
                <Star size={12} fill="currentColor" />
                {stars}
              </div>
            )}
            <div className="flex items-center gap-1 text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md text-[11px] font-medium">
              <Eye size={12} />
              <span>{reviewsCount > 0 ? reviewsCount.toLocaleString() : "0"}</span>
            </div>
          </div>
          <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-tighter">
            {brandSlug}
          </span>
        </div>

        {/* 4. العنوان */}
        <h3 className="text-[15px] font-bold leading-relaxed h-[44px] overflow-hidden text-gray-800 line-clamp-2 mb-3 group-hover:text-green-600 transition-colors duration-300">
          {product?.title}
        </h3>

        {/* 5. السعر */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-green-600 font-extrabold text-xl">
            {price.toLocaleString()} <small className="text-xs font-bold">{currency}</small>
          </span>
          {oldPrice > price && (
            <span className="text-gray-400 line-through text-sm font-medium">
              {oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* 6. قسم الكوبون الذكي */}
        {isNoonProduct && (
          <div 
            onClick={handleCopy}
            className={`mt-auto mb-4 p-2.5 border-2 border-dashed rounded-xl flex items-center justify-between cursor-pointer transition-all duration-300 ${
              copied ? 'border-green-500 bg-green-50' : 'border-yellow-400 bg-yellow-50 hover:bg-yellow-100'
            }`}
          >
            <div className="flex flex-col">
              <span className="text-[10px] text-yellow-800 font-bold leading-none mb-1">كود خصم نون</span>
              <span className="text-sm font-black text-gray-900">
                {isCampaignActive ? activeCoupon : "قريباً"}
              </span>
            </div>
            <div className={`text-[10px] px-3 py-1.5 rounded-lg font-bold transition-colors ${
              copied ? 'bg-green-500 text-white' : 'bg-yellow-400 text-yellow-900'
            }`}>
              {copied ? "تم النسخ!" : "نسخ الكود"}
            </div>
          </div>
        )}

        {/* 7. أزرار الأكشن المطورة */}
        <div className="flex gap-2 mt-auto">
          {/* زر التفاصيل الموضح أكثر */}
          <a
            href={`/${country}/product/${safeSlug}`}
            className="w-[40%] border-2 border-gray-200 text-gray-700 text-[12px] py-3 rounded-xl text-center font-bold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-1"
          >
            التفاصيل
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/>
          </a>

          {/* زر اشتر الآن المميز */}
          <a
            href={productUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="w-[60%] bg-green-600 text-white text-[12px] py-3 rounded-xl text-center font-bold hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-100 group-hover:shadow-green-200"
          >
            <ShoppingBag size={16} />
            <span>اشترِ من {brandSlug.toUpperCase()}</span>
          </a>
        </div>
      </div>
    </div>
  )
}