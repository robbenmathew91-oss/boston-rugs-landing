import os
import shutil
import re

brain_dir = r"C:\Users\Robbe\.gemini\antigravity-ide\brain\6e369453-3aa8-4367-b0b3-09f1cf299811"
dest_dir = r"c:\Users\Robbe\.gemini\antigravity\scratch\boston-rugs-landing\images"

os.makedirs(dest_dir, exist_ok=True)

# File mappings
mappings = {
    "hero_gen_1782748267897.png": ["community_hero_placeholder.png", "volunteer_saturday_4.png", "gallery_community_6.png"],
    "volunteer_gen_1782748277551.png": ["volunteer_saturday_1.png", "timeline_july_1.png", "timeline_june_1.png", "gallery_community_1.png"],
    "lunch_gen_1782748286105.png": ["volunteer_saturday_3.png", "timeline_june_2.png", "gallery_community_2.png"],
    "donation_box_gen_1782748297298.png": ["donation_box_placeholder.png", "timeline_may_4.png"],
    "clothing_rack_gen_1782748306105.png": ["clothing_donation_main.png", "timeline_july_2.png", "timeline_may_1.png", "gallery_community_3.png"],
    "teamwork_gen_1782748316921.png": ["volunteer_saturday_2.png", "timeline_july_3.png", "timeline_may_2.png", "gallery_community_4.png"],
    "delivery_gen_1782748328430.png": ["timeline_may_3.png", "gallery_community_5.png"],
    "get_involved_gen_1782748339476.png": ["get_involved_bg.png"]
}

for src_file, dest_names in mappings.items():
    src_path = os.path.join(brain_dir, src_file)
    if os.path.exists(src_path):
        for dest_name in dest_names:
            dest_path = os.path.join(dest_dir, dest_name)
            shutil.copy2(src_path, dest_path)
            print(f"Copied {src_file} to {dest_name}")
    else:
        print(f"WARNING: Source file {src_file} not found!")

# Now let's update community-impact.html
with open('community-impact.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Helper function to generate img tag
def img_tag(src, alt="Community placeholder"):
    return f'<img src="images/{src}" alt="{alt}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s ease;" class="placeholder-img">'

# Hero
html = html.replace("url('images/showroom.png')", "url('images/community_hero_placeholder.png')")

# Section 2: Saturday Volunteer
html = html.replace('<div style="aspect-ratio: 1; background: var(--color-bg); border: 1px dashed var(--color-border); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">[Volunteer Photo]</div>', img_tag('volunteer_saturday_1.png', 'Volunteers sorting'))
html = html.replace('<div style="aspect-ratio: 1; background: var(--color-bg); border: 1px dashed var(--color-border); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">[Lunch Gathering]</div>', img_tag('volunteer_saturday_2.png', 'Teamwork'))
html = html.replace('<div style="aspect-ratio: 1; background: var(--color-bg); border: 1px dashed var(--color-border); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">[Clothing Org]</div>', img_tag('volunteer_saturday_3.png', 'Shared Meal'))
html = html.replace('<div style="aspect-ratio: 1; background: var(--color-bg); border: 1px dashed var(--color-border); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">[Community]</div>', img_tag('volunteer_saturday_4.png', 'Community Gathering'))

# Section 3: Free Clothing Donation
html = html.replace('<div style="aspect-ratio: 4/3; background: var(--color-card-bg); border: 1px dashed var(--color-border); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">\n                        [Free Clothing Program Photo]\n                    </div>', img_tag('clothing_donation_main.png', 'Clothing Donation Program'))

# Section 4: Outdoor Donation Box
html = html.replace('<div style="max-width: 800px; margin: 0 auto; aspect-ratio: 16/9; background: var(--color-bg); border: 1px dashed var(--color-border); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">\n                    [Donation Box Photo]\n                </div>', img_tag('donation_box_placeholder.png', 'Outdoor Donation Box'))

# Section 6: Timeline
html = html.replace('<div class="timeline-photo">[Photo: Setup]</div>', img_tag('timeline_july_1.png'))
html = html.replace('<div class="timeline-photo">[Photo: Community]</div>', img_tag('timeline_july_2.png'))
html = html.replace('<div class="timeline-photo">[Photo: Team]</div>', img_tag('timeline_july_3.png'))

html = html.replace('<div class="timeline-photo">[Photo: Sorting]</div>', img_tag('timeline_june_1.png'))
html = html.replace('<div class="timeline-photo">[Photo: Shared Meal]</div>', img_tag('timeline_june_2.png'))

html = html.replace('<div class="timeline-photo">[Photo: Donations]</div>', img_tag('timeline_may_1.png'))
html = html.replace('<div class="timeline-photo">[Photo: Boxes]</div>', img_tag('timeline_may_2.png'))
html = html.replace('<div class="timeline-photo">[Photo: Loading]</div>', img_tag('timeline_may_3.png'))
html = html.replace('<div class="timeline-photo">[Photo: Delivery]</div>', img_tag('timeline_may_4.png'))

# Section 7: Gallery
for i in range(1, 7):
    html = html.replace('<div style="aspect-ratio: 4/3; background: var(--color-card-bg); border: 1px dashed var(--color-border); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">[Gallery Photo]</div>', img_tag(f'gallery_community_{i}.png'), 1)

# Section 8: Get Involved
html = html.replace('<section class="section section-dark text-center">', '<section class="section section-dark text-center" style="background-image: linear-gradient(rgba(10, 10, 10, 0.85), rgba(10, 10, 10, 0.9)), url(\'images/get_involved_bg.png\'); background-size: cover; background-position: center; border-top: 1px solid var(--color-border);">')

# Update CSS for hover effect on placeholder-img
css_addition = """
.placeholder-img:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}
"""
with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

if '.placeholder-img:hover' not in css:
    with open('styles.css', 'a', encoding='utf-8') as f:
        f.write(css_addition)

with open('community-impact.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Images copied and HTML updated.")
