export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: "EGP";
  whatsappText: string;
  image: string; // 👈 صورة المنتج
  link?: string;
};

export const products: Product[] = [
  {
    id: 1,
    title: "البحث الفورى للمواقع – اتصال مباشر",
    description: "الوصول السريع لأرقام البنوك والجهات الرسمية",
    price: 25,
    currency: "EGP",
    whatsappText: "أريد شراء هذا المنتج",
    image: "/products/hotline-guide.png"
  },
  {
    id: 2,
    title: "البحث الفورى للمواقع – اتصال مباشر",
    description: "الوصول السريع لأرقام البنوك والجهات الرسمية",
    price: 25,
    currency: "EGP",
    whatsappText: "أريد شراء هذا المنتج",
    image: "/products/OneTap Links.png"
  },
];
