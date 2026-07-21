with open('styles.css', 'r', encoding='utf-8') as f:
    content = f.read()

import re
keyframes = re.findall(r'@keyframes\s+([a-zA-Z0-9_-]+)', content)
print("Keyframes defined:")
for k in keyframes:
    print(f"  {k}")
    # Search for usage of this animation name in styles.css
    # (e.g. animation: name ... or animation-name: name)
    usage = re.findall(rf'\banimation\s*:[^;]*\b{k}\b|\banimation-name\s*:\s*\b{k}\b', content)
    print(f"    Usage count: {len(usage)}")
