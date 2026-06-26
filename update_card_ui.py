import re

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace the innerHTML of the card
old_html = """                        <img src="${imgSrc}" alt="${rug.name}" class="rug-card-image" loading="lazy">
                        <div class="rug-card-content">
                            <div class="rug-card-header">
                                <h2 class="rug-card-title">${rug.name}</h2>
                                <span class="rug-card-origin">${rug.origin}</span>
                            </div>"""

new_html = """                        <div class="rug-card-img-wrapper">
                            <img src="${imgSrc}" alt="${rug.name}" class="rug-card-image" loading="lazy">
                        </div>
                        <div class="rug-card-content">
                            <div class="rug-card-header">
                                <h2 class="rug-card-title"><a href="rug-detail.html?slug=${rug.slug}" class="stretched-link">${rug.name}</a></h2>
                                <span class="rug-card-origin">${rug.origin}</span>
                            </div>"""

if old_html in js:
    js = js.replace(old_html, new_html)
else:
    print("Warning: old_html not found in app.js! Attempting regex...")
    js = re.sub(
        r'<img src="\$\{imgSrc\}" alt="\$\{rug\.name\}" class="rug-card-image" loading="lazy">\s*<div class="rug-card-content">\s*<div class="rug-card-header">\s*<h2 class="rug-card-title">\$\{rug\.name\}</h2>\s*<span class="rug-card-origin">\$\{rug\.origin\}</span>\s*</div>',
        new_html,
        js
    )

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated app.js")

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace(
""".rug-card {
    background: var(--color-card-bg);
    border: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}""",
""".rug-card {
    background: var(--color-card-bg);
    border: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}"""
)

css = css.replace(
""".rug-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}""",
""".rug-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
}"""
)

css = css.replace(
""".rug-card-image {
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
    border-bottom: 1px solid var(--color-border);
}""",
""".rug-card-img-wrapper {
    overflow: hidden;
    aspect-ratio: 4/3;
    border-bottom: 1px solid var(--color-border);
}
.rug-card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}
.rug-card:hover .rug-card-image {
    transform: scale(1.05);
}"""
)

css = css.replace(
""".rug-card-origin {
    font-size: 0.85rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: block;
    min-height: 2.2rem;
}""",
""".rug-card-origin {
    font-size: 0.85rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.03em;
    display: block;
    min-height: 1.8rem;
}"""
)

css = css.replace(
""".rug-card-spec-item {
    display: grid;
    grid-template-columns: 85px 1fr;
    gap: 0.5rem;
    align-items: flex-start;
    padding: 0.6rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    font-size: 0.9rem;
}""",
""".rug-card-spec-item {
    display: grid;
    grid-template-columns: 85px 1fr;
    gap: 0.8rem;
    align-items: flex-start;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    font-size: 0.9rem;
}"""
)

css = css.replace(
""".rug-card-spec-value {
    color: var(--color-text);
    font-weight: 500;
}""",
""".rug-card-spec-value {
    color: var(--color-text);
    font-weight: 500;
    line-height: 1.4;
    word-break: break-word;
}"""
)

css = css.replace(
""".rug-card-price {
    font-size: 1.2rem;
    color: var(--color-primary);
    font-weight: 600;
}""",
""".rug-card-price {
    font-size: 1.25rem;
    color: var(--color-primary);
    font-weight: 700;
}"""
)

css = css.replace(
""".rug-card-btn {
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
}""",
""".rug-card-btn {
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
    position: relative;
    z-index: 2;
}"""
)

# Append Stretched Link CSS
css += """
/* Stretched link for making the whole card clickable */
.stretched-link {
    color: inherit;
    text-decoration: none;
}
.stretched-link::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
}
"""

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("Updated styles.css")
