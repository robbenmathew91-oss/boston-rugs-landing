import os
import re

nav_html = """            <nav class="nav">
                <ul class="nav-list">
                    <li><a href="index.html" class="nav-link">Home</a></li>
                    <li class="dropdown">
                        <a href="#" class="nav-link">Services <i class="fa-solid fa-chevron-down" style="font-size: 0.8em; margin-left: 4px;"></i></a>
                        <ul class="dropdown-menu">
                            <li><a href="rug-cleaning.html" class="dropdown-item">Rug Cleaning</a></li>
                            <li><a href="rug-restoration.html" class="dropdown-item">Rug Restoration</a></li>
                            <li><a href="rug-restoration.html" class="dropdown-item">Rug Repair</a></li>
                            <li><a href="rug-appraisals.html" class="dropdown-item">Rug Appraisal</a></li>
                        </ul>
                    </li>
                    <li><a href="gallery.html" class="nav-link">Rugs for Sale</a></li>
                    <li><a href="index.html#charity" class="nav-link">Community Impact</a></li>
                    <li><a href="index.html#heritage" class="nav-link">About</a></li>
                    <li><a href="index.html#contact" class="nav-link">Contact</a></li>
                </ul>
            </nav>"""

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace everything between <nav class="nav"> and </nav>
    new_content = re.sub(r'<nav class="nav">.*?</nav>', nav_html, content, flags=re.DOTALL)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(new_content)
        
print("Fixed malformed nav HTML in all files.")
