# Product Page Template Documentation

This document defines the architecture, design principles, markup structure, and development rules for the production-ready rug detail page template at Noor Oriental Rugs.

---

## Product Page Overview

The Noor Oriental Rugs product page is designed to emulate a premium, editorial reading experience reminiscent of top-tier luxury brands, art galleries, and auction houses (such as RH, 1stDibs, Sotheby's, and Christie's). 

Rather than utilizing a standard transactional e-commerce layout, the page presents each rug as a unique work of art with its own history, craftsmanship details, and character. To maintain scalability and clean architecture, the entire page is driven dynamically from a single template utilizing [inventory.json](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/inventory.json) as the single source of truth.

---

## Page Structure

The product page renders its sections in the following strict vertical sequence:

1. **Breadcrumb navigation** — Visible path indicating origin-based categorization.
2. **Product gallery** — Multi-image layout with smooth transitions, zoom capability, and thumbnail list.
3. **Product title** — High-contrast Playfair Display heading.
4. **Price** — Elegant price display.
5. **One-of-a-Kind badge** — "Unique" scarcity badge.
6. **Metadata / Quick Glance cards** — Clean status list containing ID, origin, size, and condition.
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

## Gallery System & Image Standards

The gallery system is optimized for high-resolution images, loading speed, and responsive display:

- **Main Image**: Encased in `.rug-detail-image-wrapper` with a custom loading spinner overlaying the transition.
- **Thumbnail Gallery**: Rendered dynamically from the rug's image array (excluding tags and document images marked with tag/label keywords).
- **Active Thumbnail Behavior**: Clicking a thumbnail updates the main image source, applies a `.active` border styling to the thumbnail button, and updates the image counter.
- **Image Counter**: Overlay stating `"Image X of Y"` positioned in the bottom-right corner of the image stage.
- **Gallery Ordering Standards**:
  1. **Hero View** (Full layout overhead flat-lay against plain background)
  2. **Angled Floor Views** (Overall proportions and border depth context)
  3. **Detail/Macro Views** (Close-up of patterns, medallions, and weave knots)
  4. **Corner Folds** (Shows pile depth, backing pattern, and thickness)
  5. **Back View** (Knot structure and foundation)
  6. **Pile Profile** (Macro side-profile of the pile edge and selvedge)
  7. **Fringe Detail** (Detailed fringe pattern and border adjoining)
- **Image Naming Conventions**:
  All files must use lowercase and underscores to remain web-safe:
  `[inventory_id_without_prefix]-[name-slug]-[view_type].jpg` (e.g. `303-yagcibedir-rug-hero.jpg`).

---

## Product Summary & Quick Glance Cards

The top-of-page summary provides key signals to visitors at a glance:

- **Breadcrumbs**: Home › Rugs for Sale › [Origin] Rugs › [Rug Name]. Built dynamically using URL query parameters.
- **Scarcity Badge**: Subtle gold outline badge showcasing a gem icon and text: `Unique`.
- **Quick Glance Cards**: Compact four-column grid showing Inventory ID, Origin, Size, and Condition.
  - **Alignment**: Items inside `.rug-glance-card` are aligned to the top (`align-items: flex-start !important`) on all viewports, ensuring a balanced look when metadata text wraps to multiple lines.
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

- **Typography System & Refinements**: 
  - **Serif Headings**: Playfair Display, 1.15rem, weight 600, color full white.
  - **Sans-serif Body**: Outfit, 0.94rem, weight 300, line-height 1.95, maximum reading measure limited to `66ch`.
  - **Alignment**: Editorial paragraphs are left-aligned (`text-align: left`) to avoid wide word gaps ("rivers of white") introduced by justified text at narrow measures.
  - **Gold Accent**: Left-aligned 2px vertical accent bar with a gradient fading from top solid gold to bottom transparent.

---

## Story Section

- **Purpose**: Provides deep narrative context about the cultural weaving lineage of the rug's home region.
- **Quote Block**: Centered italic block featuring large elegant quotation marks (`&ldquo;` / `&rdquo;`) in a warm primary gold color, serving as a visual focal point.
- **Storytelling text**: Styled with comfortable line height and paragraph breaks.
- **Optional rendering**: Only renders if the `story` property is populated in `inventory.json`.

---

## Specifications

- **Grid Layout**: Auto-fitting multi-column grid (`.rug-detail-specs-grid`).
- **Equal Card Heights**: Maintained within each grid row via `align-items: stretch` on the parent grid.
- **Layout & Alignment**:
  - Vertical alignment is top-anchored (`justify-content: flex-start`) so that all cards start labels at the exact same vertical offset.
  - Sizing is consistent; cards with shorter values (e.g. Age, Size) do not center vertically, maintaining empty space below the value.
  - **Padding**: Reduced top padding inside `.rug-detail-spec-box` to `0.75rem` (12px) for increased visual density, while keeping side/bottom padding at `1.25rem` (20px).
- **Dynamic Fields**: Converts camelCase keys (e.g., `knotDensity`, `pileHeight`, `professionallyWashed`) to capitalized, human-readable titles dynamically.

---

## Trust & Purchase With Confidence Section

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
- **CTA Responsive Behavior**: Buttons resize cleanly and wrap text correctly on small screens (using `white-space: normal !important` and reduced horizontal padding on screens `<= 768px`) to prevent visual overflow.

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

## Dynamic SEO & Metadata

The template contains complete technical SEO and accessibility optimizations:

- **Product Schema**: Injects `@type: Product` JSON-LD containing name, SKU, price, brand, material, origin, and conditions.
- **Breadcrumb Schema**: Injects `BreadcrumbList` JSON-LD mirroring the visible navigation structure.
- **FAQ Schema**: Injects `FAQPage` JSON-LD containing questions and answers rendered on the page.
- **Meta Title**: Generated dynamically as `"{Name} | Handmade {Origin} {Style} Rug | Noor Oriental Rugs"`.
- **Meta Description**: Curated dynamic string within 140–160 characters.
- **Canonical URL**: Dynamic tag reflecting the clean page URL.
- **Open Graph / Twitter Cards**: Injects metadata including `og:title`, `og:description`, `og:image`, and `twitter:card`.
- **Image ALT Text**: Dynamically builds description strings for all gallery assets.

---

## Accessibility & Responsive Mobile Optimization

- **Semantic HTML**: Structural elements use `<main>`, `<article>`, `<nav>`, `<aside>`, and `<header>` tags with correct `h1`-`h6` hierarchy.
- **Accessibility**: Includes a hidden "Skip to content" link, `aria-live` blocks, `aria-expanded` states, and ARIA labels.
- **Responsive Mobile Layouts**:
  - **Specification Cards Layout**: For screen widths `<= 480px`, cards arrange in 2 columns (symmetrically spanning the 5th card full-width) and collapse to 1 column for screens `<= 360px` to prevent text wrapping on long tags (e.g. `Less than 50 Years Old`, `Professionally Restored`).
  - **CTA Buttons Overflow Prevention**: For screens `<= 768px`, buttons use `white-space: normal !important` and tailored horizontal padding/letter-spacing, forcing text inside container bounds with centered layouts on all devices.

---

## Responsive Testing Standards

All product template renders must undergo verification across the following standard viewport breakpoints:
- **320px** — Small mobile (iPhone SE)
- **360px / 375px / 390px / 430px** — Standard modern mobile screens
- **768px** — Tablet/iPad breakpoints
- **1280px+** — Desktop viewports

*Validation Criteria*: Zero horizontal overflow scrollbars, typography wraps legibly, buttons remain bound inside their parents, and layout respects the 62% gallery / 38% content desktop grid proportion.

## Canonical Product Page

The approved reference implementation is:

rug-detail.html?slug=antique-turkmen-gul-rug-11117

Before modifying the product template, compare any proposed changes against this page.

Future rug pages should match this implementation in design, layout, spacing, typography, behavior, accessibility, and responsiveness.

---

## Product Import Workflow

When adding a new rug to the website, follow this established quality assurance workflow:

1. **Rename images**: Name files in lowercase and underscores: `[inventory_id]-[slug]-[view_type].jpg` (e.g., `303-yagcibedir-rug-hero.jpg`).
2. **Compress images**: Optimize high-resolution assets for the web (target under 400KB per file).
3. **Generate rug-information.md**: Create the source content file containing editorial descriptions, technical specifications, and SEO metadata.
4. **Import into Antigravity**: Load/copy the assets into the local repository environment.
5. **Update inventory.json**: Insert the new product entry at the end of the array, ensuring all fields are populated.
6. **Validate gallery**: Launch the local server and verify that thumbnails, counters, and main image swaps function correctly.
7. **Validate SEO**: Verify meta titles, meta descriptions, and injected JSON-LD schema blocks in the head.
8. **Validate responsive layout**: Test the viewport breakpoints from 320px to desktop.
9. **Compare against the canonical product page**: Check design spacing, typography, and card alignment against the Turkmen rug reference.
10. **Final QA**: Check browser console logs for JavaScript errors.
11. **Commit**: Save and commit verified database changes to the repository.

---

## Version History

### Version 1.1 (Current)
- **Canonical Product Page**: Established the Turkmen Tribal Gul Rug (NOR-11117) as the production reference.
- **Specification Card Alignment**: Top-anchored content alignment and reduced top card padding to `0.75rem`.
- **Mobile Grid Optimization**: Implemented responsive column folding for specification cards on screens under 480px.
- **CTA Overflow Prevention**: Added multi-line button wrapping overrides for small mobile screens.
- **Typography Alignment**: Confirmed left-aligned text standard for narrow editorial columns.
- **Production Validation**: Successfully validated template architecture through multiple rug imports.

### Version 1.0
- **Baseline Release**: Finalized the dynamic product template.
- **Editorial Layout**: Converted product description blocks into a multi-section editorial column.
- **SEO & Accessibility**: Integrated complete JSON-LD structured schemas, aria tags, canonical hooks, and keyword titles.
- **Responsive Layout**: Rebalanced the grid ratio (62% gallery / 38% content) for 100% desktop zooms and smaller screens.
