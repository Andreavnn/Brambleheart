# Brambleheart TTRPG — Beta 0.26
Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.26 is the current **Site Update**. Site Updates track application, interface, storage, navigation, presentation, and deployment changes. Brambleheart game-rule changes are tracked separately as **Game Updates**.

## Current Site Update — Beta 0.26

- Rules presentation is reorganized across Fundamentals, Character Creation, Playable Species, Winds of Magic, Battles, and the Watcher reference.
- Shared rule cards now preserve their intended content accents, collapsible headings are simplified, and Core Action pills display the shorter `CORE` label.
- Character Creation reference pages use current shared data for Sparks, Deeds, narrative choices, equipment, Experience, and advancement presentation.
- Weapon and Spell targeting guidance now lives with the relevant combat or magic reference while existing targeting routes remain available for navigation compatibility.
- News displays total Brambleheart Discord membership and a combined Creator Content follower count from the configured communities.
- Installed-app icons use the current Brambleheart tree emblem.

## Current Game Update — v0.14

Game Update v0.14 expands Arcane Command, establishes the current character/group Threat Level framework, updates several weapon qualities, and clarifies Health and Fate resolution.

### Current Rules Clarifications

Arcane Command may resolve one additional time once per turn without spending another Core Combat opportunity. The second cast must be an Enhance or Hex Spell and its Mana cost is increased by [+1]. This allows combinations such as a normal Spell followed by an Enhance or Hex, or two Enhance/Hex casts in the same turn.

Projectile weapons apply condition [-2] to Strike when attacking a target within [1] square. Skyfire deals an additional [2] Lethal damage to its target. Slashing deals [1] Lethal damage when its trigger is met.

Health states use the most severe applicable threshold: Wounded at 5–8 Health, Critical at 3–4, Last Breath at 1–2, and Defeated at 0. A defeated character makes a Fate Roll on their next turn in the following round; [6+] passes and [5] or less adds a Fate Mark. Restoring at least [1] Health removes all Fate Marks.

Threat Level is calculated from advancement beyond the baseline starting hero. Attribute and Skill ranks above Rank 1, Talents, Magic Levels, and exceptional custom power contribute to a character's Threat Score; the resulting score maps to Threat Level 1 or higher. Group Threat is the sum of each party member's Threat Level. Monster and encounter-difficulty calibration remains intentionally deferred until the Watcher/monster design pass.

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

- Site Update / BUILD/export: `0.26`
- package version: `0.26.0`
- PWA cache: `v0.26`
- Game Update: `v0.14`
- Site Update history: `CHANGELOG.md`
- Game Update history: `src/data/gameUpdates.ts`

## Runtime

- Node.js 22.x
- Vue 3 / TypeScript / Vite
- Character Share Codes: browser gzip compression where supported, with plain JSON/base64url fallback
