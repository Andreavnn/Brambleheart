# Brambleheart Alpha Build 0.03 — GUI & Reference Patch

This patch continues the interface overhaul while preserving the existing Vue/Vite architecture and local character storage.

## Included

- Header rebuilt around the centered Brambleheart identity, build information, changelog control, quick appearance toggle, and permanent alpha WIP notice.
- Normal text reduced to the new compact baseline with five scale choices: Smaller, Small, Normal, Large, Larger.
- Optional Bold Text setting.
- Eleven species palette themes corresponding to the current playable-species list. No species background artwork is bundled yet.
- Background selector remains available with None as the only option.
- New Install section with install-prompt support, manifest, and service worker.
- New Support section with Patreon and issue-tracker actions.
- Rules page reorganized into the requested major rules groups with Search Rules and Recent reference tools.
- New splash page at `/`; Character List now lives at `/characters`.
- Additional layout tightening across cards, settings groups, reference panels, responsive controls, and navigation.

## Local data

The existing keys for characters and application settings are preserved. Saved `medium` text settings migrate to the new `normal` value automatically.

## Applying

Overlay the files in this package onto the current repository, preserving the existing `public/assets/` images and all files not included in the patch.
