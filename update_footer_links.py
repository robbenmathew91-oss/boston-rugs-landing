import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Update Beacon Hill link
    content = re.sub(
        r'<a href="[^"]*">Traditional \(Beacon Hill\)</a>', 
        '<a href="rugs-for-sale.html?collection=Beacon%20Hill">Traditional (Beacon Hill)</a>', 
        content
    )
    
    # Update Seaport link
    content = re.sub(
        r'<a href="[^"]*">Modern \(Seaport\)</a>', 
        '<a href="rugs-for-sale.html?collection=Seaport">Modern (Seaport)</a>', 
        content
    )
    
    # Update Back Bay link
    content = re.sub(
        r'<a href="[^"]*">Vintage \(Back Bay\)</a>', 
        '<a href="rugs-for-sale.html?collection=Back%20Bay">Vintage (Back Bay)</a>', 
        content
    )
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Updated footer collection links in all HTML files.")
