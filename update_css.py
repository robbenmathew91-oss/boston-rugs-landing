with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Remove bottom margin from .filter-title
css = css.replace('.filter-title {\n    font-size: 1.1rem;\n    color: var(--color-text);\n    margin-bottom: 1rem;\n    font-weight: 500;\n}', '.filter-title {\n    margin-bottom: 0;\n}')

# Append new styles
new_styles = """
.filter-title-btn {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: transparent;
    border: none;
    font-family: var(--font-heading);
    font-size: 1.1rem;
    color: var(--color-text);
    padding: 0;
    cursor: pointer;
    text-align: left;
    font-weight: 500;
}

.filter-icon {
    font-size: 0.8rem;
    transition: transform 0.3s ease;
}

.filter-title-btn[aria-expanded="false"] .filter-icon {
    transform: rotate(-90deg);
}

.filter-options {
    margin-top: 1rem;
    max-height: 1000px;
    opacity: 1;
    overflow: hidden;
    transition: max-height 0.4s ease, opacity 0.4s ease, margin 0.4s ease;
}

.filter-options.collapsed {
    max-height: 0;
    opacity: 0;
    margin-top: 0;
    pointer-events: none;
}
"""

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css + new_styles)
print("Updated styles.css")
