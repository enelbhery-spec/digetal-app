"use client";

import { useCartStore } from "@/store/useCart";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem } = useCartStore();
  const router = useRouter();

  // إذا كانت السلة مغلقة، لا تعرض شيئاً
  if (!isOpen) return null;

  const handleCheckout = () => {
    if (items.length === 0) return;

    // بما أن المسار هو [country]/checkout/[id]
    // سنستخدم "eg" كدولة افتراضية والـ id الخاص بأول منتج في السلة
    const country = "eg"; 
    const productId = items[0].id; 
    
    toggleCart(false); // إغلاق السلة أولاً
    router.push(`/${country}/checkout/${productId}`); // التوجيه للمسار الديناميكي الصحيح
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* خلفية معتمة */}
      <div 
        className="absolute inset-0 bg-black/40" 
        onClick={() => toggleCart(false)} 
      />

      {/* نافذة السلة */}
      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">سلة المشتريات</h2>
          <button onClick={() => toggleCart(false)} aria-label="إغلاق السلة">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* عرض المنتجات */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">السلة فارغة</p>
          ) : (
            items.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex justify-between py-4 border-b">
                <span className="font-medium text-slate-700">{item.name}</span>
                <button 
                  type="button"
                  onClick={() => removeItem(item.id)} 
                  className="text-red-500 text-sm hover:underline"
                  aria-label="حذف المنتج"
                >
                  حذف
                </button>
              </div>
            ))
          )}
        </div>

        {/* نصيحة التوفير */}
        {items.length > 0 && (
          <div className="mt-6 p-4 bg-emerald-50 border-r-4 border-emerald-500 rounded text-sm text-emerald-800">
            <p>💡 <strong>نصيحة توفير:</strong> تكلفة الشحن ثابتة! أضف منتج آخر لتوفير مصاريف الشحن.</p>
          </div>
        )}
        
        {/* زر إتمام الطلب */}
        {items.length > 0 && (
          <button 
            type="button" 
            onClick={handleCheckout}
            className="mt-4 w-full bg-slate-950 text-white py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all active:scale-95"
          >
            إتمام الطلب
          </button>
        )}
      </div>
    </div>
  );
}