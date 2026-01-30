import { MetadataRoute } from "next";

// غيّر الدومين لو هيبقى نهائي
const baseUrl = "https://digetal-app-q1mf.vercel.app";

// 👇 هنا بتحط بيانات المقالات
// الأفضل تيجي من DB أو JSON أو CMS
const blogPosts = [
  {
    category: "app",
    slug: "hotline-smart-search",
  },
  {
    category: "app",
    slug: "how-smart-search-works",
  },
  {
    category: "app",
    slug: "traditional-search-problems",
  },
  {
    category: "app",
    slug: "why-smart-search",
  },
  {
    category: "guides-and-comparisons",
    slug: "google-vs-smart-search",
  },
  {
    category: "problems",
    slug: "user-search-problems",
  },
  {
    category: "updates",
    slug: "smart-search-updates",
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/blog",
    "/blog/app",
    "/blog/guides-and-comparisons",
    "/blog/problems",
    "/blog/updates",
    "/products",
    "/smart-search",
    "/how-to-use",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/delivery/hotline",
    "/delivery/meals",
    "/delivery/egyptStores",
    "/delivery/insuranceCompanies",
    "/delivery/ComputerStores",
    "/delivery/OneTapLinksArabic",
  ];

  const staticUrls = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1.0 : 0.8,
  }));

  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.category}/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticUrls, ...blogUrls];
}
