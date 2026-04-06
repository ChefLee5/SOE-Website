# EPUB Build Pipeline Reference

## Overview

The build pipeline converts Markdown source files into a standards-compliant EPUB 3.3 file.

```
Markdown Source (.md)
        ↓
  regen_pages.py          ← Converts specific MD scenes → XHTML
        ↓
  OEBPS/pages/*.xhtml     ← 160 XHTML pages
        ↓
  build_epub.py           ← Zips OEBPS + META-INF → .epub
        ↓
  output/*.epub           ← Final deliverable (36.5 MB)
```

---

## Scripts Reference

### `build_epub.py`
Packages the entire `OEBPS/` directory plus `META-INF/container.xml` into a valid EPUB3 ZIP archive.

```bash
python ebook/scripts/build_epub.py
# Output: ebook/output/soe-rhythm-quest-dictionary.epub
```

**What it does:**
1. Creates `mimetype` as the first entry (uncompressed, required by EPUB spec)
2. Writes `META-INF/container.xml`
3. Walks all files in `OEBPS/` and adds them to the ZIP
4. Skips `images_backup/` if present
5. Reports file count and final size

---

### `regen_pages.py`
Regenerates specific XHTML pages from the Markdown source when content has been updated.

```bash
python ebook/scripts/regen_pages.py
```

**When to use:** After editing any Markdown scene in `ebook/content/`, run this to sync the corresponding XHTML pages. Edit the `PAGES_TO_FIX` dict in the script to target specific scenes.

**Format of `PAGES_TO_FIX`:**
```python
PAGES_TO_FIX = {
    ("land3_terrasol.md", 7): "land3-silas-vestas-cottage-outside.xhtml",
    # (markdown_file, scene_number): xhtml_filename
}
```

---

### `audit_numbers.py`
Validates that every scene in every Markdown source file has sequential numbering (1, 2, 3… N) with no gaps or duplicates.

```bash
python ebook/scripts/audit_numbers.py
# Output: ebook/scripts/audit_results.txt
```

**Expected output (clean):**
```
PASS: land1_harmonia.md — Scene 1: Greetings & Introductions (24 items, 1–24)
...
ALL SEQUENCES VALID
```

---

### `audit_crossref.py`
Cross-validates word counts between Markdown source and generated XHTML pages. Detects missing entries and encoding discrepancies.

```bash
python ebook/scripts/audit_crossref.py
# Output: ebook/scripts/crossref_results.txt (or crossref_final.txt)
```

**Expected output (clean):**
```
TOTALS: MD Source = 4232 words | XHTML Pages = 4232 words | Difference = 0
COUNT MISMATCHES: 0
```

**Note on apostrophe encoding:** The audit may flag `'` (MD) vs `&#x27;` (XHTML) as word mismatches. This is cosmetic — both render identically in EPUB readers. XHTML encoding is correct.

---

### `verify_epub.py`
Quick sanity check that the built EPUB contains all expected files.

```bash
python ebook/scripts/verify_epub.py
```

**Checks:**
- `mimetype` is the first ZIP entry
- XHTML page count (expect 160)
- Image count (expect 157)
- Font count (expect 4)
- Presence of `content.opf`, `nav.xhtml`, `dictionary.css`, `META-INF/container.xml`
- File sizes for specified pages (useful to verify regenerated pages)

---

### `compress_images.py`
Batch compresses scene illustration JPGs to reduce EPUB file size.

```bash
python ebook/scripts/compress_images.py
```

---

## Full Rebuild Workflow

Run this sequence after any content changes:

```bash
# Step 1: Validate MD source
python ebook/scripts/audit_numbers.py

# Step 2: Sync changed pages to XHTML
python ebook/scripts/regen_pages.py

# Step 3: Verify sync
python ebook/scripts/audit_crossref.py

# Step 4: Build EPUB
python ebook/scripts/build_epub.py

# Step 5: Verify package
python ebook/scripts/verify_epub.py
```

---

## EPUB Internal Structure

```
soe-rhythm-quest-dictionary.epub (ZIP)
├── mimetype                           ← "application/epub+zip" (uncompressed, first)
├── META-INF/
│   └── container.xml                  ← Points to OEBPS/content.opf
└── OEBPS/
    ├── content.opf                    ← Package manifest + spine order
    ├── pages/
    │   ├── cover.xhtml
    │   ├── frontmatter.xhtml
    │   ├── nav.xhtml                  ← EPUB3 navigation document (TOC)
    │   ├── land1-*.xhtml              ← 20 Land 1 pages
    │   ├── land2-*.xhtml              ← 19 Land 2 pages
    │   ├── land3-*.xhtml              ← 20 Land 3 pages
    │   ├── land4-*.xhtml              ← 19 Land 4 pages
    │   ├── land5-*.xhtml              ← 17 Land 5 pages
    │   ├── land6-*.xhtml              ← 19 Land 6 pages
    │   ├── land7-*.xhtml              ← 18 Land 7 pages
    │   └── back_*.xhtml               ← 25 back matter pages
    ├── images/
    │   └── *.jpg                      ← 157 scene illustrations
    ├── styles/
    │   └── dictionary.css             ← Full design system
    └── fonts/
        ├── FredokaOne-Regular.woff2   ← Display/header font
        ├── Nunito-Regular.woff2
        ├── Nunito-SemiBold.woff2
        └── Nunito-Bold.woff2
```

---

## Distribution Targets

| Platform | Format | Notes |
|----------|--------|-------|
| Amazon KDP | EPUB 3 | May auto-convert to AZW3; test on Kindle Previewer |
| Apple Books | EPUB 3 | Native EPUB support; best rendering |
| Kobo | EPUB 3 | Native EPUB support |
| Google Play Books | EPUB 3 | Upload via Play Books Partner Center |
| Direct download | EPUB 3 | Host on website or GitHub Releases |

---

## Preview Without EPUB Reader

```bash
# Start local HTTP server
python -m http.server 8080 --directory ebook/OEBPS

# Browse pages at:
# http://localhost:8080/pages/                             ← All pages
# http://localhost:8080/pages/land1-greetings-introductions.xhtml
# http://localhost:8080/pages/nav.xhtml                   ← Table of contents
```

*Last updated: April 2026*
