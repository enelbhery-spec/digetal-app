import requests
from bs4 import BeautifulSoup

print("🚀 Kitchen Deals Scraper Started")

URL = "https://www.amazon.com/s?k=kitchen+gadgets+deals"

headers = {
    "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9"
}

response = requests.get(URL, headers=headers)
soup = BeautifulSoup(response.text, "html.parser")

items = soup.select('[data-component-type="s-search-result"]')

print(f"📦 عدد العناصر: {len(items)}")

for item in items[:10]:
    title = item.select_one("h2 span")
    price = item.select_one(".a-price .a-offscreen")

    if title:
        print("🛒", title.text.strip(),
              "| 💰", price.text if price else "No price")