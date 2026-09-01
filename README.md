# Brambleheart TTRPG — Beta 0.43
Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.43 promotes the approved Fundamentals presentation into production Rules pages, consolidates Equipment & Gear presentation, makes Trinket placement automatic at the character-data authority, adds the supplied page-header and News artwork, and completes targeted Settings/Level Up presentation repairs from the Beta 0.42 application baseline.

## Rule Updates v0.06

Rule Updates are versioned independently from application builds. Beta 0.43 continues to use Rule Updates v0.06 because this release changes application presentation and equipment-management behavior without introducing a new rules amendment.

### Trinkets

Each character has two independent Trinket positions. The first two owned/eligible Trinkets are assigned to Trinket 1 and Trinket 2 automatically; real saved primary/secondary placement is respected at the normalization boundary so existing characters remain stable. Additional owned Trinkets remain carried and inactive. Attachment-based Trinkets must also be attached to a legal weapon or armor for their attached effect to apply.

Current Trinkets include Scriptweave Book, Caster Totem, Spell Charm, Lens-Stone Arcanum, Shiny Bobble, Votive Icon, Heartward Token, Quickdraw Quiver, Featherwind Bolt-Case, Wristloop, and Journey Knot. Legacy equipment names are converted at the saved-character normalization boundary.

- Journey Knot — while equipped and attached, condition `+1` to one TO HIT roll made with that weapon.
- Scriptweave Book — while equipped as the active arcane focus, Magic Regen `+1` and ordinary spell Mana cost `-1`, to the normal minimum of 1 Mana.
- Caster Totem — while equipped as the active arcane focus, Control `+1`.
- Spell Charm — once per round, increase one spell’s damage by `+1`.
- Shiny Bobble — Magic Regen `+1`.
- Votive Icon — condition `+1` when using Renew the Heart.
- Heartward Token — while equipped and attached to worn armor, that armor’s Guts Bonus increases by `+1`.

### Rhythm of Body & Spirit

Character Creation offers four starting paths, each granting at least one Talent:

- Wind-Touched — Magic Level 1 + 1 Talent.
- Gifted Heart — 2 Talents.
- Practiced Hand — 2 new Skills at Rank 1 + 1 Talent.
- Tempered Form — +1 Rank to one Attribute + 1 Talent, up to the normal Rank 3 creation maximum.

Practiced Hand cannot choose Skills the character already knows from earlier creation sources such as Homeland or Culture Traits. The selected path and its Skill/Attribute choices are persisted with the character.

### Ability economy

Each character has one `CORE · INSTINCT`, one `CORE · MOVE`, and one `CORE · COMBAT` opportunity per round. `COMBAT` is the umbrella for choosing Melee Strike (`TOUCH`), Range Strike (`SHOOT`), or Arcane Command (`MAGIC`). Instinct abilities resolve at their printed round timing, including start or end of a round. During a character’s turn, eligible abilities may be performed in any order unless an ability states otherwise. Reactive abilities resolve from their triggers, while Passive abilities remain active at all times.

`ROOT` is not used by Core Abilities. It limits advanced Talents and modifiers: only one ROOT ability of the same specific family may be used each round. Canonical action colors are Touch red, Shoot teal, Magic purple, Instinct blue, Move green, Reactive orange, and Passive gray.

The shared Core Abilities are Channel the Winds, Focused Will, Stride, Swiftstride, Hero’s Charge, Melee Strike, Range Strike, Arcane Command, and Renew the Heart. Core Rules, Attributes & Skills, and Abilities now use the promoted production Fundamentals presentation instead of a separate layout-test route.

### Magic

- Mana Pool = Magic Level + Spirit.
- Magic Regen = Heart plus applicable equipped Trinket modifiers.
- Encounters begin at full Mana Pool.
- Start of Round resolves CORE Instinct choices, Magic Regen modifiers, Mana restoration, then turns in Initiative Order.
- Lore Attunement remains `-2 Mana`.
- Ordinary spells have a minimum final cost of `1 Mana`.
- Signature Spells display `Signature`; zero-cost Invocation utility spells display `Cantrip`.
- Power applies only when an individual spell explicitly says to add Power.
- Only one equipped Arcane Focus is active at a time.

## Canonical Threadpiece economy

All runtime money calculations use whole Washer Pieces (`wp`) as the authority:

- 10 wp = 1 np
- 5 np = 1 sp
- 5 sp = 1 bp
- Starting wealth = 30 sp = 1,500 wp
- Adventure Kit creation sellback = 3 sp = 150 wp
- Maximum creation purchasing power after selling the kit = 33 sp = 1,650 wp

Protective loadout remains limited to one armor and one shield. Trinkets use two independent Trinket positions and do not consume protective equipment space.

## Measurements

The game remains square-based. Rule text displays bracketed distances with a space before the unit, such as `[3] squares`. Settings can display Squares, Yards, Meters, or Feet through one conversion authority: 1 square = 1 yard = 1 meter = 3 feet.

## Beta 0.43 application focus

- Production Fundamentals pages replace the retired Rule Page Layout Test implementation.
- Shared Equipment & Gear shopping presents labeled weapon/armor profiles and simplified categories; Sharpening Stone is a Consumable.
- News and the primary page headers use the supplied PNG artwork.
- The Settings Background radio uses its own radio presentation instead of inheriting the generic switch pseudo-knob.
- Level Up groups rewards and advancement into clearer sections and presents automatic Trinket placement as status rather than a manual slot choice.

## Release integrity

- BUILD/export: `0.43`
- package version: `0.43.0`
- PWA cache: `v0.43`
- Rule Updates: `v0.06`
- Repository and in-app Site Changelog: `CHANGELOG.md`

## Runtime

- Node.js 22.x
- Vue 3 / TypeScript / Vite
- Character Share Codes: browser gzip compression where supported, with plain JSON/base64url fallback
