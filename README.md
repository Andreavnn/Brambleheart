# Brambleheart TTRPG — Beta 0.31

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.31 hardens destructive Settings controls, exposes the isolated Rule Page Layout Test from The Watcher, refines Themes/Backgrounds and footer presentation, and replaces the unreliable in-page QR camera scanner with device-camera capture.

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

## Beta 0.31 focus

- Moves Reset Local Data actions behind an expandable `MANAGE` parent so destructive controls are not exposed by default.
- Moves Site Changelog into its own Settings section named Changelog & Updates.
- Shows Themes and Background choices with the same switch presentation used by other Settings toggles while retaining one-choice radio semantics.
- Removes underlines from the Cloud Instructions and Custom Data template download buttons.
- Enlarges the footer Brambleheart icon by 10× from its Beta 0.30 size while constraining it to the footer width.
- Adds an expandable Rule Page Layout Test parent under The Watcher, with its child preview link routed to the isolated test page; production Rule Reader pages remain unchanged.
- Removes the in-page `getUserMedia` QR scanner. Scan QR now invokes the device image capture control (`capture=environment`) and decodes the resulting image with the existing QR parser.
- Replaces Character List Import, Scan QR, and Export text buttons with accessible file/QR transfer icons.

## Dropbox deployment configuration

Brambleheart uses one Dropbox Scoped Access application configured for **App folder** access. The deployed site receives its public Dropbox App Key through `VITE_DROPBOX_APP_KEY`; normal users then authorize their own Dropbox accounts and use their own Dropbox storage quota. The browser implementation uses OAuth 2 Authorization Code with PKCE and does not require the Dropbox App secret.

## Runtime

- Node.js 22.x
- Vue 3 / TypeScript / Vite
- QR rendering: `qrcode`
- QR image decoding: `jsqr`
