"use client";
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { supabase } from '@/lib/supabase';

export default function AdminUploadPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setStatus("جاري فحص المتاجر والأقسام...");
    setProgress(0);

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(wb.Sheets[wsname]) as any[];

        if (data.length === 0) {
          setStatus("❌ الملف فارغ.");
          setLoading(false);
          return;
        }

        // 1. جلب البيانات المرجعية
        const { data: catList } = await supabase.from('categories').select('id, title');
        const { data: storeList } = await supabase.from('stores').select('id, slug');
        const { data: countryList } = await supabase.from('countries').select('id, name');

        let successCount = 0;
        let failCount = 0;

        for (let i = 0; i < data.length; i++) {
          const row = data[i];
          
          try {
            // 2. تنظيف نصوص البحث (Trim) لضمان المطابقة
            const cleanCategory = row['Category']?.toString().trim();
            const cleanStore = row['Store']?.toString().trim().toLowerCase();
            const cleanCountry = row['Country']?.toString().trim();

            const categoryId = catList?.find(c => c.title?.trim() === cleanCategory)?.id;
            const storeId = storeList?.find(s => s.slug?.toLowerCase().trim() === cleanStore)?.id;
            const countryId = countryList?.find(c => c.name?.trim() === cleanCountry)?.id;

            // 3. نظام الحماية (Validation)
            if (!storeId) {
              console.error(`خطأ في السطر ${i + 2}: المتجر "${cleanStore}" غير موجود في جدول المتاجر بـ Supabase.`);
              failCount++;
              continue; // تخطي السطر بدلاً من إرسال null وفشل العملية
            }

            const productData = {
              title: row['Title'] || "منتج جديد",
              slug: row['Slug'] ? `${row['Slug']}-${Math.floor(Math.random() * 1000)}` : `prod-${Date.now()}-${i}`,
              image_url: row['Image URL'],
              price: parseFloat(row['Price']) || 0,
              old_price: parseFloat(row['Old Price']) || 0,
              code: row['Code'] || row['code'] || "", 
              product_url: row['Product URL'],
              description: row['Description'] || "",
              category_id: categoryId || null,
              store_id: storeId, // الآن هو مضمون وليس null
              country_id: countryId || null,
              currency: row['Currency'] || "EGP",
              reviewsCount: parseInt(row['reviewsCount'] || row['Reviews Count']) || 0,
              brand_slug: row['Brand']?.toString().toLowerCase().trim() || ""
            };

            const { error } = await supabase.from('products').insert([productData]);

            if (error) {
              console.error(`خطأ في السطر ${i + 2}:`, error.message);
              failCount++;
            } else {
              successCount++;
            }
          } catch (rowErr) {
            failCount++;
          }
          setProgress(Math.round(((i + 1) / data.length) * 100));
        }

        setStatus(`✅ تم الرفع: ${successCount} بنجاح. (فشل ${failCount}) - راجع الـ Console للتفاصيل.`);
      } catch (err) {
        setStatus("❌ فشل معالجة الملف.");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-12 text-right" dir="rtl">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <h1 className="text-2xl font-bold text-emerald-600 mb-6 text-center">مُعالج الرفع الذكي</h1>
        
        <div className="border-2 border-dashed border-emerald-200 rounded-xl p-12 text-center relative hover:bg-emerald-50 transition-all cursor-pointer">
          <input type="file" accept=".xlsx" onChange={handleFileUpload} disabled={loading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <p className="text-slate-600">اضغط هنا لرفع ملف الإكسيل</p>
        </div>

        {loading && (
          <div className="mt-6">
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}

        {status && <div className="mt-6 p-4 rounded-xl bg-slate-50 text-sm font-bold text-center border border-slate-200">{status}</div>}
      </div>
    </div>
  );
}