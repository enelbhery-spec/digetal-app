"use client";

import { createContext, useContext, useState } from "react";

type Product = {
  id: string;
  title: string;
  category_slug?: string;
};

type CompareContextType = {
  items: Product[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CompareContext = createContext<CompareContextType | null>(null);

export const CompareProvider = ({ children }: any) => {
  const [items, setItems] = useState<Product[]>([]);

  const add = (p: Product) => {
    setItems((prev) => {
      // ✅ منع التكرار
      if (prev.find(i => i.id === p.id)) return prev;

      // ✅ منع أكثر من 2
      if (prev.length >= 2) {
        alert("يمكنك مقارنة منتجين فقط");
        return prev;
      }

      // ✅ أهم شرط: نفس التصنيف
      if (prev.length === 1) {
        const existingCategory = prev[0].category_slug;
        if (existingCategory && p.category_slug && existingCategory !== p.category_slug) {
          alert("❌ لا يمكن مقارنة منتجات من تصنيفات مختلفة");
          return prev;
        }
      }

      return [...prev, p];
    });
  };

  const remove = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const clear = () => setItems([]);

  return (
    <CompareContext.Provider value={{ items, add, remove, clear }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used inside CompareProvider");
  return ctx;
};