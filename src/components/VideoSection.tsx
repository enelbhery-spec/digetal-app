"use client";

import React from "react";

export default function VideoSection() {
  // يمكنك استبدال هذه المصفوفة ببيانات تأتي من قاعدة بياناتك
  const videos = [
    { id: "فيديو_1", title: "مراجعة المنتج الأول" },
    { id: "فيديو_2", title: "مراجعة المنتج الثاني" },
    { id: "فيديو_3", title: "مراجعة المنتج الثالث" },
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-slate-950">شاهد تجارب العملاء</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white p-4 rounded-3xl shadow-sm hover:shadow-lg transition">
              <div className="aspect-video bg-black rounded-2xl overflow-hidden mb-4">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allowFullScreen
                />
              </div>
              <h3 className="font-bold text-slate-800 text-center">{video.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}