import re

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Update activeFilters to include collection as Set
js = js.replace(
"""        let activeFilters = {
            style: new Set(),
            size: new Set(),
            material: new Set(),
            price: null,
            collection: null
        };""",
"""        let activeFilters = {
            collection: new Set(),
            style: new Set(),
            size: new Set(),
            material: new Set(),
            price: null
        };"""
)

# 2. Add collection extraction
js = js.replace(
"""            const styles = new Set();
            const sizes = new Set();
            const materials = new Set();
            
            rugs.forEach(rug => {
                if (rug.style) styles.add(rug.style);
                if (rug.size) sizes.add(rug.size);
                if (rug.material) materials.add(rug.material);
            });""",
"""            const collections = new Set();
            const styles = new Set();
            const sizes = new Set();
            const materials = new Set();
            
            rugs.forEach(rug => {
                if (rug.collection) collections.add(rug.collection);
                if (rug.style) styles.add(rug.style);
                if (rug.size) sizes.add(rug.size);
                if (rug.material) materials.add(rug.material);
            });"""
)

# 3. Add renderCheckboxes for collection
js = js.replace(
"""            renderCheckboxes(filterStyleContainer, styles, 'style');""",
"""            const filterCollectionContainer = document.getElementById('filter-collection');
            renderCheckboxes(filterCollectionContainer, collections, 'collection');
            renderCheckboxes(filterStyleContainer, styles, 'style');"""
)

# 4. updateURL collection handling
js = js.replace(
"""                if (activeFilters.collection) params.set('collection', activeFilters.collection);""",
"""                if (activeFilters.collection.size > 0) params.set('collection', Array.from(activeFilters.collection).join(','));"""
)

# 5. loadFiltersFromURL collection handling
js = js.replace(
"""                activeFilters.collection = null;""",
"""                activeFilters.collection.clear();"""
)
js = js.replace(
"""                const collectionParam = params.get('collection');
                if (collectionParam) activeFilters.collection = collectionParam;""",
"""                const collectionParam = params.get('collection');
                if (collectionParam) collectionParam.split(',').forEach(c => activeFilters.collection.add(c));"""
)

# 6. Clear filters collection reset
js = js.replace(
"""                        activeFilters.price = null;
                        activeFilters.collection = null;""",
"""                        activeFilters.price = null;
                        activeFilters.collection.clear();"""
)

# 7. Apply Collection (Deep Link) filter logic
js = js.replace(
"""                // Apply Collection (Deep Link)
                if (activeFilters.collection) {
                    filteredRugs = filteredRugs.filter(rug => rug.collection && rug.collection.toLowerCase().includes(activeFilters.collection.toLowerCase()));
                }""",
"""                // Apply Collection
                if (activeFilters.collection.size > 0) {
                    filteredRugs = filteredRugs.filter(rug => activeFilters.collection.has(rug.collection));
                }"""
)

# 8. Add Collapsible UI Logic at the end of inventoryManager.fetchInventory().then(rugs => { ... })
collapsible_logic = """
            // 5. Collapsible Filter Sections
            const filterTitleBtns = document.querySelectorAll('.filter-title-btn');
            const isMobile = window.innerWidth <= 768;
            
            filterTitleBtns.forEach(btn => {
                const controlsId = btn.getAttribute('aria-controls');
                const content = document.getElementById(controlsId);
                if (!content) return;
                
                if (isMobile) {
                    btn.setAttribute('aria-expanded', 'false');
                    content.classList.add('collapsed');
                } else {
                    btn.setAttribute('aria-expanded', 'true');
                    content.classList.remove('collapsed');
                }

                btn.addEventListener('click', () => {
                    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
                    if (isExpanded) {
                        btn.setAttribute('aria-expanded', 'false');
                        content.classList.add('collapsed');
                    } else {
                        btn.setAttribute('aria-expanded', 'true');
                        content.classList.remove('collapsed');
                    }
                });
            });
"""

# We can insert this right before "            // Initial Render\n            loadFiltersFromURL();"
js = js.replace(
"""            // Initial Render
            loadFiltersFromURL();""",
collapsible_logic + """
            // Initial Render
            loadFiltersFromURL();"""
)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated app.js")
