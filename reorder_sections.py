import re
import os

html_path = 'community-impact.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Restore the original Philosophy text and move the Isfahan story back to where it belongs (well, the Isfahan story is already in Timeline description). 
# Wait, let's fix the Philosophy text at SECTION 1.
# Actually, the user approved the plan to put the Isfahan story in Philosophy.
# In the current HTML, the Isfahan story is in the Timeline description, and Philosophy still has the Mo Nooraee quote.
# Let's extract the Isfahan story from Timeline description.
isfahan_story_pattern = r'<div class="section-desc max-w-800" style="margin: 0 auto; text-align: left;">\s*<p style="margin-bottom: 1.5rem;">Born into the seventh generation[\s\S]*?</div>'

isfahan_match = re.search(isfahan_story_pattern, html)
if isfahan_match:
    isfahan_story_html = isfahan_match.group(0)
    
    # Remove it from the Timeline section and replace with the original timeline description
    original_timeline_desc = """<p class="section-desc max-w-800" style="margin: 0 auto;">
                        Our community initiatives are an ongoing, living history. Explore some of the recent milestones and events where we have had the privilege of giving back.
                    </p>"""
    html = html.replace(isfahan_story_html, original_timeline_desc, 1) # Only the one in timeline

    # Replace the Philosophy text with the Isfahan story
    philosophy_pattern = r'<p class="section-desc max-w-800" style="margin: 0 auto; line-height: 1\.8;">[\s\S]*?</p>'
    html = re.sub(philosophy_pattern, isfahan_story_html.replace('\\', '\\\\'), html, count=1)


# 2. Move Rug Donation Program
rug_donation_pattern = r'<!-- SECTION: Rug Donation Program FAQ -->[\s\S]*?</section>'
rug_match = re.search(rug_donation_pattern, html)
if rug_match:
    rug_html = rug_match.group(0)
    
    # Remove from current location
    html = html.replace(rug_html, '')
    
    # Insert before Photo Gallery
    gallery_pattern = r'<!-- SECTION 7: Photo Gallery -->'
    html = html.replace(gallery_pattern, rug_html + '\n\n        ' + gallery_pattern)


with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
    
print("Successfully reordered sections and fixed philosophy text.")
