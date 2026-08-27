# Brambleheart Beta 0.31 Patch Notes

## Settings Safety & Organization
- Replaces the exposed Reset Local Data action row with an expandable Reset Local Data parent. The `MANAGE` summary must be opened before Reset Custom Data, Reset Characters, or Reset All Local Data buttons are visible.
- Retains the existing two-confirmation protection for destructive reset operations.
- Moves Site Changelog out of Data & Content into its own `CHANGELOG & UPDATES` Settings section directly below Data & Content.
- Removes text underlines from the button-styled Cloud Instructions (.txt) and Download Templates links.

## Themes & Backgrounds
- Keeps Themes and Backgrounds mutually exclusive using their existing radio values, but renders each choice with the same switch control used by Dark Mode and other Settings toggles.
- Reuses the canonical Settings switch CSS instead of introducing a second independent switch implementation.

## Rules Layout Test
- Adds an expandable `Rule Page Layout Test` parent under The Watcher on the Rules index, with the actual preview link hidden inside until expanded.
- The entry opens `/rules/layout-preview/fundamentals`; the preview remains isolated and production `/rules/read/:slug` pages are unchanged.

## Character QR & Transfer Controls
- Removes the in-page live camera scanner and all `getUserMedia`, video-stream, animation-frame, and QR-video UI code.
- Scan QR now invokes a hidden image input with `capture="environment"`, allowing supported phones/tablets to open their device camera capture UI; the captured image is decoded with the existing `jsqr` path. Desktop/non-capture browsers fall back to their normal image picker.
- Keeps normal QR share links and QR image decoding unchanged.
- Replaces the Character List Import Character, Scan QR, and Export Characters text buttons with accessible transfer icons: file + up arrow, QR + up arrow, and file + down arrow.

## Footer
- Enlarges the bottom-of-page Brambleheart icon from 26px to a maximum 260px (10×), while capping it to 90% of the footer width to prevent horizontal overflow.

## Release Integrity
- Release markers are synchronized to Beta `0.31`, package `0.31.0`, and PWA cache `v0.31`.
- Character export version continues to derive from the canonical `BUILD` value.
- `package.json` retains the exact Node requirement `"node": "22.x"`.
- This patch is based on current GitHub `main` commit `89686e46ec953bb9077310259d68d1959296045f` (Beta 0.30 plus the QR Blob build correction).
