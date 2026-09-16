# Brambleheart TTRPG — Beta 0.09
Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.09 is the current **Site Update**. Site Updates track application, interface, storage, navigation, presentation, and deployment changes. Brambleheart game-rule changes are tracked separately as **Game Updates**.

## Current Site Update — Beta 0.09

Beta 0.09 aligns the Level Up experience with the Rhythm Engine Character Sheet shell, adds direct Level Up navigation from Character Sheets, applies character accent colors to the Dice Roller, gives Monster Profile columns independent vertical flow, adds Threat Level detail to Monster links, updates The Ancients reference and navigation order, and aligns Saved Encounter controls with Character Roster action buttons.

## Current Game Update — v0.01

Game Update v0.01, **Launch Patch**, is the single canonical Game Update. The former v0.02 Dual Wielding & Sapguard notes are now consolidated into the Launch Patch rather than maintained as a separate Game Update entry.

## Canonical Threadpiece economy

- 10 wp = 1 np
- 5 np = 1 sp
- 5 sp = 1 bp
- Starting wealth = 30 sp

Protective loadout remains limited to one armor and one shield. Trinkets are passive equipped gear and do not consume protective equipment space.

## Measurements

The game remains square-based. Rule text displays bracketed distances with a space before the unit, such as `[3] squares`. The site can display Squares, Yards, Meters, or Feet through the shared measurement display setting.

## Release integrity

- Site Update / BUILD/export: `0.09`
- package version: `0.09.0`
- PWA cache: `v0.09`
- Game Update: `v0.01`
- Site Update history: `CHANGELOG.md`
- Game Update history: `src/data/gameUpdates.ts`

## Runtime

- Node.js 22.x
- Vue 3 / TypeScript / Vite
- Character Share Codes: browser gzip compression where supported, with plain JSON/base64url fallback
