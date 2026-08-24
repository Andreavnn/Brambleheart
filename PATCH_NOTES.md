# Brambleheart Beta 0.21 Patch Notes

## Mobile Text Size Repair
- Removed the old `flex: 0 1 390px` behavior from the canonical Text Size control.
- The control now uses explicit width/height sizing and `flex: none`, so changing Settings rows to a vertical mobile layout cannot turn a desktop width basis into hundreds of pixels of empty vertical space.
- Removed superseded Text Size declarations instead of adding a later CSS override.
- Canonicalized the internal Text Size values to Smallest, Small, Normal, Large, and Largest while migrating legacy `smaller`, `larger`, and `medium` saved values.
- Verified the control at phone, tablet, and desktop widths with no horizontal overflow.

## Source Normalization
- This patch is cumulative from the current GitHub Beta 0.19 source and includes the source-cleanup work intended for Beta 0.20.
- Replaces the contaminated global stylesheet with the cleaned Brambleheart-only stylesheet rather than stacking additional patch rules.
- Removes obsolete Old.Dex/army-builder/game selectors, retired Welcome scale tests, dead Species-theme styling, stale background references, and superseded CSS implementation layers.
- Keeps one active role-theme/background contract and one authoritative responsive Welcome/header identity implementation.
- All active CSS class selectors correspond to current Brambleheart source or intentional dynamic class names.

## Data & Persistence Reliability
- Keeps browser-storage reads/writes/removals behind the guarded storage service.
- Keeps Reset Local Data dynamic rather than maintaining a brittle list of historical storage keys.
- Corrects Custom Data clearing so a failed storage removal does not falsely clear the visible UI.
- Preserves explicit Incomplete / Unapproved / Approved character status, legacy migration, atomic approval persistence, and Approved-only Level Up.
- Rhythm Engine character filtering now uses the same explicit character-status helper instead of legacy draft-only checks.
- Centralizes Brambleheart storage keys in the storage service and centralizes support/donation URLs in one data module instead of repeating literals across views.
- Rhythm Engine roll-history writes now surface a storage failure instead of silently presenting an unsaved history entry.

## Rules & Routing Integrity
- Makes `ability-targeting` the canonical Ability Targeting route slug.
- Preserves old `/rules/read/area-of-effect` links through a compatibility alias without retaining two internal representations.
- Keeps the existing source-backed Ability Targeting content, Anthro Mundas organization, parent landing pages, and Rules navigation intact.
- Removes the unused legacy `ruleChapters` data block from `bramble.ts`; active Rules structure now comes from the dedicated Rule Catalog rather than two competing catalogs.
- Removes unused encounter-era combat helpers and unused service exports identified by the repository audit.
- Level Up now consumes the shared advancement-cost calculator for Attribute, Skill, New Skill, Talent, and Magic costs instead of maintaining parallel formulas in the view.
- Centralizes rank modifiers, derived character statistics, equipment profile parsing, equipment Guts bonuses, and structured Ability-field parsing in the shared rules engine so Character Creation, Character Sheet, and Rhythm Engine no longer carry separate copies of the same calculations.

## Repository Integrity
- Synchronizes the package version (`0.21.0`), visible build, character exports, character-list exports, service-worker cache, README, patch notes, and in-app changelog.
- The current GitHub file `src/assets/rule-banners/Banner_AnthroMundas.png` was found to contain only a CRLF sequence (2 bytes), not image data. Repository history confirms the genuine 2,696,927-byte artwork still exists in commit `0a5ddb56e9e3eaa5b4fe6301b150c59351ee547b` under its original typo filename `Banner_AthroMundas.png`. Restoration instructions are isolated under `DO NOT UPLOAD` because a direct-upload patch ZIP cannot recover that historical binary automatically.
- No temporary test pages, verification reports, or unchanged binary assets are included as uploadable patch files.
