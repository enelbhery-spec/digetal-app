'use client';
import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

/**
 * @param {{ eventName: string, productId?: string | null }} props
 */
export default function Tracker({ eventName, productId = null }) {
  useEffect(() => {
    // التأكد من تمرير البيانات بالشكل الصحيح
    trackEvent(eventName, productId || null);
  }, [eventName, productId]);

  return null;
}