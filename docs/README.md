# Project Overview

The Noor Oriental Rugs website serves as a premium, digital showroom and services hub for high-end handmade carpets, catering to collectors, interior designers, and discerning homeowners. The website bridges the gap between historical heritage craftsmanship and modern digital retail, highlighting two primary business divisions alongside community-centric education:

* **Handmade Rugs for Sale**: A data-driven visual catalog displaying premium, one-of-a-kind vintage and traditional carpets. Each rug is presented with granular dimensions, origin details, materials, age, custom-parsed descriptions, and authentic storytelling.
* **Professional Rug Services**: A suite of specialized service landing segments outlining expert services including Professional Rug Cleaning, Artisan Rug Restoration & Repair, and Certified Rug Appraisals.
* **Community Impact Initiative**: A dedicated portal (`community-impact.html`) highlighting the brand's philanthropic outreach, including charitable rug donations, clothing drives, and direct support for local communities.
* **Knowledge Center**: An educational blog system (`blog.html` & `blog.js`) providing detailed articles about traditional organic dyeing, weaving history, and carpet maintenance tips to preserve handmade rugs for future generations.

---

# Current Technology Stack

The platform is engineered using a lightweight, lightning-fast static architecture with dynamic client-side generation:

* **Core Structure**: Semantic HTML5 markup ensuring clean browser rendering and accessibility tree validation.
* **Luxury Design & Styling**: Vanilla CSS3 structured around custom variables (CSS custom properties) to define responsive grids, typography, animations, and the premium slate-black and gold branding.
* **Dynamic Behavior**: Vanilla ES6 JavaScript (free of heavy framework dependencies) to manage viewports, load content dynamically, filter administrative tag files, and build interactive modal lightboxes.
* **Data Layer (Flat-File DB)**: A structured JSON file (`inventory.json`) serving as the database repository for all catalog details, search parameters, images, and stories.
* **Web Icons**: FontAwesome 6 Web Icons loaded for inline badges, checks, and navigation glyphs.
* **Local Development Server**: A custom socket-based Python script (`dev_server.py`) serving files locally over port 8083 with automatic cache-control disabling headers to prevent browser caching during edits.

---

# Current Features

The current implementation boasts the following features:

* **Dynamic Catalog Inventory Grid (`rugs-for-sale.html`)**: Renders all inventory items dynamically from the JSON file with interactive listing details.
* **Sticky Multi-Column Detail View (`rug-detail.html`)**: Features a sticky vertical gallery column on the left and scrollable purchase specifications on the right.
* **Horizontal Thumbnail Strips**: Keeps thumbs below the hero image with active-state gold borders, preventing overlap.
* **Administrative File Separation**: Automatic keyword filtering that routes administrative label/tag images out of customer view and into a dedicated "Inventory Documentation" panel.
* **"Rug at a Glance" Header Badges**: A prominent 4-card grid showing Origin, Material, Weave (Hand Knotted), and Condition at the top of the detail sheet.
* **Structured Description Layout**: Helper code in `app.js` that parses Markdown subheading strings (`###`) and wraps them in clean headings styled with a gold left vertical border.
* **Storytelling Panel ("The Story Behind This Rug")**: An editorial story segment displaying historical context, tribal motif symbolism, and preservation notes from the database alongside a gold italicized pull quote and diamond motifs divider (`❖ ❖ ❖`).
* **Equal-Height Specification Cards**: A grid of specification items styled with CSS flex-stretch to remain perfectly aligned across all mobile, tablet, and desktop viewports.
* **Why Buy This Rug Trust Board**: A shaded trust box containing key purchase indicators (100% Wool, Artisan Hand Knotted, Organic Wash, Preserved Fringes).
* **Multi-Action CTAs**: Premium primary CTA buttons (*Request More Information*, *Schedule an In-Store Viewing*) paired with secondary quick-links (*Call Store* and *Request a Video Tour*).
* **Dynamic Related Rugs Cards**: An automated grid displaying 3 similar rugs matching the current rug's style or collection, featuring scale-up hover animations.
* **Showroom Invitation Card**: A border-accented invite card highlighting the physical showroom location in Cambridge, MA.
* **Social Proof Badges**: A row of 4 footer badges summarizing inspection, washing, organic craftsmanship, and expert consultations.

---

# Project Architecture

The Noor Oriental Rugs platform uses a **data-driven static template architecture**. 

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│  Browser Entry  │ ───>  │     app.js      │ ───>  │  inventory.json │
│ (URL Query Slug)│       │ (Slug Matcher)  │       │ (Flat DB Array) │
└─────────────────┘       └─────────────────┘       └─────────────────┘
         │                         │                         │
         ▼                         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│ Dynamic Header  │ <───  │ DOM Rendering   │ <───  │ Structured      │
│ (SEO Metas/LD)  │       │ Template Blocks │       │ Product Payload │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

The server serves basic HTML templates (`index.html`, `rug-detail.html`). When a page loads, client-side scripts parse the URL query strings (e.g., `slug=vintage-turkish-chanakaleh`), pull the full inventory dataset, and dynamically populate the DOM structure. Dynamic schemas are injected to the header for search index crawlers, ensuring that a single physical template file (`rug-detail.html`) seamlessly handles every rug in the inventory.

---

# Documentation Guide

The `/docs` directory is organized to help developers and AI agents understand the codebase:

* **[README.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/README.md)**: This file; the high-level project summary, quick-start guide, and technology stack inventory.
* **[architecture.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/architecture.md)**: Details sequence diagrams, technical implementation scripts, layout systems, and cache-busting.
* **[inventory-workflow.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/inventory-workflow.md)**: Rules for adding inventory items, compression scripts, naming conventions, and file filtering keywords.
* **[seo-strategy.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/seo-strategy.md)**: Maps out the Product JSON-LD schema, canonical url configuration, Open Graph metadata, and header tag layouts.
* **[ai-instructions.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/ai-instructions.md)**: Style system constraints, template dynamic rendering policies, and cache controls to align code changes by AI agents.
* **[changelog.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/changelog.md)**: Historical record of visual improvements, gallery alignment fixes, and story cards additions.
* **[roadmap.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/roadmap.md)**: List of upcoming features (CMS, text search bars, filters, booking calendars).
* **[deployment.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/deployment.md)**: Explains static deployment targets, local python servers, and relative file structures.
* **[prompts.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/prompts.md)**: Preset prompt directives to execute inventory additions, image filtering adjustments, and CSS color modifications.

---

# Development Principles

Our architecture and code structure follow these guiding principles:

* **JSON as the Single Source of Truth**: All product descriptive texts, prices, collections, and image file references must be added to `inventory.json`. Product detail values are never hardcoded in the HTML structure.
* **Data-Driven Rendering**: Page layouts are built dynamically at runtime by scripts matching database parameters. The HTML structures remain reusable.
* **Reusable Components**: Layout components (cards, lists, badges grids) are generated by modular loop scripts, facilitating seamless additions.
* **Luxury User Experience**: Visual designs maintain a high-end luxury feel, using deep blacks, warm gold highlights, clean typography, soft card borders, and smooth transitions on hover.
* **SEO-First Development**: Rich schema JSON-LD payloads, unique canonical URLs, and structured Open Graph header values are dynamically generated for every page to maximize search ranking metrics.
* **Mobile-First Responsiveness**: CSS rules ensure elements scale, wrap, and stack cleanly. Main grids convert to single-column flex layers on smaller screens.
* **Maintainability**: Assets and scripts utilize cache-busting configurations (`v=X`), and scripts follow vanilla conventions to avoid framework build processes.
