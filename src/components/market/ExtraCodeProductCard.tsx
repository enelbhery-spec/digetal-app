"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  ArrowLeft,
  Star,
  Hash,
  MessageCircle, // أيقونة المحادثة المناسبة للطلب المباشر
} from "lucide-react";

type Props = {
  product: any;
  country: string;
};

export default function ExtraCodeProductCard({
  product,
  country,
}: Props) {
  const [showVideo, setShowVideo] = useState(false);

  // السعر والخصم متطابق تماماً مع المنتجات العادية
  const price = product?.price || 0;
  const oldPrice = product?.old_price || 0;

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

  // رقم الواتساب الحصري الخاص بـ إكسترا كود ماركت
  const whatsappNumber = "201000000000"; 

  // رقم أو كود المنتج المعروض
  const offerNo = product?.offer_no;

  // صياغة رسالة طلب ذكية ومباشرة للواتساب لتسهيل الشراء
  const whatsappMessage = encodeURIComponent(
    `مرحباً إكسترا كود، أريد طلب المنتج الحصري التالي:\n` +
    `🎁 المنتج: ${product?.title}\n` +
    `🔢 كود العرض (Offer No): ${offerNo || "N/A"}\n` +
    `💰 السعر: ${price.toLocaleString()} ${currency}\n\n` +
    `تفضل بيانات الشحن الخاصة بي:\n` +
    `- الاسم ثنائي:\n` +
    `- رقم الهاتف فعال:\n` +
    `- المحافظة والعنوان بالتفصيل:`
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      <div className="group relative flex flex-col h-full bg-white rounded-[2rem] border border-slate-100 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
        
        {/* شارة المتجر الحصرية + نسبة الخصم + كود المنتج */}
        <div className="absolute top-4 inset-x-4 z-30 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            
            {/* شارة خضراء مميزة لمنتجات متجرك الشخصي */}
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg w-fit shadow-sm">
              إكسترا كود ماركت
            </span>

            {offerNo && (
              <div className="bg-slate-900 text-white text-[10px] font-extrabold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                <Hash size={12} />
                كود المنتج: {offerNo}
              </div>
            )}
          </div>

          {discount > 0 && (
            <div className="bg-red-500 text-white font-bold px-2 py-1 rounded-lg text-[11px]">
              -{discount}%
            </div>
          )}
        </div>

        {/* صورة المنتج - تستدعي image_url مباشرة مثل المنتجات العادية */}
        <div className="relative w-full h-60 bg-white flex items-center justify-center p-6 mt-6">
          <img
            src={product?.image_url || "/no-image.png"}
            alt={product?.title || "منتج حصرى"}
            title={`${product?.title || "منتج"} | إكسترا كود`}
            loading="lazy"
            decoding="async"
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500"
          />
        </div>

        <div className="p-5 flex flex-col flex-grow text-right" dir="rtl">
          
          {/* عنوان المنتج المقترن بلون الزمرد عند المرور عليه */}
          <h3 className="text-[15px] font-bold text-gray-800 line-clamp-2 h-12 mb-1 leading-snug group-hover:text-emerald-600 transition-colors">
            {product?.title}
          </h3>

          {/* حالة المخزون الافتراضية والتقييم الثابت كعنصر ثقة للمتجر */}
          <div className="flex items-center justify-between mb-4 text-gray-400 text-[11px] font-medium border-b border-slate-50 pb-2">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-emerald-600 font-bold">متوفر بالمخزن وجاهز للشحن</span>
            </div>

            <div className="flex items-center gap-1" dir="ltr">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={10}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="font-bold text-slate-500">(5.0)</span>
            </div>
          </div>

          {/* أسعار المنتج */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-black text-slate-900">
              {price.toLocaleString()}
            </span>
            <span className="text-sm font-bold text-slate-500">
              {currency}
            </span>
            {oldPrice > price && (
              <span className="text-slate-300 line-through text-xs font-medium">
                {oldPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* تنويه الشحن السريع والدفع عند الاستلام مخصص لقطاعك */}
          <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-2.5 mb-4 text-center">
            <p className="text-[12px] text-emerald-800 font-bold">
              ⚡ شحن سريع للمحافظات • الدفع يد بيد عند الاستلام
            </p>
          </div>

          {/* الأزرار التفاعلية - تفتح الواتساب مباشرة */}
          <div className="flex gap-2 mt-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="flex-[3] bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl text-center text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm shadow-emerald-200"
            >
              <MessageCircle size={16} className="fill-white" />
              اطلب عبر الواتساب
            </a>

            <Link
              href={`/${country}/product/${safeSlug}`}
              className="flex-1 bg-slate-50 text-slate-600 py-3 rounded-2xl text-center hover:bg-slate-100 flex items-center justify-center transition-colors"
            >
              <ArrowLeft size={18} />
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}