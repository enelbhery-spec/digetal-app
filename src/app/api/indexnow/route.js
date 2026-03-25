import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { urlToIndex } = body;

    const host = 'www.extracode.online';
    const key = 'c52f22f4436c47989ade655feb54cdcd';
    const keyLocation = `https://${host}/${key}.txt`;

    const response = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: host,
        key: key,
        keyLocation: keyLocation,
        urlList: [urlToIndex]
      }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ success: false }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}