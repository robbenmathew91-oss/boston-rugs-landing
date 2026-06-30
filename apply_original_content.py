import re

html_path = 'community-impact.html'
css_path = 'styles.css'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Philosophy Section
philosophy_old = r'<p class="section-desc max-w-800" style="margin: 0 auto;">[\s\S]*?</p>'
philosophy_new = """<div class="section-desc max-w-800" style="margin: 0 auto; text-align: left;">
                <p style="margin-bottom: 1.5rem;">Born into the seventh generation of a family of Persian weavers, Mo Nooraee grew up in Isfahan. At the age of seven, he came under the tutelage of a local master weaver. For his first lesson, to little Mo’s surprise, the teacher told his new pupil to search the workshop for all its hidden gems and treasures.</p>
                <p style="margin-bottom: 1.5rem;">After a weary day with fruitless results, the discouraged boy nervously replied that he had found nothing. "The gems and treasures are service, service, service, Mo," replied the master. From that day, service has been the foundation of Mr. Nooraee’s work ethic, and is the principle upon which Noor Oriental Rugs was established.</p>
                <p style="margin-bottom: 1.5rem;">A fine Oriental rug is far more than a decorative floor covering; it can be an evocation of paradise itself. Like the weavers who mindfully tie each knot as they work toward paradise, we too can craft a better world. That is why on the very first day of business in 1979, after having sold his first rug, Mr. Nooraee decided to give away a second.</p>
                <p>Since then, Noor Oriental Rugs has donated hundreds of thousands of dollars’ worth of woven treasures to charitable causes, and we continue our commitment to our community today.</p>
            </div>"""

html = re.sub(philosophy_old, philosophy_new, html, count=1)

# 2. Add FAQ Section before Partners
# Find the Partner section start
partner_section = r'<!-- SECTION 5: Community Partners -->'

faq_section = """<!-- SECTION: Rug Donation Program FAQ -->
    <section class="section section-dark">
        <div class="container reveal">
            <h2 class="section-title text-center">The Rug Donation Program</h2>
            <p class="section-desc max-w-800 text-center" style="margin: 0 auto 3rem auto;">
                Beyond our daily business, we facilitate the donation of fine Oriental rugs to charitable organizations and individuals in need. Here is how our unique program works.
            </p>
            
            <div class="faq-accordion max-w-800" style="margin: 0 auto;">
                <div class="faq-item">
                    <button class="faq-question">How does the rug donation process work?</button>
                    <div class="faq-answer">
                        <p>We work with 501(c)(3) organizations to facilitate donations. A charity may keep the rug for their facilities, or sell it at a fundraising auction. If a charity prefers immediate funds, we may sell the rug on their behalf and forward the net proceeds. Occasionally, we also present rugs directly to families or individuals in need (though direct gifts do not qualify for tax deductions).</p>
                    </div>
                </div>
                <div class="faq-item">
                    <button class="faq-question">Are rug donations tax-deductible?</button>
                    <div class="faq-answer">
                        <p>Yes. If you donate to a qualified 501(c)(3) charitable organization, we can properly and legibly fill out the relevant sections of IRS Form 8283 for you. We collect the required signatures on behalf of the charity and return the form to you for your tax records.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <button class="faq-question">Do I need a certified appraisal?</button>
                    <div class="faq-answer">
                        <p>If the rug you wish to donate is worth less than $500, a certified appraisal is not needed. If it is worth more than $500, the IRS recommends that you obtain a certified appraisal. Mr. Nooraee is a Certified Appraiser specializing in Oriental rugs and can provide official documentation for tax purposes.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <button class="faq-question">How long does the donation process take?</button>
                    <div class="faq-answer">
                        <p>Because each rug requires meticulous care, the full process of donation—including professional cleaning, necessary repair, and final placement—normally takes at least one year.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    """

html = html.replace(partner_section, faq_section + partner_section)

# 3. Update Partners
old_partners = r'<div class="partner-grid">[\s\S]*?</div>\s*</div>\s*</section>'
new_partners = """<div class="partner-grid">
                <div class="partner-card">
                    <img src="images/sufi_service_logo.png" alt="Sufi Service Committee" class="partner-logo">
                    <h3>Sufi Service Committee</h3>
                    <p>Addressing pressing community needs and providing direct aid to individuals.</p>
                </div>
                <div class="partner-card">
                    <img src="images/bay_cove_logo.png" alt="Bay Cove Human Services" class="partner-logo">
                    <h3>Rosie's Place</h3>
                    <p>Providing a safe haven and essential support for women in need.</p>
                </div>
                <div class="partner-card">
                    <img src="images/partner3.svg" alt="YMCA Chinatown" class="partner-logo">
                    <h3>YMCA Chinatown</h3>
                    <p>Supporting local youth, families, and community development programs.</p>
                </div>
                <div class="partner-card">
                    <img src="images/partner4.svg" alt="Pine Street Inn" class="partner-logo">
                    <h3>Pine Street Inn</h3>
                    <p>Partnering to distribute clothing and resources to individuals transitioning from homelessness.</p>
                </div>
            </div>
            <p class="text-center" style="margin-top: 2rem; color: var(--color-text-muted); font-size: 0.95rem;">
                <em>We have also proudly supported the Lovelane Riding Program, Somerville Housing Coalition, Longy School of Music, Heading Home, and St. Cecilia's Church.</em>
            </p>
        </div>
    </section>"""

html = re.sub(old_partners, new_partners, html)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
    
print("Updated community-impact.html")

# 4. Add FAQ CSS to styles.css
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

faq_css = """
/* FAQ Accordion */
.faq-accordion {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.faq-item {
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    overflow: hidden;
}

.faq-question {
    width: 100%;
    text-align: left;
    padding: 1.5rem;
    background: none;
    border: none;
    font-family: 'Cinzel', serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-primary);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s ease;
}

.faq-question:hover {
    background-color: rgba(212, 175, 55, 0.05); /* subtle gold tint */
}

.faq-question::after {
    content: '+';
    font-size: 1.5rem;
    transition: transform 0.3s ease;
}

.faq-question.active::after {
    transform: rotate(45deg);
}

.faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease;
    padding: 0 1.5rem;
    color: var(--color-text-muted);
}

.faq-question.active + .faq-answer {
    max-height: 500px;
    padding-bottom: 1.5rem;
}
"""

if "/* FAQ Accordion */" not in css:
    with open(css_path, 'a', encoding='utf-8') as f:
        f.write(faq_css)
    print("Added FAQ CSS to styles.css")

# Also need to add accordion JS to app.js
app_js_path = 'app.js'
with open(app_js_path, 'r', encoding='utf-8') as f:
    app_js = f.read()

faq_js = """
// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            // Close all others
            faqQuestions.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    otherBtn.classList.remove('active');
                }
            });
            // Toggle current
            btn.classList.toggle('active');
        });
    });
});
"""

if "// FAQ Accordion" not in app_js:
    with open(app_js_path, 'a', encoding='utf-8') as f:
        f.write(faq_js)
    print("Added FAQ JS to app.js")

