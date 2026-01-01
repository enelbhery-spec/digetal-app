
export type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string; // ✅ مهم
};

export const products: Product[] = [
  {
    id: 1,
    title: "بحث الخط الساخن – اتصال مباشر",
    description: "الوصول السريع لأرقام البنوك والجهات الرسمية",
    image: "/products/hotline-guide.png",
    link: "/delivery/hotline", // 👈 المنتج الأول
  },
  {
    id: 2,
    title: "البحث الفورى للمواقع – اتصال مباشر",
    description: "الوصول السريع لأرقام البنوك والجهات الرسمية",
    image: "/products/OneTap Links.png",
    link: "/delivery/OneTapLinksArabic?mode=web", // 👈 نفس الصفحة بس استخدام مختلف
  },
  {
    id: 3,
    title: "25 وجبات رائعة فى صفحة واحدة",
    description: "(فطور – غداء – عشاء)",
    image: "/products/meals.png",
    link: "/delivery/meals?mode=meals", // 👈 نفس الصفحة بس محتوى مختلف
  },
  {
    id: 4,
    title: "العروض الحصرية للمتاجر الاكترونية",
    description: "احصل على العروض حصريا )",
    image: "/products/egyptstores.png",
    link: "/delivery/egyptStores?mode=meals", // 👈 نفس الصفحة بس محتوى مختلف
  },
  {
    id: 5,
    title: " متاجر الكترونية لاجهزة اللابتوب وقطع الغيار  ",
    description: "احصل على العروض حصريا )",
    image: "/products/ComputerStores.png",
    link: "/delivery/ComputerStores?mode=meals", // 👈 نفس الصفحة بس محتوى مختلف
  },
  {
    id: 6,
    title: " أفضل شركات التأمين على السيارات في مصر  ",
    description: "دليل شركات التأمين على السيارات في مصر مع أرقام الاتصال والمواقع الرسمية )",
    image: "/products/inscar.png",
    link: "/delivery/insuranceCompanies", // 👈 نفس الصفحة بس محتوى مختلف
  },
];
