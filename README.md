# Brambleheart TTRPG — Beta 0.37

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.37 is a cumulative action-economy, Talent, and magic-framework release built on GitHub `main` commit `093cbf928eb3dabb4fd20769bc5b886198e497b7` (Beta 0.36.0).

## Rule Updates v0.03

Rule Updates are versioned independently from application builds.

### Ability economy

Each character has one `CORE · INSTINCT`, one `CORE · MOVE`, and one `CORE · COMBAT` opportunity per round. `COMBAT` is the umbrella for choosing Melee Strike (`TOUCH`), Range Strike (`SHOOT`), or Arcane Command (`MAGIC`). Reactive and Passive effects resolve from their own rules.

`ROOT` is no longer used by Core Abilities. It limits advanced Talents and modifiers: only one ROOT ability of the same specific family may be used each round.

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

Talents now primarily modify Core Abilities or resolve from their own Instinct, Reactive, or Passive triggers rather than reproducing whole attack procedures. Cleave replaces Fang Break. Beastgrasp is the canonical replacement for Primate Grip. The Cleave → Wildchain → Warpath chain is a fixed progression within one Melee Strike.

## Canonical Threadpiece economy

All runtime money calculations continue to use whole Washer Pieces (`wp`) as the authority:

- 10 wp = 1 np
- 5 np = 1 sp
- 5 sp = 1 bp
- Starting wealth = 30 sp = 1,500 wp
- Adventure Kit creation sellback = 3 sp = 150 wp
- Maximum creation purchasing power after selling the kit = 33 sp = 1,650 wp

Only one Armor and one Shield may be equipped at a time; only those equipped protective items contribute their protective gear statistics. A dedicated armor follow-up will establish final high-end Speed penalties.

## Measurements

The game remains square-based. Display can be changed in Settings to Squares, Yards, Meters, or Feet using one conversion authority: 1 square = 1 yard = 1 meter = 3 feet.

## Runtime

- Node.js 22.x
- Vue 3 / TypeScript / Vite
- Character Share Codes: browser gzip compression where supported, with plain JSON/base64url fallback
