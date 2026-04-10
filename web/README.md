# 🎵 SOE: Rhythm Quest — Website

**The Sound of Essentials: Rhythm Quest** companion web app.  
A multilingual, music-driven educational experience built with React + Vite.  
*Designed for the developing brain — not the algorithm.*

---

## 🔗 Links

| | URL |
|---|---|
| **Live site** | [cheflee5.github.io/SOE-Picture-Dictionary/The-Sound-of-Essentials-Eco-System/](https://cheflee5.github.io/SOE-Picture-Dictionary/The-Sound-of-Essentials-Eco-System/) |
| **GitHub repo** | [github.com/ChefLee5/SOE-Picture-Dictionary](https://github.com/ChefLee5/SOE-Picture-Dictionary) |
| **Local dev** | `http://localhost:5173/The-Sound-of-Essentials-Eco-System/` |

---

## 🚀 Getting Started

```bash
cd web
npm install
npm run dev
```

Open: **http://localhost:5173/The-Sound-of-Essentials-Eco-System/**

---

## 🗺️ Pages

| Route | File | Description |
|---|---|---|
| `/` | `Home.jsx` | Hero section, character grid, 5-domain curriculum, stats, CTA |
| `/universe` | `Universe.jsx` | Seriphia intro, 7 Lands tile grid, pedagogy (Dalcroze/Orff/Kodály) |
| `/heroes` | `Heroes.jsx` | Full 15-character roster — land-filtered, expandable bio cards |
| `/science` | `Science.jsx` | Music pedagogy deep-dive, track breakdown, ResearchAssistant AI widget |
| `/media` | `MediaRoom.jsx` | 19-track audio player, coloring book viewer, SOE storybook reader |
| `/mission` | `Mission.jsx` | Educational mission, team, philosophy |
| `/join` | `JoinQuest.jsx` | Newsletter signup, audience role cards, partnership contact form |
| `/dictionary` | `Dictionary/` | Interactive vocabulary dictionary (4,000+ words across 7 Lands) |

---

## 🧩 Components

| Component | Purpose |
|---|---|
| `Navbar.jsx` | Fixed top nav — logo / links / language toggle / mobile drawer |
| `Footer.jsx` | Rainbow-accent footer with links, socials, newsletter CTA |
| `SplashScreen.jsx` | Animated intro on first load — colour orbs, gradient title |
| `ParallaxHero.jsx` | Layered SVG parallax hero used on inner pages |
| `AnimatedPage.jsx` | Page transition wrapper (Framer Motion fade-slide) |
| `AudioVisualizer.jsx` | Real-time canvas waveform visualizer for the audio player |
| `ResearchAssistant.jsx` | AI research widget powered by Perplexity API |
| `ScrollToTop.jsx` | Resets scroll position on every route change |

---

## 🎨 Design System

### Typography
| Variable | Font | Use |
|---|---|---|
| `--font-display` | Bricolage Grotesque | Headings, navbar, hero titles |
| `--font-heading` | Fredoka / Outfit | Section headers, card titles |
| `--font-body` | Inter | Body copy, descriptions |

### Base Palette
| Variable | Value | Use |
|---|---|---|
| `--color-bg` | `#FAFAF7` | Page background (warm white) |
| `--color-text` | `#1a1a2e` | Primary text |
| `--color-green` | `#4CAF50` | Primary accent, active states |
| `--color-orange` | `#FF7043` | Secondary accent |
| `--color-gold` | `#D4A843` | Premium accents |
| `--color-purple` | `#7B1FA2` | Pedagogy & science sections |

### 7 Land Accent Colors
| Land | Accent |
|---|---|
| 🎵 Harmonia | `#d4a843` |
| 🔢 Numeria | `#7fb685` |
| 🤸 Vitalis | `#c4785a` |
| ⏰ Chronia | `#9678c4` |
| 📖 Lexiconia | `#e0875a` |
| 📐 Geometria | `#5b9bd5` |
| 🌊 Natura | `#5ba4c9` |

### Animations
- **RevealSection** (`src/hooks/useReveal.jsx`) — shared IntersectionObserver fade-in used across all pages
- Framer Motion used for page transitions and audio player micro-interactions

---

## 🌍 Internationalization (i18n)

Supports **English**, **Spanish**, and **French** via `react-i18next`.

```
src/i18n/
├── config.js              ← i18next setup
└── locales/
    ├── en.json            ← English (primary) — ~558 lines
    ├── es.json            ← Spanish — fully translated
    └── fr.json            ← French — fully translated
```

Language toggle is in the navbar — cycles **EN → FR → ES**.  
All `t()` keys are audited and consistent across all three locale files.

---

## 📁 Asset Structure

```
public/
├── robots.txt              ← SEO crawler rules
├── sitemap.xml             ← All 7 routes with priorities
└── assets/
    ├── characters/         ← 15 character full-body PNGs (*_crop.png)
    │                          AIKO, AMARA, ATHENA, ELIAS, EZRA, FELIX,
    │                          KENJI, KWAME, NERISSA, OCTAVIA, RONAN,
    │                          SELENE, SERIPHIA, SILAS, VESTA
    ├── duos/               ← 7 land duo group illustrations
    ├── coloring-book/      ← Printable coloring pages
    ├── soe-book/           ← SOE storybook interior pages
    └── favicon.png         ← Site favicon (used in index.html)
```

---

## 🏗️ Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Vite | 7 | Build tool + dev server |
| React Router | 6 | Client-side routing + lazy loading |
| Framer Motion | — | Page transitions + animations |
| react-i18next | — | EN / ES / FR multilingual support |

---

## 📦 Deploy

### GitHub Pages (auto)
Deployed automatically on every push to `main` via GitHub Actions.

```
push to main → npm run build → upload web/dist/ → GitHub Pages
```

Workflow: `.github/workflows/deploy.yml`  
**Manual trigger:** GitHub → Actions → "Deploy to GitHub Pages" → Run workflow

### Vercel (alternative)
`vercel.json` is configured and ready:
- SPA rewrite rule (`/* → /index.html`)
- 1-year immutable cache on all hashed JS/CSS assets
- 1-week cache on images, audio, and PDFs
- Security headers on all routes (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`)

---

## 🔧 Scripts

```bash
npm run dev      # Start local dev server (port 5173)
npm run build    # Build production bundle → web/dist/
npm run preview  # Preview production build locally
```

---

## 🔑 Environment Variables

Create a `.env` file in `web/` for optional features:

```env
VITE_PERPLEXITY_API_KEY=your_key_here   # Powers the AI ResearchAssistant on /science
```

---

## 📖 Related

- [Root README](../README.md) — Full project overview including the EPUB dictionary
- [EPUB Build Guide](../ebook/BUILD_GUIDE.md) — How to build the ebook
- [SOE Ecosystem](https://github.com/ChefLee5/The-Sound-of-Essentials-Eco-System) — Main game repo
