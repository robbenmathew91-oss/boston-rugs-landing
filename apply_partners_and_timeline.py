import re

with open('community-impact.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Partner Logos
html = html.replace('<img src="images/partner-placeholder.svg" alt="Partner Logo" style="max-width: 150px; filter: grayscale(100%);">', '<img src="images/partner1.svg" alt="Local Food Bank" style="max-width: 150px; filter: grayscale(100%); transition: filter 0.3s;" onmouseover="this.style.filter=\'none\'" onmouseout="this.style.filter=\'grayscale(100%)\'">', 1)
html = html.replace('<img src="images/partner-placeholder.svg" alt="Partner Logo" style="max-width: 150px; filter: grayscale(100%);">', '<img src="images/partner2.svg" alt="Youth Shelter" style="max-width: 150px; filter: grayscale(100%); transition: filter 0.3s;" onmouseover="this.style.filter=\'none\'" onmouseout="this.style.filter=\'grayscale(100%)\'">', 1)
html = html.replace('<img src="images/partner-placeholder.svg" alt="Partner Logo" style="max-width: 150px; filter: grayscale(100%);">', '<img src="images/partner3.svg" alt="City Mission" style="max-width: 150px; filter: grayscale(100%); transition: filter 0.3s;" onmouseover="this.style.filter=\'none\'" onmouseout="this.style.filter=\'grayscale(100%)\'">', 1)
html = html.replace('<img src="images/partner-placeholder.svg" alt="Partner Logo" style="max-width: 150px; filter: grayscale(100%);">', '<img src="images/partner4.svg" alt="Family Services" style="max-width: 150px; filter: grayscale(100%); transition: filter 0.3s;" onmouseover="this.style.filter=\'none\'" onmouseout="this.style.filter=\'grayscale(100%)\'">', 1)

# 2. Rebalancing Section 4 (Outdoor Donation Box)
# Change the image style so it doesn't take up the whole screen width
old_sec4_img = 'style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s ease;"'
new_sec4_img = 'style="width: 100%; max-width: 600px; height: 400px; object-fit: cover; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 0 auto; display: block; transition: transform 0.3s ease;"'
html = html.replace(old_sec4_img, new_sec4_img)

# 3. Rebalancing Section 3 (Free Clothing Donation)
# Let's ensure the image grid has a good aspect ratio
old_sec3_img = '<img src="images/clothing_donation_main.png" alt="The free clothing donation program shelves" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s ease;" class="placeholder-img">'
new_sec3_img = '<img src="images/clothing_donation_main.png" alt="The free clothing donation program shelves" loading="lazy" style="width: 100%; height: 400px; object-fit: cover; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s ease;" class="placeholder-img">'
html = html.replace(old_sec3_img, new_sec3_img)

# 4. Timeline
# Add an extra image to timeline_june so it has 3 images instead of 2 for better balance.
# We have event5-1.jpg we can use. I will copy event5-1.jpg to timeline_june_3.png in a moment.
old_june_gallery = '''<div class="timeline-gallery grid-2">
                                <img src="images/timeline_june_1.png" alt="Noor Oriental Rugs community outreach event" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s ease;" class="placeholder-img">
                                <img src="images/timeline_june_2.png" alt="Noor Oriental Rugs community outreach event" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s ease;" class="placeholder-img">
                            </div>'''
new_june_gallery = '''<div class="timeline-gallery grid-3">
                                <img src="images/timeline_june_1.png" alt="Noor Oriental Rugs community outreach event" loading="lazy" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s ease;" class="placeholder-img">
                                <img src="images/timeline_june_2.png" alt="Noor Oriental Rugs community outreach event" loading="lazy" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s ease;" class="placeholder-img">
                                <img src="images/timeline_june_3.png" alt="Noor Oriental Rugs community outreach event" loading="lazy" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s ease;" class="placeholder-img">
                            </div>'''
html = html.replace(old_june_gallery, new_june_gallery)

# Set timeline heights to be consistent
html = html.replace('height: 100%; object-fit: cover;', 'height: 200px; object-fit: cover;')

with open('community-impact.html', 'w', encoding='utf-8') as f:
    f.write(html)

import shutil
import os
# Copy the extra image for timeline_june_3
src_extra = r"c:\Users\Robbe\.gemini\antigravity\scratch\boston-rugs-landing\scraped_images\event5-1.jpg"
dest_extra = r"c:\Users\Robbe\.gemini\antigravity\scratch\boston-rugs-landing\images\timeline_june_3.png"
if os.path.exists(src_extra):
    shutil.copy2(src_extra, dest_extra)
    print("Copied extra image for timeline")

print("Partners and Timeline applied successfully!")
