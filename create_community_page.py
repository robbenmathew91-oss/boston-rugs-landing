import os
import re

with open('about.html', 'r', encoding='utf-8') as f:
    about_content = f.read()

# Extract header
header_match = re.search(r'([\s\S]*?)<main', about_content)
if not header_match:
    print("Could not find header")
    exit(1)
header_html = header_match.group(1)

# Fix title
header_html = re.sub(r'<title>.*?</title>', '<title>Community Impact | Noor Oriental Rugs</title>', header_html)

# Extract footer
footer_match = re.search(r'</main>([\s\S]*)', about_content)
if not footer_match:
    print("Could not find footer")
    exit(1)
footer_html = footer_match.group(1)

# New Main Content
main_content = """
<main>
    <!-- HERO SECTION -->
    <section class="hero" style="background-image: linear-gradient(rgba(10, 10, 10, 0.7), rgba(10, 10, 10, 0.8)), url('images/showroom.png'); min-height: 50vh;">
        <div class="hero-content reveal">
            <h1 class="hero-title">Community Impact</h1>
            <p class="hero-subtitle">Serving our neighbors with compassion, craftsmanship, and community for decades.</p>
        </div>
    </section>

    <!-- SECTION 1: Our Philosophy -->
    <section class="section">
        <div class="container text-center reveal">
            <h2 class="section-title">Our Philosophy</h2>
            <p class="section-desc max-w-800" style="margin: 0 auto;">
                [Placeholder: Mr. Noor's authentic messaging describing the core belief that a successful business must actively serve and uplift its local community. This section will elaborate on the fundamental values that drive Noor Oriental Rugs' charitable initiatives.]
            </p>
        </div>
    </section>

    <!-- SECTION 2: Saturday Volunteer Program -->
    <section class="section section-dark">
        <div class="container">
            <div class="grid grid-2 align-center reveal">
                <div class="text-content">
                    <h2 class="section-title">Saturday Volunteer Program</h2>
                    <p class="section-desc">
                        [Placeholder text detailing the weekly volunteer gatherings, the spirit of community participation, and how community members organize clothing donations while enjoying a shared lunch gathering.]
                    </p>
                </div>
                <div class="image-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <img src="images/placeholder.jpg" alt="Volunteer Lunch Gathering" class="responsive-img" style="aspect-ratio: 1; object-fit: cover; border-radius: 4px;">
                    <img src="images/placeholder.jpg" alt="Clothing Organization" class="responsive-img" style="aspect-ratio: 1; object-fit: cover; border-radius: 4px;">
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION 3: Free Clothing Donation Program -->
    <section class="section">
        <div class="container">
            <div class="grid grid-2 align-center reveal">
                <div>
                    <img src="images/placeholder.jpg" alt="Free Clothing Donation Program" class="responsive-img" style="border-radius: 4px;">
                </div>
                <div class="text-content">
                    <h2 class="section-title">Free Clothing Donation Program</h2>
                    <p class="section-desc">
                        [Placeholder text explaining that donated clothing is meticulously sorted, organized, and made freely available directly to individuals and families in need within our community.]
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION 4: Outdoor Donation Box -->
    <section class="section section-dark">
        <div class="container text-center reveal">
            <h2 class="section-title">Outdoor Donation Drop-Off</h2>
            <p class="section-desc max-w-800" style="margin: 0 auto 3rem auto;">
                [Placeholder text describing the 24/7 community donation drop-off program, making it easy and accessible for neighbors to contribute clothing and essential items at any time.]
            </p>
            <img src="images/placeholder.jpg" alt="Outdoor Donation Box" style="max-width: 600px; width: 100%; border-radius: 4px; box-shadow: var(--shadow-lg);">
        </div>
    </section>

    <!-- SECTION 5: Community Partners -->
    <section class="section">
        <div class="container text-center reveal">
            <h2 class="section-title">Our Community Partners</h2>
            <p class="section-desc max-w-800" style="margin: 0 auto 3rem auto;">We work alongside incredible organizations to extend our reach and maximize our impact.</p>
            <div class="partner-grid">
                <!-- Reusing partner logos from existing homepage -->
                <div class="partner-card">
                    <h3>Rosie's Place</h3>
                    <p>Supporting women in need through donations and outreach programs.</p>
                </div>
                <div class="partner-card">
                    <h3>Pine Street Inn</h3>
                    <p>Providing essential clothing and textiles to individuals transitioning from homelessness.</p>
                </div>
                <div class="partner-card">
                    <h3>Local Shelters</h3>
                    <p>Distributing warm clothing and necessary items during winter months.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION 6: Recent Community Activities -->
    <section class="section section-dark">
        <div class="container reveal">
            <h2 class="section-title text-center">Recent Activities</h2>
            <div class="grid grid-3" style="margin-top: 3rem;">
                <div class="card" style="background: var(--color-bg); padding: 2rem; border: 1px solid var(--color-border); border-radius: 4px;">
                    <h3 style="color: var(--color-primary); margin-bottom: 1rem;">Volunteer Saturdays</h3>
                    <p style="color: var(--color-text-muted); font-size: 0.95rem;">[Placeholder: Details about the most recent Saturday volunteer gathering and the community spirit shared.]</p>
                </div>
                <div class="card" style="background: var(--color-bg); padding: 2rem; border: 1px solid var(--color-border); border-radius: 4px;">
                    <h3 style="color: var(--color-primary); margin-bottom: 1rem;">Winter Clothing Drive</h3>
                    <p style="color: var(--color-text-muted); font-size: 0.95rem;">[Placeholder: Recap of a recent clothing drive ensuring families have warm winter coats and essentials.]</p>
                </div>
                <div class="card" style="background: var(--color-bg); padding: 2rem; border: 1px solid var(--color-border); border-radius: 4px;">
                    <h3 style="color: var(--color-primary); margin-bottom: 1rem;">Rug Donations</h3>
                    <p style="color: var(--color-text-muted); font-size: 0.95rem;">[Placeholder: Story of a recent rug donation provided to a community center or a family moving into a new home.]</p>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION 7: Photo Gallery -->
    <section class="section">
        <div class="container text-center reveal">
            <h2 class="section-title">Photo Gallery</h2>
            <p class="section-desc max-w-800" style="margin: 0 auto 3rem auto;">[Placeholder: Authentic photographs from our community events, volunteer days, and community partners.]</p>
            <div class="grid grid-3">
                <img src="images/placeholder.jpg" alt="Gallery Placeholder" class="responsive-img" style="aspect-ratio: 4/3; object-fit: cover; border-radius: 4px;">
                <img src="images/placeholder.jpg" alt="Gallery Placeholder" class="responsive-img" style="aspect-ratio: 4/3; object-fit: cover; border-radius: 4px;">
                <img src="images/placeholder.jpg" alt="Gallery Placeholder" class="responsive-img" style="aspect-ratio: 4/3; object-fit: cover; border-radius: 4px;">
                <img src="images/placeholder.jpg" alt="Gallery Placeholder" class="responsive-img" style="aspect-ratio: 4/3; object-fit: cover; border-radius: 4px;">
                <img src="images/placeholder.jpg" alt="Gallery Placeholder" class="responsive-img" style="aspect-ratio: 4/3; object-fit: cover; border-radius: 4px;">
                <img src="images/placeholder.jpg" alt="Gallery Placeholder" class="responsive-img" style="aspect-ratio: 4/3; object-fit: cover; border-radius: 4px;">
            </div>
        </div>
    </section>

    <!-- SECTION 8: Get Involved -->
    <section class="section section-dark text-center">
        <div class="container reveal">
            <h2 class="section-title">Get Involved</h2>
            <p class="section-desc max-w-800" style="margin: 0 auto 3rem auto;">Join us in our mission to serve the community. There are many ways to contribute and make a difference.</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <a href="contact.html?subject=Donate+Clothing" class="btn btn-primary">Donate Clothing</a>
                <a href="contact.html?subject=Volunteer" class="btn btn-outline">Volunteer</a>
                <a href="contact.html?subject=Request+Pickup" class="btn btn-outline">Request Pickup</a>
                <a href="contact.html" class="btn btn-outline">Contact Us</a>
            </div>
        </div>
    </section>
</main>
"""

full_content = header_html + main_content + footer_html

with open('community-impact.html', 'w', encoding='utf-8') as f:
    f.write(full_content)
print("Created community-impact.html")
