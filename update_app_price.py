import re

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. loadFiltersFromURL
js = js.replace("""                const priceParam = params.get('price');
                if (priceParam) activeFilters.price = priceParam;""",
"""                const priceParam = params.get('price');
                if (priceParam) {
                    const parts = priceParam.split('-');
                    if (parts.length === 2) {
                        activeFilters.price = { min: parseInt(parts[0]), max: parseInt(parts[1]) };
                    }
                }""")

# 2. Sync UI checkboxes and radios -> Replace radio sync with slider sync
js = re.sub(
r"""                document\.querySelectorAll\('\.filter-options input\[type="radio"\]'\)\.forEach\(radio => \{[\s\S]*?\}\);""",
"""                const priceMin = document.getElementById('price-min');
                const priceMax = document.getElementById('price-max');
                if (priceMin && priceMax) {
                    if (activeFilters.price) {
                        priceMin.value = activeFilters.price.min;
                        priceMax.value = activeFilters.price.max;
                    } else {
                        priceMin.value = 0;
                        priceMax.value = 10000;
                    }
                    if (typeof updatePriceUI === 'function') updatePriceUI();
                }""", js)

# 3. attachFilterEvents -> Remove radio listeners, add slider listeners
js = re.sub(
r"""                const radioButtons = document\.querySelectorAll\('\.filter-options input\[type="radio"\]'\);[\s\S]*?\}\);[\s\S]*?\}\);""",
"""                // Price Slider Logic
                const priceMin = document.getElementById('price-min');
                const priceMax = document.getElementById('price-max');
                const priceDisplay = document.getElementById('price-display');
                const priceTrack = document.getElementById('price-range-track');

                window.updatePriceUI = () => {
                    if (!priceMin || !priceMax) return;
                    let minVal = parseInt(priceMin.value);
                    let maxVal = parseInt(priceMax.value);

                    if (minVal > maxVal) {
                        let tmp = minVal;
                        minVal = maxVal;
                        maxVal = tmp;
                    }

                    if (priceDisplay) {
                        priceDisplay.innerHTML = `$${minVal.toLocaleString()} &mdash; $${maxVal >= 10000 ? '10,000+' : maxVal.toLocaleString()}`;
                    }

                    if (priceTrack) {
                        const minPercent = (minVal / 10000) * 100;
                        const maxPercent = (maxVal / 10000) * 100;
                        priceTrack.style.left = `${minPercent}%`;
                        priceTrack.style.right = `${100 - maxPercent}%`;
                    }
                };

                const handlePriceChange = () => {
                    let minVal = parseInt(priceMin.value);
                    let maxVal = parseInt(priceMax.value);
                    
                    if (minVal > maxVal) {
                        let tmp = minVal;
                        minVal = maxVal;
                        maxVal = tmp;
                        priceMin.value = minVal;
                        priceMax.value = maxVal;
                    }

                    activeFilters.price = { min: minVal, max: maxVal };
                    updateURL();
                    renderGrid();
                };

                if (priceMin && priceMax) {
                    priceMin.addEventListener('input', window.updatePriceUI);
                    priceMax.addEventListener('input', window.updatePriceUI);
                    
                    priceMin.addEventListener('change', handlePriceChange);
                    priceMax.addEventListener('change', handlePriceChange);
                    
                    window.updatePriceUI();
                }""", js)

# 4. updateURL
js = js.replace("""if (activeFilters.price) params.set('price', activeFilters.price);""",
"""if (activeFilters.price && (activeFilters.price.min > 0 || activeFilters.price.max < 10000)) {
                    params.set('price', `${activeFilters.price.min}-${activeFilters.price.max}`);
                }""")

# 5. clearFiltersBtn
js = js.replace("""                        document.querySelectorAll('.filter-options input[type="radio"]').forEach(radio => radio.checked = false);""",
"""                        const priceMin = document.getElementById('price-min');
                        const priceMax = document.getElementById('price-max');
                        if (priceMin && priceMax) {
                            priceMin.value = 0;
                            priceMax.value = 10000;
                            if (typeof window.updatePriceUI === 'function') window.updatePriceUI();
                        }""")

# 6. renderGrid Price Filter logic
js = re.sub(
r"""                // Apply Price[\s\S]*?\}\);[\s\S]*?\}""",
"""                // Apply Price
                if (activeFilters.price) {
                    filteredRugs = filteredRugs.filter(rug => {
                        const price = rug.price;
                        const min = activeFilters.price.min;
                        const max = activeFilters.price.max;
                        
                        if (price < min) return false;
                        if (max < 10000 && price > max) return false;
                        return true;
                    });
                }""", js)


with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated app.js")
