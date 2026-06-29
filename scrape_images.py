import os
import urllib.request
from bs4 import BeautifulSoup
from urllib.parse import urljoin

urls = [
    "https://noororientalrugs.com/gallery/",
    "https://noororientalrugs.com/charitable-giving/",
    "https://noororientalrugs.com/charitable-giving/donation-of-rugs-for-charitable-purposes/"
]

output_dir = r"c:\Users\Robbe\.gemini\antigravity\scratch\boston-rugs-landing\scraped_images"
os.makedirs(output_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0'}

img_sources = set()

for url in urls:
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req).read()
        soup = BeautifulSoup(html, 'html.parser')
        
        for img in soup.find_all('img'):
            src = img.get('src')
            if src:
                full_url = urljoin(url, src)
                if full_url.endswith(('.jpg', '.jpeg', '.png', '.webp')) and 'logo' not in full_url.lower() and 'icon' not in full_url.lower():
                    img_sources.add(full_url)
    except Exception as e:
        print(f"Error fetching {url}: {e}")

print("Found images:")
for src in sorted(img_sources):
    filename = src.split('/')[-1]
    # Handle query params if any
    filename = filename.split('?')[0]
    if not filename:
        continue
    filepath = os.path.join(output_dir, filename)
    
    try:
        req = urllib.request.Request(src, headers=headers)
        with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
            print(f"- {filename} ({len(data)} bytes)")
    except Exception as e:
        print(f"Failed to download {src}: {e}")
