"use client"

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Glasses, Footprints, Watch, Smartphone, LayoutGrid, Laptop, Cat, 
  LoaderCircle, Utensils, Shirt, CarFront 
} from "lucide-react";

export default function Categories() {
  const params = useParams();
  
  // التأكد من الحصول على كود الدولة (مصر أو السعودية) بشكل نصي
  const rawCountry = params?.country;
  const country = Array.isArray(rawCountry) ? rawCountry[0] : (rawCountry || 'eg'); 
  
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('id, title, slug')
          .order('id', { ascending: true });
          
        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error("خطأ في جلب التصنيفات:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const getCategoryIcon = (categorySlug: string) => {
    const iconSize = 28;
    const slug = categorySlug.toLowerCase().trim();

    if (slug.includes('mobile')) return <Smartphone size={iconSize} />;
    if (slug.includes('laptop')) return <Laptop size={iconSize} />;
    if (slug.includes('watch')) return <Watch size={iconSize} />;
    if (slug.includes('glass')) return <Glasses size={iconSize} />;
    if (slug.includes('shoes')) return <Footprints size={iconSize} />;
    if (slug.includes('kitchen')) return <Utensils size={iconSize} />;
    if (slug.includes('fashion')) return <Shirt size={iconSize} />;
    if (slug.includes('car')) return <CarFront size={iconSize} />;
    if (slug.includes('pet')) return <Cat size={iconSize} />;
    
    return <LayoutGrid size={iconSize} />;
  };

  if (loading) {
    return (
      <div className="text-center py-20 flex justify-center items-center gap-3 text-gray-400 font-bold">
        <LoaderCircle className="animate-spin" size={24} />
        <span>جاري تحميل الأقسام...</span>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 border-r-4 border-green-500 pr-4">
          <div className="text-right">
            <h2 className="text-3xl font-black text-gray-900">تصنيف المنتجات</h2>
            <p className="text-gray-500 mt-1 font-bold">
              عرض الأقسام المتاحة في السوق ({country.toUpperCase()})
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              /* التعديل هنا: استخدام category بدلاً من product لفك التداخل */
              href={`/${country}/category/${category.slug}`}
              className="relative group bg-gray-50 rounded-[2rem] p-6 border border-transparent hover:border-green-400 hover:bg-green-600 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col items-center text-center"
            >
              <div className="mb-4 inline-flex p-3 bg-white rounded-xl text-green-600 group-hover:bg-white/20 group-hover:text-white transition-all duration-300 shadow-sm">
                {getCategoryIcon(category.slug)}
              </div>
              
              <h3 className="text-sm font-black text-gray-800 group-hover:text-white transition-colors line-clamp-2">
                {category.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}