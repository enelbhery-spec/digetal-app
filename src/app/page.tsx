import { supabase } from "@/lib/supabase";
import { Play, BookOpen } from "lucide-react";
import Link from "next/link";
import Pagination from "@/components/Pagination";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const pageSize = 6;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const [articlesRes, countRes] = await Promise.all([
    supabase
      .from("articles")
      .select("id, title, slug, image_url")
      .range(from, to)
      .order("created_at", { ascending: false }),
    supabase
      .from("articles")
      .select("*", { count: "exact", head: true })
  ]);

  const articles = articlesRes.data || [];
  const totalPages = Math.ceil((countRes.count || 0) / pageSize);

  return (
    <main className="flex flex-col min-h-screen bg-white" dir="rtl">
      <script dangerouslySetInnerHTML={{ __html: `if(localStorage.getItem('country')==='eg') window.location.href='/eg';` }} />

      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <img src="/logo.png" alt="Extra Code" className="w-32 h-32 object-contain mb-8" />
        <h1 className="text-4xl font-black text-slate-900 mb-4">أهلاً بك في متجر Extra Code</h1>
        <button
          onClick={() => { localStorage.setItem('country', 'eg'); window.location.href = '/eg'; }}
          className="bg-green-600 hover:bg-green-700 transition-all text-white px-12 py-4 rounded-2xl font-black text-lg shadow-xl"
        >
          🇪🇬 متابعة إلى متجر مصر
        </button>
      </section>

      {articles.length > 0 && (
        <section className="w-full bg-white py-16 border-t">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-black text-center mb-10 flex items-center justify-center gap-3">
              <BookOpen className="text-emerald-600" /> أحدث المقالات
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.map((art) => (
                <Link href={`/eg/article/${art.slug}`} key={art.id} className="bg-slate-50 rounded-3xl overflow-hidden shadow-md border hover:shadow-xl transition-all block">
                  {art.image_url && <img src={art.image_url} alt={art.title} className="w-full aspect-video object-cover" />}
                  <div className="p-4"><h3 className="font-black text-center line-clamp-2">{art.title}</h3></div>
                </Link>
              ))}
            </div>
            {/* العداد */}
            <div className="mt-12 flex justify-center">
               <Pagination currentPage={page} totalPages={totalPages} baseUrl="/?page=" />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}