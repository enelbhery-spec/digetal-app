// src/app/api/youtube/route.ts
import Parser from "rss-parser";

interface VideoItem {
  title: string;
  videoId: string;
  pubDate: string;
}

// تحديد مدة تحديث البيانات (مثلاً كل ساعة) لضمان سرعة الموقع
export const revalidate = 3600; 

export async function GET() {
  const parser = new Parser({
    customFields: {
      item: [["yt:videoId", "videoId"]],
    },
  });

  try {
    // تنبيه: تأكد أن المعرف 24 حرفاً قبل النشر النهائي
    const channelId = "UCgak46GjPPsFsVB5QnzD7pQ"; 
    
    // إضافة timestamp للرابط قد يساعد في تجنب الكاش القديم أحيانات
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

    const feed = await parser.parseURL(feedUrl);

    if (!feed.items || feed.items.length === 0) {
      // بدلاً من رمي خطأ، نرسل استجابة "قريباً" بشكل نظيف
      return Response.json([{ 
        title: "انتظروا أول فيديوهاتنا قريباً على القناة", 
        videoId: "", 
        pubDate: new Date().toISOString() 
      }]);
    }

    const videos: VideoItem[] = feed.items.map((item: any) => ({
      title: item.title || "فيديو جديد من إكسترا كود",
      videoId: item.videoId || item["yt:videoId"] || "",
      pubDate: item.pubDate || "",
    }));

    // إرسال أول فيديو (الأحدث)
    return Response.json(videos.slice(0, 1)); 
    
  } catch (error) {
    // طباعة الخطأ في الـ Console الخاص بالسيرفر للتصحيح
    console.error("YouTube RSS Error:", error);

    // الرد ببيانات احتياطية (Fallback) لضمان عدم توقف الهيدر
    return Response.json([{ 
      title: "تابع أحدث عروض الكوبونات على قناتنا", 
      videoId: "", 
      pubDate: "" 
    }]);
  }
}