# Brambleheart Beta 0.42 Patch Notes

Baseline: Brambleheart Beta 0.41 (`package.json` 0.41.0).

## News & Navigation
- Removes the redundant `BRAMBLEHEART` eyebrow above the News title.
- Adds Discord and Share promotional cards beneath the News title, each with a dedicated repository SVG graphic.
- Changes the shared Brambleheart logo destination from Character Roster to News.
- Conservatively condenses superseded update-history bullets; empty historical releases are removed only when the consolidation actually leaves them empty.

## Equipment, Weapons & Armor
- Establishes one Beta 0.42 equipment-normalization authority for weapon/armor/shield price and profile adjustments.
- Normalizes the ordinary weapon price curve so a starting character can build a coherent combat loadout without selling the Adventure Kit.
- Normalizes armor/shield prices against Guts, Mana Syphon, Might requirement, and Armor Penalty rather than allowing strictly better entries to undercut weaker alternatives.
- Replaces the former armor `Stealth` / `Stealth Condition` field with `Armor Penalty` while preserving the source penalty values.
- Armor Penalty reduces Speed and applies the same negative condition to Whisperster Skill rolls while the relevant armor/shield is equipped.
- Repairs positional weapon-profile parsing so Damage and Weight remain in their own Character Sheet columns instead of becoming Property pills.
- Moves Cloak of Windweave to Traveler’s Gear.
- Keeps weapon qualities/mechanics source-backed; spells were not used as a numerical balance baseline.

## Trinkets
- Removes Shield/Trinket slot sharing from active rules and UI.
- Characters have two independent Trinket positions; shields no longer compete with Trinkets.
- Legacy `trinket` / `shield` saved-slot values are translated at the compatibility boundary to primary / secondary Trinket positions.
- Removes the visible `TRINKET SLOT` and `SHIELD / TRINKET SLOT` labels from Character Sheets and gives both Trinket cards the same accent treatment.

## Character Sheets & Level Up
- Keeps Adventure Kit contents visible under Equipment & Gear whenever the starting kit was retained, including Review Character and Rhythm Engine Character Sheet.
- Applies equipped armor/shield bonuses and Armor Penalty to derived Character Sheet statistics.
- Uses one shared Equipment & Gear popup component for Character Creation and Level Up shopping.
- Removes individual Talent category captions from Talent cards and shortens the two combat category names to Offensive and Defensive.
- Adds the placeholder Encounter Builder tab after Dice Roller in Rhythm Engine.

## Rules & Terminology
- Canonicalizes remaining current-rule `Augment` terminology to `Enhance` site-wide.
- Adds the Armor Penalty rule to the active Armor & Shields rules data.
- Rebuilds the Abilities test-page flow: centered content and pills, arrows between ordered examples, removal of redundant Instinct/Move sections, `Ability Example`, immediate Reactive resolution example, and `Basic Core Abilities`.
- Fixes Core Ability family top borders at the card authority rather than through a later `!important` override.
- Gives applicable rule example/title boxes matching left and right accent borders.

## Settings
- Display order: Launch Audio, Dark Mode, Compact Rows, Bold Text, Text Size, Themes, Background, Tips, Measurements, Reset Local Settings.
- Data & Content order: Character Data, Custom Data, Data Backup, Cloud Sync, Reset Local Data.
- Changelog & Updates order: Rule Updates, then Site Changelog.

## Verification
- The package applicator performs strict source-pattern checks, post-change terminology/legacy audits, version synchronization, and can run the repository production build when Node/npm dependencies are available.
- Browser responsive checks and persistence-through-reload checks require an actual running Brambleheart repository/browser and are not claimed by this package itself.
