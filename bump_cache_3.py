import re

with open('rugs-for-sale.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'styles\.css\?v=[\d\.]+', 'styles.css?v=1.0.12', content)

with open('rugs-for-sale.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Bumped cache version for styles.css in rugs-for-sale.html")
