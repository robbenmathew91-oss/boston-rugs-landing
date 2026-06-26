import re

# Update app.js
with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace renderCheckboxes sorting logic
old_render = """            // 2. Render Checkboxes
            const renderCheckboxes = (container, items, filterType) => {
                if (!container) return;
                Array.from(items).sort().forEach(item => {
                    const label = document.createElement('label');
                    label.className = 'filter-label';
                    label.innerHTML = `<input type="checkbox" value="${item}" data-filter-type="${filterType}"> <span>${item}</span>`;
                    container.appendChild(label);
                });
            };"""

new_render = """            // 2. Render Checkboxes
            const renderCheckboxes = (container, items, filterType) => {
                if (!container) return;
                
                let sortedItems = Array.from(items);
                if (filterType === 'size') {
                    const sizeOrder = [
                        'Runner',
                        "3' x 5'",
                        "4' x 6'",
                        "5' x 8'",
                        "6' x 9'",
                        "8' x 10'",
                        "9' x 12'",
                        "10' x 14'",
                        "Oversized"
                    ];
                    sortedItems.sort((a, b) => {
                        let idxA = sizeOrder.indexOf(a);
                        let idxB = sizeOrder.indexOf(b);
                        if (idxA === -1) idxA = 999;
                        if (idxB === -1) idxB = 999;
                        if (idxA === idxB) return a.localeCompare(b);
                        return idxA - idxB;
                    });
                } else {
                    sortedItems.sort();
                }
                
                sortedItems.forEach(item => {
                    const label = document.createElement('label');
                    label.className = 'filter-label';
                    label.innerHTML = `<input type="checkbox" value="${item}" data-filter-type="${filterType}"> <span>${item}</span>`;
                    container.appendChild(label);
                });
            };"""

if old_render in js:
    js = js.replace(old_render, new_render)
else:
    print("Warning: old_render not found in app.js! Attempting regex...")
    # Attempt fallback if spacing is different
    js = re.sub(
        r'// 2\. Render Checkboxes[\s\S]*?const renderCheckboxes = [\s\S]*?Array\.from\(items\)\.sort\(\)\.forEach\(item => \{[\s\S]*?container\.appendChild\(label\);\s*\}\);\s*\};',
        new_render,
        js
    )

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated app.js")

# Update styles.css
with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace(
""".filter-label {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 0.95rem;
    color: var(--color-text-muted);
    cursor: pointer;
    transition: var(--transition-quick);
}""",
""".filter-label {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    font-size: 0.95rem;
    color: var(--color-text-muted);
    cursor: pointer;
    transition: var(--transition-quick);
    line-height: 1.4;
}"""
)

css = css.replace(
""".filter-label input[type="checkbox"],
.filter-label input[type="radio"] {
    accent-color: var(--color-primary);
    width: 16px;
    height: 16px;
    cursor: pointer;
}""",
""".filter-label input[type="checkbox"],
.filter-label input[type="radio"] {
    accent-color: var(--color-primary);
    width: 16px;
    height: 16px;
    cursor: pointer;
    flex-shrink: 0;
    margin-top: 2px;
}"""
)

css = css.replace(
""".filter-group {
    margin-bottom: 2rem;
}""",
""".filter-group {
    margin-bottom: 2.5rem;
}"""
)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("Updated styles.css")
