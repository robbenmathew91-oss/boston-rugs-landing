import re

with open('community-impact.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract header
header_match = re.search(r'([\s\S]*?)<!-- Subpage Hero Section -->', content)
if not header_match:
    print("Could not find header")
    exit(1)
header_html = header_match.group(1)

# Extract footer
footer_match = re.search(r'<!-- Footer -->([\s\S]*)', content)
if not footer_match:
    print("Could not find footer")
    exit(1)
footer_html = footer_match.group(1)

# New Main Content
main_content = """
    <main>
        <!-- HERO SECTION -->
        <section class="blog-hero" style="background-image: linear-gradient(rgba(10, 10, 10, 0.7), rgba(10, 10, 10, 0.8)), url('images/showroom.png'); background-size: cover; background-position: center; min-height: 50vh; display: flex; align-items: center; justify-content: center;">
            <div class="container text-center">
                <h1 class="section-title" style="font-size: 4rem; color: var(--color-text);">Community Impact</h1>
                <p class="section-desc max-w-800" style="margin: 0 auto; font-size: 1.2rem; color: var(--color-text-muted);">Serving our neighbors with compassion, craftsmanship, and community for decades.</p>
            </div>
        </section>

        <!-- SECTION 1: Our Philosophy -->
        <section class="section">
            <div class="container text-center reveal">
                <span class="section-tag">Our Philosophy</span>
                <h2 class="section-title">The Foundation of Our Work</h2>
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
                        <span class="section-tag">Weekly Gathering</span>
                        <h2 class="section-title">Saturday Volunteer Program</h2>
                        <p class="section-desc">
                            [Placeholder text detailing the weekly volunteer gatherings, the spirit of community participation, and how community members organize clothing donations while enjoying a shared lunch gathering.]
                        </p>
                    </div>
                    <div class="image-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div style="aspect-ratio: 1; background: var(--color-bg); border: 1px dashed var(--color-border); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">[Volunteer Photo]</div>
                        <div style="aspect-ratio: 1; background: var(--color-bg); border: 1px dashed var(--color-border); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">[Lunch Gathering]</div>
                        <div style="aspect-ratio: 1; background: var(--color-bg); border: 1px dashed var(--color-border); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">[Clothing Org]</div>
                        <div style="aspect-ratio: 1; background: var(--color-bg); border: 1px dashed var(--color-border); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">[Community]</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 3: Free Clothing Donation Program -->
        <section class="section">
            <div class="container">
                <div class="grid grid-2 align-center reveal">
                    <div style="aspect-ratio: 4/3; background: var(--color-card-bg); border: 1px dashed var(--color-border); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">
                        [Free Clothing Program Photo]
                    </div>
                    <div class="text-content">
                        <span class="section-tag">Direct Support</span>
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
                <span class="section-tag">24/7 Drop-Off</span>
                <h2 class="section-title">Outdoor Donation Box</h2>
                <p class="section-desc max-w-800" style="margin: 0 auto 3rem auto;">
                    [Placeholder text describing the 24/7 community donation drop-off program, making it easy and accessible for neighbors to contribute clothing and essential items at any time.]
                </p>
                <div style="max-width: 800px; margin: 0 auto; aspect-ratio: 16/9; background: var(--color-bg); border: 1px dashed var(--color-border); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">
                    [Donation Box Photo]
                </div>
            </div>
        </section>

        <!-- SECTION 5: Community Partners -->
        <section class="section">
            <div class="container text-center reveal">
                <span class="section-tag">Collaboration</span>
                <h2 class="section-title">Our Community Partners</h2>
                <p class="section-desc max-w-800" style="margin: 0 auto 3rem auto;">We work alongside incredible organizations to extend our reach and maximize our impact.</p>
                <div class="grid grid-4" style="align-items: center; justify-items: center; opacity: 0.7; gap: 2rem;">
                    <!-- Reusing existing partner logos from homepage -->
                    <img src="images/partner-placeholder.svg" alt="Partner Logo" style="max-width: 150px; filter: grayscale(100%);">
                    <img src="images/partner-placeholder.svg" alt="Partner Logo" style="max-width: 150px; filter: grayscale(100%);">
                    <img src="images/partner-placeholder.svg" alt="Partner Logo" style="max-width: 150px; filter: grayscale(100%);">
                    <img src="images/partner-placeholder.svg" alt="Partner Logo" style="max-width: 150px; filter: grayscale(100%);">
                </div>
            </div>
        </section>

        <!-- SECTION 6: Recent Community Activities -->
        <section class="section section-dark">
            <div class="container reveal">
                <div class="text-center">
                    <span class="section-tag">Ongoing Efforts</span>
                    <h2 class="section-title">Recent Community Activities</h2>
                </div>
                <div class="grid grid-3" style="margin-top: 3rem;">
                    <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 4px; overflow: hidden;">
                        <div style="aspect-ratio: 16/9; background: var(--color-card-bg); display: flex; align-items: center; justify-content: center; color: var(--color-text-muted); border-bottom: 1px solid var(--color-border);">[Event Photo]</div>
                        <div style="padding: 2rem;">
                            <h3 style="color: var(--color-primary); margin-bottom: 1rem; font-family: var(--font-heading);">Volunteer Saturdays</h3>
                            <p style="color: var(--color-text-muted); font-size: 0.95rem;">[Placeholder: Details about the most recent Saturday volunteer gathering and the community spirit shared.]</p>
                        </div>
                    </div>
                    <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 4px; overflow: hidden;">
                        <div style="aspect-ratio: 16/9; background: var(--color-card-bg); display: flex; align-items: center; justify-content: center; color: var(--color-text-muted); border-bottom: 1px solid var(--color-border);">[Event Photo]</div>
                        <div style="padding: 2rem;">
                            <h3 style="color: var(--color-primary); margin-bottom: 1rem; font-family: var(--font-heading);">Clothing Drives</h3>
                            <p style="color: var(--color-text-muted); font-size: 0.95rem;">[Placeholder: Recap of a recent clothing drive ensuring families have warm coats and essentials.]</p>
                        </div>
                    </div>
                    <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 4px; overflow: hidden;">
                        <div style="aspect-ratio: 16/9; background: var(--color-card-bg); display: flex; align-items: center; justify-content: center; color: var(--color-text-muted); border-bottom: 1px solid var(--color-border);">[Event Photo]</div>
                        <div style="padding: 2rem;">
                            <h3 style="color: var(--color-primary); margin-bottom: 1rem; font-family: var(--font-heading);">Rug Donations</h3>
                            <p style="color: var(--color-text-muted); font-size: 0.95rem;">[Placeholder: Story of a recent rug donation provided to a community center or a family in need.]</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 7: Photo Gallery -->
        <section class="section">
            <div class="container text-center reveal">
                <span class="section-tag">Visual Story</span>
                <h2 class="section-title">Photo Gallery</h2>
                <p class="section-desc max-w-800" style="margin: 0 auto 3rem auto;">[Placeholder: Authentic photographs from our community events, volunteer days, and community partners. No AI-generated images.]</p>
                <div class="grid grid-3" style="gap: 1rem;">
                    <div style="aspect-ratio: 4/3; background: var(--color-card-bg); border: 1px dashed var(--color-border); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">[Gallery Photo]</div>
                    <div style="aspect-ratio: 4/3; background: var(--color-card-bg); border: 1px dashed var(--color-border); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">[Gallery Photo]</div>
                    <div style="aspect-ratio: 4/3; background: var(--color-card-bg); border: 1px dashed var(--color-border); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">[Gallery Photo]</div>
                    <div style="aspect-ratio: 4/3; background: var(--color-card-bg); border: 1px dashed var(--color-border); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">[Gallery Photo]</div>
                    <div style="aspect-ratio: 4/3; background: var(--color-card-bg); border: 1px dashed var(--color-border); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">[Gallery Photo]</div>
                    <div style="aspect-ratio: 4/3; background: var(--color-card-bg); border: 1px dashed var(--color-border); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">[Gallery Photo]</div>
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
    
    <!-- Footer -->"""

full_content = header_html + main_content + footer_html

with open('community-impact.html', 'w', encoding='utf-8') as f:
    f.write(full_content)
print("Created community-impact.html correctly")
