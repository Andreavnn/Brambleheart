# Brambleheart App — Alpha Build 0.04

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router companion application.

## Main views

- First-visit Welcome
- Character List
- Rules
- Simulator
- Settings
- Changelog

## Interface features

- Compact shared reader GUI across all primary pages
- Light and dark modes
- Compact Rows
- Smaller / Small / Normal / Large / Larger text sizes
- Optional Bold Text
- Species palette themes for all current playable species
- Background control prepared for later artwork; None is the only current option
- Installable web-app support on compatible browsers
- Rules Search and Recent reference entries
- Local character persistence and JSON import/export

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
