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
        disallow: [
          '/api/',        // منع أرشفة مسارات البرمجة
          '/_next/',      // منع ملفات النظام الخاصة بنكست
          '/admin/',      // حماية لوحة التحكم
          '/dashboard/',  // حماية صفحات المستخدمين
          // تم حذف سطر /go/ لضمان عمل روابط التحويل بشكل سليم
          // تم حذف سطر الاستعلامات /*?* للسماح بروابط التتبع الخاصة بالأفلييت
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}