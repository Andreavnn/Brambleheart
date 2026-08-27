# Brambleheart TTRPG — Beta 0.29

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.29 refines Character Creation, Equipment & Gear, saved-character controls, background cycling, and the user-facing Dropbox Cloud Sync workflow.

## Main views

- Welcome / Splash
- Character List
- Guided Character Creation
- Character Level Up
- Rules / Rule Reader
- Rhythm Engine — Character Sheet and Dice Roller
- Settings
- Site Changelog

## Beta 0.29 focus

- Centers Attribute Rank/Modifier panels and shortens Secondary Stat cards.
- Renames Additional Language to Bonus Language.
- Converts Equipment & Gear SP price labels to equivalent NP values.
- Makes Totem and Scriptweave Book grant structured `+1 Control` equipment bonuses across Character Review, Character List, and Rhythm Engine, and migrates existing saved copies to the new canonical effect.
- Starts Skills, Magic, Talents, and Equipment & Gear collapsed in Review Character.
- Replaces the Character List's primary text actions with accessible icons, adds manual Lock/Unlock to every character status, and removes duplicated summary text beside the controls.
- Repairs next-background wrapping by deduplicating background option IDs at the catalog source.
- Simplifies Cloud Link Code presentation, removes unnecessary code-copy/regeneration controls, improves Workspace Link layout, and replaces the Cloud Instructions download with a centered button.
- Makes `Cloud Instructions (.txt)` a player-only guide. Deployment setup remains a repository/deployment responsibility rather than something normal users are asked to perform.

## Dropbox deployment configuration

Brambleheart uses one Dropbox Scoped Access application configured for **App folder** access. The deployed site receives its public Dropbox App Key through `VITE_DROPBOX_APP_KEY`; normal users then authorize their own Dropbox accounts and use their own Dropbox storage quota. The browser implementation uses OAuth 2 Authorization Code with PKCE and does not require the Dropbox App secret.

## Runtime

- Node.js 22.x
- Vue 3 / TypeScript / Vite
