# AI Coding Assistant Instructions — Noor Oriental Rugs

This document serves as the permanent operating manual for every future AI agent working on the Noor Oriental Rugs project. It preserves architectural choices, development philosophy, coding standards, design requirements, and operational guidelines to ensure that all future contributions remain consistent, premium, and maintainable.

---

## Project Philosophy

The Noor Oriental Rugs website is a digital storefront designed to present the brand as a luxury heritage name. The platform balances commerce, local services, education, and social responsibility:

* **Handmade Rug Sales**: An online showroom highlighting premium, individual carpets with authentic detail and pricing transparency.
* **Professional Rug Services**: Practical guides and portals directing visitors to the Cleaning, Restoration, and Appraisals departments.
* **Community Impact**: Public records of corporate citizenship, charitable partnerships, and local outreach programs.
* **Educational Content (Knowledge Center)**: Educational blog resources explaining historical Anatolian weaving, dye processes, and preservation guidelines.

The website prioritizes **trust, authenticity, craftsmanship, and long-term maintainability**. All visual treatments and code elements must reflect high-end oriental rug retail quality.

---

## Core Architecture Rules

* **Single Source of Truth**: All dynamic values, descriptive copy, image catalog paths, collections, prices, age records, and dimensions must remain in [inventory.json](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/inventory.json).
* **Data-Driven Templates**: Never hardcode product details or visual descriptions into the HTML shell. The page templates (such as `rug-detail.html`) must dynamically render contents from JSON objects matched via URL queries (e.g. `slug`).
* **Dynamic Routing**: The catalog and collections pages must link into details templates using URL slug parameter strings.
* **Header Metadata Autogeneration**: Page titles, canonical tags, description headers, Open Graph tags, and Product Schemas must be dynamically built from the matching item's metadata block at runtime.
* **No Server Dependencies**: The codebase operates entirely client-side. Do not install Node packages, server routing modules, or compile systems unless requested.

---

## Coding Standards

* **Reusable Components**: Render page containers (spec cards, product tiles, badges grids, trust badges) dynamically using reusable JS template functions inside `app.js` to prevent HTML duplication.
* **CSS Custom Variables**: Use the predefined theme tokens inside `styles.css` for all layout elements, colors, and transitions to preserve consistent branding.
* **Mobile-First Development**: Lay out styling rules starting with mobile container layouts and stack elements cleanly, utilizing media queries to scale up onto wider screens.
* **Accessibility (a11y)**: Focus on proper semantic hierarchies (H1 &rarr; H2 &rarr; H3), color contrast ratios, clear font sizing, keyboard focus outlines, and descriptive image `alt` attributes.
* **Progressive Enhancement**: Ensure pages remain legible and usable even when images fail to load or background scripts encounter latency.

---

## Design Standards

* **Luxury Aesthetic**: Maintain the established high-end luxury styling. Use dark background slates (`#0a0a0a`), clean golds (`#d4af37`), and soft off-white text grids.
* **Comfortable Spacing**: Use generous padding margins (typically `3.5rem` / `56px` to `4.5rem` / `72px` between sections) to create breathing room.
* **Consistent Typography**: Use the serif font (`Playfair Display`) for headings and the sans-serif font (`Inter`) for clean, legible body descriptions.
* **Hover Animations**: Implement subtle animations for interactive components. Main buttons must translate smoothly, and links should transition colors without instant flashing.
* **Minimal Visual Clutter**: Organize data grids cleanly, and avoid crowded button rows.

---

## Product Page Standards

Every product page template must present content in the following structural order:

1. **Horizontal Header Navigation** (Shared component)
2. **Breadcrumbs Navigation**
3. **Double Column Hero Split**:
   * **Left Column**: Main hero image, horizontal thumbnail strip (with active gold borders), and a distinct "Inventory Documentation" row for administrative paperwork.
   * **Right Column**: Product title, price, "Only One Available" badge, "Rug at a Glance" badges grid, and key specs.
4. **Description**: Long-form paragraph blocks styled under headers with gold left-accent border marks.
5. **The Story Behind This Rug**: An editorial storyteller section with a gold pull quote, narrative, and traditional diamond dividers (`❖ ❖ ❖`).
6. **Specifications Grid**: Balanced cards showing details like knots per square meter and dyeing types.
7. **Why Buy This Rug**: Checklist showing trust credentials.
8. **Action CTAs**: Primary solid/outline buttons paired with inline video and store call links.
9. **Related Rugs**: Auto-populated visual cards displaying 3 similar inventory items.
10. **Showroom Invitation Card**: Highlighted details promoting the Cambridge showroom.
11. **Services & Appraisals**: Cross-links pointing to rug cleaning, restoration, and appraisal segments.
12. **Social Proof Badges**: Fine icons detailing washing, inspection, and consulting standards.
13. **Footer** (Shared component)

---

## SEO Standards

* **Dynamic Meta Title**: Format dynamically to: `[Rug Name] | Noor Oriental Rugs` or load `seo.title` values from JSON.
* **Description Syncing**: Retrieve optimized descriptions from JSON objects to populate HTML meta description tags.
* **Structured Data Schema**: Dynamic creation and insertion of JSON-LD `Product` schemas matching current specs.
* **Absolute Asset Previews**: Ensure Open Graph and Twitter image preview links use absolute server URLs.
* **Logical Outline Hierarchy**: Enforce a strict semantic outline (`h1` for main title, `h2` for page sections, `h3` for inner subheadings).

---

## Inventory Standards

* **Addition Protocols**: Add items to `inventory.json` by assigning a unique ID, slug, and core specifications.
* **Markdown Newlines**: Use double newlines (`\n\n`) to separate descriptive subheadings (`###`) from body paragraphs to prevent layout splitting bugs in the dynamic HTML parser.
* **Admin Asset Segregations**: Label inventory files containing words like `label`, `tag`, or `document` to prevent paperwork photos from cluttering customer gallery viewports.
* **Image Compress Sizing**: Compress all new assets to standard `.jpg` files using `85%` compression limits.

---

## Documentation Standards

Whenever a new visual feature, data property, or layout design is created or modified:
* Sync and update the relevant markdown files inside `/docs` immediately.
* Ensure documentation remains accurate to the current codebase.

---

## AI Agent Rules

* **Read Manual First**: Read this guide before editing templates or stylesheets.
* **Do Not Redesign**: Preserve established UI alignments and brand colors.
* **Enforce Scalable Solutions**: Build systems that apply dynamically to all rugs in the catalog. Never apply hardcoded code tweaks that break if details changes.
* **Update Walkthroughs**: Describe all script improvements and visual shifts clearly inside `/docs/changelog.md` and walkthrough logs.
