"use client";

import { useCartStore } from "@/store/useCart";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity } = useCartStore();
  const router = useRouter();

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (items.length === 0) return;
    const country = "eg"; 
    toggleCart(false);
    
    // التعديل هنا: إضافة "new" ليتناسب مع مسار المجلد [id] الخاص بك
    // سيؤدي هذا لتوجيه المستخدم إلى: /eg/checkout/new
    router.push(`/${country}/checkout/new`); 
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={() => toggleCart(false)} />

      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">سلة المشتريات</h2>
          <button onClick={() => toggleCart(false)} aria-label="إغلاق السلة">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">السلة فارغة</p>
          ) : (
            items.map((item, index) => (
              <div key={`${item.id}-${item.property_id || index}`} className="flex gap-4 border-b pb-4 items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-slate-800">{item.name}</h3>
                  <p className="text-emerald-600 font-bold text-sm">
                    {Number(item.sale_price).toLocaleString()} ج.م
                  </p>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.property_id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 font-bold"
                    >-</button>
                    <span className="font-bold w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.property_id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 font-bold"
                    >+</button>
                  </div>
                </div>

                <button 
                  onClick={() => removeItem(item.id, item.property_id)} 
                  className="text-red-500 text-xs hover:underline"
                >
                  حذف
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <>
            <div className="mt-6 p-4 bg-emerald-50 border-r-4 border-emerald-500 rounded text-sm text-emerald-800">
              <p>💡 <strong>نصيحة توفير:</strong> تكلفة الشحن ثابتة! أضف منتج آخر لتوفير مصاريف الشحن.</p>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="mt-4 w-full bg-slate-950 text-white py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all active:scale-95"
            >
              إتمام الطلب
            </button>
          </>
        )}
      </div>
    </div>
  );
}