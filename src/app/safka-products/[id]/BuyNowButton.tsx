"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "@/store/useCart";
// 1. استيراد دالة التتبع من المسار الصحيح لديك
import { trackEvent } from "@/utils/tracker"; 

type Props = {
  productId: string;
  safka_id: string;
  property_id?: string | null;
  name: string;
  price: number;
  sale_price: number;
  image: string;
  category: string;
};

export default function BuyNowButton({
  productId,
  safka_id,
  property_id,
  name,
  price,
  sale_price,
  image,
  category,
}: Props) {
  const router = useRouter();
  const { addItem, toggleCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  const productData = {
    safka_id,
    property_id,
    name,
    sale_price: Number(sale_price),
    image,
    quantity: 1,
  };

  async function handleBuy() {
    setLoading(true);

    console.log("🛒 PRODUCT ADDED:", productData);

    // 2. تتبع حدث الضغط على زر الشراء الفوري مع تمرير معرف المنتج
    if (productId) {
      trackEvent("click_buy_button", productId);
    }

    addItem(productData);
    router.push(`/checkout/${productId}`);
  }

  function handleAddToCart() {
    console.log("🛒 PRODUCT ADDED:", productData);

    // 3. تتبع حدث إضافة المنتج إلى السلة
    if (productId) {
      trackEvent("add_to_cart", productId);
    }

    addItem(productData);
    toggleCart(true);
  }

  return (
    <div className="flex flex-col gap-3 w-full mt-6">
      <button
        onClick={handleBuy}
        disabled={loading}
        className="w-full bg-slate-950 text-white py-5 rounded-2xl font-bold"
      >
        {loading ? "جاري التجهيز..." : "شراء المنتج الآن"}
      </button>

      <button
        onClick={handleAddToCart}
        className="w-full border-2 border-emerald-600 text-emerald-600 py-5 rounded-2xl font-bold"
      >
        أضف للسلة
      </button>
    </div>
  );
}