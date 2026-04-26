"use client"

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Glasses, Footprints, Watch, Smartphone, LayoutGrid, Laptop, Cat, 
  LoaderCircle, Utensils, Shirt, CarFront 
} from "lucide-react";

interface Category {
  id: number;
  title: string;
  slug: string;
}

export default function Categories() {
  const params = useParams();
  const searchParams = useSearchParams();

  const countryCode = (Array.isArray(params?.country) ? params?.country[0] : params?.country) || 'eg';
  const brand = searchParams.get("brand");

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        if (!brand) {
          const { data, error } = await supabase
            .from('categories')
            .select('id, title, slug')
            .order('id', { ascending: true });
          
          if (error) throw error;
          setCategories(data || []);
        } else {
          const { data, error } = await supabase
            .from('products')
            .select(`
              categories (
                id,
                title,
                slug
              )
            `)
            .eq("brand_slug", brand)
            .eq("country_code", countryCode);

          if (error) throw error;

          const rawCats = data
            ?.map(item => item.categories)
            .filter(Boolean) as unknown as Category[];
          
          const uniqueCats = Array.from(new Map(rawCats.map(c => [c.id, c])).values());
          
          setCategories(uniqueCats);
        }
      } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [brand, countryCode]);

  const getCategoryIcon = (categorySlug: string) => {
    const iconSize = 28;
    const slug = categorySlug.toLowerCase();
    const icons: Record<string, JSX.Element> = {
      mobile: <Smartphone size={iconSize} />,
      laptop: <Laptop size={iconSize} />,
      watch: <Watch size={iconSize} />,
      glass: <Glasses size={iconSize} />,
      shoes: <Footprints size={iconSize} />,
      kitchen: <Utensils size={iconSize} />,
      fashion: <Shirt size={iconSize} />,
      car: <CarFront size={iconSize} />,
      pet: <Cat size={iconSize} />,
    };
    const key = Object.keys(icons).find(k => slug.includes(k));
    return key ? icons[key] : <LayoutGrid size={iconSize} />;
  };

  if (loading) {
    return (
      <div className="text-center py-10 flex justify-center items-center gap-3 text-gray-400 font-bold">
        <LoaderCircle className="animate-spin" size={24} />
        <span>جاري ترتيب الأقسام...</span>
      </div>
    );
  }

  if (categories.length === 0) return null;

  return (
    <section className="py-12 bg-white rounded-[3rem] shadow-sm border border-gray-50 mt-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-2">تصفح حسب القسم</h2>
          <div className="h-1 w-20 bg-green-500 rounded-full"></div>
        </div>

        {/* التعديل الجوهري هنا: 
            grid-cols-1 تجعل العنصر يأخذ العرض كاملاً في الموبايل.
            gap-4 لتقليل المسافات بين الصفوف في الموبايل.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/${countryCode}/category/${category.slug}${brand ? `?brand=${brand}` : ""}`}
              className="group flex flex-row sm:flex-col items-center bg-gray-50 sm:bg-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none hover:bg-gray-100 sm:hover:bg-transparent transition-colors"
            >
              {/* أيقونة القسم - أصبحت أصغر قليلاً في الموبايل لتناسب التنسيق الأفقي */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white sm:bg-gray-50 rounded-2xl sm:rounded-3xl flex items-center justify-center text-green-600 mb-0 sm:mb-3 group-hover:bg-green-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-green-200 group-hover:-translate-y-1 sm:group-hover:-translate-y-2 flex-shrink-0">
                {getCategoryIcon(category.slug)}
              </div>
              
              {/* اسم القسم - مساحة جانبية ms-4 تظهر فقط في الموبايل */}
              <span className="text-base sm:text-sm font-bold text-gray-700 group-hover:text-green-600 transition-colors ms-4 sm:ms-0">
                {category.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}