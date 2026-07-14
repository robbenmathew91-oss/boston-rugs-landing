# Noor Oriental Rugs Content Guide

## Purpose
This document serves as the official content writing guide for all future rug assets added to the Noor Oriental Rugs portfolio. It outlines the style, formatting structure, search engine optimization (SEO) rules, and database schema structures necessary to maintain a unified, high-end editorial identity across the site.

---

## Required Product Sections

To ensure a cohesive interface across all items, each product page must render its content in the following strict hierarchy:

1. **Product Title** — Playfair Display heading showing style, origin, and design type.
2. **Price** — Clean numeric formatting in USD.
3. **Product Highlights** — Single sentence summarizing character (e.g. "An authentic Anatolian hand-knotted masterpiece...").
4. **Quick Specifications** — High-level card panel showing ID, origin, size, and condition.
5. **Editorial Description** — Deep-dive informational sections parsed from markdown.
6. **Story Behind This Rug** — Historical context and regional storytelling.
7. **Specifications** — Grid layout of technical specs.
8. **Acquire This Rug** — Primary purchase and specialist booking CTAs.
9. **Purchase With Confidence** — Craftsmanship trust grid (four standard cards).
10. **FAQ** — Accordion-style details panel.
11. **Related Rugs** — Dynamic recommendations.

This structural sequence is coded into the page template and must remain consistent.

---

## Editorial Description Guidelines

The Editorial Description section should read like a premium gallery essay rather than a standard retail spec sheet. Writers must adhere to these guidelines:

- **Markdown-Driven Structure**: Utilize standard `### Heading` markers to define sections.
- **Narrative Style**: Use full, rich paragraphs. Avoid lists, bullets, or fragmented phrases within the description.
- **Key Themes**: Focus on historical heritage, design symbols, dye construction, professional restoration details, and recommendations for home placement.
- **Organic Reading**: Avoid repeating keywords simply for search engine ranking. Write naturally to explain what makes the piece valuable.
- **Formatting Constraints**: Never use `##` or `####` styling in the description text. Stick exclusively to single `### Heading` markers followed by a paragraph.

---

## Story Behind This Rug

The Story section provides emotional and historical resonance to the rug. Rather than repeating facts from the specifications or description, it should focus on the following:

- **Regional History**: The historical background of the weaver's region (e.g., northwestern Anatolia, high Caucasus, Tabriz urban workshops).
- **Symbolism**: The meaning behind specific motifs (e.g., mihrab arches, stylized birds, geometric amulets).
- **Artisan Techniques**: Local weaving traditions, such as double-knotting or specific wool-washing practices.
- **Cultural Significance**: The legacy of rural or nomadic village weavers.

If a rug lacks documented regional narratives, this optional field can be omitted, and the template will collapse the section gracefully.

---

## SEO Writing Rules

Ensure every product page meets strict SEO standards without degrading the luxury reading experience:

- **Dynamic Titles**: Do not hardcode titles. Let the template generate titles matching the format: `"{Name} | Handmade {Origin} {Style} Rug | Noor Oriental Rugs"`.
- **Meta Descriptions**: Write descriptions between 140–160 characters. Incorporate keywords (e.g., *handmade*, *oriental rug*, *one of a kind*, *wool*) naturally.
- **Alt Text Generation**: Image tags must describe the product specifically using its name, material, origin, and color palette.
- **Internal Linking**: Ensure relative paths connect to internal landing pages (such as collection pages and cleaning/restoration services) rather than orphan pages.

---

## inventory.json Standards

All rug content is loaded dynamically from [inventory.json](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/inventory.json). All data must fit the specifications below:

| Field Key | Category | Expected Format | Purpose |
|---|---|---|---|
| `id` | Required | Number | Unique database identifier. |
| `inventory_id` | Required | String (`"NOR-XXXX"`) | Store SKU tag. |
| `slug` | Required | String | URL identifier (e.g. `"vintage-turkish-chanakaleh"`). |
| `name` | Required | String | Display name of the rug. |
| `style` | Required | String | Category: `"Traditional"`, `"Contemporary"`, or `"Vintage"`. |
| `origin` | Required | String | Weaving origin city/country (e.g. `"Tabriz, Persia"`). |
| `material` | Required | String | Fiber content details (e.g. `"100% Organic Wool"`). |
| `size` | Required | String | Dimensions in feet (e.g. `"2'10\" x 4'1\""`). |
| `age` | Required | String | Age estimate (e.g. `"Vintage (approx. 40 years)"`). |
| `condition` | Required | String | Structural status (e.g. `"Excellent / Professionally Restored"`). |
| `price` | Required | Number | Numeric retail price in USD. |
| `availability` | Required | String | Stock state: `"In Stock"`, `"Reserved"`, or `"Sold"`. |
| `collection` | Required | String | Name of the curated catalog (e.g. `"Beacon Hill Collection"`). |
| `tags` | Required | Array of Strings | Search keywords. |
| `specifications` | Required | Object | Technical keys: `knotDensity`, `pileHeight`, `dyes`, `foundation`. |
| `images` | Required | Array of Objects | List of images containing `file`, `alt`, and `order`. |
| `seo` | Required | Object | Meta data keys: `title` and `description`. |
| `description` | Required | String | Editorial details parsed with `### Heading` sections. |
| `story` | Optional | String | Narrative text about regional weaving culture. |

---

## Markdown Formatting Rules

The `description` text block in `inventory.json` must follow this exact markdown standard to ensure headers and text wrap correctly in the DOM:

```markdown
### Overview
Paragraph detailing the main product highlights...

### Design & Motifs
Paragraph detailing the design elements, border bands, and geometric profiles...

### Materials & Construction
Paragraph detailing the foundation fibers, dye methods, and texture...

### Restoration & Condition
Paragraph detailing cleaning, edge repair, and binding stabilization...
```

*Note: Use single `\n\n` separators between the heading/paragraph blocks. Do not use markdown horizontal lines (`---`) or bullet points.*

---

## Tone of Voice

### Core Brand Values
- **Luxury**: Understated, premium, and sophisticated.
- **Educational**: Focuses on historical weaving facts, regional geography, and material science.
- **Authentic**: Direct and transparent about age, condition, and restoration.
- **Timeless**: Refined vocabulary that respects the historic legacy of the textiles.

### Phrases and Formats to Avoid
- **Sales Hype**: Do not use "Buy now!", "Huge discount!", "Limited time offer!", or "Cheap price".
- **Hype Formatting**: Never use ALL CAPS, exclamation points, or emojis in product descriptions.
- **Artificial Scarcity**: Do not invent fake inventory counts. Let the natural one-of-a-kind status communicate value.

---

## Image Guidelines

To maintain consistent presentation in the product gallery, upload photos matching the following sequence:

1. **Full Layout** — Top-down flat layout showing the entire rectangular shape and fringes.
2. **Angled View** — Dynamic corner perspective showing depth.
3. **Medallion Detail** — Close-up showing details of the central motif.
4. **Border Detail** — Close-up highlighting border bands and symmetry.
5. **Weave Detail** — Macro shot showing individual knot structure.
6. **Fringe Detail** — Close-up showing flat-weave ends and bindings.
7. **Back Structure** — High-resolution shot of the rug's underside showing weave pattern.

### Image Filenames
Name all image files using lowercase characters and underscores:
`[slug]_[view_type].jpg` (e.g. `chanakaleh_fringe.jpg`).

---

## Quality Checklist

Before adding a new rug to `inventory.json`, verify:

- [ ] All required schema fields are populated.
- [ ] No HTML tags exist in the description or story properties.
- [ ] Description headings utilize exactly `### ` syntax.
- [ ] Spec names match camelCase keys.
- [ ] Dynamic SEO metadata title matches the character limits (< 60 chars).
- [ ] Images are optimized (under 400KB) and have descriptive alt text tags.
- [ ] Relative URL paths inside links are checked and valid.

---

## Future Content Rules

All new product content must conform to this guide. For design framework rules or code configurations, refer directly to [product-template.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/product-template.md) and [decisions.md](file:///c:/Users/Robbe/.gemini/antigravity/scratch/boston-rugs-landing/docs/decisions.md).
