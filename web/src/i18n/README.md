# i18n (Internationalization)

Handles multilingual support for the application.

## Supported languages

- English (en)
- Spanish (es)
- French (fr)

## Structure

```txt
i18n/
├── config.js
├── locales/
│   ├── en.json
│   ├── es.json
│   └── fr.json
```

## Rules

- Do not hardcode user-facing text in components
- Always use translation keys
- Keep key naming consistent

## Example

```js
home.hero.title
home.hero.subtitle
```

## Goal

Ensure all visible text can be translated cleanly across supported languages.
