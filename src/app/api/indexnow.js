export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { urlToIndex } = req.body; // الرابط الجديد الذي تريد أرشفته
  const host = 'www.extracode.online';
  const key = 'c52f22f4436c47989ade655feb54cdcd'; // مفتاحك الحالي
  const keyLocation = `https://${host}/${key}.txt`;

  try {
    const response = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: host,
        key: key,
        keyLocation: keyLocation,
        urlList: [urlToIndex] // يمكنك إرسال قائمة روابط
      }),
    });

    if (response.ok) {
      return res.status(200).json({ success: true, message: 'تم إرسال الرابط بنجاح' });
    } else {
      return res.status(response.status).json({ success: false });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}