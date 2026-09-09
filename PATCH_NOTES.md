# Brambleheart Beta 0.24 — Current Rules & Reference Cleanup

**Site Update — Beta 0.24**
**Game Update — v0.12**

## Current rules authority

- The application now keeps the materialized current ruleset in `src/data/rulesCurrent.ts` as the single runtime rules document authority.
- The original generated raw-rules source, the superseded beta mutation layer, and its retired supplemental stylesheet are removed from the maintained implementation. Current rules that were still in use were materialized before those source layers were retired.
- Current Rules pages continue to use the shared Beta 0.23 page shell, Core Action card, and rule-feature card components rather than rebuilding equivalent boxes per page.

## Fundamentals

- Attributes & Skills receives corrected Attribute/Secondary Stat graphic sizing, a five-Attribute Rank/Modifier visual example covering Ranks 1–5, and reorganized Skill Tree headings/column labels.
- Core Actions now distinguishes Dynamic Move timing from Core Combat Actions used on a turn. The chaining example names each participant, including the Blight Warrior.
- Core Combat Actions share one accent family and Core Action cards use the same cleaner field treatment as current Spell/rule cards.

## Character Creation

- Step-by-Step examples use the shared current rule-card component and the appropriate Heritage, Cultural, Spark, Deed, Homeland, Faith, and Oath accents.
- The Body & Spirit step explains Wind-Touched, Gifted Heart, Practiced Hand, and Tempered Form.
- Equipment & Items now links to Equipment & Gear and uses an interactive Threadpiece exchange starting from 30 sp instead of the former static budget graphic/sellback explanation.
- Character Details adds the Watcher guidance for campaign-specific optional details and formats optional entries consistently.
- Sparks are alphabetized and presented in two columns, with two text examples and a dedicated Creating Your Own Spark subsection. Deed interaction guidance is kept adjacent to Spark creation.
- Deeds are alphabetized and presented through the shared card style with d100 ranges. The rules now explain Deeds Deck/random-roll selection, the draw-five/keep-two standard, and the recommendation to use at least two Deeds per player per session.
- Homeland, Faith, and Oath creation guidance is nested with its primary section. Common choices are collapsible, alphabetized, and use their current accent presentation; Common Oaths use two columns.
- Faith now precedes Oath in Character Creation navigation. Oath gains the Adventurer option and a Watcher note paralleling the Faith guidance.
- Talent categories are collapsible and preserve the accent family of the Core Action/Ability type used by each Talent.
- Equipment & Gear now presents the current Character Creation equipment catalog: Weapons, Armor, Shields, Traveler’s Gear, Field Kits, Consumables, Trinkets, and Tools. Makeshift Weapons, Armor Penalty, Break Value, and current Threadpiece rules use dedicated subsections/panels, and current item groups render as shared item cards.
- Beyond Character Creation removes the duplicate heading, presents XP sources visually, and groups advancement cost examples in a collapsible panel.

## Winds of Magic

- Magical Levels now explains Mana Pool and Magic Regen visually without reusing the Power secondary-stat explanation.
- Lore Attunement contains its Signature subsection/example and grants Resistance [+1] against the element associated with the selected Lore.
- Spell Keywords are presented as individual current rule cards.
- Casting Spells includes Range Spell/Magic Strike guidance and the current Enhance casting rule: the caster makes Renew the Heart and reduces the passive target by their Spirit modifier, to a minimum target of [8].
- Spell Range includes a worked range/area example and links to Combat Targeting.
- Non-Signature Spells are collapsible on Lore pages; Signature Spells remain immediately visible. Lore pages display the Lore’s Elemental Resistance beside the Attuned control.

## Battles

- Encounter & Rounds removes the empty Encounter Basics section, improves the Combat Encounter flow, nests Squares & Measurements, adds Initiative roll/order visuals, includes Start-of-Round Instinct Core Action references, combines turn/Ability guidance, and adds End-of-Round Instinct examples.
- Combat Targeting is the canonical page title. It covers Touch, Range/Thrown, Line, Cone, Orb, and impassable collision without the removed duplicate combat-action sections.
- Attacking & Defending now keeps the three Core Combat Actions in a single-column reference, consolidates Ward guidance into the main explanation, and keeps defender-wins-ties with that section.
- To Damage presents Standard, Direct, Lethal, and On-Going as current Damage Categories, adds damage-stat/resistance visuals, and retains the current Spell Heart rule and soak calculation.
- Health, Healing, Defeated, and Encounter Ends receive current visual references and linked follow-up actions.

## Release integrity

- Site Update / BUILD / character export: `0.24`
- Package: `0.24.0`
- PWA cache: `v0.24`
- Game Update: `v0.12`
- Current GitHub baseline reviewed: `03647cd2fc097426ce302197b8b8f3cf373ccf27`

## Verification

Final verification results are recorded from the actual checks performed for this package. Full production-build/browser claims are made only if those checks complete successfully.
