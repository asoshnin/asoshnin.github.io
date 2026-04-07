import os
import requests
import hashlib
from bs4 import BeautifulSoup
from urllib.parse import urlparse

def get_unique_filename(url):
    """Creates a unique filename based on the URL to prevent collisions."""
    ext = os.path.splitext(urlparse(url).path)[1] or ".png"
    hash_object = hashlib.md5(url.encode())
    return f"{hash_object.hexdigest()[:10]}{ext}"

# Walk through all subfolders to find HTML files
for root, dirs, files in os.walk("."):
    if "venv" in root or ".git" in root: continue # Skip system folders
    
    for file in files:
        if file.endswith(".html"):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                soup = BeautifulSoup(f, 'html.parser')

            images = soup.find_all('img')
            if not images: continue
            
            img_dir = os.path.join(root, 'img')
            changes_made = False

            for img in images:
                src = img.get('src')
                if src and src.startswith('http'):
                    try:
                        if not os.path.exists(img_dir): os.makedirs(img_dir)
                        
                        new_name = get_unique_filename(src)
                        local_path = os.path.join(img_dir, new_name)
                        
                        # Fix: Correct attribute is status_code
                        res = requests.get(src, stream=True, timeout=10)
                        if res.status_code == 200:
                            with open(local_path, 'wb') as f_img:
                                for chunk in res.iter_content(1024):
                                    f_img.write(chunk)
                            
                            # Fix: Point to local img folder
                            img['src'] = f'img/{new_name}'
                            changes_made = True
                            print(f"Localized: {src} -> {new_name}")
                    except Exception as e:
                        print(f"Failed to download {src}: {e}")

            if changes_made:
                with open(file_path, 'w', encoding='utf-8') as f:
                    # Fix: Use str(soup) instead of prettify to preserve formatting
                    f.write(str(soup))