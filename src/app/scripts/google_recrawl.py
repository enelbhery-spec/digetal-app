import requests

SITE = "https://extracode.online"
SITEMAP = f"{SITE}/sitemap.xml"

print("Checking sitemap...\n")

headers = {
    "User-Agent": "Googlebot/2.1 (+http://www.google.com/bot.html)"
}

try:
    r = requests.get(SITEMAP, headers=headers)

    if r.status_code == 200:
        print("Sitemap working correctly")

        print("\nGoogle can access sitemap here:")
        print(SITEMAP)

        print("\nNext Step:")
        print("Open Google Search Console")
        print("Request indexing or submit sitemap")

    else:
        print("Sitemap error:", r.status_code)

except Exception as e:
    print("Connection error:", e)

print("\nProcess Finished")