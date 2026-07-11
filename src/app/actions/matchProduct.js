'use server'
import { createClient } from '@/lib/supabase';
import { getSimilarityScore } from '@/lib/similarity';
import { TABLE_CONFIGS } from '@/lib/dbMapping';

export async function matchAndGetPrice(productId, type) {
  const supabase = createClient();
  const config = TABLE_CONFIGS[type];
  
  if (!config) throw new Error("نوع الجدول غير مدعوم");

  // 1. جلب المنتج ديناميكياً باستخدام المصدر الصحيح (matchSourceField)
  // قمنا بتعديل الاستعلام ليجلب حقل المصدر بناءً على الجدول
  const { data: product, error } = await supabase
    .from(config.name)
    .select(`id, ${config.matchSourceField}, ${config.priceField}`)
    .eq('id', productId)
    .single();

  if (error) throw new Error("فشل جلب المنتج من جدول " + config.name);

  // استخراج نص المصدر (سواء كان title أو description)
  const sourceText = product[config.matchSourceField];
  
  // 2. البحث في أمازون باستخدام النص المستخرج
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/scrape`, {
    method: 'POST',
    body: JSON.stringify({ productName: sourceText })
  });
  const amazonData = await response.json();

  if (!amazonData.success) return { success: false, message: "فشل السحب من أمازون" };

  // 3. المطابقة: مقارنة النص المستخرج من الداتابيز بعنوان أمازون
  const score = getSimilarityScore(sourceText, amazonData.data.title);

  // 4. تحديث البيانات في الداتابيز
  const { error: updateError } = await supabase
    .from(config.name)
    .update({
      amazon_price: amazonData.data.price,
      amazon_match_title: amazonData.data.title,
      match_confidence: (score * 100).toFixed(0)
    })
    .eq('id', productId);

  if (updateError) throw new Error("فشل تحديث البيانات في الداتابيز");

  return { success: true, score: (score * 100).toFixed(0), amazonPrice: amazonData.data.price };
}