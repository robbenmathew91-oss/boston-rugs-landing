import re

html_path = 'community-impact.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('href="contact.html?subject=Donate+Clothing"', 'href="index.html?interest=donate-clothing#contact"')
html = html.replace('href="contact.html?subject=Volunteer"', 'href="index.html?interest=volunteer#contact"')
html = html.replace('href="contact.html?subject=Request+Pickup"', 'href="index.html?interest=contact-team#contact"')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

js_path = 'app.js'
with open(js_path, 'a', encoding='utf-8') as f:
    f.write('''
// Auto-select Request Type from URL Parameters
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const interestParam = urlParams.get('interest');
    
    if (interestParam) {
        const interestSelect = document.getElementById('interest');
        if (interestSelect) {
            // Check if the option exists
            const optionExists = Array.from(interestSelect.options).some(opt => opt.value === interestParam);
            if (optionExists) {
                interestSelect.value = interestParam;
            }
        }
    }
});
''')

print("Successfully updated links and app.js")
