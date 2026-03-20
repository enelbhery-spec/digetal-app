import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

type Props = {
  params: Promise<{ country: string }>;
};

export default async function ArticlesPage({ params }: Props) {

  const { country } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  /* ======================
     جلب المقالات حسب الدولة
  ====================== */
  const { data: articles } = await supabase
    .from("articles")
    .select("title, slug")
    .eq("country", country) // مهم جدا
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        مقالات {country === "eg" ? "مصر" : "السعودية"}
      </h1>

      <div className="grid md:grid-cols-2 gap-4">
        {articles?.map((article: any) => (
          <Link
            key={article.slug}
            href={`/${country}/articles/${article.slug}`}
          >
            <div className="p-4 border rounded hover:bg-gray-50 transition">
              {article.title}
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}