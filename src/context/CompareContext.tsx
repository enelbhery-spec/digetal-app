"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type Product = {
  id: string;
  title: string;

  slug?: string;

  image_url?: string;

  price?: number;

  category_slug?: string;
};

type CompareContextType = {
  items: Product[];

  add: (product: Product) => void;

  remove: (id: string) => void;

  clear: () => void;
};

const CompareContext =
  createContext<CompareContextType | null>(
    null
  );

export function CompareProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<
    Product[]
  >([]);

  const add = (product: Product) => {
    setItems((prev) => {
      // منع التكرار
      const exists = prev.find(
        (p) => p.id === product.id
      );

      if (exists) {
        return prev;
      }

      // السماح بمنتجين فقط
      if (prev.length >= 2) {
        alert(
          "يمكنك مقارنة منتجين فقط"
        );

        return prev;
      }

      // التأكد من نفس التصنيف
      if (prev.length === 1) {
        const oldCategory =
          prev[0]?.category_slug;

        const newCategory =
          product?.category_slug;

        if (
          oldCategory &&
          newCategory &&
          oldCategory !== newCategory
        ) {
          alert(
            "لا يمكن مقارنة منتجات من تصنيفات مختلفة"
          );

          return prev;
        }
      }

      return [...prev, product];
    });
  };

  const remove = (id: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  const clear = () => {
    setItems([]);
  };

  return (
    <CompareContext.Provider
      value={{
        items,
        add,
        remove,
        clear,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context =
    useContext(CompareContext);

  if (!context) {
    throw new Error(
      "useCompare must be used inside CompareProvider"
    );
  }

  return context;
}