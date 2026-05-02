"use client";

import React from "react";
import Link from "next/link";
import { Star, ShoppingCart, Copy, Eye, Tag, GitCompare } from "lucide-react";
import { useCompare } from "@/context/CompareContext";

const PremiumProductCard = ({
  product,
  country,
}: {
  product: any;
  country: string;
}) => {
  const { add, items } = useCompare();

  const isSelected = items.some((i) => i.id === product.id);

  const currentCategory =
    product.categories?.slug || product.category_slug || "general";

  const firstCategory = items[0]?.category_slug || "";

  const isDifferentCategory =
    items.length > 0 ? firstCategory !== currentCategory : false;

  const getSafeCountryCode = () => {
    const rawCode = (country || product.code || "eg").toLowerCase().trim();
    if (rawCode === "egypt" || rawCode === "eg") return "eg";
    if (rawCode === "saudi" || rawCode === "sa") return "sa";
    return rawCode;
  };

  const currentCountry = getSafeCountryCode();

  const categoryTitle =
    product.categories?.title || product.category_name || "منتج مميز";

  const categorySlug = currentCategory
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  const safeSlug = product.slug || String(product.id);

  const handleCopyLink = () => {
    const linkToCopy = product.affiliate_link || product.product_url;
    if (linkToCopy) {
      navigator.clipboard.writeText(linkToCopy);
      alert("تم نسخ رابط العرض بنجاح!");
    }
  };

  const handleAddCompare = () => {
    if (isSelected) return;

    if (isDifferentCategory) {
      alert("❌ لا يمكن مقارنة منتجات من تصنيفات مختلفة");
      return;
    }

    add({
      id: product.id,
      title: product.title || "",
      ...(product.slug && { slug: product.slug }),
      category_slug: categorySlug,
    } as any);
  };

  // ✅ أهم سطر: تحديد لوجو البراند
  const brandLogo =
    product.brands?.logo ||
    product.brand_logo || // fallback لو مخزن مباشرة
    "/placeholder-logo.png";

  return (
    <div
      className="bg-white rounded-[1.5rem] p-4 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-all duration-300 group"
      dir="rtl"
    >
      {/* التخفيض + لوجو البراند */}
      <div className="flex justify-between items-start mb-2">
        <span className="bg-[#FF5A5F] text-white text-[10px] font-bold px-2 py-1 rounded-lg">
          {product.discount_label || "-%15"}
        </span>

        <div className="w-9 h-9 p-1 bg-white border border-gray-50 rounded-xl shadow-sm flex items-center justify-center">
          <img
            src={brandLogo}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/placeholder-logo.png";
            }}
            alt={product.brands?.slug || "brand"}
            title={product.brands?.slug || "brand"}
            loading="lazy"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* صورة المنتج */}
      <div className="relative w-full h-48 mb-3 overflow-hidden rounded-xl bg-[#F8F9FA] flex items-center justify-center">
        <img
          src={product.image_url || "/placeholder.png"}
          alt={product.title || "صورة المنتج"}
          title={product.title || "منتج"}
          loading="lazy"
          className="max-w-[90%] max-h-[90%] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* المحتوى */}
      <div className="flex flex-col flex-1">
        {/* التصنيف + المقارنة */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <Tag size={10} className="text-[#00A67E]" />
            <span className="text-[10px] font-bold text-[#00A67E] uppercase tracking-wider">
              {categoryTitle}
            </span>
          </div>

          <button
            onClick={handleAddCompare}
            disabled={isDifferentCategory}
            title="إضافة للمقارنة"
            className={`flex items-center gap-1 text-[9px] px-2 py-1 rounded-full border font-bold transition
            ${
              isSelected
                ? "bg-green-500 text-white border-green-500"
                : isDifferentCategory
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border-blue-100"
            }`}
          >
            <GitCompare size={10} />
            {isSelected
              ? "تمت الإضافة"
              : isDifferentCategory
              ? "تصنيف مختلف ❌"
              : "أضف للمقارنة"}
          </button>
        </div>

        {/* المشاهدات */}
        <div className="flex items-center gap-1 mb-2 text-gray-500 font-medium">
          <Eye size={12} />
          <span className="text-[10px]">
            {product.reviewsCount?.toLocaleString() || "0"} مشاهدة
          </span>
        </div>

        {/* العنوان */}
        <h3 className="text-[13px] font-bold text-gray-800 line-clamp-2 mb-2 leading-relaxed min-h-[38px] hover:text-blue-600 transition-colors">
          <Link href={`/${currentCountry}/products/${safeSlug}`}>
            {product.title}
          </Link>
        </h3>

        {/* التقييم */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                fill={
                  i < Math.floor(product.rating || 0)
                    ? "currentColor"
                    : "none"
                }
                className={
                  i < Math.floor(product.rating || 0)
                    ? "text-amber-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-[10px] font-bold text-gray-400 mr-1">
            ({product.rating || "0"})
          </span>
        </div>

        {/* السعر */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-black text-gray-900">
            {product.price || 0}{" "}
            <small className="text-[11px] font-bold uppercase text-gray-500">
              {product.currency || "EGP"}
            </small>
          </span>

          {product.old_price && (
            <span className="text-xs text-gray-300 line-through">
              {product.old_price}
            </span>
          )}
        </div>

        {/* الأزرار */}
        <div className="space-y-2 mt-auto">
          <div className="flex gap-2">
            <a
              href={product.affiliate_link || product.product_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              title="الذهاب للمتجر"
              className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold text-[11px] flex items-center justify-center gap-2 hover:bg-blue-600 transition-all"
            >
              <ShoppingCart size={14} />
              تسوق الآن
            </a>

            <button
              type="button"
              onClick={handleCopyLink}
              title="نسخ الرابط"
              className="bg-gray-100 p-3 rounded-xl hover:bg-gray-200 transition-colors border border-gray-200"
            >
              <Copy size={14} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumProductCard;