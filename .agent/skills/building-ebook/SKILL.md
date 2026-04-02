---
name: building-ebook
description: >
  Builds, validates, and manages the SOE Rhythm Quest EPUB picture dictionary.
  Use when the user asks to "build the epub", "generate pages", "count vocabulary",
  "add a new land", "update dictionary images", "check epub", or any ebook-related task.
---

# SOE Ebook Builder

## When to use this skill

- User asks to build, rebuild, or package the EPUB
- User wants to generate XHTML pages from Markdown content
- User wants to count vocabulary words across lands
- User asks to add new content, scenes, or vocabulary
- User wants to update or swap dictionary images
- User asks to validate the EPUB structure
- User mentions "epub", "dictionary", "land", "ebook", or "generate pages"

## Project Structure

```
ebook/
├── content/                  # Source Markdown files (one per land + back matter)
│   ├── land1_harmonia.md     # 620 words
│   ├── land2_numeria.md      # 510 words
│   ├── land3_terrasol.md     # 585 words
│   ├── land4_aquaria.md      # 485 words
│   ├── land5_vitalis.md      # 520 words
│   ├── land6_sophia.md       # 425 words
│   ├── land7_celestia.md     # 390 words
│   ├── back_sight_words.md   # 90 words
│   ├── back_action_verbs.md  # 50 words
│   ├── back_adjectives.md    # 50 words
│   ├── back_az_index.md      # 120 words
│   ├── back_visual_glossary.md # 100 words
│   ├── back_parent_teacher.md  # 80 words
│   ├── back_asl_alphabet.md    # 37 words
│   └── back_asl_essential.md   # 100 words
├── OEBPS/
│   ├── content.opf           # Auto-generated manifest + spine
│   ├── pages/                # Auto-generated XHTML pages
│   │   ├── nav.xhtml         # Table of contents
│   │   ├── cover.xhtml       # Cover page
│   │   ├── frontmatter.xhtml # How to Use
│   │   ├── land*.xhtml       # Per-scene pages
│   │   └── back_*.xhtml      # Back matter pages
│   ├── images/               # Scene illustrations (PNG)
│   └── styles/
│       └── dictionary.css    # Ebook stylesheet
├── META-INF/
│   └── container.xml
├── mimetype
├── generate_pages.py         # Markdown → XHTML converter
├── build_epub.py             # EPUB packager
└── SOE_Essential_Picture_Dictionary.epub  # Output (~120MB)
```

## Workflow — Full Build

Execute from the `ebook/` directory:

```
# Step 1: Generate XHTML pages from Markdown content
python generate_pages.py

# Step 2: Package into EPUB
python build_epub.py
```

Both scripts handle Windows console encoding automatically.

## Workflow — Vocabulary Count Only

```
python build_epub.py --count
```

## Workflow — View Pagination Strategy

```
python build_epub.py --strategy
```

## Content Format — Land Markdown Files

Each `content/land*_<name>.md` follows this structure:

```markdown
# Land N: Name — Scene Title

## Scene 1: Scene Title
*Scene description in italics*

| # | Word | Pronunciation | In the Story… | ASL Sign 🤟 | Translation |
|---|------|---------------|---------------|-------------|-------------|
| 1 | word | /phonetic/    | Context use   | ASL desc    |             |

> **💡 Character's Tip:** *"Helpful learning tip"*

## Scene 2: Next Scene Title
...
```

Key parsing rules:
- Scene splits on `## Scene N:` headers
- Vocabulary from table rows matching `| digit |`
- Supports 5-column (no ASL) and 6-column (with ASL) tables
- Character tips parsed from blockquote format
- Empty scenes (no vocabulary rows) are skipped

## Land Configuration

| # | Land | Color | Characters | Icon |
|---|------|-------|------------|------|
| 1 | Harmonia | #d4a843 | Kenji & Aiko | 🎵 |
| 2 | Numeria | #7fb685 | Kwame & Octavia | 🔢 |
| 3 | Terrasol | #10B981 | Silas & Vesta | 🌿 |
| 4 | Aquaria | #2563EB | Ronan & Nerissa | 🌊 |
| 5 | Vitalis | #c4785a | Felix & Amara | ❤️ |
| 6 | Sophia | #5ba4c9 | Ezra & Athena | ⚖️ |
| 7 | Celestia | #9678c4 | Elias & Selene | 🔭 |

## Instructions — Adding New Content

### Adding vocabulary to an existing land

1. Open `content/landN_<name>.md`
2. Add rows to an existing scene's table, or add a new `## Scene N:` block
3. Run the full build workflow

### Adding a new back matter section

1. Create `content/back_<section_name>.md` following the scene/table format
2. Add a matching entry to the `BACK_MATTER` dict in `generate_pages.py`
3. Run the full build workflow

### Updating images

Images live in `ebook/OEBPS/images/`. The filename must match the XHTML page name:
- Page: `land1-musical-greetings.xhtml` → Image: `land1-musical-greetings.png`
- If the image file exists, `generate_pages.py` auto-links it
- If missing, a placeholder description is rendered

To update images:
1. Process the source images (resize, rename to match page filenames)
2. Copy into `ebook/OEBPS/images/`
3. Run the full build to repackage

## Validation Checklist

Before delivering a build, verify:

- [ ] `python generate_pages.py` runs without errors
- [ ] `python build_epub.py` produces the .epub file
- [ ] `python build_epub.py --count` shows expected word totals
- [ ] All 7 lands have content files in `content/`
- [ ] Scene images are correctly named and linked
- [ ] `content.opf` manifest includes all pages and images
- [ ] `nav.xhtml` table of contents is accurate

## EPUB → PDF Conversion

Using Calibre CLI:
```
ebook-convert SOE_Essential_Picture_Dictionary.epub \
              SOE_Essential_Picture_Dictionary.pdf \
              --pdf-page-size=letter \
              --pdf-default-font-size=11 \
              --pdf-mono-font-size=10
```

## Scripts Reference

| Script | Purpose | Key Args |
|--------|---------|----------|
| `generate_pages.py` | Markdown → XHTML + content.opf + nav.xhtml | (none) |
| `build_epub.py` | Package EPUB 3 ZIP | `--count`, `--strategy` |
