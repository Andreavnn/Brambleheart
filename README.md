# Brambleheart TTRPG — Beta 0.30

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.30 adds character QR sharing, corrects the character completion-state model, enlarges the site identity treatment, expands site sharing, consolidates Settings disclosure arrows, and adds an isolated Rule Page Layout Preview without changing production Rule Reader pages.

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

## Beta 0.30 focus

- Enlarges the site-header logo while keeping Back/Dark Mode controls on their existing centered control authority.
- Adds the Brambleheart app icon above the footer separator and adds Share to both the footer and Settings -> Access & Community.
- Uses `https://www.brambleheartrpg.com` as the canonical site-share and character-share origin.
- Adds per-character QR sharing and camera/image/link QR importing while retaining JSON import/export.
- Keeps QR data client-side, uses compression where available, and falls back to JSON export above the reliable QR payload limit.
- Makes `creationComplete` authoritative so completed characters stay Approved or Unapproved during later partial edits.
- Gives every expandable Settings menu a common navigation arrow and changes the Custom Data empty status to `NONE LOADED`.
- Adds `/rules/layout-preview/:slug?` as an isolated design-test route implementing Banner/Header, Contents, Overview, and Rule Text. Existing `/rules/read/:slug` pages remain unchanged.

## Dropbox deployment configuration

Brambleheart uses one Dropbox Scoped Access application configured for **App folder** access. The deployed site receives its public Dropbox App Key through `VITE_DROPBOX_APP_KEY`; normal users then authorize their own Dropbox accounts and use their own Dropbox storage quota. The browser implementation uses OAuth 2 Authorization Code with PKCE and does not require the Dropbox App secret.

## Runtime

- Node.js 22.x
- Vue 3 / TypeScript / Vite
- QR rendering: `qrcode`
- QR camera/image decoding: `jsqr`
