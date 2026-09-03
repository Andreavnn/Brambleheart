# Brambleheart TTRPG — Beta 0.15
Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.15 is the current **Site Update**. Site Updates track application, interface, storage, navigation, presentation, and deployment changes. Brambleheart game-rule changes are tracked separately as **Game Updates**.

## Current Site Update — Beta 0.15

- Rules → Fundamentals → Core Actions presents Core Actions, Abilities, examples, Reactions, chaining, and the Core Action reference as distinct teaching sections.
- Core Action reference cards use the same action-family color authority as the pill UI.
- Rules category landing pages are hidden from their own expandable menus.
- Current playable Species are grouped beneath Woodlands, and Species lore panels use the Character Creation visual language while retaining the quote-and-art layout.

## Current Game Update — v0.05

Game Updates are versioned independently from Site Updates. Game Update v0.05 contains the current Core Action terminology, Reaction Core Action, Ability Chain limits, and the approved Ragebound/Snapstep revisions.

### Trinkets

Trinkets behave as passive equipment. They do not use numbered Trinket positions, and there is no separate Arcane Focus selection. If a Trinket is equipped, its listed effect applies automatically. Attachment-based Trinkets must also be attached to a legal weapon or armor before their attached effect applies.

Current Trinkets include Scriptweave Book, Caster Totem, Spell Charm, Lens-Stone Arcanum, Shiny Bobble, Votive Icon, Heartward Token, Quickdraw Quiver, Featherwind Bolt-Case, Wristloop, and Journey Knot.

- Journey Knot — while equipped and attached, condition `+1` to TO HIT rolls made with that weapon.
- Scriptweave Book — while equipped, Magic Regen `+1` and ordinary spell Mana cost `-1`, to the normal minimum of 1 Mana.
- Caster Totem — while equipped, Control `+1`.
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

Practiced Hand cannot choose Skills the character already knows from earlier creation sources such as Homeland or Culture Traits.

### Core Actions & Ability Chains

Core Action is the canonical name for the shared actions every character can use. Ability remains the term for Traits, Talents, Spells, equipment effects, and other rules that modify a Core Action or trigger from events in its chain.

A normal round provides one Core Instinct Action, one Core Move Action, one Core Combat Action, and one Core Reaction Action. The shared Core Actions are Channel the Winds, Focused Will, Stride, Swiftstride, Hero’s Charge, Melee Strike, Range Strike, Arcane Command, Reaction, and Renew the Heart.

Every Ability Chain begins with a Core Action. A specific character’s copy of an Ability can resolve only once during that chain, even if later events would make its Trigger legal again. Another character’s copy of the same named Ability is a separate Ability instance and may resolve once. The chain ends when no unresolved Ability instance has a legal Trigger.

Reactive Abilities resolve through Reaction when their printed Trigger is met. Each character has one Reaction Core Action per round unless a more specific rule grants another use.

Ragebound builds from Focused Will, granting condition [+1] to Strike and [+1] to damage while reducing Ward and Guts by [-1] each through Defenseless. Snapstep builds from Focused Will or Channel the Winds and moves up to [2] squares. Drums of War and Divine Grasp intentionally retain their rules that grant or compel Core Action use.

### Magic

- Mana Pool = Magic Level + Spirit.
- Magic Regen = Heart plus applicable equipped Trinket modifiers.
- Encounters begin at full Mana Pool.
- Start of Round resolves the Core Instinct Action, Magic Regen modifiers, Mana restoration, then turns in Initiative Order.
- Lore Attunement remains `-2 Mana`.
- Ordinary spells have a minimum final cost of `1 Mana`.
- Signature Spells display `Signature`; zero-cost Invocation utility spells display `Cantrip`.
- Power applies only when an individual spell explicitly says to add Power.
- Equipped Trinkets apply their listed passive magic effects directly; there is no separate Arcane Focus selection.

## Canonical Threadpiece economy

- 10 wp = 1 np
- 5 np = 1 sp
- 5 sp = 1 bp
- Starting wealth = 30 sp
- Adventure Kit creation sellback = 3 sp
- Maximum creation purchasing power after selling the kit = 33 sp

Protective loadout remains limited to one armor and one shield. Trinkets are passive equipped gear and do not consume protective equipment space.

## Measurements

The game remains square-based. Rule text displays bracketed distances with a space before the unit, such as `[3] squares`. The site can display Squares, Yards, Meters, or Feet through the shared measurement display setting.

## Release integrity

- Site Update / BUILD/export: `0.15`
- package version: `0.15.0`
- PWA cache: `v0.15`
- Game Update: `v0.05`
- Site Update history: `CHANGELOG.md`
- Game Update history: `src/data/gameUpdates.ts`

## Runtime

- Node.js 22.x
- Vue 3 / TypeScript / Vite
- Character Share Codes: browser gzip compression where supported, with plain JSON/base64url fallback
