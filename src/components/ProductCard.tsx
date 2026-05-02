"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, ShoppingBag, ArrowLeft, Ticket, CheckCheck, Star } from "lucide-react";

type Props = {
  product: any;
  country: string;
};

export default function ProductCard({ product, country }: Props) {
  const [copied, setCopied] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const productUrl = product?.affiliate_link || product?.product_url || "#";
  const brandSlug = (product?.brand_slug || product?.brands?.slug || "").toLowerCase().trim();
  const brandLogo = product?.brands?.logo || "";
  const price = product.price || 0;
  const oldPrice = product.old_price || 0;

  const discount = oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  const currency = country === "sa" ? "ر.س" : "ج.م";
  const safeSlug = product?.slug ? encodeURIComponent(product.slug.trim().replace(/\s+/g, "-")) : "";
  const activeCoupon = product.coupon_code || "AHSB";

  // 🎥 Video ID (لازم تضيفه في الداتا)
  const videoId = product?.video_id?.trim();

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(activeCoupon);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="group relative flex flex-col h-full bg-white rounded-[2rem] border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
        
        {/* اللوجو + الخصم */}
        <div className="absolute top-4 inset-x-4 z-30 flex justify-between items-start">
          {brandLogo ? (
            <div className="bg-white p-1.5 rounded-xl shadow border">
              <img src={brandLogo} alt={brandSlug || "brand"} className="w-8 h-8 object-contain" />
            </div>
          ) : (
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-lg">
              {brandSlug || "brand"}
            </span>
          )}

          {discount > 0 && (
            <div className="bg-red-500 text-white font-bold px-2 py-1 rounded-lg text-[11px]">
              -{discount}%
            </div>
          )}
        </div>

        {/* الصورة */}
        <div className="relative w-full h-60 bg-slate-50 flex items-center justify-center p-6">
          <img
            src={product?.image_url || "/no-image.png"}
            alt={product?.title || "منتج"}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition"
          />
        </div>

        <div className="p-5 flex flex-col flex-grow text-right" dir="rtl">
          
          {/* المشاهدات */}
          <div className="flex items-center justify-end mb-2 text-gray-500 text-xs font-semibold gap-1">
            <Eye size={14} />
            <span>{(product.reviewsCount || 0).toLocaleString()} مشاهدة</span>
          </div>

          {/* العنوان */}
          <h3 className="text-[15px] font-bold text-gray-800 line-clamp-2 h-12 mb-1 leading-snug group-hover:text-emerald-600">
            {product?.title}
          </h3>

          {/* التقييم */}
          <div className="flex items-center justify-end mb-3 gap-1" dir="ltr">
            <span className="text-[11px] font-bold text-gray-500">
              ({product.rating || "0"})
            </span>
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={12}
                  className={
                    index < Math.floor(product.rating || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }
                />
              ))}
            </div>
          </div>

          {/* السعر */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-extrabold text-gray-900">
              {price.toLocaleString()}
            </span>
            <span className="text-sm font-bold text-gray-600">
              {currency}
            </span>
            {oldPrice > price && (
              <span className="text-gray-400 line-through text-sm">
                {oldPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* تنويه */}
          <div className="bg-gray-50 border rounded-lg p-2 mb-4">
            <p className="text-[11px] text-gray-600 leading-relaxed">
              ⚠️ يتم الشراء عبر متاجر خارجية (مثل أمازون أو نون).
            </p>
          </div>

          {/* 🎥 زر مشاهدة الفيديو */}
          {videoId && (
            <button
              onClick={() => setShowVideo(true)}
              className="w-full mb-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border border-emerald-200"
            >
              🎥 اعرف قبل ما تشتري
            </button>
          )}

          {/* الكوبون */}
          {product.coupon_code && (
            <div onClick={handleCopy} className="mb-4 cursor-pointer">
              <div className={`flex items-center justify-between p-3 rounded-xl transition ${
                copied ? "bg-gray-800" : "bg-emerald-600 hover:bg-emerald-700"
              }`}>
                <div className="flex items-center gap-2">
                  <Ticket className="text-white" size={18} />
                  <span className="text-white font-bold tracking-wider">{product.coupon_code}</span>
                </div>
                <div className="bg-white text-emerald-700 px-3 py-1 rounded text-xs font-bold">
                  {copied ? <CheckCheck size={14} /> : "نسخ"}
                </div>
              </div>
            </div>
          )}

          {/* الأزرار */}
          <div className="flex gap-2 mt-auto">
            {productUrl !== "#" ? (
              <a
                href={productUrl}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="flex-[3] bg-black hover:bg-emerald-700 text-white py-3 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} />
                تسوق الآن
              </a>
            ) : (
              <div className="flex-[3] bg-gray-300 text-gray-500 py-3 rounded-xl text-center text-sm font-bold">
                غير متاح
              </div>
            )}

            <Link
              href={`/${country}/product/${safeSlug}`}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl text-center hover:bg-gray-200 flex items-center justify-center"
            >
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* 🎥 Popup الفيديو */}
      {showVideo && videoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl relative">
            
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-lg text-sm"
            >
              ✕
            </button>

            <div className="p-4 text-center font-bold text-gray-800 border-b">
              شاهد مميزات المنتج قبل الشراء
            </div>

            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                allowFullScreen
              ></iframe>
            </div>

            <div className="p-4 text-center">
              <button
                onClick={() => setShowVideo(false)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg text-sm font-bold"
              >
                رجوع للمنتج
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}