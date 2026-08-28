# Brambleheart TTRPG — Beta 0.34

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.34 is a cumulative rules/interface release built on Beta 0.33. It clarifies the secondary-stat system, introduces Rule Updates versioning independent from site builds, expands post-creation character management, refines Threadpiece economy handling, repairs Settings switches, and develops the isolated Fundamentals layout test further.

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

Rule Updates are versioned independently from the application build. Beta 0.34 uses **Rule Updates v0.01**.

Current shared secondary statistics are:

- Agility: Aim = modifier; Accuracy = Rank; Speed = modifier +2.
- Might: Brawl = modifier; Fury = Rank.
- Hide: Ward = modifier; Guts = Rank plus applicable equipment bonuses.
- Lore: Control = modifier plus applicable equipment bonuses; Power = Rank.
- Bravery: Spirit = Rank; Heart = modifier.
- Mana Pool = Magic Level + Heart; Mana restored at the start of each round = Spirit.

## Beta 0.34 focus

- Character List is renamed Character Roster. Create/Import/Export remain grouped at left and Filter moves to the right.
- Level Up can now record earned Threadpieces, maintain a simple Treasure list, and purchase Equipment & Gear.
- New characters begin with 30 sp and may sell the Adventure Kit for 2 sp.
- Equipment & Gear retains the 50% cost reduction from Beta 0.33. Fractional discounted Threadpieces round down, and visible currency initials use lowercase `wp`, `np`, `sp`, and `bp`.
- Rhythm Engine Character Sheet groups secondary stats by their parent Attribute and presents Mana Pool and Speed below those groups.
- Settings places Measurements below Bold Text and Reset Local Settings below Measurements; switch-style radio presentation is repaired for Theme, Background, and Measurement choices.
- The Fundamentals layout test adds revised Conditions, Edged/Weighted examples, expanded target guidance, and a Half-Step die/math graphic.
- Character transfer remains Share Code based; QR generation/scanning remains removed.
- The in-app Site Changelog is generated from `CHANGELOG.md`, keeping one release-history authority.

## Measurements

The game remains square-based. Display can be changed in Settings to Squares, Yards, Meters, or Feet using one conversion authority: 1 square = 1 yard = 1 meter = 3 feet. Converted values round up to whole displayed units.

## Dropbox deployment configuration

Brambleheart uses one Dropbox Scoped Access application configured for **App folder** access. The deployed site receives its public Dropbox App Key through `VITE_DROPBOX_APP_KEY`; normal users authorize their own Dropbox accounts and use their own Dropbox storage quota. The browser implementation uses OAuth 2 Authorization Code with PKCE and does not require the Dropbox App secret.

## Runtime

- Node.js 22.x
- Vue 3 / TypeScript / Vite
- Character Share Codes: browser gzip compression where supported, with plain JSON/base64url fallback
