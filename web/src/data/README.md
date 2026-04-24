# Data

Static structured content used by the application.

## What belongs here

- character definitions
- land/world data
- navigation structure
- media metadata
- curriculum or educational content

## Example structure

```txt
data/
├── characters.js
├── lands.js
├── navigation.js
└── media.js
```

## Rules

- Keep content separate from UI
- Pages should read from data files, not hardcode content
- Use consistent object shapes

## What does not belong here

- UI components
- styling
- API logic (unless strictly static)

## Goal

This folder should act as the single source of truth for content.
