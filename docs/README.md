# Noor Oriental Rugs Website

## Project Overview

The Noor Oriental Rugs website is a premium, digital showroom and services hub for high-end handmade carpets, catering to collectors, interior designers, and discerning homeowners. The platform is built around a scalable, JSON-driven architecture that dynamically showcases unique oriental rugs, outlines professional services (cleaning, repair, restoration, and appraisal), details direct community impact initiatives, and provides a rich knowledge base.

---

## Current Project Status

- **Version**: `v1.0`
- **Status**: ✅ Production-ready dynamic product page template completed.
- **Current Development Phase**: Expanding the inventory catalog inside `inventory.json` using the finalized template. Future development should prioritize importing new inventory data assets rather than redesigning the dynamic template structure.

---

## Quick Start

To run the project locally with automatic cache control headers disabled (preventing browser caching during development):

1. Ensure you have Python installed.
2. Run the development server script from the root workspace directory:
   ```bash
   python dev_server.py
   ```
3. Open your browser and navigate to the local showroom page:
   `http://localhost:8083/index.html`
4. Inspect the finalized template page:
   `http://localhost:8083/rug-detail.html?slug=vintage-turkish-chanakaleh`

---

## Documentation Guide

Before making architectural or structural changes, future developers and AI agents must read these files in the following order:

1. **[docs/AI-HANDOFF.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/AI-HANDOFF.md)** — Primary entry-point summary of features, tech stack, constraints, and priorities.
2. **[docs/architecture.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/architecture.md)** — Detailed technical design, rendering pipelines, grid structures, and cache configurations.
3. **[docs/product-template.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/product-template.md)** — Structural specification of the product template, gallery layout, and class styling.
4. **[docs/content-guide.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/content-guide.md)** — Guidelines for tone of voice, required fields, image sequences, and inventory check-lists.
5. **[docs/ai-instructions.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/ai-instructions.md)** — Quality benchmarks, coding standards, and sandbox tools execution policies.
6. **[docs/decisions.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/decisions.md)** — History of technical trade-offs, architecture decisions, and resolutions.

---

## Current Capabilities

The completed features include:
- **Dynamic Rug Catalog**: Filters and searches rugs based on collection, origin, and design style parameters.
- **Dynamic Product Pages**: Clean slug routing parsing variables to output detail templates dynamically.
- **Editorial Storytelling**: Beautifully formatted description columns utilizing soft gold vertical accent lines and Playfair Display serif headers.
- **Story Behind This Rug**: Dynamic, optional narrative text blocks, quoted highlights, and historical separators.
- **Product Specifications**: Human-readable technical spec grid cards.
- **Purchase With Confidence**: Standard trust grids promoting inspection, organic wash, rarity, and consultation.
- **Premium Image Gallery**: Thumbnail arrays with smooth fade transitions, loading states, and layout counters.
- **Dynamic FAQ System**: Details-based interactive FAQ panels with single-open script bindings.
- **Related Rugs Recommendations**: Dynamic recommend algorithms mapping style, dimensions, and origin.
- **Community Impact**: Core mission profiles detailing sustainable weaving partnerships (`community-impact.html`).
- **Knowledge Center**: Dynamic portal for educational articles (`blog.html`).
- **Service Pages**: Special pages detailing Cleaning, Restoration, Repair, and Appraisal services.
- **Dynamic SEO**: Auto-updating canonical tags, Open Graph meta tags, meta titles, descriptions, and JSON-LD markup.
- **Accessibility & Responsiveness**: Mobile menus, skip links, aria states, responsive grid sizes, and viewport constraints.

---

## Development Philosophy

- **JSON-Driven Architecture**: Avoid hardcoding product details. `inventory.json` is the single source of truth for all catalog items.
- **Reusable Templates**: Use client-side rendering engines to mount details dynamically, preventing page duplication.
- **Luxury Editorial Design**: Premium typography pairing (`Playfair Display` and `Outfit`), comfortable whitespace, and subtle accents.
- **SEO-First Implementation**: Rich schema JSON-LD payloads, meta tags, and indexable landmarks generated dynamically.
- **Accessibility by Default**: Aria-compliant markup, skip-links, and semantic HTML5 tag selection.
- **Long-Term Maintainability**: Clean separation of concerns, vanilla scripting, and reusable code blocks over localized overrides.

---

## Project Architecture

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

## Secondary Documentation Index

- **[docs/changelog.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/changelog.md)**: Historical record of structural improvements, versions, and fixes.
- **[docs/roadmap.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/roadmap.md)**: List of upcoming features (CMS, text search bars, filters, booking calendars).
- **[docs/deployment.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/deployment.md)**: Explains static deployment targets, local python servers, and relative file structures.
- **[docs/prompts.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/prompts.md)**: Preset prompt directives to execute inventory additions and CSS adjustments.
- **[docs/inventory-workflow.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/inventory-workflow.md)**: Rules for adding inventory items, compression, and file filtering tags.
- **[docs/seo-strategy.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/seo-strategy.md)**: Schema layouts, canonical mapping, and index strategies.
- **[docs/ai-instructions.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/ai-instructions.md)**: System design rules and script guidelines.
