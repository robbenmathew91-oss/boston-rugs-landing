import os
import re

footer_html = """    <footer class="footer">
        <div class="container footer-content">
            <div class="footer-brand">
                <a href="index.html" class="logo">
                    <span class="logo-text">NOOR ORIENTAL</span>
                    <span class="logo-subtext">RUGS</span>
                </a>
                <p>Purveyors of fine, hand-woven luxury textiles. Built on trust, legacy, and three centuries of family artistry.</p>
            </div>
            
            <div class="footer-links">
                <h3><a href="rugs-for-sale.html" style="color: inherit; text-decoration: none;">Rugs for Sale</a></h3>
                <ul>
                    <li><a href="rugs-for-sale.html?collection=Beacon%20Hill">Beacon Hill Collection</a></li>
                    <li><a href="rugs-for-sale.html?collection=Seaport">Seaport Collection</a></li>
                    <li><a href="rugs-for-sale.html?collection=Back%20Bay">Back Bay Collection</a></li>
                    <li><a href="rugs-for-sale.html">Browse All Rugs</a></li>
                </ul>
            </div>
            
            <div class="footer-links">
                <h3>Services</h3>
                <ul>
                    <li><a href="rug-cleaning.html">Rug Cleaning</a></li>
                    <li><a href="rug-restoration.html">Rug Restoration & Repair</a></li>
                    <li><a href="rug-appraisals.html">Rug Appraisal</a></li>
                    <li><a href="index.html#contact">Trade Program</a></li>
                </ul>
            </div>

            <div class="footer-links">
                <h3>Company</h3>
                <ul>
                    <li><a href="index.html#heritage">About</a></li>
                    <li><a href="index.html#charity">Community Impact</a></li>
                    <li><a href="blog.html">Knowledge Center</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Sitemap</a></li>
                </ul>
            </div>
        </div>
        
        <div class="footer-bottom text-center">
            <div class="container">
                <p>&copy; 2026 Noor Oriental Rugs. All Rights Reserved. &nbsp;&nbsp;|&nbsp;&nbsp; <a href="#" style="color: inherit; text-decoration: none;">Privacy Policy</a> &nbsp;&nbsp;|&nbsp;&nbsp; <a href="#" style="color: inherit; text-decoration: none;">Terms</a> &nbsp;&nbsp;|&nbsp;&nbsp; <a href="#" style="color: inherit; text-decoration: none;">Sitemap</a></p>
            </div>
        </div>
    </footer>"""

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace everything between <footer class="footer"> and </footer>
    new_content = re.sub(r'<footer class="footer">.*?</footer>', footer_html, content, flags=re.DOTALL)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(new_content)

print("Updated footer in all HTML files.")
