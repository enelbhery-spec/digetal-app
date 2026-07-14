// src/lib/analytics.js

export async function trackEvent(supabase, eventName, productId, userId = null) {
  try {
    // 1. تأكد من أن البيانات ليست فارغة قبل الإرسال
    if (!productId || !eventName) {
      console.warn('Analytics: Missing productId or eventName, skipping track.');
      return;
    }

    const { data, error } = await supabase
      .from('analytics_table') // تأكد أن اسم الجدول هو نفس اسم جدولك في Supabase
      .insert([
        {
          event_name: eventName,
          product_id: productId,
          user_id: userId,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      // 2. هنا نكشف الغموض عن الخطأ الفارغ
      console.error('Supabase Tracking Error Detail:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
    } else {
      console.log(`Event ${eventName} tracked successfully for ${productId}`);
    }
  } catch (err) {
    // 3. التقاط أي خطأ غير متوقع في الاتصال
    console.error('Unexpected Analytics Error:', err);
  }
}