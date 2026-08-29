# Brambleheart TTRPG — Beta 0.39

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.39 is a cumulative presentation and rules-teaching release built on GitHub `main` commit `cb264ae4d57eeaa27aff789ed1f48aedcdcda01e` (Beta 0.38.0 with the 0.38 build fix).

## Beta 0.39 presentation work

- Character Creation Attribute boxes now use the same Attribute color identities as the shared Character Sheet.
- Speed uses a smaller one-line `2 + AGI MOD = total` formula.
- Rhythm of Body & Spirit path cards have distinct top-border colors and shorter Tempered Form presentation.
- Talent card top borders use the same semantic ability colors as their ability families.
- Rhythm Engine Character Sheet weapon Properties / Notes are rendered as pills again.
- The Rules Layout Test Abilities page includes a responsive Selu encounter graphic showing Arcane Command used with the Hearth Touch Talent.

## Rule Updates v0.04

Rule Updates are versioned independently from application builds. Beta 0.39 does not change the underlying rule mechanics, so the current rules-update stream remains v0.04.

### Rhythm of Body & Spirit

Character Creation offers four starting paths, each granting at least one Talent:

- Wind-Touched — Magic Level 1 + 1 Talent.
- Gifted Heart — 2 Talents.
- Practiced Hand — 2 new Skills at Rank 1 + 1 Talent.
- Tempered Form — +1 Rank to one Attribute + 1 Talent, up to the normal Rank 3 creation maximum.

Practiced Hand cannot choose Skills the character already knows. The selected path and its Skill/Attribute choices are persisted with the character.

### Character-sheet consistency

Character-sheet weapon names hide trailing parenthetical catalog identifiers while purchase surfaces retain them. External equipment effects such as Journey Knot and Sharpening Stone can modify the displayed weapon Damage value; Attribute and secondary-stat damage bonuses are not folded into the weapon profile. Threadpiece balances display exact normalized BP/SP/NP/WP remainders without denomination rounding.

### Ability economy

Each character has one `CORE · INSTINCT`, one `CORE · MOVE`, and one `CORE · COMBAT` opportunity per round. `COMBAT` is the umbrella for choosing Melee Strike (`TOUCH`), Range Strike (`SHOOT`), or Arcane Command (`MAGIC`). Reactive and Passive effects resolve from their own rules.

`ROOT` is not used by Core Abilities. It limits advanced Talents and modifiers: only one ROOT ability of the same specific family may be used each round.

Canonical action colors are Touch red, Shoot teal, Magic purple, Instinct blue, Move green, Reactive orange, and Passive gray.

### Core Abilities

The shared Core Abilities are Channel the Winds, Focused Will, Stride, Swiftstride, Hero’s Charge, Melee Strike, Range Strike, Arcane Command, and Renew the Heart.

Channel the Winds modifies Magic Regen. Focused Will has no Mana cost. Renew the Heart is Passive. Arcane Command delegates targeting, TO HIT, saves, damage, effects, and duration to the chosen Spell Details.

### Magic

- Mana Pool = Magic Level + Spirit.
- Magic Regen = Heart.
- Encounters begin at full Mana Pool.
- Start of Round resolves CORE Instinct choices, Magic Regen modifiers, Mana restoration, then turns in Initiative Order.
- Lore Attunement remains `-2 Mana`.
- Ordinary spells have a minimum final cost of `1 Mana`.
- Signature Spells display `Signature` instead of `0 Mana`.
- Zero-cost Invocation utility spells display `Cantrip` instead of `0 Mana`.
- Power applies only when an individual spell explicitly says to add Power.
- Known spells are tracked directly by Magic Level rather than through a separate slot concept.
- Only one Arcane Focus is active at a time; focus-specific Control and Mana effects come from that active focus.

Magic Level 10 grants 12 chosen Lore Spells and 6 Invocations, plus the Signature Spell from Lore Attunement.

### Talents

Talents primarily modify Core Abilities or resolve from their own Instinct, Reactive, or Passive triggers rather than reproducing whole attack procedures. Cleave replaces Fang Break. Beastgrasp is the canonical replacement for Primate Grip. The Cleave → Wildchain → Warpath chain is a fixed progression within one Melee Strike.

## Canonical Threadpiece economy

All runtime money calculations use whole Washer Pieces (`wp`) as the authority:

- 10 wp = 1 np
- 5 np = 1 sp
- 5 sp = 1 bp
- Starting wealth = 30 sp = 1,500 wp
- Adventure Kit creation sellback = 3 sp = 150 wp
- Maximum creation purchasing power after selling the kit = 33 sp = 1,650 wp

Only one Armor and one Shield may be equipped at a time; only those equipped protective items contribute their protective gear statistics. A dedicated armor follow-up will establish final high-end Speed penalties.

## Measurements

The game remains square-based. Display can be changed in Settings to Squares, Yards, Meters, or Feet using one conversion authority: 1 square = 1 yard = 1 meter = 3 feet.

## Release integrity

- BUILD/export: `0.39`
- package version: `0.39.0`
- PWA cache: `v0.39`
- Rule Updates: `v0.04`
- Repository and in-app Site Changelog: `CHANGELOG.md`

## Runtime

- Node.js 22.x
- Vue 3 / TypeScript / Vite
- Character Share Codes: browser gzip compression where supported, with plain JSON/base64url fallback
