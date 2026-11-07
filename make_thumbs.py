"""Make small JPEG copies of every rug photo listed in inventory.json, for catalog cards,
related-rug cards and gallery thumbnail strips.

    images/<name>.jpg|png  ->  images/thumbs/<name>.jpg   (max 720px, quality 72)

app.js loads images/thumbs/<name>.jpg and falls back to the full image if the thumbnail
is missing. Re-run after adding rugs; existing thumbnails are only rebuilt when the
original is newer.

Usage:  python3 make_thumbs.py
"""
import json
import os

from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.abspath(__file__))
THUMBS = os.path.join(ROOT, 'images', 'thumbs')
MAX_SIDE = 720
QUALITY = 72
# Fallback image the site uses when a rug has no photos.
EXTRA = ['images/showroom.jpg']


def thumb_path(file):
    name = os.path.splitext(os.path.basename(file))[0]
    return os.path.join(THUMBS, name + '.jpg')


def main():
    with open(os.path.join(ROOT, 'inventory.json'), encoding='utf-8') as f:
        inventory = json.load(f)
    files = sorted({img['file'] for rug in inventory for img in rug.get('images', [])} | set(EXTRA))
    os.makedirs(THUMBS, exist_ok=True)

    made = skipped = 0
    for file in files:
        src = os.path.join(ROOT, file)
        dst = thumb_path(file)
        if not os.path.exists(src):
            print(f'MISSING original: {file}')
            continue
        if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
            skipped += 1
            continue
        with Image.open(src) as im:
            im = ImageOps.exif_transpose(im)
            if im.mode in ('RGBA', 'LA', 'P'):
                im = im.convert('RGBA')
                background = Image.new('RGB', im.size, (18, 18, 18))
                background.paste(im, mask=im.split()[-1])
                im = background
            im = im.convert('RGB')
            im.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
            im.save(dst, 'JPEG', quality=QUALITY, optimize=True, progressive=True)
        made += 1
    print(f'{made} thumbnails made, {skipped} already up to date, {len(files)} images in total.')


if __name__ == '__main__':
    main()
