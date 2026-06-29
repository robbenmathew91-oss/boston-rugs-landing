import re
import os

html_path = 'community-impact.html'
css_path = 'styles.css'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Define the old timeline block to replace
# We'll use regex to replace everything between <div class="timeline"> and the end of SECTION 6
start_marker = '<div class="timeline">'
end_marker = '<!-- SECTION 7: Photo Gallery -->'

new_timeline_html = '''<div class="story-timeline">
                    <!-- Vertical Timeline Connector -->
                    <div class="timeline-line"></div>
                    
                    <!-- July 2026 -->
                    <div class="story-card layout-image-left reveal">
                        <div class="story-card-image-wrap">
                            <img src="images/timeline_july_1.png" alt="Community Clothing Distribution" loading="lazy" class="story-hero-image">
                        </div>
                        <div class="story-card-marker"></div>
                        <div class="story-card-content">
                            <span class="story-date">July 2026</span>
                            <h3 class="story-title">Community Clothing Distribution</h3>
                            <p class="story-text">We organized a major summer clothing distribution event to ensure local families had exactly what they needed for the season. It was a beautiful day of direct interaction, shared joy, and strengthening neighborhood bonds. You can read more about our historical outreach efforts in our <a href="blog.html" style="color: var(--color-primary); text-decoration: underline;">Knowledge Center</a>.</p>
                        </div>
                    </div>

                    <!-- June 2026 -->
                    <div class="story-card layout-image-right reveal">
                        <div class="story-card-content">
                            <span class="story-date">June 2026</span>
                            <h3 class="story-title">Saturday Volunteer Lunch</h3>
                            <p class="story-text">Our dedicated volunteers worked tirelessly through the morning sorting fresh donations. We concluded the day with a shared meal and meaningful conversation, reinforcing that community is built on both hard work and genuine connection.</p>
                        </div>
                        <div class="story-card-marker"></div>
                        <div class="story-card-image-wrap">
                            <img src="images/timeline_june_1.png" alt="Saturday Volunteer Lunch" loading="lazy" class="story-hero-image">
                            <div class="story-supporting-image-wrap">
                                <img src="images/timeline_june_2.png" alt="Volunteer Lunch Detail" loading="lazy" class="story-supporting-image">
                            </div>
                        </div>
                    </div>

                    <!-- May 2026 -->
                    <div class="story-card layout-hero-top reveal">
                        <div class="story-card-marker-top"></div>
                        <div class="story-card-image-wrap-full">
                            <img src="images/timeline_may_1.png" alt="350 Pounds of Clothing Donated" loading="lazy" class="story-hero-image-full">
                        </div>
                        <div class="story-card-content-center">
                            <span class="story-date">May 2026</span>
                            <h3 class="story-title">350 Pounds of Clothing Donated</h3>
                            <p class="story-text max-w-800">Thanks to overwhelming generosity, we reached a massive milestone: processing and distributing 350 pounds of donated clothing in a single month. If you have items to contribute, please <a href="contact.html" style="color: var(--color-primary); text-decoration: underline;">contact us</a> to arrange a drop-off.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 7: Photo Gallery -->'''

# Use regex with re.DOTALL to replace the section
pattern = re.compile(re.escape(start_marker) + r'.*?' + re.escape(end_marker), re.DOTALL)
html = pattern.sub(new_timeline_html, html)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

# Now CSS
new_css = '''
/* ==========================================================================
   Story Timeline (Luxury Editorial Layout)
   ========================================================================== */

.story-timeline {
    position: relative;
    max-width: 1200px;
    margin: 4rem auto 0 auto;
    padding: 2rem 0;
}

.timeline-line {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, rgba(212, 175, 55, 0) 0%, rgba(212, 175, 55, 0.4) 10%, rgba(212, 175, 55, 0.4) 90%, rgba(212, 175, 55, 0) 100%);
    z-index: 1;
}

.story-card {
    position: relative;
    display: flex;
    gap: 4rem;
    margin-bottom: 8rem;
    align-items: center;
    z-index: 2;
}

.story-card:last-child {
    margin-bottom: 0;
}

.story-card.layout-image-left {
    flex-direction: row;
}

.story-card.layout-image-right {
    flex-direction: row-reverse;
}

.story-card.layout-hero-top {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
}

/* Markers */
.story-card-marker {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: var(--color-background);
    border: 3px solid var(--color-primary);
    box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.2);
    z-index: 3;
}

.story-card-marker-top {
    position: absolute;
    left: 50%;
    top: -2rem;
    transform: translateX(-50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: var(--color-background);
    border: 3px solid var(--color-primary);
    box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.2);
    z-index: 3;
}

/* Content */
.story-card-content {
    flex: 1;
    padding: 2rem;
}

.story-card.layout-image-left .story-card-content {
    padding-left: 4rem;
}

.story-card.layout-image-right .story-card-content {
    padding-right: 4rem;
    text-align: right;
}

.story-card-content-center {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 2rem;
}

.story-date {
    display: inline-block;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--color-primary);
    font-weight: 600;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--color-primary);
    padding-bottom: 4px;
}

.story-title {
    font-family: var(--font-heading);
    font-size: 2.2rem;
    color: var(--color-text);
    margin-bottom: 1.5rem;
    line-height: 1.2;
}

.story-text {
    font-size: 1.05rem;
    line-height: 1.8;
    color: var(--color-text-muted);
}

/* Images */
.story-card-image-wrap {
    flex: 1;
    position: relative;
}

.story-card-image-wrap-full {
    width: 100%;
    position: relative;
}

.story-hero-image {
    width: 100%;
    height: 450px;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    transition: transform 0.5s ease;
}

.story-hero-image-full {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    transition: transform 0.5s ease;
}

.story-card:hover .story-hero-image,
.story-card:hover .story-hero-image-full {
    transform: scale(1.02);
}

.story-supporting-image-wrap {
    position: absolute;
    bottom: -30px;
    right: -30px;
    width: 50%;
    border: 8px solid var(--color-background);
    border-radius: 4px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    z-index: 4;
}

.story-card.layout-image-right .story-supporting-image-wrap {
    right: auto;
    left: -30px;
}

.story-supporting-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 2px;
    display: block;
}

/* Responsive */
@media (max-width: 992px) {
    .timeline-line {
        left: 20px;
    }
    .story-card.layout-image-left,
    .story-card.layout-image-right {
        flex-direction: column;
        gap: 2rem;
    }
    .story-card-marker {
        left: 20px;
        top: 0;
        transform: translate(-50%, -50%);
    }
    .story-card.layout-image-left .story-card-content,
    .story-card.layout-image-right .story-card-content {
        padding: 0 0 0 3rem;
        text-align: left;
    }
    .story-supporting-image-wrap {
        display: none; /* Hide supporting image on mobile to keep it clean */
    }
    .story-hero-image, .story-hero-image-full {
        height: 300px;
    }
    .story-card-marker-top {
        left: 20px;
    }
    .story-card-content-center {
        padding: 0 0 0 3rem;
        text-align: left;
    }
}
'''

with open(css_path, 'a', encoding='utf-8') as f:
    f.write(new_css)

print("Timeline redesigned successfully!")
