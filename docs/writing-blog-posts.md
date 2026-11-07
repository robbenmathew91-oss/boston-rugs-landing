# Writing a blog post

Every article is one Markdown file in `blog/posts/`. `build_blog.py` turns each file into its own page at `https://noororientalrugs.com/blog/<slug>.html`, adds it to the card list on `blog.html`, and gives it the search-engine extras (title, description, `BlogPosting` and breadcrumb structured data, and `FAQPage` data when the post has an FAQ section).

## Steps

1. Copy `blog/posts/_template.md` to a new file named `NN-your-slug.md`. The number only keeps the folder in order, and the part after it becomes the web address, e.g. `11-how-often-to-clean-a-persian-rug.md` → `/blog/how-often-to-clean-a-persian-rug.html`. Use lowercase words joined by hyphens, and never change a slug once the post is live.
2. Fill in the header and write the article (see below).
3. Put the cover photo in `images/` (a real photo, ideally 1200px wide or more, under about 400KB).
4. Run:

   ```bash
   python3 build_blog.py
   python3 make_sitemap.py
   ```

5. Check the page with the local preview, then commit and push. Vercel publishes it in about a minute.

## Header fields

| Field | Required | What it is |
|---|---|---|
| `title` | yes | The headline shown on the page and the card. |
| `seo_title` | no | The title Google shows (the browser tab). Put the main keyword first and keep it under about 60 characters. Defaults to `title`. |
| `description` | yes | One or two sentences (150–160 characters) shown under the title in Google and on the card. |
| `date` | yes | Publication date, `YYYY-MM-DD`. Cards are sorted newest first. |
| `updated` | no | Date of a later meaningful edit. |
| `category` | yes | For example `Rug Care`, `Buying Guide`, `History & Art`, `Materials`, `Community Impact`. |
| `image` | yes | Cover photo path, e.g. `images/blog_dyes.jpg`. |
| `image_alt` | no | Describes the photo. Defaults to `title`. |
| `author` | no | Defaults to Mohammad (Mo) Nooraee. Use `Noor Oriental Rugs` for articles written for the business rather than by Mo himself. |
| `cta_text`, `cta_link` | no | The main button at the end, e.g. `Book a Rug Cleaning` / `rug-cleaning.html`. |
| `draft` | no | `yes` keeps the post off the site. |

## Markdown that works

```
## Section heading
### Smaller heading

A paragraph. **Bold**, *italic*, and a [link to our cleaning page](rug-cleaning.html).

- bullet
- bullet

1. numbered step
2. numbered step

> A quotation.

![Photo description](images/some-photo.jpg)
```

Link to site pages the same way the site does (`rug-cleaning.html`, `rugs-for-sale.html`, `rug-detail.html?slug=...`). The build adds the leading `/` for you.

**FAQ section:** a `## Frequently Asked Questions` heading followed by `### Question?` headings, each with its answer below, is also sent to Google as FAQ structured data.

## What makes a post rank

- One clear topic per post, matching what people actually search for (see the keyword plan in the SEO report). Put the main phrase in `seo_title`, the first paragraph and one `##` heading.
- Mention the place naturally where it is true: Cambridge, Boston, the Greater Boston towns served.
- 800–1,500 words of genuinely useful, first-hand advice. Mr. Noor's own experience (real cases, real photos of rugs washed or restored in the shop) is what competitors cannot copy.
- Link to the relevant service page and to one or two other posts, and link to the new post from an older related post.
- Only state facts the business can stand behind: prices, guarantees, certifications and claims need the owner's approval.
