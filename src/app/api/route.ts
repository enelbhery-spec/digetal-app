import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function POST(req: Request) {
  const { url } = await req.json();

  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(data);

    // سحب البيانات (هذه الإعدادات تعمل مع أغلب المواقع الكبرى)
    const title = $('meta[property="og:title"]').attr('content') || $('title').text();
    const image = $('meta[property="og:image"]').attr('content') || $('img').first().attr('src');
    const description = $('meta[property="og:description"]').attr('content') || "";

    return NextResponse.json({ title, image, description });
  } catch (error) {
    return NextResponse.json({ error: "فشل في سحب بيانات الرابط" }, { status: 500 });
  }
}