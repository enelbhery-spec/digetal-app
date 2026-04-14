import { supabase } from "@/lib/supabase"; 
import Link from 'next/link';

interface Article {
  title: string;
  slug: string;
  content: string;
  created_at: string;
}

export default async function ArticlesSection({ countryCode }: { countryCode: string }) {
  // تحويل الكود لحروف صغيرة وضمان عدم وجود مسافات
  const cleanCode = countryCode.toLowerCase().trim();

  const { data: articles, error } = await supabase
    .from('articles')
    .select('title, slug, content, created_at')
    // استخدام .ilike يجعل البحث مرنًا (Case-insensitive)
    .ilike('code', cleanCode) 
    .order('created_at', { ascending: false })
    .limit(4);

  // إذا حدث خطأ في الاستعلام
  if (error) {
    console.error("Supabase Error:", error.message);
    return null;
  }

  // في حال لم يجد مقالات، سنعرض رسالة بسيطة للتطوير (يمكنك حذفها لاحقاً)
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
              <div className="p-7 flex flex-col h-full">
                <h3 className="text-lg font-black text-gray-800 mb-4 group-hover:text-blue-600 line-clamp-2 leading-tight">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                  {article.content?.replace(/[#*!\[\]\(\)]/g, '').substring(0, 100)}...
                </p>
                <div className="mt-auto text-blue-600 font-black text-xs">
                  اقرأ المزيد
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}