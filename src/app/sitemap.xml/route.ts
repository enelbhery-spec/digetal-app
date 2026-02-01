import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const baseUrl = "https://digetal-app-q1mf.vercel.app";
const appDir = path.join(process.cwd(), "src/app");

// ===== Helpers =====
function getPriority(page: string): string {
  if (page === "/") return "1.0";
  if (page.startsWith("/services")) return "0.9";
  if (page.startsWith("/applications")) return "0.8";
  return "0.7";
}

function getChangeFreq(page: string): string {
  if (page === "/") return "daily";
  if (page.startsWith("/services")) return "weekly";
  return "monthly";
}

// ===== Read pages =====
function getPages(dir: string, basePath = ""): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let pages: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name.startsWith("_")) continue;
      if (entry.name.startsWith("(")) continue; // route groups
      if (entry.name === "api") continue;

      pages.push(
        ...getPages(fullPath, `${basePath}/${entry.name}`)
      );
    }

    if (entry.isFile() && entry.name === "page.tsx") {
      pages.push(basePath || "/");
    }
  }

  return pages;
}

// ===== GET =====
export async function GET() {
  const lastMod = new Date().toISOString();

  const pages = getPages(appDir)
    .filter((p) => !p.includes("[")) // exclude dynamic routes
    .map((p) => p.replace(/\/+/g, "/"));

  const urls = pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page === "/" ? "" : page}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${getChangeFreq(page)}</changefreq>
    <priority>${getPriority(page)}</priority>
  </url>`
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400",
    },
  });
}
