# Brambleheart TTRPG — Beta 0.06
Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.06 is the current **Site Update**. Site Updates track application, interface, storage, navigation, presentation, and deployment changes. Brambleheart game-rule changes are tracked separately as **Game Updates**.

## Current Site Update — Beta 0.06

- Character Sheets now persist interactive Health, apply current low-Health Conditions to selected-character Dice Roller rolls, show Threat Point totals, and use tighter equipment layouts with restored Skill/Trinket accents.
- Encounter Builder now supports incomplete, unapproved, and approved records, lock/unlock and approval workflows, copying, selectable Battlefield trap/environment foundations, and local persistence.
- Rules presentation now restores Homeland Skills, normalizes Oath cards, tightens Equipment tables, adds dynamic Lore links, corrects the Spell Range/Healing graphics, and links the five core Watcher pages through previous/next navigation.
- The Watcher monster catalog now uses expandable categories and reusable profile pages; Glop is the first complete profile with Attributes, Actions, Special Rules, and Keywords.
- Selu of the Wandering Reeds now uses the example campaign **Verdant Secrets**.

## Current Game Update — v0.02

Game Update v0.02, **Bound Equipment**, updates Scriptweave Book and Durtlehide so each selected equipment effect has one explicit bound target. The consolidated v0.01 **Launch Patch** remains the prior rules baseline.

### Current Rules Clarifications

Once per turn, before or after resolving another Core Combat Action, Arcane Command may cast one Enhance or Hex Spell. Increase that Spell’s Mana cost by [+1].

Projectile weapons apply condition [-2] to Strike when attacking a target within [1] square. Skyfire deals an additional [2] Lethal damage to its target. Slashing deals [1] Lethal damage when its trigger is met.

Health states use the most severe applicable threshold: Wounded at 5–8 Health, Critical at 3–4, Last Breath at 1–2, and Defeated at 0. A defeated character makes a Fate Roll on their next turn in the following round; [5–10] passes and [1–4] adds a Fate Mark. Restoring at least [1] Health removes all Fate Marks.

Threat Level is calculated from current character growth: Attribute ranks above 2, Skill ranks above 2, Talents, Magic Levels, and an optional +1 to +5 Watcher adjustment for exceptional gear contribute Threat Score. Group Threat is the sum of each party member’s Threat Level.

### Complete Magic Rebalance

The current built-in roster contains 76 Spells: 13 Invocations and 9 Spells in each of the seven attunable Lores. Flaming Shroud, Nature’s Fury, Entangling Roots, Earth Grasp, Frozen Blood, Deathly Shadow, Orb Of Impurity, Ode To The Lores, and Chant Of Sanctuary are retired from the current roster. Smolder is replaced by the Flames Signature Spell Immolation; the former ordinary Immolation is retired.

Current built-in Spell costs come from one canonical base-Mana table before Lore Attunement and equipment modifiers. Signature Spells and Invocation Cantrips remain zero-cost exceptions; ordinary Spells retain the normal minimum final Mana cost after modifiers.

A damaging Spell adds Heart once to its primary damage value unless a more specific rule states otherwise. The Heart portion is Standard while the Spell’s printed portion keeps its listed Damage Category and damage type. On-Going, recurring, delayed, terrain, movement-triggered, reflected, and summoned damage uses exactly its printed value and does not add Heart, Fury, Accuracy, or another normal Attribute-derived damage addition unless its rule explicitly says so.

The completed pass also applies the approved individual cost, damage, range, save, duration, stacking, summon, and wording changes across Invocation, Flames, Wilds, Oaths, Frost, Hallows, Harmony, and Life. Hybrid Spells separate initial Magic Strike resolution from later Renew the Heart riders, and persistent effects state their repeat-save and repeat-damage behavior explicitly.

### Trinkets

Trinkets behave as passive equipment. They do not use numbered Trinket positions, and there is no separate Arcane Focus selection. If a Trinket is equipped, its listed effect applies automatically. Attachment-based Trinkets must also be attached to their legal target before the attached effect applies.

Current Trinkets include Scriptweave Book, Caster Totem, Spell Charm, Driftwood Charm, Lens-Stone Arcanum, Shiny Bobble, Votive Icon, Heartward Token, Quickdraw Quiver, Featherwind Bolt-Case, Wristloop, and Journey Knot.

- Journey Knot — while equipped and attached, condition `+1` to TO HIT rolls made with that weapon.
- Scriptweave Book — while equipped, Magic Regen `[+1]`. Bind it to one known Lore Spell; only that Spell receives `[-1]` Mana, to the normal minimum of 1 Mana, and gains `COOLDOWN: [1d10/2+1] rounds` (or increases an existing `[1d10/2+X]` cooldown by `[+1]`).
- Caster Totem — while equipped, Control `+1`.
- Spell Charm — once per round, increase one spell’s damage by `+1`.
- Driftwood Charm — once per round, increase one healing Spell’s Health restoration by `[+1]` for one target.
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

- Site Update / BUILD/export: `0.06`
- package version: `0.06.0`
- PWA cache: `v0.06`
- Game Update: `v0.02`
- Site Update history: `CHANGELOG.md`
- Game Update history: `src/data/gameUpdates.ts`

## Runtime

- Node.js 22.x
- Vue 3 / TypeScript / Vite
- Character Share Codes: browser gzip compression where supported, with plain JSON/base64url fallback
