# Brambleheart Beta 0.27 Patch Notes

## Character Data — Google Drive Sync
- Replaced the former static Character Data status row with its own expandable Settings menu under Data & Content.
- Character storage remains local-first. Brambleheart does not poll Google Drive and does not contact Drive during normal character editing.
- Added explicit `Link Folder`, `Update from Drive`, `Upload Local`, and `Disconnect` actions.
- Added a server-side Vercel Drive endpoint. Google service-account credentials and the folder-token signing secret are read only from Vercel environment variables and are never sent to the browser.
- Added a folder-link proof boundary: the user copies the generated `BH-LINK:...` line into the exact Shared Drive folder description before linking. After linking, the temporary description line is removed and a private Drive app property plus signed local token are used for subsequent validation.
- Two-way sync accepts only folders inside a Google Workspace Shared Drive. Normal My Drive folders are rejected because a service account cannot own newly created My Drive files.
- The service account should be shared directly to the exact Brambleheart folder with edit/add-file capability rather than being made a member of the whole Shared Drive.
- Drive discovery is non-recursive and parent-scoped. Only direct children of the linked folder whose filenames end in `_BH.json` are considered.
- Synced character identity is the stable internal `character.id`, not the filename or character name.
- `Update from Drive` replaces local records with exact ID matches, adds previously unknown Drive characters, and retains local characters that have no Drive counterpart.
- `Upload Local` updates an existing same-ID Drive file or creates a sanitized `CharacterName_BH.json` file when the character is not already present. Renamed characters also rename their existing synced file.
- Invalid Brambleheart JSON files are skipped. Duplicate valid `_BH.json` files with the same internal character ID stop synchronization instead of silently choosing a winner.
- Disconnect removes the local folder pairing only. Removing the service-account folder permission revokes future synchronization; the temporary `BH-LINK` line is automatically removed after pairing.

## Setup Guide
- Added `public/downloads/Brambleheart-Google-Drive-Setup.txt` and linked it directly beneath the Character Data Drive-sync detail text.
- The guide separates site-owner Vercel/service-account setup from player Shared Drive folder setup, then documents upload, update, disconnect/revocation, filename rules, and troubleshooting.

## Storage & Routing
- Added one canonical `characterDrive` local-storage key to the shared storage service. The saved state contains only the pending link code and linked-folder metadata/token; Google service-account credentials are never stored locally.
- No new npm dependency was added; the serverless endpoint uses Node 22 built-ins and the runtime `fetch` implementation. The existing SPA rewrite is left unchanged because Vercel gives deployed filesystem/function routes precedence over rewrites.

## Release Integrity
- Visible build, package version, character export version source, PWA cache, README, patch notes, repository changelog, and in-app changelog are synchronized to Beta 0.27 / 0.27.0.
- This patch is based on current GitHub `main` commit `6d76a087b93903175e97bf9efd5f054b9ea30575` (Beta 0.26).
- `package.json` retains the exact runtime constraint `"node": "22.x"`.
- Static syntax/integrity checks and mocked Drive-endpoint behavior checks are performed during packaging. A live Google Shared Drive synchronization test requires deployment credentials and is not claimed unless actually performed. A production Vite/vue-tsc build and live responsive browser test are not claimed unless the required repository dependencies/runtime environment are available.
