# Brambleheart Beta 0.32 Patch Notes

## Interface
- Reduces the bottom-of-page Brambleheart image by three quarters from the Beta 0.31 maximum: `260px` → `65px`.
- Restores visible Character List transfer text and changes the former QR import action to `Import Share Code`.
- Keeps the QR-shaped icon on each individual character entry, but its action is now `Share Code` rather than QR generation.
- Changes the Settings detail text to: `Site control: Community, display, data, storage, and optional controls.`

## Character Share Codes
- Removes QR-code generation, QR-image import, camera capture, and QR decoding from the active Character List flow.
- Removes the `qrcode`, `jsqr`, and `@types/qrcode` packages from the application manifest.
- Replaces QR sharing with compressed text Share Codes using the `BH1.g.` / `BH1.j.` format.
- Adds `Import Share Code` to Character List. Users can paste a Share Code and review the character before importing it.
- `Share Character` uses the device share sheet when available. The share message carries the character Share Code while the actual URL remains the short canonical Character List URL: `https://www.brambleheartrpg.com/characters`.
- Browsers without a native share sheet copy the same share message plus the normal Character List URL to the clipboard.
- Legacy `#bhc=...` character share links remain readable for compatibility, but Brambleheart captures the payload and immediately removes the long fragment from the address bar before review/import. The visible URL therefore returns deterministically to the normal Character List URL instead of only shortening after a successful import.
- Removes the old QR-specific 2,800-byte ceiling because Share Codes are no longer constrained by QR optical capacity.

## Rules Layout Test
- Moves `Rule Page Layout Test` out of The Watcher child list and makes it a separate expandable Rules parent directly below The Watcher.
- Keeps the layout test isolated from production `/rules/read/:slug` pages.
- Removes the Overview panel from the test page.
- Moves the Contents panel to the bottom of the test page.
- Removes the source-file detail line from the title block and collapses the title block so there is no large empty space above `RULES LAYOUT TEST`.
- Gives each rule-section title a colored title box and gives test-page tables/charts coordinated color treatment.
- Adds the supplied illustrated dice artwork to Fundamentals at `THE CORE ROLL`.

## Core Abilities & Talents
- Renames the Rules page `Keyword Abilities` to `Core Abilities`.
- Moves these former Core Abilities into Talents:
  - `Spirit Flare` → Magic
  - `Echo Strike` → Utility
  - `Steadfast` → Defensive Combat
  - `Sentinel’s Call` → Defensive Combat
  - `Wander Step` → Utility
  - `Verdant Surge` → Utility
  - `Rooted Resolve` → Defensive Combat
- Renames `Swift Rush` to `Swiftstride` and `Sure Shot` to `Range Strike` across the loaded rules source and Core Ability cards.

## Release Integrity
- Release markers are synchronized to Beta `0.32`, package `0.32.0`, and PWA cache `v0.32`.
- Character export version continues to derive from the canonical `BUILD` value.
- `package.json` retains the exact Node requirement `"node": "22.x"`.
