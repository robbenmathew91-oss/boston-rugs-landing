import re

with open('rugs-for-sale.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_price_html = """                    <div id="filter-price" class="filter-options">

                        <label class="filter-label"><input type="radio" name="price" value="under-1k"> <span>Under $1,000</span></label>
                        <label class="filter-label"><input type="radio" name="price" value="1k-2.5k"> <span>$1,000 &ndash; $2,500</span></label>
                        <label class="filter-label"><input type="radio" name="price" value="2.5k-5k"> <span>$2,500 &ndash; $5,000</span></label>
                        <label class="filter-label"><input type="radio" name="price" value="above-5k"> <span>Above $5,000</span></label>
                    
                    </div>"""
                    
# Note: we might not match exactly due to whitespace, so let's use regex
pattern = r'<div id="filter-price" class="filter-options">.*?</div>'

new_price_html = """<div id="filter-price" class="filter-options">
                        <div class="price-slider-container">
                            <div class="price-display" id="price-display">$0 &mdash; $10,000+</div>
                            <div class="range-slider">
                                <div class="range-track" id="price-range-track"></div>
                                <input type="range" id="price-min" min="0" max="10000" step="100" value="0">
                                <input type="range" id="price-max" min="0" max="10000" step="100" value="10000">
                            </div>
                        </div>
                    </div>"""

html = re.sub(pattern, new_price_html, html, flags=re.DOTALL)

with open('rugs-for-sale.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated price filter HTML")
