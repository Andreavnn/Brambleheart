# Brambleheart Beta 0.38 Patch Notes

Baseline: GitHub `main` commit `af7c20c075409385c255478aa7b1ba9a71f7757e` (Beta 0.37.0).

## Rule Updates v0.04 — Rhythm of Body & Spirit
- Keeps Wind-Touched at Magic Level 1 + 1 Talent.
- Keeps Gifted Heart at 2 Talents.
- Adds Practiced Hand: 2 new Skills at Rank 1 + 1 Talent. The Skills must be ones the character does not already know.
- Adds Tempered Form: +1 Rank to one Attribute + 1 Talent, without exceeding the normal Rank 3 character-creation maximum.
- Stores the two new path types and their creation-only selections on the canonical CharacterRecord so save, reload, import, review, Level Up, and simulator surfaces can preserve the result.

## Heritage & Cultural Traits
- Moves action/type pills to the bottom keyword row on Heritage and Cultural Trait cards.
- Leaves only applicable Mana cost in the upper-right title area.
- Applies the same structure in Species rules, Character Creation, selected Culture Traits, and the Culture Trait picker.

## Character Sheet Weapons
- Hides trailing parenthetical catalog identifiers such as `(Mace)` on character-sheet weapon names only. Purchase menus and equipment data retain the full names.
- Centralizes character-sheet weapon-profile calculation in the rules engine.
- Applies external weapon-damage modifiers such as Journey Knot and Sharpening Stone to the displayed weapon Damage value without adding Fury, Accuracy, Attributes, or other secondary statistics.

## Threadpieces
- Adds one shared exact Threadpiece breakdown/formatter using whole `wp` as the authority.
- Displays every nonzero normalized remainder in BP → SP → NP → WP order instead of collapsing or rounding a mixed balance.
- Uses the shared formatter on Character Roster and Level Up currency displays and removes the duplicate Character Creation balance formatter.

## Ability & Attribute Presentation
- Locks semantic ability colors so Touch, Shoot, Magic, Instinct, Move, Reactive, and Passive are not recolored by themes or dark mode.
- Makes Core Ability cards align to their own content height rather than stretching to neighboring cards.
- Adds restrained left-border colors for Agility, Might, Hide, Lore, and Bravery, plus distinct Mana resource borders.

## Rules Layout Test
- Adds a new Abilities preview page immediately after Attributes & Skills.
- Explains the four active ability families plus Passive and the one CORE Instinct / Move / Combat round structure.
- Renders the actual shared Core Ability list instead of maintaining a second test-only list.

## Repository Cleanup Audit (deferred)
The earlier repository audit identified `src/data/beta032Content.ts`, `src/data/rulesCurrent.ts`, `src/styles.beta032.css`, `src/views/SettingsViewBeta032.vue`, accumulated late overrides in `src/styles.css`, and the duplicate Blightbound Horror background assets as cleanup candidates. This release does not mix that architectural cleanup into the requested UI/creation changes.

## Release Integrity
- BUILD/export: `0.38`
- package version: `0.38.0`
- PWA cache: `v0.38`
- Rule Updates: `v0.04`
- Repository and in-app Site Changelog share `CHANGELOG.md` as the authority.
