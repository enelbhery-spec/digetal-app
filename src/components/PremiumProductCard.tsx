"use client";

import React from "react";
import Link from "next/link";
import {
  Star,
  ShoppingCart,
  Eye,
  Tag,
  GitCompare,
  ArrowUpRight,
} from "lucide-react";
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

  const currentCountry = (country || "eg").toLowerCase();

  const safeSlug = product.slug || String(product.id);

  const brandLogo =
    product.brands?.logo ||
    product.brand_logo ||
    "/placeholder-logo.png";

  const handleAddCompare = () => {
    if (isSelected) return;

    if (isDifferentCategory) {
      alert("❌ لا يمكن مقارنة منتجات من تصنيفات مختلفة");
      return;
    }

    add({
      id: product.id,
      title: product.title || "",
      category_slug: currentCategory,
    } as any);
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border hover:shadow-lg transition group relative">

      {/* 🔥 زر الانتقال لصفحة المنتج */}
      <Link
        href={`/${currentCountry}/product/${product.slug || product.id}`}
        aria-label="عرض تفاصيل المنتج"
        title="عرض تفاصيل المنتج"
        className="absolute bottom-4 left-4 bg-white shadow-md border rounded-full p-2 hover:bg-gray-100 transition z-10"
      >
        <ArrowUpRight size={20} />
      </Link>

      {/* 🔥 الهيدر */}
      <div className="flex justify-between items-center mb-2">
        <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded-lg font-bold">
          {product.discount_label || "متغير"}
        </span>

        <img
          src={brandLogo}
          alt={`شعار ${product.brands?.slug || "المتجر"}`}
          title={`شعار ${product.brands?.slug || "المتجر"}`}
          onError={(e) =>
            ((e.currentTarget as HTMLImageElement).src =
              "/placeholder-logo.png")
          }
          className="w-8 h-8 object-contain"
        />
      </div>

      {/* 🔥 الصورة */}
      <div className="h-44 flex items-center justify-center bg-gray-50 rounded-xl mb-3 overflow-hidden">
        <img
          src={product.image_url || "/placeholder.png"}
          alt={product.title || "صورة المنتج"}
          title={product.title || "صورة المنتج"}
          className="max-h-full object-contain group-hover:scale-105 transition"
        />
      </div>

      {/* 🔥 التصنيف + المقارنة */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] text-green-600 font-bold flex items-center gap-1">
          <Tag size={14} /> {product.categories?.title || "منتج مميز"}
        </span>

        <button
          onClick={handleAddCompare}
          disabled={isDifferentCategory}
          aria-label="إضافة المنتج للمقارنة"
          title="إضافة للمقارنة"
          className={`flex items-center gap-1 text-[10px] px-3 py-1 rounded-full font-bold transition
          ${
            isSelected
              ? "bg-green-500 text-white"
              : isDifferentCategory
              ? "bg-gray-200 text-gray-400"
              : "bg-blue-70 text-blue-600 hover:bg-blue-600 hover:text-white"
          }`}
        >
          <GitCompare size={20} />
          {isSelected ? "مضاف" : "قارن"}
        </button>
      </div>

      {/* 🔥 المشاهدات */}
      <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
        <Eye size={12} />
        {product.reviewsCount || 0} مشاهدة
      </div>

      {/* 🔥 العنوان */}
      <Link
        href={`/${currentCountry}/products/${safeSlug}`}
        className="text-sm font-bold line-clamp-2 hover:text-blue-600 transition"
        title={product.title}
      >
        {product.title}
      </Link>

      {/* 🔥 التقييم */}
      <div className="flex items-center gap-1 mt-2 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={12}
            className={
              i < Math.floor(product.rating || 0)
                ? "text-yellow-400"
                : "text-gray-500"
            }
            fill="currentColor"
          />
        ))}
        <span className="text-xs text-gray-500">
          ({product.rating || 0})
        </span>
      </div>

      {/* 🔥 السعر */}
      <div className="mb-3">
        <span className="text-lg font-black">
          {product.price} {product.currency || "EGP"}
        </span>
      </div>

      {/* 🔥 زر الشراء */}
      <a
        href={product.affiliate_link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="الذهاب إلى المتجر"
        title="الذهاب إلى المتجر"
        className="w-full bg-black text-white py-3 rounded-xl text-center font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition"
      >
        <ShoppingCart size={14} />
      العرض إلى المتجر
      </a>
    </div>
  );
};

export default PremiumProductCard;