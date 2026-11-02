# Moving noororientalrugs.com to this site

**Status (2026-11-01):** noororientalrugs.com still serves the old WordPress site (behind Cloudflare). This site runs on Vercel at boston-rugs-landing.vercel.app. Everything here is already prepared for the switch:

- Every page's canonical, `og:url` and structured-data URL uses `https://noororientalrugs.com` (`SITE_ORIGIN` in app.js).
- `sitemap.xml` and `robots.txt` list the noororientalrugs.com addresses (`python3 make_sitemap.py` rebuilds them).
- `vercel.json` holds 54 permanent redirects from the old WordPress addresses (pages, blog posts, shop, product categories) to the new pages, so Google rankings carry over.

Until the switch, Google is told the real address is noororientalrugs.com, so it will not index the Vercel address. That is intended.

## Before the switch

1. **Back up the old WordPress site:** a full export, plus a copy of the files and database from the hosting company. Keep the hosting for about a month after the switch.
2. **Check email first.** If the business email is @noororientalrugs.com, note the current **MX and TXT records** in Cloudflare. They must stay exactly as they are.
3. **Note anything the old site does that the new one does not:** online shop and checkout, customer accounts, contact-form destinations. Old shop orders and accounts will no longer be reachable after the switch.
4. **Optional:** lower the TTL of the DNS records being changed (to 5 minutes) a day before, so the switch is quick to undo.

## The switch (about 30 minutes, plus DNS time)

1. **Vercel:** Project boston-rugs-landing → Settings → Domains. Add `noororientalrugs.com` and `www.noororientalrugs.com`, and set **www to redirect to noororientalrugs.com** (the canonical address has no www).
2. **Cloudflare DNS** for noororientalrugs.com: use the values Vercel shows on the Domains page. Typically:
   - `A` record, name `@` → Vercel's IP (shown in Vercel, e.g. `76.76.21.21`)
   - `CNAME` record, name `www` → `cname.vercel-dns.com`
   - Proxy status **DNS only** (grey cloud), as Vercel recommends.
   - Delete only the old `A`/`CNAME` records for `@` and `www` that point to the WordPress host. **Do not touch MX, TXT or other records.**
3. Wait until Vercel shows the domain as **Valid** with an SSL certificate (minutes to a few hours).

## After the switch

1. **Check on the real domain:**
   - `https://noororientalrugs.com/` and `/rugs-for-sale.html` load the new site.
   - A rug page loads, e.g. `/rug-detail.html?slug=persian-tabriz-rug-9-2x12-1`.
   - Old addresses redirect: `/contact-us/`, `/shop/`, `/dyes/`, `/product/royal-bokhara-4-2-x-5-11/`.
   - `/sitemap.xml` and `/robots.txt` load.
   - `www.noororientalrugs.com` redirects to `noororientalrugs.com`.
   - Email still sends and receives.
2. **Google Search Console** (business Google account): add a **Domain property** for noororientalrugs.com (verified with a TXT record in Cloudflare). Submit `https://noororientalrugs.com/sitemap.xml`. Use **URL Inspection** on two or three rug pages and check that the rendered page shows the rug's name and price.
3. **Google Business Profile, social profiles, Giftly and similar listings:** make sure the website link is `https://noororientalrugs.com`.
4. After one to two weeks, check Search Console's **Pages** report for errors and for old addresses without a redirect. Add any missing ones to `vercel.json`.

## Undo

Put the old Cloudflare `A`/`CNAME` records for `@` and `www` back. The WordPress site returns as soon as DNS updates.
