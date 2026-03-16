import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export default async function robots(): Promise<MetadataRoute.Robots> {
  // جلب الدومين الحالي ديناميكياً
  const headersList = await headers();
  const host = headersList.get("host");
  
  // تحديد البروتوكول (غالباً سيكون https في الإنتاج)
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    // جعل رابط السايت ماب يشير دائماً لنفس الدومين الذي يفتحه جوجل الآن
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}