export interface Product {
  id: number;
  name: string;
  image: string;
  affiliateLink: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Samsung 970 EVO PLUS 1TB NVMe SSD",
    image: "/images/samsung-970.png",
    affiliateLink: "https://maximumhardware.store/samsung-970-evo-plus-1tb-m-2-nvme-v-nand-internal-solid-state-drive-ssd?tracking=4yz6vQ0EwyDAoenU2015Q0TGZW6F33PIlo4hTiVRTZFnBW6QOzR94stOEpjiQsz0",
    features: [
      "سرعة قراءة وكتابة عالية",
      "مناسب للألعاب والبرامج",
      "ضمان رسمي",
    ],
  },
];
