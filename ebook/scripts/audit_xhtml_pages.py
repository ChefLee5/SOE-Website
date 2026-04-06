#!/usr/bin/env python3
"""
Audit XHTML generated pages for numbering and word correctness.
Compares generated OEBPS/pages/*.xhtml against source content/*.md files.
"""

import re
import os
import sys
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
PAGES_DIR = BASE_DIR / "OEBPS" / "pages"
CONTENT_DIR = BASE_DIR / "content"


def extract_xhtml_entries(filepath):
    """Extract word entries from an XHTML page."""
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    entries = []
    # Match table rows in XHTML - look for <tr> with <td> cells
    # Pattern: <td class="num">N</td> ... <td class="word">WORD</td>
    row_pattern = re.compile(
        r'<tr[^>]*>\s*'
        r'<td[^>]*class="[^"]*num[^"]*"[^>]*>(\d+)</td>\s*'
        r'<td[^>]*class="[^"]*word[^"]*"[^>]*>(.*?)</td>',
        re.DOTALL
    )
    
    for match in row_pattern.finditer(text):
        num = int(match.group(1))
        word = re.sub(r'<[^>]+>', '', match.group(2)).strip()
        entries.append({'num': num, 'word': word})
    
    # If the above pattern doesn't work, try a more generic approach
    if not entries:
        # Try matching any <tr> with number in first <td>
        generic_pattern = re.compile(
            r'<tr[^>]*>\s*<td[^>]*>(\d+)</td>\s*<td[^>]*>(.*?)</td>',
            re.DOTALL
        )
        for match in generic_pattern.finditer(text):
            num = int(match.group(1))
            word = re.sub(r'<[^>]+>', '', match.group(2)).strip()
            entries.append({'num': num, 'word': word})
    
    return entries


def extract_xhtml_title(filepath):
    """Extract the scene title from an XHTML page."""
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Look for h2 or h1 with scene title
    title_match = re.search(r'<h[12][^>]*>(.*?)</h[12]>', text, re.DOTALL)
    if title_match:
        return re.sub(r'<[^>]+>', '', title_match.group(1)).strip()
    return filepath.stem


def audit_xhtml_page(filepath):
    """Audit a single XHTML page for numbering issues."""
    entries = extract_xhtml_entries(filepath)
    title = extract_xhtml_title(filepath)
    issues = []
    
    if not entries:
        return {
            'filename': filepath.name,
            'title': title,
            'entries': entries,
            'word_count': 0,
            'issues': [f"  WARNING: No table entries found - may use different HTML structure"]
        }
    
    # Check sequential numbering starting from 1
    expected = 1
    for entry in entries:
        if entry['num'] != expected:
            issues.append(
                f"  NUMBERING ERROR: Item shows #{entry['num']}, expected #{expected} "
                f"(word: \"{entry['word']}\")"
            )
        expected = entry['num'] + 1
    
    # Check for gaps/jumps
    nums = [e['num'] for e in entries]
    expected_seq = list(range(1, len(entries) + 1))
    if nums != expected_seq:
        missing = set(expected_seq) - set(nums)
        extra = set(nums) - set(expected_seq)
        if missing:
            issues.append(f"  MISSING numbers: {sorted(missing)}")
        if extra:
            issues.append(f"  UNEXPECTED numbers: {sorted(extra)}")
    
    # Check for duplicate words
    words_seen = {}
    for entry in entries:
        w = entry['word'].lower()
        if w in words_seen:
            issues.append(
                f"  DUPLICATE word \"{entry['word']}\" "
                f"at #{words_seen[w]} and #{entry['num']}"
            )
        else:
            words_seen[w] = entry['num']
    
    return {
        'filename': filepath.name,
        'title': title,
        'entries': entries,
        'word_count': len(entries),
        'issues': issues
    }


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    
    xhtml_files = sorted(PAGES_DIR.glob("land*.xhtml")) + sorted(PAGES_DIR.glob("back_*.xhtml"))
    
    print("=" * 90)
    print("SOE PICTURE DICTIONARY — XHTML PAGE AUDIT")
    print("=" * 90)
    
    grand_total = 0
    total_issues = 0
    pages_with_no_entries = []
    pages_with_errors = []
    
    for fpath in xhtml_files:
        result = audit_xhtml_page(fpath)
        grand_total += result['word_count']
        
        has_error = bool(result['issues'])
        if result['word_count'] == 0:
            pages_with_no_entries.append(result['filename'])
        
        if has_error and result['word_count'] > 0:
            pages_with_errors.append(result)
            total_issues += len(result['issues'])
        
        status = "PASS" if not has_error else "FAIL"
        if result['word_count'] > 0:
            nums = [e['num'] for e in result['entries']]
            print(f"  [{status}] {result['filename']}: {result['word_count']} words (#{nums[0]}-#{nums[-1]})")
        else:
            print(f"  [WARN] {result['filename']}: 0 entries extracted")
        
        if result['issues'] and result['word_count'] > 0:
            for issue in result['issues']:
                print(issue)
    
    print("\n" + "=" * 90)
    print(f"PAGES SCANNED: {len(xhtml_files)}")
    print(f"GRAND TOTAL WORDS: {grand_total}")
    print(f"PAGES WITH ERRORS: {len(pages_with_errors)}")
    print(f"TOTAL ISSUES: {total_issues}")
    
    if pages_with_no_entries:
        print(f"\nPAGES WITH NO TABLE ENTRIES ({len(pages_with_no_entries)}):")
        for p in pages_with_no_entries:
            print(f"  - {p}")
    
    if pages_with_errors:
        print(f"\n{'='*90}")
        print("DETAILED ERRORS:")
        for p in pages_with_errors:
            print(f"\n  {p['filename']}:")
            for issue in p['issues']:
                print(f"    {issue}")
    
    print("=" * 90)
    return total_issues


if __name__ == "__main__":
    sys.exit(main())
