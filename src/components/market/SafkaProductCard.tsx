import React from 'react';
import Link from 'next/link';

// 1. تعريف نوع البيانات لمنتج صفقة طبقاً لهيكل الجدول الجديد
export interface SafkaProduct {
  id?: number;
  safka_id: string;
  name: string;
  barcode?: string;
  price: number | null;       // السعر الأصلي من صفقة
  sale_price: number;         // سعر البيع الفعلي المقترح
  main_image: string | null;
  images_urls?: string[];
  description?: string;
  media_url?: string;
  faqs?: any;
  note?: string | null;
  code?: string | null;
  country_id?: string | null;
  brand_id?: string | null;
  category_id?: string | null;
  store_id?: string | null;
}

interface SafkaProductCardProps {
  product: SafkaProduct;
}

export default function SafkaProductCard({ product }: SafkaProductCardProps) {
  // 2. تفكيك البيانات بأمان
  const {
    safka_id,
    name,
    main_image,
    price,
    sale_price,
    note
  } = product;

  // 3. حساب نسبة الخصم برمجياً مع حماية النواقص الرقمية
  const originalPrice = price ?? 0;
  const hasDiscount = originalPrice > sale_price;
  const discountPercentage = hasDiscount 
    ? Math.round(((originalPrice - sale_price) / originalPrice) * 100) 
    : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-zinc-900">
      
      {/* Badge نسبة الخصم التسويقية */}
      {hasDiscount && (
        <span className="absolute top-3 right-3 z-10 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
          خصم {discountPercentage}%
        </span>
      )}

      {/* شارة الشحن والتوصيل */}
      <span className="absolute top-3 left-3 z-10 rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-600 backdrop-blur-sm dark:text-amber-400">
        شحن سريع
      </span>

      {/* حوض صورة المنتج */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50 dark:bg-zinc-850">
        <img
          src={main_image || '/placeholder.png'}
          alt={name || 'منتج صفقة'}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* تفاصيل الكارت */}
      <div className="flex flex-1 flex-col p-4">
        {/* اسم المنتج المحمي ضد النصوص الطويلة */}
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-gray-800 transition-colors group-hover:text-blue-600 dark:text-gray-200 text-right" dir="rtl">
          {name}
        </h3>

        {/* الملاحظة التجارية إن وجدت */}
        {note && (
          <p className="mt-1 line-clamp-1 text-right text-xs text-amber-600 dark:text-amber-400" dir="rtl">
            ⚠️ {note}
          </p>
        )}

        {/* منظومة الأسعار الحقيقية الدقيقة */}
        <div className="mt-4 flex items-baseline justify-start gap-2.5" dir="rtl">
          {/* سعر البيع الفعلي للمستهلك */}
          <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
            {sale_price} <span className="text-xs font-normal">ج.م</span>
          </span>
          
          {/* السعر الأصلي مشطوب */}
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through dark:text-gray-500">
              {price} ج.م
            </span>
          )}
        </div>

        {/* تقييمات ومميزات افتراضية لرفع المبيعات */}
        <div className="mt-2 flex items-center justify-between border-t border-gray-50 pt-3 dark:border-zinc-800" dir="rtl">
          <span className="text-[11px] text-gray-500 dark:text-gray-400">
            ⭐ 4.8 (معاينة قبل الاستلام)
          </span>
        </div>

        {/* زر التوجيه لصفحة تفاصيل منتج صفقة الفرعية */}
        <div className="mt-4">
          <Link 
            href={`/safka-products/${safka_id}`}
            className="flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-2.5 text-center text-xs font-medium text-white transition-colors hover:bg-blue-600 dark:bg-zinc-800 dark:hover:bg-blue-600"
          >
            تفاصيل المنتج وشراء
          </Link>
        </div>
      </div>
    </div>
  );
}