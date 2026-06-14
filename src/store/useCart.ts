import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// تعريف كائن المنتج بدقة لضمان وجود المعرفات المطلوبة لصفقة
export interface CartItem {
  id: string;           // المعرف الفريد للمنتج في قاعدة بياناتك
  safka_id: string;     // معرف المنتج في صفقة (مهم جداً للطلب)
  name: string;
  price: number;
  image: string;
  category: string;
  property_id?: string | null; // معرف الخاصية (Variant ID) - قد يكون null للمنتجات البسيطة
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, property_id?: string | null) => void; // تم تعديلها لتكون أدق
  toggleCart: (status: boolean) => void;
  clearCart: () => void; // إضافة دالة لتصفير السلة بعد نجاح الطلب
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      
      addItem: (item) => 
        set((state) => {
          // نعتمد في التمييز على الـ ID + الـ property_id لضمان دقة الاختيار
          const existingItemIndex = state.items.findIndex(
            (i) => i.id === item.id && i.property_id === item.property_id
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += item.quantity;
            return { items: newItems, isOpen: true };
          }

          // إضافة المنتج كاملاً بكافة تفاصيله (safka_id, property_id)
          return { 
            items: [...state.items, item],
            isOpen: true 
          };
        }),

      // تعديل الحذف ليكون دقيقاً بناءً على معرف المنتج والخاصية
      removeItem: (id, property_id) => 
        set((state) => ({ 
          items: state.items.filter((i) => !(i.id === id && i.property_id === property_id)) 
        })),

      toggleCart: (status) => set({ isOpen: status }),
      
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // هذا هو المفتاح الذي يحفظ البيانات في LocalStorage
    }
  )
);