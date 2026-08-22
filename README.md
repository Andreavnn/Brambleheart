# Brambleheart TTRPG — Beta Build 0.08

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
- Default, Adventurer, Storyteller, Tactician, and Mystic themes
- Fixed selectable background artwork plus Default
- Installable web-app support
- Discord/community access
- Rules search, recently viewed rule boxes, References, and standalone rule-reader pages
- Guided character creation with Species art, Culture Trait picker, local draft saving, and source-backed Talent/Magic validation
- Character pinning and locking
- Character-linked Combat Encounters with secondary stats, Skills, Talents, Mana, Spells, Abilities, attack/defence, and damage tools
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
- Output Directory: `dist/`
- Node.js: 22.x
