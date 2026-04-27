// تحميل متغيرات البيئة
require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

// ✅ التحقق من القيم
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error("❌ تأكد من وجود بيانات Supabase في .env.local");
  process.exit(1);
}

// 🔹 إنشاء الاتصال
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// 🔹 توليد عنوان ذكي
function generateTitle(product) {
  let title = product.title || "";

  if (!title || title.includes("--") || title.length < 5) {
    if (product.category_id) {
      return `منتج مميز من قسم ${product.category_id} بجودة عالية وسعر مناسب`;
    }
    return "منتج مميز بجودة عالية وسعر مناسب";
  }

  return title.trim();
}

// 🔹 توليد وصف احترافي
function generateDescription(product) {
  const name = product.title || "هذا المنتج";

  return `${name} يعد خيارًا مناسبًا للاستخدام اليومي، حيث يجمع بين الأداء الجيد والسعر المناسب.

يتميز المنتج بتصميم عملي وجودة تصنيع جيدة، مما يجعله مناسبًا لفئة كبيرة من المستخدمين سواء للاستخدام الشخصي أو العملي.

⭐ المميزات:
- جودة تصنيع جيدة
- أداء مستقر
- قيمة ممتازة مقابل السعر

⚠️ ملاحظة: قد تختلف الأسعار والعروض حسب المتجر الخارجي، يرجى التأكد قبل الشراء.`;
}

// 🔥 توليد slug فريد (حل نهائي للتكرار)
function generateUniqueSlug(title, id) {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-z0-9 ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 60);

  // نضيف جزء من ID لضمان عدم التكرار
  const shortId = id.toString().slice(0, 6);

  return `${baseSlug}-${shortId}`;
}

// 🔥 الدالة الرئيسية
async function fixProducts() {
  console.log("🚀 بدء تحسين المنتجات...\n");

  const { data: products, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("❌ خطأ في جلب المنتجات:", error);
    return;
  }

  console.log(`📦 عدد المنتجات: ${products.length}\n`);

  for (const product of products) {
    try {
      const newTitle = generateTitle(product);
      const newDescription = generateDescription(product);
      const newSlug = generateUniqueSlug(newTitle, product.id);

      const { error: updateError } = await supabase
        .from("products")
        .update({
          title: newTitle,
          description: newDescription,
          slug: newSlug,
        })
        .eq("id", product.id);

      if (updateError) {
        console.log("❌ خطأ:", product.id, updateError.message);
      } else {
        console.log("✅ تم تحديث:", product.id, "→", newSlug);
      }
    } catch (err) {
      console.log("❌ Exception:", product.id, err.message);
    }
  }

  console.log("\n🎉 تم الانتهاء من تحسين المنتجات بالكامل");
}

// تشغيل
fixProducts();