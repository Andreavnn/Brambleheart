# Brambleheart TTRPG — Beta 0.06

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

## Main views

- Welcome / Splash
- Character List
- Guided Character Creation
- Rules
- Rule Reader
- Simulator
- Settings
- Site Changelog

## Current companion features

- Responsive reader interface with light/dark modes and selectable text sizes
- Species palette themes and selectable fixed-cover Brambleheart backgrounds
- Local character persistence, JSON import/export, and character pinning
- Source-backed Rules reader with Search, Recent Rules, Quick Reference, FAQ, and Changes & Updates
- Guided character creation with source-backed Species, Culture, Skills, Magic, Talents, equipment, and Languages
- Rhythm Engine roll history and Encounter tracking
- Installable web-app support on compatible browsers
- Donation links, Custom Data, local-data reset controls, and a protected repository cleanup workflow

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
