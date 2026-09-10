# Brambleheart TTRPG — Beta 0.25
Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.25 is the current **Site Update**. Site Updates track application, interface, storage, navigation, presentation, and deployment changes. Brambleheart game-rule changes are tracked separately as **Game Updates**.

## Current Site Update — Beta 0.25

- News now presents separate Discord, Share, and Creator Link buttons, with Discord live member/online counts shown on the community button.
- Standard-damage Melee and Ranged weapon profiles receive their current damage adjustment; Penetration weapon damage remains unchanged.
- Deadly, Dual Wielding, Beastgrasp, Turnstrike, and the retirement of Ward Guard use the current weapon/Talent rules.
- Species and character-facing stat presentation use the current Steady Pace, Poised Reflex, Double Lilly, Cycle Of The Beast, Thunderstep, and Frostwalker rules.
- Current Rules distinguish Damage Category from the On-Going recurring-damage qualifier and use the slower 7–10 XP-per-session advancement model.
- The Watcher encounter reference uses Threat Level terminology and no longer presents the obsolete six-Attribute Encounter Rating calculation.

## Current Game Update — v0.13

Game Update v0.13 updates current weapon damage, Deadly and Dual Wielding, Beastgrasp and Turnstrike, Experience progression, several Heritage Traits, On-Going damage terminology, and the current Threat Level placeholder.

### Current Rules Clarifications

Standard, Direct, and Lethal are Damage Categories. On-Going is a recurring-damage qualifier: later ticks keep the effect’s stated Damage Category and use the printed recurring value without adding Fury, Accuracy, Heart, Power, weapon damage, or another normal damage addition again unless the rule explicitly says otherwise.

Deadly weapons list damage as `X [Y]`; the normal `X` damage resolves normally and a successful Strike also deals the fixed bracketed `[Y]` as Lethal damage. Dual Wielding applies [-2] to Strike rolls made with those weapons, duplicate qualities apply once, and Versatile contributes one [+1] total for a net [-1] penalty.

Beastgrasp changes the base Dual Wielding Strike penalty to [-4] while wielding two two-handed weapons. Ward Guard is retired. Turnstrike uses half the wielded weapon’s normal, non-bracketed damage value, rounded up, with a minimum Ward bonus of [+1].

Auravex Cycle Of The Beast restores [1] Health or [1] Mana to its host rider, Braelor Thunderstep grants [+2] charge movement with [2] Lethal Power Through damage, and Urnath Frostwalker grants Resistance [+2] to Cold with [+2] Natural Terrain Ward.

Tordan Steady Pace reduces a Move ability’s maximum movement by [1] square, reduces Speed penalties by [2], and prevents penalties/effects from reducing Speed below [2]. Cethra Poised Reflex and Rivkan Double Lilly can each be used once per round. Typical sessions award 7–10 XP; advancement costs are intentionally paced so one or two sessions usually support one or two upgrades depending on how XP is spent.
A completed kept Deed that aligns with a character’s Spark grants [+1] bonus XP, and that Spark alignment bonus can be gained only once per session.

### Complete Magic Rebalance

The current built-in roster contains 76 Spells: 13 Invocations and 9 Spells in each of the seven attunable Lores. Flaming Shroud, Nature’s Fury, Entangling Roots, Earth Grasp, Frozen Blood, Deathly Shadow, Orb Of Impurity, Ode To The Lores, and Chant Of Sanctuary are retired from the current roster. Smolder is replaced by the Flames Signature Spell Immolation; the former ordinary Immolation is retired.

Current built-in Spell costs come from one canonical base-Mana table before Lore Attunement and equipment modifiers. Signature Spells and Invocation Cantrips remain zero-cost exceptions; ordinary Spells retain the normal minimum final Mana cost after modifiers.

A damaging Spell adds Heart once to its primary damage value unless a more specific rule states otherwise. The Heart portion is Standard while the Spell’s printed portion keeps its listed Damage Category and damage type. On-Going, recurring, delayed, terrain, movement-triggered, reflected, and summoned damage uses exactly its printed value and does not add Heart, Fury, Accuracy, or another normal Attribute-derived damage addition unless its rule explicitly says so.

The completed pass also applies the approved individual cost, damage, range, save, duration, stacking, summon, and wording changes across Invocation, Flames, Wilds, Oaths, Frost, Hallows, Harmony, and Life. Hybrid Spells separate initial Magic Strike resolution from later Renew the Heart riders, and persistent effects state their repeat-save and repeat-damage behavior explicitly.

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

The shared Core Actions are Channel the Winds, Focused Will, Stride, Swiftstride, Hero’s Charge, Melee Strike, Range Strike, Arcane Command, Reaction, and Renew the Heart. Move Core Actions marked Dynamic can be used at their legal timing; Core Combat Actions are used on a turn; Instinct and Reaction follow their printed timing.

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

Protective loadout remains limited to one armor and one shield. Trinkets are passive equipped gear and do not consume protective equipment space.

## Measurements

The game remains square-based. Rule text displays bracketed distances with a space before the unit, such as `[3] squares`. The site can display Squares, Yards, Meters, or Feet through the shared measurement display setting.

## Release integrity

- Site Update / BUILD/export: `0.25`
- package version: `0.25.0`
- PWA cache: `v0.25`
- Game Update: `v0.13`
- Site Update history: `CHANGELOG.md`
- Game Update history: `src/data/gameUpdates.ts`

## Runtime

- Node.js 22.x
- Vue 3 / TypeScript / Vite
- Character Share Codes: browser gzip compression where supported, with plain JSON/base64url fallback
