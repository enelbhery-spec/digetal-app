
export type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string; // ✅ مهم
  category: string; // 👈 جديد
};

export const products: Product[] = [
  {
    id: 1,
    title: "بحث الخط الساخن – اتصال مباشر",
    description: "الوصول السريع لأرقام البنوك والجهات الرسمية والخدمات الحكومية والخدمات وشركات الاتصالات وغيرها لتوفير وقتك",
    image: "/products/hotline-guide.png",
    link: "/delivery/hotline", // 👈 المنتج الأول
     category: " -خدمة العملاء - الخط الساخن",

  },
  
  
  {
    id: 4,
    title: "العروض الحصرية للمتاجر الاكترونية",
    description: "احصل على العروض حصريا للمتاجر الاكترونية حتى تتمكن من متابعة احتياجات بضطة  واجة من هاتفك توفر عليك البحث على المتصفحات  )",
    image: "/products/egyptstores.png",
    link: "/delivery/egyptStores?mode=meals", // 👈 نفس الصفحة بس محتوى مختلف
     category: "العروض الحصرية للمتاجر الاكترونية"
  },
  
  {
    id: 6,
    title: " أفضل شركات التأمين على السيارات في مصر  ",
    description: "دليل شركات التأمين على السيارات في مصر مع أرقام الاتصال والمواقع الرسمية )",
    image: "/products/inscar.png",
    link: "/delivery/insuranceCompanies", // 👈 نفس الصفحة بس محتوى مختلف
    category: "افضل شركات التامين"
  },
];
