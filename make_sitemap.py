"""Write sitemap.xml and robots.txt for the site's final domain.

Lists the main pages, one rug-detail URL per real rug in inventory.json
(sample listings with "is_placeholder": true are left out) and one URL per
built blog post in blog/. Re-run after adding or removing rugs or posts.

Usage:  python3 make_sitemap.py
"""
import datetime
import glob
import json
import os
from xml.sax.saxutils import escape

ROOT = os.path.dirname(os.path.abspath(__file__))
SITE = 'https://noororientalrugs.com'
PAGES = [
    ('/', '1.0'),
    ('/rugs-for-sale.html', '0.9'),
    ('/rug-cleaning.html', '0.8'),
    ('/rug-restoration.html', '0.8'),
    ('/rug-appraisals.html', '0.8'),
    ('/gallery.html', '0.6'),
    ('/restoration-gallery.html', '0.6'),
    ('/community-impact.html', '0.5'),
    ('/blog.html', '0.5'),
]


def main():
    with open(os.path.join(ROOT, 'inventory.json'), encoding='utf-8') as f:
        inventory = json.load(f)
    today = datetime.date.today().isoformat()
    urls = [(SITE + path, priority) for path, priority in PAGES]
    rugs = [r for r in inventory if not r.get('is_placeholder')]
    urls += [(f"{SITE}/rug-detail.html?slug={r['slug']}", '0.7') for r in rugs]
    posts = sorted(os.path.basename(p) for p in glob.glob(os.path.join(ROOT, 'blog', '*.html')))
    urls += [(f'{SITE}/blog/{name}', '0.6') for name in posts]

    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for loc, priority in urls:
        lines.append(f'  <url><loc>{escape(loc)}</loc><lastmod>{today}</lastmod><priority>{priority}</priority></url>')
    lines.append('</urlset>')
    with open(os.path.join(ROOT, 'sitemap.xml'), 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines) + '\n')

    with open(os.path.join(ROOT, 'robots.txt'), 'w', encoding='utf-8') as f:
        f.write('User-agent: *\nAllow: /\n# Markdown sources of the blog posts; the built pages are in /blog/\nDisallow: /blog/posts/\n\n'
                f'Sitemap: {SITE}/sitemap.xml\n')
    print(f'sitemap.xml: {len(urls)} URLs ({len(PAGES)} pages + {len(rugs)} rugs + {len(posts)} blog posts); robots.txt written.')


if __name__ == '__main__':
    main()
