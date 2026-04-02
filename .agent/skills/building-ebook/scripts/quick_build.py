#!/usr/bin/env python3
"""
SOE EPUB Quick Build — Runs generate_pages.py + build_epub.py in sequence.

Usage:
  python quick_build.py           # Full build (generate + package)
  python quick_build.py --count   # Count vocabulary only
  python quick_build.py --check   # Validate structure without building
  python quick_build.py --help    # Show this help

Options:
  --count    Count vocabulary words across all lands and back matter
  --check    Validate the ebook structure (required files, content integrity)
  --help     Show this help message
"""

import os
import sys
import re
from pathlib import Path

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

SCRIPT_DIR = Path(__file__).resolve().parent
# Traverse up from .agent/skills/building-ebook/scripts/ to project root
PROJECT_ROOT = SCRIPT_DIR.parent.parent.parent.parent
EBOOK_DIR = PROJECT_ROOT / "ebook"
CONTENT_DIR = EBOOK_DIR / "content"
OEBPS_DIR = EBOOK_DIR / "OEBPS"
PAGES_DIR = OEBPS_DIR / "pages"
IMAGES_DIR = OEBPS_DIR / "images"

# ─── Validation ──────────────────────────────────────────────

def check_structure():
    """Validate the ebook directory structure and content integrity."""
    print("═" * 60)
    print("  SOE Rhythm Quest — Structure Validator")
    print("═" * 60)
    errors = 0
    warnings = 0

    # Required directories
    for d in [CONTENT_DIR, OEBPS_DIR, PAGES_DIR, OEBPS_DIR / "styles"]:
        if d.exists():
            print(f"  ✅ {d.relative_to(EBOOK_DIR)}/")
        else:
            print(f"  ❌ Missing directory: {d.relative_to(EBOOK_DIR)}/")
            errors += 1

    # Required files
    required = [
        EBOOK_DIR / "mimetype",
        EBOOK_DIR / "META-INF" / "container.xml",
        OEBPS_DIR / "content.opf",
        OEBPS_DIR / "styles" / "dictionary.css",
        PAGES_DIR / "nav.xhtml",
        PAGES_DIR / "cover.xhtml",
        PAGES_DIR / "frontmatter.xhtml",
    ]
    for f in required:
        if f.exists():
            print(f"  ✅ {f.relative_to(EBOOK_DIR)}")
        else:
            print(f"  ❌ Missing file: {f.relative_to(EBOOK_DIR)}")
            errors += 1

    # Content files
    print()
    print("  ── Content Files ──")
    land_files = sorted(CONTENT_DIR.glob("land*.md"))
    back_files = sorted(CONTENT_DIR.glob("back_*.md"))

    total_words = 0
    for md in land_files + back_files:
        count = 0
        with open(md, "r", encoding="utf-8") as f:
            for line in f:
                if re.match(r'^\|\s*\d+\s*\|', line.strip()):
                    count += 1
        total_words += count
        status = "✅" if count > 0 else "⚠️ "
        if count == 0:
            warnings += 1
        print(f"  {status} {md.name}: {count} words")

    print(f"\n  📊 Total vocabulary: {total_words} words")

    # Check images vs pages
    print()
    print("  ── Image Coverage ──")
    if IMAGES_DIR.exists():
        image_names = {f.stem for f in IMAGES_DIR.iterdir() if f.is_file()}
        page_names = {f.stem for f in PAGES_DIR.glob("land*.xhtml")} | {f.stem for f in PAGES_DIR.glob("back_*.xhtml")}

        matched = image_names & page_names
        missing_images = page_names - image_names
        orphan_images = image_names - page_names

        print(f"  ✅ {len(matched)} pages have matching images")
        if missing_images:
            print(f"  ⚠️  {len(missing_images)} pages missing images:")
            for name in sorted(list(missing_images)[:10]):
                print(f"       - {name}")
            if len(missing_images) > 10:
                print(f"       ... and {len(missing_images) - 10} more")
            warnings += len(missing_images)
        if orphan_images:
            print(f"  ⚠️  {len(orphan_images)} orphan images (no matching page)")
            warnings += len(orphan_images)
    else:
        print("  ⚠️  No images/ directory found")
        warnings += 1

    # Summary
    print()
    print("═" * 60)
    if errors == 0 and warnings == 0:
        print("  ✅ All checks passed!")
    elif errors == 0:
        print(f"  ⚠️  Passed with {warnings} warning(s)")
    else:
        print(f"  ❌ {errors} error(s) and {warnings} warning(s)")
    print("═" * 60)
    return errors


def count_vocabulary():
    """Count vocabulary words only."""
    print("═" * 60)
    print("  SOE Rhythm Quest — Vocabulary Counter")
    print("═" * 60)
    total = 0
    for md_file in sorted(CONTENT_DIR.glob("*.md")):
        count = 0
        with open(md_file, "r", encoding="utf-8") as f:
            for line in f:
                if re.match(r'^\|\s*\d+\s*\|', line.strip()):
                    count += 1
        total += count
        print(f"  📖 {md_file.name}: {count} words")
    print(f"\n  📊 Total vocabulary: {total} words")
    return total


def full_build():
    """Run generate_pages.py then build_epub.py."""
    gen_script = EBOOK_DIR / "generate_pages.py"
    build_script = EBOOK_DIR / "build_epub.py"

    print("═" * 60)
    print("  SOE Rhythm Quest — Full EPUB Build")
    print("═" * 60)
    print()

    # Step 1: Generate pages
    print("  ▶ Step 1: Generating XHTML pages...")
    result = os.system(f'"{sys.executable}" "{gen_script}"')
    if result != 0:
        print("  ❌ Page generation failed!")
        return False

    print()

    # Step 2: Build EPUB
    print("  ▶ Step 2: Packaging EPUB...")
    result = os.system(f'"{sys.executable}" "{build_script}"')
    if result != 0:
        print("  ❌ EPUB build failed!")
        return False

    print()
    print("  ✅ Full build complete!")
    return True


def show_help():
    print(__doc__)


if __name__ == "__main__":
    args = sys.argv[1:]

    if "--help" in args or "-h" in args:
        show_help()
    elif "--count" in args:
        count_vocabulary()
    elif "--check" in args:
        check_structure()
    else:
        full_build()
