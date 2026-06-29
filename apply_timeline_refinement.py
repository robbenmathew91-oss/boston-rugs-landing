import re
import os

html_path = 'community-impact.html'
css_path = 'styles.css'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Define the old timeline block to replace
start_marker = '<div class="story-timeline">'
end_marker = '<!-- SECTION 7: Photo Gallery -->'

new_timeline_html = '''<div class="premium-timeline">
                    <!-- Vertical Timeline Connector -->
                    <div class="premium-timeline-line"></div>
                    
                    <!-- July 2026 -->
                    <div class="premium-timeline-event left-card reveal">
                        <div class="premium-date-badge">July 2026</div>
                        <div class="premium-card">
                            <h3 class="premium-title">Community Clothing Distribution</h3>
                            <p class="premium-text">We organized a major summer clothing distribution event to ensure local families had exactly what they needed for the season. It was a beautiful day of direct interaction, shared joy, and strengthening neighborhood bonds. You can read more about our historical outreach efforts in our <a href="blog.html" style="color: var(--color-primary); text-decoration: underline;">Knowledge Center</a>.</p>
                        </div>
                        <div class="premium-image-wrapper">
                            <img src="images/timeline_july_1.png" alt="Community Clothing Distribution" loading="lazy" class="premium-hero-img">
                        </div>
                    </div>

                    <!-- June 2026 -->
                    <div class="premium-timeline-event right-card reveal">
                        <div class="premium-date-badge">June 2026</div>
                        <div class="premium-image-wrapper">
                            <img src="images/timeline_june_1.png" alt="Saturday Volunteer Lunch" loading="lazy" class="premium-hero-img">
                            <img src="images/timeline_june_2.png" alt="Volunteer Detail" loading="lazy" class="premium-support-img">
                        </div>
                        <div class="premium-card">
                            <h3 class="premium-title">Saturday Volunteer Lunch</h3>
                            <p class="premium-text">Our dedicated volunteers worked tirelessly through the morning sorting fresh donations. We concluded the day with a shared meal and meaningful conversation, reinforcing that community is built on both hard work and genuine connection.</p>
                        </div>
                    </div>

                    <!-- May 2026 -->
                    <div class="premium-timeline-event center-card reveal">
                        <div class="premium-date-badge">May 2026</div>
                        <div class="premium-image-wrapper-full">
                            <img src="images/timeline_may_1.png" alt="350 Pounds of Clothing Donated" loading="lazy" class="premium-hero-img-full">
                        </div>
                        <div class="premium-card-wide">
                            <h3 class="premium-title">350 Pounds of Clothing Donated</h3>
                            <p class="premium-text">Thanks to overwhelming generosity, we reached a massive milestone: processing and distributing 350 pounds of donated clothing in a single month. If you have items to contribute, please <a href="contact.html" style="color: var(--color-primary); text-decoration: underline;">contact us</a> to arrange a drop-off.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 7: Photo Gallery -->'''

# Replace using regex
pattern = re.compile(re.escape(start_marker) + r'.*?' + re.escape(end_marker), re.DOTALL)
html = pattern.sub(new_timeline_html, html)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

new_css = '''
/* ==========================================================================
   Premium Timeline (Overlapping True Cards)
   ========================================================================== */

.premium-timeline {
    position: relative;
    max-width: 1000px;
    margin: 6rem auto 0 auto;
    padding: 2rem 0 4rem 0;
}

.premium-timeline-line {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -2rem;
    bottom: -2rem;
    width: 2px;
    background: linear-gradient(to bottom, rgba(212, 175, 55, 0) 0%, rgba(212, 175, 55, 0.4) 10%, rgba(212, 175, 55, 0.4) 90%, rgba(212, 175, 55, 0) 100%);
    z-index: 1;
}

.premium-timeline-event {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 8rem;
    padding-top: 3rem; /* Space for date badge */
}

.premium-timeline-event:last-child {
    margin-bottom: 0;
}

.left-card {
    justify-content: flex-start;
}

.right-card {
    justify-content: flex-end;
}

.center-card {
    flex-direction: column;
    text-align: center;
}

/* Date Badge */
.premium-date-badge {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-background);
    padding: 0.6rem 2rem;
    border: 2px solid var(--color-primary);
    border-radius: 50px;
    color: var(--color-primary);
    font-weight: 600;
    font-size: 0.85rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    z-index: 5;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

/* The True Card */
.premium-card {
    width: 60%;
    background: #ffffff;
    padding: 4rem;
    box-shadow: 0 15px 45px rgba(0,0,0,0.08);
    border-radius: 4px;
    position: relative;
    z-index: 2;
    border-top: 4px solid var(--color-primary);
}

.left-card .premium-card {
    margin-right: -10%; /* Overlap */
}

.right-card .premium-card {
    margin-left: -10%; /* Overlap */
}

/* Wide card for the anchor event */
.premium-card-wide {
    width: 80%;
    background: #ffffff;
    padding: 4rem;
    box-shadow: 0 15px 45px rgba(0,0,0,0.08);
    border-radius: 4px;
    position: relative;
    z-index: 3;
    border-top: 4px solid var(--color-primary);
    margin-top: -4rem; /* Overlap the hero image above */
}

/* Typography inside card */
.premium-title {
    font-family: var(--font-heading);
    font-size: 2.2rem;
    color: #222;
    margin-bottom: 1.5rem;
    line-height: 1.2;
}

.premium-text {
    font-size: 1.05rem;
    line-height: 1.8;
    color: #555;
}

/* Images */
.premium-image-wrapper {
    width: 50%;
    position: relative;
    z-index: 3;
}

.premium-hero-img {
    width: 100%;
    height: 450px;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.2);
    transition: transform 0.5s ease;
}

.premium-image-wrapper-full {
    width: 100%;
    position: relative;
    z-index: 2;
}

.premium-hero-img-full {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.2);
    transition: transform 0.5s ease;
}

.premium-timeline-event:hover .premium-hero-img,
.premium-timeline-event:hover .premium-hero-img-full {
    transform: scale(1.02);
}

.premium-support-img {
    position: absolute;
    bottom: -30px;
    left: -30px;
    width: 50%;
    height: 200px;
    object-fit: cover;
    border: 8px solid #fff;
    border-radius: 4px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
    z-index: 4;
}

/* Dark mode compatibility if needed */
.section-dark .premium-card,
.section-dark .premium-card-wide {
    background: #111;
    border-top: 4px solid var(--color-primary);
}

.section-dark .premium-title {
    color: #f4f4f4;
}

.section-dark .premium-text {
    color: #bbb;
}

.section-dark .premium-support-img {
    border-color: #111;
}

/* Responsive */
@media (max-width: 992px) {
    .premium-timeline-line {
        left: 30px;
    }
    .premium-date-badge {
        left: 30px;
        transform: translateX(0);
    }
    .premium-timeline-event {
        flex-direction: column !important;
        padding-top: 4rem;
        margin-bottom: 5rem;
    }
    .premium-card, .premium-card-wide {
        width: 100%;
        margin: 0 !important;
        padding: 2.5rem;
        z-index: 2;
    }
    .premium-image-wrapper, .premium-image-wrapper-full {
        width: 100%;
        margin-top: -2rem;
        z-index: 3;
    }
    .premium-hero-img, .premium-hero-img-full {
        height: 300px;
    }
    .premium-support-img {
        display: none;
    }
}
'''

with open(css_path, 'a', encoding='utf-8') as f:
    f.write(new_css)

print("Premium True-Card Timeline applied successfully!")
