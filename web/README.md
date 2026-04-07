# 🌐 SOE: Rhythm Quest — Website

**The Sound of Essentials: Rhythm Quest** companion web app.  
An interactive, multilingual educational experience built with React + Vite.

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
| `/` | `Home.jsx` | Hero section, features overview, CTA |
| `/universe` | `Universe.jsx` | Seriphia intro, 7 Lands map, duo character cards |
| `/characters` | `Heroes.jsx` | Full character roster with land-colored avatar cards |
| `/science` | `Science.jsx` | Music pedagogy (Dalcroze, Orff, Kodály) + Elias lore |
| `/media` | `MediaRoom.jsx` | Music tracks carousel, coloring book + SOE storybook viewer |
| `/dictionary` | `Dictionary/` | Interactive vocabulary dictionary |
| `/join` | `JoinQuest.jsx` | Book preview, join CTA |
| `/mission` | `Mission.jsx` | Educational mission and about section |

---

## 🧩 Components

| Component | Purpose |
|---|---|
| `Navbar.jsx` | Fixed top nav — logo left / links center / CTA right (Bricolage Grotesque) |
| `Footer.jsx` | Site-wide footer with links and social |
| `SplashScreen.jsx` | Animated intro screen on first load |
| `SplineBackground.jsx` | Interactive 3D Earth background (Spline WebGL) |
| `ParallaxHero.jsx` | SVG parallax hero for inner pages |
| `AnimatedPage.jsx` | Page transition wrapper (Framer Motion) |
| `AudioVisualizer.jsx` | Real-time audio waveform visualizer |
| `ResearchAssistant.jsx` | AI-powered research assistant widget |
| `ScrollToTop.jsx` | Auto-scrolls to top on route change |

---

## 🎨 Design System

### Typography
| Variable | Font | Use |
|---|---|---|
| `--font-display` | Bricolage Grotesque | Headings, navbar, hero titles |
| `--font-heading` | Fredoka / Outfit | Section headers, card titles |
| `--font-body` | Inter | Body copy, descriptions |
| `--font-cursive` | Dancing Script | Accent text, logo sub |

### Key Colors
| Variable | Value | Use |
|---|---|---|
| `--color-green` | `#4CAF50` | Primary accent, active states |
| `--color-orange` | `#FF7043` | Secondary accent |
| `--color-gold` | `#D4A843` | Premium accents, Harmonia land |
| `--color-purple` | `#7B1FA2` | Pedagogy section |

### 7 Land Colors
| Land | Color |
|---|---|
| 🎵 Harmonia | `#d4a843` |
| 🔢 Numeria | `#7fb685` |
| 🤸 Vitalis | `#c4785a` |
| ⏰ Chronia | `#9678c4` |
| 📖 Lexiconia | `#d4a843` |
| 📐 Geometria | `#7fb685` |
| 🌊 Natura | `#5ba4c9` |

---

## 🌍 Internationalization (i18n)

Supports **English**, **Spanish**, and **French** via `react-i18next`.

```
src/i18n/
├── config.js              ← i18next setup
└── locales/
    ├── en.json            ← English (primary)
    ├── es.json            ← Spanish
    └── fr.json            ← French
```

Language toggle is in the navbar — cycles EN → FR → ES.

---

## 📁 Asset Structure

```
public/assets/
├── characters/            ← 15 character PNGs (AIKO, AMARA, ATHENA, ELIAS,
│                             EZRA, FELIX, KENJI, KWAME, NERISSA, OCTAVIA,
│                             RONAN, SELENE, SERIPHIA, SILAS, VESTA)
├── duos/                  ← 7 land duo illustrations
├── coloring-book/         ← Printable coloring pages
└── soe-book/              ← Interior storybook pages
```

---

## 🏗️ Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Vite | 7 | Build tool + dev server |
| React Router | 6 | Client-side routing |
| Framer Motion | — | Page transitions + animations |
| react-i18next | — | Multilingual support |
| @splinetool/react-spline | — | 3D interactive background |

---

## 📦 Deploy

Deployed automatically to **GitHub Pages** via GitHub Actions on every push to `main`.

Workflow: `.github/workflows/deploy.yml`

```
push to main → build (npm run build) → upload web/dist/ → GitHub Pages
```

**Manual trigger:** GitHub → Actions → "Deploy to GitHub Pages" → Run workflow

**One-time setup:** Repo Settings → Pages → Source → **GitHub Actions**

---

## 🔧 Scripts

```bash
npm run dev      # Start local dev server (port 5173)
npm run build    # Build production bundle → web/dist/
npm run preview  # Preview production build locally
```

---

## 📖 Related

- [Root README](../README.md) — Full project overview including the EPUB dictionary
- [EPUB Build Guide](../ebook/BUILD_GUIDE.md) — How to build the ebook
- [SOE Ecosystem](https://github.com/ChefLee5/The-Sound-of-Essentials-Eco-System) — Main game repo
