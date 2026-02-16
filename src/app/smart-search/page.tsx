"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function SmartSearchPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('universal_search')
        .select('*')
        .in('category', ['deals', 'market', 'jobs'])
        .order('created_at', { ascending: false });
      
      if (data) setItems(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  // فلترة البيانات لضمان عدم عرض أي سجلات ناقصة
  const marketData = items.filter(i => i.category === 'market' && i.title);
  const deals = items.filter(i => i.category === 'deals' && i.price_deal);
  const jobs = items.filter(i => i.category === 'jobs' && i.title);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-slate-500 font-bold animate-pulse">جاري فحص المحرك الذكي...</div>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50 pb-12 font-sans" dir="rtl">
      
      {/* --- شريط التحديثات اللحظية (يظهر فقط إذا وجد بيانات سوق) --- */}
      {marketData.length > 0 && (
        <div className="bg-slate-900 text-yellow-400 py-3 overflow-hidden border-b border-yellow-500/20">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...marketData, ...marketData].map((m, idx) => (
              <div key={idx} className="flex items-center gap-2 mx-10">
                <span className="font-bold">{m.title}:</span>
                <span className="text-white">{m.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-black text-slate-800 mb-2">المحرك الذكي للنتائج المباشرة</h1>
          <p className="text-slate-500">تحديثات تلقائية من جميع المصادر الموثوقة</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* العمود الأساسي: العروض المتاحة (يختفي القسم لو فارغ) */}
          {deals.length > 0 ? (
            <section className="lg:col-span-8">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                ⚡ لقطات وعروض متاحة الآن
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {deals.map((deal) => (
                  <div key={deal.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-lg transition group">
                    <div className="mb-3">
                      {/* عرض اسم المصدر من الوصف بشكل ديناميكي دون تثبيته في الكود */}
                      <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded">
                        {deal.description?.split(' - ')[0] || "عرض جديد"}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-800 line-clamp-2 mb-4 h-12">
                      {deal.title}
                    </h3>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                      <span className="text-2xl font-black text-green-600">
                        {deal.price_deal} <small className="text-xs">EGP</small>
                      </span>
                      <a href={deal.main_value} target="_blank" className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-blue-600 transition">
                        عرض التفاصيل
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <div className="lg:col-span-8 bg-white p-10 rounded-2xl text-center border border-dashed text-slate-400">
              لا توجد عروض تجارية متاحة في هذه اللحظة.
            </div>
          )}

          {/* العمود الجانبي: الوظائف والخدمات */}
          <aside className="lg:col-span-4 space-y-6">
            {jobs.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">💼 فرص عمل شاغرة</h2>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="p-3 rounded-lg bg-slate-50 hover:bg-blue-50 transition">
                      <h4 className="font-bold text-sm text-slate-700">{job.title}</h4>
                      <a href={job.main_value} target="_blank" className="text-blue-600 text-[10px] font-bold mt-2 inline-block">تصفح الوظيفة ←</a>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="bg-blue-600 rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-2">دليل المستخدم</h3>
              <p className="text-xs opacity-90 leading-relaxed">
                هذا المحرك يقوم بمسح شامل للمتاجر والمنصات لتقديم أفضل النتائج. جميع الروابط مباشرة وتدعم اللغة العربية.
              </p>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </main>
  );
}