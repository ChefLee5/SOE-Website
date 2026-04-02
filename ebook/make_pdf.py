#!/usr/bin/env python3
"""
SOE EPUB → PDF Converter
Merges all XHTML pages into a single printable HTML file,
then opens it in the default browser for Print → Save as PDF.

Usage:
  python make_pdf.py              # Build full book
  python make_pdf.py --no-open    # Build but don't open browser
  python make_pdf.py --help       # Show help
"""

import os
import sys
import re
import webbrowser
from pathlib import Path
from xml.etree import ElementTree as ET

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

EBOOK_DIR = Path(__file__).resolve().parent
OEBPS_DIR = EBOOK_DIR / "OEBPS"
PAGES_DIR = OEBPS_DIR / "pages"
STYLES_DIR = OEBPS_DIR / "styles"
IMAGES_DIR = OEBPS_DIR / "images"
OUTPUT_FILE = EBOOK_DIR / "SOE_Essential_Picture_Dictionary.html"


def get_ordered_pages():
    """Get all pages in book order: static → lands → back matter."""
    static = ["cover.xhtml", "frontmatter.xhtml"]
    land_pages = []
    back_pages = []

    for f in PAGES_DIR.glob("land*.xhtml"):
        land_pages.append(f.name)
    for f in PAGES_DIR.glob("back_*.xhtml"):
        back_pages.append(f.name)

    def land_sort_key(name):
        m = re.match(r'land(\d+)-', name)
        num = int(m.group(1)) if m else 99
        return (num, name)

    land_pages = sorted(land_pages, key=land_sort_key)
    back_pages = sorted(back_pages)

    return static + land_pages + back_pages


def extract_body(xhtml_path):
    """Extract the <body> contents from an XHTML file, plus any inline <style>."""
    with open(xhtml_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Extract inline <style> blocks (for per-page accent colors)
    styles = []
    for m in re.finditer(r'<style>(.*?)</style>', content, re.DOTALL):
        styles.append(m.group(1))

    # Extract body content
    body_match = re.search(r'<body[^>]*>(.*?)</body>', content, re.DOTALL)
    if body_match:
        body = body_match.group(1).strip()
    else:
        body = ""

    return body, styles


def build_merged_html():
    """Build a single HTML file with all pages merged."""
    print("═" * 60)
    print("  SOE Rhythm Quest — PDF Builder")
    print("═" * 60)

    # Read the CSS
    css_path = STYLES_DIR / "dictionary.css"
    with open(css_path, "r", encoding="utf-8") as f:
        css = f.read()

    # Get all pages in order
    pages = get_ordered_pages()
    print(f"\n  📄 Merging {len(pages)} pages...")

    # Build sections
    sections = []
    page_count = 0

    for page_name in pages:
        page_path = PAGES_DIR / page_name
        if not page_path.exists():
            print(f"  ⚠️  Skipping missing: {page_name}")
            continue

        body, inline_styles = extract_body(page_path)
        if not body:
            continue

        page_count += 1

        # Wrap in a section with any inline styles
        style_block = ""
        if inline_styles:
            style_block = f"<style>{chr(10).join(inline_styles)}</style>"

        # Fix image paths: ../images/ → relative path
        body = body.replace('../images/', f'OEBPS/images/')

        sections.append(f"""
<!-- ═══ PAGE: {page_name} ═══ -->
{style_block}
<div class="pdf-page" data-page="{page_name}">
{body}
</div>
""")

    # Combine into a single HTML
    merged = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SOE Rhythm Quest: Essential Picture Dictionary</title>
    <style>
{css}

/* ── PDF-specific overrides ── */
.pdf-page {{
    page-break-after: always;
    padding: 0.5in;
    position: relative;
}}

.pdf-page:last-child {{
    page-break-after: avoid;
}}

/* Remove duplicate page breaks from land/scene headers in merged mode */
.pdf-page .land-header {{
    page-break-before: avoid;
}}

.pdf-page .scene-header {{
    page-break-before: avoid;
}}

/* Print toolbar */
.pdf-toolbar {{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background: linear-gradient(135deg, #4F46E5, #22C55E);
    color: white;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: system-ui, sans-serif;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}}

.pdf-toolbar button {{
    background: rgba(255,255,255,0.2);
    color: white;
    border: 2px solid rgba(255,255,255,0.3);
    padding: 8px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}}

.pdf-toolbar button:hover {{
    background: rgba(255,255,255,0.35);
    transform: translateY(-1px);
}}

.pdf-toolbar span {{
    font-size: 14px;
    opacity: 0.9;
}}

body {{
    padding-top: 60px;
}}

@media print {{
    .pdf-toolbar {{
        display: none !important;
    }}
    body {{
        padding-top: 0;
    }}
    .pdf-page {{
        padding: 0;
    }}
}}
    </style>
</head>
<body>
    <div class="pdf-toolbar">
        <div>
            <strong>SOE Rhythm Quest: Essential Picture Dictionary</strong>
            <span style="margin-left: 12px; opacity: 0.8;">{page_count} pages</span>
        </div>
        <div>
            <span style="margin-right: 12px;">Press Ctrl+P → Save as PDF</span>
            <button onclick="window.print()">🖨️ Print / Save PDF</button>
        </div>
    </div>

{''.join(sections)}

</body>
</html>"""

    # Write output
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(merged)

    file_size_mb = OUTPUT_FILE.stat().st_size / (1024 * 1024)
    print(f"\n  ✅ Merged HTML created!")
    print(f"  📄 Pages: {page_count}")
    print(f"  📁 Output: {OUTPUT_FILE.name}")
    print(f"  📦 Size: {file_size_mb:.1f} MB")
    print(f"\n{'═' * 60}")

    return OUTPUT_FILE


if __name__ == "__main__":
    if "--help" in sys.argv or "-h" in sys.argv:
        print(__doc__)
        sys.exit(0)

    output = build_merged_html()

    if "--no-open" not in sys.argv:
        print("  🌐 Opening in browser...")
        print("  💡 Use Ctrl+P → 'Save as PDF' to generate the PDF")
        webbrowser.open(output.as_uri())
