import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get("host"); 
  
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // منع الزحف إلى المسارات التالية لحماية الخصوصية ومنع ظهورها في البحث
        disallow: [
          '/api/',        // منع كل ملفات الـ API
          '/_next/',      // منع ملفات نكست الداخلية
          '/admin/',      // منع لوحة التحكم (إذا وجدت)
          '/dashboard/',  // منع لوحة بيانات المستخدمين
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}