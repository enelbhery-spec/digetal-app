import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

// إجبار الملف على التولد ديناميكياً مع كل طلب لمنع التخزين المؤقت (Cache)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function robots(): Promise<MetadataRoute.Robots> {
  // جلب الهيدرز لانتظار الـ Promise (مهم لنسخ Next.js الحديثة)
  const headersList = await headers();
  const host = headersList.get("host"); 
  
  // تحديد البروتوكول والدومين الحالي
  // سيقرأ الدومين سواء كان extracode.online أو vercel.app
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    // رابط السايت ماب سيتغير تلقائياً بناءً على الدومين الذي يفتحه جوجل
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}