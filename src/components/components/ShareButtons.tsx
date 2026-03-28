"use client";

import { FaFacebookF, FaWhatsapp, FaTelegramPlane, FaLink } from "react-icons/fa";

export default function ShareButtons({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    whatsapp: `https://wa.me/?text=${title} ${url}`,
    telegram: `https://t.me/share/url?url=${url}&text=${title}`,
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    alert("تم نسخ الرابط 👍");
  };

  return (
    <div className="flex flex-wrap gap-3 mt-6">

      {/* Facebook */}
      <a
        href={shareLinks.facebook}
        target="_blank"
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
      >
        <FaFacebookF />
        فيسبوك
      </a>

      {/* WhatsApp */}
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
      >
        <FaWhatsapp />
        واتساب
      </a>

      {/* Telegram */}
      <a
        href={shareLinks.telegram}
        target="_blank"
        className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition"
      >
        <FaTelegramPlane />
        تيليجرام
      </a>

      {/* Copy Link */}
      <button
        onClick={copyLink}
        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition"
      >
        <FaLink />
        نسخ الرابط
      </button>
    </div>
  );
}