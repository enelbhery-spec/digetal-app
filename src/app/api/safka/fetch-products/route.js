import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request) {
  const SAFKA_KEY = process.env.SAFKA_API_KEY;

  if (!SAFKA_KEY) {
    return NextResponse.json({ success: false, error: "مفتاح API صفقة غير موجود" }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.safka-eg.com/api/v1/public/products?page=1&size=20', {
      method: 'GET',
      headers: {
        'api-safka-key': SAFKA_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`فشل الاتصال بسيرفر صفقة: ${response.status}`);
    }

    const safkaData = await response.json();
    const products = safkaData.data || [];

    const mappedProducts = products.map((prod) => {
      return {
        // البيانات الصافية والأصلية لصفقة
        safka_id: prod._id,
        name: prod.name,
        barcode: prod.barcode || prod._id,
        price: prod.price || prod.original_price || null,
        sale_price: prod.sale_price,
        main_image: prod.image,
        images_urls: prod.images || [],
        description: prod.description,
        media_url: prod.media_url,
        faqs: prod.faqs || null,
        note: prod.note,

        // حقول التحكم اليدوي والقوائم المنسدلة (تترك فارغة لتختارها بيدك)
        code: null,         
        country_id: null,   
        brand_id: null,     
        category_id: null,  
        store_id: 'safka_store',

        // حقول الفيسبوك والأتمتة
        fb_posted: false,
        fb_scheduled: false,
        fb_post_id: null,
        fb_scheduled_time: null
      };
    });

    const { error: supabaseError } = await supabase
      .from('safka_products')
      .upsert(mappedProducts, { onConflict: 'safka_id' });

    if (supabaseError) {
      throw new Error(`فشل الحفظ في سوبابيز: ${supabaseError.message}`);
    }

    return NextResponse.json({
      success: true,
      message: "تم مسح الجدول، وإعادة إنشائه، وصب بيانات صفقة الأصلية بنجاح استثنائي!"
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}