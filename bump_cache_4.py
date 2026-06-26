import re

with open('rugs-for-sale.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'app\.js\?v=\d+', 'app.js?v=5', content)
content = re.sub(r'styles\.css\?v=[\d\.]+', 'styles.css?v=1.0.13', content)

with open('rugs-for-sale.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Bumped cache versions in rugs-for-sale.html")
