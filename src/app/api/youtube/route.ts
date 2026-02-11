import Parser from "rss-parser";

interface VideoItem {
  title: string;
  videoId: string;
  pubDate: string;
}

export async function GET() {
  const parser = new Parser({
    customFields: {
      item: ["yt:videoId"],
    },
  });

  const feed = await parser.parseURL(
    "https://www.youtube.com/feeds/videos.xml?channel_id=UClUjR4rRQhu06xtfOEyxznA"
  );

  const videos: VideoItem[] = feed.items
    .filter((item: any) => item["yt:videoId"])
    .map((item: any) => ({
      title: item.title,
      videoId: item["yt:videoId"],
      pubDate: item.pubDate,
    }));

  return Response.json(videos);
}
