# Brambleheart Beta 0.29 Patch Notes

## Character Creation & Review
- Centers `Rank` and `Modifier` within their existing Attribute panels rather than right-aligning their contents.
- Stops Secondary Stat cards from expanding across the full available row, removing roughly three quarters of the unused horizontal space on normal desktop layouts while preserving wrap behavior at narrower widths.
- Renames the Starting Languages choice from `Additional Language` to `Bonus Language`, including the visible help and validation copy.
- Review Character now starts `Skills`, `Magic`, `Talents`, and `Equipment & Gear` collapsed. The other Review parents retain their existing default states.

## Equipment & Gear
- Converts every catalog item whose displayed price was in SP to the equivalent NP price. The conversion preserves value at 1 SP = 5 NP; WP/NP prices are otherwise unchanged.
- Purchased-item cost labels now use NP (or WP for sub-NP values) instead of converting larger equipment prices back to SP/BP.
- Totem now grants `+1 Control` instead of `+1 to Strike rolls for spells`.
- Scriptweave Book now grants `+1 Control` instead of `+1 Spell Strike`.
- Added a structured equipment stat-bonus field for non-armor items. Totem and Scriptweave Book supply `control: +1`, and the shared derived-stat engine adds those bonuses to a character's Control.
- Existing saved Totem/Scriptweave purchases are normalized against the canonical equipment catalog when character data is loaded, so older saved characters gain the new Control behavior and current effect text without carrying a second legacy implementation forward.
- The same canonical Control bonus now feeds Character Review, Character List derived values, and the Rhythm Engine character sheet/dice stat selection.

## Character List
- Replaces the visible text action controls with accessible icons: Pencil for Edit, up arrow for Level Up, lock for Lock/Unlock, thumbs-up for Approve, thumbs-down for Remove Approval, copy icon for Copy, and trash can for Delete.
- Adds the manual lock control to Approved, Unapproved, and Incomplete characters while keeping approval as a separate status.
- Removes the duplicated campaign/species text block immediately beside the action controls; the same information remains in the character summary on the left.
- Character List derived values now include structured equipment Control bonuses as well as existing Armor/Shield Guts bonuses.

## Backgrounds
- Fixes the next-background control at the background catalog authority. Duplicate asset slugs are deduplicated before options are exposed, so the last background now advances back to the first background instead of resolving to another option with the same ID.
- The duplicate source assets are not deleted in this patch because their artwork was not verified as interchangeable; only one canonical option is exposed at runtime.

## Cloud Sync
- The Cloud Link Code remains an internal OAuth protection value, but the obsolete `New Code` and `Copy Code` user controls are removed because users never need to handle that value manually.
- Replaces the long Cloud Link Code explanation with: `Brambleheart OAuth protection code for this browser.`
- Moves `Dropbox App Folder` and `Connect Dropbox` beneath the Workspace Link title/detail text on all widths so the row does not stretch horizontally.
- Rebuilds `Cloud Instructions (.txt)` as a user-only Dropbox connection/sync guide. Site-owner, Vercel, Dropbox developer-app, scope-registration, and deployment setup steps are removed completely.
- Turns the Cloud Instructions download into a centered button.
- When a deployment is not configured, the user-facing Settings message now says Cloud Sync is unavailable and that no user action is required.

## Release Integrity
- Release markers are synchronized to Beta 0.29 / package `0.29.0` / PWA cache `v0.29`.
- Character export version continues to derive from the canonical `BUILD` value.
- `package.json` retains the exact Node requirement `"node": "22.x"`.
