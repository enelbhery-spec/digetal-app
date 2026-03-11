import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  const baseUrl = "https://www.extracode.online";

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/eg`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sa`,
      lastModified: new Date(),
    },
  ];
}