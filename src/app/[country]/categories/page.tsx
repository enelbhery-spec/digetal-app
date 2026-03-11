import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"

type Props = {
  params: Promise<{
    country: string
  }>
}

export default async function CategoriesPage({ params }: Props) {

  const { country } = await params

  // جلب التصنيفات
  const { data: categories, error } = await supabase
    .from("categories")
    .select("id,title,slug,image")
    .eq("country", country)
    .order("title")

  if (error) {
    return (
      <div className="text-center py-20">
        حدث خطأ في تحميل التصنيفات
      </div>
    )
  }

  return (

    <main className="bg-gray-50 min-h-screen" dir="rtl">

      {/* العنوان */}
      <section className="text-center py-12 bg-white shadow-sm">

        <h1 className="text-3xl font-bold">
          تصنيفات التسوق
        </h1>

        <p className="text-gray-600 mt-2">
          اختر التصنيف المناسب لمشاهدة أفضل المنتجات
        </p>

      </section>


      {/* شبكة التصنيفات */}

      <section className="max-w-6xl mx-auto p-6 grid grid-cols-2 md:grid-cols-4 gap-6">

        {categories?.map((cat) => (

          <Link
            key={cat.id}
            href={`/${country}/category/${cat.slug}`}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center"
          >

            <Image
              src={cat.image || "/placeholder.png"}
              alt={cat.title}
              width={180}
              height={180}
              className="mx-auto mb-4 object-contain"
            />

            <h2 className="font-semibold text-lg">
              {cat.title}
            </h2>

          </Link>

        ))}

      </section>

    </main>
  )
}