// src/app/safka-products/[id]/page.tsx

// 1. تعريف الـ Props المتوافق مع Next.js 15
type Props = {
  params: Promise<{ id: string }>;
};

// هذا المكون هو الـ Server Component المسؤول عن عرض الصفحة
export default async function Page({ params }: Props) {
  const { id } = await params;

  // في مشروعك الحقيقي، ستقوم هنا بجلب بيانات المنتج من Supabase باستخدام الـ id
  // const product = await getProductFromSupabase(id);

  return (
    <main className="p-8">
      <h1>تفاصيل المنتج: {id}</h1>
      
      {/* هنا نستخدم الزر الذي قمنا بتعريفه سابقاً */}
      {/* تأكد من استيراد المكون بشكل صحيح إذا كان في ملف منفصل */}
      {/* <BuyNowButton productId={id} price={100} /> */}
      
      <p>هذه الصفحة تعمل الآن بنجاح مع Next.js 15.</p>
    </main>
  );
}