# 📖 SOE Rhythm Quest: Essential Picture Dictionary

**Sound of Essentials — Visual Learning Companion**  
*A multimedia educational resource for The Sound of Essentials universe.*

---

## What This Is

The **SOE Rhythm Quest: Essential Picture Dictionary** is the visual learning companion to the *Sound of Essentials: Rhythm Quest* ecosystem. It pairs illustrated scenes, vocabulary, phonetics, ASL signs, and context sentences across **7 themed Lands** — designed to support early literacy, phonics, math, science, life skills, and ASL for young learners and English language learners.

**By the numbers:**
- 📚 **4,232 vocabulary words** across **157 illustrated scenes**
- 🖼️ **157 scene illustrations** (one per topic, with labeled callouts)
- 🤟 **100 ASL signs** in the Essential ASL back matter
- 🌍 **13 bilingual companion posters** (Arabic, French, German, Hindi, Italian, Japanese, Korean, Mandarin, Portuguese, Russian, Spanish, Swahili, Turkish)
- 🔤 **A–Z index** spanning all 7 Lands

---

## Repository Contents

```
SOE-Picture-Dictionary/
├── ebook/
│   ├── content/                    ← Source Markdown (15 files — 7 Lands + 8 back matter)
│   │   ├── land1_harmonia.md
│   │   ├── land2_numeria.md
│   │   ├── land3_terrasol.md
│   │   ├── land4_aquaria.md
│   │   ├── land5_vitalis.md
│   │   ├── land6_sophia.md
│   │   ├── land7_celestia.md
│   │   └── back_*.md              ← 8 back matter section files
│   ├── OEBPS/                     ← EPUB3 publication structure
│   │   ├── pages/                 ← 160 XHTML files (157 scenes + cover + frontmatter + nav)
│   │   ├── images/                ← 157 compressed scene illustrations (.jpg)
│   │   ├── styles/dictionary.css  ← Storybook design system (26 KB)
│   │   ├── fonts/                 ← 4 embedded WOFF2 fonts (Fredoka One, Nunito family)
│   │   └── content.opf            ← EPUB3 package manifest
│   ├── META-INF/container.xml     ← EPUB container descriptor
│   ├── scripts/                   ← Build, audit, and generation tools
│   │   ├── build_epub.py          ← Packages OEBPS → .epub
│   │   ├── regen_pages.py         ← Regenerates specific XHTML pages from MD source
│   │   ├── audit_numbers.py       ← Validates sequential numbering in MD source
│   │   ├── audit_crossref.py      ← Cross-validates MD word counts vs XHTML
│   │   ├── compress_images.py     ← Image optimization
│   │   └── verify_epub.py         ← Quick EPUB package integrity check
│   └── output/
│       └── soe-rhythm-quest-dictionary.epub   ← Final EPUB (36.5 MB, 325 internal files)
├── web/                           ← Companion website (React + Vite)
│   ├── src/
│   │   ├── pages/                 ← Home, Heroes, Universe, Dictionary routes
│   │   ├── components/            ← Navbar, Footer, SplashScreen, etc.
│   │   └── i18n/locales/          ← English, Spanish, French translations
│   └── public/assets/
│       ├── characters/            ← 14 character portrait assets
│       ├── duos/                  ← 7 character duo illustrations
│       └── coloring-book/         ← Printable coloring pages
├── SOE coloring book/             ← 7 printable coloring pages + cover
├── design-system/                 ← Design tokens and visual references
├── Science of the Sound _ Chronicles of the Clock.pdf   ← Core lore document
├── The Sound of Essentials song lyrics.docx             ← Official song lyrics
├── Elias reference photo.jpg                            ← Lead character reference
└── Quest map.gif                                        ← Animated world map
```

---

## The 7 Lands

Each Land is a themed vocabulary domain with a dedicated character duo and color accent:

| Land | Name | Theme | Characters | Scenes | Words |
|------|------|-------|------------|--------|-------|
| 1 | 🎵 **Harmonia** | Language, Culture & Daily Life | Kenji & Aiko | 20 | ~620 |
| 2 | 🔢 **Numeria** | Math, Numbers & Money | Silas & Vesta | 19 | ~510 |
| 3 | 🌿 **TerraSol** | Nature, Science & Environment | Felix & Amara | 20 | ~605 |
| 4 | 🌊 **Aquaria** | Travel, Transportation & World | Ezra & Athena | 19 | ~485 |
| 5 | 💪 **Vitalis** | Health, Body & Wellness | Kwame & Octavia | 17 | ~520 |
| 6 | 📚 **Sophia** | Community, Work & Life Skills | Marcus & Elena | 19 | ~445 |
| 7 | 🔭 **Celestia** | Time, Space & The Universe | Elias & Selene | 18 | ~420 |

---

## Back Matter Sections (25 scenes, 627 words)

| Section | File | Scenes | Content |
|---------|------|--------|---------|
| Action Verbs | `back_action_verbs.md` | 2 | Body movement & everyday life verbs |
| Adjectives | `back_adjectives.md` | 2 | Feelings, colors, qualities & opposite pairs |
| ASL Alphabet | `back_asl_alphabet.md` | 3 | A–M, N–Z, and numbers 0–10 |
| Essential ASL | `back_asl_essential.md` | 4 | 100 signs: greetings, family, feelings, daily actions |
| A–Z Index | `back_az_index.md` | 4 | Full word index across all Lands (A–C, D–K, L–R, S–Z) |
| Sight Words | `back_sight_words.md` | 3 | 3 groups of essential sight words |
| Visual Glossary | `back_visual_glossary.md` | 4 | Real-world settings: home, store, doctor, street |
| Parent & Teacher Guide | `back_parent_teacher.md` | 3 | Classroom commands, study skills, parent engagement |

---

## Vocabulary Table Format

Every scene page contains a structured 6-column vocabulary table:

| # | Word | Pronunciation | In the Story… | ASL Sign 🤟 | My Language |
|---|------|---------------|---------------|------------|-------------|
| 1 | Hello | /heh-LOH/ | Kenji says hello to every person who arrives. | Flat hand, salute from forehead outward | _(blank)_ |

- **#** — Sequential number (1→N), matches labeled callouts on the scene illustration
- **Word** — Vocabulary term (bolded)
- **Pronunciation** — Phonetic guide in `/slashes/`
- **In the Story…** — Contextual sentence from the Land's narrative
- **ASL Sign** — American Sign Language descriptor
- **My Language** — Blank column for native language translation

---

## Characters

The SOE universe features **14 main characters** across 7 hero duos:

| Duo | Land | Role |
|-----|------|------|
| Kenji & Aiko | Harmonia | Rhythm Keeper & Melody Weaver |
| Silas & Vesta | Numeria | Number Sage & Pattern Weaver |
| Felix & Amara | TerraSol | Farmer & Nature Guide |
| Ezra & Athena | Aquaria | Navigator & Map Keeper |
| Kwame & Octavia | Vitalis | Wellness Coach & Body Healer |
| Marcus & Elena | Sophia | Community Leader & Teacher |
| Elias & Selene | Celestia | Star Gazer & Time Keeper |

*+ The Eternal Learning Mother — guiding presence across all Lands*

Full character lore in: `Science of the Sound _ Chronicles of the Clock.pdf`

---

## Building the EPUB

### Prerequisites
- Python 3.8+
- No external dependencies (uses stdlib only)

### Build Steps

```bash
# 1. Validate source Markdown numbering
python ebook/scripts/audit_numbers.py

# 2. Regenerate any specific out-of-sync XHTML pages
python ebook/scripts/regen_pages.py

# 3. Cross-validate MD source vs XHTML pages
python ebook/scripts/audit_crossref.py

# 4. Build the final EPUB
python ebook/scripts/build_epub.py

# 5. Verify the EPUB package
python ebook/scripts/verify_epub.py
```

Output: `ebook/output/soe-rhythm-quest-dictionary.epub`

### Preview Locally (without an EPUB reader)

```bash
# Serve the XHTML pages over HTTP
python -m http.server 8080 --directory ebook/OEBPS

# Then open in browser:
# http://localhost:8080/pages/land1-greetings-introductions.xhtml
# http://localhost:8080/pages/  (directory listing of all 160 pages)
```

---

## Running the Web Version

```bash
cd web
npm install
npm run dev
# → http://localhost:5173/The-Sound-of-Essentials-Eco-System/
```

**Tech stack:** React + Vite, i18n (English/Spanish/French), Remotion for video generation, Coda sync integration.

---

## EPUB Specification

| Property | Value |
|----------|-------|
| Format | EPUB 3.3 |
| Encoding | UTF-8 |
| Languages | English (primary) |
| Total files | 325 |
| XHTML pages | 160 |
| Images | 157 JPG |
| Fonts | 4 WOFF2 (Fredoka One, Nunito Regular/SemiBold/Bold) |
| Stylesheet | `dictionary.css` (26 KB) |
| File size | ~36.5 MB |
| Distribution targets | Amazon KDP, Apple Books, Kobo, Google Play Books |

---

## Data Integrity

The source Markdown files are the **single source of truth** for all vocabulary content.

| Audit | Result |
|-------|--------|
| MD sequential numbering | ✅ All 4,232 words numbered correctly (1→N per scene) |
| XHTML vs MD word count | ✅ 4,232 = 4,232 (Difference: 0) |
| Count mismatches | ✅ 0 scenes with incorrect word counts |
| EPUB package integrity | ✅ All 325 files present and correctly ordered |

Run `python ebook/scripts/audit_crossref.py` at any time to re-verify.

---

## Product Line Status

| Format | Status |
|--------|--------|
| EPUB (eBook) | ✅ **Complete** — 4,232 words, 157 scenes, 36.5 MB |
| Web Interactive | 🔲 In development |
| Printable Coloring Book (7 pages) | ✅ Assets complete |
| Bilingual Posters (13 languages) | ✅ Assets complete |
| A–Z Flashcards | ✅ Assets complete |
| Land Alphabet Posters (7 Lands) | ✅ Assets complete |
| Character Art (14 characters + 7 duos) | ✅ In repository |
| Song Lyrics & Educational Content | ✅ Documented |
| ASL Alphabet & Essentials (100 signs) | ✅ Pages generated |

---

## Connection to the SOE Ecosystem

This repository is part of the larger **Sound of Essentials** universe:

- 🎮 [The-Sound-of-Essentials-Eco-System](https://github.com/ChefLee5/The-Sound-of-Essentials-Eco-System) — Rhythm Quest game and landing page
- 📖 SOE-Picture-Dictionary ← *(this repo)* — Educational visual companion & ebook

---

*Part of the Sound of Essentials educational product line.*  
*Last updated: April 2026*
