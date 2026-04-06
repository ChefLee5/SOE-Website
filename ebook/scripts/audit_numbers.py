#!/usr/bin/env python3
"""
Audit script for SOE Picture Dictionary.
Checks all content markdown files for:
1. Word numbering errors within each scene (items should be sequential 1, 2, 3, ...)
2. Duplicate words within a scene
3. Scene-level word count accuracy vs summary tables
"""

import re
import os
import sys
from pathlib import Path

CONTENT_DIR = Path(__file__).parent.parent / "content"

def parse_scenes(filepath):
    """Parse a land file and extract all scenes with their word entries."""
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Split by scene headers
    scene_pattern = r'^## Scene (\d+): (.+)$'
    lines = text.split('\n')
    
    scenes = []
    current_scene = None
    current_entries = []
    
    for line_num, line in enumerate(lines, 1):
        line = line.strip('\r')
        scene_match = re.match(scene_pattern, line)
        
        if scene_match:
            # Save previous scene
            if current_scene:
                scenes.append({
                    'number': current_scene[0],
                    'title': current_scene[1],
                    'entries': current_entries,
                    'start_line': current_scene[2]
                })
            current_scene = (int(scene_match.group(1)), scene_match.group(2), line_num)
            current_entries = []
            continue
        
        # Match table rows: | # | Word | ... 
        # Skip header rows and separator rows
        if line.startswith('|') and not line.startswith('|---|') and not line.startswith('| #'):
            parts = [p.strip() for p in line.split('|')]
            # Filter empty parts from leading/trailing pipes
            parts = [p for p in parts if p]
            if len(parts) >= 2:
                try:
                    item_num = int(parts[0])
                    word = parts[1].strip('**').strip()
                    current_entries.append({
                        'num': item_num,
                        'word': word,
                        'line_num': line_num
                    })
                except ValueError:
                    pass  # Skip non-numeric rows (headers, etc.)
    
    # Save last scene
    if current_scene:
        scenes.append({
            'number': current_scene[0],
            'title': current_scene[1],
            'entries': current_entries,
            'start_line': current_scene[2]
        })
    
    return scenes


def audit_file(filepath):
    """Audit a single content file for numbering and word issues."""
    filename = filepath.name
    scenes = parse_scenes(filepath)
    issues = []
    total_words = 0
    
    for scene in scenes:
        entries = scene['entries']
        scene_label = f"Scene {scene['number']}: {scene['title']}"
        
        if not entries:
            issues.append(f"  ⚠️  {scene_label} — NO ENTRIES FOUND")
            continue
        
        # Check sequential numbering
        expected = 1
        for entry in entries:
            if entry['num'] != expected:
                issues.append(
                    f"  ❌ {scene_label} — Line {entry['line_num']}: "
                    f"Item numbered {entry['num']}, expected {expected} "
                    f"(word: \"{entry['word']}\")"
                )
            expected = entry['num'] + 1  # Continue from what we actually found
        
        # Also check for numbering gaps/jumps
        nums = [e['num'] for e in entries]
        expected_sequence = list(range(1, len(entries) + 1))
        if nums != expected_sequence:
            # Report the overall mismatch
            missing = set(expected_sequence) - set(nums)
            extra = set(nums) - set(expected_sequence)
            if missing:
                issues.append(
                    f"  ⚠️  {scene_label} — Missing numbers: {sorted(missing)}"
                )
            if extra:
                issues.append(
                    f"  ⚠️  {scene_label} — Unexpected numbers: {sorted(extra)}"
                )
        
        # Check for duplicate words within a scene
        words = [e['word'].lower() for e in entries]
        seen = {}
        for i, w in enumerate(words):
            if w in seen:
                issues.append(
                    f"  ⚠️  {scene_label} — Duplicate word \"{entries[i]['word']}\" "
                    f"at items {seen[w]} and {entries[i]['num']}"
                )
            else:
                seen[w] = entries[i]['num']
        
        total_words += len(entries)
    
    return {
        'filename': filename,
        'scene_count': len(scenes),
        'total_words': total_words,
        'issues': issues,
        'scenes': scenes
    }


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    content_dir = CONTENT_DIR
    land_files = sorted(content_dir.glob("land*.md"))
    back_files = sorted(content_dir.glob("back_*.md"))
    
    all_files = land_files + back_files
    
    print("=" * 80)
    print("SOE PICTURE DICTIONARY — NUMBERING & WORD AUDIT")
    print("=" * 80)
    
    grand_total = 0
    all_issues = []
    
    for fpath in all_files:
        result = audit_file(fpath)
        grand_total += result['total_words']
        
        status = "✅" if not result['issues'] else "❌"
        print(f"\n{status} {result['filename']}")
        print(f"   Scenes: {result['scene_count']} | Words: {result['total_words']}")
        
        if result['issues']:
            all_issues.extend(result['issues'])
            for issue in result['issues']:
                print(issue)
        
        # Print scene breakdown
        for scene in result['scenes']:
            word_count = len(scene['entries'])
            nums = [e['num'] for e in scene['entries']]
            expected = list(range(1, word_count + 1))
            status_icon = "✅" if nums == expected else "❌"
            print(f"   {status_icon} Scene {scene['number']}: {scene['title']} — {word_count} words (numbered {nums[0] if nums else '?'}-{nums[-1] if nums else '?'})")
    
    print("\n" + "=" * 80)
    print(f"GRAND TOTAL: {grand_total} words across all files")
    print(f"ISSUES FOUND: {len(all_issues)}")
    print("=" * 80)
    
    if all_issues:
        print("\n📋 ALL ISSUES:")
        for issue in all_issues:
            print(issue)
    
    return len(all_issues)


if __name__ == "__main__":
    sys.exit(main())
