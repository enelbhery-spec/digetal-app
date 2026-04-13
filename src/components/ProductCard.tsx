"use client"

import { useState, useEffect } from 'react'

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

  // التحقق الآمن من الرابط لمنع Runtime Error
  const productUrl = product?.product_url || "";
  const isNoonProduct = productUrl.includes('noon.com');

  const price = product.price || 0
  const oldPrice = product.old_price || 0
  const discount = oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0
  const currency = country === "sa" ? "ر.س" : "ج.م"

  // الكوبون الافتراضي حسب الدولة
  const activeCoupon = product.coupon_code || (country === "sa" ? "AHSB" : "HLWAC");

  // 🛠️ معالجة الـ Slug لضمان عدم حدوث خطأ 404
  // نقوم بإزالة المسافات الزائدة والتأكد من صياغة الرابط بشكل سليم
  const safeSlug = product?.slug ? encodeURIComponent(product.slug.trim()) : "";

  const handleCopy = () => {
    if (!isCampaignActive || !isNoonProduct) return;
    navigator.clipboard.writeText(activeCoupon)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition overflow-hidden border relative group">
      
      {/* نسبة الخصم */}
      {discount > 0 && (
        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded z-10">
          خصم {discount}%
        </div>
      )}

      {/* صورة المنتج */}
      <div className="w-full h-52 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={product?.image_url || "/no-image.png"}
          alt={product?.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold leading-6 h-12 overflow-hidden text-gray-800">
          {product?.title}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-green-600 font-bold text-lg">
            {price.toLocaleString()} {currency}
          </span>
          {oldPrice > price && (
            <span className="text-gray-400 line-through text-sm">
              {oldPrice.toLocaleString()} {currency}
            </span>
          )}
        </div>

        {/* 🏷️ منطقة الكوبون: تظهر لمنتجات نون فقط */}
        {isNoonProduct && (
          <div 
            onClick={handleCopy}
            className="mt-3 p-2 border-2 border-dashed border-yellow-400 bg-yellow-50 rounded-lg flex items-center justify-between cursor-pointer hover:bg-yellow-100 transition"
          >
            <div className="flex flex-col">
              <span className="text-[10px] text-yellow-700 font-bold leading-none uppercase mb-1">كود خصم نون</span>
              <span className="text-sm font-black text-gray-800 tracking-wider">
                {isCampaignActive ? activeCoupon : "قريباً"}
              </span>
            </div>
            <div className="bg-yellow-400 text-yellow-900 text-[10px] px-2 py-1 rounded font-bold">
              {copied ? "تم النسخ!" : (isCampaignActive ? "نسخ" : "انتظرونا")}
            </div>
          </div>
        )}

        {/* 🔘 الأزرار: تم إصلاح رابط التفاصيل باستخدام safeSlug */}
        <div className="mt-4 flex gap-2">
          <a
            href={`/${country}/product/${safeSlug}`}
            className="w-1/2 bg-gray-200 text-black text-sm py-3 rounded-lg text-center font-semibold hover:bg-gray-300 transition"
          >
            التفاصيل
          </a>

          <a
            href={productUrl}
            target="_blank"
            rel="nofollow sponsored"
            className="w-1/2 bg-green-600 text-white text-sm py-3 rounded-lg text-center font-semibold hover:bg-green-700 transition"
          >
            اشتري الآن 🔥
          </a>
        </div>
      </div>
    </div>
  )
}