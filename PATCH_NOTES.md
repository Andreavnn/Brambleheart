# Brambleheart Beta 0.30 Patch Notes

## Site Identity & Footer
- Enlarges the site-header Brambleheart logo to twice its desktop visual scale while keeping the Back and Dark Mode controls on their independent centered control row so the larger logo does not push those controls toward the screen edges.
- Uses responsive scale caps at tablet and mobile widths to reduce clipping/overflow risk while retaining the larger identity treatment.
- Adds the existing Brambleheart app icon above the footer separator without placing it in the utility-button flex row, so it stays inside the current footer footprint instead of changing button wrapping.
- Adds `Share` between `Discord` and `Install Brambleheart` in the global footer.
- Adds `Share Brambleheart` under Settings -> Access & Community, directly below Join Discord.
- Establishes `https://www.brambleheartrpg.com` as the canonical public site URL used by site sharing and character QR links.

## Character QR Sharing
- Adds per-character `Share QR` controls to Character List and a `Scan QR` import action alongside the existing JSON import/export controls.
- Character QR codes contain a client-side Brambleheart character share URL. No Brambleheart server-side character store is introduced.
- Uses gzip compression when the browser supports `CompressionStream`, with an uncompressed JSON fallback for compatible browsers.
- Enforces a 2,800-byte reliable QR payload ceiling. Characters that exceed the limit are directed to the existing JSON export instead of generating an unreliable QR code.
- QR imports require confirmation before writing to local Character Data.
- QR input supports the device camera, a saved QR image, and normal phone-camera links that open Brambleheart with the character payload in the URL fragment.
- JSON import and QR import now share one canonical imported-character normalizer instead of maintaining separate import rules.
- Adds `qrcode` for QR rendering and `jsqr` for camera/image decoding.

## Character Completion Status
- Adds an explicit `creationComplete` field as the canonical boundary between Incomplete and completed characters.
- A character is Incomplete only until the full creation flow is finished once.
- Editing an Unapproved or Approved character and choosing Save / Save & Close no longer moves that character back to Incomplete merely because the editor was closed before revisiting every creation step.
- Legacy records migrate at load: existing Approved/Unapproved records are treated as creation-complete; existing Incomplete/draft records remain incomplete.
- Approval remains separate from completion, so a completed character is either Unapproved or Approved.

## Settings
- Consolidates expandable Settings navigation arrows into one Settings-wide `details > summary` authority.
- Removes the older Themes, Backgrounds, and Reset-specific arrow implementations rather than stacking another arrow rule over them.
- Changes the empty Custom Data status label from `None loaded` to `NONE LOADED`.

## Rules Layout Preview
- Adds an isolated Rule Page Layout Preview route for the design work from the separate rule-layout design discussion.
- The preview demonstrates `Banner/Header -> Contents -> Overview -> Rule Text` using the existing source-backed rule documents and available rule-banner artwork.
- The preview is explicitly labeled as a test page and can switch among source documents for layout review.
- Existing production `/rules/read/:slug` Rule Reader pages are not changed by this design experiment.
- Preview route: `/rules/layout-preview/:slug?`.

## Release Integrity
- Release markers are synchronized to Beta `0.30`, package `0.30.0`, and PWA cache `v0.30`.
- Character export version continues to derive from the canonical `BUILD` value.
- `package.json` retains the exact Node requirement `"node": "22.x"`.
- This patch is based on current GitHub `main` commit `d9bf1f9e772db4b940122583fc23f800402643a1` (Beta 0.29).
