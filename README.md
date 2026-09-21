# Brambleheart TTRPG — Beta 0.13
Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.13 is the current **Site Update**. Site Updates track application, interface, storage, navigation, presentation, and deployment changes. Brambleheart game-rule changes are tracked separately as **Game Updates**.

## Current Site Update — Beta 0.13

Beta 0.13 restructures the Anthro Mundas lore sequence, adds per-page lore illustration slots, locks unfinished Watcher monster entries behind clear disabled states, restores Adventure Kit gear to Level Up equipment review, aligns deed reward pills, and converts Character Sheet magic cards to independent two-column presentation.

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

- Site Update / BUILD/export: `0.13`
- package version: `0.13.0`
- PWA cache: `v0.13`
- Game Update: `v0.01`
- Site Update history: `CHANGELOG.md`
- Game Update history: `src/data/gameUpdates.ts`

## Runtime

- Node.js 22.x
- Vue 3 / TypeScript / Vite
- Character Share Codes: browser gzip compression where supported, with plain JSON/base64url fallback
