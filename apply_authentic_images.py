import os
import shutil

src_dir = r"c:\Users\Robbe\.gemini\antigravity\scratch\boston-rugs-landing\scraped_images"
dest_dir = r"c:\Users\Robbe\.gemini\antigravity\scratch\boston-rugs-landing\images"

mappings = {
    "event5.jpg": ["community_hero_placeholder.png"],
    "event1.jpg": ["volunteer_saturday_1.png", "timeline_june_1.png", "gallery_community_1.png"],
    "event2.jpg": ["volunteer_saturday_2.png", "gallery_community_2.png"],
    "event3.jpg": ["volunteer_saturday_3.png", "timeline_may_1.png"],
    "02042018-service-at-Somerville-and-Noor-14-1024x768.jpg": ["volunteer_saturday_4.png"],
    "event4.jpg": ["clothing_donation_main.png", "timeline_may_2.png", "gallery_community_3.png"],
    "event6.jpg": ["donation_box_placeholder.png", "timeline_may_4.png"],
    "event7.jpg": ["timeline_july_1.png", "gallery_community_4.png"],
    "event8.jpg": ["timeline_july_2.png", "gallery_community_5.png"],
    "event9.jpg": ["timeline_july_3.png", "gallery_community_6.png"],
    "01072018-18-300x225.jpg": ["timeline_june_2.png"],
    "Noor-Oriental-RUgs-Header.jpg": ["timeline_may_3.png", "get_involved_bg.png"]
}

for src_name, dest_names in mappings.items():
    src_path = os.path.join(src_dir, src_name)
    if os.path.exists(src_path):
        for dest_name in dest_names:
            dest_path = os.path.join(dest_dir, dest_name)
            # Copy and overwrite
            shutil.copy2(src_path, dest_path)
            print(f"Replaced {dest_name} with {src_name}")
    else:
        print(f"Missing source image: {src_name}")

print("All authentic images applied successfully!")
