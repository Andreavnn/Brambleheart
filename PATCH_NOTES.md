# Brambleheart Beta 0.08 — Recovery & Encounter Patch

This overlay rebuilds Beta 0.08 from the last known-good **Beta 0.06 Creator & Rules Patch**. It does not use the broken Beta 0.07 creator/simulator state as its code baseline. Existing character, encounter, Rules-recent, and Settings storage keys are retained where practical.

## Included

- Code-red character creator fix for the Spells / Invocations → Talents transition so Talent validation does not mutate reactive state during render.
- Species creator containment so expanded Species/Culture information stays in its column instead of covering the Species portrait.
- Resizable Appearance field, black Species portrait border, contained Oath & Faith layout, black Start Over text, red Close text, and Lore-colored Spell cards.
- Old.Dex-style information-card treatment and a searchable Culture Trait popup picker.
- Starting Skills display both Rank and Modifier.
- Rules menu renamed to References while the linked Quick Reference reader becomes Table of Content.
- Introduction moved above Dice Rules in The Fundamentals, Fundamental inner links added, and the redundant Fundamentals Menu button removed from Fundamental subpages.
- Playable Species promoted to its own Rules section and Lore of Anthro Mundas moved to the top of References.
- Recently viewed Rules boxes added to the Rules page.
- Default added as the first Theme option.
- Fortune & Misfortune tip added above Rhythm Engine Roll Type.
- Combat Encounters can select a saved Character and pull its secondary stats, Skills, Talents, Mana, Lore, and Spells into the encounter.
- Abilities panel added above Attacking & Defending with start-of-turn guidance, Root-type tracking, Passive guidance, and a clear no-Root-types-remaining state.
- Opposed Roll renamed Attacking & Defending with separate Melee, Ranged, and Magical Strike modes.
- Spells & Mana moved directly below Attacking & Defending.
- Resistance and Weakness controls added to Damage & Guts and applied as Guts Conditions after the damage category.
- PWA shell cache advanced to v0.08.

## Baseline and recovery

The supplied Beta 0.06 package is the recovery baseline for this patch. Files not explicitly changed for Beta 0.08 are preserved from that stable package instead of inheriting Beta 0.07 regressions.

Species portrait image files added during the later repository work are referenced from `/public/assets/species/`. Overlaying this patch onto the current repository preserves those existing image assets.

## Local data

Character storage remains `brambleheart-characters-v0.01`. Rhythm/Encounter storage remains on the existing v0.05 keys so local histories are not discarded merely by applying this patch.

## Applying

Overlay the contents of `BrambleHeart-v0.08-CREATOR-RULES-ENCOUNTER-PATCH` onto the current Brambleheart repository, replacing matching files and preserving repository files not included in the patch.
