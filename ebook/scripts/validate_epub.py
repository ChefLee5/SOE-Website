"""
SOE Rhythm Quest — EPUB Build Validation
Checks that all required files exist, references resolve, and manifest is complete.
"""
import os
import re
import sys
from pathlib import Path

EBOOK_DIR = Path("ebook") / "OEBPS"
PASS = "✓"
FAIL = "✗"
WARN = "⚠"
errors = 0
warnings = 0


def check(label, condition, detail=""):
    global errors
    if condition:
        print(f"  {PASS} {label}")
    else:
        print(f"  {FAIL} {label} — {detail}")
        errors += 1


def warn(label, detail=""):
    global warnings
    print(f"  {WARN} {label} — {detail}")
    warnings += 1


print("=" * 60)
print("  SOE EPUB Build Validation")
print("=" * 60)

# 1. Structure checks
print("\n[1] Directory Structure")
check("styles/ exists", (EBOOK_DIR / "styles").is_dir())
check("pages/ exists", (EBOOK_DIR / "pages").is_dir())
check("images/ exists", (EBOOK_DIR / "images").is_dir())
check("fonts/ exists", (EBOOK_DIR / "fonts").is_dir())
check("content.opf exists", (EBOOK_DIR / "content.opf").is_file())
check("dictionary.css exists", (EBOOK_DIR / "styles" / "dictionary.css").is_file())

# 2. Page count
print("\n[2] Page Count")
pages = list((EBOOK_DIR / "pages").glob("*.xhtml"))
check(f"Pages found: {len(pages)}", len(pages) >= 100, f"Only {len(pages)} found, expected 100+")

# 3. Image checks
print("\n[3] Image Integrity")
images = list((EBOOK_DIR / "images").glob("*.*"))
image_names = {img.name for img in images}
check(f"Images found: {len(images)}", len(images) >= 150, f"Only {len(images)} found")

total_img_mb = sum(img.stat().st_size for img in images) / (1024 * 1024)
check(f"Total image size: {total_img_mb:.1f}MB", total_img_mb < 60, f"{total_img_mb:.1f}MB exceeds 60MB target")

# 4. Cross-reference check: every image referenced in XHTML exists
print("\n[4] Image Reference Integrity")
missing_refs = []
orphan_images = set(image_names)
img_pattern = re.compile(r'src="\.\.\/images\/([^"]+)"')

for page in pages:
    with open(page, "r", encoding="utf-8") as f:
        content = f.read()
    for match in img_pattern.finditer(content):
        ref = match.group(1)
        if ref in orphan_images:
            orphan_images.discard(ref)
        if ref not in image_names:
            missing_refs.append((page.name, ref))

check(f"All image refs resolve ({len(missing_refs)} missing)", len(missing_refs) == 0)
if missing_refs:
    for page, ref in missing_refs[:10]:
        print(f"    → {page}: {ref}")

if orphan_images:
    warn(f"{len(orphan_images)} orphan images (not referenced by any page)")

# 5. Font checks
print("\n[5] Font Files")
fonts = list((EBOOK_DIR / "fonts").glob("*.woff2"))
check(f"WOFF2 fonts found: {len(fonts)}", len(fonts) >= 4, f"Only {len(fonts)} found, need 4")

# 6. CSS checks
print("\n[6] CSS Validation (basic)")
css_path = EBOOK_DIR / "styles" / "dictionary.css"
with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

check("@font-face declarations", css.count("@font-face") >= 4, f"Only {css.count('@font-face')} found")
check("@media print block", "@media print" in css)
check("CSS variables (--accent-color)", "--accent-color" in css)
check("Fredoka One referenced", "Fredoka One" in css or "FredokaOne" in css)
check("Nunito referenced", "Nunito" in css)

# 7. OPF manifest checks
print("\n[7] OPF Manifest")
with open(EBOOK_DIR / "content.opf", "r", encoding="utf-8") as f:
    opf = f.read()

opf_page_refs = re.findall(r'href="pages/([^"]+)"', opf)
opf_image_refs = re.findall(r'href="images/([^"]+)"', opf)
opf_font_refs = re.findall(r'href="fonts/([^"]+)"', opf)

check(f"OPF page entries: {len(opf_page_refs)}", len(opf_page_refs) == len(pages),
      f"OPF has {len(opf_page_refs)} but {len(pages)} pages exist")
check(f"OPF image entries: {len(opf_image_refs)}", len(opf_image_refs) == len(images),
      f"OPF has {len(opf_image_refs)} but {len(images)} images exist")
check(f"OPF font entries: {len(opf_font_refs)}", len(opf_font_refs) == len(fonts),
      f"OPF has {len(opf_font_refs)} but {len(fonts)} fonts exist")

# Summary
print("\n" + "=" * 60)
if errors == 0:
    print(f"  {PASS} ALL CHECKS PASSED ({warnings} warnings)")
else:
    print(f"  {FAIL} {errors} ERRORS, {warnings} WARNINGS")
print("=" * 60)

sys.exit(1 if errors > 0 else 0)
