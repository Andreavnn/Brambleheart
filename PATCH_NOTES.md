# Brambleheart Beta 0.28 Patch Notes

## Character Data & Cloud Sync
- Split the former Character Data/Google Drive implementation into two sibling Settings parents: `Character Data` and `Cloud Sync`.
- Character Data now states that character records remain local-first and shows `LOCAL` plus `CONNECTED` or `DISCONNECTED` connection status.
- Removed the Google Drive service-account section, Shared Drive folder workflow, Google folder-description pairing, and Google-specific setup text from the active implementation.
- Rebuilt Cloud Sync around Dropbox **App Folder** access. Normal users connect through Dropbox OAuth instead of creating or sharing Google Workspace resources.
- Added Dropbox OAuth 2 Authorization Code + PKCE with a generated `Cloud Link Code` used as the OAuth `state` value and verified when Dropbox returns to Brambleheart.
- Renamed the former folder-link row to `Workspace Link`; it now launches Dropbox authorization and explains that Dropbox creates the isolated App Folder automatically.
- Replaced the Google setup download with `Cloud Instructions (.txt)` at `public/downloads/Brambleheart-Cloud-Instructions.txt`.
- Cloud Sync remains manual: Dropbox is contacted only for Connect, Update from Cloud, Upload Local, and Disconnect/revocation.
- Only direct files in the Dropbox App Folder ending in `_BH.json` are considered. Stable internal character IDs remain authoritative; exact ID matches replace local records during Update and unknown IDs are added.
- Upload Local updates same-ID files, creates sanitized `CharacterName_BH.json` files for new characters, safely handles filename collisions, and renames matching cloud files when a character name changes.
- Invalid `_BH.json` files are skipped and duplicate valid files carrying the same internal character ID stop synchronization rather than allowing ambiguous replacement.
- The long-lived Dropbox refresh token is stored through the existing guarded local-storage service. The obsolete Google connection key is removed at the migration boundary and does not spread into the new Cloud Sync model.

## Rules — Recent
- Replaced the shared left accent on Recent Rules cards with a top border.
- Cycles four established Brambleheart detail tones across Recent cards so each result box has its own top-border color without adding a second global CSS authority.

## Release Integrity
- Visible build, package version, character export version source, PWA cache, README, patch notes, repository changelog, and in-app changelog are synchronized to Beta 0.28 / 0.28.0.
- This patch is based on current GitHub `main` commit `5f532e38e3db845fc4613780aecc9cc074bd3bb5` (Beta 0.27 plus the current background asset commit).
- `package.json` retains the exact runtime constraint `"node": "22.x"`.
- No Dropbox npm dependency was added; the implementation uses browser `fetch`, Web Crypto, and Dropbox HTTP endpoints.
- Static TypeScript/service tests and package-integrity checks are performed during packaging. A live Dropbox OAuth/account synchronization test requires the deployed Dropbox App Key and registered redirect URI and is not claimed unless actually performed. A full Vite/vue-tsc production build is not claimed unless the full repository dependencies are available in the runtime.
