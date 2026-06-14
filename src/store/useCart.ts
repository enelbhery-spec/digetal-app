import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;          // الـ id الداخلي للتطبيق
  safka_id: string;    // المعرف الخاص بمنتج صفقة
  name: string;
  price: number;
  image: string;
  category: string;
  property_id?: string | null; // الخاصية المختارة
  quantity: number;    // الكمية
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  toggleCart: (status: boolean) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      
      addItem: (item) => 
        set((state) => {
          // التحقق إذا كان المنتج موجوداً مسبقاً لزيادة الكمية بدلاً من التكرار
          const existingItemIndex = state.items.findIndex(
            (i) => i.id === item.id && i.property_id === item.property_id
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += item.quantity;
            return { items: newItems, isOpen: true };
          }

          return { 
            items: [...state.items, item],
            isOpen: true 
          };
        }),

      removeItem: (id) => 
        set((state) => ({ 
          items: state.items.filter((i) => i.id !== id) 
        })),

      toggleCart: (status) => set({ isOpen: status }),
    }),
    {
      name: 'cart-storage',
    }
  )
);