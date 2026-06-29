import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Define the new shortened section
new_charity_section = """<!-- Charity & Community Section -->
    <section id="charity" class="charity">
        <div class="container">
            <div class="section-header text-center reveal">
                <span class="section-tag">Our Outreach</span>
                <h2 class="section-title">Community Impact: Giving Back</h2>
                <p class="section-desc max-w-800" style="margin: 0 auto 2rem auto;">
                    Service is the foundation of our work ethic. We are proud to serve our neighbors with compassion, craftsmanship, and community through volunteer programs, clothing drives, and charitable partnerships.
                </p>
                <a href="community-impact.html" class="btn btn-primary" style="margin-top: 1rem;">Learn More About Our Community Impact</a>
            </div>
        </div>
    </section>

    <!-- Services Section -->"""

# Replace the entire old charity section with the new one
html = re.sub(r'<!-- Charity & Community Section -->.*?<!-- Services Section -->', new_charity_section, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated index.html")
