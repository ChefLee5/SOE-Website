# 📖 SOE Picture Dictionary

**Sound of Essentials — Visual Learning Companion**  
*A multimedia educational resource for The Sound of Essentials universe.*

---

## What This Is

The SOE Picture Dictionary is the visual learning companion to **The Sound of Essentials: Rhythm Quest** ecosystem. It pairs illustrated characters, environmental assets, and key concepts from the SOE world with educational content — designed to support early literacy, phonics, and music vocabulary for young learners.

This repository houses all digital assets, ebook content, and web-ready learning materials for the SOE educational product line.

---

## Repository Contents

```
SOE-Picture-Dictionary/
├── ebook/                               ← EPUB production files
│   ├── OEBPS/                           ← Open eBook Publication Structure
│   ├── META-INF/                        ← ePub metadata
│   ├── content/                         ← Chapter content and illustrations
│   ├── posters/                         ← Character and scene posters
│   ├── build_epub.py                    ← EPUB build script
│   └── generate_pages.py               ← Page generation automation
├── web/                                 ← Web-based interactive version
│   ├── src/                             ← React/Vite source
│   ├── public/                          ← Static assets
│   └── HERO_BASE_SETUP.md              ← Web setup notes
├── SOE coloring book/                   ← Printable coloring pages
├── Science of the Sound _ Chronicles of the Clock.pdf   ← Core lore document
├── The Sound of Essentials song lyrics.docx             ← Official song lyrics
├── Elias reference photo.jpg            ← Lead character reference
└── Quest map.gif                        ← Animated world map
```

---

## Key Characters

- **Elias** — Lead character. Musical explorer navigating the SOE world.

*Additional characters, regions, and lore documented in the Chronicles of the Clock PDF.*

---

## Building the EPUB

```bash
# Generate individual pages
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

The web version uses **React + Vite** with the SOE Gold & Dark Deep Space premium theme. It serves as an interactive landing page and preview experience for the full dictionary content.

---

## Product Line

| Format | Status |
|---|---|
| EPUB (eBook) | 🔲 In development |
| Printable Coloring Book | 🔲 In development |
| Web Interactive | 🔲 In development |
| Song Lyrics / Educational Content | ✅ Documented |
| Character Reference Art | ✅ In repository |

---

## Connection to the SOE Ecosystem

This repository is part of the larger **Sound of Essentials** universe:

- 🎮 [The-Sound-of-Essentials-Eco-System](https://github.com/ChefLee5/The-Sound-of-Essentials-Eco-System) — Rhythm Quest game and landing page
- 📖 SOE-Picture-Dictionary ← (this repo) — Educational visual companion

---

*Part of the Sound of Essentials educational product line.*
