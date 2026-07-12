// lib/seo.ts
import seoConfig from '../seo-config.json';

// تعريف الواجهات (Interfaces) بدقة
interface Category {
  id: string;
  name: string;
  topic: string;
  keywords: string[];
  description: string;
}

interface SeoData {
  lastUpdated: string;
  categories: Category[];
}

// تحويل البيانات المستوردة للنوع المحددة (Type Assertion)
const config = seoConfig as SeoData;

export function getSeoMetadata(categoryId: string) {
  // الآن TypeScript يعرف أن c هي Category ولا توجد أخطاء
  const category = config.categories.find((c: Category) => c.id === categoryId);
  
  return category || { 
    topic: "Trend Store", 
    description: "متجرك المفضل", 
    keywords: [] 
  };
}