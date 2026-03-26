import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { urlToIndex } = body;

    const host = 'www.extracode.online';
    const key = '347fd6db84d94dbcbbc677802bc652cc';
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