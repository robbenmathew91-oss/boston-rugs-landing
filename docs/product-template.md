# Product Page Template Documentation

This document defines the architecture, design principles, markup structure, and development rules for the production-ready rug detail page template at Noor Oriental Rugs.

---

## Product Page Overview

The Noor Oriental Rugs product page is designed to emulate a premium, editorial reading experience reminiscent of top-tier luxury brands, art galleries, and auction houses (such as RH, 1stDibs, Sotheby's, and Christie's). 

Rather than utilizing a standard transactional e-commerce layout, the page presents each rug as a unique work of art with its own history, craftsmanship details, and character. To maintain scalability and clean architecture, the entire page is driven dynamically from a single template utilizing [inventory.json](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/inventory.json) as the single source of truth.

---

## Page Structure

The product page must render its sections in the following strict vertical sequence:

1. **Breadcrumb navigation** — Visible path indicating origin-based categorization.
2. **Product gallery** — Multi-image layout with smooth transitions, zoom capability, and thumbnail list.
3. **Product title** — High-contrast Playfair Display heading.
4. **Price** — Elegant price display.
5. **One-of-a-Kind badge** — "Unique" scarcity badge.
6. **Metadata cards** — Clean status list containing ID, origin, size, and condition.
7. **Editorial Description** — Deep-dive text grouped into distinct thematic sections.
8. **Story Behind This Rug** — Detailed cultural narratives punctuated by custom quote blocks.
9. **Specifications** — Dynamic grid list of technical details.
10. **Why Buy This Rug** — Trust points reinforcing quality and value.
11. **Primary CTAs** — Contextual action buttons (Request Info, Schedule Viewing, Video Tour, Direct Call).
12. **Purchase With Confidence cards** — Craftsmanship trust grid.
13. **FAQ** — Accordion-style product FAQs.
14. **Related Rugs** — Dynamic recommendations matching origin, style, and size.
15. **Footer** — Standard brand directory.

---

## Gallery System

The gallery system is optimized for high-resolution images, loading speed, and responsive display:

- **Main Image**: Encased in `.rug-detail-image-wrapper` with a custom loading spinner overlaying the transition.
- **Thumbnail Gallery**: Rendered dynamically from the rug's image array (excluding tags and document images marked with tag/label keywords).
- **Active Thumbnail Behavior**: Clicking a thumbnail updates the main image source, applies a `.active` border styling to the thumbnail button, and updates the image counter.
- **Image Counter**: Overlay stating `"Image X of Y"` positioned in the bottom-right corner of the image stage.
- **Responsive Behavior**: Shifts from a side-by-side split layout on desktop to a stacked layout on tablets and mobile screens, adjusting image height constraints to stay within the viewport.

---

## Product Summary

The top-of-page summary provides key signals to visitors at a glance:

- **Breadcrumbs**: Home › Rugs for Sale › [Origin] Rugs › [Rug Name]. Built dynamically using URL query parameters.
- **Scarcity Badge**: Subtle gold outline badge showcasing a gem icon and text: `Unique`.
- **Metadata Cards**: Compact four-column grid showing Inventory ID, Origin, Size, and Condition.
- **Typography Hierarchy**: Distinct pairing of serif headings (`Playfair Display`) and sans-serif values (`Outfit`), ensuring a crisp, balanced structure.

---

## Editorial Description

The Description is parsed and transformed into a premium magazine reading flow.

- **Markdown-driven content**: Headings defined by `### ` markers and paragraphs separated by `\n\n`.
- **Section Parsing**: The parser splits the block on double newlines (`\n\n`) to form sections. If a block starts with `### `, it splits the block on the first single newline (`\n`) to divide the heading from the paragraph body.
- **Heading & Paragraph separation**: The heading and body must never be merged inside the same element. They must use the following structural hierarchy:

```
[Section] — .rug-editorial-section (div)
   ├── [Heading] — .rug-editorial-heading (h3)
   │      ├── [Accent] — .rug-editorial-heading-accent (span)
   │      └── Title text (e.g. "Overview")
   └── [Paragraph] — .rug-editorial-body (p)
```

- **Typography System**: 
  - **Serif Headings**: Playfair Display, 1.15rem, weight 600, color full white/luminance.
  - **Sans-serif Body**: Outfit, 0.94rem, weight 300, line-height 1.95, maximum reading measure limited to `66ch`.
  - **Gold Accent**: Left-aligned 2px vertical accent bar with a gradient fading from top solid gold to bottom transparent.

---

## Story Section

- **Purpose**: Provides deep narrative context about the cultural weaving lineage of the rug's home region.
- **Quote Block**: Centered italic block featuring large elegant quotation marks (`&ldquo;` / `&rdquo;`) in a warm primary gold color, serving as a visual focal point.
- **Storytelling text**: Styled with comfortable line height and paragraph breaks.
- **Optional rendering**: Only renders if the `story` property is populated in `inventory.json`.

---

## Specifications

- **Grid Layout**: Auto-fitting multi-column grid (`.rug-specifications-grid`).
- **Dynamic Fields**: Converts camelCase keys (e.g., `knotDensity`, `pileHeight`) to capitalized, human-readable titles dynamically.
- **Values**: Populated entirely from the rug's `specifications` object.

---

## Trust Section

Located above the FAQs, this section features four "Purchase With Confidence" trust cards:

1. **Individually Inspected** — Detailing quality checks.
2. **Washed & Restored** — Highlighting organic green shampoo washing.
3. **One of a Kind** — Reminding users of the piece's absolute rarity.
4. **Expert Consultation** — Promoting direct Specialist service.

**Styling**: Dark background card container, thin gold-tint borders, soft hover animations, and golden icons.

---

## Calls to Action

Four actions are provided to support different customer pathways:
- **Request Information** — Direct inline form path or overlay to ask general questions.
- **Schedule Viewing** — Showroom appointment request.
- **Phone Consultation** — Click-to-call link for expert assistance.
- **Video Tour** — Link to request custom high-definition video files of the rug.

---

## FAQ

- **Dynamic Generation**: Reads the rug's metadata to populate details like condition status and names within pre-formulated FAQ content.
- **Accordion Behavior**: Implemented using semantic HTML `<details>` and `<summary>` elements with smooth accordion styling.
- **Single-open interaction**: JavaScript monitors state to collapse other accordion items when one is opened.
- **SEO Compatibility**: Mirrored in the `FAQPage` JSON-LD schema block.

---

## Related Rugs

- **Dynamic Recommendation Engine**: Analyzes all items in `inventory.json` on page load.
- **Matching Criteria**: Filters and ranks items based on matching `origin`, `style` (traditional/modern/vintage), and `size` parameters.
- **Color & Similarity**: Prioritizes rugs from the same origin first, then style, and displays three matching alternatives.
- **Goal**: Retains interest and guides users back into the search funnel instead of hitting a dead-end page.

---

## SEO

The template contains complete technical SEO and accessibility optimizations:

- **Product Schema**: Injects `@type: Product` JSON-LD containing name, SKU, price, brand, material, origin, and conditions.
- **Breadcrumb Schema**: Injects `BreadcrumbList` JSON-LD mirroring the visible navigation structure.
- **FAQ Schema**: Injects `FAQPage` JSON-LD containing questions and answers rendered on the page.
- **Meta Title**: Generated dynamically as `"{Name} | Handmade {Origin} {Style} Rug | Noor Oriental Rugs"`.
- **Meta Description**: Curated dynamic string within 140–160 characters.
- **Canonical URL**: Dynamic tag reflecting the clean page URL.
- **Open Graph / Twitter Cards**: Injects metadata including `og:title`, `og:description`, `og:image`, and `twitter:card`.
- **Image ALT Text**: Dynamically builds description strings for all gallery assets.
- **Semantic HTML**: Structural elements use `<main>`, `<article>`, `<nav>`, `<aside>`, and `<header>` tags with correct `h1`-`h6` hierarchy.
- **Accessibility**: Includes a hidden "Skip to content" link, `aria-live` blocks, `aria-expanded` states, and ARIA labels.

---

## Design System

The product page extends the core Noor design language:
- **Dark Theme**: Dark charcoal backgrounds (`var(--color-bg)` / `#0e0e0e`) and gold highlights (`var(--color-primary)` / `#d4af37`).
- **Typography**: Playfair Display for headers (classic serif) and Outfit for body text (light sans-serif).
- **Gold Accent Usage**: Applied selectively (accent bars, icons, badges) to emphasize luxury without visual clutter.
- **Editorial Philosophy**: Uses ample whitespace instead of heavy borders to demarcate sections.

---

## Dynamic Architecture

The page is entirely dynamic:
- **`inventory.json` values** are fetched via `InventoryManager` inside `app.js`.
- The template uses backtick string templates to construct the DOM, replacing all placeholders with data fields before mounting them into the page.
- If navigation changes via client-side scripts, the old JSON-LD schema tags are found and updated inline to prevent duplicate scripts.

---

## Rules for Future Development

- **Preserve the overall page structure**: The sequence of elements from breadcrumbs down to related rugs should not be modified or reordered.
- **Reuse the same template for all rugs**: Do not build static variants of `rug-detail.html`. All changes must be made within the generic dynamic renderer in [app.js](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/app.js).
- **Avoid page-specific HTML duplication**: Keep formatting templates inside JavaScript renderers and manage structural variations using conditional operators.
- **New features should remain dynamic**: Ensure any new layouts, specifications, or buttons resolve data from the primary `inventory.json` fields.
- **Maintain accessibility**: Keep dynamic landmark attributes (`role`, `aria-*`, `skip-links`) fully functional during template updates.
- **Preserve SEO structure**: Do not alter schema id headers (`ld-product`, `ld-breadcrumb`, `ld-faq`) as they are tracked by scripts for DOM cleanup.
- **Keep the editorial reading experience consistent**: Maintain the light sans-serif body structure, `66ch` max-width constraint, and serif headings in description text renderers.

---

## Version History

### Version 1.0
- **Baseline Release**: Finalized the dynamic product template.
- **Editorial Layout**: Converted product description blocks into a multi-section editorial column.
- **SEO & Accessibility**: Integrated complete JSON-LD structured schemas, aria tags, canonical hooks, and keyword titles.
- **Responsive Layout**: Rebalanced the grid ratio (62% gallery / 38% content) for 100% desktop zooms and smaller screens.
