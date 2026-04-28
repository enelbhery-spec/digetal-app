'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // التحويل إلى الصفحة الرئيسية بعد 0 ثانية
    router.replace('/');
  }, [router]);

  return null; // لن يرى المستخدم أي شيء لأنه سيتم تحويله فوراً
}