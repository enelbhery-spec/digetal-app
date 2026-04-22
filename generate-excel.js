const ExcelJS = require('exceljs');
const { createClient } = require('@supabase/supabase-js');

// بيانات الربط الخاصة بك
const supabaseUrl = "https://addlrxwxjquowcmkyyqg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkZGxyeHd4anF1b3djbWt5eXFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODg5MTAsImV4cCI6MjA4Njc2NDkxMH0.Ba5lUtyfN1SUye1kZ-tmOKrs3fFxA993YXSqVOuR4aA";
const supabase = createClient(supabaseUrl, supabaseKey);

async function createDynamicExcel() {
    console.log('جاري جلب القوائم المرجعية من Supabase...');

    // جلب البيانات للقوائم المنسدلة
    const { data: countries } = await supabase.from('countries').select('name');
    const { data: stores } = await supabase.from('stores').select('slug');
    const { data: categories } = await supabase.from('categories').select('title');
    const { data: brands } = await supabase.from('brands').select('slug');

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('إدخال المنتجات');
    const dataSheet = workbook.addWorksheet('DataLists', { state: 'hidden' });

    // تعبئة الورقة المخفية بالبيانات المرجعية
    if (categories) categories.forEach((c, i) => dataSheet.getCell(`A${i + 1}`).value = c.title);
    if (brands) brands.forEach((b, i) => dataSheet.getCell(`B${i + 1}`).value = b.slug);
    if (countries) countries.forEach((c, i) => dataSheet.getCell(`C${i + 1}`).value = c.name);
    if (stores) stores.forEach((s, i) => dataSheet.getCell(`D${i + 1}`).value = s.slug);

    // تعريف الأعمدة لتطابق قاعدة البيانات (الأسماء هنا هي التي سيقرأها كود الرفع)
    sheet.columns = [
        { header: 'Title', key: 'title', width: 30 },
        { header: 'Slug', key: 'slug', width: 20 },
        { header: 'Code', key: 'code', width: 15 }, // حقل الكود الأساسي
        { header: 'Price', key: 'price', width: 12 },
        { header: 'Old Price', key: 'old_price', width: 12 },
        { header: 'Category', key: 'category', width: 20 },
        { header: 'Store', key: 'store', width: 15 },
        { header: 'Country', key: 'country', width: 15 },
        { header: 'Brand', key: 'brand', width: 15 },
        { header: 'Image URL', key: 'image_url', width: 40 },
        { header: 'Product URL', key: 'product_url', width: 40 },
        { header: 'Description', key: 'description', width: 30 },
        { header: 'Currency', key: 'currency', width: 10 },
        { header: 'Reviews Count', key: 'reviewsCount', width: 15 }
    ];

    // تنسيق العنوان
    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2563EB' } }; // لون أزرق احترافي

    // إعداد القوائم المنسدلة لـ 1000 صف
    for (let i = 2; i <= 1000; i++) {
        // Category (Column F)
        sheet.getCell(`F${i}`).dataValidation = {
            type: 'list',
            allowBlank: true,
            formulae: [`DataLists!$A$1:$A$${categories?.length || 1}`]
        };
        // Brand (Column I)
        sheet.getCell(`I${i}`).dataValidation = {
            type: 'list',
            allowBlank: true,
            formulae: [`DataLists!$B$1:$B$${brands?.length || 1}`]
        };
        // Country (Column H)
        sheet.getCell(`H${i}`).dataValidation = {
            type: 'list',
            allowBlank: true,
            formulae: [`DataLists!$C$1:$C$${countries?.length || 1}`]
        };
        // Store (Column G)
        sheet.getCell(`G${i}`).dataValidation = {
            type: 'list',
            allowBlank: true,
            formulae: [`DataLists!$D$1:$D$${stores?.length || 1}`]
        };
    }

    const filePath = 'D:\\DATA FOR EXCEL\\products_entry_template.xlsx';
    try {
        await workbook.xlsx.writeFile(filePath);
        console.log(`✅ تم إنشاء قالب الإكسيل المطور بنجاح: ${filePath}`);
        console.log('جاهز الآن للاستخدام مع صفحة الرفع في المشروع.');
    } catch (error) {
        console.error('❌ خطأ: تأكد من إغلاق ملف الإكسيل إذا كان مفتوحاً.');
    }
}

createDynamicExcel();