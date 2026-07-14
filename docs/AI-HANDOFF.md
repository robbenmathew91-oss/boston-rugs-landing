# AI Handoff Document

⚠️ Before making any code changes, read this document completely. Then review the project documentation in the recommended order. Do not make architectural changes until you understand the existing system and project philosophy.

---

## Project Overview

The Noor Oriental Rugs website is a digital showroom and business platform for a luxury, family-owned Oriental rug company based in Cambridge, MA (serving the greater Boston area). The business model is focused on the following key pillars:

- **Handmade Rug Sales**: Showcasing and selling fine, one-of-a-kind vintage and traditional oriental rugs.
- **Rug Services**: Full-service professional rug cleaning, organic hand-washing, fringe restoration, structural repair, and appraisal services.
- **Community Impact**: Promoting fair-trade artisan weaving practices and local charity initiatives.
- **Educational Content**: Preserving and teaching the cultural history of weaving regions in northwestern Anatolia, Persia, and the Caucasus.

The website reflects this positioning by prioritizing:
- **Trust & Craftsmanship**: Communicating authenticity, expert selection, and delicate preservation techniques.
- **Storytelling**: Giving every rug its own historical voice and narrative context.
- **Long-Term SEO**: Building structural search rankings based on dynamic product pages.
- **Maintainability & Scalability**: Ensuring the entire website can be maintained without redundant page duplication.

---

## Current Project Status

- **Project Version**: `v1.0`
- **Status**: The production-ready dynamic product template (`rug-detail.html`) is completed, verified, and fully responsive.
- **Current Development Phase**: Expanding the rug inventory inside [inventory.json](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/inventory.json). Future development should prioritize importing new inventory catalog assets rather than editing or redesigning the template structure.

---

## Project Philosophy

- **Luxury Before Complexity**: Simple, clean, high-performance HTML/CSS layouts that feel premium and spacious, rather than heavy JS framework dependencies.
- **Editorial Rather Than Promotional**: Design and copy that look like a fine art catalog (e.g. Sotheby's, RH) rather than a noisy transactional retail grid.
- **Data-Driven Architecture**: Avoid hardcoding product details. A single source of truth (`inventory.json`) drives all content rendering.
- **SEO-First Development**: Dynamic search metadata, indexing directives, and rich structured JSON-LD schemas generated on the fly.
- **Accessibility by Default**: Clean semantic landmarks, ARIA labels, and skip-navigation pathways.
- **Maintainability over Shortcuts**: Scoped styling classes (e.g. `.rug-editorial-*`) and reusable template methods instead of ad-hoc CSS tweaks.

---

## Technology Stack

The project utilizes a simple, static-hostable web architecture. The implemented technologies include:

- **HTML5**: Structured semantic landmarks (`<main>`, `<article>`, `<nav>`, `<aside>`).
- **CSS3**: Vanilla CSS styling, responsive layout variables, grids, and flexboxes (in [styles.css](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/styles.css)).
- **Vanilla JavaScript (ES6)**: Standard DOM manipulation, dynamic content templating, routing, and event delegation (in [app.js](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/app.js)).
- **JSON Database**: Local [inventory.json](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/inventory.json) file serving as the primary product catalog.
- **Client-Side Rendering**: Injects dynamic DOM fragments based on URL queries.
- **Static Hosting**: Configured to run on simple servers (e.g. local Node HTTP server).
- **JSON-LD Schema**: Dynamic injection of Product, BreadcrumbList, and FAQPage schemas into the head element.

---

## Documentation Reading Order

Before making any modifications, read these documentation assets in sequence:

1. **[AI-HANDOFF.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/AI-HANDOFF.md)** (This file) — Core onboarding overview, current status, stack details, and working rules.
2. **[README.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/README.md)** — Project catalog map, workspace folders, and startup directions.
3. **[architecture.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/architecture.md)** — Detailed technical design, database mapping, and data flow.
4. **[product-template.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/product-template.md)** — Product details page layout hierarchy, parser schemas, and class mapping.
5. **[content-guide.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/content-guide.md)** — Editorial tone requirements, image lists, and field formatting guidelines.
6. **[ai-instructions.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/ai-instructions.md)** — General guidelines for developer tools and coding standards.
7. **[decisions.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/decisions.md)** — History of design compromises, architectural adjustments, and decisions made.
8. **[seo-strategy.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/seo-strategy.md)** — Ranking directives, structured formats, and URL rules.
9. **[inventory-workflow.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/inventory-workflow.md)** — Manual workflow steps for updating inventory assets.
10. **[changelog.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/changelog.md)** — Complete chronological history of updates, versions, and fixes.

---

## Current Website Features

The completed, fully functional features include:

- **Dynamic Rug Catalog**: Filters and searches rugs based on collection, origin, and design style parameters.
- **Dynamic Product Pages**: Clean slug routing parsing variables to output detail templates dynamically.
- **Editorial Product Descriptions**: Distinct, formatted description blocks featuring gold accents and custom serif headers.
- **Story Behind This Rug**: Dynamic, optional narrative text blocks and quoted inserts.
- **Product Specifications**: Human-readable technical spec grid cards.
- **Purchase With Confidence**: Standard trust grids promoting inspection, green organic wash, rarity, and consultation.
- **Premium Image Gallery**: Thumbnail arrays with smooth image swaps, loading stages, and layout counters.
- **Dynamic FAQ System**: Details-based interactive FAQ panels with single-open script bindings.
- **Related Rugs Recommendations**: Dynamic recommend algorithms mapping style, dimensions, and origin.
- **Community Impact**: Core mission profiles detailing sustainable weaving partnerships.
- **Knowledge Center**: Dynamic portal for educational articles.
- **Service Landing Pages**: Special paths detailing Cleaning, Restoration, Repair, and Appraisal services.
- **Dynamic SEO**: Auto-updating canonical tags, Open Graph meta tags, meta titles, descriptions, and JSON-LD markup.
- **Accessibility & Responsiveness**: Mobile menus, skip links, aria states, responsive grid sizes, and viewport constraints.

---

## Product Page Architecture

The product page template operates under a strict client-side dynamic load scheme:

- **Single Template**: [rug-detail.html](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/rug-detail.html) serves as the host page. It remains lightweight, declaring basic layouts and semantic landmarks.
- **URL Slug Routing**: The script in [app.js](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/app.js) reads URL search parameters (`?slug=...`) on load.
- **Database Fetch**: It queries `inventory.json` for a matching object.
- **Dynamic Mount**: String variables dynamically compile and replace templates inside the DOM. No static product pages are used.
- **Schema Replacement**: Old structured script elements in the head are cleaned up and replaced with the active product data JSON-LD schemas.

---

## Rules That Must Never Be Broken

- **Never Hardcode Product Details**: Do not write static description, name, or metadata strings inside `rug-detail.html`. Everything must reside in `inventory.json`.
- **Preserve JSON-Driven Rendering**: Keep the data pipeline generic to ensure future rugs can load seamlessly without script updates.
- **Never Duplicate Product Pages**: Avoid creating static HTML files for individual rugs.
- **Preserve Semantic HTML**: Do not replace tags like `<main>`, `<article>`, `<header>`, and `<footer>` with arbitrary nested `<div>`s.
- **Preserve Structured Data**: Maintain the Product, BreadcrumbList, and FAQPage JSON-LD schemas.
- **Maintain Accessibility**: Keep focus landmarks, screen-reader descriptions, and alt tags fully active.
- **Keep SEO Dynamic**: Ensure canonical headers, description fields, and OG tags match the active rug payload.
- **Preserve Editorial Design**: Adhere to Playfair Display serif titles, Outfit light body fonts, spacing rules, and soft gold accents.
- **Reuse Components**: Extend existing elements rather than writing new layout overrides.
- **Update Documentation**: Always log changes to template variables in the appropriate documentation files.

---

## Current Development Workflow

Follow this procedure when adding a new rug to the website:

1. **Rename images**: Use lowercase and underscores: `[slug]_[view_type].jpg` (e.g. `chanakaleh_fringe.jpg`).
2. **Compress images**: Optimize for web (size under 400KB).
3. **Upload images**: Add to the `images/` directory.
4. **Update inventory.json**: Insert the new product entry at the end of the array.
5. **Verify gallery**: Run local server and test the thumbnails.
6. **Generate editorial description**: Structure paragraph content with single `### Heading` lines.
7. **Generate Story Behind This Rug**: Add regional heritage text to the `story` property.
8. **Generate FAQ**: Confirm condition variables output correctly.
9. **Verify SEO**: Ensure title format and meta descriptions stay within character limits.
10. **Test desktop**: Verify visual grid ratios (62% gallery / 38% content) at 100% zoom.
11. **Test mobile**: Verify that the navigation menus and columns collapse cleanly.
12. **Commit changes**: Push changes to the repository.

---

## Current Priorities

1. **Import Remaining Inventory**: Focus on converting physical inventory into clean, populated entries inside `inventory.json` using the content guide.
2. **Expand the Knowledge Center**: Add educational, history-focused articles in the blog directory to drive organic traffic.
3. **Improve Collection/Search Pages**: Add advanced filters (dimensions, origin, colors, styles) to the main search catalog.
4. **Continue SEO Growth**: Track ranking keywords and monitor structured data compliance on Google Search Console.

*Note: Do not attempt major template redesigns. The layout structures are considered production-ready.*

---

## Future Roadmap

The roadmap includes potential enhancements to be implemented in future phases:
- **Advanced Search**: Contextual search parameters.
- **Appointment Scheduling**: Integrated calendar links for private showroom viewings.
- **Wishlist**: Simple local-storage database to track customer favorites.
- **CMS Integration**: Future transition to headless CMS endpoints.
- **Customer Reviews**: Dynamic review modules for verified purchasers.
- **AI Recommendations**: Predictive recommendation algorithms based on collection visits.
- **E-Commerce Checkout**: Transition from inquiry actions to direct checkout integrations.
- **CRM Integration**: Dynamic connection of consultation forms to lead management systems.

*Refer to [roadmap.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/roadmap.md) for more details.*

---

## AI Working Principles

Future AI agents must follow these guidelines:

- **Learn Before Coding**: Read the documentation files in the recommended sequence before modifying repository files.
- **Respect the Dynamic System**: Keep templates generic. Avoid proposing site hacks that hardcode content for individual slug values.
- **Extend, Don't Rebuild**: Enhance the design systems in `styles.css` using the existing variable tokens instead of rewriting layouts.
- **Verify Code Integrity**: Run visual checks at 100% resolution to prevent horizontal page overflow.
- **Document Changes**: Always update the `changelog.md` and this handoff document whenever structural rules, tools, or dependencies evolve.

---

## Final Notes for Future AI Agents

The product page template is finalized and optimized for readability, luxury aesthetics, SEO, and responsive performance. Your effort should focus on adding catalog assets and building out secondary pages (search, collection lists, and articles) rather than repeatedly altering the product details grid. Think long-term, maintain semantic cleanliness, and keep the user experience premium.
