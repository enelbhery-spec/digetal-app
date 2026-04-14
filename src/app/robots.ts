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
        // منع الزحف للمسارات التي تسبب ضجيجاً في نتائج البحث أو تستهلك ميزانية الزحف
        disallow: [
          '/api/',        // منع أرشفة مسارات البرمجة (التي ظهرت لك في البحث)
          '/_next/',      // منع ملفات النظام الخاصة بنكست
          '/admin/',      // حماية لوحة التحكم
          '/dashboard/',  // حماية صفحات المستخدمين
          '/*?*',         // منع الزحف للروابط التي تحتوي على استعلامات (Query Params) قد تسبب تكرار
          '/go/',         // (اختياري) إذا كنت تستخدم مسار وسيط للتحويل لأمازون ونون
        ],
      },
    ],
    // توجيه جوجل مباشرة لخريطة الموقع الاحترافية التي أنشأناها
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}