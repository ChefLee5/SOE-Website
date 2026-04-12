# 📖 SOE Picture Dictionary

**Sound of Essentials — Visual Learning Companion**  
*A multimedia educational resource for The Sound of Essentials universe.*

---

## What This Is

The **SOE Picture Dictionary** is the visual learning companion to the *Sound of Essentials: Rhythm Quest* ecosystem. It pairs illustrated characters, environmental assets, and vocabulary from the SOE world with rich educational content — designed to support early literacy, phonics, music vocabulary, math concepts, science, life skills, and ASL for young learners and English language learners.

This repository houses all digital assets, ebook content, bilingual posters, coloring book pages, flashcards, and a web-ready interactive experience for the SOE educational product line.

---

## Repository Contents

```
SOE-Picture-Dictionary/
├── ebook/                                         ← EPUB production files
│   ├── OEBPS/                                     ← Open eBook Publication Structure
│   │   ├── images/                                ← 140+ illustrated vocabulary pages
│   │   ├── pages/                                 ← XHTML page files
│   │   ├── styles/dictionary.css                  ← Stylesheet
│   │   └── content.opf                            ← EPUB manifest
│   ├── META-INF/container.xml                     ← ePub metadata
│   ├── content/                                   ← Source Markdown for each Land
│   │   ├── land1_harmonia.md
│   │   ├── land2_numeria.md
│   │   ├── land3_terrasol.md
│   │   ├── land4_aquaria.md
│   │   ├── land5_vitalis.md
│   │   ├── land6_sophia.md
│   │   ├── land7_celestia.md
│   │   └── back_*.md                              ← Back-matter sections
│   ├── posters/                                   ← Character & bilingual posters
│   │   ├── bilingual-english-[language].png       ← 13 language pairs
│   │   ├── land[1-7]-[name]-alphabet.png          ← Per-Land alphabet posters
│   │   └── flashcards/                            ← A–Z printable flashcard sets
│   ├── build_epub.py                              ← EPUB build script
│   └── generate_pages.py                          ← Page generation automation
├── web/                                           ← Interactive web version (React + Vite)
│   ├── src/
│   │   ├── pages/                                 ← Home, Heroes, Universe, Dictionary, etc.
│   │   ├── components/                            ← Navbar, Footer, SplashScreen, etc.
│   │   ├── i18n/locales/                          ← English, Spanish, French translations
│   │   └── remotion/                              ← Video/trailer generation
│   ├── public/assets/
│   │   ├── characters/                            ← 14 character portrait assets
│   │   ├── duos/                                  ← 7 character duo illustrations
│   │   ├── coloring-book/                         ← Printable coloring pages
│   │   └── soe-book/                              ← Book preview pages
│   ├── scripts/                                   ← Coda sync & data utilities
│   └── HERO_BASE_SETUP.md                         ← Web setup notes
├── SOE coloring book/                             ← 7 printable coloring pages + cover
├── Science of the Sound _ Chronicles of the Clock.pdf   ← Core lore document
├── The Sound of Essentials song lyrics.docx             ← Official song lyrics
├── Elias reference photo.jpg                            ← Lead character reference
└── Quest map.gif                                        ← Animated world map
```

---

## The 7 Lands

Each Land represents a themed vocabulary and learning domain, mapped to a SOE world region and character pair:

| Land | Name | Theme | Character Duo |
|------|------|--------|---------------|
| Land 1 | **Harmonia** | Language, Culture & Daily Life | Kenji & Aiko |
| Land 2 | **Numeria** | Math, Numbers & Money | Silas & Vesta |
| Land 3 | **Terrasol** | Nature, Science & Environment | Felix & Amara |
| Land 4 | **Aquaria** | Travel, Transportation & World | Ezra & Athena |
| Land 5 | **Vitalis** | Health, Body & Wellness | Kwame & Octavia |
| Land 6 | **Sophia** | Community, Work & Life Skills | Elias & Selene |
| Land 7 | **Celestia** | Time, Space & The Universe | Ronan & Nerissa |

---

## Characters

The SOE universe features **14 main characters** across 7 hero duos, plus the **Eternal Learning Mother**:

- **Kenji & Aiko** — Land 1 guides (Harmonia)
- **Silas & Vesta** — Land 2 guides (Numeria)
- **Felix & Amara** — Land 3 guides (Terrasol)
- **Ezra & Athena** — Land 4 guides (Aquaria)
- **Kwame & Octavia** — Land 5 guides (Vitalis)
- **Elias & Selene** — Land 6 guides (Sophia); Elias is the lead musical explorer
- **Ronan & Nerissa** — Land 7 guides (Celestia)
- **Eternal Learning Mother** — The guiding presence across all lands

*Full character lore, regions, and world-building are documented in the Chronicles of the Clock PDF.*

---

## Ebook Content Sections

### Main Vocabulary Pages (~140 illustrated topics across 7 Lands)
Each Land contains 20 illustrated vocabulary topics. Examples:
- Land 1: Greetings, Family, Emotions, Music Instruments, Daily Routines, School, Clothing...
- Land 2: Numbers, Shapes, Fractions, Money, Charts, Cooking Measurements...
- Land 3: Wild Animals, Weather, The Garden, Farming, Nature, Recycling...
- Land 4: Transportation, Travel, Maps, Directions, Community Places, Ocean Life...
- Land 5: The Human Body, Nutrition, Health & Hygiene, Mental Health, Sports...
- Land 6: Occupations, Government, Job Skills, Legal Terms, Community Helpers...
- Land 7: Solar System, Time & Clocks, Planet Earth, Inventions, The Future...

### Back Matter
| Section | Content |
|---------|---------|
| Action Verbs | Body movement & everyday life verbs |
| Adjectives | Feelings, colors, qualities & opposite pairs |
| ASL Alphabet | A–M, N–Z, and numbers 0–10 |
| ASL Essentials | 100 signs across 4 categories (greetings, family, feelings/food, daily actions) |
| A–Z Index | Full word index across all Lands (A–C, D–K, L–R, S–Z) |
| Sight Words | 3 groups of essential sight words |
| Visual Glossary | 4 real-world settings (home, store, doctor, street) |
| Parent & Teacher Guide | Classroom commands, study skills, parent engagement vocabulary |

---

## Bilingual Posters

The dictionary includes **13 bilingual English companion posters**:

Arabic · French · German · Hindi · Italian · Japanese · Korean · Mandarin · Portuguese · Russian · Spanish · Swahili · Turkish

---

## Flashcards

Printable A–Z flashcard sets (7 card sheets):
`A–D` · `E–H` · `I–L` · `M–P` · `Q–T` · `U–X` · `Y–Z`

---

## Building the EPUB

```bash
# Generate individual XHTML pages from content
python3 generate_pages.py

# Build the full EPUB
python3 build_epub.py
```

Output: a standards-compliant `.epub` file ready for distribution on Amazon KDP, Apple Books, and other platforms.

---

## Web Version Setup

```bash
cd web
npm install
npm run dev
```

The web version uses **React + Vite** with the SOE Gold & Dark Deep Space premium theme. Features include:

- Interactive dictionary with audio
- Character gallery (Heroes page)
- Universe/lore exploration
- Multilingual support (English, Spanish, French)
- Remotion-powered video/trailer generation
- Coda sync integration for live hero data

---

## Product Line

| Format | Status |
|--------|--------|
| EPUB (eBook) | 🔲 In development |
| Web Interactive | 🔲 In development |
| Printable Coloring Book (7 pages) | ✅ Assets complete |
| Bilingual Posters (13 languages) | ✅ Assets complete |
| A–Z Flashcards | ✅ Assets complete |
| Land Alphabet Posters (7 Lands) | ✅ Assets complete |
| Character Art (14 characters + duos) | ✅ In repository |
| Song Lyrics & Educational Content | ✅ Documented |
| ASL Alphabet & Essentials (100 signs) | ✅ Pages generated |

---

## Connection to the SOE Ecosystem

This repository is part of the larger **Sound of Essentials** universe:

- 🎮 [The-Sound-of-Essentials-Eco-System](https://github.com/ChefLee5/The-Sound-of-Essentials-Eco-System) — Rhythm Quest game and landing page
- 📖 SOE-Picture-Dictionary ← *(this repo)* — Educational visual companion & ebook

---

*Part of the Sound of Essentials educational product line.*
