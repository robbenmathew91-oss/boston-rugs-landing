"""Write the site's shared structured data (JSON-LD) into the HTML pages.

One business identity is used everywhere: the node with @id
https://noororientalrugs.com/#organization. The homepage keeps the full
version (hours, geo, founder) in its own LocalBusiness block, which carries
the same @id; every other block refers to it by @id instead of repeating a
second, different business.

What this writes, between marker comments in each page's <head>:
  SITE-SCHEMA  every public page: the business node + the WebSite node
  PAGE-SCHEMA  service pages: Service + BreadcrumbList (+ FAQPage from FAQS);
               rugs-for-sale: BreadcrumbList; homepage: the three Services

Blog posts get the SITE-SCHEMA block from build_blog.py, which imports it
from here. Rug detail pages add Product and BreadcrumbList at runtime in
app.js and point the seller at the same @id.

Usage:  python3 make_schema.py      (re-run after changing anything below)
"""
import json
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
SITE = 'https://noororientalrugs.com'
ORG_ID = f'{SITE}/#organization'
WEBSITE_ID = f'{SITE}/#website'

# Business facts: must match the homepage LocalBusiness block and the footer.
ORGANIZATION = {
    '@type': ['Organization', 'LocalBusiness', 'HomeGoodsStore'],
    '@id': ORG_ID,
    'name': 'Noor Oriental Rugs, Inc.',
    'url': f'{SITE}/',
    'image': f'{SITE}/images/showroom.png',
    'telephone': '+1-617-868-6667',
    'email': 'info@noororientalrugs.com',
    'address': {
        '@type': 'PostalAddress',
        'streetAddress': '769 Concord Ave.',
        'addressLocality': 'Cambridge',
        'addressRegion': 'MA',
        'postalCode': '02138',
        'addressCountry': 'US',
    },
    'priceRange': '$$$$',
    'geo': {'@type': 'GeoCoordinates', 'latitude': 42.3907993, 'longitude': -71.1543205},
    'openingHoursSpecification': [
        {'@type': 'OpeningHoursSpecification', 'dayOfWeek': day, 'opens': '08:00', 'closes': '15:00'}
        for day in ('Tuesday', 'Wednesday', 'Friday', 'Saturday')
    ],
    'sameAs': [
        'https://www.facebook.com/noororientalrugs/',
        'https://www.instagram.com/noororientalrugs/',
        'https://www.yelp.com/biz/noor-oriental-rugs-cambridge-2',
        'https://www.bbb.org/us/ma/cambridge/profile/new-carpet/noor-oriental-rugs-inc-0021-22320',
    ],
}

WEBSITE = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    'url': f'{SITE}/',
    'name': 'Noor Oriental Rugs',
    'inLanguage': 'en-US',
    'publisher': {'@id': ORG_ID},
}

# Service areas as listed in the homepage contact section.
AREA_SERVED = [{'@type': 'City', 'name': f'{town}, MA'} for town in
               ('Cambridge', 'Boston', 'Brookline', 'Newton', 'Belmont', 'Lexington', 'Wellesley')]
AREA_SERVED.append({'@type': 'AdministrativeArea', 'name': 'Greater Boston'})

# Descriptions repeat what each service page already says; offers repeat the homepage.
SERVICES = {
    'rug-restoration.html': {
        'name': 'Oriental Rug Restoration & Repair',
        'serviceType': 'Rug restoration and repair',
        'description': 'Museum-quality conservation, fringe repair, pile re-weaving, moth damage restoration, '
                       'and color touch-ups of fine Persian and Oriental rugs.',
        'offer': 'Complimentary virtual estimation and evaluations.',
        'crumb': 'Rug Restoration',
    },
    'rug-cleaning.html': {
        'name': 'Persian & Oriental Rug Cleaning',
        'serviceType': 'Rug cleaning',
        'description': 'A seven-step green cleaning process for Persian and Oriental rugs: thorough dusting, '
                       'color testing and gentle hand washing with biodegradable shampoo, stain treatment, '
                       'deodorizing and disinfecting, cotton foundation treatment, mothproofing, and fiber '
                       'conditioning.',
        'offer': 'Complimentary local pickup and delivery service.',
        'crumb': 'Rug Cleaning',
    },
    'rug-appraisals.html': {
        'name': 'Certified Rug Appraisals & Valuations',
        'serviceType': 'Rug appraisal',
        'description': 'Certified Oriental rug appraisals for insurance, estates, and IRS Form 8283 charitable '
                       'tax deductions by Harvard Law alumnus Mo Nooraee.',
        'offer': None,
        'crumb': 'Rug Appraisals',
    },
}

# FAQ sections shown on the service pages. The visible questions and answers on
# service pages and rugs-for-sale.html use exactly this text: change both together.
# Facts confirmed by Mr. Noor on 2026-11-06 or already stated on the homepage.
FAQS = {
    'rug-cleaning.html': [
        ('How long does Persian rug cleaning take?',
         'Our 7-step cleaning process takes somewhere between 2 and 4 weeks, depending on many factors, '
         'such as the rug\'s size, material type and stains.'),
        ('How often should Persian rugs be cleaned?',
         'Fine handmade Persian and Oriental rugs should be professionally hand washed every 3 to 5 years, '
         'depending on foot traffic, to keep abrasive soil from damaging the foundation fibers.'),
        ('Do you pick up and deliver rugs?',
         'Yes. We offer free pickup and delivery in the Greater Boston area.'),
        ('What does your rug cleaning include?',
         'Seven steps: thorough dusting, color testing and gentle hand washing with biodegradable shampoo, '
         'stain treatment, deodorizing and disinfecting, cotton foundation treatment, mothproofing, and fiber '
         'conditioning.'),
        ('Can you repair damage found during cleaning?',
         'Yes. Worn fringes, moth damage, holes and worn pile can be restored by master weaver Mo Nooraee. '
         'See our rug restoration service.'),
    ],
    'rugs-for-sale.html': [
        ('Do your rugs come with a certificate of authenticity?',
         'Yes. Every rug comes with a certificate of authenticity.'),
        ('How does the lifetime trade-in work?',
         'You can trade in the rug just by paying the price difference of the rugs.'),
        ('Can I try a rug in my home before buying?',
         'Yes. We offer a free 3-day in-home trial, available in all areas.'),
        ('What types of Persian and Oriental rugs do you carry?',
         'Antique, vintage and traditional rugs, including Tabriz, Heriz, Kashan, Nain, Isfahan and Gabbeh rugs, '
         'silk rugs, Kilims, runners and large room-size rugs, and more.'),
        ('Can I see the rugs in person?',
         'Yes. Visit our showroom at 769 Concord Ave, Cambridge, MA, open Tuesday, Wednesday, Friday and '
         'Saturday from 8:00 AM to 3:00 PM.'),
    ],
    'rug-appraisals.html': [
        ('How long does a rug appraisal take?',
         'It usually takes 1 to 2 weeks for us to issue the final appraisal document.'),
        ('How does an Oriental rug appraisal work?',
         'We take pictures and measurements of the rug and prepare a detailed document.'),
        ('What does the appraisal document include?',
         'The appraisal document includes all the detailed specifications of the rug, and its estimated '
         'monetary value.'),
        ('What is a certified rug appraisal used for?',
         'A certified rug appraisal is required for insurance coverage, estate distribution, and tax '
         'deductions on donations over $500 (IRS Form 8283).'),
        ('Can you appraise a rug I want to donate?',
         'Yes. For donated rugs worth more than $500, the IRS requires a certified appraiser to complete '
         'Section III of Form 8283, and Mo Nooraee provides certified appraisals for donors. Read more in '
         'our rug donation guide.'),
    ],
    'rug-restoration.html': [
        ('How much does Oriental rug restoration cost?',
         'The cost of rug restoration is determined by the size of the damaged area, knot density (KPSI), and '
         'the materials required, such as matching handspun wool and organic dyes. Noor provides complimentary '
         'evaluations to establish a precise estimate.'),
        ('How long does rug restoration take?',
         'Depending on the complexity of the re-weaving and matching raw materials, restoration typically takes '
         'anywhere from 4 weeks to several months for extensive, museum-quality conservation.'),
        ('Will the repaired area be visible?',
         'Our restoration follows ten rules so the repair blends in: wool from the same region, hand-spun and '
         'organically dyed, several shades spun together for a patina of age, the same knot as the original '
         'weave (Turkish or Persian), and the same yarn thickness.'),
        ('Are antique rugs worth restoring?',
         'Yes. Antique hand-knotted rugs represent valuable artistic and historical legacies. Restoring them '
         'preserves their structural integrity, aesthetic value, and resale worth.'),
        ('Do you pick up and deliver rugs?',
         'Yes. We offer free pickup and delivery in the Greater Boston area.'),
    ],
}


# Public pages that get the shared block (blog posts get it from build_blog.py).
SITE_PAGES = ['index.html', 'rugs-for-sale.html', 'rug-detail.html', 'rug-cleaning.html',
              'rug-restoration.html', 'rug-appraisals.html', 'gallery.html', 'restoration-gallery.html',
              'community-impact.html', 'blog.html', 'privacy-policy.html']


def script(data, indent='    '):
    body = json.dumps(data, indent=2, ensure_ascii=False)
    body = '\n'.join(indent + line for line in body.splitlines())
    return f'{indent}<script type="application/ld+json">\n{body}\n{indent}</script>'


def site_schema(indent='    '):
    return script({'@context': 'https://schema.org', '@graph': [ORGANIZATION, WEBSITE]}, indent)


def service_node(page, info):
    node = {
        '@type': 'Service',
        '@id': f'{SITE}/{page}#service',
        'name': info['name'],
        'serviceType': info['serviceType'],
        'url': f'{SITE}/{page}',
        'description': info['description'],
        'provider': {'@id': ORG_ID},
        'areaServed': AREA_SERVED,
    }
    if info['offer']:
        node['offers'] = {'@type': 'Offer', 'priceCurrency': 'USD', 'description': info['offer']}
    return node


def breadcrumb(page, name):
    return {
        '@type': 'BreadcrumbList',
        '@id': f'{SITE}/{page}#breadcrumb',
        'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': f'{SITE}/'},
            {'@type': 'ListItem', 'position': 2, 'name': name, 'item': f'{SITE}/{page}'},
        ],
    }


def faq_page(page, pairs):
    return {
        '@type': 'FAQPage',
        '@id': f'{SITE}/{page}#faq',
        'mainEntity': [{'@type': 'Question', 'name': q,
                        'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in pairs],
    }


def page_schema(page):
    if page in SERVICES:
        info = SERVICES[page]
        graph = [service_node(page, info), breadcrumb(page, info['crumb'])]
        if page in FAQS:
            graph.append(faq_page(page, FAQS[page]))
    elif page == 'rugs-for-sale.html':
        graph = [breadcrumb(page, 'Rugs for Sale'), faq_page(page, FAQS[page])]
    elif page == 'index.html':
        graph = [service_node(p, info) for p, info in SERVICES.items()]
    else:
        return None
    return script({'@context': 'https://schema.org', '@graph': graph})


def put_block(html, name, block):
    start = f'<!-- {name}:START (generated by make_schema.py) -->'
    end = f'<!-- {name}:END -->'
    new = f'    {start}\n{block}\n    {end}'
    pattern = re.compile(r'    ' + re.escape(start) + r'.*?' + re.escape(end), re.S)
    if pattern.search(html):
        return pattern.sub(lambda m: new, html)
    # First run: insert just before the Google Analytics tag (end of <head>).
    anchor = '    <!-- Google Analytics -->'
    if anchor not in html:
        anchor = '</head>'
    return html.replace(anchor, new + '\n\n' + anchor, 1)


def main():
    for page in SITE_PAGES:
        path = os.path.join(ROOT, page)
        html = open(path, encoding='utf-8').read()
        html = put_block(html, 'SITE-SCHEMA', site_schema())
        block = page_schema(page)
        if block:
            html = put_block(html, 'PAGE-SCHEMA', block)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
    print(f'Structured data written to {len(SITE_PAGES)} pages. Run build_blog.py to refresh blog posts.')


if __name__ == '__main__':
    main()
