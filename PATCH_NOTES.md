# Brambleheart Beta 0.39 Patch Notes

Baseline: GitHub `main` commit `cb264ae4d57eeaa27aff789ed1f48aedcdcda01e` (Beta 0.38.0 with the 0.38 build fix).

## Character Creation — Attributes
- Applies the same Attribute family colors used by the shared Character Sheet component to the Character Creation Rank, Modifier, and secondary-stat boxes.
- Agility uses blue, Might red, Hide green, Lore purple, and Bravery amber.
- Tightens Speed to a one-line `2 + [AGI modifier] AGI MOD = [total]` formula and reduces the formula text by one step so the total does not wrap.

## Rhythm of Body & Spirit
- Changes Tempered Form's card title from `+1 Attribute Point + 1 Talent` to `Attribute Point + 1 Talent`.
- Shortens Tempered Form's descriptive copy so it reads like the other path options.
- Gives Wind-Touched, Gifted Heart, Practiced Hand, and Tempered Form distinct top-border colors while preserving the existing mechanical rules and Rank-3 validation.

## Talent Presentation
- Talent top borders now use the established semantic ability colors.
- Passive is gray, Move green, Instinct blue, Magic purple, Shoot teal, Touch red, and Reactive orange.
- Where a Talent has multiple semantic families, the more specific combat/timing family visually wins; Reactive is last in the cascade so Reactive Talents remain orange.
- Applies this presentation to Character Creation selections, the Talent picker, Character Creation Review, the Rules reader, and the Rhythm Engine Character Sheet.

## Rhythm Engine — Character Sheet
- Restores weapon Properties / Notes as pill UIs instead of plain comma-separated text.
- Reuses the existing shared `keyword-pill` and `equipment-quality-cell` presentation rather than creating a second weapon-property style.

## Rules Layout Preview — Abilities
- Adds a responsive Selu encounter example before the Core Ability list.
- Uses Selu of the Wandering Reeds as the continuing Axalori healer example.
- Shows one CORE Combat sequence: Arcane Command casts the known Harmony spell Ballad of the Courageous, then Hearth Touch triggers because the spell grants an Enhance.
- Explicitly explains that Hearth Touch is Passive and therefore does not spend another CORE opportunity.
- Uses the existing Axalori artwork and responsive HTML/CSS flow cards, avoiding a duplicate rules-data implementation.

## Release Integrity
- BUILD/export: `0.39`
- package version: `0.39.0`
- PWA cache: `v0.39`
- Rule Updates remain `v0.04` because no underlying rule mechanics changed.
- Repository and in-app Site Changelog continue to use `CHANGELOG.md` as the release-history authority.
