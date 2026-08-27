# Brambleheart TTRPG — Beta 0.32

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.32 replaces QR character transfer with Share Codes, deterministically cleans legacy long share URLs after receipt, refines the isolated Rules layout test, reorganizes Core Abilities and Talents, restores Character List transfer text, and corrects the footer image scale.

## Main views

- Welcome / Splash
- Character List
- Guided Character Creation
- Character Level Up
- Rules / Rule Reader
- Rule Page Layout Preview (test route)
- Rhythm Engine — Character Sheet and Dice Roller
- Settings
- Site Changelog

## Beta 0.32 focus

- Replaces character QR generation/scanning with compressed Share Codes and removes QR-specific dependencies.
- Keeps the QR-shaped per-character icon as the Share Code action.
- Adds Import Share Code to Character List and retains JSON import/export.
- Native sharing sends the Share Code in the message while the URL remains `https://www.brambleheartrpg.com/characters`.
- Legacy `#bhc=` links remain readable, but their long URL fragment is removed from the address bar immediately after Brambleheart captures it.
- Reduces the footer Brambleheart image to 65px.
- Shortens the Settings page detail description.
- Moves Rule Page Layout Test into its own Rules parent immediately below The Watcher and refines the Fundamentals test layout using the supplied dice artwork.
- Renames Keyword Abilities to Core Abilities, moves seven former Core Abilities into Talents, and applies the Swiftstride / Range Strike renames.

## Dropbox deployment configuration

Brambleheart uses one Dropbox Scoped Access application configured for **App folder** access. The deployed site receives its public Dropbox App Key through `VITE_DROPBOX_APP_KEY`; normal users then authorize their own Dropbox accounts and use their own Dropbox storage quota. The browser implementation uses OAuth 2 Authorization Code with PKCE and does not require the Dropbox App secret.

## Runtime

- Node.js 22.x
- Vue 3 / TypeScript / Vite
- Character Share Codes: browser gzip compression where supported, with plain JSON/base64url fallback
