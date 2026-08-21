# Brambleheart App — Alpha Build 0.05

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router companion application for character creation, rules reading, and tabletop tools.

## Main views

- First-visit Welcome
- Character List
- Guided Character Creation
- Rules table of contents
- Standalone Rules Reader pages
- Simulator
- Settings
- Changelog

## Current interface features

- Light reader default plus dark mode
- Smaller / Small / Normal / Large / Larger text sizes and optional bold text
- Species palette themes
- Five fixed-cover background illustrations
- Installable web-app support with proportional PWA icons
- Local character persistence, import/export, and pinning
- Local rules reader populated from the supplied Brambleheart rule documents
- Rules search, Recent, Quick Reference, FAQ, and Changes & Updates
- Rhythm Engine five-roll history and optional targets
- Persistent combat encounters and encounter history
- Custom Data JSON storage

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
