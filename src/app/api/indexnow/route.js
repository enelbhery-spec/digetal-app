// app/api/indexnow/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { url } = body;

    const host = 'www.extracode.online';
    const key = '347fd6db84d94dbcbbc677802bc652cc';

    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key,
        keyLocation: `https://${host}/${key}.txt`,
        urlList: [url],
      }),
    });

    return NextResponse.json({ success: true, status: res.status });

  } catch (err) {
    return NextResponse.json({ error: err.message });
  }
}