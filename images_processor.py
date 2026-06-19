import os
from PIL import Image

# Setup paths
src_dir = r"C:\Users\Robbe\.gemini\antigravity-ide\brain\b8c6e82a-c020-400c-bd48-f1b6abfd73b6"
dst_dir = r"c:\Users\Robbe\.gemini\antigravity\scratch\boston-rugs-landing\images\restoration-gallery"

# Make destination directory if not exists
os.makedirs(dst_dir, exist_ok=True)

# Image mapping: (generated filename contains key, target filename)
image_mapping = {
    "hero_restoration_before": "hero-restoration-before.jpg",
    "hero_restoration_after": "hero-restoration-after.jpg",
    "hero_cleaning_before": "hero-cleaning-before.jpg",
    "hero_cleaning_after": "hero-cleaning-after.jpg",
    "moth_damage_before": "moth-damage-before.jpg",
    "moth_damage_after": "moth-damage-after.jpg",
    "water_damage_before": "water-damage-before.jpg",
    "water_damage_after": "water-damage-after.jpg",
    "fringe_repair_before": "fringe-repair-before.jpg",
    "fringe_repair_after": "fringe-repair-after.jpg",
    "color_restoration_before": "color-restoration-before.jpg",
    "color_restoration_after": "color-restoration-after.jpg",
    "pile_reweaving_before": "pile-reweaving-before.jpg",
    "pile_reweaving_after": "pile-reweaving-after.jpg",
    "hand_washing_before": "hand-washing-before.jpg",
    "hand_washing_after": "hand-washing-after.jpg"
}

# Scan source directory for generated files
src_files = os.listdir(src_dir)

print("Starting image processing...")

for key, target_name in image_mapping.items():
    # Find file matching key and ending with .png
    match = None
    for f in src_files:
        if key in f and f.endswith(".png"):
            match = f
            break
            
    if not match:
        print(f"ERROR: Could not find generated image for {key}")
        continue
        
    src_path = os.path.join(src_dir, match)
    dst_path = os.path.join(dst_dir, target_name)
    
    try:
        with Image.open(src_path) as img:
            # Convert RGBA to RGB
            if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                img = img.convert('RGB')
                
            # Resize to exactly 1200x900 (4:3)
            img_resized = img.resize((1200, 900), Image.Resampling.LANCZOS)
            
            # Save as JPEG with compression (quality=85 is standard, high quality & small file size)
            img_resized.save(dst_path, "JPEG", quality=85, optimize=True)
            
            # Verify file size
            sz = os.path.getsize(dst_path) / 1024
            print(f"Processed: {match} -> {target_name} ({sz:.1f} KB)")
            
            if sz > 300:
                # Re-save with lower quality if exceeds 300KB
                img_resized.save(dst_path, "JPEG", quality=75, optimize=True)
                sz_new = os.path.getsize(dst_path) / 1024
                print(f"  Re-compressed to stay under 300KB: {sz_new:.1f} KB")
                
    except Exception as e:
        print(f"Failed to process {match}: {e}")

print("Image processing complete!")
