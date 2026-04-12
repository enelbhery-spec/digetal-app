"use client"

import { useState, useEffect } from 'react'

type Props = {
  product: any
  country: string
}

export default function ProductCard({ product, country }: Props) {
  const [copied, setCopied] = useState(false)
  const [isCampaignActive, setIsCampaignActive] = useState(false)

  // تحديد تاريخ بداية الحملة (22 أبريل 2026)
  useEffect(() => {
    const campaignStartDate = new Date('2026-04-22T00:00:00');
    const now = new Date();
    if (now >= campaignStartDate) {
      setIsCampaignActive(true);
    }
  }, []);

  const price = product.price || 0
  const oldPrice = product.old_price || 0

  const discount =
    oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0

  const saving = oldPrice > price ? oldPrice - price : 0
  const currency = country === "sa" ? "ر.س" : "ج.م"

  const activeCoupon = product.coupon_code || "AHSB"

  const handleCopy = () => {
    if (!isCampaignActive) return; // منع النسخ قبل بداية الحملة
    navigator.clipboard.writeText(activeCoupon)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition overflow-hidden border relative group">

      {/* 🔥 عرض مميز */}
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
        عرض مميز
      </div>

      {/* 💰 نسبة الخصم */}
      {discount > 0 && (
        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded z-10">
          خصم {discount}%
        </div>
      )}

      {/* 🖼️ الصورة */}
      <div className="w-full h-52 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={product.image_url}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
          onError={(e: any) => { e.currentTarget.src = "/no-image.png" }}
        />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold leading-6 h-12 overflow-hidden">
          {product.title}
        </h3>

        <div className="text-yellow-500 text-sm mt-2">
          ⭐⭐⭐⭐☆
          <span className="text-gray-500 text-xs mr-1">(تقييم ممتاز)</span>
        </div>

        {saving > 0 && (
          <div className="text-green-700 text-xs mt-1 font-bold">
            وفرت {saving.toLocaleString()} {currency}
          </div>
        )}

        <div className="mt-2 flex items-center gap-2">
          {price > 0 && (
            <span className="text-green-600 font-bold text-lg">
              {price.toLocaleString()} {currency}
            </span>
          )}
          {oldPrice > 0 && (
            <span className="text-gray-400 line-through text-sm">
              {oldPrice.toLocaleString()} {currency}
            </span>
          )}
        </div>

        {/* 🏷️ منطقة الكوبون - تظهر فقط عند بداية الحملة */}
        {isCampaignActive ? (
          <div 
            onClick={handleCopy}
            className="mt-3 p-2 border-2 border-dashed border-yellow-400 bg-yellow-50 rounded-lg flex items-center justify-between cursor-pointer hover:bg-yellow-100 transition relative"
          >
            <div className="flex flex-col">
              <span className="text-[10px] text-yellow-700 font-bold leading-none uppercase mb-1">كود الخصم</span>
              <span className="text-sm font-black text-gray-800 tracking-wider">{activeCoupon}</span>
            </div>
            <div className="bg-yellow-400 text-yellow-900 text-[10px] px-2 py-1 rounded font-bold">
              {copied ? "تم النسخ!" : "نسخ"}
            </div>
          </div>
        ) : (
          /* اختياري: رسالة تشويقية قبل الحملة */
          <div className="mt-3 p-2 border border-gray-200 bg-gray-50 rounded-lg text-center">
            <span className="text-[10px] text-gray-500 font-bold uppercase">انتظروا عروض كبرى قريباً 🚀</span>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <a
            href={`/${country}/product/${product.slug}`}
            className="w-1/2 bg-gray-200 text-black text-sm py-3 rounded-lg text-center font-semibold hover:bg-gray-300 transition"
          >
            التفاصيل
          </a>
          <a
            href={product.product_url}
            target="_blank"
            rel="nofollow sponsored"
            className="w-1/2 bg-green-600 text-white text-sm py-3 rounded-lg text-center font-semibold hover:bg-green-700 transition"
          >
            شاهد العرض 🔥
          </a>
        </div>
      </div>
    </div>
  )
}