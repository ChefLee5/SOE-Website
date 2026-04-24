# Assets

This folder contains media files imported directly into React components.

## What belongs here

Use this folder for assets that are referenced with JavaScript imports, such as:

- character art used inside components
- land/world imagery used in page sections
- logos and brand marks used by React components
- icons and UI graphics
- texture files used by visual components

## Recommended structure

```txt
assets/
├── characters/
├── lands/
├── logos/
├── textures/
└── icons/
```

## Naming convention

Use lowercase kebab-case:

```txt
kenji-profile.png
aiko-profile.png
harmonia-background.webp
soe-logo-gold.svg
```

## What does not belong here

Do not place large public media here if it does not need to be imported by React.

Use `public/` for:

- large videos
- long audio files
- favicons
- downloadable files
- static files referenced by direct URL

## Rule of thumb

If a component imports the file, place it here.

If the browser accesses it directly by URL, place it in `public/`.
