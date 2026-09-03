# Brambleheart TTRPG — Beta 0.45
Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.45 restructures the encounter action model around Core Actions and bounded Ability Chains. It adds Reaction as a shared Core Action, prevents recursive proc loops by allowing each specific Ability instance to resolve only once per chain, updates the Ability Manager to model that chain state, and revises Ragebound and Snapstep for the new Core Action structure.

## Rule Updates v0.08

Rule Updates are versioned independently from application builds. Beta 0.45 advances Rule Updates to v0.08 for the Core Action terminology, Reaction Core Action, Ability Chain limits, and the approved Ragebound/Snapstep revisions. Existing ROOT keywords remain on current Abilities and retain their current round-level restrictions; ROOT is no longer used as the Ability Chain recursion guard.

### Trinkets

Trinkets behave as passive equipment. They do not use Trinket 1 or Trinket 2 positions, and there is no separate Arcane Focus selection. If a Trinket is equipped, its listed effect applies automatically. Attachment-based Trinkets must also be attached to a legal weapon or armor before their attached effect applies.

Current Trinkets include Scriptweave Book, Caster Totem, Spell Charm, Lens-Stone Arcanum, Shiny Bobble, Votive Icon, Heartward Token, Quickdraw Quiver, Featherwind Bolt-Case, Wristloop, and Journey Knot. Legacy saved slot/focus fields are removed at the saved-character normalization boundary rather than being carried into current application logic.

- Journey Knot — while equipped and attached, condition `+1` to one TO HIT roll made with that weapon.
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

Practiced Hand cannot choose Skills the character already knows from earlier creation sources such as Homeland or Culture Traits. The selected path and its Skill/Attribute choices are persisted with the character.

### Core Actions & Ability Chains

Core Action is the canonical name for the shared actions every character can use. Ability remains the term for Traits, Talents, Spells, equipment effects, and other rules that modify a Core Action or trigger from events in its chain.

A normal round provides one Core Instinct Action, one Core Move Action, one Core Combat Action, and one Core Reaction Action. The shared Core Actions are Channel the Winds, Focused Will, Stride, Swiftstride, Hero’s Charge, Melee Strike, Range Strike, Arcane Command, Reaction, and Renew the Heart.

Every Ability Chain begins with a Core Action. A specific character’s copy of an Ability can resolve only once during that chain, even if later events would make its Trigger legal again. Another character’s copy of the same named Ability is a separate Ability instance and may resolve once. The chain ends when no unresolved Ability instance has a legal Trigger.

Reactive Abilities resolve through Reaction when their printed Trigger is met. Each character has one Reaction Core Action per round unless a more specific rule grants another use. Existing ROOT keywords are preserved and still apply their current round-level family limits, but ROOT is not used to stop recursive chains.

Ragebound now builds from Focused Will, granting condition [+1] to Strike and [+1] to damage while reducing Ward and Guts by [-1] each through Defenseless. Snapstep now builds from Focused Will or Channel the Winds and moves up to [2] squares. Drums of War and Divine Grasp intentionally retain their rules that grant or compel Core Action use.

Rhythm Engine → Ability Manager uses the same Core Action authority. Character mode evaluates only the selected character’s actual Traits, Talents, and known Spells; Ability mode traces a selected Ability back to a legal Core Action route. Reactive branches are gated through Reaction and repeated resolution of the same Ability instance is blocked within a chain.

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

All runtime money calculations use whole Washer Pieces (`wp`) as the authority:

- 10 wp = 1 np
- 5 np = 1 sp
- 5 sp = 1 bp
- Starting wealth = 30 sp = 1,500 wp
- Adventure Kit creation sellback = 3 sp = 150 wp
- Maximum creation purchasing power after selling the kit = 33 sp = 1,650 wp

Protective loadout remains limited to one armor and one shield. Trinkets are passive equipped gear and do not consume protective equipment space.

## Measurements

The game remains square-based. Rule text displays bracketed distances with a space before the unit, such as `[3] squares`. Settings can display Squares, Yards, Meters, or Feet through one conversion authority: 1 square = 1 yard = 1 meter = 3 feet.

## Beta 0.45 application focus

- Renames the shared Core Ability concept to Core Action throughout current rules and UI presentation.
- Adds Reaction as a shared Core Action and routes Reactive Ability use through that once-per-round opportunity.
- Establishes the once-per-Ability-instance chain rule so Ability Chains terminate without relying on ROOT as a recursion guard.
- Updates Rhythm Engine → Ability Manager to model Core Action roots, Reaction gates, and per-instance chain state.
- Revises Ragebound and Snapstep for the Core Action model while preserving ROOT on both Abilities.
- Keeps Drums of War and Divine Grasp as explicit rule-breaking effects that can grant or compel additional Core Action use.
- Synchronizes BUILD/export 0.45, package 0.45.0, PWA cache v0.45, and Rule Updates v0.08.

## Release integrity

- BUILD/export: `0.45`
- package version: `0.45.0`
- PWA cache: `v0.45`
- Rule Updates: `v0.08`
- Repository and in-app Site Changelog: `CHANGELOG.md`

## Runtime

- Node.js 22.x
- Vue 3 / TypeScript / Vite
- Character Share Codes: browser gzip compression where supported, with plain JSON/base64url fallback
