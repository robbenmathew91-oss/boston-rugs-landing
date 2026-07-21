import re
import os
import collections
import sys

workspace_path = r"c:\Users\Robbe\.gemini\antigravity\scratch\boston-rugs-landing"
styles_css_path = os.path.join(workspace_path, "styles.css")
warm_css_path = os.path.join(workspace_path, "theme-warm-luxury.css")

def remove_comments(css_text):
    return re.sub(r'/\*.*?\*/', '', css_text, flags=re.DOTALL)

def parse_css(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    clean_content = remove_comments(content)
    
    def extract_blocks(text, parent_media=None):
        blocks = []
        pattern = re.compile(r'([^{]+)\{', re.MULTILINE)
        start = 0
        while True:
            match = pattern.search(text, start)
            if not match:
                break
            
            header = match.group(1).strip()
            block_start = match.end()
            
            brace_count = 1
            idx = block_start
            while idx < len(text) and brace_count > 0:
                if text[idx] == '{':
                    brace_count += 1
                elif text[idx] == '}':
                    brace_count -= 1
                idx += 1
            
            block_content = text[block_start:idx-1].strip()
            
            if header.startswith('@media'):
                blocks.extend(extract_blocks(block_content, header))
            elif header.startswith('@keyframes') or header.startswith('@-webkit-keyframes'):
                blocks.append({
                    'type': 'keyframes',
                    'header': header,
                    'media': parent_media,
                    'content': block_content
                })
            elif header.startswith('@font-face') or header.startswith('@import'):
                blocks.append({
                    'type': 'at-rule',
                    'header': header,
                    'media': parent_media,
                    'content': block_content
                })
            else:
                blocks.append({
                    'type': 'rule',
                    'selectors': [s.strip() for s in header.split(',')],
                    'header': header,
                    'media': parent_media,
                    'content': block_content
                })
            
            start = idx
        return blocks

    return extract_blocks(clean_content), content

def safe_print(msg):
    sys.stdout.buffer.write((msg + "\n").encode('ascii', errors='replace'))

def audit_file(file_path):
    safe_print(f"\n========================================\nAUDITING: {os.path.basename(file_path)}\n========================================")
    blocks, raw_content = parse_css(file_path)
    
    defined_vars = set()
    used_vars = set()
    
    var_def_pattern = re.compile(r'(--[a-zA-Z0-9_-]+)\s*:')
    var_use_pattern = re.compile(r'var\(\s*(--[a-zA-Z0-9_-]+)')
    
    for block in blocks:
        if block['type'] == 'rule':
            decls = [d.strip() for d in block['content'].split(';') if d.strip()]
            for decl in decls:
                if ':' in decl:
                    prop, val = decl.split(':', 1)
                    prop = prop.strip()
                    val = val.strip()
                    
                    if prop.startswith('--'):
                        defined_vars.add(prop)
                        
                    for m in var_use_pattern.finditer(val):
                        used_vars.add(m.group(1))
                        
    selector_counts = collections.defaultdict(list)
    for block in blocks:
        if block['type'] == 'rule':
            media = block['media']
            for sel in block['selectors']:
                key = (media, sel)
                selector_counts[key].append(block)
                
    duplicates = {k: v for k, v in selector_counts.items() if len(v) > 1}
    safe_print(f"\n--- DUPLICATE SELECTORS ({len(duplicates)} found) ---")
    for (media, sel), instances in duplicates.items():
        media_str = f" in {media}" if media else ""
        safe_print(f"Selector '{sel}'{media_str} defined {len(instances)} times:")
        for idx, inst in enumerate(instances, 1):
            safe_print(f"  Instance {idx}:")
            safe_print(f"    {inst['content']}")
            
    safe_print(f"\n--- VARIABLES AUDIT ---")
    safe_print(f"Defined Variables ({len(defined_vars)}):")
    for v in sorted(defined_vars):
        safe_print(f"  {v}")
        
    safe_print(f"Used Variables ({len(used_vars)}):")
    for v in sorted(used_vars):
        safe_print(f"  {v}")
        
    undefined = used_vars - defined_vars
    safe_print(f"\nUndefined variables used ({len(undefined)}):")
    for v in sorted(undefined):
        safe_print(f"  {v}")
        
    unused = defined_vars - used_vars
    safe_print(f"\nUnused variables defined ({len(unused)}):")
    for v in sorted(unused):
        safe_print(f"  {v}")

    safe_print(f"\n--- DUPLICATE DECLARATIONS INSIDE RULES ---")
    duplicate_decl_count = 0
    for block in blocks:
        if block['type'] == 'rule':
            decls = [d.strip() for d in block['content'].split(';') if d.strip()]
            props = []
            prop_vals = {}
            for decl in decls:
                if ':' in decl:
                    prop, val = decl.split(':', 1)
                    prop = prop.strip()
                    val = val.strip()
                    props.append(prop)
                    if prop in prop_vals:
                        if prop_vals[prop] == val:
                            safe_print(f"Duplicate EXACT declaration in selector {block['header']}: {prop}: {val}")
                        else:
                            safe_print(f"Override declaration in selector {block['header']}: {prop}: {prop_vals[prop]} overridden by {val}")
                        duplicate_decl_count += 1
                    prop_vals[prop] = val
    safe_print(f"Total duplicate/override declarations inside rules: {duplicate_decl_count}")

audit_file(styles_css_path)
audit_file(warm_css_path)
