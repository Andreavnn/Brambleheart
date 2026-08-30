# Brambleheart Beta 0.40 Patch Notes

Baseline: GitHub `main` commit `0f631f02a8e289f9bc35557e513667c21d728fc3` (Beta 0.39.0).

## Rule Updates v0.05 — Trinkets
- Adds `Trinket` as a canonical equipment category. A character has one dedicated Trinket slot and may equip one additional Trinket by consuming one of the two Armor & Shield slots.
- Owned Trinkets may remain carried and inactive. Attachment-based Trinkets apply their effects only while equipped and attached to a legal target.
- Converts Journey Knot, Caster Totem, Lens-Stone Arcanum, Scriptweave Book, Quickdraw Quiver, Featherwind Bolt-Case, Wristloop, and Spell Charm to Trinkets. Legacy saved names are converted only at the character normalization boundary.
- Journey Knot now grants condition `[+1]` to one TO HIT roll per round with its attached weapon instead of +1 damage.
- Scriptweave Book now grants Magic Regen `[+1]` and ordinary spell Mana cost `[-1]` while equipped as the active arcane focus; its previous Control and spell-damage bonuses are removed.
- Adds Shiny Bobble (Magic Regen `[+1]`), Votive Icon (condition `[+1]` when using Renew the Heart), Spell Charm (one spell damage `[+1]` once per round), and Heartward Token (attached worn armor Guts Bonus `[+1]`).

## Character Sheet & Equipment Management
- Renames the Character Sheet section to `Armor & Shield`.
- Adds visible dedicated and overflow Trinket slots beneath protective equipment.
- Applies equipped Trinket effects through shared equipment helpers used by Character Creation, Character Roster, Level Up, and Rhythm Engine.
- Adds legal attachment selectors for weapon- and armor-attached Trinkets.

## Character Creation
- Keeps Practiced Hand from offering Skills already granted earlier by Homeland or Culture Traits and preserves validation of that restriction.
- Aligns Body & Spirit path-card title space so Tempered Form and Practiced Hand content begin at the same vertical position.

## Rules Layout Preview — Abilities
- Reorganizes the Abilities test page from encounter economy into Core interactions, Instinct, Move, Combat, and Reactive/Passive examples.
- Uses small Selu markers/examples throughout without displaying a Selu character image.
- Demonstrates a Core Ability plus Talent interaction and ends with an expandable reference rendered from the shared Core Ability data.

## Measurements
- Standardizes rule display text to include a space between bracketed distance and unit, e.g. `[3] squares`.
- The shared measurement formatter continues to convert Squares, Yards, Meters, and Feet from either legacy unspaced or new spaced source text.

## Release Integrity
- BUILD/export: `0.40`
- package version: `0.40.0`
- PWA cache: `v0.40`
- Rule Updates: `v0.05`
- Repository and in-app Site Changelog continue to use `CHANGELOG.md` as the release-history authority.
