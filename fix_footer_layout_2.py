import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Fix rug-card-footer to not wrap, and keep space-between
css = css.replace(
""".rug-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border);
    gap: 1rem;
    flex-wrap: wrap;
}""",
""".rug-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border);
    gap: 0.5rem;
}"""
)

# Further reduce button padding so it fits on same line
css = css.replace(
""".rug-card-btn {
    font-size: 0.85rem;
    padding: 0.5rem 0.85rem;
    position: relative;
    z-index: 2;
    margin-left: auto;
    flex-shrink: 0;
}""",
""".rug-card-btn {
    font-size: 0.85rem;
    padding: 0.45rem 0.75rem;
    position: relative;
    z-index: 2;
    flex-shrink: 1;
}"""
)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("Updated styles.css footer layout (no wrap)")
