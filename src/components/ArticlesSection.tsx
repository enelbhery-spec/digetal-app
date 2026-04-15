import { supabase } from "@/lib/supabase"; 
import Link from 'next/link';
import Image from 'next/image';

interface Article {
  title: string;
  slug: string;
  content: string;
  image_url: string; // تأكد أن الاسم في الداتابيز مطابقة تماماً لهذا الاسم
  created_at: string;
}

export default async function ArticlesSection({ countryCode }: { countryCode: string }) {
  // تنظيف الكود لضمان مطابقة الاستعلام
  const cleanCode = countryCode.toLowerCase().trim();

  const { data: articles, error } = await supabase
    .from('articles')
    .select('title, slug, content, image_url, created_at') 
    .ilike('code', cleanCode) 
    .order('created_at', { ascending: false })
    .limit(4);

  // تسجيل الخطأ في حال وجوده للمساعدة في التصحيح
  if (error) {
    console.error("Supabase Error Details:", error);
    return null;
  }

  if (!articles || articles.length === 0) {
    return null; 
  }

  return (
    <section className="w-full py-16 bg-gray-50 border-t border-gray-200" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-black text-gray-900">
             مقالات تهمك في {cleanCode === 'sa' ? 'السعودية' : 'مصر'}
          </h2>
          <Link href={`/${cleanCode}/articles`} className="text-blue-600 hover:text-blue-800 font-bold">
            عرض الكل ←
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article: Article) => (
            <Link 
              key={article.slug} 
              href={`/${cleanCode}/articles/${article.slug}`}
              className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
            >
              {/* قسم الصورة المطور باستخدام Next.js Image */}
              <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                {article.image_url ? (
                  <Image 
                    src={article.image_url} 
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized={article.image_url.includes('amzn.to')} // مفيد إذا كان الرابط مختصراً
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                    <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs">لا توجد صورة</span>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col h-full">
                <h3 className="text-lg font-black text-gray-800 mb-3 group-hover:text-blue-600 line-clamp-2 leading-tight">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                  {article.content?.replace(/[#*!\[\]\(\)]/g, '').substring(0, 80)}...
                </p>
                <div className="mt-auto flex items-center text-blue-600 font-black text-xs">
                  اقرأ المزيد 
                  <span className="mr-2 group-hover:mr-4 transition-all">←</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}