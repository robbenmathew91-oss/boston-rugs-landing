# Inventory Addition Workflow — Noor Oriental Rugs

This document establishes the official procedures for adding, optimizing, and sorting photographs for new rug inventory items.

---

## 1. Step-by-Step Catalog Addition

To add a new rug item to the inventory system, edit [inventory.json](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/inventory.json):

1. **Allocate Unique ID**: Increment the highest existing ID number in the file.
2. **Assign Slug**: Create a URL-friendly name representation using lowercase letters and hyphens (e.g. `vintage-turkish-chanakaleh`).
3. **Populate Core Properties**: Specify dimensions, style, weave type, age, origin, materials, price, and condition attributes.
4. **Format Description & Story**: Organize descriptive texts using Markdown-style triple-hash headers (`### Overview`, `### Materials & Construction`) separated by double newlines (`\n\n`) to ensure the rendering engine formats them with luxury borders.

---

## 2. Image Processing & Optimization Guidelines

All images must be compressed and formatted before insertion into the website assets directory:

### Dimensions & Formatting
* **Format**: All source images must be standard `.jpg` format.
* **Aspect Ratio**: Standardize on `4:3` ratio for primary hero photographs and detail closeups.
* **Compression**: Run JPEG compression with a quality setting of `85%`. This yields optimal pixel clarity while minimizing asset size.

### Python Compression Script Example
```python
from PIL import Image

def optimize_jpeg(input_path, output_path):
    img = Image.open(input_path)
    # Maintain aspect ratio while sizing down if necessary
    img.thumbnail((1600, 1200)) 
    img.save(output_path, "JPEG", quality=85, optimize=True)
```

---

## 3. Administrative vs. Customer Image Filtering

To preserve a luxury storefront appearance, administrative inventory logs (such as paper documents or orange authenticity tags) must be kept separate from the client-facing product gallery.

### Keywords Exclusion Filtering
The website dynamic engine (`app.js`) implements a pattern check that filters images containing specific file-name substrings:
```javascript
const DOC_KEYWORDS = ['inventory_tag', 'authenticity_label', 'tag', 'label', 'document'];
```

### File Naming Convention
* **Customer Gallery Images**: Name files according to their view context (e.g., `chanakaleh_hero.jpg`, `chanakaleh_weave_detail.jpg`, `chanakaleh_fringe.jpg`).
* **Inventory Documentation**: Name files with a keyword indicator (e.g., `chanakaleh_authenticity_label.jpg` or `chanakaleh_orange_tag.jpg`). The page will automatically filter these out of the main gallery and place them under the **"Inventory Documentation"** section below.

---

## 4. Gallery Ordering Protocols

Organize thumbnails in a logical sequence inside the JSON `images` array for optimal user scanning:

1. **Hero view** (Flat-lay full rug view)
2. **Alternate full view** (Angled/styled context view)
3. **Folded corner**
4. **Border detail**
5. **Pattern closeup**
6. **Fringe**
7. **Back/construction** (Weave density profile)
8. **Pile thickness**
