"use client";
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import PremiumProductCard from '@/components/PremiumProductCard'; 
import { fetchAllTopRatedProducts, type Product } from '@/lib/productService';

const TopRatedGrid = ({ country }: { country: string }) => {
  // 1. تعريف جميع الحالات (States) المطلوبة
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // هذا هو المتغير الذي كان مفقوداً
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pageSize = 6;

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const safeCountry = country?.toLowerCase() === 'egypt' ? 'eg' : country?.toLowerCase();
      
      // جلب البيانات بناءً على الصفحة الحالية
      const result = await fetchAllTopRatedProducts(safeCountry || 'eg', currentPage, pageSize);
      
      setProducts(result.products || []);
      setTotalCount(result.totalCount || 0);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  }, [country, currentPage]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // التمرير بسلاسة لأعلى القسم عند تغيير الصفحة
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!loading && products.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-16 bg-[#F9FAFB]" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-gray-900 border-r-4 border-[#00A67E] pr-4 italic">
            قارن العروض المميزة واختار الافضل لك <span className="text-[#00A67E] text-sm not-italic font-medium mr-2">(+1000 تقييم)</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {loading && products.length === 0 ? (
            [...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-[400px] rounded-[1.5rem]"></div>
            ))
          ) : (
            products.map((product) => (
              <PremiumProductCard key={product.id} product={product} country={country} />
            ))
          )}
        </div>

        {/* نظام التنقل الذكي والمختصر */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12 flex-wrap">
            {/* سهم السابق */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              title="الصفحة السابقة"
              className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            <div className="flex gap-2">
              {/* دائماً اظهر الصفحة الأولى */}
              <button
                onClick={() => handlePageChange(1)}
                className={`w-11 h-11 rounded-xl font-bold transition-all ${
                  currentPage === 1 ? "bg-[#00A67E] text-white shadow-md" : "bg-white text-gray-400 border border-gray-100 hover:text-[#00A67E]"
                }`}
              >
                1
              </button>

              {currentPage > 3 && <span className="flex items-end pb-2 px-1 text-gray-400 font-bold">...</span>}

              {/* الصفحات الوسطى */}
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                if (pageNum !== 1 && pageNum !== totalPages && Math.abs(pageNum - currentPage) <= 1) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-11 h-11 rounded-xl font-bold transition-all ${
                        currentPage === pageNum
                          ? "bg-[#00A67E] text-white scale-110 shadow-md"
                          : "bg-white text-gray-400 border border-gray-100 hover:text-[#00A67E]"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                return null;
              })}

              {currentPage < totalPages - 2 && <span className="flex items-end pb-2 px-1 text-gray-400 font-bold">...</span>}

              {/* دائماً اظهر الصفحة الأخيرة */}
              {totalPages > 1 && (
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className={`w-11 h-11 rounded-xl font-bold transition-all ${
                    currentPage === totalPages ? "bg-[#00A67E] text-white shadow-md" : "bg-white text-gray-400 border border-gray-100 hover:text-[#00A67E]"
                  }`}
                >
                  {totalPages}
                </button>
              )}
            </div>

            {/* سهم التالي */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
              title="الصفحة التالية"
              className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopRatedGrid;