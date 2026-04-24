# Components

Reusable UI building blocks used across the application.

## What belongs here

- layout components (Navbar, Footer)
- UI components (buttons, cards, sections)
- animation wrappers (AnimatedPage, SplashScreen)
- shared visual elements

## Recommended structure

```txt
components/
├── layout/
├── animation/
├── ui/
└── media/
```

## Naming convention

Use PascalCase for components:

```txt
Navbar.jsx
Footer.jsx
AnimatedPage.jsx
```

## Rules

- Components should be reusable
- Avoid putting page-specific logic here
- Keep components small and focused

## What does not belong here

- full page layouts (use `/pages`)
- static data (use `/data`)
- global utilities (use `/utils`)
