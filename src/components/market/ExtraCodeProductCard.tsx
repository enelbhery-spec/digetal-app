"use client";

import Link from "next/link";
import {
  Eye,
  ArrowLeft,
  Star,
  ShoppingBag,
} from "lucide-react";

type Props = {
  product: any;
  country: string;
};

export default function ExtraCodeProductCard({
  product,
  country,
}: Props) {
  
  // السعر والخصم متطابق تماماً مع المنتجات العادية
  const price = Number(product?.price) || 0;
  const oldPrice = Number(product?.old_price) || 0;

  const discount =
    oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  const currency = country === "sa" ? "ر.س" : "ج.م";

  // تحويل حقل الـ slug ليكون آمن ومتوافق مع السيو
  const safeSlug = product?.slug
    ? encodeURIComponent(
        product.slug
          .trim()
          .replace(/\s+/g, "-")
      )
    : "";

  // جلب التقييم الفعلي وعدد المراجعات/المشاهدات بناءً على مسميات الجداول الجديدة
  const rating = product?.rating || 5.0;
  const reviewsCount = product?.reviewsCount || 0;

  // رابط المنتج المحدث من قاعدة البيانات
  const productUrl = product?.product_url || "#";

  return (
    <>
      <div className="group relative flex flex-col h-full bg-white rounded-[2rem] border border-slate-100 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
        
        {/* شارة المتجر الحصرية + نسبة الخصم + كود المنتج الموحد */}
        <div className="absolute top-4 inset-x-4 z-30 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            {/* شارة خضراء مميزة لمنتجات متجرك الحصري */}
            <span className="bg-emerald-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg w-fit shadow-sm">
              إكسترا كود ماركت
            </span>

            {product?.product_code && (
              <div className="bg-[#FF7A00] text-white text-[11px] font-extrabold px-3 py-1.5 rounded-lg shadow-sm">
                # كود المنتج: {product.product_code}
              </div>
            )}
          </div>

          {discount > 0 && (
            <div className="bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg text-[12px]">
              -{discount}%
            </div>
          )}
        </div>

        {/* ✅ تصحيح حجم الصورة: زيادة الارتفاع لـ h-80 بدلاً من h-60 وإلغاء المسافات الداخلية mt-6 و p-6 */}
        <div className="relative w-full h-80 bg-white flex items-center justify-center pt-16 px-4">
          <img
            src={product?.image_url || "/no-image.png"}
            alt={product?.title || "منتج حصرى"}
            title={`${product?.title || "منتج"} | إكسترا كود`}
            loading="lazy"
            decoding="async"
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500"
          />
        </div>

        {/* تفاصيل المنتج: تعديل المسافات لتكون متناسقة مع الكروت العادية */}
        <div className="p-6 flex flex-col flex-grow text-right" dir="rtl">
          
          {/* ✅ تصحيح حجم النصوص: تكبير عنوان المنتج لـ text-lg (مثل الكروت العادية) */}
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 h-14 mb-2 leading-relaxed group-hover:text-emerald-600 transition-colors">
            {product?.title}
          </h3>

          {/* ✅ تصحيح التقييم والمشاهدات: تكبير النصوص لـ text-sm (مثل الكروت العادية) */}
          <div className="flex items-center justify-between mb-5 text-gray-500 text-sm font-medium border-b border-slate-50 pb-3">
            
            {/* عدد المراجعات/المشاهدات */}
            <div className="flex items-center gap-1.5 text-slate-500">
              <Eye size={14} className="text-slate-400" />
              <span>{reviewsCount.toLocaleString()} مشاهدة</span>
            </div>

            {/* التقييم */}
            <div className="flex items-center gap-1.5" dir="ltr">
              <div className="flex items-center">
                <Star
                  size={12}
                  className="fill-yellow-400 text-yellow-400"
                />
              </div>
              <span className="font-bold text-slate-600">({rating})</span>
            </div>

          </div>

          {/* ✅ تصحيح الأسعار: استخدام text-3xl و text-lg (مثل الكروت العادية) */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl font-black text-slate-950">
              {price.toLocaleString()}
            </span>
            <span className="text-lg font-bold text-slate-600">
              {currency}
            </span>
            {oldPrice > price && (
              <span className="text-slate-400 line-through text-sm font-medium">
                {oldPrice.toLocaleString()} {currency}
              </span>
            )}
          </div>

          {/* الأزرار التفاعلية - تم تكبير المسافات قليلاً للتعامل مع النصوص الأكبر */}
          <div className="flex gap-3 mt-auto">
            <a
              href={productUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="flex-[3] bg-slate-950 hover:bg-slate-900 text-white py-4 rounded-3xl text-center text-base font-bold flex items-center justify-center gap-2.5 transition-all active:scale-95 shadow-sm"
            >
              <ShoppingBag size={18} />
              تسوق الآن
            </a>

            <Link
              href={`/${country}/product/${safeSlug}`}
              className="flex-1 bg-slate-50 text-slate-600 py-4 rounded-3xl text-center hover:bg-slate-100 flex items-center justify-center transition-colors border border-slate-100"
            >
              <ArrowLeft size={20} />
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}