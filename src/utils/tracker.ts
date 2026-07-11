'use client';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const trackEvent = async (eventName: string, productId: string | null = null) => {
  setTimeout(async () => {
    try {
      let sessionId = localStorage.getItem('session_id');
      if (!sessionId) {
        sessionId = Math.random().toString(36).substring(7);
        localStorage.setItem('session_id', sessionId);
      }

      const pageUrl = typeof window !== 'undefined' ? window.location.href : 'unknown';

      const { error } = await supabase.from('user_activity_logs').insert([
        {
          session_id: sessionId,
          event_name: eventName,
          product_id: productId,
          page_url: pageUrl,
        },
      ]);

      if (error) console.error('Supabase Tracking Error:', error);
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }, 500);
};