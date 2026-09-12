# Brambleheart Beta 0.07 — Encounter Workflow & Sheet Controls

## Rhythm Engine

- Rebuilds Encounter Builder around an Encounter Roster and a dedicated Create Encounter flow, matching the Character Roster/Create Character pattern; encounter creation now uses Details, Monsters, Battlefield, and Review without party/match setup.
- Expands Dice Roller Recent Rolls with source-level breakdowns for Stats, Skills, manual Conditions, Health-state Conditions, Armor Penalty, and other applied modifiers.
- Adds a persistent Character Sheet accent-color picker for Character Detail cards and an interactive Mana Pool tracker that grows in rows of ten with the character’s maximum Mana.
- Refines Character Sheet labels for Skills, Talents, Equipment currency, item count, and weight.

## Rules & Equipment

- Consolidates Game Update history back into v0.01 Launch Patch and moves the Bound Equipment rules into that canonical entry.
- Changes the Wounded Health range to 5–7 Health; 8 Health is Healthy.
- Raises shield Mana Syphon to Sapguard [+1], Vinegrip [+2], and Ironwood Bulwark [+3].
- Refines Scriptweave Book presentation so Effect and Cooldown are separate fields, removes “normal” from its minimum-Mana wording, and states that the selected Spell gains Cooldown.
- Extends the Healing example’s grouping brackets to encompass Restore and Healing Condition more clearly.

## Watcher & Navigation

- Refines the Glop profile with Character Sheet-style Attribute boxes, centered Secondary Stats, Core Action-style Actions, Slick Trail terrain movement, and Gelatinous Body Direct-damage reduction.
- Adds a Creator button to the global bottom action row between Share and Install.

## Release Integrity

- Updates Site Update/build/export/package/PWA metadata to Beta 0.07 while keeping the consolidated Game Update authority at v0.01.

# Brambleheart Beta 0.06 — Character State & Watcher Foundations

## Rhythm Engine & Characters

- Adds persistent, interactive Health to Character Sheets and automatically applies the current Wounded, Critical, and Last Breath Conditions to Dice Roller rolls for the selected character.
- Reworks Character Detail so Languages has more room and Threat appears beneath Path as `Threat Level · Point`, with the current Threat Point total shown beside the derived Threat Level.
- Tightens Character Sheet weapon and armor name columns, restores canonical Skill and Trinket accent colors, and simplifies Equipment & Gear to owned-item weight while its heading shows remaining Threadpieces, total item count, and total carried weight.
- Expands Encounter Builder into incomplete, unapproved, and approved encounter records with lock/unlock, approval, copy, edit, and delete behavior, plus selectable trap and environment foundations for Battlefield setup.
- Changes Selu of the Wandering Reeds’ example campaign to **Verdant Secrets**.

## Rules Reference

- Restores Homeland Related Skills in the Homeland list, normalizes Adventurer to the same Oath-card presentation as other Oaths, and aligns Adventuring Item expandable-title typography with Character Roster group headings.
- Refines Weapons, Armor, and Shields tables with larger readable text and tighter columns; sorts Shields by Guts; and moves Durtlehide into a marked Special armor group with its elemental-resistance purchase rule below the table.
- Adds a dynamic **Lores of Magic** section after Lore Attunement that links to every current attunable Lore and automatically includes future Lore pages added to the canonical catalog.
- Corrects the Spell Range Orb example to a transparent, centered 3×3 area over its Point of origin and lengthens the Healing graphic parentheses.
- Links Building Encounters, Critters & Companions, Traps & Environments, Monsters, and Rewards together through Watcher previous/next navigation and updates the Individual Threat worked example to use Selu’s current character data.
- Converts Monster categories into expandable menus and establishes reusable monster profile pages with Attributes, derived stats, Actions, Special Rules, and Keywords; Glop receives the first complete starter-scale profile.

## Game Changes

- Changes Scriptweave Book so its Mana reduction applies only to one selected known Lore Spell. The bound Spell also gains `COOLDOWN: [1d10/2+1] rounds`; an existing `[1d10/2+X]` cooldown increases X by [+1].
- Establishes Durtlehide’s purchase choice as one elemental damage type and grants Resistance [+2] against that selected type while Durtlehide is equipped.

# Brambleheart Beta 0.05 — Stability & Encounter Foundations

## Character & Campaign Tools

- Adds Selu of the Wandering Reeds as a complete, approved premade character in Character Roster. Selu can be edited, copied, exported, or deleted like a user character, and the built-in example is seeded only once so a deleted copy does not return on reload.
- Starts the Rhythm Engine Encounter Builder with a Character Creation-style workflow for encounter details, party selection, opposition, battlefield notes, review, local save/edit/delete, current roster selection, Watcher creature selection, and Group Threat display.

## Game Changes

- Adds Sea of Roots as a playable Homeland with Herbalry and Wayfinding, completes Selu with the Mercy Oath, Harmony/Invocation spell choices, Corakish, and current canonical equipment, and standardizes the armor name to Leafstitch while retaining the former spelling only as a legacy-import alias.
- Adds Driftwood Charm to Trinkets. Once per round, one healing Spell cast by its wearer restores [+1] additional Health to one target.

## Rules Reference

- Refines Fundamentals Introduction, Attributes & Skills, and Sparks & Deeds copy; links Character Sheet and Character Creation references directly to Character Roster and adds an inset Skill Tree separator.
- Reuses Character Creation presentation for Homeland, Faith, and Oath reference entries; reduces equipment-table width pressure; classifies only Projectile weapons as ranged while Thrown weapons remain with melee profiles; and reduces oversized Playable Species expandable titles.
- Rebuilds the Spell Range example so the 3×3 Orb is centered on its Point of origin, and updates Combat Encounter Mana, End of Round, To Hit & To Ward, Combat Range, Damage Type, Resistance/Weakness, Health-state, and Healing examples for clearer current-rule presentation.
- Expands the Watcher monster catalog with the sourced Generic, Necrotic, Primordial, and Verdant entries, creates the requested Arcane Automata, Eldritch Abominations, and Insectoid Terrors categories with clearly marked placeholder names where source entries are unavailable, and removes the external source-reference section from the Rules page.
- Restricts Watcher previous/next Rules navigation to the core Building Encounters page so monsters, critters/companions, traps, environments, rewards, and similar catalog/detail pages do not enter the sequential rules-reading path.

## Community

- Enlarges the News Discord image to align its member-count line with Creator Content and changes both live count labels to a muted green treatment.

# Brambleheart Beta 0.04 — Rules Reference & Combat Framework

## Rules Reference

- Reorganizes the Rules reference across Fundamentals, Character Creation, Winds of Magic, Battles, and Playable Species with clearer section placement, centered/colored reference graphics, simplified collapsible headings, and improved rule cross-links.
- Rebuilds Character Creation references for Sparks, Deeds, Homelands, Faiths, Oaths, Talents, Equipment & Gear, Threadpieces, Experience, and advancement charts around shared current data authorities.
- Refines Fundamentals and Character Creation introductions, restores intended Heritage, Cultural, Spark, Deed, Homeland, Faith, Oath, Magic, Initiative, End-of-Round, and Damage card accents, and corrects Species collapsible-heading presentation.
- Reworks Magic reference presentation for Mana Pool/Magic Regen, Signature Spells, Spell Keywords, casting, and Spell Range/area examples.
- Reworks Battle references for Combat Encounters, Damage, Health Points, Healing, Fate Rolls, Resistance/Weakness, current Health-state thresholds, and clearer round presentation.
- Reorganizes Equipment tables into explicit profile columns and grouped weapon/armor categories, expands Armor Penalty and Break Value examples, and improves Adventuring Item guidance.
- Moves weapon targeting to Attacking & Defending and shaped area targeting to Spell Types & Targeting; Combat Targeting is removed as a current standalone page while legacy route slugs remain explicit aliases.

## Game-System Integration

- Changes Core Action pills to the shorter `CORE` display while retaining Core Action as the rules term, and expands Arcane Command with the current additional Enhance/Hex timing and [+1] Mana rule.
- Updates Projectile, Skyfire, and Slashing weapon-quality rules, renames Regrowth to Renewal, and standardizes the current Fate Roll procedure.
- Establishes the current Threat Level calculation for character advancement and combined party Threat, then recalibrates Threat Score growth and adds derived Threat Level to Character Sheet identity details.
- Improves current Mana, Resistance/Weakness, Health-state, Healing, Defeated, and combat-reference wording without creating duplicate rule authorities.

## Community & Installed App

- Adds live Brambleheart Discord membership and combined Creator Content follower totals from the configured public Discord communities.
- Replaces installed-app icons with the current Brambleheart tree emblem, including the padded maskable icon.

# Brambleheart Beta 0.03 — Balance & Progression

## Combat & Equipment

- Updates Standard-damage Melee and Ranged weapon profiles and introduces the current bracketed Deadly damage presentation while Penetration weapon damage remains unchanged.
- Clarifies Dual Wielding and Beastgrasp, retires Ward Guard, and makes Turnstrike use a rounded-up minimum Ward bonus.
- Clarifies damage resolution by keeping Standard, Direct, and Lethal as Damage Categories and treating On-Going as a recurring-damage qualifier that retains its stated category without repeating normal damage additions.

## Game Changes

- Slows Experience progression to 7–10 XP per typical session, modestly raises advancement costs, and limits Spark-aligned kept Deeds to one [+1] bonus XP award per session.
- Tunes Tordan Steady Pace, Cethra Poised Reflex, Rivkan Double Lilly, Auravex Cycle Of The Beast, Braelor Thunderstep, and Urnath Frostwalker.
- Retires the obsolete six-Attribute Encounter Rating calculation in favor of the current Threat Level framework pending its dedicated Watcher rules pass.

# Brambleheart Beta 0.02 — Unified Rules Architecture

## Rules Architecture

- Consolidates Battle and Winds of Magic navigation into the current merged pages, including Encounter & Rounds, Combat Targeting, Attacking & Defending, Magical Levels, and Spell Types & Targeting.
- Preserves superseded route slugs only through explicit compatibility aliases while current navigation uses canonical page slugs.
- Unifies Rules presentation around one shared page shell for breadcrumbs, title/detail text, section styling, and previous/next navigation.
- Reuses shared Core Action and rule-feature card renderers across Fundamentals, Character Creation, Winds of Magic, and Battles instead of maintaining page-specific copies.
- Removes obsolete Rules presentation selectors and duplicate Core Action/example markup exposed by the layout consolidation.
- Rebuilds the current Rules source boundary so the application consumes one materialized current ruleset instead of retaining the original generated raw-rules file and a later mutation layer.

## Reference Presentation

- Adds current damage-category/Heart guidance, damage/soak graphics, Species layout changes, and broader Fundamentals-style rule presentation.
- Refines Fundamentals graphics for Attributes, Ranks & Modifiers, Skills, Core Action timing, and Ability chaining.
- Expands Character Creation reference presentation for Sparks, Deeds, Homelands, Faiths, Oaths, Talents, Equipment & Gear, Threadpiece exchange, advancement, and optional character details.
- Updates Winds of Magic reference presentation for Mana Pool, Magic Regen, Lore Attunement, Signature Spells, Spell Keywords, casting, range/area interpretation, collapsible spell references, and Lore elemental resistance.
- Reworks Battle reference presentation for encounter flow, Initiative, turns, Instinct timing, targeting, Attacking & Defending, Damage Categories, Resistances, Health, Healing, defeat, and encounter-end references.

# Brambleheart Beta 0.01 — Application Foundation

## Application & Data

- Establishes the initial Brambleheart Vue 3 / TypeScript application foundation.
- Establishes the shared storage service, persisted character/settings state, accessibility improvements, and the early Rules/Character Creation application structure.
- Consolidates browser-storage access through the application storage boundary and improves persisted-state reliability.
- Adds cloud/share/import foundations for character data and expands data/settings tooling.
- Improves current data normalization, import/export handling, and cross-device character workflows.
- Expands Character Creation, equipment shopping, character review, News, and Rules reference workflows.
- Adds shared item/economy data used by Character Creation and character sheets and improves linked rule pills, Settings/Data presentation, and current character-facing status behavior.

## Visual & Rules Foundation

- Establishes the current visual identity for Traits, Talents, Spells, Skills, and rule pills, including shared accent/tone handling and readable rule-card formatting.
- Standardizes current Rules page titles, summaries, Watcher/Selu callouts, content panels, and rule-detail typography.
- Expands Species and rules reference presentation while retaining specialized Species art/lore layouts where appropriate.
