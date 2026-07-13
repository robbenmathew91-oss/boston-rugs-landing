# Architecture & Design Decisions Log — Noor Oriental Rugs

This document serves as the permanent record of major architectural, design, and business decisions made throughout the Noor Oriental Rugs website project. It explains the reasoning behind important decisions so future developers and AI agents understand why the system was built this way.

---

## Decisions Index

1. **[DEC-001]: JSON-Driven Inventory Database**
2. **[DEC-002]: Client-Side Dynamic Rendering**
3. **[DEC-003]: Dedicated Community Impact Page with Homepage summary**
4. **[DEC-004]: URL-Based Filter State & History Sync**
5. **[DEC-005]: Dynamic SEO Meta Tags & Schema Injection**
6. **[DEC-006]: Luxury-First Visual Design Brand Identity**
7. **[DEC-007]: Educational Knowledge Center (Blog System)**
8. **[DEC-008]: Administrative File Filtering Exclusions**
9. **[DEC-009]: Static Client-Only Hosting Target**
10. **[DEC-010]: Postponement of E-Commerce Cart Engine**
11. **[DEC-011]: Comprehensive Documentation-First Development**

---

### DEC-001: JSON-Driven Inventory Database

* **Decision ID**: DEC-001
* **Date**: July 2026
* **Title**: JSON-Driven Inventory Database
* **Decision**: All product information, sizes, pricing, and image directories must be stored in a centralized flat-file database (`inventory.json`).
* **Reason**: To simplify inventory management, eliminate SQL overhead, and maintain a lightweight static profile while still enabling dynamic data operations.
* **Impact on Project**: Makes adding and updating rugs clean. All scripts pull from this JSON structure, ensuring zero product info is hardcoded in HTML pages.
* **Status**: Current

---

### DEC-002: Client-Side Dynamic Rendering

* **Decision ID**: DEC-002
* **Date**: July 2026
* **Title**: Client-Side Dynamic Rendering
* **Decision**: The product detail template (`rug-detail.html`) renders all sections dynamically on page load using client-side JavaScript (`app.js`) matching URL query parameters.
* **Reason**: Avoids duplicate physical HTML files for every product in stock. A single HTML template serves as the display layer for the entire catalog.
* **Impact on Project**: Reduced file size and clean directory structures. Standardizes section layouts, spacing, and CTA triggers.
* **Status**: Current

---

### DEC-003: Dedicated Community Impact Page with Homepage Summary

* **Decision ID**: DEC-003
* **Date**: July 2026
* **Title**: Dedicated Community Impact Page with Homepage Summary
* **Decision**: Move full-length details of the company's charitable rug donations, clothing drives, and timeline logs onto a dedicated page (`community-impact.html`), leaving a short promotional summary on the homepage.
* **Reason**: Prevents the homepage from becoming cluttered and wordy, maintaining a clean visual flow while giving charity stories space on their own page.
* **Impact on Project**: Homepage loading performance improved. Provides a structured landing page for community outreach and partnerships.
* **Status**: Current

---

### DEC-004: URL-Based Filter State & History Sync

* **Decision ID**: DEC-004
* **Date**: July 2026
* **Title**: URL-Based Filter State & History Sync
* **Decision**: Synchronize all catalog category selections (weave, price limits, style) to the browser's address query string using History API triggers.
* **Reason**: Enables deep-linking so users can share specific filtered views, and preserves state when using the browser's back and forward buttons.
* **Impact on Project**: Improved user experience and indexing for deep links.
* **Status**: Current

---

### DEC-005: Dynamic SEO Meta Tags & Schema Injection

* **Decision ID**: DEC-005
* **Date**: July 2026
* **Title**: Dynamic SEO Meta Tags & Schema Injection
* **Decision**: Generate canonical tags, Meta Titles, Open Graph tags, and structured JSON-LD Product Schemas on the fly in `app.js` using product metadata.
* **Reason**: Guarantees that search engine spiders see unique product information for every matched slug, avoiding duplicate metadata warnings.
* **Impact on Project**: Rich snippet previews are populated for search results and social shares.
* **Status**: Current

---

### DEC-006: Luxury-First Visual Design Brand Identity

* **Decision ID**: DEC-006
* **Date**: July 2026
* **Title**: Luxury-First Visual Design Brand Identity
* **Decision**: Build the UI styling using premium brand parameters (slate-black backdrop, gold `#d4af37` active-states, serif headings, and generous margins).
* **Reason**: Aligns the digital experience with the high-ticket price tag of authentic hand-knotted oriental rugs.
* **Impact on Project**: Establishes high brand trust. Hover states, active borders, and card elevations follow the premium luxury visual guide.
* **Status**: Current

---

### DEC-007: Educational Knowledge Center (Blog System)

* **Decision ID**: DEC-007
* **Date**: July 2026
* **Title**: Educational Knowledge Center (Blog System)
* **Decision**: Build an interactive educational blog (`blog.html`) operated client-side via `blog.js` as the Knowledge Center.
* **Reason**: Educates customers on organic dyeing, knot structures, and maintenance, building brand authority and capturing high-intent SEO search queries.
* **Impact on Project**: Contextual internal links inside blog entries route traffic to inventory items and services.
* **Status**: Current

---

### DEC-008: Administrative File Filtering Exclusions

* **Decision ID**: DEC-008
* **Date**: July 2026
* **Title**: Administrative File Filtering Exclusions
* **Decision**: Maintain a dynamic filtering check inside `app.js` that scans image names for words like `tag` or `label` to route paperwork images into a dedicated documentation block, keeping them separate from the main customer gallery.
* **Reason**: Preserves the premium visual aesthetic of the product display while retaining authentic verification paperwork on the page.
* **Impact on Project**: Clean image presentation without requiring separate inventory databases for administrative files.
* **Status**: Current

---

### DEC-009: Static Client-Only Hosting Target

* **Decision ID**: DEC-009
* **Date**: July 2026
* **Title**: Static Client-Only Hosting Target
* **Decision**: Restrict the website framework to run entirely client-side without compiling dependencies, Node dependencies, or database engines.
* **Reason**: Simplifies hosting, ensures compatibility with free/low-cost static hosts (Netlify, GitHub Pages), and guarantees fast page load speeds.
* **Impact on Project**: Lower hosting fees, zero backend security vulnerabilities, and simple migration workflows.
* **Status**: Current

---

### DEC-010: Postponement of E-Commerce Cart Engine

* **Decision ID**: DEC-010
* **Date**: July 2026
* **Title**: Postponement of E-Commerce Cart Engine
* **Decision**: Delay the implementation of shopping cart checkouts and dynamic payments (Stripe/PayPal) to a later phase. Focus current catalog CTAs on direct inquiries and physical showroom reservations.
* **Reason**: Due to the high price point of authentic hand-knotted carpets, customers prefer talking to specialists, requesting video tours, or viewing rugs in person in Cambridge before buying.
* **Impact on Project**: Kept focus on building a premium lead-generation catalog and trust boards.
* **Status**: Current

---

### DEC-011: Comprehensive Documentation-First Development

* **Decision ID**: DEC-011
* **Date**: July 2026
* **Title**: Comprehensive Documentation-First Development
* **Decision**: Initialize a `/docs` directory inside the project root holding blueprints, standards guides, and decisions logs.
* **Reason**: Ensures future developers or AI coding agents can work in the repository without relying on prior conversation contexts or logs.
* **Impact on Project**: Maintained project standards, layout conventions, database practices, and prevented styling drift.
* **Status**: Current
