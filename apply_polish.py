import re

with open('community-impact.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Image Polish (Alt text, Lazy Loading)
# Instead of generic "Community placeholder", we'll give them better alt texts and add loading="lazy"
html = html.replace('alt="Community placeholder"', 'alt="Noor Oriental Rugs community outreach event" loading="lazy"')
html = html.replace('alt="Volunteers sorting"', 'alt="Volunteers sorting and organizing donated clothing" loading="lazy"')
html = html.replace('alt="Teamwork"', 'alt="Volunteers working together with teamwork" loading="lazy"')
html = html.replace('alt="Shared Meal"', 'alt="Volunteers gathering to share a meal" loading="lazy"')
html = html.replace('alt="Community Gathering"', 'alt="A large community gathering" loading="lazy"')
html = html.replace('alt="Clothing Donation Program"', 'alt="The free clothing donation program shelves" loading="lazy"')
html = html.replace('alt="Outdoor Donation Box"', 'alt="Outdoor clothing donation box" loading="lazy"')

# Ensure no duplicate loading="lazy" if run multiple times
html = html.replace('loading="lazy" loading="lazy"', 'loading="lazy"')

# 2. Update Calls to Action in Section 8
html = html.replace('<a href="contact.html?subject=Volunteer" class="btn btn-outline">Volunteer</a>', '<a href="contact.html?subject=Volunteer" class="btn btn-outline">Volunteer With Us</a>')
html = html.replace('<a href="contact.html?subject=Request+Pickup" class="btn btn-outline">Request Pickup</a>', '<a href="contact.html?subject=Request+Pickup" class="btn btn-outline">Contact Our Team</a>')
html = html.replace('<a href="contact.html" class="btn btn-outline">Contact Us</a>', '<a href="rug-cleaning.html" class="btn btn-outline">Learn More About Our Services</a>')

# 3. Enhance Text and add Contextual Links
# Philosophy Section
old_philosophy = """"We don't just sell rugs. People trust local businesses, and love creates trust. We believe that a business should benefit everyone in its neighborhood. People come before profit—that is the foundation of everything we do."
                    <br><br>
                    <strong style="color: var(--color-primary); font-family: var(--font-heading); font-size: 1.2rem;">Mo Nooraee</strong>"""

new_philosophy = """"We don't just sell rugs. People trust local businesses, and love creates trust. We believe that a business should benefit everyone in its neighborhood. People come before profit—that is the foundation of everything we do. Whether we are providing expert <a href="rug-cleaning.html" style="color: var(--color-primary); text-decoration: underline;">rug cleaning</a> or full <a href="rug-restoration.html" style="color: var(--color-primary); text-decoration: underline;">rug restoration</a>, our commitment to care extends far beyond the showroom."
                    <br><br>
                    <strong style="color: var(--color-primary); font-family: var(--font-heading); font-size: 1.2rem;">Mo Nooraee</strong>"""
html = html.replace(old_philosophy, new_philosophy)

# Timeline July
old_july_desc = """[Placeholder: A short story describing how the team organized a summer clothing distribution event, ensuring families had what they needed for the season. Highlights the direct interaction and joy shared.]"""
new_july_desc = """We organized a major summer clothing distribution event to ensure local families had exactly what they needed for the season. It was a beautiful day of direct interaction, shared joy, and strengthening neighborhood bonds. You can read more about our historical outreach efforts in our <a href="blog.html" style="color: var(--color-primary); text-decoration: underline;">Knowledge Center</a>."""
html = html.replace(old_july_desc, new_july_desc)

# Timeline June
old_june_desc = """[Placeholder: A narrative about the latest Saturday gathering. Volunteers worked through the morning sorting donations and concluded the day with a shared meal and meaningful conversation.]"""
new_june_desc = """Our dedicated volunteers worked tirelessly through the morning sorting fresh donations. We concluded the day with a shared meal and meaningful conversation, reinforcing that community is built on both hard work and genuine connection."""
html = html.replace(old_june_desc, new_june_desc)

# Timeline May
old_may_desc = """[Placeholder: Detailing the massive milestone of processing 350 pounds of donated clothing. A story about the community's overwhelming generosity and the logistics of getting everything to the right places.]"""
new_may_desc = """Thanks to overwhelming generosity, we reached a massive milestone: processing and distributing 350 pounds of donated clothing in a single month. If you have items to contribute, please <a href="contact.html" style="color: var(--color-primary); text-decoration: underline;">contact us</a> to arrange a drop-off."""
html = html.replace(old_may_desc, new_may_desc)

# Section 2 Description
old_sec2_desc = """[Placeholder text detailing the weekly volunteer gatherings, the spirit of community participation, and how community members organize clothing donations while enjoying a shared lunch gathering.]"""
new_sec2_desc = """Every Saturday, our showroom transforms into a hub of community participation. Volunteers from all walks of life gather to meticulously organize clothing donations, share a warm lunch together, and build lasting friendships while giving back."""
html = html.replace(old_sec2_desc, new_sec2_desc)

# Section 3 Description
old_sec3_desc = """[Placeholder text explaining that donated clothing is meticulously sorted, organized, and made freely available directly to individuals and families in need within our community.]"""
new_sec3_desc = """We believe everyone deserves access to quality clothing. All donated items are meticulously sorted, organized, and made freely available directly to individuals and families in need within our community, ensuring a dignified and respectful experience."""
html = html.replace(old_sec3_desc, new_sec3_desc)

# Section 4 Description
old_sec4_desc = """[Placeholder text describing the 24/7 community donation drop-off program, making it easy and accessible for neighbors to contribute clothing and essential items at any time.]"""
new_sec4_desc = """To make giving as easy as possible, our 24/7 community donation drop-off box allows neighbors to safely and securely contribute clean clothing and essential items at any time of day or night."""
html = html.replace(old_sec4_desc, new_sec4_desc)

# Section 7 Description
old_sec7_desc = """[Placeholder: Authentic photographs from our community events, volunteer days, and community partners. No AI-generated images.]"""
new_sec7_desc = """A visual testament to the power of community. These authentic photographs from our events, volunteer days, and local partnerships capture the heart of our ongoing mission."""
html = html.replace(old_sec7_desc, new_sec7_desc)

with open('community-impact.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Polish applied to community-impact.html")
