import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Fix rug-card-footer
css = css.replace(
""".rug-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border);
}""",
""".rug-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border);
    gap: 1rem;
    flex-wrap: wrap;
}"""
)

# Fix rug-card-btn
css = css.replace(
""".rug-card-btn {
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
    position: relative;
    z-index: 2;
}""",
""".rug-card-btn {
    font-size: 0.85rem;
    padding: 0.5rem 0.85rem;
    position: relative;
    z-index: 2;
    margin-left: auto;
    flex-shrink: 0;
}"""
)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("Updated styles.css footer layout")
