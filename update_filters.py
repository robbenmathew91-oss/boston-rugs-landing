import re

with open('rugs-for-sale.html', 'r', encoding='utf-8') as file:
    content = file.read()

# Replace existing filter-groups (Style, Size, Material, Price)
# Add Collection before Style
collection_html = """
                <div class="filter-group">
                    <h3 class="filter-title">
                        <button class="filter-title-btn" aria-expanded="true" aria-controls="filter-collection">
                            <span>Collection</span>
                            <i class="fa-solid fa-chevron-down filter-icon"></i>
                        </button>
                    </h3>
                    <div id="filter-collection" class="filter-options">
                        <!-- JS injects checkboxes -->
                    </div>
                </div>"""

def replace_filter(match):
    title = match.group(1)
    id_name = match.group(2)
    inner = match.group(3)
    return f"""                <div class="filter-group">
                    <h3 class="filter-title">
                        <button class="filter-title-btn" aria-expanded="true" aria-controls="{id_name}">
                            <span>{title}</span>
                            <i class="fa-solid fa-chevron-down filter-icon"></i>
                        </button>
                    </h3>
                    <div id="{id_name}" class="filter-options">
{inner}
                    </div>
                </div>"""

# Match existing filter groups
# <div class="filter-group">\s*<h3 class="filter-title">(.*?)</h3>\s*<div id="(.*?)" class="filter-options">([\s\S]*?)</div>\s*</div>
pattern = r'<div class="filter-group">\s*<h3 class="filter-title">(.*?)</h3>\s*<div id="(.*?)" class="filter-options">([\s\S]*?)</div>\s*</div>'

new_content = re.sub(pattern, replace_filter, content)

# Inject collection filter before Style
new_content = new_content.replace(
    '<div class="filter-group">\n                    <h3 class="filter-title">\n                        <button class="filter-title-btn" aria-expanded="true" aria-controls="filter-style">',
    collection_html + '\n                <div class="filter-group">\n                    <h3 class="filter-title">\n                        <button class="filter-title-btn" aria-expanded="true" aria-controls="filter-style">'
)

with open('rugs-for-sale.html', 'w', encoding='utf-8') as file:
    file.write(new_content)
print("Updated rugs-for-sale.html")
