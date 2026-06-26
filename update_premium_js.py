import re

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Update renderCheckboxes
js = re.sub(
    r'<input type="checkbox" value="\$\{item\}" data-filter-type="\$\{filterType\}">\s*<span>\$\{item\}</span>',
    """<input type="checkbox" value="${item}" data-filter-type="${filterType}">
                        <div class="checkbox-custom"></div>
                        <span class="filter-name">${item}</span>
                        <span class="filter-count">(0)</span>""",
    js
)

# 2. Add renderFilterChips and updateFilterCounts functions inside renderGrid
render_functions = """
                const updateFilterCounts = () => {
                    const checkboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
                    checkboxes.forEach(cb => {
                        const filterType = cb.getAttribute('data-filter-type');
                        const value = cb.value;
                        let count = 0;
                        allRugs.forEach(rug => {
                            let matchesOther = true;
                            if (filterType !== 'collection' && activeFilters.collection.size > 0 && !activeFilters.collection.has(rug.collection)) matchesOther = false;
                            if (filterType !== 'style' && activeFilters.style.size > 0 && !activeFilters.style.has(rug.style)) matchesOther = false;
                            if (filterType !== 'size' && activeFilters.size.size > 0 && !activeFilters.size.has(rug.size)) matchesOther = false;
                            if (filterType !== 'material' && activeFilters.material.size > 0 && !activeFilters.material.has(rug.material)) matchesOther = false;
                            if (activeFilters.price) {
                                if (rug.price < activeFilters.price.min) matchesOther = false;
                                if (activeFilters.price.max < 10000 && rug.price > activeFilters.price.max) matchesOther = false;
                            }
                            if (matchesOther && rug[filterType] === value) count++;
                        });
                        
                        const countSpan = cb.parentElement.querySelector('.filter-count');
                        if (countSpan) countSpan.textContent = `(${count})`;
                    });
                };

                const renderFilterChips = () => {
                    let chipContainer = document.getElementById('active-filter-chips');
                    if (!chipContainer) {
                        const inventoryHeader = document.querySelector('.inventory-results-header');
                        if (inventoryHeader) {
                            chipContainer = document.createElement('div');
                            chipContainer.id = 'active-filter-chips';
                            chipContainer.className = 'active-filter-chips';
                            inventoryHeader.parentNode.insertBefore(chipContainer, inventoryHeader.nextSibling);
                        } else return;
                    }
                    
                    chipContainer.innerHTML = '';
                    let hasFilters = false;
                    
                    const addChip = (text, type, val) => {
                        hasFilters = true;
                        const chip = document.createElement('div');
                        chip.className = 'filter-chip';
                        chip.innerHTML = `<span>${text}</span> <i class="fa-solid fa-xmark"></i>`;
                        chip.addEventListener('click', () => {
                            if (type === 'price') {
                                activeFilters.price = null;
                                const priceMin = document.getElementById('price-min');
                                const priceMax = document.getElementById('price-max');
                                if (priceMin && priceMax) {
                                    priceMin.value = 0; priceMax.value = 10000;
                                    if (typeof window.updatePriceUI === 'function') window.updatePriceUI();
                                }
                            } else {
                                activeFilters[type].delete(val);
                                const cb = document.querySelector(`.filter-options input[data-filter-type="${type}"][value="${val}"]`);
                                if (cb) cb.checked = false;
                            }
                            updateURL();
                            renderGrid();
                        });
                        chipContainer.appendChild(chip);
                    };

                    activeFilters.collection.forEach(val => addChip(val, 'collection', val));
                    activeFilters.style.forEach(val => addChip(val, 'style', val));
                    activeFilters.size.forEach(val => addChip(val, 'size', val));
                    activeFilters.material.forEach(val => addChip(val, 'material', val));
                    
                    if (activeFilters.price && (activeFilters.price.min > 0 || activeFilters.price.max < 10000)) {
                        const minStr = activeFilters.price.min.toLocaleString();
                        const maxStr = activeFilters.price.max >= 10000 ? '10,000+' : activeFilters.price.max.toLocaleString();
                        addChip(`Price: $${minStr}–$${maxStr}`, 'price', null);
                    }

                    if (hasFilters) {
                        const clearBtn = document.createElement('div');
                        clearBtn.className = 'filter-chip clear-all';
                        clearBtn.textContent = 'Clear All';
                        clearBtn.addEventListener('click', () => {
                            const clearSidebarBtn = document.getElementById('clear-filters');
                            if (clearSidebarBtn) clearSidebarBtn.click();
                        });
                        chipContainer.appendChild(clearBtn);
                    }
                };

                updateFilterCounts();
                renderFilterChips();
"""

js = js.replace("""// Apply Price
                if (activeFilters.price) {
                    filteredRugs = filteredRugs.filter(rug => {
                        const price = rug.price;
                        const min = activeFilters.price.min;
                        const max = activeFilters.price.max;
                        
                        if (price < min) return false;
                        if (max < 10000 && price > max) return false;
                        return true;
                    });
                }""", """// Apply Price
                if (activeFilters.price) {
                    filteredRugs = filteredRugs.filter(rug => {
                        const price = rug.price;
                        const min = activeFilters.price.min;
                        const max = activeFilters.price.max;
                        
                        if (price < min) return false;
                        if (max < 10000 && price > max) return false;
                        return true;
                    });
                }
""" + render_functions)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated app.js")
