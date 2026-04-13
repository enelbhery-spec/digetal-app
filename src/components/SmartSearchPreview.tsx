"use client";

import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PhoneCall, Zap, Loader2 } from "lucide-react";

export default function SmartSearchPreview() {
  const params = useParams();
  const countryParam = params?.country;
  // تحويل الكود إلى lowercase لضمان المطابقة مع الداتابيز
  const countrySlug = (Array.isArray(countryParam) ? countryParam[0] : (countryParam || "eg")).toLowerCase();

  const [items, setItems] = useState<any[]>([]);
  const [hotlines, setHotlines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // 1. جلب بيانات الدولة للحصول على الـ ID لربط المنتجات
        const { data: countryData } = await supabase
          .from("countries")
          .select("id")
          .eq("code", countrySlug)
          .single();

        // 2. جلب الخطوط الساخنة (بناءً على عمود country_code في صورتك)
        const { data: hotlinesData } = await supabase
          .from("hotlines")
          .select("*")
          .eq("country_code", countrySlug) 
          .limit(10);

        // 3. جلب المنتجات (بناءً على country_id)
        let productsData = [];
        if (countryData) {
          const { data } = await supabase
            .from("products")
            .select("*")
            .eq("country_id", countryData.id)
            .order("created_at", { ascending: false })
            .limit(6);
          productsData = data || [];
        }

        setItems(productsData);
        setHotlines(hotlinesData || []);

      } catch (err) {
        console.error("Database Connection Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [countrySlug]);

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-green-600" size={40} />
      </div>
    );
  }

  return (
    <section className="bg-white border-t border-gray-100">
      {/* الشريط الإخباري (Hotlines) */}
      {hotlines.length > 0 && (
        <div className="bg-black text-white py-3 overflow-hidden border-b border-green-500/50">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...hotlines, ...hotlines].map((service, index) => (
              <div key={index} className="flex items-center mx-12">
                <span className="flex items-center justify-center w-6 h-6 bg-green-600 rounded-full text-[10px] ml-3">
                  <PhoneCall size={12} />
                </span>
                <span className="font-bold ml-2 text-green-400">{service.name}:</span>
                <span className="text-white font-black tracking-widest text-lg">{service.number}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="py-16 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 border-r-4 border-green-500 pr-6">
          <div className="text-right">
            <h2 className="text-3xl font-black text-gray-900 flex items-center gap-2">
              <Zap className="text-green-600 fill-green-600" size={32} />
              صيد المحرك في {countrySlug.toUpperCase()}
            </h2>
            <p className="text-gray-500 mt-2 font-bold">أحدث العروض والخدمات المحدثة لحظياً</p>
          </div>
          <Link
            href={`/${countrySlug}/smart-search`}
            className="bg-green-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl"
          >
            دخول المحرك الكامل ←
          </Link>
        </div>

        {/* Products Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((deal) => (
              <div key={deal.id} className="bg-white border border-gray-100 rounded-[2.5rem] p-5 shadow-sm hover:shadow-xl transition-all group">
                <div className="relative w-full h-64 mb-6 rounded-[2rem] overflow-hidden bg-gray-50 flex items-center justify-center">
                  <img 
                    src={deal.image_url || "/placeholder.png"} 
                    alt={deal.name} 
                    className="max-w-[80%] max-h-[80%] object-contain group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <h3 className="font-bold text-gray-800 mb-4 line-clamp-2 h-12">{deal.name}</h3>
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                  <span className="text-xl font-black text-gray-900">
                    {deal.price} <small className="text-xs">{countrySlug === 'sa' ? 'ر.س' : 'ج.م'}</small>
                  </span>
                  <a href={deal.affiliate_link} target="_blank" className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold">تسوق</a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed">
            <p className="text-gray-400 font-bold">لا توجد عروض حالياً لهذه الدولة في قاعدة البيانات</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: fit-content; animation: marquee 30s linear infinite; }
      `}</style>
    </section>
  );
}