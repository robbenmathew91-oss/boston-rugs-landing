with open('styles.css', 'a', encoding='utf-8') as f:
    f.write("""
/* Premium Filter Additions */
.active-filter-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-bottom: 2rem;
}
.filter-chip {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.4rem 1rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--color-border);
    border-radius: 20px;
    font-size: 0.85rem;
    color: var(--color-text);
    cursor: pointer;
    transition: var(--transition-quick);
}
.filter-chip:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--color-primary);
}
.filter-chip i {
    font-size: 0.8rem;
    color: var(--color-text-muted);
}
.filter-chip:hover i {
    color: var(--color-text);
}
.filter-chip.clear-all {
    background: transparent;
    border-color: transparent;
    text-decoration: underline;
    color: var(--color-text-muted);
    padding-left: 0.2rem;
    padding-right: 0.2rem;
}
.filter-chip.clear-all:hover {
    color: var(--color-text);
    background: transparent;
    border-color: transparent;
}

/* Custom Checkbox */
.filter-label {
    position: relative;
    user-select: none;
}
.filter-label input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}
.checkbox-custom {
    width: 18px;
    height: 18px;
    background-color: transparent;
    border: 1px solid var(--color-border);
    border-radius: 3px;
    margin-top: 2px;
    flex-shrink: 0;
    position: relative;
    transition: var(--transition-quick);
}
.filter-label:hover .checkbox-custom {
    border-color: var(--color-primary);
}
.filter-label input[type="checkbox"]:checked ~ .checkbox-custom {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
}
.checkbox-custom:after {
    content: "";
    position: absolute;
    display: none;
}
.filter-label input[type="checkbox"]:checked ~ .checkbox-custom:after {
    display: block;
}
.filter-label .checkbox-custom:after {
    left: 5px;
    top: 1px;
    width: 5px;
    height: 10px;
    border: solid #0b0b0b;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.filter-name {
    flex-grow: 1;
}
.filter-count {
    color: var(--color-text-muted);
    font-size: 0.85rem;
    opacity: 0.7;
    margin-left: auto;
}
""")
print("Appended premium CSS styles")
