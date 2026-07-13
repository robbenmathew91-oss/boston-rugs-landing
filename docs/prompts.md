# AI Prompt Reference — Noor Oriental Rugs

This document contains specialized prompt templates for AI assistants when scaling or troubleshooting the Noor Oriental Rugs catalog.

---

## 1. Prompt Template: Adding a New Rug
Use this template to add a new inventory item to `inventory.json` while maintaining standard styles:

```
Please add a new rug to inventory.json:
- Assign a unique ID, slug, and core properties.
- Organize description segments using Markdown headers:
  ### Overview
  ### Design & Motifs
  ### Materials & Construction
  ### Restoration & Condition
  ### Ideal Placement
  ### Why This Rug is Special
- Add a "story" attribute with historical context, dividing it into:
  ### The [Origin/Style] Weaving Tradition
  ### Symbolism & Materials
  ### Restoration & Heritage Preservation
- Ensure all subheading/paragraph divisions use double newlines (\n\n) so the HTML dynamic parser parses and splits them cleanly.
```

---

## 2. Prompt Template: Adjusting Image Rules
Use this template to add new photographs or change search exclusions for paperwork/documentation:

```
I have added new photographs for [slug]. Please:
1. Match the names and add them to the images array in inventory.json.
2. Ensure the order matches: hero flat-lay, alternate view, corner fold, border closeup, backing/weave, and thickness profile.
3. If there are label/tag images, name them containing 'label', 'tag', or 'document' so they are automatically routed by app.js to the Inventory Documentation panel rather than the user gallery.
```

---

## 3. Prompt Template: Modifying Theme Styles
Use this template to apply style modifications without breaking the luxury brand aesthetic:

```
Please adjust [CSS element/class] in styles.css:
- Respect the brand guidelines: dark theme slate (#0a0a0a), premium gold (#d4af37), and off-white read texts.
- Do not use Tailwind utility classes or introduce third-party compilers.
- Ensure all grid boxes maintain equal-height parameters by setting column flex flows and height: 100%.
- Remember to increment the styles cache-buster query parameter (styles.css?v=1.0.X) inside rug-detail.html after applying changes.
```
