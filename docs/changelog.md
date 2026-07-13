# Changelog — Noor Oriental Rugs

This document contains a historical log of all modifications, visual polishes, and conversions performed on the Chanakaleh detail page catalog template.

---

## [1.2.0] — 2026-07-13

### Added
* **Dynamic Related Rugs Section**: Created a dynamic visual cards deck in `app.js` that pulls 3 matching rugs by style/collection from the active inventory database.
* **Storytelling Segment ("The Story Behind This Rug")**: Created an editorial story box that pulls historical context dynamically from the JSON database. Included a gold italic pull quote and diamond divider motifs.
* **Secondary CTAs**: Added secondary communication links ("Call Store" and "Request a Video Tour") with FontAwesome support.
* **Redesigned Showroom Card**: Integrated a luxury, gold-accented invitations card promoting the Boston showroom in Cambridge, MA.
* **Trust Footer Section**: Placed 4 social proof icons (*Individually Inspected*, *Washed & Restored*, *One of a Kind*, *Expert Consultation*) above the page footer.
* **Internal Linking Block**: Appended links pointing to cleaning, restoration, and appraisal departments.

---

## [1.1.0] — 2026-07-13

### Added
* **"Rug at a Glance" Quick-Badges Grid**: Created a 4-card header panel summarizing origin, material, weave type, and condition at the top of the details sheet.
* **"Why Buy This Rug" Checklist**: Inserted a checkmarked grid detailing artisans knots, natural wools, organic washing, and ready-to-ship features.
* **Markdown Description Parsing**: Programmed a helper in `app.js` to render Markdown headers (`###`) dynamically as elegant text sub-blocks accented with left-hand gold border lines.

### Fixed
* **Specs Box Equal Heights**: Resolved unequal column alignments in the specs grid using CSS Grid auto-fitting flexboxes.

---

## [1.0.0] — 2026-07-13

### Added
* **Dynamic Image Gallery Layout**: Resolved overlapping thumbnail issues by positioning thumbs horizontally below the primary zoom hero image. Added gold active-state borders.
* **Administrative File Separation**: Added keyword filtering to prevent administrative tag photos (orange tags, labels) from appearing inside customer-facing display grids.
* **Structured metadata**: Integrated canonical parameters and OG/Twitter headers into headers dynamically.
