# Brambleheart Beta 0.37 Patch Notes

Baseline: GitHub `main` commit `093cbf928eb3dabb4fd20769bc5b886198e497b7` (Beta 0.36.0).

## Rule Updates v0.03
- Rebuilds the encounter action economy around one CORE Instinct, one CORE Move, and one CORE Combat opportunity per round.
- Moves ROOT off Core Abilities and makes it the stacking limiter for specific Talent families: Instinct, Move, Touch, Shoot, Magic, and Reactive.
- Standardizes REACTIVE terminology and the rule-card order around COST, TRIGGER, DECLARE, TO HIT / SAVE, EFFECT / DAMAGE, DURATION, RESTRICTIONS, REQUIRES, COOLDOWN, and KEYWORDS.
- Establishes the Start of Round sequence as CORE Instinct choices, Magic Regen modifiers, Mana restoration, then turns in Initiative Order.
- Keeps Mana Pool = Magic Level + Spirit and Magic Regen = Heart. Channel the Winds increases Magic Regen rather than generating Mana directly.

## Core Abilities
- Makes Channel the Winds and Focused Will CORE Instinct abilities; Focused Will no longer costs Mana.
- Makes Stride, Swiftstride, and Hero’s Charge CORE Move abilities.
- Makes Melee Strike, Range Strike, and Arcane Command the three CORE Combat choices using Touch, Shoot, and Magic respectively.
- Makes Renew the Heart Passive.
- Corrects Melee Strike to use Brawl for TO HIT and weapon damage + Fury; Range Strike uses Aim and weapon damage + Accuracy.
- Reduces Arcane Command to the casting entry point; individual Spell Details own targeting and resolution.

## Talents
- Reconstructs the Talent catalog so attack-style Talents modify Core Abilities rather than duplicating complete attack procedures.
- Renames Fang Break to Cleave and rebuilds Cleave → Wildchain → Warpath as a fixed four-target maximum chain under one Melee Strike.
- Treats Beastgrasp as the canonical replacement for Primate Grip and updates Titan’s Wake accordingly.
- Repairs malformed/self-referential Talent requirements and normalizes Talent triggers, restrictions, and keywords.
- Leaves Rooted Paws intentionally unchanged pending the dedicated Grapple/Touch decision.

## Magic Levels & Known Spells
- Tracks known Lore Spells and Invocations directly from Magic Level.
- Magic Level 1 begins with 2 Lore Spells and 2 Invocations, plus a separate Signature Spell.
- Every new Magic Level grants 1 Lore Spell, except Magic Level 5 grants 2; Magic Levels 3, 5, 7, and 9 each grant 1 Invocation.
- Magic Level 10 therefore allows 12 chosen Lore Spells and 6 Invocations, plus the Signature Spell.
- Level Up exposes unclaimed known-spell choices for existing characters without fabricating migration choices.

## Spell Framework
- Keeps Lore Attunement at -2 Mana and sets ordinary spell cost to a minimum final value of 1 Mana.
- Signature Spells are hard-free triggered effects and display `Signature` rather than `0 Mana`.
- Explicit zero-cost Invocation utility spells display `Cantrip`.
- Replaces AUGMENT with ENHANCE, removes redundant spell ROOT/ANCHOR action limiting, and standardizes TO HIT as the attack-resolution field heading.
- Power is applied only when the individual spell explicitly calls for it.
- Only one Arcane Focus is active at a time; focus Control and spell-cost reductions do not stack across multiple owned foci.
- This release does not perform the later spell-by-spell numerical damage, Mana-cost, healing, area, or Empower rebalance.

## Presentation
- Adds consistent action-family color coding: Touch red, Shoot teal, Magic purple, Instinct blue, Move green, Reactive orange, and Passive gray.
- Keeps CORE, ROOT, and COMBAT visually neutral as structural keywords.

## Deferred Follow-ups
- Individual spell numerical balance.
- Final high-end armor Speed penalties and their interaction with Ironhide.
- Rooted Paws / Grapple resolution.

## Release Integrity
- Advances BUILD/export to `0.37`, package version to `0.37.0`, PWA cache to `v0.37`, and Rule Updates to `v0.03`.
