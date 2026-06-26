with open('styles.css', 'a', encoding='utf-8') as f:
    f.write("""
/* Price Range Slider */
.price-slider-container {
    padding: 0.5rem 0 1rem;
}
.price-display {
    font-size: 0.95rem;
    color: var(--color-text);
    margin-bottom: 1.5rem;
    font-weight: 500;
    text-align: center;
}
.range-slider {
    position: relative;
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}
.range-track {
    position: absolute;
    height: 100%;
    background: var(--color-primary);
    border-radius: 4px;
    top: 0;
    left: 0%;
    right: 0%;
}
.range-slider input[type="range"] {
    position: absolute;
    width: 100%;
    height: 4px;
    top: 0;
    background: none;
    pointer-events: none;
    -webkit-appearance: none;
    margin: 0;
}
.range-slider input[type="range"]:focus {
    outline: none;
}
.range-slider input[type="range"]::-webkit-slider-thumb {
    pointer-events: auto;
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--color-primary);
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    margin-top: -6px;
}
.range-slider input[type="range"]::-moz-range-thumb {
    pointer-events: auto;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--color-primary);
    cursor: pointer;
    border: none;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
}
""")
print("Updated CSS")
