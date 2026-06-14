// src/components/CartIcon.tsx
"use client";

import { ShoppingCart } from "lucide-react";

type CartIconProps = {
  itemCount?: number; // جعلناه اختيارياً
  onClick?: () => void; // إضافة خاصية الضغط لفتح السلة
};

export default function CartIcon({ itemCount = 0, onClick }: CartIconProps) {
  return (
    <button 
      onClick={onClick}
      className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
      aria-label="سلة المشتريات"
    >
      <ShoppingCart className="w-6 h-6 text-gray-700" />
      
      {/* العداد (Badge) يظهر فقط إذا كان هناك منتجات */}
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-in zoom-in">
          {itemCount}
        </span>
      )}
    </button>
  );
}