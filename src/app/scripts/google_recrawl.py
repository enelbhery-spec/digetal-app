import requests
import xml.etree.ElementTree as ET

sites = [
    "https://www.extracode.online",
    "https://digetal-app-q1mf.vercel.app"
]

headers = {
    "User-Agent": "Googlebot/2.1 (+http://www.google.com/bot.html)"
}

print("\nStarting Sitemap Check...\n")

for site in sites:

    sitemap = f"{site}/sitemap.xml"
    print(f"Checking sitemap for: {site}")

    try:
        r = requests.get(sitemap, headers=headers, timeout=10)

        if r.status_code == 200:

            print("Sitemap is accessible")

            try:
                root = ET.fromstring(r.content)
                urls = root.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc")

                print("Total URLs in sitemap:", len(urls))

            except:
                print("Sitemap format error")

            print("Sitemap URL:", sitemap)
            print("Status: OK\n")

        else:
            print("Sitemap error:", r.status_code, "\n")

    except Exception as e:
        print("Connection error:", e, "\n")

print("Check completed\n")