import Link from "next/link"
import { supabase } from "@/lib/supabase"

type PageProps = {
  params: Promise<{ country: string }>
}

export default async function CompareListPage({ params }: PageProps) {
  const { country } = await params

  const { data: comparisons } = await supabase
    .from("comparisons")
    .select("slug")
    .eq("country", country)

  if (!comparisons || comparisons.length === 0) {
    return <div className="text-center py-20">لا توجد مقارنات</div>
  }

  return (
    <div className="container mx-auto px-4 py-10" dir="rtl">
      <h1 className="text-3xl font-bold text-center mb-10">
        المقارنات المتاحة
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {comparisons.map((item) => (
          <Link
            key={item.slug}
            href={`/${country}/compare/${item.slug}`}
            className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition"
          >
            {item.slug.replaceAll("-", " ")}
          </Link>
        ))}
      </div>
    </div>
  )
}