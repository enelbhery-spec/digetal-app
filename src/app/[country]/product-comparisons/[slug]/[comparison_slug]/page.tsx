import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    country: string;
    slug: string;
    comparison_slug: string;
  }>;
};

export default async function ComparisonPage({
  params,
}: Props) {

  const {
    comparison_slug,
    country,
  } = await params;

  // ✅ استخراج IDs
  const parts =
    comparison_slug.split("-vs-");

  const p1_id = parts[0];
  const p2_id = parts[1];

  // ✅ جلب المنتجات
  const { data: products } =
    await supabase
      .from("products")
      .select("*")
      .in("id", [p1_id, p2_id]);

  if (
    !products ||
    products.length < 2
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl md:text-3xl font-black p-6 text-center">

        لا توجد منتجات للمقارنة

      </div>
    );
  }

  const p1 = products.find(
    (p) => p.id === p1_id
  );

  const p2 = products.find(
    (p) => p.id === p2_id
  );

  if (!p1 || !p2) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl md:text-3xl font-black p-6 text-center">

        المقارنة غير متوفرة

      </div>
    );
  }

  // ✅ حساب التقييم بالنسبة المئوية
  const p1Percent = Math.round(
    ((p1.rating || 0) / 5) * 100
  );

  const p2Percent = Math.round(
    ((p2.rating || 0) / 5) * 100
  );

  // ✅ حساب الخصم
  const p1Discount =
    p1.old_price &&
    p1.old_price > p1.price
      ? Math.round(
          ((p1.old_price -
            p1.price) /
            p1.old_price) *
            100
        )
      : 0;

  const p2Discount =
    p2.old_price &&
    p2.old_price > p2.price
      ? Math.round(
          ((p2.old_price -
            p2.price) /
            p2.old_price) *
            100
        )
      : 0;

  // ✅ تحديد الأفضل
  const best =
    p1Percent >= p2Percent
      ? p1
      : p2;

  // ✅ العملة
  const currency =
    country === "sa"
      ? "ر.س"
      : "ج.م";

  return (
    <div
      className="min-h-screen bg-slate-50 py-6 md:py-10 px-3 md:px-6"
      dir="rtl"
    >

      <div className="max-w-7xl mx-auto">

        {/* العنوان */}
        <div className="text-center mb-8 md:mb-10">

          <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-3">

            مقارنة المنتجات

          </h1>

          <p className="text-slate-500 text-sm md:text-lg">

            قارن بين المنتجات واختر الأفضل لك

          </p>

        </div>

        {/* الجدول */}
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-200">

          <div className="overflow-x-auto">

            <table className="w-full text-center min-w-[700px]">

              <tbody>

                {/* العناوين */}
                <tr className="bg-slate-100">

                  <td className="p-3 md:p-5 font-black text-sm md:text-xl w-[18%] text-slate-900">

                    العنصر

                  </td>

                  <td className="p-3 md:p-5">

                    <h2 className="font-black text-sm md:text-lg leading-relaxed line-clamp-2">

                      {p1.title}

                    </h2>

                  </td>

                  <td className="p-3 md:p-5">

                    <h2 className="font-black text-sm md:text-lg leading-relaxed line-clamp-2">

                      {p2.title}

                    </h2>

                  </td>

                </tr>

                {/* الصورة */}
                <tr className="border-t">

                  <td className="p-3 md:p-5 font-black text-slate-700 text-sm md:text-base">

                    الصورة

                  </td>

                  <td className="p-3 md:p-6">

                    <img
                      src={
                        p1.image_url ||
                        "/no-image.png"
                      }
                      alt={p1.title}
                      className="w-28 h-28 md:w-56 md:h-56 object-contain mx-auto hover:scale-105 transition"
                    />

                  </td>

                  <td className="p-3 md:p-6">

                    <img
                      src={
                        p2.image_url ||
                        "/no-image.png"
                      }
                      alt={p2.title}
                      className="w-28 h-28 md:w-56 md:h-56 object-contain mx-auto hover:scale-105 transition"
                    />

                  </td>

                </tr>

                {/* السعر */}
                <tr className="border-t bg-slate-50">

                  <td className="p-3 md:p-5 font-black text-slate-700 text-sm md:text-base">

                    السعر

                  </td>

                  <td className="p-3 md:p-5">

                    <div className="text-xl md:text-3xl font-black text-green-600">

                      {Number(
                        p1.price || 0
                      ).toLocaleString()}

                    </div>

                    <div className="text-xs md:text-sm text-slate-500 mt-1">

                      {currency}

                    </div>

                    {p1.old_price >
                      p1.price && (
                      <div className="text-slate-400 line-through mt-2 text-sm">

                        {Number(
                          p1.old_price
                        ).toLocaleString()}

                      </div>
                    )}

                  </td>

                  <td className="p-3 md:p-5">

                    <div className="text-xl md:text-3xl font-black text-green-600">

                      {Number(
                        p2.price || 0
                      ).toLocaleString()}

                    </div>

                    <div className="text-xs md:text-sm text-slate-500 mt-1">

                      {currency}

                    </div>

                    {p2.old_price >
                      p2.price && (
                      <div className="text-slate-400 line-through mt-2 text-sm">

                        {Number(
                          p2.old_price
                        ).toLocaleString()}

                      </div>
                    )}

                  </td>

                </tr>

                {/* الخصم */}
                <tr className="border-t">

                  <td className="p-3 md:p-5 font-black text-slate-700 text-sm md:text-base">

                    نسبة الخصم

                  </td>

                  <td className="p-3 md:p-5">

                    {p1Discount > 0 ? (
                      <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 md:px-4 py-2 rounded-2xl font-black text-sm md:text-lg">

                        🔥 {p1Discount}%

                      </div>
                    ) : (
                      <span className="text-slate-400 font-bold text-sm">

                        لا يوجد خصم

                      </span>
                    )}

                  </td>

                  <td className="p-3 md:p-5">

                    {p2Discount > 0 ? (
                      <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 md:px-4 py-2 rounded-2xl font-black text-sm md:text-lg">

                        🔥 {p2Discount}%

                      </div>
                    ) : (
                      <span className="text-slate-400 font-bold text-sm">

                        لا يوجد خصم

                      </span>
                    )}

                  </td>

                </tr>

                {/* التقييم */}
                <tr className="border-t">

                  <td className="p-3 md:p-5 font-black text-slate-700 text-sm md:text-base">

                    التقييم

                  </td>

                  <td className="p-3 md:p-5">

                    <div className="font-black text-lg md:text-xl">

                      ⭐ {p1.rating || 0}

                    </div>

                    <div className="mt-3 w-[90%] mx-auto bg-slate-200 rounded-full h-3 md:h-4 overflow-hidden">

                      <div
                        className="bg-green-500 h-full rounded-full"
                        style={{
                          width: `${p1Percent}%`,
                        }}
                      />

                    </div>

                    <div className="mt-2 text-green-600 font-black text-sm md:text-base">

                      {p1Percent}%

                    </div>

                  </td>

                  <td className="p-3 md:p-5">

                    <div className="font-black text-lg md:text-xl">

                      ⭐ {p2.rating || 0}

                    </div>

                    <div className="mt-3 w-[90%] mx-auto bg-slate-200 rounded-full h-3 md:h-4 overflow-hidden">

                      <div
                        className="bg-green-500 h-full rounded-full"
                        style={{
                          width: `${p2Percent}%`,
                        }}
                      />

                    </div>

                    <div className="mt-2 text-green-600 font-black text-sm md:text-base">

                      {p2Percent}%

                    </div>

                  </td>

                </tr>

                {/* المراجعات */}
                <tr className="border-t bg-slate-50">

                  <td className="p-3 md:p-5 font-black text-slate-700 text-sm md:text-base">

                    عدد المراجعات

                  </td>

                  <td className="p-3 md:p-5 text-base md:text-xl font-black text-slate-800">

                    {Number(
                      p1.reviewsCount || 0
                    ).toLocaleString()}

                  </td>

                  <td className="p-3 md:p-5 text-base md:text-xl font-black text-slate-800">

                    {Number(
                      p2.reviewsCount || 0
                    ).toLocaleString()}

                  </td>

                </tr>

                {/* كود المنتج */}
                <tr className="border-t">

                  <td className="p-3 md:p-5 font-black text-slate-700 text-sm md:text-base">

                    كود المنتج

                  </td>

                  <td className="p-3 md:p-5">

                    <span className="bg-orange-100 text-orange-600 px-3 md:px-4 py-2 rounded-xl font-black text-sm md:text-base">

                      {p1.offer_no || "-"}

                    </span>

                  </td>

                  <td className="p-3 md:p-5">

                    <span className="bg-orange-100 text-orange-600 px-3 md:px-4 py-2 rounded-xl font-black text-sm md:text-base">

                      {p2.offer_no || "-"}

                    </span>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

          {/* الأفضل */}
          <div className="text-center py-6 md:py-8 border-t bg-gradient-to-r from-green-50 to-emerald-50">

            <div className="text-2xl md:text-3xl font-black text-green-700">

              🏆 المنتج الأفضل

            </div>

            <div className="mt-3 text-lg md:text-2xl font-black text-slate-900 leading-relaxed px-4">

              {best.title}

            </div>

          </div>

          {/* الأزرار */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-6 border-t bg-white">

            {/* المنتج الأول */}
            <a
              href={
                p1.product_url || "#"
              }
              target="_blank"
              rel="nofollow sponsored"
              className="bg-black hover:bg-slate-800 text-white py-4 md:py-5 rounded-2xl text-center font-black text-lg md:text-xl transition-all hover:scale-[1.02]"
            >

              شراء المنتج الأول

            </a>

            {/* المنتج الثاني */}
            <a
              href={
                p2.product_url || "#"
              }
              target="_blank"
              rel="nofollow sponsored"
              className="bg-orange-500 hover:bg-orange-600 text-white py-4 md:py-5 rounded-2xl text-center font-black text-lg md:text-xl transition-all hover:scale-[1.02]"
            >

              شراء المنتج الثاني

            </a>

          </div>

        </div>

      </div>

    </div>
  );
}