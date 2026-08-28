# Brambleheart TTRPG — Beta 0.35

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.35 is a cumulative interface and rules-clarity release built on the current Beta 0.34 GitHub implementation.

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

## Current rules-update version

Rule Updates are versioned independently from application builds. Beta 0.35 continues **Rule Updates v0.01**.

Current shared secondary statistics are:

- Agility: Accuracy = Rank; Aim = modifier; Speed = modifier +2.
- Might: Fury = Rank; Brawl = modifier.
- Hide: Guts = Rank plus applicable equipment bonuses; Ward = modifier.
- Lore: Power = Rank; Control = modifier plus applicable equipment bonuses.
- Bravery: Heart = Rank; Spirit = modifier.
- Mana Pool = Magic Level + Spirit.
- Magic Regen = Heart +2 and is the amount of Mana restored at the start of each round. Effects that alter start-of-round Mana restoration alter Magic Regen.

## Beta 0.35 focus

- Character Creation highlights the Agility modifier contribution to Speed and expands the Mana Pool / Magic Regen explanation.
- Character Creation Review and Rhythm Engine share one Attribute/secondary-stat presentation with AGL, MIG, HID, LOR, and BRY shorthand.
- Character Roster Filter opens as a contained full-width panel beneath the action bar.
- Reset Local Settings is the final control in Settings → Display.
- Character Sheet Skills, Magic, Talents, and Equipment & Gear have additional title-to-content spacing.
- The Fundamentals test page corrects Half-Step presentation and Edged/Weighted examples.
- The Attributes & Skills test page combines Skills and Skill Trees, moves Expanded & Restricted to the bottom, and uses production-style Skill Tree cards.
- Character transfer remains Share Code based; QR generation/scanning remains removed.

## Measurements

The game remains square-based. Display can be changed in Settings to Squares, Yards, Meters, or Feet using one conversion authority: 1 square = 1 yard = 1 meter = 3 feet. Converted values round up to whole displayed units.

## Dropbox deployment configuration

Brambleheart uses one Dropbox Scoped Access application configured for **App folder** access. The deployed site receives its public Dropbox App Key through `VITE_DROPBOX_APP_KEY`; normal users authorize their own Dropbox accounts and use their own Dropbox storage quota. The browser implementation uses OAuth 2 Authorization Code with PKCE and does not require the Dropbox App secret.

## Runtime

- Node.js 22.x
- Vue 3 / TypeScript / Vite
- Character Share Codes: browser gzip compression where supported, with plain JSON/base64url fallback
