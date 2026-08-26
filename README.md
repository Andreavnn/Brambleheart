# Brambleheart TTRPG — Beta 0.28

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.28 replaces the Beta 0.27 Google Drive service-account sync with Dropbox App Folder Cloud Sync and adds a small Rules → Recent visual refinement.

## Main views

- Welcome / Splash
- Character List
- Guided Character Creation
- Character Level Up
- Rules / Rule Reader
- Rhythm Engine — Character Sheet and Dice Roller
- Settings
- Site Changelog

## Beta 0.28 focus

- Keeps Character Data local-first and separates `Character Data` and `Cloud Sync` into their own Settings parents.
- Shows `LOCAL` plus `CONNECTED` or `DISCONNECTED` in Character Data.
- Rebuilds Cloud Sync around Dropbox App Folder access instead of Google Workspace Shared Drive/service-account access.
- Uses Dropbox OAuth 2 PKCE so normal users connect Dropbox with an authorization screen rather than creating projects, service accounts, shared folders, or API keys.
- Keeps explicit `Update from Cloud`, `Upload Local`, and `Disconnect` actions; there is no background polling.
- Searches only the Dropbox App Folder and only files ending in `_BH.json`.
- Keeps stable internal character IDs authoritative for replacement/addition and human-readable `CharacterName_BH.json` filenames for portability.
- Replaces the Google setup guide with `Cloud Instructions (.txt)` for Dropbox setup and use.
- Gives each Rules → Recent result card its own top-border color.
- Preserves the Node runtime pin at `22.x`.

## Dropbox deployment configuration

The site owner creates one Dropbox Scoped Access app with **App folder** access, enables `files.metadata.read`, `files.content.read`, and `files.content.write`, registers the production `/settings` OAuth redirect URI, and sets `VITE_DROPBOX_APP_KEY` in Vercel before redeploying. The Dropbox App secret is not required by the browser implementation because Cloud Sync uses PKCE.

The complete procedure is available from Settings → Data & Content → Cloud Sync → `Cloud Instructions (.txt)`.

## Runtime

- Node.js 22.x
- Vue 3 / TypeScript / Vite
