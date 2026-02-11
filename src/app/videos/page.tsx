import Image from "next/image"

async function getVideos() {
  const res = await fetch(
    "https://www.youtube.com/feeds/videos.xml?channel_id=UClUjR4rRQhu06xtfOEyxznA",
    { next: { revalidate: 600 } }
  )

  const text = await res.text()

  const parser = require("rss-parser")
  const rssParser = new parser()

  const feed = await rssParser.parseString(text)

  return feed.items
}

function getVideoId(id: string) {
  return id.split(":")[2]
}

export default async function VideosPage() {
  const videos = await getVideos()

  const latestVideo = videos[0]
  const otherVideos = videos.slice(1)

  // تقسيم الفيديوهات (لو العنوان يحتوي كلمة Shorts)
  const shorts = otherVideos.filter((video: any) =>
    video.title.toLowerCase().includes("short")
  )

  const normalVideos = otherVideos.filter(
    (video: any) =>
      !video.title.toLowerCase().includes("short")
  )

  // ✅ Video Schema لتحسين SEO
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "فيديوهات البحث الذكى",
    "itemListElement": videos.map((video: any, index: number) => {
      const videoId = getVideoId(video.id)
      return {
        "@type": "VideoObject",
        "position": index + 1,
        "name": video.title,
        "description": video.contentSnippet || video.title,
        "thumbnailUrl": `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        "uploadDate": video.pubDate,
        "embedUrl": `https://www.youtube.com/embed/${videoId}`
      }
    })
  }

  return (
    <div className="container mx-auto px-4 py-10">

      {/* ✅ Schema مخفي لجوجل */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      {/* ===== أحدث فيديو ===== */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎬 أحدث فيديو
      </h1>

      <div className="mb-12">
        <iframe
          className="w-full h-[400px] rounded-2xl shadow-lg"
          src={`https://www.youtube.com/embed/${getVideoId(latestVideo.id)}`}
          allowFullScreen
        />
        <h2 className="text-xl font-semibold mt-4">
          {latestVideo.title}
        </h2>
      </div>

      {/* ===== الفيديوهات القصيرة ===== */}
      {shorts.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-6">
            ⚡ الفيديوهات القصيرة
          </h2>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {shorts.map((video: any, index: number) => (
              <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition duration-300">
                <iframe
                  className="w-full h-56"
                  src={`https://www.youtube.com/embed/${getVideoId(video.id)}`}
                  allowFullScreen
                />
                <div className="p-4">
                  <h3 className="text-md font-semibold">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ===== الفيديوهات الكاملة ===== */}
      {normalVideos.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-6">
            📺 الفيديوهات الكاملة
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {normalVideos.map((video: any, index: number) => (
              <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition duration-300">
                <iframe
                  className="w-full h-56"
                  src={`https://www.youtube.com/embed/${getVideoId(video.id)}`}
                  allowFullScreen
                />
                <div className="p-4">
                  <h3 className="text-md font-semibold">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  )
}
