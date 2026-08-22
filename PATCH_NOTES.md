# Brambleheart Beta Build 0.08 — Rules, Creator & Encounter Patch

This overlay advances the current Brambleheart companion from Beta Build 0.07 to Beta Build 0.08 while preserving the existing Vue 3 + TypeScript + Vite + Vue Router architecture and existing local character/encounter storage.

## Included

- Fixes the code-red Character Creator crash when continuing from Starting Spells & Invocations into Talents by removing reactive mutation from Talent validation.
- Renames the Rules menu heading from Quick Reference to References and renames the Quick Reference reader page to Table of Content.
- Moves Introduction into The Fundamentals above Dice Rules, adds inner Fundamental-page navigation, and removes the redundant Fundamentals Menu button from Fundamental subpages.
- Promotes Playable Species to its own Rules section containing the Species index and individual Species pages.
- Moves Lore of Anthro Mundas to the top of References.
- Replaces the Rules Recent dropdown with recently viewed rule boxes while preserving Rules search.
- Adds Default as the first selectable interface theme.
- Adds a Fortune & Misfortune Tip above Roll Type in the Rhythm Engine.
- Allows a saved Character to be selected for Combat Encounters and uses that Character's secondary stats, Skills, Talents, Mana, Spells, and related character information throughout the encounter tools.
- Adds an Abilities panel above Attacking & Defending with Root-type availability and remaining-action status.
- Renames Opposed Roll — Strike vs Ward to Attacking & Defending and adds Melee, Ranged, and Magical Strike modes.
- Moves Spells & Mana immediately below Attacking & Defending.
- Adds Resistance and Weakness controls to Damage & Guts.
- Makes Appearance vertically resizable using the standard lower-right textarea drag handle.
- Fixes Species/Culture information overflow so expanded content remains inside its creator column and does not cover the Species portrait.
- Adds black Species portrait borders.
- Restyles Character Creator information panels to the compact rule-card treatment used for rules/spells.
- Replaces the inline Culture Trait list with a searchable popup selector.
- Changes Start Over text to black and Close text to red.
- Shows Skill Rank and Modifier in Character Creation and saved-character summaries.
- Contains the Oath & Faith page so it no longer stretches beyond the intended page width; its content/design is otherwise left intact.
- Colors spell cards by Lore.
- Updates character export metadata, changelog text, PWA shell cache, and visible Beta Build number to 0.08.

## Applying

Overlay the files in this package onto the current Brambleheart repository, replacing matching files and preserving repository files that are not included in this patch.

This package uses the same repository-overlay layout as the Beta Build 0.07 patch: files are stored at their actual repository paths. No apply scripts, patch payloads, manifests, verification markers, or temporary test-workflow files are included.
