import re

# 1. Update HTML
with open('community-impact.html', 'r', encoding='utf-8') as f:
    html = f.read()

new_timeline_html = """<!-- SECTION 6: Living Community Timeline -->
        <section class="section section-dark">
            <div class="container reveal">
                <div class="text-center">
                    <span class="section-tag">Living History</span>
                    <h2 class="section-title">Community Timeline</h2>
                    <p class="section-desc max-w-800" style="margin: 0 auto;">Documenting our ongoing journey of service, piece by piece.</p>
                </div>
                
                <div class="timeline">
                    <!-- July 2026 -->
                    <div class="timeline-item reveal">
                        <div class="timeline-marker"></div>
                        <span class="timeline-date">July 2026</span>
                        <div class="timeline-content">
                            <h3>Community Clothing Distribution</h3>
                            <p>[Placeholder: A short story describing how the team organized a summer clothing distribution event, ensuring families had what they needed for the season. Highlights the direct interaction and joy shared.]</p>
                            <div class="timeline-gallery grid-3">
                                <div class="timeline-photo">[Photo: Setup]</div>
                                <div class="timeline-photo">[Photo: Community]</div>
                                <div class="timeline-photo">[Photo: Team]</div>
                            </div>
                        </div>
                    </div>

                    <!-- June 2026 -->
                    <div class="timeline-item reveal">
                        <div class="timeline-marker"></div>
                        <span class="timeline-date">June 2026</span>
                        <div class="timeline-content">
                            <h3>Saturday Volunteer Lunch</h3>
                            <p>[Placeholder: A narrative about the latest Saturday gathering. Volunteers worked through the morning sorting donations and concluded the day with a shared meal and meaningful conversation.]</p>
                            <div class="timeline-gallery grid-2">
                                <div class="timeline-photo">[Photo: Sorting]</div>
                                <div class="timeline-photo">[Photo: Shared Meal]</div>
                            </div>
                        </div>
                    </div>

                    <!-- May 2026 -->
                    <div class="timeline-item reveal">
                        <div class="timeline-marker"></div>
                        <span class="timeline-date">May 2026</span>
                        <div class="timeline-content">
                            <h3>350 Pounds of Clothing Donated</h3>
                            <p>[Placeholder: Detailing the massive milestone of processing 350 pounds of donated clothing. A story about the community's overwhelming generosity and the logistics of getting everything to the right places.]</p>
                            <div class="timeline-gallery grid-4">
                                <div class="timeline-photo">[Photo: Donations]</div>
                                <div class="timeline-photo">[Photo: Boxes]</div>
                                <div class="timeline-photo">[Photo: Loading]</div>
                                <div class="timeline-photo">[Photo: Delivery]</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>"""

# Replace Section 6
html = re.sub(r'<!-- SECTION 6: Recent Community Activities -->.*?<!-- SECTION 7:', new_timeline_html + '\n\n        <!-- SECTION 7:', html, flags=re.DOTALL)

with open('community-impact.html', 'w', encoding='utf-8') as f:
    f.write(html)


# 2. Update CSS
css_addition = """
/* Community Timeline */
.timeline {
    position: relative;
    max-width: 800px;
    margin: 4rem auto 0;
    padding-left: 2rem;
}
.timeline::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 2px;
    background: var(--color-border);
}
.timeline-item {
    position: relative;
    margin-bottom: 4rem;
}
.timeline-item:last-child {
    margin-bottom: 0;
}
.timeline-marker {
    position: absolute;
    left: -2.35rem;
    top: 0.5rem;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--color-bg);
    border: 2px solid var(--color-primary);
    box-shadow: 0 0 0 4px var(--color-bg);
}
.timeline-date {
    font-family: var(--font-heading);
    color: var(--color-primary);
    font-size: 1.5rem;
    margin-bottom: 1rem;
    display: block;
}
.timeline-content {
    background: var(--color-card-bg);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    padding: 2rem;
}
.timeline-content h3 {
    margin-bottom: 1rem;
    font-family: var(--font-heading);
    color: var(--color-text);
}
.timeline-content p {
    color: var(--color-text-muted);
    line-height: 1.6;
    margin-bottom: 2rem;
}
.timeline-gallery {
    display: grid;
    gap: 1rem;
}
.timeline-gallery.grid-2 {
    grid-template-columns: 1fr 1fr;
}
.timeline-gallery.grid-3 {
    grid-template-columns: repeat(3, 1fr);
}
.timeline-gallery.grid-4 {
    grid-template-columns: repeat(4, 1fr);
}
.timeline-photo {
    aspect-ratio: 4/3;
    background: var(--color-bg);
    border: 1px dashed var(--color-border);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
    font-size: 0.85rem;
}

@media (max-width: 768px) {
    .timeline-gallery.grid-3,
    .timeline-gallery.grid-4 {
        grid-template-columns: 1fr 1fr;
    }
}
@media (max-width: 480px) {
    .timeline-gallery.grid-2,
    .timeline-gallery.grid-3,
    .timeline-gallery.grid-4 {
        grid-template-columns: 1fr;
    }
}
"""

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

if '/* Community Timeline */' not in css:
    with open('styles.css', 'a', encoding='utf-8') as f:
        f.write(css_addition)

print("Updated HTML and CSS for Timeline")
