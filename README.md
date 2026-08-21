# Brambleheart App — Alpha Build 0.03

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router companion application with shared components, routed views, centralized rules/data, persistent local settings, and a `dist/` production build.

## Main views

- Splash / Home
- Character List
- Rules
- Simulator
- Settings

## Current interface features

- Light, dark, and system appearance modes
- Five text sizes plus optional bold text
- Species palette themes for all current playable species
- Background selector prepared for future artwork
- Installable web-app support on compatible browsers
- Rules search and recent rules
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

Recommended settings:

- Framework Preset: Vite
- Root Directory: `./`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: 22.x
- Environment Variables: none currently required

## Local data

Characters, display preferences, and recent rule entries are saved in browser `localStorage`.
