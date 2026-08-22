# Brambleheart Beta 0.09 — Rules, Creator & Rhythm Refinement Patch

This patch starts from the working Beta 0.08 recovery state. It deliberately preserves both the Spells/Invocations → Talents crash fix and the corrected Character Creation page/header boundary that restored the creator layout.

## Rules and reference reader

- Rebuilt the Rules landing page around the supplied image #1: full-width search, clean References, recent rules, and chapter panels.
- Removed Table of Content from References and removed the redundant reader page entirely.
- Added breadcrumbs to individual rule pages.
- Applied stronger source structure to rule pages: bold section titles, clearer paragraph rhythm, labeled lead-ins, rule tables, and Old.Dex-inspired section cards.
- Rebuilt The Fundamentals previous/next controls around the compact Old.Dex Core Rules navigation pattern.
- Restyled trait/talent/spell/rule boxes toward the Old.Dex special-rule card language shown in image #2, leaving room for later icons and type color coding.

## Site presentation and themes

- Added the WIP banner to the standard site header and Welcome page.
- Increased the site logo toward the requested x5 scale test while constraining it to the viewport.
- Fixed Dark Mode for Adventurer, Storyteller, Tactician, and Mystic so the full page/card surface palette changes to dark rather than only menu/accent colors.

## Rhythm Engine and Combat Encounter

- Removed the empty No Target dotted placeholder; no target result is shown until a target is selected.
- Expanded the Fortune & Misfortune panel to explain what the natural results mean and how their +1/−1 Conditions are used.
- Added saved-character selection to Attribute Check, including character Attributes/secondary Stats and Skills.
- Combat Encounter now requires a saved character. Start Encounter refuses to create an encounter without one and shows an explanatory error.

## Character Creation

- Renamed Kinship / Family to Kinship / Pack and aligned it with the resizable Appearance field.
- Moved each Building Selu callout directly beneath its step title and tightened title/help spacing.
- Combined overlapping Spark explanation panels.
- Popup panels now freeze the page behind them and retain independent mouse/touch scrolling.
- The Culture Trait picker filters out Traits already selected by the character.
- Removed the redundant SKILL RANKS heading inside Culture Trait cards where the +1 Skill entries are self-explanatory.
- Attribute Rank controls are right-aligned; the numeric Rank cell is black text on white.
- Starting Skill Ranks now live under the Skills explanation and identify Culture-granted Skills with a Cultural pill.
- Homeland Skill fields are now Homeland Skill Option #1 / #2 and overlapping Culture Skills show (+1 rank) in the dropdown.
- Added non-collapsible Mana guidance to Choose Your Path.
- Renamed Regular Spells to Lore Spells; the Magical Spells panel now explains Lores, Invocation, Attunement, and starting spell slots together.
- Attuned Lore groups are labeled “(Attuned)” in Lore Spell selection.
- Talents are provisionally grouped into Combat, Magic, Movement, Survival, Social, and Utility categories.
- Equipment & Gear has category tabs, readable Armor/Weapon profile labels, source-backed descriptions and effects, purchase choices where required, a named Purchased Equipment & Gear list, Threadpiece currency guidance, and the renamed Adventure Kit (Starting Equipment Package).
- Added one additional selectable Language and language context cards.
- Review Character now permits name editing and presents Attributes with Rank/Modifier, secondary stats, Skills, Languages, Talents, and Equipment & Gear more clearly.

## Versioning and compatibility

- Visible build advanced to Beta 0.09.
- PWA shell cache advanced to v0.09.
- Existing local Character, Rules Recent, and Rhythm/Encounter storage keys remain compatible so applying the patch does not intentionally discard saved data.

## Applying

Overlay the contents of this package onto the current Brambleheart repository, replacing matching files and preserving repository files not included in the patch.
