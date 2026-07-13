# Deployment & Environment Reference — Noor Oriental Rugs

This document contains configuration standards for staging, testing, and deploying the website catalog assets to staging and production web hosts.

---

## 1. Hosting Requirements

Because the catalog relies entirely on dynamic client-side JavaScript (`app.js`) fetching flat JSON data (`inventory.json`), the website requires **no server-side environment processing** (e.g. PHP, Node, Ruby, or SQL database engines).

### Suitable Environments
* **Static Hosting Platforms**: Netlify, Vercel, GitHub Pages, Cloudflare Pages, AWS S3 buckets.
* **Traditional Web Hosting**: Apache, Nginx, or IIS servers.

---

## 2. Dev Server Configuration

Local testing is conducted using [dev_server.py](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/dev_server.py).

### Run Local server
Ensure Python 3 is in your path and execute:
```powershell
python dev_server.py
```

### Cache control Header Injection
The dev server is configured to prevent browser asset caching during development by sending explicit HTTP response headers:
```python
# From dev_server.py header handlers
self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
self.send_header('Pragma', 'no-cache')
self.send_header('Expires', '0')
```
*Note: In production hosting environments, it is recommended to configure similar cache-control policies for index/detail templates while setting longer cache lifetimes for image assets.*

---

## 3. Directory Structures

Maintain the following structure when pushing files to deployment environments:

```
[Project Root]
 ├── docs/                      # Permanent documentation and knowledge base
 ├── images/                    # Rug photographs and label assets
 ├── app.js                     # Core dynamic application script
 ├── dev_server.py              # Local testing HTTP server
 ├── index.html                 # Main website landing page
 ├── inventory.json             # Flat-file product database
 ├── rug-detail.html            # Dynamic product detail template
 ├── rugs-for-sale.html         # Catalog list page
 └── styles.css                 # Master site stylesheet
```
Ensure all asset paths are defined relatively to support subdirectory-nested hosting instances.
