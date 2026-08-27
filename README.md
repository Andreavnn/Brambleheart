# Brambleheart TTRPG — Beta 0.33

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.33 is a cumulative rules/interface patch. It replaces QR character transfer with Share Codes, refines the Rules layout-test pages, updates Core Abilities/Talents, adds measurement display preferences, revises Bravery/Mana/damage secondary statistics, reduces gear prices, and refines Character Creation review/transfer presentation.

## Main views

- Welcome / Splash
- Character List
- Guided Character Creation
- Character Level Up
- Rules / Rule Reader
- Rule Page Layout Preview (test route)
- Rhythm Engine — Character Sheet and Dice Roller
- Game Updates (small link beneath the Brambleheart logo; not a primary-navigation item)
- Settings
- Site Changelog

## Beta 0.33 focus

- Character transfer uses compressed Share Codes rather than QR generation/scanning. Legacy long `#bhc=` links remain import-compatible and are cleaned immediately after capture.
- Character List combines file/Share Code import and file/Share Code export into unified controls, retains the QR-shaped per-character Share Code shortcut, adds filtering, and uses the Old.dex-style compact Share Code dialog.
- Measurements can display square-based rules as Squares, Yards, Meters, or Feet. The underlying rule remains square-based: 1 square = 1 yard = 1 meter = 3 feet.
- Bravery now provides Heart (Bravery Rank) and Inspiration (Bravery modifier). Mana Pool = Magic Level + Inspiration, while Mana restored at the start of each round = Heart.
- Might Power is renamed Fury (Might Rank) for physical damage. Lore gains Power (Lore Rank) for spell damage.
- All Equipment & Gear purchase prices are reduced by 50%, preserving Threadpiece conversion: 10 WP = 1 NP, 5 NP = 1 SP, 5 SP = 1 BP.
- Spirit Flare requires Threadseer; Talent names are normalized for capitalization.
- Character Creation refines Attribute labels, Bonus Language layout, Review identity spacing, Spell presentation, and one-column Talent presentation.
- The Fundamentals layout test adds roll/Condition/Fortune examples, separates Active & Passive Targets, demonstrates Half-Step with Threadseer, and moves Attributes & Skills to a dedicated preview page with page navigation.
- Game-rule amendments are listed on Game Updates. Site/interface history remains in Site Changelog.

## Dropbox deployment configuration

Brambleheart uses one Dropbox Scoped Access application configured for **App folder** access. The deployed site receives its public Dropbox App Key through `VITE_DROPBOX_APP_KEY`; normal users authorize their own Dropbox accounts and use their own Dropbox storage quota. The browser implementation uses OAuth 2 Authorization Code with PKCE and does not require the Dropbox App secret.

## Runtime

- Node.js 22.x
- Vue 3 / TypeScript / Vite
- Character Share Codes: browser gzip compression where supported, with plain JSON/base64url fallback
