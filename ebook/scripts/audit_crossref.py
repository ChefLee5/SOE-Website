#!/usr/bin/env python3
"""
Cross-reference audit: Compare MD source word counts vs XHTML generated page word counts.
Finds pages where words were lost during generation.
"""

import re
import sys
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
PAGES_DIR = BASE_DIR / "OEBPS" / "pages"
CONTENT_DIR = BASE_DIR / "content"


def parse_md_scenes(filepath):
    """Parse a markdown file and return scenes with word counts."""
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    lines = text.split('\n')
    scenes = []
    current_scene = None
    current_count = 0
    current_words = []
    
    for line in lines:
        line = line.strip('\r')
        scene_match = re.match(r'^## Scene (\d+): (.+)$', line)
        
        if scene_match:
            if current_scene:
                scenes.append({
                    'number': current_scene[0],
                    'title': current_scene[1],
                    'word_count': current_count,
                    'words': current_words
                })
            current_scene = (int(scene_match.group(1)), scene_match.group(2))
            current_count = 0
            current_words = []
            continue
        
        if line.startswith('|') and not line.startswith('|---|') and not line.startswith('| #'):
            parts = [p.strip() for p in line.split('|')]
            parts = [p for p in parts if p]
            if len(parts) >= 2:
                try:
                    num = int(parts[0])
                    word = parts[1].strip('**').strip()
                    current_count += 1
                    current_words.append((num, word))
                except ValueError:
                    pass
    
    if current_scene:
        scenes.append({
            'number': current_scene[0],
            'title': current_scene[1],
            'word_count': current_count,
            'words': current_words
        })
    
    return scenes


def extract_xhtml_entries(filepath):
    """Extract entries from an XHTML page."""
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    entries = []
    # Generic pattern for table rows with number in first cell
    pattern = re.compile(
        r'<tr[^>]*>\s*<td[^>]*>(\d+)</td>\s*<td[^>]*>(.*?)</td>',
        re.DOTALL
    )
    for match in pattern.finditer(text):
        num = int(match.group(1))
        word = re.sub(r'<[^>]+>', '', match.group(2)).strip()
        entries.append((num, word))
    
    return entries


def slugify(title):
    """Convert a scene title to the slug used in XHTML filenames."""
    s = title.lower()
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    s = re.sub(r'\s+', '-', s.strip())
    return s


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    
    md_files = sorted(CONTENT_DIR.glob("land*.md")) + sorted(CONTENT_DIR.glob("back_*.md"))
    
    print("=" * 100)
    print("CROSS-REFERENCE AUDIT: Markdown Source vs XHTML Pages")
    print("=" * 100)
    
    total_md = 0
    total_xhtml = 0
    mismatches = []
    word_mismatches = []
    
    for md_file in md_files:
        land_prefix = md_file.stem  # e.g., "land1_harmonia"
        scenes = parse_md_scenes(md_file)
        
        # Map to XHTML land prefix
        if land_prefix.startswith("land"):
            xhtml_prefix = "land" + land_prefix[4]  # land1, land2, etc.
        else:
            xhtml_prefix = land_prefix  # back_action_verbs, etc.
        
        for scene in scenes:
            slug = slugify(scene['title'])
            
            # Try to find matching XHTML file
            xhtml_pattern = f"{xhtml_prefix}-{slug}.xhtml"
            xhtml_path = PAGES_DIR / xhtml_pattern
            
            if not xhtml_path.exists():
                # Try fuzzy match
                candidates = list(PAGES_DIR.glob(f"{xhtml_prefix}-*{slug[:15]}*.xhtml"))
                if candidates:
                    xhtml_path = candidates[0]
                else:
                    # Try broader match
                    candidates = list(PAGES_DIR.glob(f"{xhtml_prefix}-*.xhtml"))
                    # Match by scene order
                    scene_candidates = sorted(candidates)
                    if scene['number'] - 1 < len(scene_candidates):
                        xhtml_path = scene_candidates[scene['number'] - 1]
                    else:
                        print(f"  [MISSING] {md_file.name} Scene {scene['number']}: {scene['title']} -> No XHTML found ({xhtml_pattern})")
                        total_md += scene['word_count']
                        mismatches.append({
                            'source': f"{md_file.name} Scene {scene['number']}",
                            'title': scene['title'],
                            'md_count': scene['word_count'],
                            'xhtml_count': 0,
                            'xhtml_file': 'MISSING'
                        })
                        continue
            
            if xhtml_path.exists():
                xhtml_entries = extract_xhtml_entries(xhtml_path)
                md_count = scene['word_count']
                xhtml_count = len(xhtml_entries)
                total_md += md_count
                total_xhtml += xhtml_count
                
                if md_count != xhtml_count:
                    mismatches.append({
                        'source': f"{md_file.name} Scene {scene['number']}",
                        'title': scene['title'],
                        'md_count': md_count,
                        'xhtml_count': xhtml_count,
                        'xhtml_file': xhtml_path.name,
                        'md_words': scene['words'],
                        'xhtml_words': xhtml_entries
                    })
                    print(f"  [MISMATCH] {md_file.name} Scene {scene['number']}: {scene['title']}")
                    print(f"             MD: {md_count} words | XHTML: {xhtml_count} words | DIFF: {md_count - xhtml_count}")
                    
                    # Show which words are missing
                    md_word_set = set(w[1].lower() for w in scene['words'])
                    xhtml_word_set = set(w[1].lower() for w in xhtml_entries)
                    missing_in_xhtml = md_word_set - xhtml_word_set
                    extra_in_xhtml = xhtml_word_set - md_word_set
                    if missing_in_xhtml:
                        print(f"             Missing in XHTML: {sorted(missing_in_xhtml)}")
                    if extra_in_xhtml:
                        print(f"             Extra in XHTML: {sorted(extra_in_xhtml)}")
                else:
                    # Check that actual words match
                    md_words_list = [w[1] for w in scene['words']]
                    xhtml_words_list = [w[1] for w in xhtml_entries]
                    if md_words_list != xhtml_words_list:
                        diffs = []
                        for i, (mw, xw) in enumerate(zip(md_words_list, xhtml_words_list)):
                            if mw != xw:
                                diffs.append(f"#{i+1}: MD=\"{mw}\" vs XHTML=\"{xw}\"")
                        if diffs:
                            word_mismatches.append({
                                'source': f"{md_file.name} Scene {scene['number']}",
                                'title': scene['title'],
                                'xhtml_file': xhtml_path.name,
                                'diffs': diffs
                            })
                            print(f"  [WORD DIFF] {md_file.name} Scene {scene['number']}: {scene['title']}")
                            for d in diffs:
                                print(f"              {d}")
    
    print("\n" + "=" * 100)
    print(f"TOTALS: MD Source = {total_md} words | XHTML Pages = {total_xhtml} words | Difference = {total_md - total_xhtml}")
    print(f"COUNT MISMATCHES: {len(mismatches)}")
    print(f"WORD MISMATCHES: {len(word_mismatches)}")
    print("=" * 100)
    
    if mismatches:
        print("\nDETAILED COUNT MISMATCHES:")
        for m in mismatches:
            print(f"  {m['source']}: \"{m['title']}\"")
            print(f"    MD: {m['md_count']} words | XHTML: {m['xhtml_count']} words in {m['xhtml_file']}")
    
    if word_mismatches:
        print("\nDETAILED WORD MISMATCHES:")
        for m in word_mismatches:
            print(f"  {m['source']}: \"{m['title']}\" ({m['xhtml_file']})")
            for d in m['diffs']:
                print(f"    {d}")


if __name__ == "__main__":
    main()
