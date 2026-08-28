# Brambleheart TTRPG — Beta 0.36

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.36 is a cumulative game-system, economy, character-sheet, and rules-layout release built on GitHub `main` Beta 0.35.0.

## Main views

- Welcome / Splash
- Character Roster
- Guided Character Creation
- Character Level Up
- Rules / Rule Reader
- Rule Page Layout Preview (test route)
- Rhythm Engine — Character Sheet and Dice Roller
- Rule Updates (small centered link beneath the Brambleheart logo; not a primary-navigation item)
- Settings
- Site Changelog

## Rule Updates v0.02

Rule Updates are versioned independently from application builds.

Current shared secondary statistics are:

- Agility (AGI): Accuracy = Rank; Aim = modifier; Speed = modifier +2.
- Might (MIG): Fury = Rank; Brawl = modifier.
- Hide (HID): Guts = Rank plus equipped protective-gear bonuses; Ward = modifier.
- Lore (LOR): Power = Rank; Control = modifier plus applicable equipment bonuses.
- Bravery (BRY): Heart = Rank; Spirit = modifier.
- Mana Pool = Magic Level + Spirit.
- Magic Regen = Heart. There is no standard +2 modifier; effects that alter start-of-round Mana restoration alter Magic Regen.

## Canonical Threadpiece economy

All runtime money calculations use whole Washer Pieces (`wp`) as the authority. Other denominations are presentation formats:

- 10 wp = 1 np
- 5 np = 1 sp
- 5 sp = 1 bp
- Starting wealth = 30 sp = 1,500 wp
- Adventure Kit creation sellback = 3 sp = 150 wp
- Maximum creation purchasing power after selling the kit = 33 sp = 1,650 wp

Current equipment retail, creation affordability, resale, crafting-value floors, transportation prices, and saved-character migration resolve from the same economy authority. Ordinary gear defaults to 50% resale, trade goods to 75%, and crafting a market-priced item requires eligible listed materials with at least 50% of current retail value before other crafting requirements.

Only one Armor and one Shield may be equipped at a time; only those equipped protective items contribute Guts, Mana Syphon, Stealth, and Might requirements.

## Beta 0.36 focus

- Compact formula-only secondary-stat details with AGI/MIG/HID/LOR/BRY parent labels.
- Magic Regen corrected to Heart, with Magic collapsed by default on the Rhythm Engine Character Sheet.
- Rebuilt economy and item prices, restored Field Blade, equipped Armor/Shield authority, Level Up purchasing/equipping/resale, and legacy wallet/item migration.
- Clearer Half-Step result-band diagram and equal square Threadseer example boxes.
- Character Share Codes remain the transfer method; QR generation/scanning remains removed.

## Measurements

The game remains square-based. Display can be changed in Settings to Squares, Yards, Meters, or Feet using one conversion authority: 1 square = 1 yard = 1 meter = 3 feet. Converted values round up to whole displayed units.

## Dropbox deployment configuration

Brambleheart uses one Dropbox Scoped Access application configured for **App folder** access. The deployed site receives its public Dropbox App Key through `VITE_DROPBOX_APP_KEY`; normal users authorize their own Dropbox accounts and use their own Dropbox storage quota. The browser implementation uses OAuth 2 Authorization Code with PKCE and does not require the Dropbox App secret.

## Runtime

- Node.js 22.x
- Vue 3 / TypeScript / Vite
- Character Share Codes: browser gzip compression where supported, with plain JSON/base64url fallback
