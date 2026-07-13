# SEO & Internal Linking Strategy — Noor Oriental Rugs

This document details the search engine optimization (SEO) configurations, structured schema payloads, and internal linking models implemented on the Noor Oriental Rugs website.

---

## 1. Structured Product Schema (JSON-LD)

To enable rich snippet listings in search results, a dynamic JSON-LD Product schema is generated and appended to the page head by `app.js` on product load.

### Schema Definition
```javascript
const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": rug.name,
    "image": rug.images.map(img => window.location.origin + '/' + img.file),
    "description": rug.seo.description,
    "brand": {
        "@type": "Brand",
        "name": "Noor Oriental Rugs"
    },
    "offers": {
        "@type": "Offer",
        "url": window.location.href,
        "priceCurrency": "USD",
        "price": rug.price,
        "itemCondition": "https://schema.org/UsedCondition",
        "availability": "https://schema.org/InStock",
        "seller": {
            "@type": "LocalBusiness",
            "name": "Noor Oriental Rugs",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Cambridge Street",
                "addressLocality": "Cambridge",
                "addressRegion": "MA",
                "addressCountry": "US"
            }
        }
    }
};

// Inject into DOM
let scriptTag = document.getElementById('product-schema-ld');
if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.id = 'product-schema-ld';
    scriptTag.type = 'application/ld+json';
    document.head.appendChild(scriptTag);
}
scriptTag.textContent = JSON.stringify(schemaData);
```

---

## 2. Dynamic Social Meta Tags (Open Graph & Twitter Card)

Metadata tags are updated on product load to guarantee premium preview cards when sharing links on social platforms (Slack, Facebook, iMessage, X):

* **Canonical Tag**: Syncs dynamically to the exact product URL parameters:
  ```javascript
  let canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = window.location.href;
  ```
* **Open Graph (og:title, og:description, og:image, og:url, og:type)**: Populates title, image asset paths with absolute origins, and configures the item type as `product`.
* **Twitter Cards (twitter:card, twitter:title, twitter:description, twitter:image)**: Utilizes the `summary_large_image` layout format.

---

## 3. Semantic Heading Hierarchy

Product templates strictly structure titles and sub-blocks to match search crawl logic:

1. **`<h1>` (Main Page Title)**: Reserved exclusively for the product name (e.g., `Vintage Turkish Chanakaleh Rug`).
2. **`<h2>` (Major Sections)**: Used for layout regions (*Description*, *The Story Behind This Rug*, *Specifications*, *Why Buy This Rug*, *Related Rugs*).
3. **`<h3>` (Sub-Editorial Blocks)**: Employed inside the Description and Story segments (*Overview*, *Craftsmanship*, *Design & Motifs*, *Materials & Construction*, *Anatolian Heritage*).

---

## 4. Internal Linking Framework

Internal link connections route search indexing bots and users seamlessly across the website's core landing directories:

* **Rug Cleaning**: Linked dynamically to `rug-cleaning.html` from secondary service lists.
* **Rug Restoration**: Pointed to `rug-restoration.html`.
* **Rug Appraisals**: Pointed to `rug-appraisals.html`.
* **Contact & Consultations**: Pointed to `index.html#contact` and `index.html?interest=consultation#contact`.
* **Showroom Bookings**: Pointed to `index.html?interest=showroom#contact`.
