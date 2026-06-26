with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace(""".reveal.revealed {
    opacity: 1;
    transform: translateY(0);
}""", """.reveal.revealed {
    opacity: 1;
    transform: none;
}""")

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("Updated styles.css reveal class")
