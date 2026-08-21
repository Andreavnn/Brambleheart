# Bramble Heart App

Alpha companion app for the Bramble Heart TTRPG.

## v0.1

- Character List with local persistence, creation, JSON import/export, and creation-rule validation.
- Rules browser seeded from the current Bramble Heart project documents.
- Simulator for the Rhythm Engine, Strike vs Ward, damage/Guts, Health/Hallows, and advancement XP costs.
- Settings for appearance, text size, compact cards, and local-data reset.
- Responsive GUI patterned after the current Old.dex app structure: centered mobile-first pages, persistent four-part primary navigation, warm card surfaces, strong section hierarchy, and light/dark themes.

## Run locally

```bash
npm run dev
```

Open `http://127.0.0.1:4173`.

## Test and build

```bash
npm run check
```

The production-ready static files are written to `dist/`.

## Source fidelity

v0.1 intentionally does not silently reconcile conflicting source terminology. In particular, the uploaded Fundamentals chapter uses **Agility**, while Character Creation and Battle material currently use **Prowess** in some places. The app marks this and avoids auto-calculating Speed until the project rules settle the naming relationship.

Bramble Heart rules and setting © project owner. App prototype build 0.1.
