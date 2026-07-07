# localize.py
import os
import requests
import hashlib
import argparse
from bs4 import BeautifulSoup
from urllib.parse import urlparse

parser = argparse.ArgumentParser()
parser.add_argument('--source-dir', default='_source', help='Root directory to localize')
args = parser.parse_args()

def get_unique_filename(url):
    ext = os.path.splitext(urlparse(url).path)[1] or ".png"
    return f"{hashlib.md5(url.encode()).hexdigest()[:10]}{ext}"

for root, dirs, files in os.walk(args.source_dir):
    dirs[:] = [d for d in dirs if d not in ('venv', '.git', 'assets', 'img')]

    for file in files:
        if not file.endswith(".html"):
            continue
        file_path = os.path.join(root, file)
        with open(file_path, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')

        images = soup.find_all('img')
        if not images:
            continue

        img_dir = os.path.join(root, 'img')
        changes_made = False

        for img in images:
            src = img.get('src')
            if src and src.startswith('http'):
                try:
                    if not os.path.exists(img_dir):
                        os.makedirs(img_dir)
                    new_name = get_unique_filename(src)
                    local_path = os.path.join(img_dir, new_name)
                    if not os.path.exists(local_path): 
                        res = requests.get(src, stream=True, timeout=10)
                        if res.status_code == 200:
                            with open(local_path, 'wb') as f_img:
                                for chunk in res.iter_content(1024):
                                    f_img.write(chunk)
                    img['src'] = f'img/{new_name}'
                    changes_made = True
                    print(f"Localized: {src} -> {new_name}")
                except Exception as e:
                    print(f"Failed to download {src}: {e}")

        if changes_made:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(str(soup))