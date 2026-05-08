// src/app/api/youtube/route.ts

import Parser from "rss-parser";

interface VideoItem {
  title: string;
  videoId: string;
  pubDate: string;
  thumbnail: string;
  link: string;
}

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET() {
  const parser = new Parser({
    customFields: {
      item: [["yt:videoId", "videoId"]],
    },
  });

  try {
    // ✅ استخدم Channel ID فقط (الأضمن)
    const channelId = "UCgak46GjPPsFsVB5QnzD7pQ";

    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

    // ✅ Fetch آمن
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`YouTube RSS Error: ${res.status}`);
    }

    const xml = await res.text();
    const feed = await parser.parseString(xml);

    // 🔴 لو مفيش فيديوهات
    if (!feed?.items || feed.items.length === 0) {
      return Response.json(
        [
          {
            title: "لا يوجد فيديوهات حالياً",
            videoId: "",
            pubDate: new Date().toISOString(),
            link: "",
            thumbnail: "",
          },
        ],
        {
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    const videos: VideoItem[] = feed.items
      .map((item: any) => {
        let videoId =
          item.videoId ||
          item["yt:videoId"] ||
          "";

        // ✅ fallback من الرابط
        if (!videoId && item.link) {
          const match = item.link.match(/v=([^&]+)/);
          videoId = match ? match[1] : "";
        }

        // ❌ تجاهل لو مفيش ID
        if (!videoId) return null;

        return {
          title: item.title || "فيديو جديد",
          videoId,
          pubDate: item.pubDate || new Date().toISOString(),

          link: `https://www.youtube.com/watch?v=${videoId}`,

          thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        };
      })
      .filter(Boolean) as VideoItem[];

    // ✅ ترتيب من الأحدث للأقدم
    videos.sort(
      (a, b) =>
        new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    return Response.json(videos, {
      headers: {
        "Cache-Control":
          "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });

  } catch (error) {
    console.error("YouTube API Error:", error);

    return Response.json(
      [
        {
          title: "حدث خطأ في تحميل الفيديوهات",
          videoId: "",
          pubDate: new Date().toISOString(),
          link: "",
          thumbnail: "",
        },
      ],
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}