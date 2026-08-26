# Brambleheart TTRPG — Beta 0.27

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.27 is a focused Google Drive character-sync release built directly on current GitHub main after Beta 0.26.

## Main views

- Welcome / Splash
- Character List
- Guided Character Creation
- Character Level Up
- Rules / Rule Reader
- Rhythm Engine — Character Sheet and Dice Roller
- Settings
- Site Changelog

## Beta 0.27 focus

- Adds local-first, manually triggered Google Drive Character Sync under Settings → Data & Content → Character Data.
- Links one exact Google Workspace Shared Drive folder through a server-side service account; Google credentials never enter browser storage or repository source.
- Searches only direct files in the linked folder and only `_BH.json` character files; subfolders are not scanned.
- Updates local characters by stable internal character ID, replacing exact matches and adding new Drive records while retaining unmatched local records.
- Uploads local characters as human-readable `CharacterName_BH.json` files, updating the existing Drive file when the internal ID already matches.
- Adds a downloadable plain-text setup and troubleshooting guide directly inside the Character Data menu.
- Keeps synchronization explicit: there is no automatic polling or background Drive access.
- Preserves the Node runtime pin at `22.x`.

## Google Drive deployment configuration

The site owner must configure `BH_DRIVE_SERVICE_ACCOUNT_EMAIL`, `BH_DRIVE_SERVICE_ACCOUNT_PRIVATE_KEY`, and `BH_DRIVE_LINK_SECRET` as private Vercel environment variables. Two-way service-account sync requires a folder inside a Google Workspace Shared Drive. The complete setup procedure is available from Settings → Data & Content → Character Data.

## Runtime

- Node.js 22.x
- Vue 3 / TypeScript / Vite
