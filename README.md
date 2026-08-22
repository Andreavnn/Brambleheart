# Brambleheart TTRPG — Beta Build 0.07

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router companion application for character creation, rules reference, Rhythm Engine checks, and Combat Encounter tracking.

## Main views

- Welcome / Splash
- Character List
- Create Character
- Rules
- Rhythm Engine
- Settings
- Site Changelog

## Current interface features

- Light and dark readers
- Smaller / Small / Normal / Large / Larger text sizes and optional Bold Text
- Adventurer, Storyteller, Tactician, and Mystic themes
- Fixed selectable background artwork plus Default
- Installable web-app support
- Discord/community access
- Rules search, Recent rules, Quick Reference, and standalone rule-reader pages
- Guided character creation with Species art and local draft saving
- Character pinning and locking
- Attribute Check history and persistent Combat Encounter tracking
- Local JSON character import/export and Custom Data support

## Development

```bash
npm install
npm run dev
```

## Validation / production build

```bash
npm run typecheck
npm run build
```

Vite writes the deployable application to `dist/`.

## Vercel

- Framework Preset: Vite
- Root Directory: `./`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: 22.x
