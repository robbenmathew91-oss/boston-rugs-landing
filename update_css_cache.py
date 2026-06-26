import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    new_content = re.sub(r'<link rel="stylesheet" href="styles\.css[^"]*">', '<link rel="stylesheet" href="styles.css?v=1.0.9">', content)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(new_content)
        
print("Updated styles.css version to 1.0.9 in all HTML files.")
