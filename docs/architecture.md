# Technical Architecture Guide — Noor Oriental Rugs

This document serves as the definitive technical architecture guide for the Noor Oriental Rugs website. It describes how the website is built, how data flows through the system, and how future features should integrate with the existing architecture.

---

## 1. System Overview

The Noor Oriental Rugs website is a lightweight, high-performance static website designed using a **data-driven client-side architecture**. It operates without server-side templating engines or dynamic database processes, serving raw HTML5 structures, vanilla CSS3 styling assets, and client-side JavaScript loaders.

```
       [User Request]
             │
             ▼
     ┌──────────────┐
     │   Browser    │
     └──────────────┘
             │
             ▼
     ┌──────────────┐
     │  HTML Shell  │ <─── loads app.js & styles.css
     └──────────────┘
             │
             ▼
     ┌──────────────┐
     │  JavaScript  │ ─── Fetch HTTP request
     └──────────────┘
             │
             ▼
     ┌──────────────┐
     │inventory.json│ ─── Reads product data array
     └──────────────┘
             │
             ▼
     ┌──────────────────────────────────────┐
     │      Dynamic Product Rendering       │ ─── Populates DOM container
     └──────────────────────────────────────┘
```

When a user requests a page, the browser downloads the static HTML shell, which loads the global stylesheet and core Javascript application script. The scripts parse URL queries and read flat JSON database assets (`inventory.json`) dynamically, generating elements and rendering them on the client's screen.

---

## 2. Inventory Architecture

The flat-file database [inventory.json](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/inventory.json) serves as the **single source of truth** for all catalog products.

### Product Data Structure
Each rug item in the JSON array must follow a strict schema:
* **Product ID & Slug**: A unique integer `id` and a unique URL-friendly string `slug`.
* **Core Info & Filtering Attributes**: Properties used to display lists and configure filters, including `origin`, `material`, `weave`, `condition`, `price`, `size`, `style`, `age`, and `availability`.
* **Detail Specifications**: A sub-object specifying exact yarn types, knot density estimates, heap pile thickness, dyes, and restoration details.
* **SEO Metadata**: Dedicated nested objects (`seo.title`, `seo.description`) to override default search headers.
* **Images Catalog**: Array of objects containing relative image file paths, alt descriptions, and loading sequences.
* **Markdown Copy Blocks**: Long-form structured descriptions and storytelling text containing markdown headers (`###`) separated by double newlines (`\n\n`) for layout borders.

---

## 3. Product Rendering

The product detail page (`rug-detail.html`) functions as a single template container. 

* **URL Parameter Retrieval**: On page load, `app.js` reads query parameters (e.g. `?slug=vintage-turkish-chanakaleh`).
* **Database Lookup**: The script queries `inventory.json`, fetching the list and matching the slug.
* **HTML Parsing**:
  * **Gallery**: Splits images into customer files versus administrative tags. Renders horizontal thumbs and zoomable heroes, linking click handlers to toggle selected assets.
  * **Badges & Specs**: Loops spec details to map equal-height flex cards.
  * **Description & Story**: Parses markdown headers (`###`) and wraps them in custom sections styled with vertical gold borders.
  * **SEO Headers**: Dynamically updates the page's HTML title, description meta, and structured schema tags.
  * **Related Rugs**: Scans other database items in the same style or collection and renders 3 visual cards with zoom hover scales.

---

## 4. Dynamic Filtering

The listing catalog page (`rugs-for-sale.html`) uses dynamic client-side filtering:

* **Dynamic Filter Generation**: The script scans the active inventory array on load, builds category filters dynamically from the current dataset, and renders checkbox panels.
* **Multi-Select Filters**: Users can select combinations of filter categories (e.g. Vintage + Turkish).
* **Price Range Filtering**: Dynamic calculations establish maximum/minimum boundaries matching price properties.
* **URL Sync & Browser History**: Clicking filters updates the URL string parameter keys in the address bar. This enables direct bookmarking and preserves the back button state.
* **Search Scalability**: Since sorting and matching operations are executed in-memory on the client's device, the catalog scales to hundreds of items without database query latency.

---

## 5. SEO Architecture

Search engine optimization is handled dynamically to index each rug listing as a unique product detail page:

* **Dynamic Document Metadata**: Updates document page title, meta description, and canonical path tags on product match.
* **Product JSON-LD**: Injects search-crawlable structured schema detailing pricing, description, brand, condition, and availability.
* **Open Graph & Twitter Cards**: Appends absolute social metadata to header elements, ensuring link previews show images and details.
* **Internal Services Linking**: Interlinks details pages with service landing zones (*Rug Cleaning*, *Rug Restoration*, *Rug Appraisals*, *Consultation*).
* **Semantic Heading Hierarchy**: Standardizes heading structures: `H1` (Product Name) &rarr; `H2` (Major Section) &rarr; `H3` (Nested Details).

---

## 6. Image Management

Images are organized inside `/images` and must be referenced dynamically:

* **Folder Organization**: All assets reside inside the root `/images` directory.
* **Naming Standards**: Use lowercase, hyphenated file names descriptive of the view context (e.g., `chanakaleh_hero.jpg`, `chanakaleh_angle.jpg`).
* **Administrative Tag Files**: Administrative tags or labels must contain keywords (e.g. `label`, `tag`, `document`) to filter them out of the customer gallery.
* **Zero Hardcoding**: HTML templates must never contain hardcoded image source paths. All paths are retrieved dynamically from the JSON database.
* **Optimization Strategy**: All assets must be formatted as `.jpg` compressed to `85%` quality.

---

## 7. Services Architecture

The website provides specialized service landing pages:
* **Rug Cleaning (`rug-cleaning.html`)**: Details traditional organic hand-washing techniques.
* **Rug Restoration (`rug-restoration.html`)**: Outlines repair processes for weaves and fringes.
* **Rug Appraisal (`rug-appraisals.html`)**: Outlines certified valuation procedures.

### Shared Design Philosophy
Service pages maintain visual continuity with the dark-slate styling and gold elements. Each layout concludes with dedicated primary CTA links directing customers to the global reservation scheduler in the footer contact block.

---

## 8. Community Impact Architecture

The brand's charitable outreach is organized as a dedicated landing page (`community-impact.html`):
* **Homepage Integration**: A dedicated summary section on the homepage links to the impact portal.
* **Dedicated Page**: Details charity rug donations, clothing drives, and community events.
* **Timeline Block**: Displays chronological logs of historic philanthropic projects.
* **Internal Linking**: Links to educational blog resources to establish connection between regional histories and charity work.

---

## 9. Knowledge Center

The Knowledge Center (`blog.html` & `blog.js`) serves as an educational and SEO-boosting resource:
* **SEO Advantages**: Targets high-volume organic search keywords (e.g. *vegetable dyes*, *Anatolian weaving*, *rug maintenance*).
* **Customer Education**: Helps buyers appreciate hand-woven quality and dye complexities.
* **Brand Authority**: Reinforces Noor's legacy as a trusted rug specialist.
* **Internal Link Routing**: Contextual links inside blog articles route readers to inventory pages and restoration services.

---

## 10. Future Architecture

The following integrations are approved future directions for the Noor Oriental Rugs platform:

* **Showroom Appointment Scheduling**: Direct booking calendar integrations to reserve slots for viewings in Cambridge, MA.
* **Dynamic Search & Filter suite**: Advanced front-end autocomplete input fields for real-time text matching.
* **E-Commerce Checkout Engine**: Integration of lightweight static cart systems (e.g. Snipcart or Stripe Checkout) to process purchases directly.
* **Headless CMS Portal**: Migration from the static `inventory.json` file to a database API (such as Strapi or Google Sheets API) to manage items via an administrative UI.
* **QuickBooks / CRM Integration**: Customer management database synchronization for automated client invoicing.
