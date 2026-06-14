"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "@/store/useCart";

type Props = {
  productId: string;
  safka_id: string; // أضفنا هذا لتلقي معرف المنتج الخاص بصفقة
  name: string;
  price: number;
  image: string;
  category: string;
};

export default function BuyNowButton({ productId, safka_id, name, price, image, category }: Props) {
  const router = useRouter();
  const { addItem, toggleCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  // تجهيز بيانات المنتج لتطابق الـ interface الجديد في useCart
  const productData = { 
    id: productId, 
    safka_id, 
    name, 
    price, 
    image, 
    category,
    quantity: 1,
    property_id: null 
  };

  async function handleBuy() {
    setLoading(true);
    addItem(productData);
    router.push(`/checkout/${productId}`);
  }

  function handleAddToCart() {
    addItem(productData);
    toggleCart(true); // فتح السلة فوراً عند الإضافة
  }

  return (
    <div className="flex flex-col gap-3 w-full mt-6">
      {/* زر شراء الآن - اللون الأسود الفخم */}
      <button
        onClick={handleBuy}
        disabled={loading}
        className="w-full bg-slate-950 hover:bg-slate-800 text-white py-5 rounded-2xl text-lg font-bold transition-all active:scale-95 disabled:opacity-60 shadow-lg"
      >
        {loading ? "جاري التجهيز..." : "شراء المنتج الآن"}
      </button>

      {/* زر أضف للسلة - الحدود الخضراء */}
      <button
        onClick={handleAddToCart}
        className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-5 rounded-2xl text-lg font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        أضف للسلة
      </button>
    </div>
  );
}