#!/usr/bin/env python3
"""Audit all content files for the Picture Dictionary."""
import re, os, sys

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

CONTENT_DIR = os.path.join(os.path.dirname(__file__), "content")

print("=" * 70)
print("  SOE Picture Dictionary - Content Audit Report")
print("=" * 70)

total_words = 0
total_scenes = 0
underweight_scenes = []

for fn in sorted(os.listdir(CONTENT_DIR)):
    if not fn.endswith(".md"):
        continue
    
    filepath = os.path.join(CONTENT_DIR, fn)
    with open(filepath, "r", encoding="utf-8") as f:
        text = f.read()
    
    # Count scenes
    scene_headers = re.findall(r"^## Scene (\d+):", text, re.MULTILINE)
    
    # Count total vocab rows
    vocab_rows = re.findall(r"^\|\s*(\d+)\s*\|", text, re.MULTILINE)
    
    # Count tips
    tips = re.findall(r"^>\s*\*\*", text, re.MULTILINE)
    
    file_words = len(vocab_rows)
    file_scenes = len(scene_headers)
    total_words += file_words
    total_scenes += file_scenes
    
    avg = file_words / file_scenes if file_scenes > 0 else 0
    
    print(f"\n  {fn}")
    print(f"    Scenes: {file_scenes}  |  Words: {file_words}  |  Tips: {len(tips)}  |  Avg: {avg:.0f} w/scene")
    
    # Find underweight scenes within this file
    blocks = re.split(r"^## Scene (\d+):", text, flags=re.MULTILINE)
    i = 1
    while i < len(blocks):
        sn = blocks[i]
        body = blocks[i + 1] if i + 1 < len(blocks) else ""
        title = body.strip().split("\n")[0].strip()
        wc = len(re.findall(r"^\|\s*\d+\s*\|", body, re.MULTILINE))
        if wc < 20:
            underweight_scenes.append((fn, sn, title[:45], wc))
            print(f"      LOW Scene {sn}: {title[:45]} = {wc} words")
        i += 2

print("\n" + "=" * 70)
print(f"  TOTALS: {total_scenes} scenes | {total_words} vocabulary words")
print(f"  GAP TO 4250: {max(0, 4250 - total_words)} words needed")
print(f"  UNDERWEIGHT SCENES (<20 words): {len(underweight_scenes)}")
print("=" * 70)
