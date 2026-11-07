# Security Audit Report — noororientalrugs.com

**Date:** 7 November 2026
**Scope:** The whole repository (`boston-rugs-landing`), the live site https://noororientalrugs.com (Vercel), its DNS (Cloudflare), email-authentication records, the contact form (Formspree), and the subdomain `staging.noororientalrugs.com`.
**Method:** Manual code review of every HTML, JS, JSON, Python and config file; a secrets scan of the working tree and full git history; local exploit tests with a server that sends the same headers as `vercel.json`; non-destructive probes of the live site (HTTP headers, TLS, redirects, sensitive paths). No destructive tests, load tests, account creation or tests against third-party systems were run. No real customer data was touched.

> This report does **not** say the site is "completely secure". It records what was examined, what was found, what was fixed and verified, and what is left. Automated checks were only one part of it.

---

## 1. Overall assessment

The site is a **static website**: plain HTML, CSS and JavaScript served by Vercel. It has **no server code, no database, no user accounts, no login, no API routes, no file uploads and no npm/package dependencies**. That removes most of the usual attack surface (SQL injection, broken auth, IDOR, session theft, SSRF, RCE, dependency CVEs).

The one serious problem in the code was a **DOM-based cross-site scripting (XSS) bug** on the rugs-for-sale page. It was **fixed and verified on the live site**, and a strict Content-Security-Policy now blocks inline scripts as a second layer of defence.

The remaining risks are mostly **outside the code**: email spoofing (no DKIM, DMARC not enforced), an old WordPress staging site still publicly reachable on a subdomain, and some low-priority hardening. These need the owner, the email admin or the former developer, and DNS changes need approval before anyone makes them.

### Overall security status

| | Count |
|---|---|
| Critical vulnerabilities | **0** |
| High vulnerabilities | **1** (fixed) |
| Medium vulnerabilities | **3** (1 fixed, 2 remaining) |
| Low vulnerabilities | **7** (2 fixed, 5 remaining) |
| Informational | 2 |
| **Issues fixed (verified)** | **4** |
| **Issues remaining** | **7** (+2 informational) |

---

## 2. Architecture inspected

| Part | What it is | Public? |
|---|---|---|
| `*.html` (about 20 pages), `blog/*.html` | Static pages | Yes |
| `app.js` | Renders the catalog, rug pages, filters and schema from `inventory.json` in the browser | Yes |
| `blog.js`, `lightbox.js`, `analytics.js` | Blog listing, image lightbox, Google Analytics 4 (G-X26TYP7R4L) events | Yes |
| `inventory.json` | Rug data (written by the site owner, committed to the repo) | Yes |
| `vercel.json` | Redirects (54+), security headers, caching | Config only (returns 404) |
| `*.py` (`make_schema.py`, `build_blog.py`, `make_sitemap.py`, `make_thumbs.py`) | Local build tools, never run on the server | No (`.vercelignore`) |
| `docs/`, `*.md`, `blog/posts/`, `scraped_images/` | Internal notes and sources | No (`.vercelignore`) |
| Contact form | Posts to Formspree (`formspree.io/f/xkjjajzl`), honeypot `_gotcha` | Third party |
| Third-party scripts/styles | Google Tag Manager/GA4, Google Fonts, Font Awesome (cdnjs), Google Maps iframe | Yes |
| Hosting / DNS | Vercel (HTTPS, HSTS, DDoS mitigation); Cloudflare DNS only (grey cloud) | — |

**Not applicable (no such component exists):** authentication, authorization, sessions/JWT, password reset, admin panel, database/RLS, ORM, REST/GraphQL APIs, server functions, file upload, payment processing, CORS-enabled APIs, package dependencies.

---

## 3. Vulnerabilities found

### V-01 — DOM-based XSS in catalog filter chips · **High** · ✅ Fixed and verified

- **File:** `app.js` (active-filter chip rendering, the filter-checkbox selector and the form prefill)
- **Problem:** The `style`, `material` and `collection` URL parameters were inserted into the page with `innerHTML` without escaping.
- **Attack scenario:** An attacker sends someone a link such as `rugs-for-sale.html?style=<img src=x onerror=…>`. When the victim opens it, the attacker's JavaScript runs on noororientalrugs.com. It could rewrite the page (fake phone number or fake "pay a deposit" form), send visitors elsewhere, or tamper with analytics. There are no logins or cookies with secrets to steal, which keeps this from being Critical.
- **Proof (local, before the fix):** the injected handler ran and set `document.body.dataset.xss = "executed"`.
- **Fix:**
  - Chips are now built with `document.createElement` and `textContent`, so the text is shown, never run.
  - The checkbox selector uses `CSS.escape()`.
  - The form prefill no longer calls `decodeURIComponent` twice; that call could throw on bad input.
- **Verification:**
  - **Local:** the payload is shown as plain text and nothing runs. Filters, chips and "Clear all" still work, and all 33 rugs are listed.
  - **Live** (`app.js?v=50`): the payload did not run, the chip shows escaped text, and there were no console errors.

### V-02 — Content-Security-Policy allowed inline scripts · **Medium** · ✅ Fixed and verified

- **File:** `vercel.json` (headers), `app.js`, `gallery.html`
- **Problem:** `script-src` allowed `'unsafe-inline'`, and the site used inline `onerror=` and `onclick=` handlers. Any future HTML-injection bug would therefore become script execution.
- **Fix:**
  - Six inline `onerror` image fallbacks became `data-fallback` attributes, handled by one listener in `app.js`.
  - Two inline `onclick` cards in `gallery.html` became `data-href` with `role="link"` and keyboard support.
  - `script-src` is now `'self' https://*.googletagmanager.com`.
- **Verification:**
  - A deliberately injected inline handler was blocked by the CSP, both locally and on the live site.
  - These still work, with no CSP violations from the site's own code: image fallbacks, the gallery cards, GA4 collect, the Maps embed, the visualizer, the rug gallery, the lightbox, the blog and the contact form.

### V-03 — Email spoofing of @noororientalrugs.com · **Medium** · ⏳ Remaining (needs email admin / approval)

- **Where:** DNS (Cloudflare).
  - DMARC is `p=none`.
  - No DKIM records for Microsoft 365 (`selector1` and `selector2` CNAMEs are missing).
  - SPF ends in `~all` and still includes a legacy `spfc38.carrierzone.com`.
- **Attack scenario:** Anyone can send email that claims to be from `info@noororientalrugs.com`, for example a fake invoice to a customer. Receiving mail servers are told not to reject it.
- **Recommended fix:**
  1. Turn on DKIM in Microsoft 365 Defender and add the two CNAMEs it shows.
  2. Change DMARC to `p=none` with a reporting address and monitor for 2–4 weeks.
  3. Move to `p=quarantine`, then `p=reject`.
  4. Remove the carrierzone include if the old host no longer sends mail.
- **Impact of the change:** If a real sender is missed, its mail could go to spam once DMARC is enforced. That is why monitoring comes first.
- **Not done:** The standing rule is not to touch email DNS records without approval.

### V-04 — Old WordPress staging site publicly reachable · **Medium** · ⏳ Remaining (needs former developer / approval)

- **Where:** `staging.noororientalrugs.com` (A record to 107.20.173.90, proxied).
- **Observed (read-only):** `wp-login.php` returns 200, `readme.html` returns 200, `/wp-json/wp/v2/users` returns 401, and `xmlrpc.php` returns 503. There is no `noindex`.
- **Risk:** An unmaintained WordPress install under the business's domain can be brute-forced or exploited through outdated plugins. If it is taken over, it could serve phishing or malware under a trusted name, and it could also be indexed as duplicate content.
- **Recommended fix:**
  1. Ask James (the former developer, who has a backup) to shut it down or password-protect it.
  2. Then remove the `staging` DNS record in Cloudflare.
- **Not done:** It is a third-party server (no testing beyond reading public pages), and the DNS deletion needs approval.

### V-05 — Font Awesome loaded from a CDN without Subresource Integrity · **Low** · ✅ Fixed and verified

- **Files:** all HTML pages and the `build_blog.py` template.
- **Risk:** If cdnjs were compromised, modified CSS could be served.
- **Fix:** Added an `integrity="sha512-…"` hash that matches cdnjs's published hash, plus `crossorigin="anonymous"`.
- **Verification:** The icons load on the live site and the `integrity` attribute is present.

### V-06 — Unversioned JS files (stale or mixed code after a fix) · **Low** · ✅ Fixed and verified

- **Risk:** Browsers could keep an old, vulnerable `app.js` after a fix.
- **Fix:** `app.js?v=50`, `lightbox.js?v=2` and `blog.js?v=2` on every page.
- **Verification:** The live pages load v=50.

### V-07 — Contact form spam protection is a honeypot only · **Low** · ⏳ Remaining

- **Where:** the contact form posting to Formspree.
- **Risk:** Bots can flood the owner's inbox or use up the Formspree quota. This does not expose data.
- **Recommended fix:** Turn on Formspree's built-in spam filtering or reCAPTCHA in the owner's Formspree dashboard. If reCAPTCHA is added, its domains must be added to the CSP.

### V-08 — Inventory fields inserted with `innerHTML` · **Low** · ⏳ Remaining (accepted risk)

- **File:** `app.js` (catalog cards and rug detail).
- **Risk:** Only the site owner can edit `inventory.json`, through the git repo, so it is trusted data today. If inventory ever came from a form, a spreadsheet import or a CMS, this would become XSS. The strict CSP now limits the damage.
- **Recommended fix:** Escape text fields with a small `escapeHTML()` helper if the data source ever changes.

### V-09 — No CAA record and no DNSSEC · **Low** · ⏳ Remaining (needs approval)

- **Risk:** Any certificate authority could issue a certificate for the domain, and DNS answers are not signed.
- **Recommended fix:**
  - Add CAA records for `letsencrypt.org`, which Vercel uses today, and any CA Microsoft or Cloudflare needs.
  - Enable DNSSEC in Cloudflare and add the DS record at the registrar.
- **Impact of the change:** A CAA record that is wrong can block certificate renewal, so check it carefully.

### V-10 — Experimental pages publicly reachable · **Low** · ⏳ Remaining

- **Files:** `index-warm.html`, `rug-detail-warm.html` (already `noindex`).
- **Recommended fix:** Delete them or add them to `.vercelignore` once nobody needs them for review.

### V-11 — `style-src 'unsafe-inline'` · **Low** · ⏳ Remaining

- **Where:** CSP in `vercel.json`. Many pages use inline `style=""` attributes.
- **Risk:** It allows CSS injection, which is far less dangerous than script injection.
- **Recommended fix:** Move inline styles into `styles.css` over time, then remove `'unsafe-inline'` from `style-src`.

### Informational

- **I-01 Vercel Bot Protection is off.**
  - DDoS mitigation is active and challenged the auditor's own IP during probing.
  - Bot Protection can be turned on in Vercel → Firewall if spam or scraping becomes a problem.
- **I-02 HSTS has no `includeSubDomains` or `preload`.**
  - HSTS is sent with a two-year max-age.
  - `includeSubDomains` should wait until V-04 is resolved and every subdomain serves HTTPS.

---

## 4. Checks that passed

| Area | Result |
|---|---|
| Secrets in code | No API keys, passwords, tokens or private keys in the working tree or the full git history. The GA4 measurement ID and Formspree form ID are public by design. |
| Sensitive files | `/.git/`, `/.env`, `/vercel.json`, `/docs/`, `/*.py`, `/*.md` and `/blog/posts/` all return 404 on the live site. |
| HTTPS | HTTP → HTTPS 308 redirect; HSTS (max-age 63072000); TLS 1.2 and 1.3 only; valid Let's Encrypt certificate (expires Feb 2027). |
| Security headers | CSP, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN` plus `frame-ancestors 'self'` (clickjacking), `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera, microphone, geolocation, payment and usb off). |
| CORS | No `Access-Control-Allow-Origin` headers; nothing to abuse. |
| Open redirects | All redirects are fixed paths in `vercel.json`; no redirect takes a URL from user input. |
| Browser storage | No passwords, tokens or personal data in localStorage, sessionStorage or cookies (only GA's own cookies). |
| Third-party scripts | Only Google Tag Manager/GA4 may run script (allow-listed in the CSP). Font Awesome is pinned with SRI. Google Fonts serves CSS only. |
| Contact form | HTTPS POST to Formspree; `form-action` in the CSP limits where forms may post; honeypot field present. |
| Dependencies | No `package.json` or lock file, so no npm supply chain. The Python build scripts use the standard library and run only on the developer's Mac. |
| Hosting | Vercel DDoS mitigation active; deploys only from the `main` branch on GitHub. |

---

## 5. Production recommendations (in priority order)

1. **Email:** turn on DKIM in Microsoft 365, then DMARC monitoring, then enforcement (V-03).
2. **Staging site:** have James take down `staging.noororientalrugs.com`, then delete its DNS record (V-04).
3. **Accounts:**
   - Turn on two-factor authentication for every account that controls the site: GitHub, Vercel, Cloudflare, the domain registrar, Microsoft 365, Google (Analytics, Search Console, Business Profile) and Formspree.
   - Remove access for people who no longer need it.
   - *This is the most likely real-world way a small business site is hijacked.*
4. **Formspree:** enable spam filtering or reCAPTCHA (V-07).
5. **DNS hardening:** CAA and DNSSEC (V-09), after the email work is settled.
6. **GitHub:** protect the `main` branch (no force-push) and keep the repo private, since anyone who can push to `main` can change the live site.
7. **Future development rules:**
   - Never use inline `onclick` or `onerror` handlers or inline `<script>` blocks other than JSON-LD; the CSP will block them.
   - Insert any URL or user-supplied text with `textContent`.
   - Add any new outside service to the CSP and test it locally first.
   - Bump `?v=` after every JS change.

---

## 6. Changes made during this audit

| Commit | Change |
|---|---|
| `7edd8c6` | Added the CSP and security headers in `vercel.json`, plus 30-day image caching and 7-day CSS/JS caching |
| `2e6bfb0` | Fixed the DOM XSS in `app.js`; removed every inline event handler (`app.js`, `gallery.html`); removed `'unsafe-inline'` from `script-src`; added SRI to Font Awesome on all pages and in `build_blog.py`; versioned the JS files |

Every fix was tested locally with the production headers before publishing, then re-checked on the live site:

- catalog, filters and Clear all
- rug pages, thumbnails and lightbox
- room visualizer
- Google Map
- GA4
- fonts and icons
- gallery cards
- blog
- contact form

No functionality was removed. Rollback is `git revert 2e6bfb0`.
