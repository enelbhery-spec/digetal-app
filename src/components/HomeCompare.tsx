"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Product = {
  id: string;
  title: string;
  slug?: string;
  image_url?: string;
  category_slug?: string;
};

type CompareContextType = {
  items: Product[];
  add: (product: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CompareContext =
  createContext<CompareContextType | null>(null);

export const CompareProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [items, setItems] = useState<Product[]>([]);

  // تحميل البيانات من localStorage
  useEffect(() => {
    const saved =
      localStorage.getItem("compareProducts");

    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  // حفظ البيانات
  useEffect(() => {
    localStorage.setItem(
      "compareProducts",
      JSON.stringify(items)
    );
  }, [items]);

  // إضافة منتج
  const add = (product: Product) => {
    setItems((prev) => {
      // منع التكرار
      if (prev.find((p) => p.id === product.id)) {
        return prev;
      }

      // منتجين فقط
      if (prev.length >= 2) {
        return [product];
      }

      // نفس التصنيف فقط
      if (prev.length === 1) {
        const oldCategory =
          prev[0].category_slug;

        if (
          oldCategory &&
          product.category_slug &&
          oldCategory !== product.category_slug
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

  // حذف منتج
  const remove = (id: string) => {
    setItems((prev) =>
      prev.filter((p) => p.id !== id)
    );
  };

  // مسح الكل
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
};

export const useCompare = () => {
  const context = useContext(CompareContext);

  if (!context) {
    throw new Error(
      "useCompare must be used inside CompareProvider"
    );
  }

  return context;
};