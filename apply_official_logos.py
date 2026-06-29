import os

with open('community-impact.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace partner1 with Sufi Service Committee
old_p1 = '<img src="images/partner1.svg" alt="Local Food Bank" style="max-width: 150px; filter: grayscale(100%); transition: filter 0.3s;" onmouseover="this.style.filter=\'none\'" onmouseout="this.style.filter=\'grayscale(100%)\'">'
new_p1 = '<img src="images/sufi_service_logo.png" alt="Sufi Service Committee" style="max-width: 150px; filter: grayscale(100%); transition: filter 0.3s; object-fit: contain; max-height: 80px;" onmouseover="this.style.filter=\'none\'" onmouseout="this.style.filter=\'grayscale(100%)\'">'
html = html.replace(old_p1, new_p1)

# Replace partner2 with Bay Cove Human Services
old_p2 = '<img src="images/partner2.svg" alt="Youth Shelter" style="max-width: 150px; filter: grayscale(100%); transition: filter 0.3s;" onmouseover="this.style.filter=\'none\'" onmouseout="this.style.filter=\'grayscale(100%)\'">'
new_p2 = '<img src="images/bay_cove_logo.png" alt="Bay Cove Human Services" style="max-width: 150px; filter: grayscale(100%); transition: filter 0.3s; object-fit: contain; max-height: 80px;" onmouseover="this.style.filter=\'none\'" onmouseout="this.style.filter=\'grayscale(100%)\'">'
html = html.replace(old_p2, new_p2)

# Ensure partner 3 and 4 have max-height 80px for consistent sizing
old_p3 = '<img src="images/partner3.svg" alt="City Mission" style="max-width: 150px; filter: grayscale(100%); transition: filter 0.3s;"'
new_p3 = '<img src="images/partner3.svg" alt="City Mission" style="max-width: 150px; max-height: 80px; object-fit: contain; filter: grayscale(100%); transition: filter 0.3s;"'
html = html.replace(old_p3, new_p3)

old_p4 = '<img src="images/partner4.svg" alt="Family Services" style="max-width: 150px; filter: grayscale(100%); transition: filter 0.3s;"'
new_p4 = '<img src="images/partner4.svg" alt="Family Services" style="max-width: 150px; max-height: 80px; object-fit: contain; filter: grayscale(100%); transition: filter 0.3s;"'
html = html.replace(old_p4, new_p4)

with open('community-impact.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Official partner logos applied successfully!")
