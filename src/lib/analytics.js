'use client'; // ضروري لأننا نستخدم localStorage

import { createClient } from '@supabase/supabase-js';

// تهيئة عميل Supabase
// تأكد أنك معرف هذه المتغيرات في ملف .env.local الخاص بك
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/**
 * دالة لتتبع الأحداث وإرسالها إلى قاعدة البيانات
 * @param {string} eventName - اسم الحدث (مثلاً: 'view_product', 'click_buy')
 * @param {string|null} productId - معرف المنتج إن وجد
 */
export const trackEvent = async (eventName, productId = null) => {
  try {
    // الحصول على معرف الجلسة أو توليد واحد جديد
    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(7);
      localStorage.setItem('session_id', sessionId);
    }

    // إرسال البيانات إلى Supabase
    const { error } = await supabase.from('user_activity_logs').insert([
      {
        session_id: sessionId,
        event_name: eventName,
        product_id: productId,
        page_url: window.location.href, // تسجيل الصفحة الحالية تلقائياً
      },
    ]);

    if (error) throw error;
    
  } catch (error) {
    // نكتفي بطباعة الخطأ في الكونسول حتى لا نعطل تجربة المستخدم
    console.error('Error tracking event:', error);
  }
};