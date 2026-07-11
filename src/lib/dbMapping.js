// src/lib/dbMapping.js
export const TABLE_CONFIGS = {
  products: {
    name: 'products',            // اسم الجدول في Supabase
    matchSourceField: 'title',   // المصدر للبحث في المنتجات العادية
    priceField: 'price',         // عمود السعر في المنتجات العادية
  },
  safka: {
    name: 'safka_products',      // تأكد من اسم جدول الصفقة الصحيح في الداتابيز لديك
    matchSourceField: 'description', // المصدر للبحث في صفقات
    priceField: 'sale_price',    // عمود السعر في الصفقات
  }
};