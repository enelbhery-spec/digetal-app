'use client';

import { useEffect } from "react";
import { trackEvent } from "@/utils/tracker"; // تأكد أن هذا المسار يوجه إلى مكان ملف دالة trackEvent لديك

type TrackerProps = {
  productId: string;
};

export default function ProductTracker({ productId }: TrackerProps) {
  useEffect(() => {
    if (productId) {
      trackEvent("view_product", productId);
    }
  }, [productId]);

  return null; // مكون غير مرئي يعمل في الخلفية فقط
}