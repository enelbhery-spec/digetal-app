// src/scripts/runMatchJob.js
import { createClient } from '@supabase/supabase-js';
import { matchAndGetPrice } from '@/app/actions/matchProduct';

// ملاحظة: نستخدم SERVICE_ROLE_KEY للوصول الكامل لقاعدة البيانات
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function runAutoMatch(tableType) {
  console.log(`بدء عملية المطابقة التلقائية لجدول: ${tableType}`);

  // 1. جلب فقط المنتجات التي لا تملك قيمة في match_confidence
  // هذا يعني أنها منتجات جديدة أو لم تتم معالجتها
  const { data: products, error } = await supabase
    .from(tableType === 'retail' ? 'products' : 'safka_products')
    .select('id')
    .is('match_confidence', null)
    .limit(20); // معالجة 20 منتجاً فقط في كل مرة (للحماية)

  if (error || !products || products.length === 0) {
    console.log("لا توجد منتجات جديدة تحتاج للمطابقة.");
    return;
  }

  // 2. التنفيذ التتابعي (Loop)
  for (const product of products) {
    try {
      console.log(`جاري مطابقة المنتج ID: ${product.id}`);
      await matchAndGetPrice(product.id, tableType);
      
      // تأخير بسيط (Throttle) لتجنب حظر أمازون (مثلاً 5 ثوانٍ بين كل منتج)
      await new Promise(resolve => setTimeout(resolve, 5000));
    } catch (err) {
      console.error(`فشل في مطابقة المنتج ${product.id}:`, err.message);
    }
  }
  
  console.log("تمت معالجة الدفعة الحالية بنجاح.");
}

// يمكنك استدعاؤها بهذا الشكل:
// runAutoMatch('retail'); // للمنتجات العادية
// runAutoMatch('safka');  // للصفقات