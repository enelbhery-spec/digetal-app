import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  safka_id: string;
  property_id?: string | null;

  name: string;
  sale_price: number;
  image: string;

  quantity: number;

  properties?: {
    _id: string;
    key: string;
    value: number;
    sale_price: number;
    is_available: boolean;
  }[];
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  addItem: (item: CartItem) => void;

  removeItem: (
    safka_id: string,
    property_id?: string | null
  ) => void;

  updateQuantity: (
    safka_id: string,
    property_id: string | null | undefined,
    quantity: number
  ) => void;

  toggleCart: (status: boolean) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addItem: (item) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) =>
              i.safka_id === item.safka_id &&
              i.property_id === item.property_id
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];

            newItems[existingItemIndex].quantity +=
              item.quantity;

            return {
              items: newItems,
              isOpen: true,
            };
          }

          return {
            items: [...state.items, item],
            isOpen: true,
          };
        }),

      updateQuantity: (
        safka_id,
        property_id,
        quantity
      ) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.safka_id === safka_id &&
            item.property_id === property_id
              ? {
                  ...item,
                  quantity: Math.max(1, quantity),
                }
              : item
          ),
        })),

      removeItem: (
        safka_id,
        property_id
      ) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.safka_id === safka_id &&
                item.property_id === property_id
              )
          ),
        })),

      toggleCart: (status) =>
        set({
          isOpen: status,
        }),

      clearCart: () =>
        set({
          items: [],
        }),
    }),
    {
      name: "cart-storage",
    }
  )
);